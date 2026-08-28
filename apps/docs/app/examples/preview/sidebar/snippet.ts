export const snippet = `import {
  AppShell, Header, Content, Sidebar, NavGroup, NavItem, MotionProvider,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { Menu, LayoutDashboard, BarChart3, Users, CreditCard } from "lucide-react";

export default function App() {
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState("left"); // or "right"

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          logo={
            <button aria-label="Open menu" onClick={() => setOpen(true)}>
              <Menu className="size-5" />
            </button>
          }
        />

        {/* Backdrop click and Escape both call onClose */}
        <Sidebar open={open} onClose={() => setOpen(false)} side={side}>
          <NavGroup title="Workspace" defaultOpen>
            <NavItem icon={<LayoutDashboard className="size-4" />} label="Dashboard" active />
            <NavItem icon={<BarChart3 className="size-4" />} label="Reports" />
            <NavItem icon={<Users className="size-4" />} label="Members" badge="2" />
          </NavGroup>
          <NavGroup title="Settings">
            <NavItem icon={<CreditCard className="size-4" />} label="Billing" />
          </NavGroup>
        </Sidebar>

        <Content>{/* dashboard content */}</Content>
      </AppShell>
    </MotionProvider>
  );
}`;
