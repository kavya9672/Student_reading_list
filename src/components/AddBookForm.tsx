import { useState } from 'react';
import { Plus, BookOpen } from 'lucide-react';
import type { Book, ReadingStatus } from '@/types';
import { STATUS_LABELS, STATUS_ORDER } from '@/types';

interface AddBookFormProps {
  onAdd: (title: string, status: ReadingStatus) => void;
  existingTitles: string[];
}

const STATUS_STYLES: Record<ReadingStatus, string> = {
  'want-to-read': 'border-amber-300 bg-amber-50 text-amber-700 focus:border-amber-400',
  'reading': 'border-blue-300 bg-blue-50 text-blue-700 focus:border-blue-400',
  'finished': 'border-emerald-300 bg-emerald-50 text-emerald-700 focus:border-emerald-400',
};

const STATUS_DOT: Record<ReadingStatus, string> = {
  'want-to-read': 'bg-amber-400',
  'reading': 'bg-blue-400',
  'finished': 'bg-emerald-400',
};

export default function AddBookForm({ onAdd, existingTitles }: AddBookFormProps) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<ReadingStatus>('want-to-read');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError('Please enter a title.');
      return;
    }
    if (trimmed.length > 60) {
      setError('Book title must be 60 characters or fewer.');
      return;
    }
    const normalized = trimmed.replace(/\s+/g, ' ').toLowerCase();
    if (existingTitles.some((t) => t.replace(/\s+/g, ' ').toLowerCase() === normalized)) {
      setError('This book is already in your reading list.');
      return;
    }
    onAdd(title, status);
    setTitle('');
    setStatus('want-to-read');
    setError('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
    >
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800">
        <Plus className="h-5 w-5 text-slate-500" />
        Add a Book
      </h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="book-title" className="mb-1.5 block text-sm font-medium text-slate-600">
            Book title
          </label>
          <input
            id="book-title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            placeholder="e.g. The Great Gatsby"
            maxLength={120}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-800 placeholder:text-slate-400 transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
          {error && <p className="mt-1.5 text-sm text-rose-500">{error}</p>}
        </div>

        <div>
          <span className="mb-1.5 block text-sm font-medium text-slate-600">Reading status</span>
          <div className="flex flex-wrap gap-2">
            {STATUS_ORDER.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                  status === s
                    ? STATUS_STYLES[s]
                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${STATUS_DOT[s]}`} />
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 font-medium text-white transition hover:bg-slate-700 active:scale-[0.99] sm:w-auto sm:px-6"
        >
          <BookOpen className="h-4 w-4" />
          Add to Reading List
        </button>
      </div>
    </form>
  );
}

export { STATUS_STYLES, STATUS_DOT };
