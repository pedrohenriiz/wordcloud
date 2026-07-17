'use client';

import { useMemo, useState } from 'react';
import InputPanel from '@/components/InputPanel';
import TopWordsList from '@/components/TopWordsList';
import { countWords, DEFAULT_OPTIONS, WordCloudOptions } from '@/lib/wordcloud';
import WordCloud from '@/components/WordCloud';

const SAMPLE_TEXT = `A linguagem é o instrumento mais antigo que a humanidade construiu.
Toda palavra carrega uma história, um uso, um contexto que se repete e se
transforma ao longo do tempo. Quando lemos um texto, algumas palavras
aparecem várias vezes: elas revelam o tema, a intenção, o ritmo de quem
escreveu. Um quadro de palavras é justamente isso: uma forma visual de
notar repetição, de notar padrão, de notar o que insiste em aparecer.
Repetição é significado. Padrão é significado. E toda palavra, pequena
ou grande, comum ou rara, ajuda a compor o retrato de um texto.`;

export default function Home() {
  const [text, setText] = useState('');
  const [options, setOptions] = useState<WordCloudOptions>(DEFAULT_OPTIONS);

  const words = useMemo(() => countWords(text, options), [text, options]);

  return (
    <main className='mx-auto flex min-h-screen w-full max-w-350 flex-col gap-4 p-4 lg:h-screen lg:flex-row lg:overflow-hidden lg:p-6'>
      <aside className='flex w-full flex-col gap-4 lg:h-full lg:w-95 lg:shrink-0 lg:overflow-y-auto'>
        <InputPanel
          text={text}
          onTextChange={setText}
          options={options}
          onOptionsChange={setOptions}
          wordCountFound={words.length}
          onSample={() => setText(SAMPLE_TEXT)}
          onClear={() => setText('')}
        />
        <TopWordsList words={words} />
      </aside>

      <section className='min-h-120 flex-1 lg:h-full'>
        <WordCloud words={words} />
      </section>
    </main>
  );
}
