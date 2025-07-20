import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, firestore } from '../../../firebase/firebaseConfig';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from '@react-native-firebase/firestore';
import { Alert } from 'react-native';


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
    const [task, setTask] = useState([])
    const [loading, setLoding] = useState(false)

    useEffect(() => {
        if (auth.currentUser) {

            const q = query(
                collection(firestore, 'todos'),
                where('userId', '==', auth.currentUser.uid)
            );

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push({ id: doc.id, ...doc.data() });
                });
                setTask(items);
            });
            console.log("unsubscribe: ", unsubscribe)

            return () => unsubscribe();
        }
    }, []);

    const addTask = async (tasks) => {
        console.log(tasks)
        // setLoding(true)
        if (auth.currentUser) {
            try {
                await addDoc(collection(firestore, 'todos'), {

                    title: tasks.title.trim(),
                    createdAt: new Date(),
                    description: tasks.description,
                    duedate: tasks.date,
                    isDone: false,
                    priority: tasks.priority,
                    userId: auth.currentUser.uid,
                });
                // setLoding(false)
                // setTask([...task, tasks])


            } catch (error) {
                // setLoding(false)

                console.log('Error adding todo: ', error);
            }
            finally {
                // setLoding(false)
            }
        }
    };


    const updateTask = async (id, updateditem) => {
        setLoding(true);
        try {
            await updateDoc(doc(firestore, 'todos', id), {
                description: updateditem.description,
                duedate: updateditem.duedate,
                isDone: updateditem.isDone,
                priority: updateditem.priority,
                title: updateditem.title
            });
            setTask(task.map(task => task.id === id ? updateditem : task));
            setLoding(false)
        }
        catch (error) {
            setLoding(false)
            console.log("Error:", error)
        }
        finally {
            setLoding(false)
        }
    }

    const deleteTask = async (item) => {
        // setLoding(true)
        try {
            await deleteDoc(doc(firestore, 'todos', item.id));
            // Alert.alert("Delete Successfully.")
            // setLoding(false)

        }
        catch (error) {
            // setLoding(false)
            console.log("Error:", error)
        }
        finally{
            // setLoding(false)
        }
    };

    const searchTasks = (query) => {
        task.filter(task =>
            task.title.toLowerCase().includes(query.toLowerCase()) ||
            task.description.toLowerCase().includes(query.toLowerCase()) ||
            task.priority.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        )
    };
    return (
        <TodoContext.Provider value={{ task, updateTask, addTask, deleteTask, searchTasks }}>
            { children}
        </TodoContext.Provider>
    )
}

export const useTodo = () => useContext(TodoContext)