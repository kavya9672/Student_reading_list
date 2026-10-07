import { useState, useRef, useEffect } from 'react';
import { MoreVertical, Trash2 } from 'lucide-react';
import type { Book, ReadingStatus } from '@/types';
import { STATUS_LABELS, STATUS_ORDER } from '@/types';
import { STATUS_STYLES, STATUS_DOT } from '@/components/AddBookForm';

interface BookCardProps {
  book: Book;
  onStatusChange: (id: string, status: ReadingStatus) => void;
  onRemove: (id: string) => void;
}

export default function BookCard({ book, onStatusChange, onRemove }: BookCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${STATUS_DOT[book.status]}`} />
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[book.status]}`}
          >
            {STATUS_LABELS[book.status]}
          </span>
        </div>

        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Book actions"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full z-10 mt-1 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
              <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Change status
              </p>
              {STATUS_ORDER.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    onStatusChange(book.id, s);
                    setMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition hover:bg-slate-50 ${
                    book.status === s ? 'font-semibold text-slate-800' : 'text-slate-600'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${STATUS_DOT[s]}`} />
                  {STATUS_LABELS[s]}
                </button>
              ))}
              <div className="my-1 border-t border-slate-100" />
              <button
                onClick={() => {
                  onRemove(book.id);
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-rose-500 transition hover:bg-rose-50"
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      <h3 className="text-lg font-semibold leading-snug text-slate-800">{book.title}</h3>

      <button
        onClick={() => onRemove(book.id)}
        className="mt-4 flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-rose-500 transition hover:border-rose-200 hover:bg-rose-50 active:scale-[0.99]"
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </button>
    </div>
  );
}
