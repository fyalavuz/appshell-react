import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollNav, ScrollNavItem } from './ScrollNav';
import { AppShellProvider } from './context';

const meta = {
  title: 'Components/ScrollNav',
  component: ScrollNav,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <AppShellProvider>
        <Story />
      </AppShellProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollNav>;

export default meta;
type Story = StoryObj<typeof meta>;

const categories = ['All', 'Technology', 'Design', 'Business', 'Science', 'Health', 'Sports', 'Entertainment'];

function ScrollNavDemo() {
  const [active, setActive] = useState('All');
  return (
    <ScrollNav>
      {categories.map((cat) => (
        <ScrollNavItem
          key={cat}
          label={cat}
          active={active === cat}
          onClick={() => setActive(cat)}
        />
      ))}
    </ScrollNav>
  );
}

export const Default: Story = {
  args: { children: null },
  render: () => <ScrollNavDemo />,
};

export const FewItems: Story = {
  args: { children: null },
  render: () => {
    const [active, setActive] = useState('Home');
    const items = ['Home', 'Explore', 'Trending'];
    return (
      <ScrollNav>
        {items.map((item) => (
          <ScrollNavItem
            key={item}
            label={item}
            active={active === item}
            onClick={() => setActive(item)}
          />
        ))}
      </ScrollNav>
    );
  },
};
