import type { ReadingStatus } from '@/types';
import { FILTER_OPTIONS } from '@/types';

interface FilterBarProps {
  active: ReadingStatus | 'all';
  counts: Record<ReadingStatus | 'all', number>;
  onChange: (value: ReadingStatus | 'all') => void;
}

export default function FilterBar({ active, counts, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTER_OPTIONS.map((opt) => {
        const isActive = active === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
              isActive
                ? 'border-slate-800 bg-slate-800 text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {opt.label}
            <span
              className={`rounded-full px-1.5 text-xs ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {counts[opt.value] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
