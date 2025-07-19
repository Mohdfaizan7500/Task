import React, { createContext, useContext, useState } from 'react'


const TodoContext = createContext();
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
    description: `gudgfiustfiuefiue
    gudgfiustfiuefiue
    gudgfiustfiuefiue
    gudgfiustfiuefiue
    gudgfiustfiuefiue`,
    priority: 'low',
    date: new Date().toISOString().split('T')[0],
    opened: false

},
{
    id: 3,
    title: 'Talha khan',
    description: 'gudgfiustfiuefiue',
    priority: 'high',
    date: new Date().toISOString().split('T')[0],
    opened: false
},

]

export const TodoProvider = ({ children }) => {
    const [task, setTask] = useState([...data])

    const addTask = async (tasks) => {

        // try {
        //     await addDoc(collection(firestore, 'todos'), {


        //         title: task.title.trim(),
        //         date: new Date(),
        //         description: task.description,
        //         duedate: task.duedate,
        //         isDne: false,
        //         priority: task.priority,
        //         userId: auth.currentUser.uid,
        //     });

        // } catch (error) {
        //     console.log('Error adding todo: ', error);
        // }
        setTask([...task, tasks])
        Alert.alert('Inform', 'Add successfully.')
    };

    const updateTask = (id, updatedTask) => {
        setTask(task.map(task => task.id === id ? updatedTask : task));
    }

    const deleteTask = (id) => setTask(task.filter(task => task.id !== id));

    const searchTasks = (query) =>
        task.filter(task =>
            task.title.toLowerCase().includes(query.toLowerCase()) ||
            task.description.toLowerCase().includes(query.toLowerCase()) ||
            task.priority.toLocaleLowerCase().includes(query.toLocaleLowerCase())||
            task.date.includes(query)
        );
    return (
        <TodoContext.Provider value={{ task, updateTask, addTask, deleteTask,searchTasks }}>
            {children}
        </TodoContext.Provider>
    )
}

export const useTodo = () => useContext(TodoContext)