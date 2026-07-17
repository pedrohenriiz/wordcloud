import { RefObject } from 'react';

export const handleDownload = (svgRef: RefObject<SVGSVGElement | null>) => {
  const svg = svgRef.current;
  if (!svg) return;
  const serializer = new XMLSerializer();
  const source = serializer.serializeToString(svg);
  const blob = new Blob(['<?xml version="1.0" standalone="no"?>\r\n', source], {
    type: 'image/svg+xml;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'nuvem-de-palavras.svg';
  link.click();
  URL.revokeObjectURL(url);
};
