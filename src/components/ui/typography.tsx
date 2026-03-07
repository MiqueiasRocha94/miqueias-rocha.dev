import { cn } from "@/lib/utils"
import {ReactNode} from "react"; // se você usa helper de classes

type TypographyProps = React.HTMLAttributes<HTMLHeadingElement>

export function TypographyH1({ className, ...props }: TypographyProps) {
    return (
        <h1
            className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)}
            {...props}
        />
    )
}

export function TypographyP({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
            {...props}
        />
    )
}

export function TypographyH2( { className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <h2
            className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
            {...props}
        />
    )
}