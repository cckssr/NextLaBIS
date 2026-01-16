import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import TagPill from './TagPill';

const meta = {
  component: TagPill,
} satisfies Meta<typeof TagPill>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "label"
  }
};