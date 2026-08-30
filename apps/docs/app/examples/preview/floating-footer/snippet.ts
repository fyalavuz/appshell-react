export const snippet = `import { AppShell, Header, Content, Footer } from "appshell-react";
import { ShoppingBag } from "lucide-react";

export default function App() {
  const [items, setItems] = useState<string[]>([]);

  return (
    <AppShell safeArea>
      <Header behavior="fixed" logo={<span className="font-bold">Crate</span>} />

      <Content className="pb-8">{/* Product grid */}</Content>

      {/* position: "left" | "center" | "right" */}
      <Footer variant="floating" position="center">
        <button className="flex items-center gap-2.5 rounded-full bg-primary py-3.5 pl-5 pr-6 text-sm font-semibold text-primary-foreground shadow-lg">
          <ShoppingBag className="size-4" />
          {items.length} records
        </button>
      </Footer>
    </AppShell>
  );
}`;
