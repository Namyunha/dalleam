import type { Meta, StoryObj } from '@storybook/react';
import ListContainer from '@/components/list/ListContainer';
import Reviews from './Reviews';

const meta = {
  title: 'Example/ListContainer',
  component: ListContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof ListContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ReviewList: Story = {
  args: {
    children: Reviews(), //
  },
};
