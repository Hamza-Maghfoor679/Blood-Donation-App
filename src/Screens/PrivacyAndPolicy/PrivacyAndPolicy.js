import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackButton from '../../CustomComponent/BackButton';
import Theme from '../../Utils/Theme';
import Title from '../../CustomComponent/Title';

const PrivacyAndPolicy = ({navigation}) => {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <BackButton
        navigation={() => navigation.goBack()}
        lable={'Privacy Policy'}
        black
      />
      <View
        style={{
          width: Theme.wp('90%'),
          alignSelf: 'center',
        }}>
        <Title
          lable={'Agree to HelpMe Privacy Policy'}
          fsize={18}
          col={'black'}
          fweight={'bold'}
        />

        <Text style={[styles.text, {marginTop: Theme.hp('2%')}]}>
          Lorem ipsum dolor sit amet consectetur. Nulla blandit in pulvinar
          tempus amet. Orci proin blandit fusce diam imperdiet nullam{' '}
          <Text style={styles.redText}> Learn More</Text>
        </Text>
        <Text style={styles.text}>
          Lorem ipsum dolor I Agree consectetur. Nulla blandit in pulvinar
          tempus amet. Orci proin blandit fusce diam imperdiet nullam iaculis
          pulvinar et. Malesuada luctus nullam interdum risus. Lectus malesuada
          massa pulvinar tincidunt nam interdum pellentesque amet elementum.
        </Text>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet consectetur. Nulla blandit in pulvinar
          tempus amet. <Text style={styles.redText}> Privacy Policy </Text>fusce
          diam imperdiet nullam iaculis pulvinar et. Malesuada luctus nullam
          interdum risus. Lectus malesuada massa pulvinar tincidunt nam interdum
          pellentesque amet elementum.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.redText}> </Text> Privacy Policy dolor sit amet
          consectetur. Nulla blandit in pulvinar tempus amet. Orci proin blandit
          fusce diam imperdiet nullam iaculis pulvinar et. Malesuada luctus
          nullam interdum risus. Lectus malesuada massa pulvinar tincidunt nam
          interdum pellentesque amet elementum.
        </Text>
      </View>
    </View>
  );
};



export default PrivacyAndPolicy;

const styles = StyleSheet.create({
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
