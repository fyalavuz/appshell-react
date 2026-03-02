import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer, FooterItem } from './Footer';
import { AppShellProvider } from './context';
import { MotionProvider } from './motion';
import { framerMotionAdapter } from './motion-framer';
import { Home, Search, PlusCircle, Bell, User } from 'lucide-react';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <AppShellProvider>
        <MotionProvider adapter={framerMotionAdapter}>
          <div className="h-screen bg-muted/20 pb-20">
            <div style={{ height: '200vh', padding: '1rem' }}>
              <p className="text-muted-foreground text-sm">Scroll down to test auto-hide behavior.</p>
            </div>
            <Story />
          </div>
        </MotionProvider>
      </AppShellProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

const tabBarChildren = (
  <>
    <FooterItem icon={<Home className="size-5" />} label="Home" active />
    <FooterItem icon={<Search className="size-5" />} label="Search" />
    <FooterItem icon={<PlusCircle className="size-5" />} label="Add" />
    <FooterItem icon={<Bell className="size-5" />} label="Alerts" badge={3} />
    <FooterItem icon={<User className="size-5" />} label="Profile" />
  </>
);

export const TabBar: Story = {
  args: {
    variant: 'tab-bar',
    behavior: 'static',
    children: tabBarChildren,
  },
};

export const TabBarAutoHide: Story = {
  args: {
    variant: 'tab-bar',
    behavior: 'auto-hide',
    children: tabBarChildren,
  },
};

export const TabBarWithBadges: Story = {
  args: {
    variant: 'tab-bar',
    behavior: 'static',
    children: (
      <>
        <FooterItem icon={<Home className="size-5" />} label="Home" active />
        <FooterItem icon={<Search className="size-5" />} label="Search" />
        <FooterItem icon={<PlusCircle className="size-5" />} label="Add" />
        <FooterItem icon={<Bell className="size-5" />} label="Alerts" badge={12} />
        <FooterItem icon={<User className="size-5" />} label="Messages" badge={99} />
      </>
    ),
  },
};

export const Floating: Story = {
  args: {
    variant: 'floating',
    position: 'right',
    children: (
      <button className="flex items-center gap-2 rounded-full bg-primary px-4 py-3 font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
        <PlusCircle className="size-5" /> Create
      </button>
    ),
  },
};

export const FloatingCenter: Story = {
  args: {
    variant: 'floating',
    position: 'center',
    children: (
      <button className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
        <PlusCircle className="size-5" /> New Post
      </button>
    ),
  },
};

export const FloatingLeft: Story = {
  args: {
    variant: 'floating',
    position: 'left',
    children: (
      <button className="flex items-center gap-2 rounded-full bg-primary px-4 py-3 font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
        <PlusCircle className="size-5" /> Create
      </button>
    ),
  },
};

export const Mini: Story = {
  args: {
    variant: 'mini',
    children: (
      <div className="flex w-full items-center justify-between">
        <span className="text-sm font-medium">1 item selected</span>
        <div className="flex gap-2">
          <button className="text-sm font-medium text-primary hover:underline">Edit</button>
          <button className="text-sm font-medium text-destructive hover:underline">Delete</button>
        </div>
      </div>
    ),
  },
};
