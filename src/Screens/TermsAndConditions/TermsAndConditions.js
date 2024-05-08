import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
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
          By using the Blood Donation App, you agree to the following Terms &
          Conditions:
        </Text>

        {/* Text without bullets */}
        <TextWithPoint text="You must be at least 18 years old to use this app. By agreeing to these Terms & Conditions, you confirm that you are 18 years old or older." />
        <TextWithPoint text="The information provided in the app should not be considered as medical advice. Always consult a healthcare professional for medical concerns. The app is not liable for any decisions made based on the information provided." />
        <TextWithPoint text="You are responsible for ensuring the accuracy of the information you provide in the app. Any inaccurate or misleading information provided may lead to the suspension or termination of your account." />
        <TextWithPoint text="You agree to use the app in compliance with all applicable laws and regulations. You will not use the app for any unlawful or unauthorized purpose." />
        <TextWithPoint text="You understand and acknowledge that the app may contain links to third-party websites or services that are not owned or controlled by us. We are not responsible for the content, privacy policies, or practices of any third-party websites or services." />

        <Text style={styles.text}>
          Your use of the app constitutes your acceptance of these Terms &
          Conditions. If you do not agree with any part of these Terms &
          Conditions, please do not use the app.
        </Text>
      </View>
    </View>
  );
};

const TextWithPoint = ({text}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.point}>•</Text>
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
  point: {
    color: 'red',
    marginRight: 8, // Adjust this as needed for spacing
    fontSize: 24, // Adjust this as needed for point size
  },
  text: {
    flex: 1, // Take remaining space
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
