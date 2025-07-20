import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { s } from 'react-native-size-matters'

const SocialCircle = ({bg,icon}) => {
  return (
    <View style={[styles.SocialCircle,{backgroundColor:bg}]}>
     {icon}
    </View>
  )
}

export default SocialCircle

const styles = StyleSheet.create({
    SocialCircle:{
        width:s(50),
        height:s(50),
        borderRadius:s(50),
        justifyContent:"center",
        alignItems:"center",
        elevation:10
    }
})