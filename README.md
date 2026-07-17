# Word Cloud

Cole qualquer texto e veja as palavras mais frequentes ganharem destaque num quadro tipográfico, como um mural de espécimes: tamanho, cor e posição refletem o quanto cada palavra se repete.

**[🔗 Demo ao vivo](#)** · **[📸 Screenshot abaixo](#screenshots)**

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## O desafio

Desenvolver esse componente exigiu implementar toda a lógica de posicionamento sem recorrer a bibliotecas especializadas. O objetivo era distribuir dinamicamente os elementos na tela, evitando sobreposições, priorizando os itens mais relevantes e garantindo uma experiência fluida mesmo com atualizações em tempo real.

Os principais desafios técnicos envolveram:

1. Medir com precisão as dimensões de cada elemento antes da renderização para calcular corretamente a área ocupada.
2. Definir um algoritmo de posicionamento capaz de distribuir os elementos sem colisões, preservando a hierarquia visual conforme sua relevância.
3. Otimizar o processamento para manter a renderização responsiva durante alterações contínuas dos dados, sem comprometer a experiência do usuário.

A solução implementada em `lib/placement.ts`: cada palavra é medida com `canvas.measureText`, e depois posicionada percorrendo uma **espiral de Arquimedes** a partir do centro — testando a _bounding box_ da palavra a cada passo contra as já colocadas, até achar a primeira posição livre. Palavras são processadas em ordem decrescente de frequência, então as mais importantes "ganham" as posições centrais.

## Funcionalidades

- **Processamento de texto em tempo real**: tokenização, remoção de pontuação, contagem de frequência e filtro de _stopwords_ em português e inglês.
- **Layout em espiral sem sobreposição**, calculado com `canvas.measureText` para medir cada palavra com precisão antes de posicioná-la.
- **Controles ajustáveis**: número máximo de palavras, tamanho mínimo, ignorar palavras comuns, diferenciar maiúsculas/minúsculas.
- **Ranking das 10 palavras mais frequentes** com barras proporcionais.
- **Exportação em SVG** — o quadro pode ser baixado como vetor, pronto pra usar em outro lugar.
- **Totalmente client-side**: nenhum texto sai do navegador, não existe backend nem API externa.
- **Responsivo**, com `ResizeObserver` recalculando o layout quando a janela muda de tamanho.

## Stack técnica

| Camada                 | Tecnologia                                                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework              | [Next.js 16](https://nextjs.org/)                                                                                                           |
| Linguagem              | TypeScript                                                                                                                                  |
| Estilo                 | [Tailwind CSS v4](https://tailwindcss.com/) (configuração via `@theme` no CSS)                                                              |
| Tipografia             | [Fraunces](https://fonts.google.com/specimen/Fraunces) + [IBM Plex](https://fonts.google.com/specimen/IBM+Plex+Sans) via `next/font/google` |
| Lint/format            | [Biome](https://biomejs.dev/)                                                                                                               |
| Renderização do quadro | SVG puro, sem canvas nem lib de gráficos                                                                                                    |

## Pipeline de dados

1. **Tokenização** (`lib/wordcloud.ts`) — o texto é normalizado, dividido em palavras, e filtrado por tamanho mínimo e _stopwords_. Depois é ordenado por frequência.
2. **Escala** (`lib/placement.ts`) — a frequência de cada palavra é mapeada para um tamanho de fonte (interpolação linear entre um mínimo e um máximo, ambos proporcionais ao tamanho do quadro). O algoritmo de posicionamento em si está detalhado na seção **O desafio**, acima.
3. **Renderização** — o resultado vira elementos `<text>` dentro de um único `<svg>`, o que permite exportar o quadro inteiro como arquivo `.svg` sem gerar imagem rasterizada.

## Rodando localmente

```bash
git clone https://github.com/seu-usuario/quadro-de-palavras.git
cd quadro-de-palavras
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Build de produção

```bash
npm run build
npm start
```

## Estrutura do projeto

```
src/
├── app/
│   ├── layout.tsx          # fontes + metadata
│   ├── page.tsx            # composição da página (estado principal)
│   └── globals.css         # tema Tailwind v4 (@theme) + reset
├── components/
│   ├── InputPanel.tsx      # textarea + controles
│   ├── WordCloud/
│   │   ├── components/     # componentes locais
│   │   ├── hooks/          # hooks customizados
│   │   ├── utils/          # funções utilitárias
│   │   └── index.tsx       # renderização SVG do quadro
│   └── TopWordsList.tsx    # ranking das palavras mais frequentes
└── lib/
    ├── wordcloud.ts        # tokenização e contagem de frequência
    ├── placement.ts        # algoritmo de layout em espiral
    └── stopwords.ts        # listas de stopwords PT/EN
```

## Personalização

- **Cores e tipografia**: tudo fica em `@theme` dentro de `src/app/globals.css` — basta trocar as variáveis `--color-*` e `--font-*`.
- **Stopwords**: edite `src/lib/stopwords.ts` para adicionar ou remover palavras ignoradas.
- **Texto de exemplo**: constante `SAMPLE_TEXT` em `src/app/page.tsx`.

## Possíveis melhorias futuras

- [ ] Exportar também como PNG (rasterizando o SVG em canvas)
- [ ] Suporte a upload de arquivo `.txt` / `.pdf`
- [ ] Testes automatizados para o algoritmo de posicionamento

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais detalhes.

## Autor

Feito por **Pedro Henrique** — [LinkedIn](https://www.linkedin.com/in/pedrohenriquedeveloper/) · [GitHub](https://github.com/pedrohenriiz)

---

<a id="screenshots"></a>

## Screenshots
<img width="1483" height="908" alt="image" src="https://github.com/user-attachments/assets/7d31b51e-d217-45c4-a3cc-e6bd8f89d4af" />

<img width="1426" height="880" alt="image" src="https://github.com/user-attachments/assets/2ddface4-10fc-4f31-b22d-824433bc4348" />

