---
name: shadcn-ui
description: Build beautiful, accessible React UIs with shadcn/ui components. Use this skill whenever the user is building interfaces with React and shadcn/ui (or mentions shadcn, Radix-style components, or component libraries), when adding or customizing UI components like buttons, cards, dialogs, forms, tabs, dropdowns, or when theming or styling a React app that uses shadcn. Prefer this skill for concrete component usage, composition, and design tokens; combine with frontend-design for overall aesthetic direction.
---

# Building Beautiful UI with shadcn/ui (React)

This skill guides you to build polished, accessible React interfaces using **shadcn/ui**: open-source, copy-paste components built on **Radix UI** and **Tailwind CSS**. shadcn is not an npm component library—components live in your repo and are fully editable. Use them as the building blocks for forms, layouts, overlays, and data display while keeping a consistent, themeable design.

## When to Use This Skill

- The user wants to add or customize buttons, cards, inputs, dialogs, tabs, dropdowns, or other UI controls in a React app.
- The project already uses (or should use) shadcn/ui—check for `components.json`, `~/components/ui/*`, or `shadcn` in `package.json`.
- The user asks about theming, dark mode, or design tokens (e.g. `--primary`, `--muted-foreground`).
- The user mentions "shadcn", "Radix", or "component library" in the context of React UI.

For **overall visual direction** (typography, color palettes, motion, layout philosophy), use the **frontend-design** skill in addition to this one. This skill focuses on *how* to implement with shadcn components and tokens.

---

## Core Conventions

### 1. Project setup

- **Config**: `components.json` at the project root defines style (`new-york` or `default`), Tailwind CSS path, and **aliases** (e.g. `~/components`, `~/lib/utils`, `~/components/ui`). Respect these aliases in imports.
- **Utils**: Components use `cn(...)` from `~/lib/utils` to merge class names (typically `clsx` + `tailwind-merge`). Always use `cn(defaultClasses, className)` so callers can override styles.
- **Slots**: Many components use `data-slot="..."` for styling hooks; avoid removing these when customizing.

### 2. Composition over configuration

Components are built from small, composable pieces. Prefer composing them rather than adding many props.

**Example — Card:**

Use `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` (and optionally `CardAction`) instead of a single “card” with a title prop.

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter>…</CardFooter>
</Card>
```

**Example — Form fields:**

Use `Label`, `Input`, and wrapping divs (or the `Field` component if the project uses it) rather than a monolithic “form input” component.

### 3. Theming with CSS variables

shadcn themes via **CSS variables** in your global CSS (e.g. `app.css` or `globals.css`). Tailwind is wired to these via `@theme inline` (Tailwind v4) or theme config (v3).

- **Semantic tokens**: Use token-based classes so the UI respects light/dark and future theme changes:
  - **Surfaces**: `bg-background`, `bg-card`, `bg-popover`, `bg-muted`, `bg-accent`
  - **Text**: `text-foreground`, `text-muted-foreground`, `text-card-foreground`
  - **Actions**: `bg-primary text-primary-foreground`, `bg-secondary text-secondary-foreground`
  - **Borders**: `border-border`, `border-input`
  - **Destructive**: `bg-destructive text-destructive-foreground`
- **Convention**: For any semantic color there is usually a “foreground” counterpart (e.g. `--primary` and `--primary-foreground`) for text/icon on that background. Use the pair together for buttons and badges.
- **Radius**: A single `--radius` token drives `--radius-sm`, `--radius-md`, `--radius-lg`, etc. Use `rounded-md`, `rounded-lg` so all corners stay consistent.
- **Adding new colors**: Define variables under `:root` and `.dark`, then expose them to Tailwind via `@theme inline { --color-<name>: var(--<name>); }` so you can use `bg-<name>` and `text-<name>-foreground`.

Avoid hardcoding hex/oklch in JSX; keep colors in CSS variables so theming and dark mode stay in one place.

### 4. Beautiful, consistent UI

- **Spacing**: Use the design system’s spacing (e.g. `gap-4`, `gap-6`, `p-6` on cards) so layouts feel consistent. Avoid arbitrary values unless there’s a clear reason.
- **Hierarchy**: Use `text-muted-foreground` for secondary text, and `font-semibold` or `font-medium` for headings so structure is clear.
- **Focus and accessibility**: Components already include `focus-visible:ring-ring/50` and similar. Don’t remove focus styles; add `aria-label` or visible labels where needed.
- **Variants**: Many components (Button, Badge, Alert) use **variants** (e.g. default, secondary, destructive, outline, ghost). Prefer these over one-off custom classes so the UI stays coherent.

---

## Component Overview (by category)

Use this map to choose the right building block. If a component isn’t in the project, add it via the shadcn CLI (`pnpm dlx shadcn@latest add <component>`) or copy from the [shadcn registry](https://ui.shadcn.com/docs/components).

### Form & input

- **Button** — Actions; use variants (default, destructive, outline, ghost, link).
- **Input, Textarea** — Text fields; pair with **Label** and error message markup.
- **Checkbox, Radio Group, Switch, Slider** — Selections and toggles.
- **Select** — Single choice dropdown.
- **Combobox** — Searchable select / autocomplete.
- **Calendar, Date Picker** — Date selection.
- **Field** — Label + input + description + error in one composable.
- **Form** — With React Hook Form or TanStack Form for validation and submission.

### Layout & navigation

- **Card** — Content containers (header, content, footer).
- **Tabs** — Tabbed content.
- **Accordion, Collapsible** — Expand/collapse sections.
- **Separator** — Visual dividers.
- **Scroll Area** — Custom scrollable regions.
- **Sidebar** — App sidebar layout.
- **Breadcrumb, Navigation Menu** — Navigation.

### Overlays & dialogs

- **Dialog** — Modal.
- **Alert Dialog** — Confirmations (e.g. delete).
- **Sheet** — Slide-out panel (drawer).
- **Drawer** — Mobile-friendly drawer (e.g. Vaul).
- **Popover** — Floating panel (e.g. for date picker or filters).
- **Tooltip, Hover Card** — Context on hover.
- **Dropdown Menu, Context Menu, Menubar** — Menus.
- **Command** — Command palette (cmdk).

### Feedback & status

- **Alert** — Inline messages (info, warning, error).
- **Toast (Sonner)** — Notifications.
- **Progress, Skeleton, Spinner** — Loading and progress.
- **Badge** — Labels and status chips.
- **Empty** — Empty state.

### Display & media

- **Table** — Data tables; **Data Table** for sort/filter/pagination.
- **Avatar** — User avatars.
- **Chart** — Recharts-based charts.
- **Carousel** — Image/content carousel.
- **Aspect Ratio** — Fixed aspect ratio wrapper.

---

## Implementation Tips

1. **Import from aliases**: Use `~/components/ui/button`, `~/lib/utils`, etc., as in `components.json`.
2. **Extend with `className`**: Pass `className` into shadcn components and merge with `cn()` so layout and one-off styling stay flexible without forking the component.
3. **Use variants first**: Before adding custom classes for state (e.g. “danger button”), check if a variant already exists (e.g. `variant="destructive"`).
4. **Compose overlays correctly**: Dialogs, sheets, and popovers often need a trigger and content; follow the component’s composition (e.g. `DialogTrigger`, `DialogContent`) and keep focus and accessibility in mind.
5. **Forms**: Prefer the **Field** component plus React Hook Form or TanStack Form for validation and errors; wire shadcn Input/Select/Checkbox into the form state.
6. **Icons**: Many projects use **lucide-react**; use icon names that match the design (e.g. ChevronDown for selects, Loader2 for loading).

---

## Reference

- [shadcn/ui docs](https://ui.shadcn.com/docs) — Introduction, installation, theming.
- [Components](https://ui.shadcn.com/docs/components) — Full list and usage.
- [Theming](https://ui.shadcn.com/docs/theming) — CSS variables and base colors.
- [llms.txt](https://ui.shadcn.com/llms.txt) — Concise overview for AI/LLMs.

When in doubt, prefer the documented composition and semantic tokens; that keeps UIs consistent, themeable, and accessible without reinventing patterns.
