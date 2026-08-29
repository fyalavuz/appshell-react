export const snippet = `import { AppShell, Header, Content, SearchField, SearchModal, UserMenu, UserMenuItem, MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { LogOut, Settings, User } from "lucide-react";
import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="sticky"
          logo={<span className="font-bold">Nimbus</span>}
          actions={
            <UserMenu username="Mara Kealoha" detail="mara@nimbus.app" initials="MK">
              <UserMenuItem icon={<User />} label="Profile" />
              <UserMenuItem icon={<Settings />} label="Settings" />
              <UserMenuItem icon={<LogOut />} label="Log out" destructive />
            </UserMenu>
          }
          searchContent={
            <SearchField
              placeholder="Search articles"
              value={query}
              onChange={setQuery}
              onClick={() => setSearchOpen(true)}  // tapping search opens the modal
            />
          }
        />
        <Content>{/* article list */}</Content>

        <SearchModal
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          defaultQuery={query}                     // optional: hand over what was typed
          placeholder="Search the knowledge base"
        >
          {(q) => <Results query={q} />}           {/* results are fully yours */}
        </SearchModal>
      </AppShell>
    </MotionProvider>
  );
}`;
