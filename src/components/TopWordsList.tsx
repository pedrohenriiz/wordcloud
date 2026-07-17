import { WordCount } from '@/lib/wordcloud';

const TIER_COLORS = ['#E8B33D', '#C1584B', '#8FAE8B', '#ECE7DA', '#3c6363'];

export default function TopWordsList({ words }: { words: WordCount[] }) {
  const top = words.slice(0, 10);
  const max = top[0]?.count ?? 1;

  if (top.length === 0) return null;

  return (
    <div className='rounded-lg border border-board-line bg-board-surface/60 p-4'>
      <p className='mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted'>
        Ranking de palavras
      </p>
      <ol className='flex flex-col gap-2'>
        {top.map((word, index) => (
          <li key={word.text} className='flex items-center gap-3'>
            <span className='w-5 font-mono text-xs text-chalk/35'>
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className='w-24 shrink-0 truncate font-body text-sm text-chalk/85'>
              {word.text}
            </span>
            <span className='h-1.5 flex-1 overflow-hidden rounded-full bg-board/70'>
              <span
                className='block h-full rounded-full'
                style={{
                  width: `${Math.max(6, (word.count / max) * 100)}%`,
                  backgroundColor: TIER_COLORS[Math.min(index, 4)],
                }}
              />
            </span>
            <span className='w-6 text-right font-mono text-xs text-chalk/50'>
              {word.count}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
