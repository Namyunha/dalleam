import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Button from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/DallaemButton',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes

  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Gray: Story = {
  args: {
    variant: 'gray',
    size: 'lg',
    fillState: 'full',
    children: 'gray',
  },
};

export const GraySmall: Story = {
  args: {
    variant: 'gray',
    size: 'sm',
    fillState: 'full',
    children: 'gray',
  },
};

export const Orange: Story = {
  args: {
    variant: 'orange',
    size: 'lg',
    fillState: 'full',
    children: 'orange',
  },
};

export const OrangeSmall: Story = {
  args: {
    variant: 'orange',
    size: 'sm',
    fillState: 'full',
    children: 'orange',
  },
};

export const Tomato: Story = {
  args: {
    variant: 'tomato',
    size: 'lg',
    fillState: 'full',
    children: 'tomato',
  },
};

export const TomatoSmall: Story = {
  args: {
    variant: 'tomato',
    size: 'sm',
    fillState: 'full',
    children: 'tomato',
  },
};

export const Red: Story = {
  args: {
    variant: 'red',
    size: 'lg',
    fillState: 'full',
    children: 'tomato',
  },
};

export const RedSmall: Story = {
  args: {
    variant: 'red',
    size: 'sm',
    fillState: 'full',
    children: 'tomato',
  },
};

export const Invalidate: Story = {
  args: {
    variant: 'invalidate',
    size: 'lg',
    fillState: 'full',
    children: 'invalidate',
  },
};

export const InvalidateSmall: Story = {
  args: {
    variant: 'invalidate',
    size: 'sm',
    fillState: 'full',
    children: 'invalidate',
  },
};
