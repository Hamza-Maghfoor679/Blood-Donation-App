import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackButton from '../../CustomComponent/BackButton';
import Theme from '../../Utils/Theme';
import Title from '../../CustomComponent/Title';
import {Image} from 'react-native-elements';
import {CustomInput} from '../../CustomComponent/InputField';
import Button from '../../CustomComponent/Button';

const ContactUs = ({navigation}) => {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <BackButton
        navigation={() => navigation.goBack()}
        lable={'Contact Us'}
        black
      />
      <View
        style={{
          width: Theme.wp('90%'),
          alignSelf: 'center',
        }}>
        <View
          style={{
            height: Theme.hp('35%'),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{
              height: Theme.hp('35%'),
              width: Theme.wp('60%'),
            }}
            source={require('../../Asset/ContactUsBanar.png')}
            resizeMode="contain"
          />
        </View>

        <CustomInput
          // onChangeText={handleChange('name')}
          // onBlur={handleBlur('name')}
          // value={values.name}
          label={'Name'}
          // error={errors.name}
          placeholder={'Muhammad Ali'}
          source={require('../../Asset/Person.png')}
        />
        <CustomInput
          // onChangeText={handleChange('name')}
          // onBlur={handleBlur('name')}
          // value={values.name}
          style={{marginTop: Theme.hp('2%'),marginBottom: Theme.hp('2%')}}
          label={'Phone'}
          // error={errors.name}
          placeholder={'Muhammad Ali'}
          source={require('../../Asset/phoneTransperent2.png')}
        />

        <Title lable={'Note'} fsize={18} col={'black'} fweight={'bold'} />

        <Text style={styles.text}>
          Lorem ipsum dolor sit amet consectetur. Nulla blandit in pulvinar
          tempus amet. Orci proin blandit fusce diam imperdiet nullam iaculis
          pulvinar et. Malesuada luctus nullam interdum risus. Lectus malesuada
          massa pulvinar tincidunt nam interdum pellentesque amet elementum.
        </Text>

        <View style={{marginTop: Theme.hp('2%')}}>
          <Button buttonTitle={'Contact'} width={Theme.wp('90%')}></Button>
        </View>
      </View>
    </View>
  );
};

const TextWithBullet = ({text}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8, // Adjust this as needed for spacing
  },
  bullet: {
    color: 'red',
    marginRight: 8, // Adjust this as needed for spacing
    fontSize: 30, // Adjust this as needed for bullet size
  },
  text: {
    fontSize: Theme.txtSmallR1,
    color: '#8D8D8D',
    marginVertical: 5,
  },
  redText: {
    fontSize: Theme.txtSmallR1,
    color: Theme.themecol,
    marginVertical: 5,
  },
});
