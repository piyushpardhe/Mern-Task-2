import { useEffect, useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // add task
  const addTask = async () => {
    if (task === "") return;

    await fetch("http://localhost:5000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: task }),
    });

    setTask("");
    fetchTasks();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>To-Do List</h2>

      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((t) => (
          <li key={t._id}>{t.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

