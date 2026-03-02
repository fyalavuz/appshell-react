import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer, FooterItem } from './Footer';
import { AppShellProvider } from './context';
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
        <div className="h-screen bg-muted/20 pb-20">
          <Story />
        </div>
      </AppShellProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TabBar: Story = {
  args: {
    variant: 'tab-bar',
    behavior: 'static',
    children: (
      <>
        <FooterItem icon={<Home className="size-5" />} label="Home" active />
        <FooterItem icon={<Search className="size-5" />} label="Search" />
        <FooterItem icon={<PlusCircle className="size-5" />} label="Add" />
        <FooterItem icon={<Bell className="size-5" />} label="Alerts" badge={3} />
        <FooterItem icon={<User className="size-5" />} label="Profile" />
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
