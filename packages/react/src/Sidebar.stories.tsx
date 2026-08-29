import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sidebar } from './Sidebar';
import { NavGroup } from './NavGroup';
import { NavItem } from './NavItem';
import { AppShellProvider } from './context';
import { MotionProvider } from './motion';
import { framerMotionAdapter } from './motion-framer';
import { Home, BarChart3, Users, Settings, HelpCircle, MessageCircle } from 'lucide-react';

// Untyped Meta/StoryObj: SidebarProps is a discriminated union, which
// Storybook's Args inference collapses to `never`.
const meta: Meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <AppShellProvider>
        <MotionProvider adapter={framerMotionAdapter}>
          <Story />
        </MotionProvider>
      </AppShellProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

function SidebarDemo({ side = 'left' }: { side?: 'left' | 'right' }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-6">
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Open Sidebar ({side})
      </button>
      <Sidebar open={open} onClose={() => setOpen(false)} side={side}>
        <div className="p-4 border-b border-border">
          <span className="text-lg font-bold tracking-tight">Navigation</span>
        </div>
        <div className="p-2">
          <NavGroup title="Main" defaultOpen>
            <NavItem icon={<Home className="size-5" />} label="Dashboard" active />
            <NavItem icon={<BarChart3 className="size-5" />} label="Analytics" />
            <NavItem icon={<Users className="size-5" />} label="Users" />
            <NavItem icon={<Settings className="size-5" />} label="Settings" />
          </NavGroup>
          <NavGroup title="Support">
            <NavItem icon={<HelpCircle className="size-5" />} label="Help Center" />
            <NavItem icon={<MessageCircle className="size-5" />} label="Contact" />
          </NavGroup>
        </div>
      </Sidebar>
    </div>
  );
}

export const Left: Story = {
  render: () => <SidebarDemo side="left" />,
};

export const Right: Story = {
  render: () => <SidebarDemo side="right" />,
};

function DockedNav() {
  return (
    <>
      <div className="p-4 border-b border-border">
        <span className="text-lg font-bold tracking-tight group-data-[collapsed=true]/sidebar:hidden">
          Acme
        </span>
      </div>
      <div className="p-2">
        <NavGroup title="Main" defaultOpen>
          <NavItem icon={<Home className="size-5" />} label="Dashboard" active />
          <NavItem icon={<BarChart3 className="size-5" />} label="Analytics" />
          <NavItem icon={<Users className="size-5" />} label="Users" />
          <NavItem icon={<Settings className="size-5" />} label="Settings" />
        </NavGroup>
        <NavGroup title="Support" defaultOpen>
          <NavItem icon={<HelpCircle className="size-5" />} label="Help Center" />
          <NavItem icon={<MessageCircle className="size-5" />} label="Contact" />
        </NavGroup>
      </div>
    </>
  );
}

function DockedDemo({ collapsible = false }: { collapsible?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-dvh">
      <Sidebar
        variant="docked"
        collapsible={collapsible}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DockedNav />
      </Sidebar>
      <main className="min-w-0 flex-1 p-6">
        <button
          onClick={() => setOpen(true)}
          className="mb-4 rounded-lg border px-4 py-2 text-sm font-medium md:hidden"
        >
          Open drawer (mobile fallback)
        </button>
        <h1 className="text-xl font-semibold">Content</h1>
        <p className="mt-2 max-w-prose text-sm text-muted-foreground">
          The docked sidebar is a persistent panel that lives in the layout.
          Resize below the md breakpoint and it disappears; the button above
          then opens the same children as an overlay drawer.
        </p>
        <div className="mt-6 h-[150dvh] rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
          Tall content — scroll to see the panel stay pinned.
        </div>
      </main>
    </div>
  );
}

/** Persistent panel beside the content. Resize below `md` for the drawer fallback. */
export const Docked: Story = {
  render: () => <DockedDemo />,
};

/** Built-in toggle collapses the panel to an icon rail. */
export const DockedCollapsible: Story = {
  render: () => <DockedDemo collapsible />,
};
