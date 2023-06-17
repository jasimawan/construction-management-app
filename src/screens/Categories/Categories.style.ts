import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    height: '100%',
  },
  emptyViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8
  },
  buttonStyle: {
    marginHorizontal: 8,
    marginBottom: Platform.OS === "ios" ? 32 : 8
  }
});

export default styles;
