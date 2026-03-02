import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';
import { AppShellProvider } from './context';
import { HeaderNav, HeaderNavItem } from './HeaderNav';
import { ScrollNav, ScrollNavItem } from './ScrollNav';
import { MotionProvider } from './motion';
import { framerMotionAdapter } from './motion-framer';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <AppShellProvider>
        <MotionProvider adapter={framerMotionAdapter}>
          <Story />
          <div style={{ height: '200vh', padding: '1rem' }}>
            <p className="text-muted-foreground text-sm mt-4">Scroll down to test reveal behaviors.</p>
          </div>
        </MotionProvider>
      </AppShellProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleNav = (
  <HeaderNav>
    <HeaderNavItem label="Home" active />
    <HeaderNavItem label="Analytics" />
    <HeaderNavItem label="Settings" />
  </HeaderNav>
);

const sampleActions = (
  <button className="rounded-lg bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
    Sign In
  </button>
);

export const Default: Story = {
  args: {
    title: 'Dashboard',
    subtitle: 'Welcome back, user',
    theme: 'light',
    behavior: 'static',
    logo: <span className="font-bold text-xl ml-4">AppShell</span>,
    nav: sampleNav,
    actions: sampleActions,
  },
};

export const Fixed: Story = {
  args: {
    ...Default.args,
    behavior: 'fixed',
  },
};

export const RevealNav: Story = {
  args: {
    ...Default.args,
    behavior: 'reveal-nav',
  },
};

export const RevealAll: Story = {
  args: {
    ...Default.args,
    behavior: 'reveal-all',
  },
};

export const RevealContext: Story = {
  args: {
    ...Default.args,
    behavior: 'reveal-context',
  },
};

export const RevealSearch: Story = {
  args: {
    ...Default.args,
    behavior: 'reveal-search',
    searchContent: (
      <input
        type="text"
        placeholder="Search..."
        className="w-full rounded-lg border border-input bg-muted/50 px-4 py-2 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all"
      />
    ),
  },
};

export const RevealNavContext: Story = {
  args: {
    ...Default.args,
    behavior: 'reveal-nav-context',
  },
};

export const WithSearchRow: Story = {
  args: {
    ...Default.args,
    behavior: 'fixed',
    searchContent: (
      <ScrollNav>
        <ScrollNavItem label="All" active />
        <ScrollNavItem label="Technology" />
        <ScrollNavItem label="Design" />
        <ScrollNavItem label="Business" />
        <ScrollNavItem label="Science" />
      </ScrollNav>
    ),
  },
};

export const WithContextRow: Story = {
  args: {
    ...Default.args,
    behavior: 'fixed',
    title: 'Project Dashboard',
    subtitle: 'Track your progress and metrics in real-time',
  },
};

export const PrimaryTheme: Story = {
  args: {
    ...Default.args,
    theme: 'primary',
  },
};

export const DarkTheme: Story = {
  args: {
    ...Default.args,
    theme: 'dark',
  },
};
