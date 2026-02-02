import React from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Animated,
  Easing,
  TextStyle,
} from 'react-native';

import { colors, fontSize } from '@themes'
import { WEB } from '@utils'
import Text from 'Texts/Text';

type TextAlginVertical = "auto" | "center" | "top" | "bottom" | undefined

export interface RenderIconParams {
  focused: boolean;
  hasError: boolean;
  editable: boolean;
}

export type RenderIcon = (params: RenderIconParams) => React.ReactNode;

export interface TextFieldProps
  extends Omit<TextInputProps, 'value' | 'defaultValue' | 'onChangeText' | 'placeholder'> {
  label?: string;
  labelMinSize?: number;
  labelSize?: number;
  applyTopLabel?: boolean;
  labelBackground?: string;
  value?: string;
  defaultValue?: string;
  onChangeText?: (text: string) => void;
  error?: boolean | string;
  errorColor?: string;
  focusedColor?: string;
  helperText?: string;
  helperTextColor?: string;
  helperTextStyle?: StyleProp<TextStyle>;
  renderStartIcon?: RenderIcon;
  renderEndIcon?: RenderIcon;
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
}

const DEFAULT_ROWS = 3;
const DEFAULT_MARGIN_TOP = 6;
const DEFAULT_PADDING = 12;
const DISABLED_COLOR = colors.disabled;
const FOCUSED_COLOR = colors.primary;
const ERROR_COLOR = colors.error;
const DEFAULT_COLOR = colors.gray_D1D2D4
const MIN_HEIGHT = 48;

const TextField: React.FC<TextFieldProps> = ({
  label,
  labelMinSize = fontSize._12,
  labelSize = fontSize._14,
  applyTopLabel = true,
  labelBackground,
  value,
  defaultValue,
  onChangeText,
  error,
  errorColor,
  focusedColor,
  helperText,
  helperTextColor,
  helperTextStyle,
  renderStartIcon,
  renderEndIcon,
  multiline = false,
  rows = DEFAULT_ROWS,
  maxRows,
  editable = true,
  containerStyle,
  inputContainerStyle,
  style,
  onFocus,
  onBlur,
  ...rest
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '');
  const [focused, setFocused] = React.useState(false);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [containerHeight, setContainerHeight] = React.useState(0);
  const [labelHeight, setLabelHeight] = React.useState(0);
  const [helperHeight, setHelperHeight] = React.useState(0);
  const [contentHeight, setContentHeight] = React.useState<number | null>(null);
  const [startIconWidth, setStartIconWidth] = React.useState(0);
  const [endIconWidth, setEndIconWidth] = React.useState(0);
  const [webInputHeight, setWebInputHeight] = React.useState<number | undefined>();
  const inputRef = React.useRef<any>(null); //Handling dragging on Web

  const isApplyStartIcon = typeof renderStartIcon === 'function';
  const isApplyEndIcon = typeof renderEndIcon === 'function';


  const labelMaxWidth =
    containerWidth -
    (isApplyStartIcon ? startIconWidth : 0) -
    (isApplyEndIcon ? endIconWidth : 0) -
    DEFAULT_PADDING * 2;

  const isControlled = value !== undefined;
  const textValue = isControlled ? value : internalValue;

  const hasError = Boolean(error);
  const errorMessage = typeof error === 'string' ? error : undefined;

  const floatAnim = React.useRef(
    new Animated.Value(textValue ? 1 : 0)
  ).current;

  const handleChange = React.useCallback(
    (text: string) => {
      if (!isControlled) {
        setInternalValue(text);
      }
      onChangeText?.(text);
    },
    [isControlled, onChangeText]
  );

  const handleHideTopLabel = () => {
    if (applyTopLabel) {
      return undefined
    }

    return floatAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    })
  }

  const resolvePaddingSide = (
    rawStyle: any,
    isTop: boolean
  ): number => {
    const style = StyleSheet.flatten(rawStyle);
    const side = isTop ? 'paddingTop' : 'paddingBottom';

    if (typeof style?.paddingVertical === 'number') {
      return style.paddingVertical;
    }

    if (typeof style?.padding === 'number') {
      return style.padding;
    }

    if (typeof style?.[side] === 'number') {
      return style[side];
    }

    return 0;
  };

  const resolvePadding = (
    userStyle: any,
    fallbackStyle: any,
    isTop: boolean
  ): number => {
    const userPadding = resolvePaddingSide(userStyle, isTop);
    if (userPadding !== 0) return userPadding;

    return resolvePaddingSide(fallbackStyle, isTop);
  };

  const calculatePadding = (isTop: boolean) => {
    const containerPadding = resolvePadding(
      containerStyle,
      styles.container,
      isTop
    );

    const inputPadding = resolvePadding(
      inputContainerStyle,
      styles.inputContainer,
      isTop
    );

    const textInputPadding = resolvePadding(
      style,
      styles.input,
      isTop
    );

    return containerPadding + inputPadding + textInputPadding;
  };


  const getInsetY = (alignVertical: TextAlginVertical) => {
    switch (alignVertical) {
      case 'center':
        return containerHeight / 2 - labelHeight;
      case 'bottom':
        return containerHeight - helperHeight - DEFAULT_MARGIN_TOP - labelHeight - calculatePadding(false);
      case 'top':
      default:
        return calculatePadding(true);
    }
  };

  const resolveTextAlignVertical = () => {
    const textInputStyle = StyleSheet.flatten(style);
    if (WEB) { //Web only support textAlignVertical top
      return 'top';
    }
    return textInputStyle?.textAlignVertical ?? 'top';
  };

  const textAlignVertical = resolveTextAlignVertical();

  const multilineStyle = React.useMemo(() => {
    if (!multiline || !contentHeight) {
      return null;
    }

    const padding =
      resolvePadding(style, styles.input, true) +
      resolvePadding(style, styles.input, false);

    return {
      minHeight: rows ? rows * (contentHeight - (WEB ? padding * 1.9 : padding / 1.3)) : undefined,
      maxHeight: maxRows ? maxRows * (contentHeight - padding / 1.1) : undefined, // maxHeight not work for auto add new line with maxRows on Web. Use height instead.
    };
  }, [multiline, rows, maxRows, contentHeight]);

  const multilineWebStyle = React.useMemo(() => {
    if (!multiline || !WEB || !contentHeight || !webInputHeight) {
      return null;
    }

    const padding =
      resolvePadding(style, styles.input, true) +
      resolvePadding(style, styles.input, false);

    const minHeight = rows ? rows * (contentHeight - padding * 1.9) : 0;
    const maxHeight = maxRows ? maxRows * (contentHeight - padding * 1.9) : 0;

    if (webInputHeight > maxHeight) {
      return {
        height: maxHeight
      }
    }

    if (webInputHeight > minHeight && webInputHeight <= maxHeight) {
      return {
        height: webInputHeight
      }
    }

    return null;
  }, [multiline, rows, maxRows, contentHeight, webInputHeight]);

  const labelInsetY = React.useMemo(
    () => getInsetY(textAlignVertical),
    [
      textAlignVertical,
      style,
      inputContainerStyle,
      containerStyle,
      containerHeight,
      helperHeight,
      labelHeight
    ]
  );

  const renderBackgroundLabel = () => {
    if (labelBackground) {
      return labelBackground;
    }

    if (!editable) {
      return DISABLED_COLOR;
    }

    return colors.white
  }

  const renderLabelColor = () => {
    if (hasError) {
      if (errorColor) {
        return errorColor;
      }
      return ERROR_COLOR;
    }

    if (focused) {
      if (focusedColor) {
        return focusedColor;
      }
      return FOCUSED_COLOR;
    }

    return DEFAULT_COLOR;
  }

  const renderInputBorderColor = () => {
    if (hasError) {
      if (errorColor) {
        return errorColor;
      }
      return ERROR_COLOR;
    }

    if (focused) {
      if (focusedColor) {
        return focusedColor;
      }
      return FOCUSED_COLOR;
    }

    return DEFAULT_COLOR;
  }

  const renderHelperTextColor = () => {
    if (helperTextColor) {
      return helperTextColor;
    }

    if (hasError) {
      if (errorColor) {
        return errorColor;
      }
      return ERROR_COLOR;
    }

    if (!editable) {
      return DEFAULT_COLOR;
    }

    return colors.black;
  }

  const labelViewStyle = {
    position: 'absolute' as const,
    left: isApplyStartIcon ? startIconWidth + DEFAULT_PADDING : DEFAULT_PADDING,
    top: applyTopLabel ? floatAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [labelInsetY, -labelMinSize / 1.5],
    }) : labelInsetY,
    maxWidth: labelMaxWidth,
    overflow: 'hidden' as const,
    backgroundColor: renderBackgroundLabel(),
    paddingHorizontal: DEFAULT_PADDING,
    opacity: handleHideTopLabel(),
    borderRadius: 5
  };

  const labelStyle = {
    fontSize: applyTopLabel ? floatAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [labelSize, labelMinSize],
    }) : labelSize,
    color: renderLabelColor(),
  };

  React.useEffect(() => {
    Animated.timing(floatAnim, {
      toValue: focused || textValue ? 1 : 0,
      duration: 180,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [focused, textValue, floatAnim]);

  React.useEffect(() => {
    if (!WEB || !multiline) {
      return;
    }

    const el = inputRef.current;
    if (!el) {
      return;
    }

    let isDragging = false;
    let startY = 0;
    let startScrollTop = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startY = e.clientY;
      startScrollTop = el.scrollTop;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) {
        return;
      }
      el.scrollTop = startScrollTop - (e.clientY - startY);
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [multiline]);

  const multilineStyleSignature = React.useMemo(() => {
    if (!style) return '';

    const s = Array.isArray(style)
      ? Object.assign({}, ...style)
      : style;

    return [
      s.minHeight,
      s.maxHeight,
      s.paddingTop,
      s.paddingBottom,
      s.lineHeight,
      s.fontSize,
    ].join('|');
  }, [style]);

  React.useEffect(() => {
    let timeoutID: NodeJS.Timeout | undefined;
    if (contentHeight) {
      handleChange('');
      timeoutID = setTimeout(() => setContentHeight(null), 1000) //Wait until the text change for onContentSizeChange get the init height before reset multilineStyle
    }
    return () => {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
    }
  }, [multilineStyleSignature]);

  return (
    <View
      onLayout={e => {
        setContainerWidth(e?.nativeEvent?.layout?.width);
        setContainerHeight(e?.nativeEvent?.layout?.height);
      }}
      style={[styles.container, containerStyle]}
    >
      <View
        style={[
          styles.inputContainer,
          { borderColor: renderInputBorderColor() },
          !editable && styles.disabled,
          inputContainerStyle,
        ]}
      >
        {label && (
          <Animated.View
            pointerEvents={'none'}
            onLayout={e => {
              setLabelHeight(e?.nativeEvent?.layout?.height);
            }}
            style={labelViewStyle}
          >
            <Animated.Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={labelStyle}
            >
              {label}
            </Animated.Text>
          </Animated.View>

        )}

        {isApplyStartIcon && (
          <View
            style={styles.iconStart}
            onLayout={e => {
              setStartIconWidth(e.nativeEvent.layout.width);
            }}
          >
            {
              renderStartIcon({
                focused: focused,
                hasError: hasError,
                editable: editable,
              })
            }
          </View>
        )}

        <TextInput
          {...rest}
          ref={inputRef}
          style={[
            styles.input,
            multiline && styles.multiline,
            multilineStyle,
            multilineWebStyle,
            WEB && !editable && styles.webDisabled,
            !editable && styles.inputDisabled,
            style,
          ]}
          value={textValue}
          onChangeText={handleChange}
          editable={editable}
          multiline={multiline}
          onFocus={e => {
            if (!editable) {
              return;
            }
            setFocused(true);
            onFocus && onFocus(e);
          }}
          onBlur={e => {
            setFocused(false);
            onBlur && onBlur(e);
          }}
          onContentSizeChange={e => {
            if (multiline && WEB) {
              setWebInputHeight(e.nativeEvent.contentSize.height);
            }
            if (!multiline || contentHeight) {
              return;
            }
            setContentHeight(e.nativeEvent.contentSize.height);
          }}
        />

        {isApplyEndIcon && (
          <View
            style={styles.iconEnd}
            onLayout={e => {
              setEndIconWidth(e.nativeEvent?.layout?.width);
            }}
          >
            {
              renderEndIcon({
                focused: focused,
                hasError: hasError,
                editable: editable,
              })
            }
          </View>
        )}
      </View>

      {(errorMessage || helperText) && (
        <Text
          color={renderHelperTextColor()}
          onLayout={e => {
            setHelperHeight(e?.nativeEvent?.layout?.height);
          }}
          style={[styles.helperText, helperTextStyle]}
        >
          {errorMessage ?? helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    minHeight: MIN_HEIGHT,
    borderWidth: 1,
    borderColor: DEFAULT_COLOR,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DEFAULT_PADDING,
    backgroundColor: colors.white,
  },
  focusedBorder: {
    borderColor: FOCUSED_COLOR,
  },
  input: {
    flex: 1,
    fontSize: fontSize._14,
    color: colors.black,
    paddingVertical: DEFAULT_PADDING,
    ...(WEB
      ? ({
        outlineStyle: 'none',
        overflow: 'hidden',
      } as any)
      : {}),
  },
  multiline: {
    textAlignVertical: 'top',
    alignItems: 'flex-start'
  },
  iconStart: {
    marginRight: DEFAULT_PADDING,
  },
  iconEnd: {
    marginLeft: DEFAULT_PADDING,
  },
  helperText: {
    marginTop: DEFAULT_MARGIN_TOP,
    fontSize: WEB ? fontSize._10 : fontSize._12,
    paddingHorizontal: DEFAULT_PADDING
  },
  disabled: {
    backgroundColor: DISABLED_COLOR,
  },
  webDisabled: {
    ...(WEB
      ? ({
        cursor: 'not-allowed',
      } as any)
      : {}),
  },
  inputDisabled: {
    color: DEFAULT_COLOR
  }
});

export default TextField;
