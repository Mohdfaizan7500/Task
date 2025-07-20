import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'

const SocialMediaPlatform = ({title}) => {
    return (
        <Text style={styles.orSignUpwith}>or {title} with</Text>

    )
}

export default SocialMediaPlatform

const styles = StyleSheet.create({
    orSignUpwith: {
        alignSelf: "center",
        color: 'gray',
        fontSize: s(14),
        marginTop:vs(10)
    },
})