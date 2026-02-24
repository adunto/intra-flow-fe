import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export function TypographyH1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({ children, className }: TypographyProps) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function TypographyP({ children, className }: TypographyProps) {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
      {children}
    </p>
  );
}

export function TypographyTable({
  tHeader,
  tBody,
  className,
}: {
  tHeader: string[];
  tBody: string[][];
  className?: string;
}) {
  return (
    <div className={cn("my-6 w-full overflow-y-auto", className)}>
      <table className="w-full">
        <thead>
          <tr className="even:bg-muted m-0 border-t p-0">
            {tHeader.map((item, i) => (
              <th
                key={`header-${i}`}
                className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tBody.map((row, rowIndex) => (
            <tr
              key={`row-${rowIndex}`}
              className="m-0 border-t p-0 even:bg-muted"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={`cell-${rowIndex}-${cellIndex}`}
                  className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
                >
                  {cell}
                </td>
              ))}

              {row.length < tHeader.length &&
                Array.from({ length: tHeader.length - row.length }).map(
                  (_, i) => (
                    <td key={`empty-${i}`} className="border px-4 py-2" />
                  ),
                )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TypographyList({
  children,
  className,
}: {
  children: string[];
  className?: string;
}) {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}>
      {children.map((item, i) => (
        <li key={`${item} ${i}`}>{item}</li>
      ))}
    </ul>
  );
}

export function TypographyInlineCode({ children, className }: TypographyProps) {
  return (
    <code
      className={cn(
        "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className,
      )}
    >
      {children}
    </code>
  );
}

export function TypographyLead({ children, className }: TypographyProps) {
  return (
    <p className={cn("text-muted-foreground text-xl", className)}>{children}</p>
  );
}

export function TypographyLarge({ children, className }: TypographyProps) {
  return (
    <div className={cn("text-lg font-semibold", className)}>{children}</div>
  );
}

export function TypographySmall({ children, className }: TypographyProps) {
  return (
    <small className={cn("text-sm leading-none font-medium", className)}>
      {children}
    </small>
  );
}

export function TypographyMuted({ children, className }: TypographyProps) {
  return (
    <p className={cn("text-muted-foreground text-sm", className)}>{children}</p>
  );
}
