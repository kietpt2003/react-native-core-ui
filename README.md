# React Native Core UI

Accelerate your React Native development with a rich set of customizable UI components built for consistency and performance. Designed to streamline layout and styling, these components are ideal for building modern, responsive, and scalable interfaces across all screens. Seamlessly adaptable and theme-ready for effortless branding.

> [!TIP]
> My info: <https://github.com/kietpt2003>

## Table of Contents

- [Installation](#installation)
- [Text](#text)
- [GalleryBottomSheet](#gallery-bottom-sheet)
- [useGalleryAssets](#use-gallery-assets)
- [ScrollPercentage (Future)](#scroll-percentage)

## Installation

## Text

Text component for displaying text with custom styles and loading state. This component also have its own view and can easily be customized.

### Props

| Prop            | Type                   | Default     | Description                                                             |
| --------------- | ---------------------- | ----------- | ----------------------------------------------------------------------- |
| **`style`**     | `StyleProp<TextStyle>` | _None_      | Style of the Text component, just like [Text Style Props](https://reactnative.dev/docs/text-style-props)                 |
| **`color`**     | `ColorValue`           | `"black"`   | Color of the text                                                       |
| **`bold`**      | `boolean`              | `false`     | Choose to bold the text                                                 |
| **`children`**  | `React.ReactNode`      | _None_      | Provide the text string or another Text component                       |
| **`load`**      | `boolean`              | `false`     | Waiting before show Text                                                |
| **`styleView`** | `StyleProp<ViewStyle>` | _None_      | For custom a View outside Text component                                |
