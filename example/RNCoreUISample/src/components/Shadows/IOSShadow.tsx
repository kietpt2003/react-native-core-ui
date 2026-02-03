import React from 'react'
import { Platform, StyleProp, View, ViewStyle } from 'react-native'
import { ANDROID, IOS, WEB } from '@kietpt2003/react-native-core-ui/utils';
import { Text } from '@kietpt2003/react-native-core-ui';
import { colors } from '@kietpt2003/react-native-core-ui/themes';

import { shadowStyles } from './styles/shadowStyles';
import CodeBox from './CodeBox';

interface IOSShadowProps {
  shadowColor: string;
  shadowOffSet: {
    width: number
    height: number
  };
  shadowOpacity: number;
  shadowRadius: number;
}

const IOSShadow = ({ shadowColor, shadowOffSet, shadowOpacity, shadowRadius }: IOSShadowProps) => {
  if (ANDROID) {
    return;
  }

  const styles: StyleProp<ViewStyle> = Platform.select({
    ios: {
      shadowColor: shadowColor,
      shadowOffset: {
        width: shadowOffSet.width,
        height: shadowOffSet.height,
      },
      shadowOpacity,
      shadowRadius,
    },
    web: {
      boxShadow: `${shadowOffSet.width}px ${shadowOffSet.height}px ${shadowRadius * 2}px rgba(0,0,0,${shadowOpacity})`,
    },
  });

  return (
    <View style={[shadowStyles.boxContainer, shadowStyles.mt]}>
      <Text style={shadowStyles.content} color={colors.gray_CCCCCC}>iOS</Text>
      <View style={[shadowStyles.shadowBody, WEB && shadowStyles.mt]}>
        <View style={[IOS ? shadowStyles.largeItem : shadowStyles.item, { ...styles }]} />
        <View style={[IOS ? shadowStyles.largeItemRadius : shadowStyles.itemRadius, shadowStyles.ml, { ...styles }]} />
        {
          WEB &&
          <View style={[shadowStyles.cbView, shadowStyles.ml]}>
            <CodeBox
              code={`const styles = StyleSheet.create({
  box: {
    shadowColor: ${shadowColor},
    shadowOffset: {
      width: ${shadowOffSet.width},
      height: ${shadowOffSet.height},
    },
    shadowOpacity: ${shadowOpacity},
    shadowRadius: ${shadowRadius},
  },
});`
              }
              width={'100%'}
            />
          </View>
        }
      </View>
      {
        !WEB &&
        <CodeBox code={`const styles = StyleSheet.create({
  box: {
    shadowColor: ${shadowColor},
    shadowOffset: {
      width: ${shadowOffSet.width},
      height: ${shadowOffSet.height},
    },
    shadowOpacity: ${shadowOpacity},
    shadowRadius: ${shadowRadius},
  },
});`
        } />
      }
    </View>
  )
}

export default IOSShadow;