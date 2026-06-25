# LuminOT — Portal Temporal

Landing "portal" com o brasão do jogo ao centro: à esquerda **O Passado** — redireciona para o **site oficial existente** (PHP/AAC, em `luminot-web/`); à direita **O Futuro** (`/novo`), a versão imersiva construída aqui. Clicar em um lado dispara uma transição cinematográfica (GSAP) antes de navegar.

Tudo (portal, `/novo` e o site oficial) é servido sob a **mesma porta pública (3000)** através de um proxy reverso nginx — veja "Arquitetura unificada" abaixo.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- GSAP (+ ScrollTrigger) para a timeline da transição e os reveals de scroll
- React Three Fiber + drei + postprocessing para o hero 3D da versão `/novo`
- nginx como proxy reverso unificando Next.js + o site PHP/AAC numa porta só

## Como rodar (via Docker — recomendado)

Na raiz do workspace (`D:\Workspace\LuminOT`):

```bash
docker compose up -d
```

Isso sobe: `web` (PHP/AAC), `db` (MariaDB), `adminer`, `next` (este app, em modo dev com hot reload) e `proxy` (nginx, porta pública).

Abra `http://localhost:3000`:

- `/` — Portal (tela de escolha)
- **Entrar no Passado** → transição cinematográfica + redirect para `/passado/` (site oficial, proxied)
- `/novo` — versão imersiva (scroll cinemático), construída neste app

Outras portas ainda diretas (debug): `:8080` site oficial sem proxy, `:8081` Adminer, `:3306` MySQL.

## Como rodar só o Next (sem Docker)

```bash
cd portal-web
npm install
npm run dev
```

Sobe em `http://localhost:3000` isolado (sem o proxy/site oficial). `NEXT_PUBLIC_CLASSIC_SITE_URL` em `.env.local` decide para onde "Entrar no Passado" aponta nesse modo — ajuste para `http://localhost:8080` se for testar contra o container do site oficial diretamente.

`npm run build` e `npm run lint` validam o projeto antes de publicar.

## Arquitetura unificada (proxy)

Dois processos não podem escutar a mesma porta — por isso o nginx (`docker/proxy/default.conf`) fica na frente de tudo, na porta 3000, e decide para onde mandar cada request:

- `/`, `/novo`, `/_next/*`, `/icon-game.svg` → `next:3000` (este app)
- `/passado/*` → `web:80` (site oficial), com o prefixo `/passado` removido antes de chegar no Apache
- caminhos conhecidos do AAC (`/templates`, `/images`, `/account`, `/admin`, `/ajax*.php`, etc.) → `web:80` direto, sem prefixo — rede de segurança para qualquer link absoluto de raiz que o AAC gere
- qualquer outro caminho não reclamado pelo portal → cai no site oficial (`web:80`), preservando o comportamento de hoje

**Importante**: o proxy usa `Host: $http_host` (não `$host`) ao repassar para o Apache — o MyAAC monta URLs absolutas a partir do header Host, e `$host` do nginx descarta a porta, quebrando todos os assets (`http://localhost/...` sem `:3000`). Se for tocar nesse arquivo, mantenha `$http_host`.

## Variáveis de ambiente

Veja `.env.example`. Principal:

- `NEXT_PUBLIC_CLASSIC_SITE_URL` — URL do site oficial clássico. Com o proxy unificado, é `http://localhost:3000/passado/`. Em produção, ajuste para o domínio real.

## Estrutura

```
src/
  app/
    page.tsx          Portal (home)
    novo/page.tsx      Skin imersivo
  components/
    portal/            Split-screen + ícone central
    transitions/        Provider + timelines GSAP ("rumo ao passado"/"rumo ao futuro")
    future/               Skin imersivo (glass panels, hero 3D, scroll reveal)
  lib/
    data/               Camada de dados mockada, tipada — usada apenas pelo /novo
    motion/              Hooks de prefers-reduced-motion, detecção de SO, mock fetch
    audio/                Toggle de mudo + sons sintetizados da transição
```

## Pontos de extensão

- **Ícone/brasão do jogo**: troque `public/icon-game.svg` pelo arquivo real (SVG ou PNG). Está referenciado em `PortalSplit.tsx`, `HeroSection.tsx` e na metadata de `layout.tsx`.
- **Site oficial (passado)**: o destino é controlado por `CLASSIC_SITE_URL` em `src/components/transitions/TransitionProvider.tsx`, lido de `NEXT_PUBLIC_CLASSIC_SITE_URL`. Não há mais uma versão "clássica" replicada dentro deste app — o redirect aponta direto para o site PHP/AAC real.
- **Dados reais do /novo**: substitua os mocks em `src/lib/data/index.ts` por chamadas ao AAC/back-end real (ou a uma API route). O shape dos tipos está em `src/lib/data/types.ts`.
- **Áudio da transição**: sintetizado via Web Audio API em `src/lib/audio/transitionSounds.ts`, controlado pelo toggle de mudo em `src/lib/audio/useMuted.ts` (mudo por padrão, persistido em `localStorage`).
- **Acessibilidade**: `useReducedMotion` (em `lib/motion`) já é respeitado no `TransitionProvider` — qualquer nova animação cinematográfica deve checar esse hook e ter um fallback de fade simples.
- **Proxy nginx**: `docker/proxy/default.conf`. Se a estrutura de pastas do site oficial mudar (novo top-level dir), adicione-o na regex de "rede de segurança".
