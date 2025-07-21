import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { Swipeable } from 'react-native-gesture-handler';


const RenderItemList = ({ item, index, onComponentOpen }) => {
    const ref = useRef();

    const toggleTaskModal = (item) => {
        setModalData(item);
        setVisible(!visible);
    };

    const toggleComplete = (task) => {
        setLoader(true);
        updateTask(task.id, { ...task, isDone: !task.isDone });
        setLoader(false);
    };

    const closeRow = useCallback(() => {
        if (currentlyActiveRow) {
            currentlyActiveRow.close();
            setCurrentlyActiveRow(null);
        }
    }, [currentlyActiveRow]);

    const confirmDelete = (item) => {
        Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", onPress: () => deleteTask(item) },
        ]);
        closeRow();
    };

    const leftSwipe = (item) => (
        <TouchableOpacity
            onPress={() => {
                closeRow();
                navigation.navigate('AddTodo', { task: item });
            }}
            style={styles.leftSwipe}
        >
            <EditIcon name="edit" size={24} color="#fff" />
        </TouchableOpacity>
    );

    const rightSwipe = (item) => (
        <TouchableOpacity
            onPress={() => confirmDelete(item)}
            style={[styles.leftSwipe, styles.rightSwipe]}
        >
            <DeleteIcon name="delete" size={30} color="#fff" />
        </TouchableOpacity>
    );

    useEffect(() => {
        if (item.opened == false) {
            ref.current.close();
        }

    })
    return (
        <Swipeable
            // ref={(ref) => (swipeableRow.current = ref)}
            ref={ref}
            friction={2}
            leftThreshold={30}
            rightThreshold={40}
            renderLeftActions={() => leftSwipe(item)}
            renderRightActions={() => rightSwipe(item)}

            onSwipeableOpen={() => {
                console.log("Open")
                onComponentOpen(index)
            }}
        // onSwipeableWillOpen={() => {
        //   closeRow();
        //   setCurrentlyActiveRow(swipeableRow.current);
        // }}
        // onSwipeableClose={() => {
        //   if (currentlyActiveRow === swipeableRow.current) {
        //     setCurrentlyActiveRow(null);
        //   }
        // }}
        >
            <TouchableOpacity activeOpacity={0.8} onLongPress={() => toggleTaskModal(item)}>
                <View style={[styles.taskCard, item.isDone && styles.completedTask]}>
                    <View style={styles.taskRow}>
                        <Checkbox checked={item.isDone} onPress={() => toggleComplete(item)} />
                        <View style={styles.taskContent}>
                            <View style={styles.taskHeader}>
                                <Text style={[styles.taskTitle, item.isDone && styles.completedText]}>
                                    {item.title}
                                </Text>
                                <PriorityBadge priority={item.priority} />
                            </View>
                            <Text style={styles.taskDate}>Due: {item.duedate}</Text>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode='tail'
                                style={[styles.taskDescription, item.isDone && styles.completedText]}
                            >
                                {item.description}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Swipeable>
    )
};

export default RenderItemList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
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
    taskRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    taskContent: {
        flex: 1,
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
    completedTask: {
        opacity: 0.7,
        backgroundColor: '#f8f8f8',
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#888',
    },
    leftSwipe: {
        backgroundColor: "#3498db",
        width: 70,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
        borderTopStartRadius: 8,
        borderBottomStartRadius: 8,
    },
    rightSwipe: {
        backgroundColor: "#e74c3c",
        borderTopStartRadius: 0,
        borderBottomStartRadius: 0,
        borderTopEndRadius: 8,
        borderBottomEndRadius: 8,
    },
})