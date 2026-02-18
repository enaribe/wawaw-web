'use client';

import { Check, Flag, Trash2, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { useComments, useUpdateComment, useDeleteComment } from '@/lib/queries';
import { formatDate, cn } from '@/lib/utils';

export default function CommentsPage() {
  const { data: comments = [], isLoading } = useComments();
  const updateComment = useUpdateComment();
  const deleteComment = useDeleteComment();

  const pendingCount = comments.filter((c) => c.status === 'pending').length;
  const flaggedCount = comments.filter((c) => c.status === 'flagged').length;

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">Commentaires</h2>
          <p className="text-xs text-white/40 mt-0.5">
            {pendingCount} en attente · {flaggedCount} signalés
          </p>
        </div>
      </div>

      {/* Comments list */}
      <div className="space-y-3">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-[#0F0F0F] border border-white/5 rounded-2xl p-5 animate-pulse">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-white/10 rounded-full w-1/3" />
                  <div className="h-3 bg-white/5 rounded-full w-full" />
                  <div className="h-3 bg-white/5 rounded-full w-4/5" />
                </div>
              </div>
            </div>
          ))
        ) : comments.length === 0 ? (
          <div className="text-center py-16">
            <MessageSquare size={32} className="text-white/20 mx-auto mb-3" />
            <p className="text-white/30 text-sm">Aucun commentaire</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className={cn(
                'bg-[#0F0F0F] border rounded-2xl p-5 transition-colors',
                comment.status === 'flagged' ? 'border-red-500/20' : 'border-white/5'
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-white/70">
                      {comment.userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-sm font-semibold text-white">{comment.userName}</span>
                      <span className="text-xs text-white/30">sur</span>
                      <span className="text-xs text-[#FFD700]">{comment.contentTitle}</span>
                      <span className="text-xs text-white/30">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed">{comment.text}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <Badge
                    label={comment.status === 'approved' ? 'Approuvé' : comment.status === 'pending' ? 'En attente' : 'Signalé'}
                    variant={comment.status === 'approved' ? 'green' : comment.status === 'pending' ? 'orange' : 'red'}
                    size="sm"
                  />
                  <div className="flex items-center gap-1">
                    {comment.status !== 'approved' && (
                      <button
                        onClick={() => updateComment.mutate({ id: comment.id, data: { status: 'approved' } })}
                        className="p-1.5 rounded-lg text-white/40 hover:text-green-400 hover:bg-green-500/5 transition-colors"
                        title="Approuver"
                      >
                        <Check size={14} />
                      </button>
                    )}
                    <button
                      onClick={() => updateComment.mutate({ id: comment.id, data: { status: 'flagged' } })}
                      className="p-1.5 rounded-lg text-white/40 hover:text-orange-400 hover:bg-orange-500/5 transition-colors"
                      title="Signaler"
                    >
                      <Flag size={14} />
                    </button>
                    <button
                      onClick={() => deleteComment.mutate(comment.id)}
                      className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
