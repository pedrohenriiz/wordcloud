'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { WordCount } from '@/lib/wordcloud';
import { layoutWords, PlacedWord } from '@/lib/placement';
import useObserver from './hooks/useObserver';
import useSetFontReady from './hooks/useSetFontReady';
import { handleDownload } from './utils/handleDownloadSvg';
import Board from './components/board';
import { BOARD_FONT_FAMILY } from './utils/boardFontFamily';

interface WordCloudProps {
  words: WordCount[];
}

export default function WordCloud({ words }: WordCloudProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const { containerRef, size } = useObserver();
  const { fontsReady } = useSetFontReady();

  const placed: PlacedWord[] = useMemo(() => {
    if (!fontsReady) return [];
    return layoutWords(words, size.width, size.height, {
      fontFamily: BOARD_FONT_FAMILY,
      seedRotation: true,
    });
  }, [words, size, fontsReady]);

  return (
    <div className='flex h-full flex-col gap-3'>
      <div className='flex items-center justify-between'>
        <h2 className='font-display text-lg text-chalk/80'>Quadro</h2>

        <button
          onClick={() => handleDownload(svgRef)}
          disabled={placed.length === 0}
          className='rounded-full border border-chalk/25 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-chalk/70 transition hover:border-mustard hover:text-mustard disabled:cursor-not-allowed disabled:opacity-30'
        >
          Baixar SVG
        </button>
      </div>

      <div
        ref={containerRef}
        className='board-texture relative min-h-105 flex-1 overflow-hidden rounded-lg border border-board-line bg-board-surface/60'
      >
        {words.length === 0 ? (
          <div className='flex h-full items-center justify-center px-8 text-center font-display text-xl italic text-chalk/35'>
            Cole um texto ao lado para começar a montar o quadro.
          </div>
        ) : (
          <Board placed={placed} size={size} svgRef={svgRef} />
        )}
      </div>
    </div>
  );
}
