import type { ApiDef } from "@/lib/api-docs";

export function PropsTable({ api }: { api: ApiDef }) {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b bg-muted/40 text-left">
            <th className="px-4 py-2.5 font-semibold">Prop</th>
            <th className="px-4 py-2.5 font-semibold">Type</th>
            <th className="px-4 py-2.5 font-semibold">Default</th>
            <th className="px-4 py-2.5 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {api.props.map((prop) => (
            <tr key={prop.name} className="border-b last:border-0 align-top">
              <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs">
                {prop.name}
                {prop.required && <span className="text-brand">*</span>}
              </td>
              <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">
                {prop.type}
              </td>
              <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs text-muted-foreground">
                {prop.default ?? "—"}
              </td>
              <td className="min-w-56 px-4 py-2.5 leading-relaxed text-muted-foreground">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
