import {Image, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Theme from '../Utils/Theme';
import Title from './Title';

const BackButton = ({
  navigation,
  lable,
  white,
  edit,
  onPress,
  noti,
  refresher,
  notification,
  drawer,
  black,
  drawerOpen,
  ok,
  refff,
}) => {
  return (
    <View
      style={{
        height: Theme.hp('10%'),
        flexDirection: 'row',
        width: Theme.wp('100%'),
      }}>
      <View
        style={{
          width: Theme.wp('20%%'),

          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {!drawer && (
          <Ionicons
          style={{
            padding:Theme.wp("5"),
          }}
            name={'arrow-back-outline'}
            size={28}
            onPress={navigation}
            color={white ? 'white' : Theme.themecol}
          />
        )}
        {drawer && (
          <Ionicons
            style={{
              padding:Theme.wp("5"),
            }}
            name="menu-sharp"
            size={28}
            onPress={drawerOpen}
            color={ok ? 'white' : 'black'}
          />
        )}
      </View>
      <View
        style={{
          width: Theme.wp('60%'),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Title
          lable={lable}
          fsize={18}
          fweight={'bold'}
          col={black ? 'black' : 'white'}
        />
      </View>
      <View
        style={{
          width: Theme.wp('20%'),
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: refff && 'row',
          gap: Theme.wp('2%'),
        }}>
        {edit && (
          <Feather name="edit" size={25} onPress={onPress} color={'white'} />
        )}

        {noti && (
          <>
            {refff && (
              <TouchableOpacity onPress={refresher}>
                <Image
                  style={{height: Theme.hp('3%'), width: Theme.wp('6%')}}
                  resizeMode="contain"
                  source={require('../Asset/Refresh.png')}
                />
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={notification}>
              <Image
                style={{height: Theme.hp('4%'), width: Theme.wp('8%')}}
                resizeMode="contain"
                source={require('../Asset/Notification.png')}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default BackButton;
