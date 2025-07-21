import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'
import SocialCircle from './SocialCircle'
import { AppleIcon, FaceBookIcon, GoogleIcon } from '../constants/Icons'
// import { AppleIcon, FaceBookIcon, GoogleIcon } from '../assets/Icons'


const SocialContainer = () => {
    return (
        <View style={styles.SocialContainerView}>
            <TouchableOpacity>
                <SocialCircle bg={"#3f5992"} icon={<FaceBookIcon />} />
            </TouchableOpacity>
            <TouchableOpacity>
                <SocialCircle bg={"#d84c3d"} icon={<GoogleIcon />} />
            </TouchableOpacity>
            <TouchableOpacity>
                <SocialCircle bg={"#020202"} icon={<AppleIcon />} />
            </TouchableOpacity>
        </View>
    )
}

export default SocialContainer

const styles = StyleSheet.create({
    SocialContainerView: {
        flexDirection: "row",
        alignSelf: "center",
        gap: s(25),
        // position: "absolute",
        // bottom: vs(80),
        marginTop:vs(20)
    },
})