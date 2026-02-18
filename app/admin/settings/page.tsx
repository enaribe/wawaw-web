'use client';

import { useEffect, useState } from 'react';
import { Save, Globe, Bell, Shield, Eye, EyeOff, Check } from 'lucide-react';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/Button';
import { useSettings, useUpdateSettings } from '@/lib/queries';

function Toggle({
  value,
  onChange,
  label,
  description,
  danger,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description: string;
  danger?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-1">
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-xs text-white/40 mt-0.5">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className="relative w-11 h-6 rounded-full border transition-colors duration-200 shrink-0"
        style={{
          backgroundColor: value
            ? danger
              ? '#EF4444'
              : '#FFD700'
            : 'rgba(255,255,255,0.1)',
          borderColor: value
            ? danger
              ? '#EF4444'
              : '#FFD700'
            : 'rgba(255,255,255,0.2)',
        }}
      >
        <span
          className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200"
          style={{ transform: value ? 'translateX(20px)' : 'translateX(0)' }}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();

  // General
  const [platformName, setPlatformName] = useState('WAWAW');
  const [supportEmail, setSupportEmail] = useState('support@wawaw.tv');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Notifications
  const [newUserNotif, setNewUserNotif] = useState(true);
  const [paymentNotif, setPaymentNotif] = useState(true);
  const [commentNotif, setCommentNotif] = useState(false);

  // Security
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);

  // Hydrate from Firestore
  useEffect(() => {
    if (!settings) return;
    setPlatformName(settings.platformName);
    setSupportEmail(settings.supportEmail);
    setMaintenanceMode(settings.maintenanceMode);
    setNewUserNotif(settings.notifications.newUser);
    setPaymentNotif(settings.notifications.payment);
    setCommentNotif(settings.notifications.comment);
  }, [settings]);

  const handleSave = async () => {
    await updateSettings.mutateAsync({
      platformName,
      supportEmail,
      maintenanceMode,
      notifications: {
        newUser: newUserNotif,
        payment: paymentNotif,
        comment: commentNotif,
      },
    });
  };

  const handlePasswordChange = async () => {
    setPwError(null);
    setPwSuccess(false);
    if (!currentPassword || !newPassword) {
      setPwError('Les deux champs sont requis.');
      return;
    }
    if (newPassword.length < 6) {
      setPwError('Le nouveau mot de passe doit contenir au moins 6 caractères.');
      return;
    }
    const user = auth.currentUser;
    if (!user || !user.email) return;
    setPwLoading(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setPwSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
    } catch {
      setPwError('Mot de passe actuel incorrect ou session expirée.');
    } finally {
      setPwLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-4 max-w-2xl">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-40 bg-white/5 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div>
        <h2 className="text-lg font-bold text-white">Paramètres</h2>
        <p className="text-xs text-white/40 mt-0.5">Configuration de la plateforme</p>
      </div>

      {/* General */}
      <section className="bg-[#0F0F0F] border border-white/5 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Globe size={16} className="text-[#FFD700]" />
          <h3 className="text-sm font-semibold text-white">Général</h3>
        </div>

        <div>
          <label className="text-xs text-white/50 block mb-1.5">Nom de la plateforme</label>
          <input
            type="text"
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FFD700]/40 transition-colors"
          />
        </div>

        <div>
          <label className="text-xs text-white/50 block mb-1.5">Email de support</label>
          <input
            type="email"
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FFD700]/40 transition-colors"
          />
        </div>

        <Toggle
          value={maintenanceMode}
          onChange={setMaintenanceMode}
          label="Mode maintenance"
          description="Affiche une page de maintenance aux visiteurs"
          danger
        />
      </section>

      {/* Notifications */}
      <section className="bg-[#0F0F0F] border border-white/5 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Bell size={16} className="text-[#FFD700]" />
          <h3 className="text-sm font-semibold text-white">Notifications admin</h3>
        </div>
        <Toggle
          value={newUserNotif}
          onChange={setNewUserNotif}
          label="Nouvel utilisateur"
          description="Notifier à chaque inscription"
        />
        <Toggle
          value={paymentNotif}
          onChange={setPaymentNotif}
          label="Paiement reçu"
          description="Notifier à chaque transaction"
        />
        <Toggle
          value={commentNotif}
          onChange={setCommentNotif}
          label="Nouveau commentaire"
          description="Notifier pour modération"
        />
      </section>

      {/* Security */}
      <section className="bg-[#0F0F0F] border border-white/5 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Shield size={16} className="text-[#FFD700]" />
          <h3 className="text-sm font-semibold text-white">Sécurité</h3>
        </div>

        <div>
          <label className="text-xs text-white/50 block mb-1.5">Mot de passe actuel</label>
          <div className="relative">
            <input
              type={showCurrent ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pr-10 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FFD700]/40 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
            >
              {showCurrent ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs text-white/50 block mb-1.5">Nouveau mot de passe</label>
          <div className="relative">
            <input
              type={showNew ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min. 6 caractères"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pr-10 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FFD700]/40 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
            >
              {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        {pwError && <p className="text-xs text-red-400">{pwError}</p>}
        {pwSuccess && (
          <p className="text-xs text-emerald-400 flex items-center gap-1">
            <Check size={12} /> Mot de passe mis à jour avec succès.
          </p>
        )}

        <Button
          size="sm"
          variant="outline"
          onClick={handlePasswordChange}
          isLoading={pwLoading}
        >
          Changer le mot de passe
        </Button>
      </section>

      {/* Save */}
      <Button
        size="md"
        variant="primary"
        onClick={handleSave}
        isLoading={updateSettings.isPending}
        className="gap-2"
      >
        <Save size={16} />
        {updateSettings.isPending ? 'Enregistrement...' : 'Enregistrer les modifications'}
      </Button>

      {updateSettings.isSuccess && (
        <p className="text-xs text-emerald-400 flex items-center gap-1 -mt-4">
          <Check size={12} /> Paramètres sauvegardés.
        </p>
      )}
    </div>
  );
}
