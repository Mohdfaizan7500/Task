import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'

const Heading = ({heading}) => {
    return (
        <Text style={styles.heading}>{heading}</Text>
    )
}

export default Heading

const styles = StyleSheet.create({
    heading: {
        fontSize: s(20),
        fontWeight: "700",
        color: "#0e2c4eff",
        alignSelf: "center",
        marginTop: vs(20)
    },
})