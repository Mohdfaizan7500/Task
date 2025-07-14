import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/FontAwesome5';

const Logo = () => {
    return (
        <View style={{elevation:12,backgroundColor:"#fff",borderRadius:20,alignSelf:"center"}}>
            <View style={[styles.Logo]}>
                <Icon name="check" size={50} color="#fff" />
            </View>
        </View>
    )
}

export default Logo

const styles = StyleSheet.create({
    Logo: {
        width: s(100),
        height: s(100),
        backgroundColor: '#686bf0',
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        alignSelf:"center"
    }
})