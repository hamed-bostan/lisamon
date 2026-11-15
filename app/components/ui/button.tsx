import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-ink text-white hover:bg-burgundy-hover",
        outline: "border border-line bg-white text-ink hover:bg-[#f6f6f7]",
        ghost: "text-ink hover:bg-[#f6f6f7]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

type ButtonProps = React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {
  asChild?: boolean;
  /** Keeps the bespoke portfolio controls pixel-matched while using the shared shadcn button. */
  canvas?: boolean;
};

function Button({ className, variant, size, asChild = false, canvas = false, ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button";
  return <Component className={cn(canvas ? "" : buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };
