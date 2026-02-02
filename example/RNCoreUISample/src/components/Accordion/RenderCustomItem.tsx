import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Card, CardContent, CardMedia, SvgIcon, Text } from '@estuary/rn-core-ui';
import { colors } from '@estuary/rn-core-ui/themes';

const RenderCustomItem = ({ title, url, mode, disabled } : { title: string, url?: string, mode?: boolean, disabled?: boolean }) => {
  const [status, setStatus] = React.useState(false);

  if (mode) {
    return (
      <View style={[styles.container, styles.row, disabled && styles.disabled]}>
        <Text style={styles.text}>{title}</Text>
        <TouchableOpacity disabled={disabled} style={styles.btn} onPress={() => setStatus(!status)}>
          <SvgIcon name={status ? 'check-box' : 'check-box-outline-blank'} size={20} color={status ? colors.green_279C2E : colors.black} />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Card raised>
          <CardMedia
            source={{
              uri: url
            }}
            style={styles.img}
          />
          <CardContent>
            <Text
              bold
              color={colors.purple_9370DB}
              style={styles.text}
            >
              {title}
            </Text>
          </CardContent>
      </Card>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontSize: 14,
    flex: 1,
  },
  img: {
    aspectRatio: 16 / 9,
  },
  btn: {
    marginLeft: 10
  },
  disabled: {
    opacity: 0.5
  }
});

export default RenderCustomItem;
