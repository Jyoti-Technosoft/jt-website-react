const express = require("express");
const fs = require("fs").promises;
const cors = require("cors");

const app = express();
const PORT = 5000;
const FILE_PATH = "./openings.json";

app.use(cors());
app.use(express.json());

app.get("/api/jobs", async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(FILE_PATH, "utf-8"));
    res.json({ jobs: data.jobs || [] });
  } catch (err) {
    res.status(500).json({ message: "Error reading data" });
  }
});

app.post("/api/jobs", async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(FILE_PATH, "utf-8"));
    const newJob = { id: Date.now(), ...req.body };
    data.jobs.push(newJob);
    await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
    res.status(201).json({ message: "Job added", job: newJob });
  } catch (err) {
    res.status(500).json({ message: "Error adding job" });
  }
});

app.put("/api/jobs/:id", async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(FILE_PATH, "utf-8"));
    const id = parseInt(req.params.id);
    const index = data.jobs.findIndex((j) => j.id === id);
    if (index === -1) return res.status(404).json({ message: "Job not found" });

    data.jobs[index] = { ...data.jobs[index], ...req.body };
    await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
    res.json({ message: "Job updated", job: data.jobs[index] });
  } catch (err) {
    res.status(500).json({ message: "Error updating job" });
  }
});

app.delete("/api/jobs/:id", async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(FILE_PATH, "utf-8"));
    const id = parseInt(req.params.id);
    const newJobs = data.jobs.filter((j) => j.id !== id);
    if (newJobs.length === data.jobs.length)
      return res.status(404).json({ message: "Job not found" });

    data.jobs = newJobs;
    await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting job" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://192.168.0.135:${PORT}`);
});
