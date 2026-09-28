export const snippet = `import { useEffect, useRef, useState } from "react";
import { AppShell, Avatar, Content, Header, MotionProvider, useKeyboardInset } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { Send } from "lucide-react";

function Composer({ value, onChange, onSend }) {
  // Pixels the on-screen keyboard covers right now — 0 when it's down.
  const keyboardInset = useKeyboardInset();

  return (
    <form
      onSubmit={onSend}
      className="fixed inset-x-0 bottom-0 border-t bg-background/95 backdrop-blur-xl"
      style={{
        // Rise above the keyboard when it's up; otherwise clear the home indicator.
        paddingBottom: keyboardInset > 0
          ? keyboardInset
          : "var(--appshell-safe-area-inset-bottom, env(safe-area-inset-bottom, 0px))",
      }}
    >
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="Message the group" />
      <button type="submit" aria-label="Send"><Send className="size-4" /></button>
    </form>
  );
}

export default function App() {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length]);

  const send = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), sender: "you", text: draft }]);
    setDraft("");
  };

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header behavior="fixed" title="Alpine Traverse" subtitle="Mara, Iris, Jonas · trip planning" />

        {/* pb-24 keeps the last bubble clear of the fixed composer */}
        <Content className="pb-24">
          {messages.map((m) => (
            <div key={m.id} className={m.sender === "you" ? "text-end" : "text-start"}>
              {m.sender !== "you" && <Avatar initials={m.sender[0].toUpperCase()} size="1.75rem" />}
              <span className="rounded-2xl px-3.5 py-2 text-sm">{m.text}</span>
            </div>
          ))}
          <div ref={bottomRef} />
        </Content>

        <Composer value={draft} onChange={setDraft} onSend={send} />
      </AppShell>
    </MotionProvider>
  );
}`;
