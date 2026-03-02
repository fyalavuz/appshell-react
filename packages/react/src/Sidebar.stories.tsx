import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sidebar } from './Sidebar';
import { NavGroup } from './NavGroup';
import { NavItem } from './NavItem';
import { AppShellProvider } from './context';
import { MotionProvider } from './motion';
import { framerMotionAdapter } from './motion-framer';
import { Home, BarChart3, Users, Settings, HelpCircle, MessageCircle } from 'lucide-react';

const meta = {
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
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

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
  args: { open: false, onClose: () => {}, children: null },
  render: () => <SidebarDemo side="left" />,
};

export const Right: Story = {
  args: { open: false, onClose: () => {}, children: null },
  render: () => <SidebarDemo side="right" />,
};
