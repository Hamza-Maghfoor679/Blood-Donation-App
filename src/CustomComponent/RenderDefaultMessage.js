import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RenderDefaultMessage = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>No data available</Text>
    </View>
  )
}

export default RenderDefaultMessage

const styles = StyleSheet.create({})