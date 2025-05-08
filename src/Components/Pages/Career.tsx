import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  MenuItem,
  TextField,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TablePagination from "@mui/material/TablePagination";

import dataArray from "../../jt-website.json";
import "../../styles/career.css";

const Career: React.FC = () => {
  const [search, setSearch] = useState("");
  const [technology, setTechnology] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const { careerSubTitle, careerSubTitleSecond, items } = dataArray?.careers;
  const jobs = dataArray?.jobs || [];
  const technologies = [...new Set(jobs.map((job) => job.technology))];
  const jobNatures = [...new Set(jobs.map((job) => job.jobNature))];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredJobs = jobs.filter((job) => {
    const searchMatch = job.jobName
      .toLowerCase()
      .includes(search.toLowerCase());
    const techMatch = technology
      ? job.jobName.toLowerCase().includes(technology.toLowerCase())
      : true;
    const typeMatch = type ? job.jobNature === type : true;
    return searchMatch && techMatch && typeMatch;
  });

  const paginatedJobs = filteredJobs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Box className="career-first-section">
        <Box className="career-content">
          <div className="career-first-content">
            <span>Home</span>
            <ChevronRightIcon className="chevron-icon" />
            <span>{"career"}</span>
          </div>
          <Typography className="career-title">
            Shape a Future You’re Proud Of
          </Typography>
          <div className="career-gif"></div>
          <div className="career-wave"></div>
        </Box>
        <Box className="career-image">
          <img src="/assets/career-img.png" alt="Career" />
        </Box>
      </Box>
      <Box className="career-second-section">
        <Box className="career-working-section">
          <Box className="career-title-section">
            <Box maxWidth="lg">
              <Typography className="career-title">{careerSubTitle}</Typography>
            </Box>
          </Box>
          <Box className="career-main-container">
            <Grid container spacing={4}>
              {items.map((item, index) => (
                <Grid size={{ xs: 12, sm:6, md:4 }} key={item.id}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box className={`career-item-container color-${index % 6}`}>
                      <Box
                        component="img"
                        src={item.imageUrl}
                        alt={item.title}
                        className="item-image"
                      />
                    </Box>
                    <Typography className="item-title">{item.title}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        <Box className="career-role-section">
          <Box className="career-title-section">
            <Box maxWidth="lg">
              <Typography className="career-title">
                {careerSubTitleSecond}
              </Typography>
            </Box>
          </Box>
          <Box className="job-container">
            <Box className="job-filters" mb={4}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm:6 }}>
                  <TextField
                    className="job-search"
                    variant="outlined"
                    placeholder="Search"
                    size="small"
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 6, sm:3 }}>
                  <TextField
                    className="job-dropdown"
                    select
                    label="Technology"
                    size="small"
                    fullWidth
                    value={technology}
                    onChange={(e) => setTechnology(e.target.value)}
                  >
                    <MenuItem value="">All</MenuItem>
                    {technologies.map((tech) => (
                      <MenuItem key={tech} value={tech}>
                        {tech}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs:6, sm:3 }}>
                  <TextField
                    className="job-dropdown"
                    select
                    label="Type"
                    size="small"
                    fullWidth
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <MenuItem value="">All</MenuItem>
                    {jobNatures.map((nature, index) => (
                      <MenuItem key={index} value={nature}>
                        {nature}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Box>

            <Grid container spacing={2.5}>
              {paginatedJobs.map((job) => (
                <Grid size={{ xs: 12, sm:6, md:6, lg:6, xl:6 }} key={job.id}>
                  <Card className="job-card">
                    <CardContent>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography className="job-title">
                          {job.jobName}
                        </Typography>
                        <Link to={`/career-details?job=${job.id}`}>
                          <button className="apply-button">Apply</button>
                        </Link>
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        className="job-detail"
                      >
                        <BusinessCenterIcon sx={{ mr: 1 }} fontSize="small" />
                        <Typography>Experience: {job.experience}</Typography>
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        className="job-detail"
                      >
                        <PeopleAltIcon sx={{ mr: 1 }} fontSize="small" />
                        <Typography>No. of openings: {job.openings}</Typography>
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        className="job-detail"
                      >
                        <AccessTimeIcon sx={{ mr: 1 }} fontSize="small" />
                        <Typography>{job.jobNature}</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <TablePagination
              component="div"
              count={filteredJobs.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[8, 16, 24]}
              labelRowsPerPage="Items Per Page:"
              showFirstButton
              showLastButton
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Career;
