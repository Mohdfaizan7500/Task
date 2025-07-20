import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, firestore } from '../../../firebase/firebaseConfig';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [task, setTask] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (auth.currentUser ) {
            const q = query(
                collection(firestore, 'todos'),
                where('userId', '==', auth.currentUser .uid)
            );

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push({ id: doc.id, ...doc.data() });
                });
                setTask(items);
            });

            return () => unsubscribe();
        }
    }, []);

    const addTask = async (tasks) => {
        if (auth.currentUser ) {
            try {
                await addDoc(collection(firestore, 'todos'), {
                    title: tasks.title.trim(),
                    createdAt: new Date(),
                    description: tasks.description,
                    duedate: tasks.duedate,
                    isDone: false,
                    priority: tasks.priority,
                    userId: auth.currentUser .uid,
                });
            } catch (error) {
                console.log('Error adding todo: ', error);
            }
        }
    };

    const updateTask = async (id, updatedItem) => {
        setLoading(true);
        try {
            await updateDoc(doc(firestore, 'todos', id), {
                description: updatedItem.description,
                duedate: updatedItem.duedate,
                isDone: updatedItem.isDone,
                priority: updatedItem.priority,
                title: updatedItem.title
            });
            setTask(task.map(t => t.id === id ? updatedItem : t));
        } catch (error) {
            console.log("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteTask = async (item) => {
        try {
            await deleteDoc(doc(firestore, 'todos', item.id));
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const searchTasks = (query) => task.filter(t => (
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.description.toLowerCase().includes(query.toLowerCase()) ||
        t.priority.toLowerCase().includes(query.toLowerCase())
    ));

    return (
        <TodoContext.Provider value={{ task, updateTask, addTask, deleteTask, searchTasks }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodo = () => useContext(TodoContext);
