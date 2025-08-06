import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import Header from '../../components/Header';
import PlusButton from '../../components/PlusButton';
import { useTodo } from './TodoProvider';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import EditIcon from 'react-native-vector-icons/Feather';
import DeleteIcon from 'react-native-vector-icons/MaterialIcons';
import TodoModal from '../../components/TodoModal';
import { Modal, ActivityIndicator } from 'react-native';
import Checkbox from '../../components/CheckBox';
import PriorityBadge from '../../components/PriorityBadge';
import { ColorPatel } from '../../assets/ColorPatel';
import { s } from 'react-native-size-matters';
import { vs } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TodoList = ({ navigation }) => {
  const { task, updateTask, deleteTask, searchTasks } = useTodo();
  const [openRowId, setOpenRowId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState('');
  const [loader, setLoader] = useState(false);
  const swipeableRefs = useRef({}).current;

  const filteredTasks = searchQuery ? searchTasks(searchQuery) : task;

  const toggleTaskModal = (item) => {
    setModalData(item);
    setVisible(!visible);
  };

  const toggleComplete = (task) => {
    setLoader(true);
    updateTask(task.id, { ...task, isDone: !task.isDone });
    setLoader(false);
  };

  const confirmDelete = (item) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => deleteTask(item) },
    ]);
  };

  const handleRowOpen = (rowId) => {
    console.log(rowId)
    console.log(openRowId)
    // Close any previously opened row
    if (openRowId && openRowId !== rowId && swipeableRefs[openRowId]) {
      swipeableRefs[openRowId].close();
    }
    setOpenRowId(rowId);
  };

  const handleRowClose = (rowId) => {
    if (openRowId === rowId) {
      setOpenRowId(null);
    }
  };

  const leftSwipe = (item) => (
    <TouchableOpacity
      onPress={() => {
        if (swipeableRefs[item.id]) {
          swipeableRefs[item.id].close();
        }
        navigation.navigate('AddTodo', { task: item });
      }}
      style={styles.leftSwipe}
    >
      <EditIcon name="edit" size={24} color="#fff" />
    </TouchableOpacity>
  );

  const rightSwipe = (item) => (
    <TouchableOpacity
      onPress={() => {
        if (swipeableRefs[item.id]) {
          swipeableRefs[item.id].close();
        }
        confirmDelete(item);
      }}
      style={[styles.leftSwipe, styles.rightSwipe]}
    >
      <DeleteIcon name="delete" size={30} color="#fff" />
    </TouchableOpacity>
  );

  const RenderItem = ({ item }) => {
    return (
      <Swipeable
        ref={(ref) => { swipeableRefs[item.id] = ref }}
        friction={2}
        leftThreshold={40}
        rightThreshold={40}
        renderLeftActions={() => leftSwipe(item)}
        renderRightActions={() => rightSwipe(item)}
        onSwipeableOpen={() => handleRowOpen(item.id)}
        onSwipeableClose={() => handleRowClose(item.id)}
      // overshootFriction={2}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onLongPress={() => toggleTaskModal(item)}
          onPress={() => {
            // Close row when tapping on it if it's open
            if (openRowId === item.id && swipeableRefs[item.id]) {
              swipeableRefs[item.id].close();
            } else {
              toggleComplete(item);
            }
          }}
          delayPressIn={100} // Helps distinguish between tap and long press
        >
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
            <View style={styles.timeBox}>
              <Icon name="access-alarm" size={15} color="gray" />
              <Text style={styles.time}>{item.duetime}</Text>
            </View>

          </View>

        </TouchableOpacity>

      </Swipeable>
    );
  };

  const headerSearch = (txt) => {
    setSearchQuery(txt);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header headerSearch={headerSearch} />
      <View style={{ backgroundColor: "#f5f5f5", flex: 1, padding: 16 }}>
        <GestureHandlerRootView>
          <FlatList
            data={filteredTasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <RenderItem item={item} />}
            ListEmptyComponent={() => (
              <Text style={styles.emptyText}>No tasks found. Add one!</Text>
            )}
            keyboardShouldPersistTaps="handled"
          />
        </GestureHandlerRootView>
      </View>

      {!isKeyboardVisible && <PlusButton onPress={() => navigation.navigate("AddTodo")} />}
      <TodoModal visible={visible} onPress={toggleTaskModal} item={modalData} />
      <Modal transparent visible={loader}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={ColorPatel.AppColor} size={70} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};


export default TodoList;

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
    marginEnd: 80
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.25)"
  },
  time: {
    color: "gray",
    fontSize: s(10)
  },
  timeBox:{
    flexDirection:"row",
    position:"absolute",
    bottom:vs(10),
    right:s(15),
    gap:5,
    justifyContent:"center",
    alignItems:"center"

  }
});

