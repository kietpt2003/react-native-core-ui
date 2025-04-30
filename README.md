# React Native Core UI

Accelerate your React Native development with a rich set of customizable UI components built for consistency and performance. Designed to streamline layout and styling, these components are ideal for building modern, responsive, and scalable interfaces across all screens. Seamlessly adaptable and theme-ready for effortless branding.

> [!TIP]
> My info: <https://github.com/kietpt2003>

## Table of Contents

- [Text](#text)
- [ScrollPercentage](#scroll-percentage)

## Text

You can use Text component with custom loading (if need) and style with their own view

### Props

| Prop            | Type                   | Default     | Description                                                             |
| --------------- | ---------------------- | ----------- | ----------------------------------------------------------------------- |
| **`style`**     | `StyleProp<TextStyle>` | _None_      | Style of the Text component, just like [Text Style Props](https://reactnative.dev/docs/text-style-props)                 |
| **`color`**     | `ColorValue`           | `"black"`   | Color of the text                                                       |
| **`bold`**      | `boolean`              | `false`     | Choose to bold the text                                                 |
| **`children`**  | `React.ReactNode`      | _None_      | Provide the text string or another Text component                       |
| **`load`**      | `boolean`              | `false`     | Waiting before show Text                                                |
| **`styleView`** | `StyleProp<ViewStyle>` | _None_      | For custom a View outside Text component                                |
