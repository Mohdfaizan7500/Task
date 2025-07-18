import { Alert, DeviceEventEmitter, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import SubTitle from '../components/SubTitle'
import { vs, s } from 'react-native-size-matters'
import { ColorPatel } from '../assets/ColorPatel'
import PriorityTab from '../components/PriorityTab'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import uuid from 'react-native-uuid'
import Button from '../components/Button'
import { AppContext } from '../../App'
import CalenderIcon from 'react-native-vector-icons/Feather';



const AddTask = () => {



  // const EditId = EditId;

  const { AddItem, UpdateItemInArray } = useContext(AppContext)

  const [loading, setloading] = useState(false)
  const [Title, setTitle] = useState('')
  const [Description, setDescription] = useState('')
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [Priority, setPriority] = useState('')
  const [date, setDate] = useState('')
  const [Activetab, setActivetab] = useState('')
  const [uid, setuid] = useState('')
  const [isUpdate, setisUpdate] = useState(false)
  const [UpadteItemId, setUpadteItemId] = useState('')





  const UpdateItem = (item) => {
    console.log("called")
      setUpadteItemId(item.id)
      setTitle(item.title)
      setDate(item.date)
      setActivetab(item.priority)
      setPriority(item.priority)
      setDescription(item.description)
      setisUpdate(true)
    }
    const EditItem = () => {
      if (validate()) {
        const item = {
          id: UpadteItemId,
          title: Title,
          description: Description,
          isDone: false,
          priority: Priority
        }

        UpdateItemInArray(item)
        setloading(false);
        ClaerFileds();
        Alert.alert("Save Changes")


    }
    else {
      setloading(false)
      Alert.alert("Please fill all required fields.")
    }
  }



  useEffect(() => {

    DeviceEventEmitter.addListener("UpdateItem", UpdateItem)

  }, [])
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const dt = new Date(date)
    const x = dt.toISOString().split('T');
    const x1 = x[0].split("-")
    setDate(x1[2] + '/' + x1[1] + '/' + x1[0])
    hideDatePicker();
  };

  const AddButtonHandler = async () => {

    setloading(true);
    if (validate()) {
      const userId = uuid.v4();
      const item = {
        id: userId,
        title: Title,
        description: Description,
        isDone: false,
        priority: Priority
      }

      setloading(false);
      ClaerFileds();
      Alert.alert("Task Added")
      AddItem(item)



    }
    else {
      setloading(false)
      Alert.alert("Please fill all required fields.")
    }




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
    setActivetab('');
    setisUpdate(false);
    setUpadteItemId('');
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Title */}
        <SubTitle subheading={'Title'} margin={s(20)} marTop={vs(7)}
        />
        <TextInput style={styles.InputField}
          editable={!loading}
          value={Title}
          onChangeText={(txt) => setTitle(txt)}
        />

        {/* Due Date */}
        <SubTitle subheading={'Due date'} margin={s(20)} marTop={vs(3)} />
        <View

        >
          <TextInput
            keyboardType='phone-pad'
            editable={!loading}
            style={styles.InputField}
            value={date}
            onChangeText={(txt) => setDate(txt)}
            placeholderTextColor={"black"} />
          <TouchableOpacity
            onPress={() => showDatePicker()}
            style={{ position: "absolute", right: s(20), top: vs(17) }}>
            <CalenderIcon name="calendar" size={25} color={"gray"} />
          </TouchableOpacity>
        </View>

        {/* Priority */}
        <SubTitle subheading={'Priority'} margin={s(20)} marTop={vs(3)} />
        <PriorityTab disabled={loading} sendPriority={handlePriority} Activetab={Activetab} setActivetab={setActivetab} />


        {/* Description */}
        <SubTitle subheading={'Description'} margin={s(20)} marTop={vs(3)} />
        <TextInput
          editable={!loading}
          scrollEnabled={true}
          value={Description}
          onChangeText={(txt) => setDescription(txt)}
          multiline={true}
          numberOfLines={7}
          style={[styles.InputField, {
            height: vs(120),
            textAlignVertical: "top",
          }]} />

        {/* Add Button */}
        {
          isUpdate ?
            <View style={{ flexDirection: "row", justifyContent: "center", gap: s(15) }}>
              <Button title={'Update'} onPress={EditItem} loading={loading} />
              <Button title={'cancel'} onPress={ClaerFileds} loading={loading} />
            </View>
            :
            <Button title={"Add Task"} onPress={AddButtonHandler} loading={loading} />
        }



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