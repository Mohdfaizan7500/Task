import React, { useEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
// import { useAuth } from './AuthContext';
import { s, vs } from 'react-native-size-matters';
import Logo from '../../components/Logo';
import Circle from '../../components/Circle';
import ArrowIcon from '../../components/ArrowIcon';
import { useAuth } from '../../context/AuthContext';

const Splash = ({ navigation }) => {
    const { user } = useAuth();

    useEffect(() => {
        console.log("Splash Screen Mount");

        const timer = setTimeout(() => {
            navigation.replace("AppNavigator");
        }, 3000);

        return () => {
            console.log("Splash Screen Unmount");
            clearTimeout(timer);
        };
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Logo />
            <View style={{ marginTop: 70 }}>
                <Text style={styles.heading}>Get things done.</Text>
                <Text style={styles.subtitle}>
                    {`just a click away from \nplanning your task`}
                </Text>
            </View>
            <Circle onPress={() => navigation.navigate("AppNavigator")} />
            <ArrowIcon onPress={() => navigation.navigate("AppNavigator")} />
        </View>
    );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    heading: {
        fontSize: s(24),
        fontWeight: '800',
        paddingStart: 40,
    },
    subtitle: {
        marginTop: vs(15),
        fontSize: s(14),
        color: "gray",
        fontWeight: "400",
        letterSpacing: 1.5,
        paddingStart: 40,
    },
});
