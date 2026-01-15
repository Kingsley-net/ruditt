import * as React from "react"
import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        // Base styles
        "group relative overflow-hidden rounded-2xl border",
        // Background with gradient and subtle texture
        "bg-gradient-to-br from-white/10 to-white/5",
        "backdrop-blur-xl backdrop-saturate-150",
        // Border with gradient
        "border-white/15",
        // Shadow with depth
        "shadow-2xl shadow-black/10",
        // Hover effects
        "transition-all duration-500",
        "hover:shadow-3xl hover:shadow-black/20",
        "hover:border-white/25",
        "hover:scale-[1.02]",
        // Dark mode support
        "dark:bg-gradient-to-br dark:from-white/5 dark:to-white/2",
        "dark:border-white/10",
        "dark:hover:border-white/20",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header",
        "relative px-8 pt-8 pb-4",
        "flex flex-col gap-3",
        "border-b border-white/10",
        "dark:border-white/5",
        "has-data-[slot=card-action]:flex-row has-data-[slot=card-action]:items-start has-data-[slot=card-action]:justify-between",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-2xl font-bold tracking-tight text-white",
        "dark:text-white/90",
        "group-hover:text-white/95 transition-colors duration-300",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-base text-white/70",
        "dark:text-white/60",
        "leading-relaxed",
        "group-hover:text-white/80 transition-colors duration-300",
        className
      )}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "relative z-10",
        "flex items-center justify-center",
        "rounded-lg",
        "transition-all duration-300",
        "hover:scale-105 active:scale-95",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "relative px-8 py-6",
        // Gradient overlay at top
        "before:absolute before:inset-x-0 before:top-0 before:h-px",
        "before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        "dark:before:via-white/5",
        className
      )}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "relative px-8 py-6",
        "flex items-center",
        "border-t border-white/10",
        "dark:border-white/5",
        // Gradient overlay at top of footer
        "before:absolute before:inset-x-0 before:top-0 before:h-px",
        "before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        "dark:before:via-white/5",
        className
      )}
      {...props}
    />
  )
}

// Enhanced decorative elements for cards
function CardGlow() {
  return (
    <>
      {/* Subtle corner accents */}
      <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-white/5 rounded-tl-xl" />
      <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-white/5 rounded-tr-xl" />
      <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-white/5 rounded-bl-xl" />
      <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-white/5 rounded-br-xl" />
      
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
      
      {/* Animated glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
    </>
  )
}

// Enhanced card wrapper with decorative elements
function EnhancedCard({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <Card className={cn("relative", className)} {...props}>
      <CardGlow />
      <div className="relative z-10">{children}</div>
    </Card>
  )
}

export {
  Card,
  EnhancedCard,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardGlow,
}