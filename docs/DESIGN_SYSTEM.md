# Design System — Central de Onboarding Maiver

Guia visual e de componentes do MVP. Identidade alinhada à [Maiver](https://maiver.com.br): preto, branco e verde, com wordmark oficial.

## Identidade Maiver

### Paleta

| Nome | Hex | Token CSS | Uso |
|------|-----|-----------|-----|
| Maiver Green | `#00D26A` | `--maiver-green` / `--primary` | CTAs, progresso, foco, item ativo na sidebar |
| Maiver Black | `#000000` | `--maiver-black` / `--foreground` | Texto principal, sidebar, header mobile |
| Maiver White | `#FFFFFF` | `--maiver-white` / `--background` | Área de conteúdo, texto em fundos escuros |
| Cinza UI | `#E5E5E5` | `--border` | Bordas e inputs |
| Verde suave | — | `--accent` | Hover secundário, fundos de destaque leve |

### Logo

- Wordmark: `public/maiver-logo.svg` — componente `MaiverLogo`
- Símbolo M: `public/maiver-mark.svg` — `MaiverLogo variant="mark"`
- Favicon: `public/favicon.svg` (M em fundo preto)

### Temas (claro / escuro)

| Modo | Padrão | Descrição |
|------|--------|-----------|
| **Escuro** | Sim (`localStorage`: `maiver-theme`) | Fundo preto/cinza, sidebar preta, logo claro, verde Maiver nos CTAs |
| **Claro** | Alternativo | Fundo branco, sidebar clara, logo escuro, hover da sidebar em verde Maiver |

Alternância: botão na sidebar (desktop) e ícone sol/lua no header mobile. Classe `dark` em `<html>`.

Utilitários de navegação: `nav-item-sidebar`, `nav-item-sidebar-active` em `index.css`.

### Layout de marca

- **Sidebar:** tokens `--sidebar*`; hover/active com verde `primary` em ambos os modos
- **Conteúdo:** `--background` / `--card` por tema
- **Status (métricas/badges/barras):** azul (em andamento), verde (concluído), âmbar (atrasado)
- **CTAs e foco:** verde Maiver (`--primary`) em ambos os temas

## Princípios

1. **Clareza operacional** — status e progresso legíveis em poucos segundos  
2. **Densidade equilibrada** — informação útil sem poluição  
3. **Consistência** — tokens + variantes CVA, não estilos ad hoc  
4. **Acessibilidade** — foco visível, landmarks, labels, `prefers-reduced-motion`  
5. **Motion discreto** — feedback sem distrair  

## Tokens

Definidos em `src/index.css` (variáveis CSS + `@theme inline`).

| Token | Uso |
|-------|-----|
| `--primary` | Verde Maiver — ações principais, progresso em andamento |
| `--maiver-green` | Cor de marca (alias de primary) |
| `--success` | Etapas concluídas, status OK |
| `--warning` | Onboarding atrasado (>30 dias) |
| `--muted` | Fundos secundários, texto auxiliar |
| `--border` | Divisores, contornos de cards |
| `--radius` | `0.5rem` — cards, inputs, badges |

### Status semânticos

| Status | Badge | Barra de progresso |
|--------|-------|-------------------|
| Em andamento | `info` | `bg-info` |
| Concluído | `success` | `bg-success` |
| Atrasado | `warning` | `bg-warning` |

Mapeamento: `src/constants/statusStyles.ts`

## Tipografia

| Nível | Classe | Uso |
|-------|--------|-----|
| Título de página | `text-2xl font-semibold tracking-tight` | `SectionHeader` (h1) |
| Título de card | `text-base font-semibold` | Cabeçalhos internos |
| Corpo | `text-sm` | Formulários, metadados |
| Auxiliar | `text-xs text-muted-foreground` | Hints, rodapés |
| Números | `tabular-nums` | Métricas, percentuais |

Fonte: **Inter** (Google Fonts).

## Espaçamento

| Padrão | Valor |
|--------|-------|
| Entre seções de página | `space-y-6` (`PageContainer`) |
| Padding de card | `sm`: 16px · `md`: 24px |
| Grid de formulário | `gap-4`, 2 colunas em `sm+` |
| Lista de clientes | `gap-4`, 2 colunas em `lg+` |

## Componentes

### Base (`components/ui/`)

Padrão **shadcn/ui** + **CVA** + **tailwind-merge** (`cn` em `src/lib/utils.ts`).

- `Button`, `Badge`, `Card`, `Input`, `Label`, `Textarea`, `Checkbox`
- `FormField`, `FormSection`, `Skeleton`, `Separator`
- `StatusBadge`, `ProgressBar`, `EmptyState`, `Toast`

### Layout

- `AppShell` — sidebar + área principal  
- `PageContainer` — largura máxima e ritmo vertical  
- `SectionHeader` — h1 + descrição + ações  
- `PageTransition` — entrada suave entre views  

### Domínio

- `MetricCard` — KPIs do dashboard  
- `ClientCard` — item escaneável da lista  
- `ProgressCard` — resumo do onboarding (anel + metadados)  
- `OnboardingChecklist` — 6 etapas com timeline  
- `ClientForm` — cadastro em 3 seções  

## Utilitários CSS

| Classe | Função |
|--------|--------|
| `interactive-card` | Hover/focus em cards clicáveis |
| `nav-item` | Itens de navegação lateral |
| `animate-page-enter` | Transição entre telas |
| `animate-stagger-in` | Entrada escalonada (dashboard) |

Respeitam `prefers-reduced-motion: reduce`.

## Ícones

**Lucide React** — traço 2px, tamanhos `size-4` (inline) e `size-5` (destaque).

## Boas práticas ao estender

- Novas cores → variável CSS + token `@theme`, não hex solto  
- Novos botões → variante em `buttonVariants` (CVA)  
- Status → sempre derivado em `utils/status.ts`  
- Animações → utilitários em `index.css`, duração < 300ms  
