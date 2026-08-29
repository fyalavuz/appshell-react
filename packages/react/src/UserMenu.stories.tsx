import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserMenu, UserMenuItem } from './UserMenu';
import { Avatar } from './Avatar';

const meta: Meta<typeof UserMenu> = {
  title: 'Components/UserMenu',
  component: UserMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const items = (
  <>
    <UserMenuItem label="Profile" onClick={() => {}} />
    <UserMenuItem label="Settings" href="#settings" />
    <UserMenuItem label="Log out" destructive onClick={() => {}} />
  </>
);

export const Default: Story = {
  args: {
    username: 'Mara Kealoha',
    detail: 'mara@terra.dev',
    initials: 'MK',
    children: items,
  },
};

export const CustomTrigger: Story = {
  args: {
    username: 'Mara Kealoha',
    detail: 'Administrator',
    initials: 'MK',
    trigger: (
      <span className="flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3 text-sm">
        <Avatar initials="MK" size="1.5rem" />
        Mara
      </span>
    ),
    children: items,
  },
};

export const StartAligned: Story = {
  args: {
    username: 'Mara Kealoha',
    initials: 'MK',
    align: 'start',
    children: items,
  },
};
