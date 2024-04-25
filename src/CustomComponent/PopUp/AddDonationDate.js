import {View, Image, Modal} from 'react-native';
// import Modal from 'react-native-modal';
import React from 'react';
import Theme from '../../Utils/Theme';
import {CustomInput, DatePicker} from '../InputField';
import Entypo from 'react-native-vector-icons/Entypo';

import DropDown from '../DropDown';
import Button from '../Button';
import * as yup from 'yup';
import {Formik} from 'formik';
import {useSelector} from 'react-redux';
import ErrorMessage from '../ErrorMessage';
import {addDonationRequest} from '../../Utils/Api/Donor/addDonationRequest';
import moment from 'moment';
import BloodGroupList from '../../Utils/bloodGroups';
import DropDownBlood from '../DropDownBlood';
import Title from '../Title';

const validationSchema = yup.object().shape({
  blood_group: yup.string(),
  date: yup.date().required('Date is required'),
});

const initialRequiredValues = {
  blood_group: '',
  date: '',
};

const list = [];

const valuesToAdd = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

// Adding new values to the original list
valuesToAdd.forEach(value => {
  list.push({
    label: value,
    value: value,
  });
});

const AddDonationDate = ({isVisible, Close, Done}) => {
  const userData = useSelector(state => state.user);

  const handleSubmit = async values => {
    console.log('Values from form:', values);
    const {token, id} = userData;

    const formattedDateTime = `${values.date} ${'00:00:00'}`;

    const requestData = {
      date: formattedDateTime,
      user_id: id,
    };

    console.log('Request data:', requestData);

    const result = await addDonationRequest(token, requestData);
    Done();
    console.log('Result:', result);
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropOpacity={0.5}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.7)',
        }}>
        <View
          style={{
            flex: 1,
            // backgroundColor:"gray",
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: Theme.hp('65%'),
              width: Theme.wp('90%'),
              backgroundColor: 'white',
              borderRadius: 20,
              alignItems: 'center',
            }}>
            <View
              style={{
                width: Theme.wp('80%'),
                alignItems: 'flex-end',
                height: Theme.hp('6%'),
                justifyContent: 'center',
              }}>
              <Entypo
                name={'cross'}
                size={25}
                color={'black'}
                onPress={Close}
              />
            </View>
            <Image
              style={{
                height: Theme.hp('22%'),
                width: Theme.wp('50%'),
              }}
              source={require('../../Asset/AddDonation.png')}
              resizeMode="contain"
            />

            <Title
              lable={'Add your last donation date'}
              fsize={Theme.txtSmallR3}
              marginVertical={Theme.hp('1%')}
              
              // fweight={'bold'}
              col={'black'}
            />
            <Formik
              initialValues={initialRequiredValues}
              validationSchema={validationSchema}
              onSubmit={values => {
                handleSubmit(values);
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                touched,
                errors,
                setFieldValue,
              }) => (
                <>
                  <View
                    style={{
                      height: Theme.hp('17%'),
                      marginTop: Theme.hp('2%'),

                      // justifyContent: 'space-between',
                    }}>
                    <DropDownBlood
                      // margin={5}
                      marginBottom={Theme.hp('1%')}
                      // onChangeText={handleChange('blood_group')}

                      width={Theme.wp('75%')}
                      list={BloodGroupList}
                      value={values.blood_group}
                      textlabel={'Blood Group'}
                      placeholder={'A+'}
                      source={require('../../Asset/MedicalCondition.png')}
                      // onChangeText={setBloodGroup}
                      onChange={handleChange('blood_group')}
                    />

                    {errors.blood_group && (
                      <ErrorMessage error={errors.blood_group} />
                    )}

                    <DatePicker
                      width
                      maximumDate={new Date()}
                      label={'Last Donation Date'}
                      // placeholder={'22-12-2023'}
                      source={require('../../Asset/AddDonationDate.png')}
                      setDate={date => setFieldValue('date', date)}
                    />
                    {touched.date && errors.date && (
                      <ErrorMessage error={errors.date} />
                    )}
                  </View>
                  <View
                    style={{height: Theme.hp('15%'), justifyContent: 'center'}}>
                    <Button
                      // onPress={Done}
                      onPress={() => {
                        handleSubmit();
                      }}
                      width={Theme.wp('40%')}
                      buttonTitle={'Done'}
                    />
                  </View>
                </>
              )}
            </Formik>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddDonationDate;
