import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { collection, addDoc, query, where, onSnapshot, doc, updateDoc, deleteDoc } from '@react-native-firebase/firestore';
import { auth, firestore } from '../../../firebase/firebaseConfig';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    if (auth.currentUser) {
     
      const q = query(
        collection(firestore, 'todos'),
        where('userId', '==', auth.currentUser.uid)
      );
      console.log("q:",q)
      
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        console.log(items)
        // setTodos(items);
      });
      console.log("unsubscribe: ",unsubscribe)

      // return () => unsubscribe();
    }
  }, []);

  const addTodo = async () => {
    if (newTodo.trim() && auth.currentUser) {
      try {
        await addDoc(collection(firestore, 'todos'), {
          text: newTodo.trim(),
          completed: false,
          createdAt: new Date(),
          userId: auth.currentUser.uid,
        });
        setNewTodo('');
      } catch (error) {
        console.log('Error adding todo: ', error);
      }
    }
  };

  const toggleTodo = async (id, completed) => {
    await updateDoc(doc(firestore, 'todos', id), {
      completed: !completed,
    });
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(firestore, 'todos', id));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add new todo"
        placeholderTextColor={"gray"}
        value={newTodo}
        onChangeText={setNewTodo}
        onSubmitEditing={addTodo}
      />
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity onPress={() => toggleTodo(item.id, item.completed)}>
              <Text style={[styles.todoText, item.completed && styles.completed]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Text style={styles.deleteButton}>×</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <Button title="Sign Out" onPress={() => auth.signOut()} />
    </View>
  );
};

export default TodoApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    color:"black"
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  todoText: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  deleteButton: {
    color: 'red',
    fontSize: 24,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  link: {
    color: 'blue',
    marginTop: 15,
    textAlign: 'center',
  },
});
