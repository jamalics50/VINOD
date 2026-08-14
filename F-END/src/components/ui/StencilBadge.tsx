import clsx from "clsx";

interface StencilBadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "mango" | "sindhri" | "dusk" | "orchard";
}

export function StencilBadge({ children, className, variant = "mango" }: StencilBadgeProps) {
  const variants = {
    mango: "border-mango text-mango rotate-[-2deg]",
    sindhri: "border-sindhri text-sindhri rotate-[2deg]",
    dusk: "border-dusk-teal text-dusk-teal rotate-[-1deg]",
    orchard: "border-orchard text-orchard rotate-[1.5deg]",
  };

  return (
    <div className={clsx("inline-flex relative items-center justify-center p-1", className)}>
      {/* Subtle soft glow behind the badge */}
      <div 
        className={clsx(
          "absolute inset-1 blur-[10px] opacity-[0.15] transition-transform duration-300",
          variants[variant].match(/rotate-\[.*?\]/)?.[0], // match the rotation
          variant === 'mango' && "bg-mango",
          variant === 'sindhri' && "bg-sindhri",
          variant === 'dusk' && "bg-dusk-teal",
          variant === 'orchard' && "bg-orchard"
        )}
        style={{ borderRadius: "4px 8px 3px 6px / 6px 3px 8px 4px" }}
      />
      <div 
        className={clsx(
          "relative border-[3px] border-dashed px-4 py-1.5 font-display text-sm font-bold tracking-widest uppercase",
          "mix-blend-multiply opacity-90 transition-transform duration-300 hover:scale-105 hover:opacity-100",
          variants[variant]
        )}
        style={{
          // Creates a slightly irregular, stenciled look
          borderRadius: "4px 8px 3px 6px / 6px 3px 8px 4px",
          boxShadow: "inset 0 0 2px rgba(0,0,0,0.1)",
        }}
      >
        {/* Subtle noise texture overlay for the ink-stamped effect */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-[0.15]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
        <span className="relative z-10">{children}</span>
      </div>
    </div>
  );
}
