import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import NavButton from './NavButton';

const meta = {
  title: 'Example/NavButton',
  component: NavButton,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof NavButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const login: Story = {
  args: {
    userName: 'yunha',
  },
};
export const logout: Story = {
  args: {},
};
