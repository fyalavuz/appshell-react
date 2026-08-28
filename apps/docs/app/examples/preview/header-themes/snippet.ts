export const snippet = `import { AppShell, Header, Content, type HeaderTheme } from "appshell-react";

export default function App() {
  const [theme, setTheme] = useState<HeaderTheme>("light");

  return (
    <AppShell safeArea>
      {/* theme: "light" | "primary" | "dark" | "none" */}
      <Header
        behavior="fixed"
        theme={theme}
        // theme="none" ships zero styles — style it yourself:
        className={theme === "none" ? "bg-fuchsia-50 text-fuchsia-950" : undefined}
        logo={<span className="font-bold">Chroma</span>}
        title={\`theme="\${theme}"\`}
      />
      <Content>
        {/* Theme picker cards */}
      </Content>
    </AppShell>
  );
}`;
