import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import Theme from '../Utils/Theme';
import Title from './Title';
const DropDownBlood = ({
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
  marginTop,
  zIndex,
  position,
  borderColor,
  onChange,
  margin,
  list,
}) => {
  const [value, setValue] = useState('');
  const genderList = [
    {
      label: 'User',
      value: 'user',
    },
    {
      label: 'Vendor',
      value: 'vendor',
    },
  ];

  return (
    <View
      style={{
        margin: margin,
        marginBottom:marginBottom,
        marginTop:marginTop,
        height: Theme.hp('7%'),
        // Theme.wp('90%')
        width:width?? '85%',

        alignSelf: 'center',
        backgroundColor: '#FCFCFC',
        borderRadius: 7,
        borderColor: '#848484',
        borderWidth: 0.3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: Theme.wp('11%'),
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
      <View
        style={{
          height: Theme.hp('5'),
          width: Theme.wp('0.1%'),
          backgroundColor: '#848484',
          alignSelf: 'center',
        }}
      />
      <View
        style={{
          width: '75%',
          alignSelf: 'center',
        }}>
        <Title
          lable={textlabel}
          left={Theme.wp('5%')}
          col={Theme.txtblack}
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
            width: '90%',

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
          data={list ? list : genderList}
          // renderRightIcon={()=>{}}
          // renderLeftIcon={()=>{if(leftIcon)return(<BlueLoc/>)}}
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

export default DropDownBlood;

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
