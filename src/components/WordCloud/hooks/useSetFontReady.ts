import { useEffect, useState } from 'react';

export default function useSetFontReady() {
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.fonts.ready.then(() => setFontsReady(true));
    const t = setTimeout(() => setFontsReady(true), 600);
    return () => clearTimeout(t);
  }, []);

  return { fontsReady };
}
