import {StyleSheet} from 'react-native';
import Theme from '../Utils/Theme';

export const styles = StyleSheet.create({
  View: {alignItems: 'center', justifyContent: 'center'},
  View2: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0b4383',
    width: Platform.OS == 'ios' ? 50 : 60,
    height: Platform.OS == 'ios' ? 50 : 60,
    top: Platform.OS == 'ios' ? -10 : -20,
    borderRadius: Platform.OS == 'ios' ? 25 : 30,
    top: 1,
  },
  Image: {height: Theme.hp(18), width: Theme.wp(18)},
});
