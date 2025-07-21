import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MoreIcon from 'react-native-vector-icons/Octicons';
import LineIcon from 'react-native-vector-icons/Feather';
import SearchIcon from 'react-native-vector-icons/FontAwesome';
import { s, vs } from 'react-native-size-matters';
import { signOut } from '@react-native-firebase/auth';
import { ColorPatel } from '../constants/ColorPatel copy';
import { auth } from '../firbaseConfig/firebaseConfig';

const Header = ({ navigation, headerSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log("Error:", error);
            Alert.alert("Error");
        }
    };

    const sendData = (txt) => {
        headerSearch(txt);
    };

    const getCurrentDate = () => {
        const currentDate = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return currentDate.toLocaleDateString('en-GB', options);
    };

    return (
        <View style={styles.viewBG}>
            <View style={styles.container}>
                <TouchableOpacity>
                    <MoreIcon name="apps" size={30} color={ColorPatel.Bacground} />
                </TouchableOpacity>
                <View style={styles.searchContainer}>
                    <SearchIcon name="search" size={16} color={'gray'} />
                    <TextInput
                        style={styles.searchField}
                        value={searchQuery}
                        onChangeText={(txt) => {
                            sendData(txt);
                            setSearchQuery(txt);
                        }}
                    />
                </View>
                <TouchableOpacity
                    style={styles.lineContainer}
                    onPress={() => {
                        Alert.alert("Alert", 'Are you sure you want to logout?', [
                            { text: "Cancel", style: "cancel" },
                            { text: "Logout", onPress: logout }
                        ]);
                    }}
                >
                    <LineIcon name="more-horizontal" size={25} color={ColorPatel.Bacground} />
                </TouchableOpacity>
            </View>
            <Text style={styles.today}>Today {getCurrentDate()}</Text>
            <Text style={styles.myTask}>My Tasks</Text>
            <View style={styles.backCircle} />
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    viewBG: {
        backgroundColor: ColorPatel.AppColor,
        paddingLeft: s(20),
        paddingTop: vs(10),
        paddingRight: s(10),
        height: vs(120),
        overflow: "hidden",
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        zIndex: 1,
    },
    lineContainer: {
        height: s(40),
        width: s(40),
        backgroundColor: ColorPatel.Back,
        borderRadius: s(30),
        justifyContent: "center",
        alignItems: "center",
    },
    searchContainer: {
        height: vs(30),
        backgroundColor: ColorPatel.Bacground,
        borderRadius: 20,
        marginStart: s(30),
        marginEnd: s(25),
        flex: 1,
        alignItems: "center",
        paddingStart: s(10),
        flexDirection: "row",
        gap: s(5),
        paddingRight: s(15),
        zIndex: 1,
    },
    searchField: {
        flex: 1,
        height: s(40),
        fontSize: s(14),
        color: "black",
    },
    today: {
        fontSize: s(12),
        fontWeight: "400",
        color: ColorPatel.Bacground,
        marginTop: vs(10),
        zIndex: 1,
    },
    myTask: {
        fontSize: s(18),
        fontWeight: '700',
        color: ColorPatel.Bacground,
        marginBottom: s(10),
        zIndex: 1,
    },
    backCircle: {
        backgroundColor: ColorPatel.Back,
        width: s(150),
        height: s(150),
        position: "absolute",
        borderRadius: s(100),
        bottom: s(-35),
        left: s(-30),
    },
});
