import { Alert, DeviceEventEmitter, StyleSheet, Text, View } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import Splash from './src/screens/Splash'
import SignUp from './src/screens/signup'
import Login from './src/screens/Login'
import Navigation from './src/screens/Navigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore';


export const AppContext = createContext();
const Todo = [
  {
    id: 1,
    title: "faizan",
    description: "hgfdywfduywduy",
    isDone: false,
    priority: "High",
    date: "01/01/2025"
  },
  {
    id: 2,
    title: "amaan",
    description: "hgfdywfduywduy",
    isDone: false,
    priority: "Medium",
    date: "01/01/2025"
  },
  {
    id: 3,
    title: "fehad",
    description: "hgfdywfduywduy",
    isDone: false,
    priority: "Low",
    date: "01/01/2025"
  }
]

const App = () => {
  const [dataArray, setDataArray] = useState([]);
  const [OldDataArray, setOldDataArray] = useState([]);
  const [search, setSearch] = useState('')


  const [uid, setuid] = useState('')




  const setData = (temp) => {
    setDataArray(temp)
    console.log("insialArray:", dataArray)

  }
  const fachData = async () => {
    const userId = await AsyncStorage.getItem("UID");
    setuid(userId)
    console.log("uid", uid)
    const temp = [];

    firestore().collection(userId).get().then(res => {
      if (res.docs != null) {
        res.docs.map(item => {
          temp.push(item.data())
          setDataArray(temp)
          console.log(dataArray)
        })
        console.log('temp:', temp)

      }
      else {
        setLoading(false)
        Alert.alert("Create Task First ")
      }
      // setDataArray(temp)
      console.log(temp)
      setData(temp)
    }).catch(error => {
      console.log(error)
      setLoading(false)
      Alert.alert("Technical Error")
    })


  }

  useEffect(() => {
    // setDataArray(Todo)
    // setOldDataArray(Todo)
    fachData()
    console.log("ss", dataArray)

  }, [])



  const deleteitem = (id) => {
    const newtodo = dataArray.filter((todos) => todos.id !== id)
    setDataArray(newtodo)
    setOldDataArray(newtodo)
  }

  const AddItem = (item) => {
    const arr = [...dataArray]
    arr.push(item)
    console.log(arr)
    setDataArray(arr)
    setOldDataArray(arr)
    // firestore().collection(uid).doc().set(arr)
    // .then((res)=>{
    //   console.log(res)
    //   if(res !=[]){
    //     Alert.alert("Add")
    //   }
    // })
    // .catch((error)=>{
    //   console.log("Error",error)
    //   Alert.alert("Error")
    // })
  }

  const UpdateItemInArray = (item) => {
    const updatedTodo = Todo.map((todo) => {
      if (todo.id == item.id) {
        return {
          ...todo,
          title: item.title,
          description: item.description,
          priority: item.priority,
          date: item.data
        };
      }
      return todo;

    });
    setDataArray(updatedTodo)
    setOldDataArray(updatedTodo)

  }

  const handleDone = (id) => {
    console.log("done :", id)
    const newTask = dataArray.map((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
      }
      return item;

    })
    setDataArray(newTask)
    setOldDataArray(newTask)

  }

  const SearchHandle = (text) => {
    console.log(text)
    setSearch(text)
    console.log("search: ", search)
  }

  const SearchTodo = (query) => {
    console.log(query)
    console.log("Array:", dataArray)
    console.log("OldArray:", OldDataArray)
    // if (query == '') {
    //   setDataArray(OldDataArray)
    // }
    // else {
    //   const filterItem = dataArray.filter((item) =>
    //     item.title.toLowerCase().includes(query.toLowerCase()) ||
    //     item.description.includes(query.toLowerCase())
    //   )
    //   setDataArray(filterItem)
    // }
  }

  useEffect(() => {
    DeviceEventEmitter.addListener("SearchTodo", SearchTodo)

  }, [])
  return (
    <AppContext.Provider value={{ dataArray, OldDataArray, deleteitem, AddItem, handleDone, UpdateItemInArray, SearchHandle, fachData }}>
      <Navigation />
    </AppContext.Provider>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})