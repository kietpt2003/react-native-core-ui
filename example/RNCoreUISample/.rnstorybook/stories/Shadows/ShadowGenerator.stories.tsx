import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import ShadowScreen from '../../../src/components/Shadows/ShadowScreen';

const meta = {
  title: 'Data Display/Shadow',
  component: ShadowScreen,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => (<ShadowScreen />)
} satisfies Meta<typeof ShadowScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
