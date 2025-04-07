import type { Meta, StoryObj } from '@storybook/react';
import Home from './Home';
import Gathering from './Gathering';
import Reviews from './Reviews';

const meta = {
  title: 'Example/Home',
  component: Home,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Home>;

export default meta;

type Story = StoryObj<typeof meta>;

export const GatheringPage: Story = {
  args: {
    children: Gathering(), //
  },
};
export const ReviewsPage: Story = {
  args: {
    children: Reviews(), //
  },
};
