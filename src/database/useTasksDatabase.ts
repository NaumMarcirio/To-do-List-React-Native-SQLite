import { useSQLiteContext } from "expo-sqlite";

export type TasksDatabase = {
  id: number;
  name: string;
  quantity: number;
};

export function useTasksDatabase() {
  const database = useSQLiteContext();

  //função para criar uma tarefa no banco
  async function create(data: Omit<TasksDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO tasks (name, quantity) VALUES ($name, $quantity)"
    );
    try {
      const result = await statement.executeAsync({
        $name: data.name,
        $quantity: data.quantity,
      });
      const insertedRowId = result.lastInsertRowId.toLocaleString();
      return { insertedRowId };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  //função para buscar por nome

  async function searchByName(name: string) {
    try {
      const query = "SELECT * FROM tasks WHERE name LIKE ?";
      const response = await database.getAllAsync<TasksDatabase>(
        query,
        `%${name}%`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  //função para atualizar uma tarefa no banco
  async function update(data: TasksDatabase) {
    const statement = await database.prepareAsync(
      "UPDATE tasks SET name = $name, quantity = $quantity WHERE id = $id"
    );
    try {
      await statement.executeAsync({
        $id: data.id,
        $name: data.name,
        $quantity: data.quantity,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function remove(id: number) {
    try {
      await database.execAsync("DELETE FROM tasks WHERE id = " + id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function show(id: number) {
    try {
      const query = "SELECT * FROM tasks WHERE id = ?";
      const response = await database.getFirstAsync<TasksDatabase>(query, [id]);
      return response;
    } catch (error) {
      throw error;
    }
  }

  return { create, searchByName, update, remove, show };
}
