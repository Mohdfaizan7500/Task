import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { ColorPatel } from '../../src/assets/ColorPatel'
import { s, vs } from 'react-native-size-matters'
import MoreIcon from 'react-native-vector-icons/Octicons';
import LineIcon from 'react-native-vector-icons/Feather';
import SearchIcon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native';
import { TaskContext } from '../TaskProvider';
const Header = () => {
    const { tasks, searchTasks, } = useContext(TaskContext);

    const [SearchTodo, setSearchTodo] = useState('')
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTasks = searchQuery ? searchTasks(searchQuery) : tasks;

    const date = () => {

        const currentDate = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-GB', options);
        return formattedDate
    }
    return (
        <View style={styles.ViewBG}>
            <View style={styles.Container}>
                <TouchableOpacity>
                    <MoreIcon name="apps" size={30} color={ColorPatel.Bacground} />
                </TouchableOpacity>
                <View style={styles.SearchConatiner}>
                    <SearchIcon name="search" size={16} color={'gray'} />
                    {/* <TextInput style={styles.SearchField} value={SearchTodo}
                        onChangeText={(txt) => { setSearchTodo(txt), callEd(txt) }}
                    /> */}
                    <TextInput style={styles.SearchField} placeholder="Search tasks..."
                        value={searchQuery}
                        placeholderTextColor={'gray'}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <TouchableOpacity style={styles.LineContainer}>
                    <LineIcon name="more-horizontal" size={25} color={ColorPatel.Bacground} />
                </TouchableOpacity>


            </View>
            <Text style={styles.Today}>Today {date()}</Text>
            <Text style={styles.Mytask}>My Tasks </Text>
            <View style={styles.backCircle}>

            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    ViewBG: {
        backgroundColor: ColorPatel.AppColor,
        paddingLeft: s(20),
        paddingTop: vs(10),
        paddingRight: s(10),
        height: vs(120),
        overflow: "hidden",
    },
    Container: {
        flexDirection: "row",
        alignItems: "center",
        zIndex: 1

        // height:60
    },
    LineContainer: {
        height: s(40),
        width: s(40),
        backgroundColor: ColorPatel.Back,
        borderRadius: s(30),
        justifyContent: "center",
        alignItems: "center"
    },
    SearchConatiner: {
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
        zIndex: 1
    },
    SearchField: {
        // backgroundColor:'red',
        justifyContent: "center",
        flex: 1,
        height: s(30),
        fontSize: s(12),
        paddingBottom: 0,
        paddingTop: 0,
        color: "black"
    },
    Today: {
        fontSize: s(12),
        fontWeight: "400",
        color: ColorPatel.Bacground,
        marginTop: vs(10),
        zIndex: 1
    },
    Mytask: {
        fontSize: s(18),
        fontWeight: '700',
        color: ColorPatel.Bacground,
        marginBottom: s(10),
        zIndex: 1
    },
    backCircle: {
        backgroundColor: ColorPatel.Back,
        width: s(150),
        height: s(150),
        position: "absolute",
        borderRadius: s(100),
        bottom: s(-35),
        left: s(-30)
    }
})