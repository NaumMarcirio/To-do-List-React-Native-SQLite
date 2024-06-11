import { Input } from "@/components/input";
import { Task } from "@/components/Task";

import { Alert, Button, View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useTasksDatabase, TasksDatabase } from "@/database/useTasksDatabase";
import { router } from "expo-router";

export default function Index() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");

  const [quantity, setQuantity] = useState("");
  const [tasks, setTasks] = useState<TasksDatabase[]>([]);

  const tasksDatabase = useTasksDatabase();

  async function create() {
    try {
      if (isNaN(Number(quantity))) {
        return Alert.alert("Quantidade", "A Quantidade precisa ser um número");
      }
      const response = await tasksDatabase.create({
        name,
        quantity: Number(quantity),
      });
      Alert.alert("Tarefa Cadastrada com o ID: " + response.insertedRowId);
    } catch (error) {
      console.log(error);
    }
  }

  async function update() {
    try {
      if (isNaN(Number(quantity))) {
        return Alert.alert("Quantidade", "A Quantidade precisa ser um número");
      }
      const response = await tasksDatabase.update({
        id: Number(id),
        name,
        quantity: Number(quantity),
      });
      Alert.alert("Tarefa Atualizada!");
    } catch (error) {
      console.log(error);
    }
  }

  async function list() {
    try {
      const response = await tasksDatabase.searchByName(search);
      setTasks(response);
    } catch (error) {
      console.log(error);
    }
  }

  function details(item: TasksDatabase) {
    setId(String(item.id));
    setName(item.name);
    setQuantity(String(item.quantity));
  }

  async function handleSave() {
    if (id) {
      update();
    } else {
      create();
    }
    setId("");
    setName("");
    setQuantity("");
    await list();
  }

  async function remove(id: number) {
    try {
      await tasksDatabase.remove(id);
      await list();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    list();
  }, [search]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 32,
        gap: 16,
      }}
    >
      <Input placeholder="Tarefa" onChangeText={setName} value={name} />
      <Input
        placeholder="Quantidade"
        onChangeText={setQuantity}
        value={quantity}
      />
      <Button title="Salvar" onPress={handleSave} />
      <Input placeholder="Pesquisar" onChangeText={setSearch} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Task
            data={item}
            onPress={() => details(item)}
            onDelete={() => remove(item.id)}
            onOpen={() => router.navigate("/details/" + item.id)}
          />
        )}
        contentContainerStyle={{
          gap: 16,
        }}
      />
    </View>
  );
}
