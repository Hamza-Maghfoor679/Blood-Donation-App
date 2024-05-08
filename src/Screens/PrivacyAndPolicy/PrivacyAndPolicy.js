import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
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

        <Text style={[styles.redText, {marginTop: Theme.hp('2%')}]}>
          1. Information We Collect
        </Text>
        <Text style={styles.text}>
          For Patients: We collect your name, contact details (email, phone),
          blood type, and medical condition. For Vendors: We collect your name,
          contact details, and organizational information.
        </Text>
        <Text style={[styles.redText, {marginTop: Theme.hp('2%')}]}>
          2. How We Use Your Information
        </Text>
        <Text style={styles.text}>
          Facilitate blood donations by matching donors with patients.
          Communicate with you regarding donations or requests. Improve the
          App's functionality. Mitigate risks or fraud.
        </Text>
        <Text style={[styles.redText, {marginTop: Theme.hp('2%')}]}>
          3. Sharing Your Information
        </Text>
        <Text style={styles.text}>
          We share your information with third-party service providers to
          facilitate blood donations. Additionally, we may disclose information
          to comply with legal obligations or protect our rights.
        </Text>
        <Text style={[styles.redText, {marginTop: Theme.hp('2%')}]}>
          4. Data Retention
        </Text>
        <Text style={styles.text}>
          We retain your data only as long as necessary for the purposes
          outlined, unless required by law.
        </Text>
        <Text style={[styles.redText, {marginTop: Theme.hp('2%')}]}>
          5. Your Rights
        </Text>
        <Text style={styles.text}>
          You have the right to access, correct, or delete your personal
          information. Contact us to exercise these rights.
        </Text>
        <Text style={[styles.redText, {marginTop: Theme.hp('2%')}]}>
          6. Changes to Privacy Policy
        </Text>
        <Text style={styles.text}>
          We may update this policy to reflect changes in practices or legal
          requirements. Check periodically for updates.
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
