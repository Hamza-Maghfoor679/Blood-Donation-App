import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackButton from '../../CustomComponent/BackButton';
import Theme from '../../Utils/Theme';
import Title from '../../CustomComponent/Title';

const TermsAndConditions = ({navigation}) => {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <BackButton
        navigation={() => navigation.goBack()}
        lable={'Term & Conditions'}
        black
      />
      <View
        style={{
          width: Theme.wp('90%'),
          alignSelf: 'center',
        }}>
        <Title
          lable={'Agree to HelpMe Terms & Conditions'}
          fsize={18}
          col={'black'}
          fweight={'bold'}
        />
        <Text style={[styles.text, {marginTop: Theme.hp('2%')}]}>
          Lorem ipsum dolor sit amet consectetur. Nulla blandit in pulvinar
          tempus amet. Orci proin blandit fusce diam imperdiet nullam iaculis
          pulvinar et. Malesuada luctus nullam interdum risus. Lectus malesuada
          massa pulvinar tincidunt nam interdum pellentesque amet elementum.
        </Text>

        {/* text with red bullet point  */}
        <TextWithBullet text="Lorem ipsum dolor sit amet consectetur. Nulla blandit in pulvinar tempus amet. Orci proin blandit fusce diam imperdiet nullam iaculis pulvinar et." />
        <TextWithBullet text="Lorem ipsum dolor sit amet consectetur. Nulla blandit in pulvinar tempus amet. Orci proin blandit fusce diam imperdiet nullam iaculis pulvinar et." />
        <TextWithBullet text="Lorem ipsum dolor sit amet consectetur. Nulla blandit in pulvinar tempus amet. Orci proin blandit fusce diam imperdiet nullam iaculis pulvinar et." />

        <Text style={styles.text}>
          Lorem ipsum dolor sit amet consectetur. Nulla blandit in pulvinar
          tempus amet. Orci proin blandit fusce diam imperdiet nullam iaculis
          pulvinar et. Malesuada luctus nullam interdum risus. Lectus malesuada
          massa pulvinar tincidunt nam interdum pellentesque amet elementum.
        </Text>
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

export default TermsAndConditions;

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
