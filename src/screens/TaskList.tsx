import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Switch, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const TASKS_STORAGE_KEY = '@tasks';

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load tasks.');
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        Alert.alert('Error', 'Failed to save tasks.');
      }
    };

    saveTasks();
  }, [tasks]);

  const toggleTaskCompletion = (id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? {...task, completed: !task.completed} : task,
      ),
    );
  };

  useEffect(() => {
    if (tasks.length === 0) {
      setTasks([
        {id: 1, name: 'Buy groceries', completed: false},
        {id: 2, name: 'Clean the house', completed: false},
        {id: 3, name: 'Finish React Native project', completed: false},
      ]);
    }
  }, [tasks.length]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task List</Text>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.taskItem}>
            <Switch
              value={item.completed}
              onValueChange={() => toggleTaskCompletion(item.id)}
            />
            <Text
              style={[styles.taskText, item.completed && styles.completedText]}>
              {item.name}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskText: {
    fontSize: 18,
    marginLeft: 8,
  },
  completedText: {
    color: 'gray',
    textDecorationLine: 'line-through',
  },
});

export default TaskList;
