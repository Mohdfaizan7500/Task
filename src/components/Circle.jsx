import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'

const Circle = ({sendData}) => {
  const navigation =useNavigation();
  return (
    <Pressable onPress={()=>sendData()} style={styles.Circle}> 
      
    </Pressable>
  )
}

export default Circle

const styles = StyleSheet.create({
    Circle:{
        width:s(300),
        height:s(300),
        backgroundColor:"#686bf0",
        borderRadius:s(150),
        position:"absolute",
        bottom:vs(-160),
        right:s(-130)
    }
})