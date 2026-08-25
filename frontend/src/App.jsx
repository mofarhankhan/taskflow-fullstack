import React, { useEffect, useState } from "react";
import { request } from "./api";

const emptyTask = { title:"", description:"", status:"todo", priority:"medium", due_date:"" };

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));
  const [mode, setMode] = useState("login");
  const [auth, setAuth] = useState({ name:"", email:"", password:"" });
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState(emptyTask);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try { setTasks(await request("/tasks")); } catch (e) { setError(e.message); }
  };
  useEffect(() => { if (user) loadTasks(); }, [user]);

  async function submitAuth(e) {
    e.preventDefault(); setError("");
    try {
      const data = await request(`/auth/${mode === "login" ? "login" : "register"}`, {
        method:"POST", body:JSON.stringify(auth)
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    } catch(e) { setError(e.message); }
  }

  async function saveTask(e) {
    e.preventDefault(); setError("");
    try {
      const path = editing ? `/tasks/${editing}` : "/tasks";
      await request(path, { method: editing ? "PUT" : "POST", body: JSON.stringify(task) });
      setTask(emptyTask); setEditing(null); loadTasks();
    } catch(e) { setError(e.message); }
  }

  async function remove(id) {
    if (!confirm("Delete this task?")) return;
    try { await request(`/tasks/${id}`, { method:"DELETE" }); loadTasks(); }
    catch(e) { setError(e.message); }
  }

  function edit(t) {
    setEditing(t.id);
    setTask({ ...t, due_date: t.due_date ? t.due_date.slice(0,10) : "" });
    window.scrollTo({ top:0, behavior:"smooth" });
  }

  if (!user) return <div className="auth-page"><div className="auth-card">
    <h1>TaskFlow</h1><p>Organize your work. Get things done.</p>
    {error && <div className="error">{error}</div>}
    <form onSubmit={submitAuth}>
      {mode === "register" && <input placeholder="Full name" required value={auth.name} onChange={e=>setAuth({...auth,name:e.target.value})}/>}
      <input type="email" placeholder="Email" required value={auth.email} onChange={e=>setAuth({...auth,email:e.target.value})}/>
      <input type="password" placeholder="Password" required minLength="6" value={auth.password} onChange={e=>setAuth({...auth,password:e.target.value})}/>
      <button>{mode === "login" ? "Login" : "Create Account"}</button>
    </form>
    <button className="link" onClick={()=>{setMode(mode==="login"?"register":"login");setError("");}}>
      {mode==="login" ? "New here? Create an account" : "Already have an account? Login"}
    </button>
  </div></div>;

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t=>t.status==="todo").length,
    progress: tasks.filter(t=>t.status==="in-progress").length,
    done: tasks.filter(t=>t.status==="completed").length
  };

  return <div className="app">
    <header><div><h1>TaskFlow</h1><span>Welcome, {user.name}</span></div>
    <button className="logout" onClick={()=>{localStorage.clear();setUser(null);}}>Logout</button></header>
    <main>
      <section className="stats">
        <div><b>{stats.total}</b><span>Total Tasks</span></div>
        <div><b>{stats.todo}</b><span>To Do</span></div>
        <div><b>{stats.progress}</b><span>In Progress</span></div>
        <div><b>{stats.done}</b><span>Completed</span></div>
      </section>
      {error && <div className="error">{error}</div>}
      <section className="panel">
        <h2>{editing ? "Edit Task" : "Create New Task"}</h2>
        <form className="task-form" onSubmit={saveTask}>
          <input placeholder="Task title" required value={task.title} onChange={e=>setTask({...task,title:e.target.value})}/>
          <textarea placeholder="Description" value={task.description||""} onChange={e=>setTask({...task,description:e.target.value})}/>
          <select value={task.status} onChange={e=>setTask({...task,status:e.target.value})}><option value="todo">To Do</option><option value="in-progress">In Progress</option><option value="completed">Completed</option></select>
          <select value={task.priority} onChange={e=>setTask({...task,priority:e.target.value})}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select>
          <input type="date" value={task.due_date||""} onChange={e=>setTask({...task,due_date:e.target.value})}/>
          <button>{editing ? "Update Task" : "Add Task"}</button>
          {editing && <button type="button" className="cancel" onClick={()=>{setEditing(null);setTask(emptyTask)}}>Cancel</button>}
        </form>
      </section>
      <section className="tasks">
        <h2>Your Tasks</h2>
        {!tasks.length && <p className="empty">No tasks yet. Create your first task above.</p>}
        <div className="grid">{tasks.map(t=><article className="task" key={t.id}>
          <div className="task-head"><h3>{t.title}</h3><span className={`priority ${t.priority}`}>{t.priority}</span></div>
          <p>{t.description || "No description"}</p>
          <div className="meta"><span>{t.status}</span><span>{t.due_date ? `Due: ${String(t.due_date).slice(0,10)}` : "No due date"}</span></div>
          <div className="actions"><button onClick={()=>edit(t)}>Edit</button><button className="danger" onClick={()=>remove(t.id)}>Delete</button></div>
        </article>)}</div>
      </section>
    </main>
  </div>;
}
