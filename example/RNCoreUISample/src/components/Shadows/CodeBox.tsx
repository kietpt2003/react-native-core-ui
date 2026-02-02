import React from 'react';
import {
  View,
  Pressable,
  Platform,
  StyleSheet,
  ScrollView,
  DimensionValue,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { Text } from '@estuary/rn-core-ui';
import { WEB } from '@estuary/rn-core-ui/utils';

interface CodeBoxProps {
  code: string;
  width?: DimensionValue;
  height?: number;
  maxHeight?: number;
}

const CodeBox = ({ 
  code,
  width,
  height,
  maxHeight = 260,
 }: CodeBoxProps) => {
  const [copied, setCopied] = React.useState(false);

  const onCopy = async () => {
    if (WEB) {
      await navigator.clipboard.writeText(code);
    } else {
      Clipboard.setString(code);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <View style={[styles.container, { width, height }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Code</Text>

        <Pressable
          onPress={onCopy}
          style={({ pressed }) => [
            styles.copyButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.copyText}>
            {copied ? 'Copied ✓' : 'Copy'}
          </Text>
        </Pressable>
      </View>

      {/* Code */}
      <ScrollView
        style={[styles.codeContainer, { maxHeight }]}
        contentContainerStyle={styles.codeContent}
        showsVerticalScrollIndicator
        horizontal={false}
      >
        <Text selectable style={styles.code}>
          {code}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
    overflow: 'hidden',
  },

  header: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#020617',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },

  title: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },

  copyButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#1E293B',
  },

  pressed: {
    opacity: 0.7,
  },

  copyText: {
    fontSize: 12,
    color: '#E5E7EB',
    fontWeight: '600',
  },

  codeContainer: {
    paddingHorizontal: 12,
  },

  codeContent: {
    paddingVertical: 12,
  },

  code: {
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
      web: 'monospace',
    }),
    fontSize: 12,
    lineHeight: 18,
    color: '#E5E7EB',
  },
});

export default CodeBox;
