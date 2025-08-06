import { Alert, Button, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTodo } from './TodoProvider';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker

const AddTodo = ({ navigation, route }) => {
  const { addTask, updateTask } = useTodo();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false); // State for time picker
  const [tempSelectedDate, setTempSelectedDate] = useState('');
  const [tempSelectedTime, setTempSelectedTime] = useState(new Date()); // State for selected time
  const isEdit = route.params?.task;
  const [task, setTask] = useState(
    isEdit ? route.params.task : {
      id: Date.now().toString(),
      title: '',
      description: '',
      priority: 'medium',
      duedate: new Date().toISOString().split('T')[0],
      duetime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })// Add time to task
    }
  );

  useEffect(() => {
    console.log("Add component mounted");
    return () => {
      console.log("Add component unmounted");
    };
  }, []);

  const formatDisplayDate = (dateString) => {
    if (!dateString) return 'Select Date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDisplayTime = (time) => {
    if (!time) return 'Select Time';
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const onDayPress = (day) => {
    setTempSelectedDate(day.dateString);
  };

  const handleConfirmDate = () => {
    setTask({ ...task, duedate: tempSelectedDate });
    setShowCalendar(false);
  };

  const handleConfirmTime = (event, selectedDate) => {
    const currentDate = selectedDate || tempSelectedTime;
    setShowTimePicker(false);
    setTempSelectedTime(currentDate);
    setTask({ ...task, duetime: currentDate }); // Update task with selected time
  };

  const getPriorityButtonStyle = (priorityLevel) => {
    const isSelected = task.priority === priorityLevel;
    return {
      backgroundColor: isSelected ? getPriorityColor(priorityLevel) : '#f0f0f0',
      borderColor: getPriorityColor(priorityLevel),
      borderWidth: isSelected ? 0 : 1
    };
  };

  const getPriorityTextStyle = (priorityLevel) => {
    const isSelected = task.priority === priorityLevel;
    return {
      color: isSelected ? 'white' : getPriorityColor(priorityLevel),
      fontWeight: isSelected ? 'bold' : 'normal'
    };
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: '#ff6b6b',
      medium: '#ffd166',
      low: '#06d6a0'
    };
    return colors[priority];
  };

  const handleSave = () => {
    if (!task.title.trim()) {
      Alert.alert('Validation Error', 'Title is required');
      return;
    }
    if (!task.description.trim()) {
      Alert.alert('Validation Error', 'Description is required');
      return;
    }
    if (!task.duedate) {
      Alert.alert('Validation Error', 'Due Date is required');
      return;
    }
    if (!task.duetime) {
      Alert.alert('Validation Error', 'Due Time is required');
      return;
    }
    isEdit && Alert.alert('Inform', 'Save Changes.');
    isEdit ? updateTask(task.id, task) : addTask(task);
    setTask({
      id: Date.now().toString(),
      title: '',
      description: '',
      priority: 'medium',
      duedate: new Date().toISOString().split('T')[0],
      duetime: new Date(), // Reset time
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>{isEdit ? 'Edit Task' : 'Add New Task'}</Text>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Title*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter task title"
            placeholderTextColor={'gray'}
            value={task.title}
            onChangeText={(text) => setTask({ ...task, title: text })}
          />
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholderTextColor={'gray'}
            placeholder="Enter task description"
            multiline
            value={task.description}
            onChangeText={(text) => setTask({ ...task, description: text })}
          />
          <Text style={styles.label}>Priority</Text>
          <View style={styles.priorityContainer}>
            {['high', 'medium', 'low'].map((level) => (
              <TouchableOpacity
                key={level}
                style={[styles.priorityOption, getPriorityButtonStyle(level)]}
                onPress={() => setTask({ ...task, priority: level })}
              >
                <Text style={[styles.priorityOptionText, getPriorityTextStyle(level)]}>
                  {level.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.label}>Due Date</Text>
          <TouchableOpacity style={styles.dateInput} onPress={toggleCalendar}>
            <Text style={task.duedate ? styles.dateText : styles.placeholderText}>
              {formatDisplayDate(task.duedate)}
            </Text>
            <MaterialIcons name="calendar-today" size={20} color="#6200ee" />
          </TouchableOpacity>
          <Text style={styles.label}>Due Time</Text>
          <TouchableOpacity style={styles.dateInput} onPress={() => setShowTimePicker(true)}>
            <Text style={task.duetime ? styles.dateText : styles.placeholderText}>
              {formatDisplayTime(tempSelectedTime)}
            </Text>
            <MaterialIcons name="access-time" size={20} color="#6200ee" />
          </TouchableOpacity>
        </View>
        <Modal visible={showCalendar} animationType="slide" transparent={true}>
          <View style={styles.calendarModal}>
            <View style={styles.calendarContainer}>
              <Calendar
                onDayPress={onDayPress}
                markedDates={{
                  [tempSelectedDate]: { selected: true, selectedColor: '#6200ee' }
                }}
                theme={{
                  calendarBackground: '#ffffff',
                  selectedDayBackgroundColor: '#6200ee',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#6200ee',
                  arrowColor: '#6200ee',
                }}
              />
              <View style={styles.calendarButtons}>
                <TouchableOpacity
                  style={[styles.calendarButton, styles.cancelButton]}
                  onPress={() => {
                    setTempSelectedDate(task.duedate);
                    setShowCalendar(false);
                  }}
                >
                  <Text style={[styles.calendarButtonText, { color: "black" }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.calendarButton, styles.confirmButton]}
                  onPress={handleConfirmDate}
                >
                  <Text style={styles.calendarButtonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {showTimePicker && (
          <DateTimePicker
            value={tempSelectedTime}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={handleConfirmTime}
          />
        )}
        <View style={styles.formActions}>
          <Button
            title="Cancel"
            color="#ff6b6b"
            onPress={() => navigation.goBack()}
          />
          <Button
            title={isEdit ? "Update Task" : "Add Task"}
            onPress={handleSave}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddTodo;

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
  formContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  multilineInput: {
    minHeight: 80,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  priorityOption: {
    flex: 1,
    padding: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  priorityOptionText: {
    fontWeight: 'bold',
    color: '#333',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  dateText: {
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  calendarModal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  calendarContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  calendarButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  calendarButton: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#d3d3d3',
  },
  confirmButton: {
    backgroundColor: '#6200ee',
  },
  calendarButtonText: {
    fontWeight: 'bold',
    color: "#fff",
  },
});
