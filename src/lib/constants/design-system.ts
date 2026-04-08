// Design system constants for consistent styling across the app
export const DESIGN_SYSTEM = {
  // Border radius
  radius: {
    sm: "rounded-lg", // Small elements (buttons, inputs)
    md: "rounded-xl", // Medium elements (cards, modals)
    lg: "rounded-2xl", // Large elements (hero sections, main cards)
    xl: "rounded-3xl", // Extra large (special cases)
    full: "rounded-full", // Circular elements
  },

  // Colors
  colors: {
    primary: {
      bg: "bg-emerald-600",
      hover: "hover:bg-emerald-700",
      text: "text-emerald-600",
      light: "bg-emerald-50",
      border: "border-emerald-200",
    },
    secondary: {
      bg: "bg-orange-600",
      hover: "hover:bg-orange-700",
      text: "text-orange-600",
      light: "bg-orange-100",
      border: "border-orange-200",
    },
    neutral: {
      bg: "bg-card",
      text: "text-muted-foreground",
      border: "border-border",
      light: "bg-background",
    },
  },

  // Spacing
  spacing: {
    section: "py-12 md:py-16", // Section padding
    card: "p-6 md:p-8", // Card padding
    button: "px-6 py-3", // Button padding
  },

  // Shadows
  shadows: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  },

  // Transitions
  transitions: {
    default: "transition-all duration-200",
    colors: "transition-colors duration-200",
    shadow: "transition-shadow duration-300",
  },
} as const;
