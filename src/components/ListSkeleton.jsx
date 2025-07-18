import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'
import { ColorPatel } from '../assets/ColorPatel'

const ListSkeleton = () => {
    return (
        <View>
            <FlatList
                data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <View style={styles.Circle}></View>
                        <View style={{gap:10,flex:1,marginStart:20}}>
                            <View style={styles.Title}></View>
                            <View style={[styles.Title,{width:s(120)}]}></View>
                        </View>
                        <View style={styles.Priority}>
                            </View>

                    </View>
                )}
            />
        </View>
    )
}

export default ListSkeleton

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorPatel.Bacground,
        height: vs(70),
        borderRadius: s(10),
        marginBottom: vs(10),
        elevation: 6,
        width: "95%",
        alignSelf: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    Circle:{
        width:s(25),
        height:s(25),
        backgroundColor:"rgba(165, 165, 165, 0.8)",
        borderRadius:s(20),
        marginStart:s(15),

    },
    Title:{
        width:s(70),
        height:vs(15),
        backgroundColor:"rgba(165, 165, 165, 0.8)",
        borderRadius:5
    },
    Priority:{
        width:s(35),
        height:vs(20),
        backgroundColor:"rgba(165, 165, 165, 0.8)",
        marginEnd:s(15),
        borderRadius:20
    }
})