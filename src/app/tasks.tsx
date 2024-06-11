import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { Input } from "@/components/input";
import { Task } from "@/components/Task";
import { TasksDatabase, useTasksDatabase } from "@/database/useTasksDatabase";
import { useLocalSearchParams } from "expo-router";

export default function TasksList() {
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState<TasksDatabase[]>([]);

  const tasksDatabase = useTasksDatabase();
  const params = useLocalSearchParams();

  async function listTasks() {
    try {
      const response = await tasksDatabase.searchByName(search);
      setTasks(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeTask(id: number) {
    try {
      await tasksDatabase.remove(id);
      await listTasks();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listTasks();
  }, [search, params]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 32,
        paddingVertical: 64,
        gap: 16,
      }}
    >
      <Text style={{ fontSize: 18 }}>Filtro</Text>
      <Input placeholder="Pesquisar" onChangeText={setSearch} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <>
            <Task data={item} onDelete={() => removeTask(item.id)} />
          </>
        )}
        contentContainerStyle={{
          gap: 16,
        }}
      />
    </View>
  );
}
