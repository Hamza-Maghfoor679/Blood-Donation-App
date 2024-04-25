import {View, Text} from 'react-native';
import React from 'react';
import Theme from '../Utils/Theme';

export default function ErrorMessage({error,marginLeft}) {
  return (
    <>
      {error? (
        <View
          style={{
            marginTop: Theme.hp('0.6%'),
            marginBottom: Theme.hp('3%'),
            marginLeft:marginLeft
          }}>
          <Text style={{color: 'red'    }}>{error}</Text>
        </View>
      ) : null}
    </>
  );
}
