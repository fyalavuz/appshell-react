import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { NotificationsMenu, NotificationItem } from './NotificationsMenu';

const meta: Meta<typeof NotificationsMenu> = {
  title: 'Components/NotificationsMenu',
  component: NotificationsMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const items = (
  <>
    <NotificationItem
      title="Deploy finished"
      description="terra-web #482 is live on production."
      time="2m"
      unread
      onClick={() => {}}
    />
    <NotificationItem
      title="Mara mentioned you"
      description='"Can you take a look at the sidebar spacing?"'
      time="1h"
      unread
      onClick={() => {}}
    />
    <NotificationItem
      title="Weekly digest ready"
      description="12 updates across 3 projects."
      time="yesterday"
      onClick={() => {}}
    />
  </>
);

export const Default: Story = {
  args: {
    unreadCount: 2,
    children: items,
  },
};

export const WithActions: Story = {
  args: {
    unreadCount: 2,
    action: (
      <button
        type="button"
        className="text-xs font-medium text-muted-foreground hover:text-foreground"
      >
        Mark all read
      </button>
    ),
    footer: (
      <a
        href="#all"
        role="menuitem"
        className="block rounded-lg px-3 py-2 text-center text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        View all notifications
      </a>
    ),
    children: items,
  },
};

export const Empty: Story = {
  args: {
    unreadCount: 0,
  },
};

export const ManyUnread: Story = {
  args: {
    unreadCount: 120,
    children: items,
  },
};
