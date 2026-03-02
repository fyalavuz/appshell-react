import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';
import { AppShellProvider } from './context';
import { HeaderNav, HeaderNavItem } from './HeaderNav';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <AppShellProvider>
        <Story />
      </AppShellProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Dashboard',
    subtitle: 'Welcome back, user',
    theme: 'light',
    behavior: 'static',
    logo: <span className="font-bold text-xl ml-4">AppShell</span>,
    nav: (
      <HeaderNav>
        <HeaderNavItem label="Home" active />
        <HeaderNavItem label="Analytics" />
        <HeaderNavItem label="Settings" />
      </HeaderNav>
    ),
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
