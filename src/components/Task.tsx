import {
  Pressable,
  PressableProps,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useState } from "react";

type Props = PressableProps & {
  data: {
    name: string;
    quantity: number;
  };
  onDelete: () => void;
};

export function Task({ data, onDelete, ...rest }: Props) {
  const [isChecked, setChecked] = useState(false);
  return (
    <View>
      <Pressable
        style={{
          backgroundColor: "#c6c6c6",
          padding: 24,
          borderRadius: 5,
          gap: 12,
          flexDirection: "row",
        }}
        {...rest}
      >
        <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "#4630EB" : undefined}
        />
        <Text
          style={{
            flex: 1,
          }}
        >
          {data.quantity} - {data.name}
        </Text>
        <TouchableOpacity onPress={onDelete}>
          <MaterialIcons name="delete" size={24} color="#b00000" />
        </TouchableOpacity>
      </Pressable>
    </View>
  );
}
