import express from "express";
import { db } from "../config/db.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.use(auth);

router.get("/", async (req, res) => {
  try {
    const [tasks] = await db.query(
      "SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC",
      [req.user.id]
    );
    res.json(tasks);
  } catch (error) { res.status(500).json({ message: error.message }); }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, status = "todo", priority = "medium", due_date = null } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });
    const [result] = await db.query(
      "INSERT INTO tasks (user_id,title,description,status,priority,due_date) VALUES (?,?,?,?,?,?)",
      [req.user.id, title, description || null, status, priority, due_date || null]
    );
    const [task] = await db.query("SELECT * FROM tasks WHERE id = ?", [result.insertId]);
    res.status(201).json(task[0]);
  } catch (error) { res.status(500).json({ message: error.message }); }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, description, status, priority, due_date } = req.body;
    const [result] = await db.query(
      `UPDATE tasks SET title=?, description=?, status=?, priority=?, due_date=?
       WHERE id=? AND user_id=?`,
      [title, description || null, status, priority, due_date || null, req.params.id, req.user.id]
    );
    if (!result.affectedRows) return res.status(404).json({ message: "Task not found" });
    const [task] = await db.query("SELECT * FROM tasks WHERE id=?", [req.params.id]);
    res.json(task[0]);
  } catch (error) { res.status(500).json({ message: error.message }); }
});

router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM tasks WHERE id=? AND user_id=?", [req.params.id, req.user.id]);
    if (!result.affectedRows) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (error) { res.status(500).json({ message: error.message }); }
});

router.get("/stats/summary", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT status, COUNT(*) as count FROM tasks WHERE user_id=? GROUP BY status`,
      [req.user.id]
    );
    res.json(rows);
  } catch (error) { res.status(500).json({ message: error.message }); }
});

export default router;
