import { create } from 'storybook/theming';

// @ts-ignore
const brandUrl = process.env.BRAND_URL || '';
// @ts-ignore
const brandImage = process.env.BRAND_IMAGE || '';
// @ts-ignore
const brandTitle = process.env.BRAND_TITLE || '';

export default create({
  base: 'light',
  brandTitle: brandTitle,
  brandUrl: brandUrl,
  brandImage: brandImage,
  brandTarget: '_self',
});
