import { STOPWORDS_PT, STOPWORDS_EN } from './stopwords';

export interface WordCount {
  text: string;
  count: number;
}

export interface WordCloudOptions {
  maxWords: number;
  minLength: number;
  ignoreStopwords: boolean;
  caseSensitive: boolean;
}

export const DEFAULT_OPTIONS: WordCloudOptions = {
  maxWords: 60,
  minLength: 3,
  ignoreStopwords: true,
  caseSensitive: false,
};

/** Tokeniza um texto bruto em palavras, removendo pontuação e números isolados. */
function tokenize(text: string): string[] {
  const normalized = text
    .replace(/[’‘]/g, "'")
    .replace(/[^\p{L}\p{N}'\s-]/gu, ' ');
  return normalized
    .split(/\s+/)
    .map((w) =>
      w
        .trim()
        .replace(/^'+|'+$/g, '')
        .replace(/^-+|-+$/g, ''),
    )
    .filter(Boolean);
}

/** Conta a frequência das palavras de um texto, aplicando os filtros escolhidos. */
export function countWords(
  text: string,
  options: Partial<WordCloudOptions> = {},
): WordCount[] {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const tokens = tokenize(text);
  const counts = new Map<string, number>();

  for (const raw of tokens) {
    if (raw.length < opts.minLength) continue;
    const lower = raw.toLowerCase();
    if (/^\d+$/.test(lower)) continue;
    if (
      opts.ignoreStopwords &&
      (STOPWORDS_PT.has(lower) || STOPWORDS_EN.has(lower))
    )
      continue;

    const key = opts.caseSensitive ? raw : lower;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([text, count]) => ({ text, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, opts.maxWords);
}
