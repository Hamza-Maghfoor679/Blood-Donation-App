import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Input, Text} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Theme from '../Utils/Theme';
import Title from './Title';
import Button from './Button';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import {ImageBackground} from 'react-native';
import {green} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import {logoutUser} from '../redux/UserSlicee';
import {logObject} from '../Utils/logObject';

const InputField = ({
  label,
  onChangeText,
  contentType,
  value,
  placeholder,
  width,
  height,
  numberOfLines,
  top,
  placeholderTextColor,
  alignSelf,
  right,
  keyboardType,
  borderColor,
  borderStyle,

  paddingRight,
  showIcon,
  isPassword,
  multiline,
  textAlignVertical,
  bottom,
  borderRadius,
  borderWidth,
  paddingLeft,
  paddingVertical,
  paddingHorizontal,
  onPressIn,
  borderBottomColor,
  bottomWidth,
  paddingBottom,
  lablecol,
  IconCol,
  showIcon1,
  IconCol1,
  inputCol,
  ifcheck,
  paddingTop,
  onTextInput,
  nob,
  onBlur,
  ifseach,
  backgroundColor,
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View
      style={{
        top: top,
        alignSelf: alignSelf,
        right: right,
        alignSelf: 'center',
      }}>
      <Input
        onTextInput={onTextInput}
        onBlur={onBlur}
        value={value}
        onPressIn={onPressIn}
        onChangeText={onChangeText}
        label={label}
        multiline={multiline}
        textContentType={contentType}
        placeholderTextColor={'#8D8D8D'}
        secureTextEntry={secureTextEntry}
        placeholder={'type here'}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        textAlignVertical={textAlignVertical}
        labelStyle={{
          fontSize: 14,
          fontWeight: '400',
          color: 'black',
          top: Theme.hp('0.8%'),
          // fontFamily: "Montserrat-Regular",
        }}
        inputStyle={{
          color: inputCol || 'black',
          fontSize: 14,
          padding: 0.1,

          bottom: Theme.hp('0.7%'),
        }}
        containerStyle={{
          width: '100%',
          alignSelf: 'center',
        }}
        inputContainerStyle={{
          height: height,
          width: width,
          borderRadius: borderRadius,
          borderWidth: borderWidth,
          borderColor: borderColor,
          borderBottomWidth: bottomWidth,
          borderStyle: borderStyle,
          paddingLeft: paddingLeft,
          paddingBottom: paddingBottom,
          paddingRight: paddingRight,
          paddingHorizontal: paddingHorizontal,
          paddingTop: paddingTop,
          bottom: bottom,
          borderBottomColor: borderBottomColor,
          top: top,
          backgroundColor: backgroundColor ? '#FCFCFC' : null,
        }}
        rightIcon={
          showIcon ? (
            <Entypo
              name={secureTextEntry ? 'eye-with-line' : 'eye'}
              size={Theme.iconSizeR}
              color={IconCol}
              onPress={toggleSecureTextEntry}
            />
          ) : showIcon1 ? (
            <AntDesign
              name={'exclamationcircle'}
              size={Theme.iconSizeSm}
              color={IconCol1}
              onPress={toggleSecureTextEntry}
            />
          ) : ifcheck ? (
            <Entypo name="check" size={Theme.iconSizeR} color="#38AA36" />
          ) : ifseach ? (
            <AntDesign
              name={'search1'}
              size={Theme.iconSizeR}
              style={{left: Theme.wp('2%')}}
              color="grey"
              // onPress={toggleSecureTextEntry}
            />
          ) : null
        }
      />
    </View>
  );
};

export default InputField;

export const CustomInput = ({
  label,
  isSearch,
  placeholder,
  source,
  keyboardType,
  value,
  location,
  OnSearch,
  width,
  touched,
  onChangeText,
  children,
  marginBottom,
  marginTop,
  style,
  onBlur,
  error = '',
  onTextInput,
}) => {
  // console.log('error', error, 'touched', touched, 'label', label, 'value', value)
  return (
    <View
      style={{
        marginTop: marginTop ?? 0,
        marginBottom: marginBottom ?? 0,
      }}>
      <View
        style={[
          {
            height: Theme.hp('8%'),
            width: width ? Theme.wp('75%') : Theme.wp('90%'),
            alignSelf: 'center',
            backgroundColor: '#FCFCFC',
            borderRadius: 7,
            borderColor: '#848484',
            borderWidth: width ? 0.5 : 0.3,
            overflow: 'hidden',
            flexDirection: 'row',
          },
          style,
        ]}>
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
        {/* separator |*/}
        <View
          style={{
            height: Theme.hp('5%'),
            width: Theme.wp('0.1%'),
            marginRight: Theme.wp('2%'),
            backgroundColor: '#848484',

            alignSelf: 'center',
          }}
        />
        {/* input field */}
        <View
          style={{
            width: width ? Theme.wp('50%') : Theme.wp('60%'),
            height: location && Theme.hp('13%'),
            justifyContent: location && 'center',
          }}>
          <InputField
            onBlur={onBlur}
            onChangeText={onChangeText}
            value={value}
            label={label}
            height={Theme.hp('5.6%')}
            placeholder={placeholder}
            width={width ? Theme.wp('50%') : Theme.wp('58%')}
            keyboardType={keyboardType}
            onTextInput={onTextInput}
          />
        </View>
        {isSearch && (
          <TouchableOpacity
            style={{
              width: Theme.wp('15%'),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={OnSearch}>
            <Feather
              // style={{
              //   height: Theme.hp('6%'),
              //   width: Theme.wp('6%'),
              // }}
              name="search"
              size={18}
              color={'#848484'}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && touched ? (
        <View
          style={{
            marginLeft: Theme.wp('2%'),
            marginTop: Theme.hp('1%'),
            marginBottom: Theme.hp('2%'),
          }}>
          <Text style={{color: 'red'}}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
};

export const ProfileView = ({source, label, placeholder}) => {
  return (
    <View
      style={{
        height: Theme.hp('7%'),
        width: Theme.wp('90%'),
        alignSelf: 'center',

        borderRadius: 7,
        backgroundColor: '#F7F7F7',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={{
          // width: Theme.wp('50%'),
          // backgroundColor:"red",
          alignItems: 'center',
          gap: Theme.wp('3%'),
          flexDirection: 'row',
        }}>
        {source && (
          <Image
            style={{
              height: Theme.hp('6%'),
              width: Theme.wp('6%'),
            }}
            source={source}
            resizeMode="contain"
          />
        )}
        <Title lable={label} col={'#8D8D8D'} fsize={16} />
      </View>

      <View
        style={{
          marginLeft: 5,
          maxWidth: Theme.wp('39%'),
          // backgroundColor:"red",
        }}>
        <ScrollView
          contentContainerStyle={{
            // width: '70%',
            alignItems: 'center',
            // backgroundColor: 'green',
          }}
          horizontal={true}>
          <Title lable={placeholder} col={'black'} fsize={16} />
        </ScrollView>
      </View>
    </View>
  );
};

export const DonorHistory = ({buttonTitle, source, onPress}) => {
  return (
    <View
      style={{
        height: Theme.hp('10%'),
        width: Theme.wp('90%'),
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        gap: Theme.hp('1.5%'),
      }}>
      <Button
        onPress={onPress}
        width={Theme.wp('80%')}
        buttonTitle={buttonTitle}
        ifimage
        source={source}
      />
    </View>
  );
};
export const DonorDonationHistory = ({donor}) => {
  const calculateDuration = donationDate => {
    let lastDonationDate = moment(donationDate);
    let currentDate = moment();
    console.log('lastDonationDate', lastDonationDate);

    // Calculate the difference in days
    let durationInDays = currentDate.diff(lastDonationDate, 'days');

    // Calculate the remaining hours after subtracting the complete days
    let remainingHours = currentDate.diff(lastDonationDate, 'hours') % 24;

    // Calculate the number of months based on calendar months
    let months = currentDate.diff(lastDonationDate, 'months');

    // Adjust the days and months based on the remaining hours
    let days = durationInDays - months * 30; // Assuming 30 days in a month
    if (days < 0) {
      months--; // Adjust the month count down
      days += 30; // Add the days back
    }

    // Ensure that days and months are non-negative
    days = Math.max(0, days);
    months = Math.max(0, months);

    const formattedLastDonationDate = lastDonationDate.format('DD MMM YYYY');

    return {
      months: months,
      days: days,
      hours: remainingHours,
      formattedLastDonationDate: formattedLastDonationDate,
    };
  };

  const {months, days, hours, formattedLastDonationDate} = calculateDuration(
    new Date(donor.created_at),
  );
  console.log(
    'months',
    months,
    'days',
    days,
    'hours',
    hours,
    'formattedLastDonationDate',
    formattedLastDonationDate,
  );

  const splitDigits = (number, index) => {
    const digits = number.toString();
    let first = 0;
    let second = 0;

    console.log('length', digits.length);
    if (digits.length === 1) {
      first = 0;
      second = digits[0];
    } else {
      first = digits[0];
      second = digits[1];
    }

    return index === 0 ? first : second;
  };

  return (
    <View
      style={{
        height: Theme.hp('23%'),
        width: Theme.wp('90%'),
        alignSelf: 'center',
        backgroundColor: Theme.themecol,
        borderRadius: 10,
        padding: 15,
      }}>
      <View style={{width: Theme.wp('60%')}}>
        <Title
          lable={'Your Blood Donation History'}
          fsize={14}
          col={'white'}
          fweight={'bold'}
        />

        <View
          style={{
            flexDirection: 'row',
            width: Theme.wp('80%'),
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{
                height: Theme.hp('7%'),
                width: Theme.wp('14%'),
                borderRadius: 100,
              }}
              source={
                donor?.image
                  ? {uri: donor?.image}
                  : require('../Asset/TimerImage.png')
              }
              resizeMode="cover"
            />
            <View style={{left: Theme.wp('2%')}}>
              <Title
                lable={donor.name}
                col={'white'}
                fweight={'500'}
                fsize={14}
              />
              <Title
                lable={formattedLastDonationDate}
                col={'white'}
                fweight={'400'}
                fsize={12}
              />
            </View>
          </View>
          <Image
            style={{
              height: Theme.hp('10%'),
              width: Theme.wp('20%'),
              // left: Theme.wp('30%'),
              // top: Theme.hp('2%'),
            }}
            source={require('../Asset/TimerCover.png')}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            height: Theme.hp('6%'),
            width: Theme.wp('60%'),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                width: Theme.wp('18%'),
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  height: Theme.hp('4%'),
                  width: Theme.wp('8%'),
                  backgroundColor: '#B5313F',
                  borderRadius: 7,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Title
                  lable={splitDigits(months, 0)}
                  fsize={18}
                  col={'white'}
                  fweight={'bold'}
                />
              </View>
              <View
                style={{
                  height: Theme.hp('4%'),
                  width: Theme.wp('8%'),
                  backgroundColor: '#B5313F',
                  borderRadius: 7,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Title
                  lable={splitDigits(months, 1)}
                  fsize={18}
                  col={'white'}
                  fweight={'bold'}
                />
              </View>
            </View>
            <Title lable={'Months'} fsize={14} col={'white'} fweight={'500'} />
          </View>
          <View
            style={{
              alignItems: 'center',
              width: Theme.wp('3%'),
              justifyContent: 'flex-start',
              height: Theme.hp('7%'),
              // backgroundColor: 'white',
            }}>
            <Title lable={':'} fsize={18} col={'white'} fweight={'bold'} />
          </View>

          <View style={{alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                width: Theme.wp('18%'),
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  height: Theme.hp('4%'),
                  width: Theme.wp('8%'),
                  backgroundColor: '#B5313F',
                  borderRadius: 7,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Title
                  lable={splitDigits(days, 0)}
                  fsize={18}
                  col={'white'}
                  fweight={'bold'}
                />
              </View>
              <View
                style={{
                  height: Theme.hp('4%'),
                  width: Theme.wp('8%'),
                  backgroundColor: '#B5313F',
                  borderRadius: 7,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Title
                  lable={splitDigits(days, 1)}
                  fsize={18}
                  col={'white'}
                  fweight={'bold'}
                />
              </View>
            </View>
            <Title lable={'Days'} fsize={14} col={'white'} fweight={'500'} />
          </View>
          <View
            style={{
              alignItems: 'center',
              width: Theme.wp('3%'),
              justifyContent: 'flex-start',
              height: Theme.hp('7%'),
              // backgroundColor: 'white',
            }}>
            <Title lable={':'} fsize={18} col={'white'} fweight={'bold'} />
          </View>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                width: Theme.wp('18%'),
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  height: Theme.hp('4%'),
                  width: Theme.wp('8%'),
                  backgroundColor: '#B5313F',
                  borderRadius: 7,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Title
                  lable={splitDigits(hours, 0)}
                  fsize={18}
                  col={'white'}
                  fweight={'bold'}
                />
              </View>
              <View
                style={{
                  height: Theme.hp('4%'),
                  width: Theme.wp('8%'),
                  backgroundColor: '#B5313F',
                  borderRadius: 7,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Title
                  lable={splitDigits(hours, 1)}
                  fsize={18}
                  col={'white'}
                  fweight={'bold'}
                />
              </View>
            </View>
            <Title lable={'Hours'} fsize={14} col={'white'} fweight={'500'} />
          </View>
        </View>
      </View>
    </View>
  );
};

export const DatePicker = ({
  label,
  placeholder,
  maximumDate,
  source,
  width,
  setDate,
  value,
  marginBottom,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value);
  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date !== undefined) {
      1;
      const formattedDate = moment(date).format('DD-MM-YYYY');
      setDate(formattedDate);
      setSelectedDate(formattedDate);
    }
  };
  return (
    <TouchableOpacity
      onPress={() => setShowDatePicker(true)}
      style={{
        marginBottom: marginBottom,
        height: Theme.hp('7%'),
        width: width ? Theme.wp('75%') : Theme.wp('90%'),
        alignSelf: 'center',
        backgroundColor: '#FCFCFC',
        borderRadius: 7,
        borderColor: '#848484',
        borderWidth: width ? 0.5 : 0.3,
        overflow: 'hidden',
        flexDirection: 'row',
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
      {/* separator  */}
      <View
        style={{
          height: Theme.hp('5'),
          width: Theme.wp('0.1%'),
          marginRight: Theme.wp('-2%'),
          backgroundColor: '#848484',
          alignSelf: 'center',
        }}
      />
      <View
        style={{
          width: Theme.wp('85%'),

          justifyContent: 'center',

          left: Theme.wp('5%'),
        }}>
        <Title lable={label} col={'black'} />

        {selectedDate && <Title lable={selectedDate} col={'black'} />}
        {!selectedDate && <Title lable={'Select Date'} col={'#8D8D8D'} />}
      </View>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          maximumDate={maximumDate}
          placeholderText="Select date"
          value={new Date()}
          mode="date"
          onChange={handleDateChange}
        />
      )}
    </TouchableOpacity>
  );
};

export const BloodDonationHistory = ({user}) => {
  logObject('user', user);
  const IconWithLable = ({source, lable, style, iconStyle, fontSize}) => {
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor:"green",
            gap: Theme.wp('2%'),
          },
          style,
        ]}>
        <Image
          style={[{height: Theme.hp('2%'), width: Theme.wp('4%')}, iconStyle]}
          source={source ?? require('../Asset/locationTransperent.png')}
          resizeMode="cover"
        />
        <Title
          lable={lable ?? 'lable'}
          fsize={fontSize ?? 14}
          fweight={'500'}
          col={'white'}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        // height: Theme.hp('25%'),
        width: Theme.wp('90%'),
        alignSelf: 'center',
        backgroundColor: Theme.themecol,
        borderRadius: 10,
        padding: 15,
      }}>
      <View style={{}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Title
            lable={'Hello, i need Blood'}
            col={'white'}
            fweight={'bold'}
            fsize={14}
          />
          {/* 
          <IconWithLable
            style={{alignItems: 'flex-start'}}
            fontSize={17}
            iconStyle={{height: Theme.hp('4%'), width: Theme.wp('8%')}}
            source={require('../Asset/views.png')}
            lable={user?.total_count??'32'}
          /> */}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              maxWidth: '60%',
              alignItems: 'center',
            }}>
            <Image
              style={{
                height: Theme.hp('7%'),
                width: Theme.wp('14%'),
                borderRadius: 100,
              }}
              source={
                user?.image
                  ? {uri: user?.image}
                  : require('../Asset/TimerImage.png')
              }
              resizeMode="cover"
            />
            <View style={{left: Theme.wp('2%')}}>
              <Title
                lable={user?.name ?? 'name'}
                col={'white'}
                fweight={'500'}
                fsize={14}
              />
              <IconWithLable
                style={{maxWidth: '90%'}}
                source={require('../Asset/locationTransperent.png')}
                lable={
                  user?.location
                  // (user?.location?.length ?? 0) > 19
                  //   ? `${user?.location?.slice(0, 17)}. ..`
                  //   : user?.location ?? 'location'
                }
              />
              <IconWithLable
                style={{}}
                source={require('../Asset/phoneTransperent.png')}
                lable={user?.phone_no ?? 'phone'}
              />
            </View>
          </View>
          <Image
            style={{
              height: Theme.hp('10%'),
              width: Theme.wp('20%'),
              // left: Theme.wp('7%'),
              // top: Theme.hp('2%'),
            }}
            source={require('../Asset/DonorHistory.png')}
            resizeMode="cover"
          />
        </View>

        <View
          style={{
            height: Theme.hp('6%'),
            width: Theme.wp('60%'),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                height: Theme.hp('4%'),
                backgroundColor: '#B5313F',
                borderRadius: 7,
                paddingHorizontal: Theme.wp('3%'),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Title
                lable={user?.no_of_blood ?? '02'}
                fsize={18}
                col={'white'}
                fweight={'bold'}
              />
            </View>
            <Title lable={'Bottles'} fsize={14} col={'white'} fweight={'500'} />
          </View>

          <View
            style={{
              alignItems: 'center',
              width: Theme.wp('3%'),
              justifyContent: 'flex-start',
              height: Theme.hp('7%'),
              // backgroundColor: 'white',
            }}>
            <Title lable={':'} fsize={18} col={'white'} fweight={'bold'} />
          </View>

          <View style={{alignItems: 'center'}}>
            <View
              style={{
                height: Theme.hp('4%'),
                paddingHorizontal: Theme.wp('3%'),

                backgroundColor: '#B5313F',
                borderRadius: 7,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Title
                lable={user?.blood_group ?? 'A+'}
                fsize={18}
                col={'white'}
                fweight={'bold'}
              />
            </View>
            <Title lable={'Group'} fsize={14} col={'white'} fweight={'500'} />
          </View>
        </View>
      </View>
    </View>
  );
};
