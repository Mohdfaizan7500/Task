import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, firestore } from '../../../firebase/firebaseConfig';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

const TodoContext = createContext();

const data = [
    {
        id: 1,
        title: "Grocery Shopping",
        description: "This task involves creating a comprehensive shopping list for weekly grocery needs. Users can specify items such as fruits (e.g., apples, bananas), vegetables (e.g., carrots, spinach), dairy products (e.g., milk, cheese), and snacks (e.g., chips, granola bars). The task can include a due date for when the shopping should be completed, and users can check off items as they shop. Additionally, users can set reminders to ensure they don’t forget to buy essential items",
        priority: "high",
        isDone: false,
        duedate: "2025-07-20",
        duetime: '10:42 pm',
        opened: false,
        isStop: true,
        notificationId: "",
    },
    {
        id: 2,
        title: "Finish Project Report",
        description: "This task focuses on completing a detailed project report that outlines the objectives, findings, and conclusions of a specific project. Users can include key points that need to be addressed in the report, such as background information, methodology, results, and recommendations. The task can have a deadline for submission, and users can break it down into subtasks for each section (e.g., research, writing, and editing) to manage their time effectively and ensure thoroughness.",
        priority: "medium",
        isDone: false,
        duedate: "2025-07-20",
        duetime: "9:00 pm",
        opened: false,
        isStop: true,
        notificationId: "",
    },
    {
        id: 3,
        title: "Plan Weekend Hike",
        description: "This task involves organizing a hiking trip for the upcoming weekend. Users can specify the hiking location, trail details, and any necessary preparations. The task can include a checklist of items to pack, such as water, snacks, a first aid kit, and appropriate clothing. Users can also set a time to meet with friends or family for the hike, ensuring everyone is on the same page. Additionally, users can research the trail conditions and weather forecast to ensure a safe and enjoyable experience.",
        priority: "low",
        isDone: false,
        duedate: "2025-07-20",
        duetime: "9:00 pm",
        opened: false,
        isStop: true,
        notificationId: "",
    },
    {
        id: 4,
        title: "Schedule Doctor's Appointment",
        description: "This task is about arranging a visit to the doctor for a routine check-up or specific health concerns. Users can include important details such as the doctor's name, contact information, and preferred dates and times for the appointment. The task can also allow users to note any specific health issues they want to discuss during the visit. Setting reminders for follow-up actions, such as calling the doctor's office or preparing questions for the appointment, can help users stay organized and proactive about their health.",
        priority: "high",
        isDone: false,
        duedate: "2025-07-20",
        duetime: "9:00 pm",
        opened: false,
        isStop: true,
        notificationId: "",
    }
];

export const TodoProvider = ({ children }) => {
    const [task, setTask] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
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
                    console.log(items)
                });

                return () => unsubscribe();
            }

        }
        catch (e) {
            console.log("Erroe:", e)

        }
    }, []);

    const addTask = async (tasks) => {

        console.log(tasks)
        if (auth.currentUser) {
            try {
                await addDoc(collection(firestore, 'todos'), {
                    title: tasks.title.trim(),
                    createdAt: new Date(),
                    description: tasks.description,
                    duedate: tasks.duedate,
                    isDone: false,
                    priority: tasks.priority,
                    userId: auth.currentUser.uid,
                    duetime: tasks.duetime,
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

    const ComponentOpen = (id) => {
        console.log('id on TodoProvider:', id)


        // let tempData = task;
        // tempData.map((item, index) => {
        //     if (index == ind) {
        //         item.opened = true;
        //     }
        //     else {
        //         item.opened = false;
        //     }

        // })
        // let temp = [];
        // tempData.map(item => {
        //     temp.push(item)
        // })
        // setTask(temp)
    }
    return (
        <TodoContext.Provider value={{ task, updateTask, addTask, deleteTask, searchTasks, ComponentOpen }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodo = () => useContext(TodoContext);
