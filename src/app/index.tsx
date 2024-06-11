import React, { useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { Input } from "@/components/input";
import { useTasksDatabase } from "@/database/useTasksDatabase";

export default function TaskCreation() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const tasksDatabase = useTasksDatabase();

  async function createTask() {
    try {
      if (isNaN(Number(quantity))) {
        return Alert.alert("Quantidade", "A Quantidade precisa ser um número");
      }
      await tasksDatabase.create({
        name,
        quantity: Number(quantity),
      });
      Alert.alert("Tarefa Cadastrada com Sucesso");
      setName("");
      setQuantity("");
    } catch (error) {
      console.log(error);
    }
  }

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
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Cadastre uma Tarefa
      </Text>
      <Input placeholder="Tarefa" onChangeText={setName} value={name} />
      <Input
        placeholder="Quantidade"
        onChangeText={setQuantity}
        value={quantity}
      />
      <Button title="Salvar" onPress={createTask} />
    </View>
  );
}
