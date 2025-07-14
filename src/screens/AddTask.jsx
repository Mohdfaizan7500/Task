import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SubTitle from '../components/SubTitle'
import { vs } from 'react-native-size-matters'
import { s } from 'react-native-size-matters'
import { ColorPatel } from '../assets/ColorPatel'
import PriorityTab from '../components/PriorityTab'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid'
import Button from '../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'


const AddTask = ({ button, title }) => {
  const [loading, setloading] = useState(false)
  const [Title, setTitle] = useState('')
  const [Description, setDescription] = useState('')
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [Priority, setPriority] = useState('')
  const [date, setDate] = useState('')
  const [Activetab, setActivetab] = useState('')
  const [uid, setuid] = useState('')


  useEffect(() => {
    const fatchUid = async () => {
      setloading(true)
      const uid = await AsyncStorage.getItem("UID");
      setuid(uid)
      setloading(false)
    }
    fatchUid();

  }, [])


  const showDatePicker = () => {
    if (!date) {
      setDatePickerVisibility(true);

    }
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    const dt = new Date(date)
    const x = dt.toISOString().split('T');
    const x1 = x[0].split("-")
    setDate(x1[2] + '/' + x1[1] + '/' + x1[0])
    hideDatePicker();
  };

  const AddButtonHandler = async () => {
    setloading(true);

    if (validate()) {
      // console.log(typeof (validate))
      // Alert.alert("Valid")
      console.log("Title:", Title)
      console.log("Deacription:", Description)
      console.log("priority:", Priority)
      console.log("Date:", date)
      // Alert.alert("start.")
      const userId = uuid.v4()
      console.log("Uid:",uid)
      firestore().collection(`${uid}`).doc(userId).set({

        title: Title,
        description: Description,
        priority: Priority,
        duedate: date,
        id: userId,
        date: new Date(),
        isDone: false
      }).then(res => {
        console.log(res)
        Alert.alert("Data Saved Sussessfully")
        setloading(false)
        ClaerFileds()


        // setName(''),
        //   setEmail(''),
        //   setMobile(''),
        //   setPassword(''),
        //   setConfirmPassword('')
        // Keyboard.dismiss()
        // navigation.navigate('Login')
      }).catch(error => {
        setloading(false)
        console.log(error)
      })


    }
    else {
      setloading(false)
      Alert.alert("Please fill all required fields.")
    }
  }

  const UpdateButtonHandler = () => {

  }

  const validate = () => {
    let isValid = true;

    if (Title == '') {
      isValid = false
    }
    if (Description == '') {
      isValid = false
    }
    if (Priority == '') {
      isValid = false
    }
    if (date == '') {
      isValid = false
    }

    return isValid;
  }



  const handlePriority = (Priority) => {
    setPriority(Priority)
  }

  const ClaerFileds = () => {
    setTitle('');
    setDate('');
    setPriority('');
    setDescription('');
    setActivetab('')
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Title */}
        <SubTitle subheading={'Title'} margin={s(20)} marTop={vs(7)}
        />
        <TextInput style={styles.InputField}
          value={Title}
          onChangeText={(txt) => setTitle(txt)}
        />

        {/* Due Date */}
        <SubTitle subheading={'Due date'} margin={s(20)} marTop={vs(3)} />
        <TouchableOpacity
          onPress={() => showDatePicker()}
          style={[{ justifyContent: "center" }]}>
          <TextInput style={styles.InputField}
            value={date}
            onPress={() => showDatePicker()} placeholder={date} placeholderTextColor={"black"} />
        </TouchableOpacity>

        {/* Priority */}
        <SubTitle subheading={'Priority'} margin={s(20)} marTop={vs(3)} />
        <PriorityTab sendPriority={handlePriority} Activetab={Activetab} setActivetab={setActivetab} />


        {/* Description */}
        <SubTitle subheading={'Description'} margin={s(20)} marTop={vs(3)} />
        <TextInput
          value={Description}
          onChangeText={(txt) => setDescription(txt)}
          multiline={true}
          numberOfLines={4}
          style={[styles.InputField, {
            height: vs(120),
            textAlignVertical: "top",
          }]} />

        {/* Add Button */}
        <Button title={title} sendData={AddButtonHandler} loading={loading} />
        {/* <TouchableOpacity
          onPress={() => AddButtonHandler()}
          style={styles.AddButton}>
          <Text style={styles.AddButtonText}>{button}</Text>
        </TouchableOpacity> */}


        {/* {Date Picker} */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </ScrollView>

    </View>
  )
}

export default AddTask

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    // alignItems:"center"
  },
  InputField: {
    height: vs(45),
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
  AddButton: {
    height: vs(50),
    backgroundColor: ColorPatel.AppColor,
    width: "95%",
    alignSelf: "center",
    justifyContent: "center", alignItems: "center",
    borderRadius: s(12),
    marginTop: vs(40)

  },
  AddButtonText: {
    color: "#fff",
    fontSize: s(14),
    fontWeight: "700"
  },


})