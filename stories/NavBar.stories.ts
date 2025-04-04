import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import NavBar from './NavBar';

const meta = {
  title: 'Example/NavBar',
  component: NavBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Login: Story = {
  args: { userName: 'yunha' },
};
export const Logout: Story = {};
