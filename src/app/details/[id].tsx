import { useTasksDatabase } from "@/database/useTasksDatabase";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { Text, View } from "react-native";

export default function Details() {
  const tasksDatabase = useTasksDatabase();
  const params = useLocalSearchParams();
  const [data, setData] = useState({
    name: "",
    quantity: 0,
  });

  useEffect(() => {
    if (params.id) {
      tasksDatabase.show(Number(params.id)).then((response) => {
        if (response) {
          setData({
            name: response.name,
            quantity: response.quantity,
          });
        }
      });
    }
  }, [params.id]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 32,
        }}
      >
        ID: {params.id}
      </Text>
      <Text
        style={{
          fontSize: 32,
        }}
      >
        Quantidade: {data.quantity}
      </Text>
      <Text
        style={{
          fontSize: 32,
        }}
      >
        Nome: {data.name}
      </Text>
    </View>
  );
}
