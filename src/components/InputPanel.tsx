'use client';

import { WordCloudOptions } from '@/lib/wordcloud';

interface InputPanelProps {
  text: string;
  options: WordCloudOptions;
  wordCountFound: number;
  onTextChange: (text: string) => void;
  onOptionsChange: (options: WordCloudOptions) => void;
  onSample: () => void;
  onClear: () => void;
}

export default function InputPanel({
  text,
  options,
  wordCountFound,
  onTextChange,
  onOptionsChange,
  onSample,
  onClear,
}: InputPanelProps) {
  return (
    <div className='flex h-full flex-col gap-5 rounded-lg border border-board-line bg-board-surface/60 p-5'>
      <div>
        <h1 className='mt-1 font-display text-2xl text-chalk'>
          Quadro de Palavras
        </h1>
        <p className='mt-2 text-sm leading-relaxed text-chalk/60'>
          Cole ou digite um texto. As palavras mais repetidas ganham destaque e
          são fixadas no quadro ao lado, como espécimes num mural.
        </p>
      </div>

      <label className='flex flex-1 flex-col gap-2'>
        <span className='font-mono text-[11px] uppercase tracking-wider text-muted'>
          Texto
        </span>
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder='Cole aqui um artigo, uma redação, letras de música, o que quiser...'
          className='min-h-45 flex-1 resize-none rounded-md border border-board-line bg-board/70 p-3 font-body text-sm leading-relaxed text-chalk placeholder:text-chalk/30 focus:border-mustard/60'
        />
      </label>

      <div className='flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider'>
        <button
          onClick={onSample}
          className='rounded-full border border-chalk/25 px-3 py-1 text-chalk/70 transition hover:border-chalk hover:text-chalk hover:cursor-pointer'
        >
          Usar texto de exemplo
        </button>
        <button
          onClick={onClear}
          className='rounded-full border border-chalk/25 px-3 py-1 text-chalk/70 transition hover:border-brick hover:text-brick hover:cursor-pointer'
        >
          Limpar
        </button>
        <span className='ml-auto text-chalk/40'>
          {wordCountFound} termo{wordCountFound === 1 ? '' : 's'} únicos
        </span>
      </div>

      <div className='grid gap-4 border-t border-board-line pt-4'>
        <label className='flex flex-col gap-1.5'>
          <div className='flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted'>
            <span>Máx. de palavras</span>
            <span>{options.maxWords}</span>
          </div>
          <input
            type='range'
            min={10}
            max={120}
            step={5}
            value={options.maxWords}
            onChange={(e) =>
              onOptionsChange({ ...options, maxWords: Number(e.target.value) })
            }
            className='accent-mustard'
          />
        </label>

        <label className='flex flex-col gap-1.5'>
          <div className='flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted'>
            <span>Tamanho mínimo da palavra</span>
            <span>{options.minLength}</span>
          </div>
          <input
            type='range'
            min={1}
            max={8}
            step={1}
            value={options.minLength}
            onChange={(e) =>
              onOptionsChange({
                ...options,
                minLength: Number(e.target.value),
              })
            }
            className='accent-mustard'
          />
        </label>

        <label className='flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted'>
          <span>Ignorar palavras comuns (de, para, the...)</span>
          <input
            type='checkbox'
            checked={options.ignoreStopwords}
            onChange={(e) =>
              onOptionsChange({
                ...options,
                ignoreStopwords: e.target.checked,
              })
            }
            className='h-4 w-4 accent-mustard'
          />
        </label>

        <label className='flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted'>
          <span>Diferenciar maiúsculas/minúsculas</span>
          <input
            type='checkbox'
            checked={options.caseSensitive}
            onChange={(e) =>
              onOptionsChange({
                ...options,
                caseSensitive: e.target.checked,
              })
            }
            className='h-4 w-4 accent-mustard'
          />
        </label>
      </div>
    </div>
  );
}
