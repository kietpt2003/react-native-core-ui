import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return (
    <GestureHandlerRootView style={styles.flex1}>
      <SafeAreaProvider>
        <View style={styles.flex1}>
          <Text>Just a temp view</Text>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
