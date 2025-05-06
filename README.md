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

Please install required packages:

- @react-native-camera-roll/camera-roll: ">=7.10.0" => For access devices media support [GalleryBottomSheet](#gallery-bottom-sheet) & [useGalleryAssets](#use-gallery-assets). `Note`: This package should be upper then 7.10.0. Due to error in v7.7.0 and lowwer version this package won't work correct in [GalleryBottomSheet](#gallery-bottom-sheet) & [useGalleryAssets](#use-gallery-assets)
- d4dpocket: "^0.1.8", => Use for constants, utils, fontSize, etc
- react-native-device-info: ">=8.1.3", => Use for knowing device is table or not
- react-native-gesture-handler: ">=2.9.0", => Support handling gesture for [GalleryBottomSheet](#gallery-bottom-sheet)
- react-native-reanimated: ">=2.8.0", => For handling package animation
- react-native-svg: ">=12.1.1", => For custom svg
- react-native-vector-icons: ">=8.1.0", => Please config correct [installation guidline](https://www.npmjs.com/package/react-native-vector-icons#installation) for not handling icon error

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

## GalleryBottomSheet

A bottom sheet component for displaying a gallery of images and videos. It allows users to select multiple assets and provides a filter for albums.

<p align="center">
  <img src="https://s4.gifyu.com/images/bLfMU.gif" width="200" style="display: inline-block; margin-right: 10px;" />
  <img src="https://s4.gifyu.com/images/bLfzY.gif" width="200" style="display: inline-block; margin-right: 10px;" />
  <img src="https://s4.gifyu.com/images/bLfMT.gif" width="200" style="display: inline-block;" />
</p>

### Permissions

#### Android

Add this permission to your AndroidManifest.xml:
```sh
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="32"/>
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
<uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />
```

#### iOS

Add this perission to your Info.plist:
```sh
<key>NSPhotoLibraryUsageDescription</key>
<string>App request permission for access your gallery</string>
<key>NSPhotoLibraryAddUsageDescription</key>
<string>App request permission for create assets in your gallery</string>
```

### Props

| Prop                     | Type                                                                | Default                                                   | Description                                                                                                                                                                                                                              |
|--------------------------|---------------------------------------------------------------------|------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **`isOpen`**     | `boolean` | `false`      | Define to open gallery or not. |
| **`openHeight`**         | `number`                                                            | `ScreenHeight / 2`                                         | Define the position to open gallery. **Note:** y coordinate of the top of the bottom sheet from the top of the screen                                                                             |
| **`closeHeight`**        | `number`                                                            | `ScreenHeight`                                             | Define the position when closed gallery. **Note:** y coordinate of the top of the bottom sheet from the top of the screen                                                                         |
| **`maxHeight`**          | `number`                                                            | `0`                                                        | Define the maximum y coordinate that gallery should snapped at after finger release. **Note:** y coordinate of the top of the bottom sheet from the top of the screen                             |
| **`headerBarColor`**     | `ColorValue`                                                        | `"#FFFFFF"`                                                | Define the background color of the header bar. **Note:** Full control over the look at each position. Whether it's beautiful or ugly is up to you.                                                 |
| **`barIconColor`**       | `ColorValue`                                                        | `"#000000"`                                                | Define the header bar icon color. **Note:** Full control over the look at each position. Whether it's beautiful or ugly is up to you.                                                             |
| **`headerTitleStyle`**   | `Pick<TextStyle, "color" \| "fontFamily" \| "fontWeight">`         | `{ color: '#000000' }`                                     | Define styling for the header title. Only supports: `color`, `fontFamily`, `fontWeight`.                                                                                                          |
| **`headerTitle`**        | `string`                                                            | `'Tất cả ảnh'`                                             | Define the header title. Will be overridden by folder name when one is selected. Will be truncated if too long.                                                                                   |
| **`headerTitleIconColor`** | `ColorValue`                                                     | `"#000000"`                                                | Define the header title icon color.                                                                                                                                                                |
| **`backgroundColor`**    | `ColorValue`                                                        | `"#FFFFFF"`                                                | Define the background color of the gallery bottom sheet.                                                                                                                                           |
| **`emptyGalleryMsg`**    | `string`                                                            | `'Không có hình ảnh để hiển thị'`                          | Message shown when there are no media items available. Please provide meaningful content.                                                                                                         |
| **`emptyGalleryMsgStyle`** | `Pick<TextStyle, "color" \| "fontFamily" \| "fontWeight">`      | `{ color: '#000000' }`                                     | Define styling for the empty message. Only supports: `color`, `fontFamily`, `fontWeight`. [See example](#headertitlestyle)                                                                                                        |
| **`videoIconStyle`**     | `{ circleStyle?: CircleStyleProps; polygonStyle?: CircleStyleProps }` | [See example](#videoiconstyle)                                        | Define styling for the video icon shown for video items. Full control over circle and polygon styles.                                                                                             |
| **`albumItemStyle`**     | `AlbumFilterStyleProps`                                             | `{ titleColor: '#000000', countColor: '#A0A0A0' }`         | Define style for album filter items. Full control over title and count colors. [See example](#albumitemstyle)                                                                                                                     |
| **`assetType`**          | `'All'` \| `'Photos'` \| `'Videos'`                                 | `'All'`                                                    | Asset types to display. Can be dynamically changed with setState.                                                                                                                                |
| **`maxSelectable`**      | `number`                                                            | `5`                                                        | Max number of items selectable. Min: `0`, Max: `10`. Large values may cause performance issues.                                                                                                       |
| **`onSelectedAssetsChange`** | `(assets: PhotoIdentifier[]) => void`                         | `undefined`                                                | Define function for handling selected assets data. This function will be called when the user select an asset.                                                                                                                     |

#### headerTitleStyle

Only support: `color`, `fontFamily`, `fontWeight`.
```sh
  <GalleryBottomSheet
    isOpen={isOpen}
    ...
    headerTitleStyle={{
      color: '#000000',
      fontFamily: 'Arial',
      fontWeight: 400,      // Correct ✅
      fontSize: 20          // Wrong => Unsupport ❌
    }}
    ...
  />
```

#### videoIconStyle

Only support: `fill`, `stroke`, `strokeWidth`.
For the `strokeWidth`, we accept value start from `scale(5)` to `scale(8)`
```sh
  <GalleryBottomSheet
    isOpen={isOpen}
    ...
    videoIconStyle={{
      circleStyle: {
        fill: 'rgba(0, 0, 0, 0.5)',
        stroke: 'black',
        strokeWidth: 7
      },
      polygonStyle: {
        fill: 'rgba(0, 0, 0, 0.5)',
        stroke: 'black',
        strokeWidth: 7
      },
    }}
    ...
  />
```

#### albumItemStyle

Only support: `titleColor`, `countColor`.
```sh
  <GalleryBottomSheet
    isOpen={isOpen}
    ...
    albumItemStyle={{
      titleColor: '#000000',
      countColor: '#A0A0A0'
    }}
    ...
  />
```

## 💖 Support Kiet!

Thank you so much already for checking my repos! If you want to go a step further and support my open source work, buy me a coffee:

<a href='https://ko-fi.com/kietpt2003' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi1.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>