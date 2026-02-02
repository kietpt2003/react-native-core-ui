import React from 'react'
import { View } from 'react-native'
import { ANDROID, IOS, WEB } from '@estuary/rn-core-ui/utils';
import { Text } from '@estuary/rn-core-ui';

import { shadowStyles } from './styles/shadowStyles';
import { androidColor, androidDepth } from '../../utils';
import { colors } from '@estuary/rn-core-ui/themes';
import CodeBox from './CodeBox';

interface AndroidShadowProps {
  elevation: number;
}

const AndroidShadow = ({ elevation }: AndroidShadowProps) => {
  if (IOS) {
    return;
  }

  const androidShadowStyles = {
    boxShadow: `
        ${androidDepth.umbra[elevation]} ${androidColor.umbra},
        ${androidDepth.penumbra[elevation]} ${androidColor.penumbra},
        ${androidDepth.ambient[elevation]} ${androidColor.ambient}
      `
  }

  return (
    <View style={shadowStyles.boxContainer}>
      <Text style={shadowStyles.content} color={colors.gray_CCCCCC}>Android</Text>
      <View style={[shadowStyles.shadowBody, WEB && shadowStyles.mt, ANDROID && shadowStyles.mb]}>
        <View style={[ANDROID ? shadowStyles.largeItem : shadowStyles.item, WEB ? { ...androidShadowStyles } : { elevation }]} />
        <View style={[ANDROID ? shadowStyles.largeItemRadius : shadowStyles.itemRadius, shadowStyles.ml, WEB ? { ...androidShadowStyles } : { elevation }]} />
        {
          WEB &&
          <View style={[shadowStyles.cbView, shadowStyles.ml]}>
              <CodeBox
                code={`const styles = StyleSheet.create({
  box: {
    elevation: ${elevation}
  },
});`}
                width={'100%'}
/>
          </View>
        }
      </View>
      {
        !WEB &&
        <CodeBox code={`const styles = StyleSheet.create({
  box: {
    elevation: ${elevation}
  },
});`} />
      }
    </View>
  )
}

export default AndroidShadow;