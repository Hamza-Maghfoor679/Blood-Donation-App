import axios from 'axios';
import {API_ENDPOINTS} from '../Api';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData} from '../../../redux/UserSlicee';

export const registerUser = async (UserData, dispatch) => {
  try {
    const img = UserData.profileImage;
    const formData = new FormData();
    if (img) {
      formData.append('image', {
        uri: img?.uri,
        name: img?.name,
        type: img?.type,
      });
    }

    formData.append('name', UserData.name);
    formData.append('phone_no', UserData.phone_no);
    formData.append('blood_group', UserData.blood_group);
    formData.append('location', UserData.location);
    formData.append('latitude', UserData.latitude);
    formData.append('longitude', UserData.longitude);
    formData.append('user_type', UserData.user_type);
    formData.append('id', UserData.id);

    formData.append('age', UserData.age);
    formData.append('blood_group', UserData.blood_group);
    formData.append('disease', UserData.disease);
    formData.append('location', UserData.location);

    formData.append('weight', UserData.weight);
    formData.append('dob', UserData.dob);
    formData.append('height', UserData.height);
    formData.append('allergies_reaction', UserData.allergies_reaction);
    formData.append('medications', UserData.medications);
    formData.append('language', UserData.language);
    formData.append('note', UserData.note);
    formData.append('medical_condition', UserData.medical_condition);

    console.log('forme data:', JSON.stringify(formData, 2, 4));
    // formData.append('image', ...UserData.profileImage);

    // console.log('Form Data:-------------------------------------------------------------');
    // console.log(formData);

    const response = await axios.post(
      API_ENDPOINTS.REGISTER_OR_UPDATE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    console.log('Response:', response.data);
    console.log(
      'Response---------------------------------------',
      JSON.stringify(response.data, 2, 4),
    );

    if (response.data.success) {
      console.log('User registered successfully!');
      dispatch(
        setUserData({...response.data?.data?.userData, profileImage: null}),
      );
      return true;
    } else {
      console.error('Registration failed:', response.data.message);
      console.log('forme data:', JSON.stringify(response, 2, 4));

      return false;
    }
  } catch (error) {
    console.error('Error during registration:', error.message);
    return false;
  }
};
