import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import styleContainer from '../assets/styleSheet'
import Header from '../components/Header'
import AddTask from './AddTask'
import { useRoute } from '@react-navigation/native'

const Screen2 = () => {
    
    

    useEffect(() => {
        console.log("Add Screen Mount")
    }, [])
    return (
        <View style={styleContainer.container}>
            <Header />
            <AddTask  />
        </View>
    )
}

export default Screen2

const styles = StyleSheet.create({})