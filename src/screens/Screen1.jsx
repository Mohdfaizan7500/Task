import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import styleContainer from '../assets/styleSheet'
import Header from '../components/Header'
import List from './List'

const Screen1 = () => {
    useEffect(() => {
        console.log("List Screen Mount")
    }, [])
    return (
        <View style={styleContainer.container}>
            <Header />
           <List/>
            
        </View>
    )
}

export default Screen1

const styles = StyleSheet.create({
    Container: {

    }
})