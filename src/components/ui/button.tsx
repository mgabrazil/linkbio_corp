import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-foreground text-background hover:opacity-90 focus-visible:outline-foreground",
  outline:
    "border border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10",
  ghost: "hover:bg-black/5 dark:hover:bg-white/10",
} as const;

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
} as const;

export type ButtonProps = React.ComponentProps<"button"> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
