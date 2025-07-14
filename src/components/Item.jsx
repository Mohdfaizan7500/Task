import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ColorPatel } from '../assets/ColorPatel';
import { s, vs } from 'react-native-size-matters';
import { GestureDetector, Swipeable } from 'react-native-gesture-handler';
import EditIcon from 'react-native-vector-icons/Feather';
import DeleteIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Item = ({ item, index, sendData, Task }) => {
    const [Selected, setSelected] = useState('')
    const [todo, setTodo] = useState([])


    useEffect(() => {
        setTodo(Task)
        console.log(Task)
    }, [])


    const ChooseColor = (priorty) => {
        if (priorty == 'Low') {
            return "#e74343ff"
        }
        else if (priorty == 'Medium') {
            return 'rgba(190, 221, 76, 1)'
        }
        else {
            return "#777becff"
        }
    }
    const PriortyColor = ChooseColor(item.priorty)
    const isDone = item.isDone;
    const navigation = useNavigation();


    const handleDone = (id) => {
       
        console.log(todo)
        // const newTask = todo.map((item) => {
        //     if (item.id === id) {
        //         item.isDone = !item.isDone;

        //     }
        //     return item;

        // })
        // sendData(newTask);
    }
    const leftSwift = () => {
        return (
            <TouchableOpacity onPress={() => { }}
                style={styles.leftSwift}>
                <EditIcon name="edit" size={24} color="#fff" />
            </TouchableOpacity>
        )
    }

    const RightSwift = () => {
        return (
            <TouchableOpacity onPress={() => console.log("Delete")}
                style={[styles.leftSwift, { backgroundColor: "red" }]}>
                <DeleteIcon name="delete" size={30} color="#fff" />
            </TouchableOpacity>
        )
    }
    return (
        <Swipeable renderLeftActions={leftSwift} renderRightActions={RightSwift}>
            <View style={styles.taskContainer}>

                <View style={styles.ChecBoxView}>
                    {/* <Text>y</Text> */}
                    <BouncyCheckbox
                        size={25}
                        fillColor={ColorPatel.AppColor}
                        unFillColor="#FFFFFF"
                        // text={''}
                        iconStyle={{ borderColor: ColorPatel.AppColor }}
                        innerIconStyle={{ borderWidth: 2 }}
                        // textStyle={{ fontFamily: "JosefinSans-Regular" }}
                        onPress={() => handleDone((item.id))}
                    />

                </View>
                <View style={styles.TextContainer}>
                    <Text style={[styles.Teitle, isDone && { textDecorationLine: "line-through" }]}>{item.title}</Text>
                    <Text numberOfLines={2} ellipsizeMode='tail' style={styles.Description}>{item.Description}</Text>
                    {/* <Text style={styles.Description}>{item.Description}</Text> */}
                </View>
                <View style={[styles.priorty, { backgroundColor: PriortyColor }]}>
                    <Text style={styles.ProrityText}>{item.priorty}</Text>
                </View>
            </View>
        </Swipeable>

    )
}

export default Item

const styles = StyleSheet.create({
    taskContainer: {
        backgroundColor: ColorPatel.Bacground,
        height: vs(70),
        borderRadius: s(10),
        marginBottom: vs(10),
        elevation: 6,
        width: "95%",
        alignSelf: "center",
        alignItems: "center",
        // justifyContent: "center",
        // paddingStart: s(10),
        flexDirection: "row"
    },
    TextContainer: {
        flex: 1,
        height: vs(70),
        // backgroundColor:"red"
        // justifyContent:"center",
        // alignItems:"center"
    },
    Teitle: {
        fontSize: s(14),
        color: "#000",
        fontWeight: "600",
        marginTop: vs(5)
    },
    Description: {
        fontSize: s(10),
        // marginStart: s(40),
        // flex:1,
        // color: "gray",
        // marginTop: vs(5)
    },
    leftSwift: {
        backgroundColor: "#32cd32",
        height: vs(70),
        width: s(70),
        justifyContent: "center",
        alignItems: "center"

    },
    priorty: {
        // width:s(50),
        // height:vs(30),
        backgroundColor: "green",
        paddingHorizontal: s(13),
        paddingVertical: vs(5),
        borderRadius: s(20),
        marginRight: s(10)
    },
    ProrityText: {
        fontSize: s(8),
        color: "#fff",
        fontWeight: "800"
    },
    ChecBoxView: {
        paddingStart: s(12),
        // backgroundColor:"blue",
        width: s(50),
        height: vs(70),
        justifyContent: "center",
        alignItems: "center"

    }

})