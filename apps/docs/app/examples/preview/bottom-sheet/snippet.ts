export const snippet = `import { AppShell, BottomSheet, SafeArea } from "appshell-react";
import { useState } from "react";

export default function App() {
  const [open, setOpen] = useState(true);

  return (
    <AppShell safeArea>
      <MapCanvas />  {/* full-bleed map behind everything */}

      {/* Floating search, padded past the notch */}
      <SafeArea edges={["top"]} className="pointer-events-none fixed inset-x-0 top-0 z-10 flex-none">
        <FloatingSearch />
      </SafeArea>

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        modal={false}                 // the map behind stays interactive
        snapPoints={[0.4, 0.85]}      // rest at 40%, drag up to 85%
        aria-label="Nearby places"
      >
        {/* scrolls internally; drag the grabber between snaps,
            drag well down to dismiss */}
        <PlacesList />
      </BottomSheet>
    </AppShell>
  );
}`;
