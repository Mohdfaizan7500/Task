import { Alert, Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { TaskContext } from '../TaskProvider'
import PriorityBadge from '../components/PriorityBadge';
import { CheckBox } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Checkbox from '../components/CheckBox';

const TaskListScreen2 = ({ navigation }) => {
    const { tasks, deleteTask, searchTasks, updateTask } = useContext(TaskContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const filteredTasks = searchQuery ? searchTasks(searchQuery) : tasks;

    const toggleComplete = (task) => {
        updateTask(task.id, {
            ...task,
            completed: !task.completed
        });
    };
    const confirmDelete = (id) => {
        Alert.alert(
            "Delete Task",
            "Are you sure you want to delete this task?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: () => deleteTask(id) }
            ]
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>My To-Do List 2</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>


            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[
                        styles.taskCard,
                        item.completed && styles.completedTask
                    ]}>
                        <View style={styles.taskRow}>
                            <Checkbox
                                checked={item.completed}
                                onPress={() => toggleComplete(item)}
                            />

                            <View style={styles.taskContent}>
                                <View style={styles.taskHeader}>
                                    <Text style={[
                                        styles.taskTitle,
                                        item.completed && styles.completedText
                                    ]}>
                                        {item.title}
                                    </Text>
                                    <PriorityBadge priority={item.priority} />
                                </View>

                                <Text style={[
                                    styles.taskDescription,
                                    item.completed && styles.completedText
                                ]}>
                                    {item.description}
                                </Text>

                                <Text style={styles.taskDate}>Due: {item.date}</Text>
                            </View>
                        </View>


                        <View style={styles.taskActions}>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.editButton]}
                                onPress={() => navigation.navigate('AddTaskScreen', { task: item })}
                            >
                                <Text style={styles.actionButtonText}>Edit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.actionButton, styles.deleteButton]}
                                onPress={() => confirmDelete(item.id)}
                            >
                                <Text style={styles.actionButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                )}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyText}>No tasks found. Add one!</Text>
                )}
            />
            <TouchableOpacity 
            
                style={styles.addButton}
                onPress={() => navigation.navigate('AddTaskScreen')}
            >
                <Text style={styles.addButtonText}>+ Add Task</Text>
            </TouchableOpacity>
        </SafeAreaView >
    )
}

export default TaskListScreen2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    searchContainer: {
        marginBottom: 16,
    },
    searchInput: {
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    taskCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    taskHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    taskDescription: {
        color: '#666',
        marginBottom: 8,
    },
    taskDate: {
        fontStyle: 'italic',
        marginBottom: 8,
        color: '#888',
    },
    taskActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#888',
    },
    addButton: {
        backgroundColor: '#6200ee',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
        
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    actionButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        marginLeft: 10,
    },
    editButton: {
        backgroundColor: '#3498db',
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
    },
    actionButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    taskRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxContainer: {
        padding: 0,
        margin: 0,
        marginRight: 10,
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    taskContent: {
        flex: 1,
    },
    completedTask: {
        opacity: 0.7,
        backgroundColor: '#f8f8f8',
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
})