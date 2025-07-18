import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Screen1 from './Screen1';
import Screen3 from './Screen3';
import Screen2 from './Screen2';
import { s, vs } from 'react-native-size-matters';
import { ColorPatel } from '../assets/ColorPatel';
import ListIcon from 'react-native-vector-icons/FontAwesome6';
import CalenderIcon from 'react-native-vector-icons/Feather';
import Update from './Update';



const Bottom = createBottomTabNavigator();
const Home = () => {

    const CustomtabBarButton = ({ childran, onPress }) => {
        return (
            <TouchableOpacity
                style={{
                    top: s(-50),
                    justifyContent: "center",
                    alignItems: "center"
                }}
                onPress={onPress}>
                <View style={{
                    width: s(70),
                    height: s(70),
                    borderRadius: s(35),
                    backgroundColor: ColorPatel.AppColor,
                    justifyContent: "center",
                    alignItems: "center",
                    elevation: s(15)
                }}>
                    {/* {childran} */}

                    <Image
                        source={require('../assets/Images/add.png')}
                        resizeMode='contain'
                        style={{
                            width: s(40),
                            height: s(40),
                            tintColor: "#fff",
                        }}
                    />
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <Bottom.Navigator
            initialRouteName="Screen2"
            screenOptions={{
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    backgroundColor: "#fff",
                    borderRadius: s(15),
                    marginHorizontal: s(15),
                    position: "absolute",
                    bottom: vs(20),
                    height: vs(80),
                    elevation: s(15),
                    paddingTop: vs(25),

                },


            }}>
            {/* List Screen icon */}
            <Bottom.Screen name='Screen1' component={Screen1} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <View style={{ gap: s(5), alignItems: "center", width: s(70) }}>

                        <ListIcon name="list-ul" size={25} color={focused ? ColorPatel.AppColor : "gray"} />
                        <Text style={{
                            fontSize: s(11),
                            color: focused ? ColorPatel.AppColor : "gray"

                        }}>List</Text>
                    </View>
                )
            }} />
            {/* Add Screen icon */}
            <Bottom.Screen name='Screen2' component={Screen2} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={require('../assets/Images/add.png')}
                        resizeMode='contain'
                        style={{
                            width: s(25),
                            height: s(25),
                            tintColor: "pink",
                        }}
                    />
                ),
                tabBarButton: (props) => (
                    <CustomtabBarButton {...props} />
                )
            }} />

            {/* Calender Screen icon */}
            <Bottom.Screen name='Screen3' component={Screen3} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <View style={{ gap: s(5), width: 70, alignItems: "center" }}>
                        <CalenderIcon name="calendar" size={30} color={focused ? ColorPatel.AppColor : "gray"} />

                        <Text style={{
                            fontSize: s(11),
                            color: focused ? ColorPatel.AppColor : "gray"

                        }}>Calender</Text>
                    </View>
                )
            }} />


        </Bottom.Navigator>
    )
}

export default Home

const styles = StyleSheet.create({})