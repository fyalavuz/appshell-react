export const snippet = `import {
  AppShell, Header, Content, ScrollNav, ScrollNavItem, MotionProvider,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";

const filters = ["All", "Landscape", "Portrait", "Street", "Film", "Aerial", "Studio"];

export default function App() {
  const [filter, setFilter] = useState("All");

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          logo={<span className="font-bold">Lens</span>}
          searchContent={
            /* The search row takes any content — here, swipeable filter pills */
            <ScrollNav className="px-4 pb-3">
              {filters.map((f) => (
                <ScrollNavItem
                  key={f}
                  label={f}
                  active={filter === f}
                  onClick={() => setFilter(f)}
                />
              ))}
            </ScrollNav>
          }
        />
        <Content>{/* grid filtered by the active pill */}</Content>
      </AppShell>
    </MotionProvider>
  );
}`;
