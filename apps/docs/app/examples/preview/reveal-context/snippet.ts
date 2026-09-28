export const snippet = `import { AppShell, Header, Content, MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { Flame, Bookmark } from "lucide-react";

export default function App() {
  const [saved, setSaved] = useState(false);
  // An IntersectionObserver watches each numbered step and reports which one
  // is active — its title feeds the header's subtitle.
  const [activeStep, setActiveStep] = useState(0);

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        {/* Scroll down: title + step tucker away. Scroll up: they return,
            the subtitle showing exactly which step you're on. */}
        <Header
          behavior="reveal-context"
          logo={<span className="font-bold">Hearth</span>}
          actions={<button aria-label="Save recipe" onClick={() => setSaved(!saved)}><Bookmark /></button>}
          title="Brown-Butter Chocolate Chip Cookies"
          subtitle={\`Step \${activeStep + 1} of 7 · \${stepTitles[activeStep]}\`}
        />
        <Content>{/* ingredients checklist + numbered steps */}</Content>
      </AppShell>
    </MotionProvider>
  );
}`;
