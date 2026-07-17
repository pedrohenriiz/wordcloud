import { PlacedWord } from '@/lib/placement';
import { RefObject } from 'react';
import { BOARD_FONT_FAMILY } from '../utils/boardFontFamily';

interface BoardProps {
  svgRef: RefObject<SVGSVGElement | null>;
  size: {
    width: number;
    height: number;
  };
  placed: PlacedWord[];
}

export default function Board({ svgRef, size, placed }: BoardProps) {
  return (
    <svg
      ref={svgRef}
      viewBox={`${-size.width / 2} ${-size.height / 2} ${size.width} ${size.height}`}
      width='100%'
      height='100%'
      role='img'
      aria-label='Nuvem de palavras gerada a partir do texto'
    >
      {placed.map((word) => (
        <g
          key={word.text}
          transform={`translate(${word.x}, ${word.y}) rotate(${word.rotation})`}
        >
          <text
            x={0}
            y={0}
            fontFamily={BOARD_FONT_FAMILY}
            fontSize={word.fontSize}
            fontWeight={word.tier <= 1 ? 600 : 500}
            fill={word.color}
            textAnchor='middle'
            dominantBaseline='middle'
            className='transition-opacity duration-500'
          >
            {word.text}
          </text>
        </g>
      ))}
    </svg>
  );
}
