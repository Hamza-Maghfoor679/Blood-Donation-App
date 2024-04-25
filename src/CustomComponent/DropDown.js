import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import Theme from '../Utils/Theme';
import Title from './Title';
const DropDown = ({
  textlabel,
  bgCol,
  borderRadius,
  source,
  left,
  textCol,
  bw,
  height,
  width,
  placeholder,
  marginBottom,
  zIndex,
  position,
  borderColor,
  onChange,
  list
}) => {
  const [value, setValue] = useState('');
  const genderList = [
    {
      label: 'Yellow Fever',
      value: 'Yellow Fever',
    },
    {
      label: 'Hepatitis A',
      value: 'Hepatitis A',
    },
    {
      label: 'Cholera',
      value: 'Cholera',
    },
    {
      label: 'Malaria',
      value: 'Malaria',
    },
  ];

  const languageList = [
    {
      label: 'Urdu',
      value: 'Urdu',
    },
    {
      label: 'French',
      value: 'French',
    },
    {
      label: 'German',
      value: 'German',
    },
    {
      label: 'Italian',
      value: 'Italian',
    },
  ];


  

  return (
    <View
      style={{
        height: Theme.hp('7%'),
        width: Theme.wp('90%'),
        marginBottom:marginBottom,

        alignSelf: 'center',
        backgroundColor: '#FCFCFC',
        borderRadius: 7,
        borderColor: '#848484',
        borderWidth: 0.3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {/* icon */}
      <View
        style={{
          width: Theme.wp('15%'),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            height: Theme.hp('6%'),
            width: Theme.wp('6%'),
          }}
          source={source}
          resizeMode="contain"
        />
      </View>
      {/* separator */}
      <View
        style={{
          height: Theme.hp('5'),
          width: Theme.wp('0.1%'),
          marginRight: Theme.wp('-2%'),
          backgroundColor: '#848484',
          alignSelf: 'center',
        }}
      />
      {/* Blood Group input  */}
      <View
        style={{
          width: Theme.wp('75%'),
          alignSelf: 'center',
          // backgroundColor:"green",
        }}>
        <Title
          lable={textlabel}
          left={Theme.wp('5%')}
          col={'black'}
          fsize={14}
        />
        <Dropdown
          style={{
            ...styles.dropdown,
            backgroundColor: bgCol,
            borderWidth: bw,
            borderColor: borderColor,
            height: height,
            height: Theme.hp('3%'),
            width: Theme.wp('65%'),

            borderRadius: borderRadius,
            left: Theme.wp('5%'),

            zIndex: zIndex, 
            position: position,
          }}
          placeholderStyle={{
            ...styles.placeholderStyle,

            color: '#8D8D8D',
          }}
          selectedTextStyle={[styles.selectedTextStyle, {fontSize: 12}]}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={{width: 25, height: 25}}
          itemTextStyle={{fontSize: 12, color: 'black'}}
          data={list?list:genderList}
         
          iconColor={'black'}
          maxHeight={150}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          value={value}
          searchPlaceholder="Search..."
          // onChange={onChange}
          
          onChange={item => {
            setValue(item.value);
            if (onChange) {
              onChange(item.value);
            }
          }}
        />
      </View>
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    backgroundColor: 'white',
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  textItem: {
    flex: 1,
    fontSize: 14,
  },

  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    color: 'black',
  },
  iconStyle: {
    width: 15,
    height: 15,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
});
