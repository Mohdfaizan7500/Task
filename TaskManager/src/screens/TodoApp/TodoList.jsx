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

const TodoList = ({ navigation }) => {
  const { task, updateTask, deleteTask, searchTasks } = useTodo();
  const swipeableRow = useRef(null);
  const [currentlyActiveRow, setCurrentlyActiveRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const filteredTasks = searchQuery ? searchTasks(searchQuery) : task;


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const toggleComplete = (task) => {
    updateTask(task.id, {
      ...task,
      completed: !task.completed,
    });
  };

  const closeRow = useCallback(() => {
    if (currentlyActiveRow) {
      currentlyActiveRow.close();
      setCurrentlyActiveRow(null);
    }
  }, [currentlyActiveRow]);

  const confirmDelete = (id) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deleteTask(id) },
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
      onPress={() => confirmDelete(item.id)}
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
      <View style={[styles.taskCard, item.completed && styles.completedTask]}>
        <View style={styles.taskRow}>
          <Checkbox
            checked={item.completed}
            onPress={() => toggleComplete(item)}
          />
          <View style={styles.taskContent}>
            <View style={styles.taskHeader}>
              <Text style={[styles.taskTitle, item.completed && styles.completedText]}>
                {item.title}
              </Text>
              <PriorityBadge priority={item.priority} />
            </View>
            <Text style={[styles.taskDescription, item.completed && styles.completedText]}>
              {item.description}
            </Text>
            <Text style={styles.taskDate}>Due: {item.date}</Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );

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
