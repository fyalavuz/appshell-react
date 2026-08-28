import { snippet as fixedHeader } from "@/app/examples/preview/fixed-header/snippet";
import { snippet as staticHeader } from "@/app/examples/preview/static-header/snippet";
import { snippet as stickyHeader } from "@/app/examples/preview/sticky-header/snippet";
import { snippet as revealAll } from "@/app/examples/preview/reveal-all/snippet";
import { snippet as revealNav } from "@/app/examples/preview/reveal-nav/snippet";
import { snippet as revealSearch } from "@/app/examples/preview/reveal-search/snippet";
import { snippet as stickyTabs } from "@/app/examples/preview/sticky-tabs/snippet";
import { snippet as tabBar } from "@/app/examples/preview/tab-bar/snippet";
import { snippet as floatingFooter } from "@/app/examples/preview/floating-footer/snippet";
import { snippet as miniFooter } from "@/app/examples/preview/mini-footer/snippet";
import { snippet as sidebar } from "@/app/examples/preview/sidebar/snippet";
import { snippet as scrollNav } from "@/app/examples/preview/scroll-nav/snippet";
import { snippet as inPageNav } from "@/app/examples/preview/in-page-nav/snippet";
import { snippet as desktopNav } from "@/app/examples/preview/desktop-nav/snippet";
import { snippet as safeArea } from "@/app/examples/preview/safe-area/snippet";
import { snippet as revealCombined } from "@/app/examples/preview/reveal-combined/snippet";
import { snippet as headerThemes } from "@/app/examples/preview/header-themes/snippet";
import { snippet as darkMode } from "@/app/examples/preview/dark-mode/snippet";

/** Curated code snippets shown on each example's detail page. */
export const demoCode: Record<string, string> = {
  "fixed-header": fixedHeader,
  "static-header": staticHeader,
  "sticky-header": stickyHeader,
  "reveal-all": revealAll,
  "reveal-nav": revealNav,
  "reveal-search": revealSearch,
  "sticky-tabs": stickyTabs,
  "tab-bar": tabBar,
  "floating-footer": floatingFooter,
  "mini-footer": miniFooter,
  sidebar,
  "scroll-nav": scrollNav,
  "in-page-nav": inPageNav,
  "desktop-nav": desktopNav,
  "safe-area": safeArea,
  "reveal-combined": revealCombined,
  "header-themes": headerThemes,
  "dark-mode": darkMode,
};
