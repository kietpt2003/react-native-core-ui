import type { Preview } from '@storybook/react';
import { spyOn } from 'storybook/internal/test';
import { action } from 'storybook/actions';

const originalConsoleLog = console.log;

function shouldLog(args: unknown[]): boolean {
  if (!args || args.length === 0) return false;

  const first = args[0];

  if (typeof first === 'string') return true;

  if (typeof first === 'object') {
    try {
      const json = JSON.stringify(first);
      return json.length < 1000;
    } catch {
      return false;
    }
  }

  return false;
}

const preview: Preview = {
  parameters: {
    layout: 'centered',
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
  async beforeEach() {
    /* ---------- console.log ---------- */
    spyOn(console, 'log')
      .mockName('')
      .mockImplementation((...args: unknown[]) => {
        if (shouldLog(args)) {
          action('console.log')(...args);
        }
        originalConsoleLog(...args);
      });
  }
};

export default preview;