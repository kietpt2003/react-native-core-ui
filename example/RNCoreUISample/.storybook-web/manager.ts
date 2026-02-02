import { addons } from 'storybook/manager-api';

import StorybookTheme from './StorybookTheme';

addons.setConfig({
  theme: StorybookTheme,
});

const forceTitle = () => {
  // @ts-ignore
  const brandName = process.env.PAGE_TITLE || 'Core UI';

  if (document.title !== brandName) {
    document.title = brandName;
  }
};

// Track Storybook auto change Page Title -> Reset title
const observer = new MutationObserver(forceTitle);

observer.observe(document.querySelector('title')!, {
  childList: true,
});