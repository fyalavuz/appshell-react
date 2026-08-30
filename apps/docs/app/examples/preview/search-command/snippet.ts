export const snippet = `import { AppShell, Header, Content, SearchField, SearchModal, NotificationsMenu, NotificationItem, UserMenu, UserMenuItem, MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { LogOut, MessageSquare, Rocket, Settings, User } from "lucide-react";
import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [unread, setUnread] = useState(2);

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="sticky"
          logo={<span className="font-bold">Nimbus</span>}
          actions={
            <>
              {/* Bell and avatar coexist — opening one closes the other. */}
              <NotificationsMenu
                unreadCount={unread}
                action={<button onClick={() => setUnread(0)}>Mark all read</button>}
              >
                <NotificationItem icon={<Rocket />} title="Deploy finished" time="2m" unread />
                <NotificationItem icon={<MessageSquare />} title="Mara mentioned you" time="1h" unread />
              </NotificationsMenu>
              <UserMenu username="Mara Kealoha" detail="mara@nimbus.app" initials="MK">
                <UserMenuItem icon={<User />} label="Profile" />
                <UserMenuItem icon={<Settings />} label="Settings" />
                <UserMenuItem icon={<LogOut />} label="Log out" destructive />
              </UserMenu>
            </>
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
