import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'

const SubTitle = ({ subheading, Forget,margin ,marTop,onPress}) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.subheading,{marginStart:margin || s(10),marginTop:marTop || 20}]}>{subheading}</Text>
            {Forget && <TouchableOpacity onPress={onPress}>
                    <Text style={[styles.subheading, { color: '#686bf0' ,paddingEnd:s(10)}]}>Forget password!</Text>
                </TouchableOpacity>
            }
        </View>

    )
}

export default SubTitle

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    subheading: {
        fontSize: s(12),
        fontWeight: "400",
        color: "gray",
        marginStart: s(10),
        marginTop: vs(20)
    },
})