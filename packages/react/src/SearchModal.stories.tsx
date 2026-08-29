import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchModal } from './SearchModal';
import { SearchField } from './SearchField';

const meta: Meta = {
  title: 'Components/SearchModal',
  component: SearchModal,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const FRUITS = ['Apple', 'Apricot', 'Banana', 'Cherry', 'Grape', 'Mango', 'Peach', 'Pear'];

function TriggeredDemo() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-sm">
      <SearchField
        placeholder="Search fruit"
        value={query}
        onChange={setQuery}
        onClick={() => setOpen(true)}
      />
      <SearchModal
        open={open}
        onClose={() => setOpen(false)}
        defaultQuery={query}
        placeholder="Search everywhere"
      >
        {(q) => (
          <ul className="p-2">
            {FRUITS.filter((f) => f.toLowerCase().includes(q.toLowerCase())).map((f) => (
              <li key={f} className="rounded-lg px-3 py-2 text-sm hover:bg-accent">
                {f}
              </li>
            ))}
          </ul>
        )}
      </SearchModal>
    </div>
  );
}

export const TriggeredBySearchField: Story = {
  render: () => <TriggeredDemo />,
};
