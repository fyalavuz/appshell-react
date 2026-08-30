export const snippet = `import {
  AppShell, Header, Content, Footer, MotionProvider,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { Play, Pause, SkipForward } from "lucide-react";

export default function App() {
  const [track, setTrack] = useState(null); // set by tapping a row
  const [playing, setPlaying] = useState(false);

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header behavior="fixed" logo={<span className="font-bold">Tempo</span>}
          title="Late Focus" subtitle="18 tracks · 1 hr 12 min" />

        <Content>{/* track list rows call setTrack */}</Content>

        {/* Mount the mini bar only when there is something to show —
            it animates in above the safe area on its own. */}
        {track && (
          <Footer variant="mini">
            <div className="flex w-full items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{track.title}</p>
                <p className="truncate text-xs text-muted-foreground">{track.artist}</p>
              </div>
              <button aria-label={playing ? "Pause" : "Play"}
                onClick={() => setPlaying(!playing)}>
                {playing ? <Pause /> : <Play />}
              </button>
              <button aria-label="Next track"><SkipForward /></button>
            </div>
          </Footer>
        )}
      </AppShell>
    </MotionProvider>
  );
}`;
