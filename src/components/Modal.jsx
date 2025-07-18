import { Dimensions, Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { s, vs } from 'react-native-size-matters'
import Button from './Button'
import SubTitle from './SubTitle'
import { ColorPatel } from '../assets/ColorPatel'
import PriorityTab from './PriorityTab'

const ModalView = ( {visible, onPress, Updateid} ) => {
    const [loading, setloading] = useState(true)
    const [Title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [Priority, setPriority] = useState('')
    const [date, setDate] = useState('')
    const [Activetab, setActivetab] = useState('')

  
        

        
    return (
        <Modal
            visible={visible}
            transparent

        >
            <View style={styles.ModalView}>
                <View style={styles.MainView}>

                    <SubTitle subheading={'Title'} margin={s(20)} marTop={vs(7)} />
                    <TextInput style={styles.InputField}
                        // editable={!loading}
                        value={Title}
                        onChangeText={(txt) => setTitle(txt)}
                    />
                    <SubTitle subheading={'Due date'} margin={s(20)} marTop={vs(3)} />
                    <TextInput style={styles.InputField}
                        // editable={!loading}
                        value={date}
                        onChangeText={(txt) => setDate(txt)}
                    />
                    <SubTitle subheading={'Priority'} margin={s(20)} marTop={vs(3)} />
                    <PriorityTab
                    // disabled={loading}
                    //  sendPriority={handlePriority}
                    //   Activetab={Activetab} 
                    //   setActivetab={setActivetab} 
                    />

                    <SubTitle subheading={'Description'} margin={s(20)} marTop={vs(3)} />
                    <TextInput
                        //   editable={!loading}
                        scrollEnabled={true}
                        value={Description}
                        onChangeText={(txt) => setDescription(txt)}
                        multiline={true}
                        numberOfLines={7}
                        style={[styles.InputField, {
                            height: vs(100),
                            textAlignVertical: "top",
                        }]} />

                    <Button title={"Update"} />
                    <Button title={"Cancle"} onPress={onPress} />


                </View>

            </View>

        </Modal>

    )
}

export default ModalView

const styles = StyleSheet.create({
    ModalView: {
        backgroundColor: "transparent",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        justifyContent: "center",
        alignItems: "center"

    },
    MainView: {
        width: "75%",
        height: "70%",
        backgroundColor: "#fff",
        borderRadius: s(20),
        elevation: 12
    },
    InputField: {
        height: vs(30),
        backgroundColor: "#fff",
        width: '95%',
        borderRadius: s(10),
        fontSize: s(14),
        color: 'black',
        borderWidth: s(0.5),
        borderColor: ColorPatel.Back,
        alignSelf: "center",
        paddingStart: s(15),
        marginTop: s(5)
    },
})