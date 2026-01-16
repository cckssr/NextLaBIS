import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SearchCard } from './SearchCard.server';

const meta = {
  component: SearchCard,
} satisfies Meta<typeof SearchCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};