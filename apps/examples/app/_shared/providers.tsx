"use client";

import { MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      {children}
    </MotionProvider>
  );
}
