import React, { useContext, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Alert,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { TaskContext } from '../TaskProvider';


const SwipeableTaskItem = ({ item, onDelete, onEdit }) => {
    const swipeableRef = useRef(null)

    const renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
        });
        return (
            <TouchableOpacity
                style={styles.leftSwipeContainer}
                onPress={() => {
                    Alert.alert(
                        'Delete Task',
                        'Are you sure you want to delete this task?',
                        [
                            {
                                text: 'Cancel',
                                style: 'cancel',
                                onPress: () => swipeableRef.current?.close()
                            },
                            {
                                text: 'Delete',
                                onPress: () => {
                                    onDelete(item.id);
                                    swipeableRef.current?.close();
                                }
                            }
                        ]
                    );
                }}>
                <View style={styles.leftSwipeAction}>
                    <Text style={styles.swipeActionText}>Delete</Text>
                </View>
            </TouchableOpacity>

        )
    }

    const renderRightActions = (progress, dragX) => {
        return (
            <View style={styles.rightSwipeContainer}>
                <TouchableOpacity
                    style={[styles.rightSwipeAction, styles.editAction]}
                    onPress={() => {
                        onEdit(item);
                        swipeableRef.current?.close();
                    }}>
                    <Text style={styles.swipeActionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.rightSwipeAction, styles.deleteAction]}
                    onPress={() => {
                        Alert.alert(
                            'Delete Task',
                            'Are you sure you want to delete this task?',
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel',
                                    onPress: () => swipeableRef.current?.close()
                                },
                                {
                                    text: 'Delete',
                                    onPress: () => {
                                        onDelete(item.id);
                                        swipeableRef.current?.close();
                                    }
                                }
                            ]
                        );
                    }}>
                    <Text style={styles.swipeActionText}>Delete</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <Swipeable
            ref={swipeableRef}
            friction={2}
            leftThreshold={30}
            rightThreshold={40}
            renderLeftActions={renderLeftActions}
            renderRightActions={renderRightActions}>
            <View style={styles.taskItem}>
                <View style={styles.taskContent}>
                    <Text style={styles.taskTitle}>{item.title}</Text>
                    <Text style={styles.taskDescription}>{item.description}</Text>
                    <Text style={styles.taskDate}>{item.date}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.editButton]}
                        onPress={() => onEdit(item)}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={() => {
                            Alert.alert(
                                'Delete Task',
                                'Are you sure you want to delete this task?',
                                [
                                    {
                                        text: 'Cancel',
                                        style: 'cancel'
                                    },
                                    {
                                        text: 'Delete',
                                        onPress: () => onDelete(item.id)
                                    }
                                ]
                            );
                        }}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Swipeable>
    )
}

export default SwipeableTaskItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 10,
    },
    taskItem: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2,
        overflow: 'hidden',
    },
    taskContent: {
        padding: 15,
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    taskDescription: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    taskDate: {
        fontSize: 12,
        color: '#888',
        fontStyle: 'italic',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    actionButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
        marginLeft: 10,
    },
    editButton: {
        backgroundColor: '#3498db',
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    rightSwipeContainer: {
        width: 160,
        flexDirection: 'row',
    },
    rightSwipeAction: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editAction: {
        backgroundColor: '#3498db',
    },
    swipeActionText: {
        color: 'white',
        fontWeight: 'bold',
    },
    deleteAction: {
        backgroundColor: '#e74c3c',
    },
    leftSwipeContainer: {
        width: 80,
        justifyContent: 'center',
    },
    leftSwipeAction: {
        flex: 1,
        backgroundColor: '#e74c3c',
        justifyContent: 'center',
        alignItems: 'center',
    },
})