import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Theme from '../../Utils/Theme';
import {Image} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const LocationSearch = ({
  _setLocation,
  width,
  placeholder,
  alignSelf,
  setFieldValue,
  handlePlaceSelect,
  onFail,
}) => {
  const [location, setLocation] = useState('');
  return (
    <>
      {/* place search input */}
      <View
        style={{
          height: Theme.hp('8%'),
          width: width,
          alignSelf: alignSelf,
          alignItems: 'center',
          borderRadius: 7,
          borderColor: '#848484',

          borderWidth: 0.3,
          marginBottom: Theme.hp('1%'),
          flexDirection: 'row',
          zIndex: 10,
        }}>
        {/* location icon */}
        <View
          style={{
            width: Theme.wp('15%'),
            // backgroundColor: 'green',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{
              height: Theme.hp('6%'),
              width: Theme.wp('6%'),
            }}
            source={require('../../Asset/Location.png')}
            resizeMode="contain"
          />
        </View>

        {/* separator */}
        <View
          style={{
            height: Theme.hp('5%'),
            width: Theme.wp('0.1%'),
            marginRight: Theme.wp('1.3%'),
            backgroundColor: '#848484',
            alignItems: 'center',
          }}
        />

        {/* input */}
        <View
          style={{
            width: Theme.wp('70%'),
            height: '100%',
            
            justifyContent: location && 'center',
          }}>
          <GooglePlacesAutocomplete
            placeholder={placeholder? placeholder?.length <= 0 ?'type here':placeholder:"type here"}
            fetchDetails={true}
            minLength={3}
            isRowScrollable={false}
            styles={{
              container: {
                
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 30,
              },
              textInputContainer: {
                
                borderTopWidth: 0,
                height: Theme.hp('7.8%'),
                borderBottomWidth: 0,
              },
              textInput: {
                // height: 30, // Adjust the height as needed
                
                height: '100%',
                color: 'black',
                fontSize: 14,
                padding: 0.1,
                // bottom: Theme.hp('0.7L%'),
              },
              predefinedPlacesDescription: {
                color: 'red',
              },
              listView: {
                zIndex: 30,
                padding: 10,
              },
              row: {
                padding: 13,
                height: Theme.hp('6%'),
                flexDirection: 'row',
              },
              separator: {
                height: 0.5,
                backgroundColor: 'gray',
              },
            }}
            query={{
              key: 'AIzaSyCFMaDsqNwLSjRxCj5cF4Pfnm8BVxE8lLo',
              language: 'en',
            }}
            onPress={(data, details = null) => {
              handlePlaceSelect(data, details, setFieldValue);
            }}
            onFail={onFail ?? (error => console.error(error))}
          />
        </View>
      </View>
    </>
  );
};

export default LocationSearch;
