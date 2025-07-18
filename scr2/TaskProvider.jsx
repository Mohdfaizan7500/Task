import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { createContext, useState } from 'react'


export const TaskContext = createContext();

const data = [{
  id: 1,
  title: 'faizan khan',
  description: 'gudgfiustfiuefiue',
  priority: 'medium',
  date: new Date().toISOString().split('T')[0],
  opened: false
},
{
  id: 2,
  title: 'Amaan khan',
  description: 'gudgfiustfiuefiue',
  priority: 'medium',
  date: new Date().toISOString().split('T')[0],
  opened: false

},
{
  id: 3,
  title: 'Talha khan',
  description: 'gudgfiustfiuefiue',
  priority: 'medium',
  date: new Date().toISOString().split('T')[0],
  opened: false
},

]

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([...data])

  const addTask = (task) => {
    setTasks([...tasks, task])
    Alert.alert('Inform', 'Add successfully.')
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => task.id === id ? updatedTask : task));
  }

  const openCoomponent = (ind, item) => {
    console.log(ind, item)

    console.log("Context page")
    console.log(ind, item)
    let tempData = tasks
    tempData.map((item, index => {
      if (index == ind) {
        item.open = true
      }
      else {
        item.open = false
      }
    }))
    let temp = []
    tempData.map(item => {
      temp.push(item)
    })
    setTasks(temp)

  }

  const deleteTask = (id) => setTasks(tasks.filter(task => task.id !== id));

  const searchTasks = (query) =>
    tasks.filter(task =>
      task.title.toLowerCase().includes(query.toLowerCase()) ||
      task.description.toLowerCase().includes(query.toLowerCase())
    );
  return (
    <TaskContext value={{ tasks, addTask, updateTask, deleteTask, searchTasks, openCoomponent }}>
      {children}
    </TaskContext>
  )
}

