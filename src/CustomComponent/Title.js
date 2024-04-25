import {StyleSheet, Text} from 'react-native';
import React from 'react';

const Title = ({
  fsize,
  fweight,
  col,
  key,
  lable,
  width,
  numberOfLines,
  left,
  top,
  right,
  bottom,
  textAlign,
  marginVertical,
  paddingLeft,
  paddingTop,
  fontFamily,
  transform,
}) => {
  return (
    <Text
      key={key}
      numberOfLines={numberOfLines??1}
      style={{
        // width:width??'100%',
        fontSize: fsize,
        fontWeight: fweight,
        marginVertical: marginVertical,
        color: col,
        left: left,
        top: top,
        right: right,
        bottom: bottom,
        textAlign: textAlign,
        paddingLeft: paddingLeft,
        paddingTop: paddingTop,
        fontFamily: fontFamily,
        transform: transform,
      }}>
      {lable}
    </Text>
  );
};

export default Title;
