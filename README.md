# Central de Onboarding Maiver

Ferramenta web interna para centralizar o acompanhamento de onboarding de clientes da Maiver — substituindo planilhas e e-mails por uma interface simples, com progresso visual e checklist padronizado.

## Demo

> **Link de produção:** adicione aqui a URL após deploy (Vercel/Netlify).  
> Exemplo: `https://central-onboarding-maiver.vercel.app`

## Funcionalidades

- **Cadastro de clientes** — empresa, contato, e-mail, telefone, plano, data de início e consultor
- **Checklist fixo (6 etapas)** — marcar conclusão e registrar nota opcional por etapa
- **Dashboard** — lista de clientes, barra de progresso, status (Em andamento / Concluído / Atrasado), filtro por consultor e contadores
- **Persistência local** — dados salvos no `localStorage` do navegador

### Regra de status

| Status | Condição |
|--------|----------|
| Concluído | Todas as 6 etapas marcadas |
| Atrasado | Mais de 30 dias desde o início **e** onboarding incompleto |
| Em andamento | Demais casos |

O status é **calculado em tempo real** (não é armazenado), evitando inconsistências.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- **shadcn/ui** (padrão de componentes) + **CVA** + **tailwind-merge**
- **Lucide React** (ícones)
- **Radix UI** (checkbox, label, separator)
- Zustand (estado global)
- localStorage (persistência)

## Design system

Documentação completa em [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md).

Resumo:
- Tokens semânticos em `src/index.css` (primary, success, warning, muted…)
- Componentes base em `src/components/ui/` (Button, Badge, Card, FormField…)
- Layout operacional: sidebar (`AppShell`), métricas (`MetricCard`), checklist com timeline
- Motion discreto com suporte a `prefers-reduced-motion`
- Acessibilidade: skip link, landmarks, `aria-live` no toast, labels em cards e filtros

## Como executar

**Pré-requisitos:** Node.js 18+

```bash
# Clonar o repositório
git clone <url-do-repositorio>
cd desafio-maiver

# Instalar dependências
npm install

# Ambiente de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173`.

```bash
# Build de produção
npm run build

# Preview local do build
npm run preview
```

## Deploy (Vercel — recomendado)

1. Envie o código para um repositório no GitHub
2. Acesse [vercel.com](https://vercel.com) e importe o repositório
3. Configuração detectada automaticamente (Vite):
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Clique em **Deploy**

Alternativas: [Netlify](https://netlify.com) ou [GitHub Pages](https://pages.github.com) (projetos estáticos).

## Arquitetura

```
src/
├── components/       # UI reutilizável (layout, ui, clients, checklist, dashboard)
├── pages/            # Telas (Dashboard, Formulário, Detalhe/Checklist)
├── hooks/            # Efeitos e derivados (hydrate, filtros)
├── services/         # Persistência (localStorage)
├── store/            # Zustand (clientes, navegação, toast)
├── types/            # Contratos TypeScript
├── utils/            # Regras puras (status, progresso, validação)
└── constants/        # Checklist, planos, consultores, chaves
```

### Decisões técnicas

| Decisão | Motivo |
|---------|--------|
| Navegação por `AppView` no store | 3 telas — evita `react-router` desnecessário no MVP |
| Status derivado | Fonte única de verdade no checklist + data de início |
| Zustand + `saveClients` explícito | Persistência previsível, fácil de debugar |
| Componentes `ui/` isolados | Telas enxutas; consistência visual |
| Sem autenticação | Escopo do desafio; ferramenta interna simulada |

### Fluxo de dados

```
Pages → Store (Zustand) → services/storage → localStorage
              ↓
           utils (status, progresso, validação)
```

## Capturas de tela

Adicione imagens em `docs/screenshots/` e referencie aqui:

| Tela | Arquivo sugerido |
|------|------------------|
| Dashboard | `docs/screenshots/dashboard.png` |
| Cadastro | `docs/screenshots/cadastro.png` |
| Checklist | `docs/screenshots/checklist.png` |

## Estrutura de entrega (desafio)

- [x] MVP funcional
- [x] README com instruções
- [x] Diário de Uso da IA (abaixo)
- [ ] Link público de deploy (preencher após publicar)
- [ ] Screenshots no README

---

## Diário de Uso da IA

Documentação exigida pelo desafio Vibe Coding (20% da avaliação). Escrita de forma direta sobre **como** o projeto foi construído com IA — incluindo erros, correções e decisões conscientes de escopo.

---

### 1. Ferramentas utilizadas e por quê

| Ferramenta | Papel no projeto |
|------------|------------------|
| **Cursor** | Ferramenta principal. Editor + agente para gerar código, refatorar, rodar build e iterar UI/UX em conversas com contexto do repositório. |
| **Claude (via Cursor)** | Modelo usado nas sessões de desenvolvimento; bom em TypeScript, React e raciocínio arquitetural quando o prompt delimita escopo. |
| **Vite + React + TypeScript** | Stack do desafio; a IA conhece bem o ecossistema e permite `npm run dev` com um comando. |
| **Tailwind CSS 4 + shadcn/ui** | Adotados na fase de UI para consistência visual (CVA, Radix, Lucide) sem template pronto de dashboard. |
| **Zustand + localStorage** | Escolha explícita no prompt inicial: estado simples, persistência zero-config para MVP. |

**Por que não usei outras ferramentas no fluxo principal**

- **ChatGPT / Claude.ai no browser:** usei pontualmente para validar ideias, mas o desenvolvimento foi no Cursor para manter código e contexto no mesmo lugar.
- **Copilot isolado:** redundante com o agente do Cursor para tarefas multi-arquivo e refatoração.
- **Templates prontos (MUI, AdminLTE, etc.):** proibidos pelo desafio e contrários ao objetivo de mostrar direcionamento consciente da IA.

**Estratégia que mais funcionou:** dois **prompts-mestre** (MVP + UI) + comandos curtos de continuação (`continuar etapa 2`, `continuar etapa 3`, `continuar etapa 4 UI`…), em vez de um único prompt pedindo o app inteiro.

---

### 2. Prompts utilizados — o que gerou, o que precisou de correção

Os dois prompts-mestre estão versionados no repositório. Para ler o texto integral enviado à IA, consulte os arquivos indicados em cada item abaixo.

#### Prompt 1 — Engenheiro Sênior + MVP (prompt-mestre inicial)

**Arquivo com o prompt completo:** [`INITIAL_PROMPT.md`](INITIAL_PROMPT.md)

Usei esse prompt no Cursor logo no início do desafio. Ele define o papel da IA (Engenheiro Sênior), o contexto da Central de Onboarding Maiver, funcionalidades obrigatórias, restrições (sem auth, `localStorage`, sem templates), stack (React/Vite/TS/Tailwind/Zustand), estrutura de pastas em `src/`, padrões de código e UI, e a regra central de **entregar em etapas incrementais** — sem gerar o app inteiro de uma vez. O arquivo também inclui o PDF do desafio como referência.

**O que a IA gerou**

- Análise do PDF do desafio e proposta de arquitetura (navegação por `AppView` no store, status calculado, não persistido).
- Etapa 1: scaffold, tipos, constants, utils (`status`, `progress`, `validation`), store Zustand, `localStorage`, layout base e páginas placeholder.
- Etapas seguintes (após meus "continuar etapa N"): componentes UI, telas funcionais, toast, métricas, README.

**Funcionou de primeira?**

- **Arquitetura e organização de pastas:** sim, na maior parte.
- **Scaffold Vite:** não. No Windows/PowerShell o comando `npm create vite` gerou projeto **vanilla TypeScript** em vez de `react-ts`. Corrigi instalando React, plugin e Tailwind manualmente.
- **Build TypeScript:** pequenos ajustes (`ignoreDeprecations`, paths `@/*`).

**O que redirecionei depois**

| Problema | Correção |
|----------|----------|
| Selector `getClientById` no Zustand | Trocado por `s.clients.find(...)` para re-render ao atualizar checklist |
| Notas do checklist salvando a cada tecla | Salvar no `onBlur` + hint "Salva ao sair do campo" |
| Botão "Novo cliente" duplicado (header + sidebar) | Removido do dashboard; CTA na sidebar + empty states + mobile |
| Descrições genéricas sob títulos | Removidas; mantido só metadado útil no detalhe do cliente |

---

#### Prompt 2 — Product Designer + UI SaaS (segundo prompt-mestre)

**Arquivo com o prompt completo:** [`DESIGN_PROMPT.md`](DESIGN_PROMPT.md)

Após o MVP funcional, enviei este segundo prompt-mestre pedindo evolução de UI/UX: stack visual obrigatória (**shadcn/ui**, Tailwind, Lucide, CVA, tailwind-merge), referências de produtos internos (Linear, Vercel, Stripe), foco em clareza operacional (sem UI “marketing”) e entrega em **6 etapas** (análise → design system → layout → componentes → estados → refinamento). O texto completo está no arquivo acima.

**O que a IA gerou**

- Tokens CSS semânticos, `lib/utils` com `cn()`, componentes no padrão shadcn.
- `AppShell` com sidebar, `MetricCard`, `ProgressCard`, `OnboardingChecklist`, formulário em seções.
- Skeletons, transições leves, a11y (skip link, landmarks), `docs/DESIGN_SYSTEM.md`.

**Funcionou de primeira?**

- Design system e layout: sim, com iterações por etapa (`continuar etapa 4 UI`, etc.).
- **UX copy:** a IA incluiu muitas descrições explicativas sob títulos. **Critiquei e simplifiquei** — ferramentas internas costumam ter só título ou metadado contextual, não parágrafo tutorial.
- **Espaçamento:** precisei pedir ajustes explícitos entre título e conteúdo.

**Comandos curtos que funcionaram bem**

- `continuar etapa 2` → componentes base
- `continuar etapa 3` → telas + regras de negócio
- `continuar etapa 4 UI` → checklist + formulário em seções
- `continuar etapa 5 UI` → skeletons e motion
- `continuar etapa 6 UI` → a11y e polimento

Esses prompts curtos funcionaram porque o **prompt-mestre já tinha definido o contrato** (stack, tom, etapas, o que evitar).

---

#### Prompt 3 — Ajuste pontual (exemplo)

> *"Implementar máscara de telefone brasileiro com DDD e espaçamento."*

**Gerou:** `utils/phone.ts` com `(11) 99999-9999`, validação 10/11 dígitos, integração no formulário.

**Funcionou de primeira?** Sim.

---

### 3. Parte mais difícil de construir com IA — e como resolvi

**1) Estado reativo (Zustand) + UI**

A IA centraliza bem no store, mas uma versão da página de detalhe observava `getClientById` (referência estável de função). O checklist atualizava no `localStorage`, porém **a tela não re-renderizava**.

*Resolução:* revisar o fluxo `ação → set(clients) → componente observa array` e corrigir o selector. Lição: **sempre validar se o hook observa dado mutável, não getter.**

**2) Refino de UI sem virar "template genérico"**

Com prompt amplo, a IA tende a adicionar texto explicativo, botões duplicados e decoração. Precisei **intervir com critério de produto** (remover descrições óbvias, um CTA primário por contexto, sidebar como navegação principal).

*Resolução:* prompts de UI com restrições explícitas + revisão humana após cada etapa.

**3) Consistência entre fases MVP → shadcn**

O MVP começou com componentes UI simples; depois migrou para shadcn. Risco de duplicação.

*Resolução:* migrar mantendo API legada (`Button` com `primary` → CVA `default`) e validar com `npm run build` a cada etapa.

---

### 4. O que escolhi não construir (ou simplificar) — e por quê

| Decisão | Motivo |
|---------|--------|
| **Autenticação / login** | Fora do escopo do PDF; ferramenta interna simulada |
| **Backend / API / Supabase** | `localStorage` atende MVP e deploy estático em 1 comando |
| **react-router** | 3 views controladas no store (`dashboard`, `new-client`, `client-detail`) |
| **Editar / excluir cliente** | Priorizei fluxo feliz: cadastrar → acompanhar → concluir checklist |
| **Consultor em texto livre** | Lista fixa garante filtro consistente e menos validação |
| **Checklist configurável** | PDF pede etapas fixas; template em `constants/checklist.ts` |
| **Gráficos / analytics** | PDF valoriza clareza; métricas em cards são suficientes |
| **Testes automatizados** | Prazo do desafio; regras isoladas em `utils/` para testar depois |
| **Descrições longas na UI** | Reduzem escaneabilidade; padrão de SaaS interno é título direto |
| **Dark mode** | Escopo extra; tokens CSS já permitem evolução futura |

---

### 5. O que faria diferente com mais tempo

1. **Testes unitários** em `utils/status`, `utils/validation`, `utils/phone` e `utils/progress`.
2. **Persistência real** (Supabase ou API) com auth interna da Maiver.
3. **CRUD completo** de clientes (editar, arquivar) e histórico de alterações.
4. **Exportação** (CSV/PDF) para o time de operações.
5. **Notificações** para onboardings atrasados (>30 dias).
6. **CI com Lighthouse/axe** para acessibilidade regressiva.
7. **Design system desde a etapa 1** — um único prompt-mestre já com shadcn, evitando migração visual em segunda fase.

---

### Limitações conhecidas do MVP

- Dados **apenas no navegador** — limpar cache ou trocar de máquina perde informações.
- Consultores em **lista fixa** (sem CRUD de equipe).
- Sem **auditoria** de quem alterou qual etapa.
- Sem **colaboração simultânea** entre consultores.

Documentação visual: [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md).

---

## Licença

Projeto desenvolvido para o **Desafio Vibe Coding — Desenvolvedor Maiver** (2025).
