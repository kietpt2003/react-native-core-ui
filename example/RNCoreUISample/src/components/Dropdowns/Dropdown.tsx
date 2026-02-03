import React from 'react'
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native'

import { colors } from '@kietpt2003/react-native-core-ui/themes'

interface Option<T = string> {
  label: string
  value: T
}

interface DropdownProps<T> {
  value?: T
  options: Option<T>[]
  onChange: (value: T) => void
  placeholder?: string
}

export function Dropdown<T>({
  value,
  options,
  onChange,
  placeholder = 'Select...',
}: DropdownProps<T>) {
  const [visible, setVisible] = React.useState(false)

  const selected = options.find(o => o.value === value)

  return (
    <>
      {/* Trigger */}
      <Pressable
        style={styles.trigger}
        onPress={() => setVisible(true)}
      >
        <Text>
          {selected?.label ?? placeholder}
        </Text>
      </Pressable>

      {/* Modal */}
      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setVisible(false)}
        >
          <View style={styles.menu}>
            <FlatList
              data={options}
              keyExtractor={(item) => String(item.value)}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.option}
                  onPress={() => {
                    onChange(item.value)
                    setVisible(false)
                  }}
                >
                  <Text>{item.label}</Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  trigger: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: colors.white,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    width: 240,
    maxHeight: 300,
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingVertical: 4,

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
      },
    }),
  },
  option: {
    padding: 12,
  },
})
