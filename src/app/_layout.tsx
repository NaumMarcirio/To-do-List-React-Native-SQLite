import React from "react";
import { SQLiteProvider } from "expo-sqlite";
import { Tabs } from "expo-router";
import { initializeDatabase } from "@/database/initializeDatabase";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Layout() {
  return (
    <SQLiteProvider databaseName="myDatabase.db" onInit={initializeDatabase}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#2096f2",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Cadastro de Tarefa",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="plus-circle" size={30} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="tasks"
          options={{
            title: "Lista de Tarefas",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="list-ul" size={28} color={color} />
            ),
          }}
        />
      </Tabs>
    </SQLiteProvider>
  );
}
<FontAwesome name="plus-circle" size={24} color="black" />;
