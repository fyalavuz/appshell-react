export const snippet = `import { AppShell, Header, Content, MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { Moon, Sun } from "lucide-react";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark")); // pick up the current theme
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          logo={<span className="font-bold">Nocturne</span>}
          actions={
            <button onClick={toggleTheme} aria-label="Toggle dark mode">
              {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
          }
        />
        {/* Every component reads the shadcn tokens, so one class flip re-themes everything */}
        <Content className="bg-background text-foreground">{/* notes */}</Content>
      </AppShell>
    </MotionProvider>
  );
}`;
