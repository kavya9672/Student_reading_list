import { useMemo, useState } from 'react';
import { BookOpen } from 'lucide-react';
import type { ReadingStatus } from '@/types';
import { STATUS_ORDER } from '@/types';
import { useReadingList } from '@/hooks/useReadingList';
import AddBookForm from '@/components/AddBookForm';
import BookCard from '@/components/BookCard';
import EmptyState from '@/components/EmptyState';
import FilterBar from '@/components/FilterBar';
import Summary from '@/components/Summary';

type FilterValue = ReadingStatus | 'all';

export default function App() {
  const { books, addBook, updateStatus, removeBook } = useReadingList();
  const [filter, setFilter] = useState<FilterValue>('all');

  const counts = useMemo(() => {
    const base: Record<FilterValue, number> = {
      all: books.length,
      'want-to-read': 0,
      'reading': 0,
      'finished': 0,
    };
    for (const b of books) base[b.status]++;
    return base;
  }, [books]);

  const filteredBooks = useMemo(() => {
    const list = filter === 'all' ? books : books.filter((b) => b.status === filter);
    return [...list].sort((a, b) => {
      const ai = STATUS_ORDER.indexOf(a.status);
      const bi = STATUS_ORDER.indexOf(b.status);
      if (ai !== bi) return ai - bi;
      return b.createdAt - a.createdAt;
    });
  }, [books, filter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-white">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Reading List</h1>
              <p className="text-sm text-slate-500">Track the books you read, one page at a time.</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        <AddBookForm onAdd={addBook} existingTitles={books.map((b) => b.title)} />

        {books.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <Summary
              total={counts.all}
              reading={counts.reading}
              finished={counts.finished}
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-slate-800">
                {filter === 'all' ? 'All Books' : 'Filtered Books'}
                <span className="ml-2 text-sm font-normal text-slate-400">
                  {filteredBooks.length} shown
                </span>
              </h2>
              <FilterBar active={filter} counts={counts} onChange={setFilter} />
            </div>

            {filteredBooks.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-12 text-center text-slate-500">
                No books in this category.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onStatusChange={updateStatus}
                    onRemove={removeBook}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="mx-auto max-w-3xl px-4 pb-8 text-center text-sm text-slate-400 sm:px-6">
        Your reading list is saved on this device.
      </footer>
    </div>
  );
}
