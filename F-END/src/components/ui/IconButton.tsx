"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";

type IconButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export interface IconButtonProps extends Omit<ButtonProps & AnchorProps, "type"> {
  icon?: LucideIcon;
  size?: IconButtonSize;
  badge?: number;
  children?: React.ReactNode;
  href?: string;
  type?: ButtonProps["type"];
}

const sizeConfig = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

const iconSizeConfig = {
  sm: 18,
  md: 20,
  lg: 24,
};

export function IconButton({
  icon: Icon,
  size = "md",
  badge,
  children,
  className,
  href,
  type = "button",
  ...props
}: IconButtonProps) {
  const [bounce, setBounce] = useState(false);

  // Trigger bounce animation when badge count changes
  useEffect(() => {
    if (badge !== undefined && badge > 0) {
      setBounce(true);
      const timer = setTimeout(() => setBounce(false), 300);
      return () => clearTimeout(timer);
    }
  }, [badge]);

  const Comp = href ? "a" : "button";
  const compProps = href ? { href, ...props } : { type, ...props };

  return (
    <Comp
      className={clsx(
        "group relative flex items-center justify-center rounded-full text-current transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mango focus-visible:ring-offset-2",
        sizeConfig[size],
        className
      )}
      {...compProps as any}
    >
      {/* Soft circular glass background on hover/focus */}
      <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 scale-80 transition-all duration-150 ease-out group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100 motion-reduce:transition-opacity motion-reduce:group-hover:scale-100" />
      
      {/* Icon Wrapper for scale effect */}
      <span className="relative z-10 flex items-center justify-center transition-transform duration-150 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100">
        {Icon ? (
          <Icon
            size={iconSizeConfig[size]}
            strokeWidth={1.5}
            className="text-current"
          />
        ) : (
          children
        )}
      </span>

      {/* Animated Badge */}
      {badge !== undefined && badge > 0 && (
        <span
          className={clsx(
            "absolute -right-1 -top-1 z-20 flex h-4 w-4 items-center justify-center rounded-full bg-sindhri text-[10px] font-bold text-white shadow-sm transition-transform",
            bounce && "animate-bounce-scale"
          )}
        >
          {badge}
        </span>
      )}
    </Comp>
  );
}
