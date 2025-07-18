import { StyleSheet } from "react-native";
import { s, vs } from "react-native-size-matters";

 const styleContainer = StyleSheet.create({

    container:{
        flex:1,
        // backgroundColor:"rgba(85, 218, 195, 1)",
        // justifyContent:"center",
        // alignItems:"center"
    },
    ImageSize:{
        width:s(25),
        height:vs(25)
    }
})

export default styleContainer