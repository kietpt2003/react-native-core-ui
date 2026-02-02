import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        method: 'custom',
        order: [
          'Inputs',
          [
            'Text',
            'Button',
          ],
          'Data Display',
          'Surfaces'
        ],
      },
    },
  },
};

export default preview;
