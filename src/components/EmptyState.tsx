import { Library } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
        <Library className="h-8 w-8 text-slate-400" />
      </div>
      <p className="text-lg font-medium text-slate-700">
        Your reading list is empty. Add your first book.
      </p>
    </div>
  );
}
