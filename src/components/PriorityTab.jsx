import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { s, vs } from 'react-native-size-matters'
import { ColorPatel } from '../assets/ColorPatel'

const PriorityTab = ({ sendPriority ,Activetab,setActivetab}) => {
    // const [Activetab, setActivetab] = useState('')

    const tabsArr = ['Low', 'Medium', 'High']

    const ACTIVE_BG = ColorPatel.AppColor;

    const ACTIVE_TEXT = '#fff';
    const INACTIVE_TEXT = '#2C2016';

    const INACTIVE_BG = '#F5F5F4';
    const handleClick = (tabName) => {
        // console.log(tabName)
        sendPriority(tabName)
        setActivetab(tabName)

    }

    return (
        <View style={styles.container}>
            {
                tabsArr.map((tabName) => {

                    const isActive = Activetab === tabName

                    return (
                        <TouchableOpacity


                            onPress={() => handleClick(tabName)}
                            key={tabName.toString()}
                            style={[styles.tabButton,
                            isActive ? styles.ActIveStyle : styles.InActIveStyle
                            ]}>
                            <Text style={[styles.ButtonText,
                            isActive ? styles.ActiveText : styles.InactiveText
                            ]}>{tabName}</Text>

                        </TouchableOpacity>
                    )
                })
            }

        </View>
    )
}

export default PriorityTab

const styles = StyleSheet.create({
    container: {
        height: vs(40),
        // borderRadius: s(12),
        // backgroundColor: "red",
        flexDirection: "row",
        alignItems: "center",
        // padding: s(4),
        marginTop: vs(5),
        width: "95%",
        alignSelf: "center",
        // flex:1,
        gap: s(10)
    },
    tabButton: {
        height: vs(32),
        borderRadius: s(8),
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        // backgroundColor:"red"
    },
    ButtonText: {
        fontSize: s(14),
        fontWeight: '600'
    },
    ActIveStyle: {
        backgroundColor: ColorPatel.AppColor
    },
    InActIveStyle: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: ColorPatel.AppColor
    },
    ActiveText: {
        fontSize: s(14),
        fontWeight: '600',
        color: '#fff',

    },
    InactiveText: {
        fontSize: s(14),
        fontWeight: '400',
        color: '#2C2016'

    }
})