import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { WEB } from '@estuary/rn-core-ui/utils';
import { Text } from '@estuary/rn-core-ui';
import { colors } from '@estuary/rn-core-ui/themes';

import { shadowStyles } from './styles/shadowStyles';
import CodeBox from './CodeBox';

interface WebShadowProps {
  shadowOffSet: {
    width: number
    height: number
  };
  shadowOpacity: number;
  shadowRadius: number;
}

const WebShadow = ({ shadowOffSet, shadowOpacity, shadowRadius }: WebShadowProps) => {
  if (!WEB) {
    return;
  }

  const styles: StyleProp<ViewStyle> = {
    boxShadow: `${shadowOffSet.width}px ${shadowOffSet.height}px ${shadowRadius * 2}px rgba(0,0,0,${shadowOpacity})`,
  };

  return (
    <View style={[shadowStyles.boxContainer, shadowStyles.mt]}>
      <Text style={shadowStyles.content} color={colors.gray_CCCCCC}>Web</Text>
      <View style={[shadowStyles.shadowBody, WEB && shadowStyles.mt]}>
        <View style={[shadowStyles.item, { ...styles }]} />
        <View style={[shadowStyles.itemRadius, shadowStyles.ml, { ...styles }]} />
        {
          WEB &&
          <View style={[shadowStyles.cbView, shadowStyles.ml]}>
              <CodeBox
                code={`const style = {
  boxShadow: '${shadowOffSet.width}px ${shadowOffSet.height}px ${shadowRadius * 2}px rgba(0,0,0,${shadowOpacity})',
};`
            }
                width={'100%'}
            />
          </View>
        }
      </View>
      {
        !WEB &&
        <CodeBox code={`const style = {
  boxShadow: '${shadowOffSet.width}px ${shadowOffSet.height}px ${shadowRadius * 2}px rgba(0,0,0,${shadowOpacity})',
};`
        } />
      }
    </View>
  )
}

export default WebShadow;