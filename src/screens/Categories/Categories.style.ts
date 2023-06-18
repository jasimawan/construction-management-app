import {Platform, StyleSheet} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const isTablet = DeviceInfo.isTablet();
const isiPad = DeviceInfo.getModel() === 'iPad';

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    height: '100%',
  },
  listItemStyle: {
    width: (isTablet || isiPad) ? '50%' : '100%',
  },
  buttonStyle: {
    marginHorizontal: 8,
    marginBottom: Platform.OS === "ios" ? 32 : 8
  }
});

export default styles;
