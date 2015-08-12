import React from 'react-native';

const {
  StyleSheet,
  View,
  Text
} = React;

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Hello World</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#979797',
    justifyContent: 'center'
  },
  text: {
    alignSelf: 'center',
    fontSize: 24,
    color: 'white'
  }
});
