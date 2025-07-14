import { StyleSheet, Text, Pressable, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ListIcon from 'react-native-vector-icons/FontAwesome6';
import AddIcon from 'react-native-vector-icons/MaterialIcons';
import CalenderIcon from 'react-native-vector-icons/Feather';
import { s, vs } from 'react-native-size-matters';
import { ColorPatel } from '../assets/ColorPatel';




const Footer = ({ sendData }) => {
    const [selected, setSelected] = useState(2)
    const ACTIVE_BG = ColorPatel.AppColor;
    const INACTIVE_BG = '#FFF';
    const ACTIVE_ICON = '#fff';
    const INACTIVE_ICON = 'gray';

    const handleClick = (id) => {
        sendData(id)
        setSelected(id)
    }

    useEffect(() => {
        handleClick(2)
    }, [])


    return (
        <View style={styles.Container}>
            <Pressable onPress={() => handleClick(1)}
                style={[styles.BottomButton,
                selected == 1 && { marginBottom: s(60) },
                { backgroundColor: selected == 1 ? ACTIVE_BG : INACTIVE_BG }]}>
                <ListIcon name="list-ul" size={selected == 1 ? 25 : 20} color={selected == 1 ? ACTIVE_ICON : INACTIVE_ICON} />
            </Pressable >
            <Pressable onPress={() => handleClick(2)}
                style={[styles.BottomButton, styles.slectedStyle,
                selected == 2 && { marginBottom: s(60) },
                    , { backgroundColor: selected == 2 ? ACTIVE_BG : INACTIVE_BG }]}>
                <AddIcon name="add" size={selected == 2 ? 40 : 30} color={selected == 2 ? ACTIVE_ICON : INACTIVE_ICON} />
            </Pressable >
            <Pressable onPress={() => handleClick(3)}
                style={[styles.BottomButton,
                selected == 3 && { marginBottom: s(60) },
                { backgroundColor: selected == 3 ? ACTIVE_BG : INACTIVE_BG }]}>
                <CalenderIcon name="calendar" size={selected == 3 ? 30 : 25} color={selected == 3 ? ACTIVE_ICON : INACTIVE_ICON} />
            </Pressable>


        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    Container: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: ColorPatel.Bacground,
        height: vs(60),
        width: '100%', alignItems: "center",
        paddingHorizontal: s(20),

    },
    BottomButton: {
        width: s(45),
        backgroundColor: ColorPatel.AppColor,
        height: s(45),
        borderRadius: s(50),
        justifyContent: "center",
        alignItems: "center"

    },
    slectedStyle: {
    }
})