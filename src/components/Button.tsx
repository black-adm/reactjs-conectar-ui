import * as React from "react"

import { cva, type VariantProps } from "class-variance-authority"
import { twMerge } from "../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-green-main text-white shadow hover:bg-green-dark",
        outline:
          "border border-gray-lighter bg-transparent shadow-sm hover:bg-green-light hover:text-green-main hover:border-none",
        ghost: "hover:bg-gray-lighter hover:text-black",
      },
      size: {
        sm: "h-10 rounded-lg px-3 text-xs",
        default: "h-11 rounded-lg px-8 text-base",
        icon: "h-9 w-9 border-gray-300",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    const Comp = "button"
    return (
      <Comp
        className={twMerge(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

