import { Alert, FlatList, Keyboard, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Header from '../../components/Header';
import PlusButton from '../../components/PlusButton';
import Checkbox from '../../../../scr2/components/CheckBox';
import { useTodo } from './TodoProvider';
import PriorityBadge from '../../../../scr2/components/PriorityBadge';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import EditIcon from 'react-native-vector-icons/Feather';
import DeleteIcon from 'react-native-vector-icons/MaterialIcons';
import TodoModal from '../../components/TodoModal';
import { Modal } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { ColorPatel } from '../../../../src/assets/ColorPatel';
import { useAuth } from '../Auth/AuthContext';


const TodoList = ({ navigation }) => {
  const { task, updateTask, deleteTask, searchTasks, } = useTodo();

  const swipeableRow = useRef(null);
  const [currentlyActiveRow, setCurrentlyActiveRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [visible, setVisible] = useState(false)
  const [ModalData, setModalData] = useState('')
  const [loader, setLoader] = useState(false)
  const filteredTasks = searchQuery ? searchTasks(searchQuery) : task;




  const toggleTaskmodal = (item) => {
    setModalData(item)
    setVisible(!visible)

  }

  const toggleComplete = (task) => {
    setLoader(true)
    updateTask(task.id, {
      ...task,
      isDone: !task.isDone,
    });
    setLoader(false)

  };

  const closeRow = useCallback(() => {
    if (currentlyActiveRow) {
      currentlyActiveRow.close();
      setCurrentlyActiveRow(null);
    }
  }, [currentlyActiveRow]);

  const confirmDelete = (item) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deleteTask(item) },
      ]
    );
    closeRow();
  };

  const leftSwift = (item) => (
    <TouchableOpacity
      onPress={() => {
        closeRow();
        navigation.navigate('AddTodo', { task: item });
      }}
      style={styles.leftSwift}
    >
      <EditIcon name="edit" size={24} color="#fff" />
    </TouchableOpacity>
  );

  const rightSwift = (item) => (
    <TouchableOpacity
      onPress={() => confirmDelete(item)}
      style={[styles.leftSwift, styles.rightSwift]}
    >
      <DeleteIcon name="delete" size={30} color="#fff" />
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Swipeable
      ref={(ref) => (swipeableRow.current = ref)}
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      renderLeftActions={() => leftSwift(item)}
      renderRightActions={() => rightSwift(item)}
      onSwipeableWillOpen={() => {
        closeRow();
        setCurrentlyActiveRow(swipeableRow.current);
      }}
      onSwipeableClose={() => {
        if (currentlyActiveRow === swipeableRow.current) {
          setCurrentlyActiveRow(null);
        }
      }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onLongPress={() => toggleTaskmodal(item)}>
        <View style={[styles.taskCard, item.isDone && styles.completedTask]}>
          <View style={styles.taskRow}>
            <Checkbox
              checked={item.isDone}
              onPress={() => toggleComplete(item)}
            />
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
                style={[styles.taskDescription, item.isDone && styles.completedText]}>
                {item.description}
              </Text>

            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  const headerSearch = (txt) => {
    setSearchQuery(txt);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header headerSearch={headerSearch}/>
      <View style={{ backgroundColor: "#f5f5f5", flex: 1, padding: 16 }}>
        <GestureHandlerRootView>
          <FlatList
            data={filteredTasks}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={() => (
              <Text style={styles.emptyText}>No tasks found. Add one!</Text>
            )}
          />
        </GestureHandlerRootView>
      </View>
      {
        !isKeyboardVisible &&
        <PlusButton onPress={() => navigation.navigate("AddTodo")} />
      }
      <TodoModal visible={visible} onPress={toggleTaskmodal} item={ModalData} />
      <Modal
        transparent
        visible={loader}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.25)" }}>
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
  leftSwift: {
    backgroundColor: "#3498db",
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderTopStartRadius: 8,
    borderBottomStartRadius: 8,
  },
  rightSwift: {
    backgroundColor: "#e74c3c",
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
  },
});
