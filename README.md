# React Native Core UI

[![NPM Version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![License][license-image]][license-url]

`@kietpt2003/react-native-core-ui` provides a collection of core, reusable, and easily customizable User Interface (UI) Components built for React Native applications. Our goal is to help you build beautiful and consistent user interfaces quickly.

> [!TIP]
>
> - My info: <https://github.com/kietpt2003>
> - View all component on web by [Storybook Core UI](https://kietpt2003.github.io/react-native-core-ui/) (Due to those components, designed for Mobile devices, some components are not work well on Storybook web)

**Note:** If you are new to this project just follow this command:

```sh
# If you are currently in root package folder
# Run yarn install for the first time
yarn install

# Run yarn build for apply you local changes -> build -> copy to example/RNCoreUISample/node_modules
yarn build

# From now if you are in example/RNCoreUISample. Just run yarn install
# All your changes in package will be packed and copy to example/RNCoreUISample/node_modules
yarn install
```

## Table of Contents

- [Installation](#installation)
- [Inputs](#inputs)
  - [Text](#text)
  - [Button](#button)
  - [TextField](#textfield)
- [Data Display](#data-display)
  - [Accordion](#accordion)
  - [AccordionTree](#accordiontree)
  - [Badge](#badge)
  - [Shadow](#shadow)
- [Surfaces](#surfaces)
  - [Card](#card)
  - [Paper](#paper)
- [Layout](#layout)
  - [Flex](#flex)
- [Lists](#lists)
  - [DraggableFlatList](#draggableflatlist)
- [Navigation](#navigaiton)
  - [Breadcrumb](#breadcrumb)
- [Color pallete](#colors)
- [Font size template](#fontsize)
- [Scaling Function](#scaling-function)
  - [scale(size: number)](#scalesize-number)
  - [scaleH(size: number)](#scalehsize-number)
  - [moderateScale(size: number, factor?: number)](#moderatescalesize-number-factor-number)
  - [moderateHeightScale(size: number, factor?: number)](#moderateheightscalesize-number-factor-number)
  - [scaleFont(size: number)](#scalefontsize-number)
  - [IPHONE_12_WIDTH](#iphone_12_width)
  - [IPHONE_12_HEIGHT](#iphone_12_heigth)
- [Resolution Function](#resolution-function)
  - [getPaddingTop()](#getpaddingtop)
  - [getPaddingBottom()](#getpaddingbottom)
  - [isTablet](#istablet)
  - [StylePlatform](#styleplatform)
  - [statusBarHeight](#statusbarheight)
- [Converter and format](#converter-and-format)
  - [convertString(value: any)](#convertstring)
  - [convertNumber(value: any)](#convertnumber)
  - [convertSeconds(seconds: number)](#convertseconds)
  - [formatHours(seconds: number)](#formathour)
  - [fixedDistance(distance?: number, toFixed?: number)](#fixeddistance)
  - [formatMoney(num: number, maximumFractionDigits: number, lang: string)](#formatmoney)
- [Debounce](#debounce)
- [Others](#others)
  - [cleanTagHTML(str: string)](#cleantaghtml)

## Installation

Please install required packages:

- @react-native-camera-roll/camera-roll: ">=7.10.0" => For access devices media support [GalleryBottomSheet](#gallerybottomsheet) & [useGalleryAssets](#usegalleryassetsdefaultassettype-assettype). `Note`: This package should be upper then 7.10.0. Due to error in v7.7.0 and lowwer version this package won't work correct in [GalleryBottomSheet](#gallerybottomsheet) & [useGalleryAssets](#usegalleryassetsdefaultassettype-assettype)
- react-native-device-info: ">=8.1.3", => Use for knowing device is table or not
- react-native-gesture-handler: ">=2.9.0", => Support handling gesture for [GalleryBottomSheet](#gallerybottomsheet)
- react-native-reanimated: ">=2.8.0", => For handling package animation
- react-native-svg: ">=12.1.1", => For custom svg
- react-native-vector-icons: ">=8.1.0", => Please config correct [installation guidline](https://www.npmjs.com/package/react-native-vector-icons#installation) for not handling icon error

## Inputs

### Text

Displays text with default styling. Use this as the baseline for typography.

#### Props

| Prop            | Type                   | Default   | Description                                                                                              |
| --------------- | ---------------------- | --------- | -------------------------------------------------------------------------------------------------------- |
| **`style`**     | `StyleProp<TextStyle>` | _None_    | Style of the Text component, just like [Text Style Props](https://reactnative.dev/docs/text-style-props) |
| **`color`**     | `ColorValue`           | `"black"` | Color of the text                                                                                        |
| **`bold`**      | `boolean`              | `false`   | Choose to bold the text                                                                                  |
| **`children`**  | `React.ReactNode`      | _None_    | Provide the text string or another Text component                                                        |
| **`load`**      | `boolean`              | `false`   | Waiting before show Text                                                                                 |
| **`styleView`** | `StyleProp<ViewStyle>` | _None_    | For custom a View outside Text component                                                                 |

### Button

### TextField

## Data Display

### Accordion

### AccordionTree

### Badge

### Shadow

## Surfaces

### Card

### Paper

## Layout

### Flex

## Lists

### DraggableFlatList

## Navigaiton

### Breadcrumb

## Colors

We provide a variety of palete `colors` and some shadows!

### Usage

```jsx
import { colors } from "@kietpt2003/react-native-core-ui/themes";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
});
```

## Fontsize

We provide variety of fontSize that aldready scaled by our [scaleFont](#scalefontsize-number) API

### Usage

```jsx
import { fontSize } from "@kietpt2003/react-native-core-ui/themes";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize._16,
  },
});
```

## Scaling Function

```jsx
import {
  scale,
  verticalScale,
  moderateScale,
} from "@kietpt2003/react-native-core-ui/utils";
import { colors, fontSize } from "@kietpt2003/react-native-core-ui/themes";

const Component = (props) => (
  <View
    style={{
      width: scale(30),
      height: verticalScale(50),
      padding: moderateScale(5),
    }}
  >
    <Text
      style={{
        fontSize: fontSize._16,
        color: colors.black,
      }}
    >
      Component
    </Text>
  </View>
);
```

### scale(size: number)

Will return a linear scaled result of the provided size, based on your device's screen width.

#### Usage

```jsx
import { scale } from "@kietpt2003/react-native-core-ui/utils";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: scale(5),
  },
});
```

### scaleH(size: number)

Will return a linear scaled result of the provided size, based on your device's screen height.

#### Usage

```jsx
import { scaleH } from "@kietpt2003/react-native-core-ui/utils";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: scaleH(5),
  },
});
```

### moderateScale(size: number, factor?: number)

Sometimes you don't want to scale everything in a linear manner, that's where moderateScale comes in.  
The cool thing about it is that you can control the resize factor (default is 0.5).  
If normal scale will increase your size by +2X, moderateScale will only increase it by +X, for example:  
➡️ &nbsp;&nbsp;scale(10) = 20  
➡️ &nbsp;&nbsp;moderateScale(10) = 15  
➡️ &nbsp;&nbsp;moderateScale(10, 0.1) = 11

#### Usage

```jsx
import { moderateScale } from "@kietpt2003/react-native-core-ui/utils";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(5),
  },
});
```

### moderateHeightScale(size: number, factor?: number)

Same as [moderateScale](#moderatescalesize-number-factor-number), but using scaleH instead of scale.

#### Usage

```jsx
import { moderateHeightScale } from "@kietpt2003/react-native-core-ui/utils";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: moderateHeightScale(5),
  },
});
```

### scaleFont(size: number)

Will return a linear scaled result of the provided size, based on PixelRatio & scaleAvg.
You can use [fontSize](#fontsize) from /theme instead of using scalefont().

#### Usage

```jsx
import { scaleFont } from "@kietpt2003/react-native-core-ui/utils";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    fontSize: scaleFont(16), // fontSize._16
  },
});
```

### IPHONE_12_WIDTH

Just a constants that specify iPhone 12 width.

```js
import { IPHONE_12_WIDTH } from "@kietpt2003/react-native-core-ui/utils";
console.log(IPHONE_12_WIDTH); // 375
```

### IPHONE_12_HEIGTH

Just a constants that specify iPhone 12 height.

```js
import { IPHONE_12_HEIGTH } from "@kietpt2003/react-native-core-ui/utils";
console.log(IPHONE_12_HEIGTH); // 812
```

## Resolution Function

### getPaddingTop

Get the top padding based on the device type

- 26 OPPO
- 28 NOKIA

#### Usage

```jsx
import { getPaddingTop } from "@kietpt2003/react-native-core-ui/utils";
const paddingTop = getPaddingTop();
console.log("paddingTop:", paddingTop);
```

### getPaddingBottom

Get the bottom padding based on the device type

#### Usage

```jsx
import { getPaddingBottom } from "@kietpt2003/react-native-core-ui/utils";
const paddingBottom = getPaddingBottom();
console.log("paddingBottom:", paddingBottom);
```

### isTablet

Check if the device is a tablet

#### Usage

```jsx
import { isTablet } from "@kietpt2003/react-native-core-ui/utils";
console.log("isTablet", isTablet); // true/false
```

### StylePlatform

Use this function to get the styles based on the device type

@param {Object} styles - StyleProp
@param {ViewStyle} styles.tablet - Styles for tablet
@param {ViewStyle} styles.phone - Styles for phone

#### Props

| Prop         | Type             | Default     | Description                                                                                                     |
| ------------ | ---------------- | ----------- | --------------------------------------------------------------------------------------------------------------- |
| **`styles`** | `StyleProp<any>` | `undefined` | Initiallize the styles for table and phone. Its contains 2 fields: `tablet` & `phone`. [See example](#usage-11) |

#### Usage

```jsx
<View
  style={StylePlatform({
    tablet: styles.containerTablet,
    phone: styles.containerPhone,
  })}
>
  <Text
    style={StylePlatform({
      tablet: styles.textTablet,
      phone: styles.textPhone,
    })}
  >
    Hello, Platform!
  </Text>
</View>
```

### statusBarHeight

statusBarHeight of the device

#### Usage

```jsx
import { statusBarHeight } from "@kietpt2003/react-native-core-ui/utils";
console.log("statusBarHeight", statusBarHeight);
```

## Converter and format

### convertString

This function converts input into a string.

- If the input is null or undefined, it returns an empty string.
- If the input is an object, it returns a stringified version of the object.
- Otherwise, it returns the string representation of the input.

#### Usage

```js
import { convertString } from "@kietpt2003/react-native-core-ui/utils";
const str = convertString(2003); // "2003"
```

### convertNumber

This function converts input into a number.

- If the input is null or undefined, it returns 0.
- If the input is not a number, it returns 0.
- Otherwise, it returns the parsed float value of the input.

#### Usage

```js
import { convertNumber } from "@kietpt2003/react-native-core-ui/utils";
const num = convertNumber("2003"); // 2003
```

### convertSeconds

This function convert seconds to a string in the format "mm:ss".

- If the input is less than 0, it returns "00:00".
- If the input is greater than 3599, it returns "00:00".

#### Usage

```js
import { convertSeconds } from "@kietpt2003/react-native-core-ui/utils";
const time = convertSeconds(123); // "02:03"
```

### formatHour

Function to format seconds into a string in the format "hh:mm:ss".

- If the input is less than 0, it returns "00:00:00".
- If the input is greater than 86399, it returns "00:00:00".

#### Usage

```js
import { formatHour } from "@kietpt2003/react-native-core-ui/utils";
const time = formatHour(3661); // "01:01:01"
```

### fixedDistance

Function to format a distance value.

- If the input is an integer, it returns the integer value.
- If the input is a float, it returns the value formatted to a custom toFixed value decimal places.
- If the input is null or undefined, it returns 0.

_Note:_ The toFixed value should be between 1 and 5, otherwise it defaults to 2.

#### Usage

```js
import { fixedDistance } from "@kietpt2003/react-native-core-ui/utils";
const distance = fixedDistance(123.456); // "123.46"
const distance2 = fixedDistance(123.4567, 3); // "123.457"
```

### formatMoney

Function to format money values.

#### Props

| Prop                        | Type     | Default | Description                                                                                                   |
| --------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| **`num`**                   | `number` | `0`     | Define the value need to be format.                                                                           |
| **`maximumFractionDigits`** | `number` | `0`     | Define the maximum fraction digits. [See example](#usage-18)                                                  |
| **`lang`**                  | `string` | `en-US` | Define the language. This should be a BCP 47 language tag (e.g., 'en-US', 'vi-VN'). [View detail](#lang-prop) |

#### lang prop

This is a string that contains a language code and an optional country code, separated by a hyphen.

_Structure:_ `"[languageCode]-[countryCode]"`
_Example:_ `'en-IN'` => en: Language English, IN: Country India
_Reference:_

- [List of ISO 639 language codes](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes)
- [List of ISO 3166-1 country codes](https://vi.wikipedia.org/wiki/ISO_3166-1)

#### Usage

```js
import { formatMoney } from "@kietpt2003/react-native-core-ui/utils";
const money = formatMoney(1234567.89); // "1,234,568"
const money2 = formatMoney(1234567.89, 2); // "1,234,567.89"
const money3 = formatMoney(1234567.89, 2, "vi-VN"); // "1.234.567,89"
```

## Debounce

- Creates a debounced function that delays invoking the provided function until after a specified delay in milliseconds has elapsed since the last time the debounced function was invoked.
- The debounced function comes with `cancel` and `flush` methods to cancel the debounced invocation and to immediately invoke the function, respectively.

### Usage

```jsx
import { debounce } from "@kietpt2003/react-native-core-ui/utils";
const onChangeText = debounce(() => {
  console.log("Function executed!");
}, 1000);

//Flush case
const debouncedLog = debounce(logMessage, 2000);
debouncedLog("Waiting 2s...");
setTimeout(() => {
  debouncedLog.flush(); // Immediately execute the function
}, 1000);

//Cancel case
debouncedLog("Canceled");
setTimeout(() => {
  debouncedLog.cancel(); // Don't execute the function
}, 1000);
```

## Others

### cleanTagHTML

Provide a function to clean HTML tags and &nbsp; from a string.

### Usage

```js
import { cleanHTML } from "@kietpt2003/react-native-core-ui/utils";
const raw = `
    <div>Hello&nbsp;&nbsp;&nbsp;World</div>
    <p>This is&nbsp;a <strong>test</strong></p>
  `;
console.log(cleanHTML(raw));
// Output:
// Hello
// World
// This is a test
```

## 💖 Support Kiet!

Thank you so much already for checking my repos! If you want to go a step further and support my open source work, buy me a coffee:

<a href='https://ko-fi.com/kietpt2003' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi1.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
