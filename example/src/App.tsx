import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TTSButton } from 'react-native-ttsbutton';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  const [label, setLabel] = useState('');
  return (
    <View style={styles.container}>
      <TTSButton
        text="Hello world!"
        onPress={() => setLabel('Welcome to hello world!')}
        type="primary"
        size="default"
        loaderPosition="end"
        disable
        startIcon={<Icon name="download" size={15} color="#fff" />}
        shape="default"
      />
      <Text style={styles.label}>
        {label}
        {label ? <Text>😊</Text> : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginVertical: 20,
  },
});
