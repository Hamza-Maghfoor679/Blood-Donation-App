import {Text, TouchableOpacity, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Theme from '../Utils/Theme';

const Button = ({
  buttonTitle,
  width,
  bw,
  bcol,
  source,
  onPress,
  ifimage,
  opacity,
  padding,
  icon,
  fontF,
  textcolor,
  backgroundColor
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor:backgroundColor?? Theme.themecol,
        flexDirection: 'row',
        width: width,
        opacity: opacity,
        padding: padding,

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        borderWidth: bw,
        borderColor: bcol,
        alignSelf: 'center',

        height: Theme.hp('5.5%'),
        gap: Theme.wp('2%'),
      }}>
      {ifimage ? (
        <Image
          style={{height: Theme.hp('6%'), width: Theme.wp('6%')}}
          source={source}
          resizeMode="contain"
        />
      ) : icon ? (
        <AntDesign name={'caretright'} size={Theme.hp('2%')} color="white" />
      ) : null}
      <Text
        style={{
          fontSize: 16,
          letterSpacing: 0.5,
          color: textcolor??'white',
          fontWeight: '500',
          fontFamily: fontF,
        }}>
        {buttonTitle}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
