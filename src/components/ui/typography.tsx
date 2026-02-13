export function TypographyH1({ children }: { children: string }) {
  return (
    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
      {children}
    </h1>
  );
}

export function TypographyH2({ children }: { children: string }) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}

export function TypographyH3({ children }: { children: string }) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
}

export function TypographyP({ children }: { children: string }) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
}

export function TypographyTable({
  tHeader,
  tBody,
}: {
  tHeader: string[];
  tBody: string[][];
}) {
  return (
    <div className="my-6 w-full overflow-y-auto">
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

export function TypographyList({ children }: { children: string[] }) {
  return (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      {children.map((item, i) => (
        <li key={`${item} ${i}`}>{item}</li>
      ))}
    </ul>
  );
}

export function TypographyInlineCode({ children }: { children: string }) {
  return (
    <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  );
}

export function TypographyLead({ children }: { children: string }) {
  return <p className="text-muted-foreground text-xl">{children}</p>;
}

export function TypographyLarge({ children }: { children: string }) {
  return <div className="text-lg font-semibold">{children}</div>;
}

export function TypographySmall({ children }: { children: string }) {
  return <small className="text-sm leading-none font-medium">{children}</small>;
}

export function TypographyMuted({ children }: { children: string }) {
  return <p className="text-muted-foreground text-sm">{children}</p>;
}
