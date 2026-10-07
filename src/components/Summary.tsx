import { BookOpen, BookMarked, CheckCircle2 } from 'lucide-react';

interface SummaryProps {
  total: number;
  reading: number;
  finished: number;
}

export default function Summary({ total, reading, finished }: SummaryProps) {
  const items = [
    {
      label: 'Total Books',
      value: total,
      icon: BookOpen,
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      valueColor: 'text-slate-900',
    },
    {
      label: 'Currently Reading',
      value: reading,
      icon: BookMarked,
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      valueColor: 'text-blue-700',
    },
    {
      label: 'Finished',
      value: finished,
      icon: CheckCircle2,
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      valueColor: 'text-emerald-700',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className={`mb-2 flex h-9 w-9 items-center justify-center rounded-lg ${item.bg}`}>
              <Icon className={`h-5 w-5 ${item.text}`} />
            </div>
            <span className={`text-2xl font-bold ${item.valueColor}`}>{item.value}</span>
            <span className="mt-0.5 text-center text-xs font-medium text-slate-500 sm:text-sm">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
