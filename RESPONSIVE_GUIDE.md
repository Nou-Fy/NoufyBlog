# Guide Responsive Design - Noufy Blog

## Nouveaux Composants Créés

### 1. Collapsible (UI Component)

**Fichier:** `src/views/components/ui/collapsible.tsx`

Composant wrapper Radix UI pour créer des sections collapsibles.

#### Utilisation:

```tsx
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/views/components/ui/collapsible";

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger>Cliquez ici</CollapsibleTrigger>
      <CollapsibleContent>Contenu à afficher/masquer</CollapsibleContent>
    </Collapsible>
  );
}
```

---

### 2. StatsCarousel

**Fichier:** `src/views/components/community/StatsCarousel.tsx`

Affiche les stats en grille desktop et carousel mobile.

#### Utilisation:

```tsx
import StatsCarousel from "@/views/components/community/StatsCarousel";

export default function Example() {
  return (
    <StatsCarousel>
      {stats.map((stat) => (
        <StatCard key={stat.id} {...stat} />
      ))}
    </StatsCarousel>
  );
}
```

**Résultat:**

- Desktop (md+): Grille 2 colonnes (lg: 4 colonnes)
- Mobile: Carousel avec navigation

---

### 3. CollapsibleSidebar

**Fichier:** `src/views/components/community/CollapsibleSidebar.tsx`

Wrapper pour les sidebars (masquées sur desktop, collapsibles sur mobile).

#### Utilisation:

```tsx
import CollapsibleSidebar from "@/views/components/community/CollapsibleSidebar";
import { Trophy } from "lucide-react";

export default function Example() {
  return (
    <CollapsibleSidebar
      title="Membres du mois"
      icon={<Trophy className="w-5 h-5" />}
      defaultOpen={false}>
      <TopMembers />
    </CollapsibleSidebar>
  );
}
```

**Résultat:**

- Desktop (lg+): Masqué (utilisez `hidden lg:block` sur le contenu)
- Mobile: Collapsible avec icône

---

### 4. CollapsibleFilters

**Fichier:** `src/views/components/articles/CollapsibleFilters.tsx`

Wrapper pour les filtres (masqués sur desktop, collapsibles sur mobile).

#### Utilisation:

```tsx
import CollapsibleFilters from "@/views/components/articles/CollapsibleFilters";

export default function Example() {
  const hasFilters = activeFilters.length > 0;

  return (
    <CollapsibleFilters hasFilters={hasFilters} onClear={() => clearAll()}>
      <FilterComponent1 />
      <FilterComponent2 />
    </CollapsibleFilters>
  );
}
```

**Résultat:**

- Desktop (md+): Filtres toujours visibles
- Mobile: Collapsible avec badge "Actifs" si nécessaire

---

## Pattern Responsive Recommandé

### Pour les Sidebars:

```tsx
{
  /* Desktop */
}
<aside className="hidden lg:block">
  <SidebarContent />
</aside>;

{
  /* Mobile */
}
<CollapsibleSidebar title="Sidebar">
  <SidebarContent />
</CollapsibleSidebar>;
```

### Pour les Listes Longues:

```tsx
{
  /* Desktop: Grille */
}
<div className="hidden md:grid grid-cols-3 gap-4">
  {items.map((item) => (
    <Card {...item} />
  ))}
</div>;

{
  /* Mobile: Carousel */
}
<StatsCarousel>
  {items.map((item) => (
    <Card {...item} />
  ))}
</StatsCarousel>;
```

---

## Breakpoints Tailwind

- `sm`: 640px
- `md`: 768px (souvent utilisé pour desktop)
- `lg`: 1024px (breakpoint principal du site)
- `xl`: 1280px

---

## Tips Performance

1. **Utilisez `hidden lg:flex`** plutôt que de dupliquer du contenu
2. **Lazy load les images** dans les cartes
3. **Limitez les animations** sur mobile
4. **Testez avec DevTools** (device emulation Chrome)

---

## Pages Optimisées

- ✅ `/communaute` - Sidebars collapsibles
- ✅ `/articles` - Filtres collapsibles
- ✅ `/profil` - Tableau de bord collapsible
- ✅ Community Stats - Carousel mobile
