import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Pagination, 
  IconButton
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const BASE_URL = "https://jyotitechnosoft.com/assets/backend";
const API_ENDPOINTS = {
  jobs: `${BASE_URL}/jobs.php`,
};

const itemsPerPage = 5;
  type Job = {
    id: number;
    imagePath: string;
    jobName: string;
    jobPost?: string;
    jobDescription: string;
    jobNature: string;
    address: string;
    salary: string;
    technology: string;
    jobCatagory: string;
    openings: number;
    experience: string;
    briefJobDescription: string;
    jobRequirement: string;
  };

  const AdminPortal: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formValues, setFormValues] = useState({
    imagePath: "",
    jobName: "",
    jobPost: "",
    jobDescription: "",
    jobNature: "",
    address: "",
    salary: "",
    technology: "",
    jobCatagory: "",
    openings: 1,
    experience: "",
    briefJobDescription: "",
    jobRequirement: "",
  });

  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / itemsPerPage);


useEffect(() => {
  if (isLoggedIn) {
    axios
      .get(API_ENDPOINTS.jobs)
      .then((res) => {
        console.log("API Response Data:", res.data);
        setJobs(res.data.jobs);
      })
      .catch((err) => {
        console.error("Failed to fetch jobs", err);
      });
  }
}, [isLoggedIn]);

  const handleLogin = () => {
    if (email === "admin@example.com" && password === "password123") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    setEditingJob(null);
    setFormValues({
      imagePath: "",
      jobName: "",
      jobPost: "",
      jobDescription: "",
      jobNature: "",
      address: "",
      salary: "",
      technology: "",
      jobCatagory: "",
      openings: 1,
      experience: "",
      briefJobDescription: "",
      jobRequirement: "",
    });
    setOpenDialog(true);
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormValues({
      imagePath: job.imagePath,
      jobName: job.jobName,
      jobPost: job.jobPost || "",
      jobDescription: job.jobDescription,
      jobNature: job.jobNature,
      address: job.address,
      salary: job.salary,
      technology: job.technology,
      jobCatagory: job.jobCatagory,
      openings: job.openings,
      experience: job.experience,
      briefJobDescription: job.briefJobDescription,
      jobRequirement: job.jobRequirement,
    });
    setOpenDialog(true);
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`${API_ENDPOINTS.jobs}?id=${id}`)
      .then(() => setJobs(jobs.filter((job) => job.id !== id)))
      .catch((err) => console.error("Delete failed", err));
  };

  const handleDialogSave = () => {
    if (editingJob) {
      axios
        .put(`${API_ENDPOINTS.jobs}?id=${editingJob.id}`, {
          ...editingJob,
          ...formValues,
        })
        .then((response) => {
          const updatedJob = response.data;
          setJobs(jobs.map((j) => (j.id === updatedJob.id ? updatedJob : j)));
          setOpenDialog(false);
        })
        .catch((err) => console.error("Update failed", err));
    } else {
      const newJob = {
        ...formValues,
      };
      axios
        .post(API_ENDPOINTS.jobs, newJob)
        .then((response) => {
          setJobs([...jobs, response.data]);
          setOpenDialog(false);
        })
        .catch((err) => console.error("Add job failed", err));
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: "5rem",
        mb: "5rem",
        width: {
          xs: "100%",
          sm: "95%",
          md: "80%",
          lg: "auto",
        },
      }}
    >
      {!isLoggedIn ? (
        <Box>
          <Typography variant="h5" gutterBottom>
            Admin Login
          </Typography>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography variant="h5" gutterBottom>
            Admin Job Dashboard
          </Typography>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button variant="contained" color="primary" onClick={handleAdd}>
              Add Job
            </Button>
          </Box>
          <Paper style={{ overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Job Name</TableCell>
                  <TableCell>Job Post</TableCell>
                  <TableCell>Nature</TableCell>
                  <TableCell>Salary</TableCell>
                  <TableCell>Experience</TableCell>
                  <TableCell>Technology</TableCell>
                  <TableCell>Openings</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>{job.id}</TableCell>
                    <TableCell>{job.jobName}</TableCell>
                    <TableCell>{job.jobPost}</TableCell>
                    <TableCell>{job.jobNature}</TableCell>
                    <TableCell>{job.salary}</TableCell>
                    <TableCell>{job.experience}</TableCell>
                    <TableCell>{job.technology}</TableCell>
                    <TableCell>{job.openings}</TableCell>
                    <TableCell>{job.jobCatagory}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleEdit(job)}
                        color="primary"
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(job.id)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box display="flex" justifyContent="flex-end" py={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, value) => setCurrentPage(value)}
                color="primary"
              />
            </Box>
          </Paper>

          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>{editingJob ? "Edit Job" : "Add Job"}</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                margin="normal"
                label="Image Path"
                name="imagePath"
                value={formValues.imagePath}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Job Name"
                name="jobName"
                value={formValues.jobName}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Job Post"
                name="jobPost"
                value={formValues.jobPost}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Job Description"
                name="jobDescription"
                value={formValues.jobDescription}
                onChange={handleInputChange}
                multiline
                rows={2}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Nature"
                name="jobNature"
                value={formValues.jobNature}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Address"
                name="address"
                value={formValues.address}
                onChange={handleInputChange}
                multiline
                rows={2}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Salary"
                name="salary"
                value={formValues.salary}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Technology"
                name="technology"
                value={formValues.technology}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Category"
                name="jobCatagory"
                value={formValues.jobCatagory}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Openings"
                name="openings"
                type="number"
                value={formValues.openings}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Experience"
                name="experience"
                value={formValues.experience}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Brief Description (HTML allowed)"
                name="briefJobDescription"
                value={formValues.briefJobDescription}
                onChange={handleInputChange}
                multiline
                rows={3}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Requirements (HTML allowed)"
                name="jobRequirement"
                value={formValues.jobRequirement}
                onChange={handleInputChange}
                multiline
                rows={3}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button variant="contained" onClick={handleDialogSave}>
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Container>
  );
};

export default AdminPortal;
