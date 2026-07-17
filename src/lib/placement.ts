import { WordCount } from './wordcloud';

export interface PlacedWord {
  text: string;
  count: number;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  rotation: number;
  color: string;
  tier: number;
}

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const PALETTE = ['#E8B33D', '#C1584B', '#8FAE8B', '#ECE7DA', '#7FA0A0'];

function rectsOverlap(a: Rect, b: Rect, pad = 3): boolean {
  return !(
    a.x + a.width + pad < b.x ||
    b.x + b.width + pad < a.x ||
    a.y + a.height + pad < b.y ||
    b.y + b.height + pad < a.y
  );
}

function spiralPoint(t: number, aspect: number): [number, number] {
  const angle = t * 0.35;
  const radius = t * 3.2;
  return [aspect * radius * Math.cos(angle), radius * Math.sin(angle)];
}

let measureCtx: CanvasRenderingContext2D | null = null;
function getMeasureCtx(): CanvasRenderingContext2D {
  if (!measureCtx) {
    const canvas = document.createElement('canvas');
    measureCtx = canvas.getContext('2d')!;
  }
  return measureCtx;
}

function measure(
  text: string,
  fontSize: number,
  fontFamily: string,
  weight: number,
): { width: number; height: number } {
  const ctx = getMeasureCtx();
  ctx.font = `${weight} ${fontSize}px ${fontFamily}`;
  const metrics = ctx.measureText(text);
  const width = metrics.width;
  const height = fontSize * 1.05;
  return { width, height };
}

export interface LayoutOptions {
  fontFamily: string;
  seedRotation?: boolean;
}

/**
 * Posiciona as palavras em espiral a partir do centro, evitando sobreposição.
 * Retorna coordenadas relativas ao centro (0,0) do quadro, com y crescendo para baixo.
 */
export function layoutWords(
  words: WordCount[],
  canvasWidth: number,
  canvasHeight: number,
  options: LayoutOptions,
): PlacedWord[] {
  if (words.length === 0) return [];

  const maxCount = words[0].count;
  const minCount = words[words.length - 1].count;
  const range = Math.max(1, maxCount - minCount);

  const minFont = Math.max(14, Math.min(canvasWidth, canvasHeight) * 0.028);
  const maxFont = Math.min(canvasWidth, canvasHeight) * 0.16;

  const placed: Rect[] = [];
  const results: PlacedWord[] = [];
  const aspect = canvasWidth / canvasHeight;

  // pseudo-random mas determinístico o suficiente por índice, para permitir
  // pequenas rotações "de alfinete" sem parecer aleatório demais.
  const rotationFor = (i: number) => {
    if (!options.seedRotation) return 0;
    const seq = [0, 0, 0, -6, 5, 0, 0, -4, 0, 6, 0, 0];
    return seq[i % seq.length];
  };

  words.forEach((w, i) => {
    const norm = (w.count - minCount) / range;
    const fontSize = Math.round(minFont + norm * (maxFont - minFont));
    const weight = norm > 0.55 ? 600 : 500;
    const { width, height } = measure(
      w.text,
      fontSize,
      options.fontFamily,
      weight,
    );

    let x = 0;
    let y = 0;
    let found = false;

    // primeiro tenta o centro exato para a palavra mais frequente
    for (let t = 0; t < 4000; t += 1) {
      const [dx, dy] = spiralPoint(t, aspect);
      x = dx;
      y = dy;

      const rect: Rect = {
        x: x - width / 2,
        y: y - height / 2,
        width,
        height,
      };

      const withinBounds =
        rect.x > -canvasWidth / 2 &&
        rect.x + rect.width < canvasWidth / 2 &&
        rect.y > -canvasHeight / 2 &&
        rect.y + rect.height < canvasHeight / 2;

      if (!withinBounds) continue;

      const overlaps = placed.some((p) => rectsOverlap(rect, p));
      if (!overlaps) {
        placed.push(rect);
        found = true;
        break;
      }
    }

    if (!found) return; // não coube; a palavra é omitida do desenho

    const tier =
      norm > 0.75 ? 0 : norm > 0.5 ? 1 : norm > 0.25 ? 2 : norm > 0.1 ? 3 : 4;

    results.push({
      text: w.text,
      count: w.count,
      x,
      y,
      width,
      height,
      fontSize,
      rotation: rotationFor(i),
      color: PALETTE[tier] ?? PALETTE[PALETTE.length - 1],
      tier,
    });
  });

  return results;
}
