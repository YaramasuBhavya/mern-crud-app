import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // NEW STATES FOR UPDATE
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // ADD OR UPDATE TASK
  const addTask = () => {
    if (task.trim() === "") return;

    if (isEditing) {
      setTasks(
        tasks.map((t) =>
          t.id === editId
            ? {
                ...t,
                text: task,
                dueDate,
              }
            : t
        )
      );

      setIsEditing(false);
      setEditId(null);
    } else {
      const newTask = {
        id: Date.now(),
        text: task,
        dueDate,
        completed: false,
      };

      setTasks([...tasks, newTask]);
    }

    setTask("");
    setDueDate("");
  };

  // DELETE TASK
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // TOGGLE COMPLETE
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  // EDIT TASK
  const editTask = (taskItem) => {
    setTask(taskItem.text);
    setDueDate(taskItem.dueDate);
    setEditId(taskItem.id);
    setIsEditing(true);
  };

  // STATS
  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  // FILTERS
  const filteredTasks = tasks
    .filter((task) =>
      task.text
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((task) => {
      if (filter === "completed")
        return task.completed;

      if (filter === "pending")
        return !task.completed;

      return true;
    });

  return (
    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      {/* NAVBAR */}
      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          fontSize: "24px",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>
          Smart Productivity & Task Manager 🚀
        </span>

        <span
          style={{
            fontSize: "16px",
            color: "#38bdf8",
          }}
        >
          MERN CRUD Project
        </span>
      </div>

      {/* MAIN */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "40px",
        }}
      >
        <div
          style={{
            background: "#1e293b",
            padding: "40px",
            borderRadius: "15px",
            width: "700px",
            boxShadow:
              "0 10px 20px rgba(0,0,0,0.4)",
          }}
        >
          <h1 style={{ textAlign: "center" }}>
            Productivity Dashboard
          </h1>

          {/* STATS */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "30px",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                background: "#334155",
                padding: "20px",
                borderRadius: "10px",
                flex: 1,
                textAlign: "center",
              }}
            >
              <h2>{tasks.length}</h2>
              <p>Total Tasks</p>
            </div>

            <div
              style={{
                background: "#334155",
                padding: "20px",
                borderRadius: "10px",
                flex: 1,
                textAlign: "center",
              }}
            >
              <h2>{completedTasks}</h2>
              <p>Completed Tasks</p>
            </div>
          </div>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              marginBottom: "20px",
            }}
          />

          {/* FILTERS */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <button
              onClick={() => setFilter("all")}
              style={buttonStyle}
            >
              All
            </button>

            <button
              onClick={() =>
                setFilter("completed")
              }
              style={buttonStyle}
            >
              Completed
            </button>

            <button
              onClick={() =>
                setFilter("pending")
              }
              style={buttonStyle}
            >
              Pending
            </button>
          </div>

          {/* INPUT */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <input
              type="text"
              placeholder="Enter task"
              value={task}
              onChange={(e) =>
                setTask(e.target.value)
              }
              style={inputStyle}
            />

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(e.target.value)
              }
              style={inputStyle}
            />

            <button
              onClick={addTask}
              style={buttonStyle}
            >
              {isEditing ? "Update" : "Add"}
            </button>
          </div>

          {/* TASKS */}
          <div>
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                style={{
                  background: "#334155",
                  padding: "15px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <p
                    style={{
                      textDecoration:
                        task.completed
                          ? "line-through"
                          : "none",
                    }}
                  >
                    {task.completed
                      ? "✅"
                      : "📌"}{" "}
                    {task.text}
                  </p>

                  <small
                    style={{
                      color: "#cbd5e1",
                    }}
                  >
                    Due:{" "}
                    {task.dueDate || "No date"}
                  </small>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={() =>
                      toggleComplete(task.id)
                    }
                    style={{
                      background: "#22c55e",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Done
                  </button>

                  {/* EDIT BUTTON */}
                  <button
                    onClick={() =>
                      editTask(task)
                    }
                    style={{
                      background: "orange",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteTask(task.id)
                    }
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  flex: 1,
  padding: "12px",
  borderRadius: "8px",
  border: "none",
};

const buttonStyle = {
  background: "#38bdf8",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default App;