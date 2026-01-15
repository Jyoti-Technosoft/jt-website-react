import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { Helmet } from 'react-helmet-async';
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FooterCommonPage from "./shared/FooterCommonPage.tsx";
import HeaderMainPage from "./shared/HeaderMainPage.tsx";
import dataArray from "../../jt-website.json";
import { API_ENDPOINTS } from "../../config/api.ts";
import "../../styles/career.css";


type Job = {
  id: number;
  imagePath: string;
  jobName: string;
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
  status: string;
};

const Career: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [technology, setTechnology] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(8);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { careerSubTitle, careerSubTitleSecond, items } = dataArray?.careers;
  
  // Memoize expensive computations
  const technologies = useMemo(() => 
    [...new Set(jobs.map((job) => job.technology))], 
    [jobs]
  );
  
  const jobNatures = useMemo(() => 
    [...new Set(jobs.map((job) => job.jobNature))], 
    [jobs]
  );

  // Memoize filtered jobs to prevent unnecessary recalculations
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const statusMatch = job.status === 'active';
      const searchMatch = job.jobName
        .toLowerCase()
        .includes(search.toLowerCase());
      const techMatch = technology ? job.technology
        ?.toLowerCase().trim().includes(technology.toLowerCase().trim())
        : true;
      const typeMatch = type ? job.jobNature === type : true;
      return statusMatch && searchMatch && techMatch && typeMatch;
    });
  }, [jobs, search, technology, type]);

  // Memoize paginated jobs
  const paginatedJobs = useMemo(() => {
    return filteredJobs.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filteredJobs, page, rowsPerPage]);

  const totalPages = useMemo(() => 
    Math.ceil(filteredJobs.length / rowsPerPage), 
    [filteredJobs.length, rowsPerPage]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Memoize API call handler
  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(API_ENDPOINTS.jobs);
      setJobs(response.data.jobs || []);
    } catch (err) {
      setError("Failed to load job listings. Please try again later.");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <>
      <Helmet>
        <title>Careers | Jyoti Technosoft LLP</title>
        <meta name="description" content="Explore career opportunities at Jyoti Technosoft LLP. Join our team of IT professionals." />
        <meta property="og:title" content="Careers | Jyoti Technosoft LLP" />
        <meta property="og:description" content="Explore career opportunities at Jyoti Technosoft LLP. Join our team of IT professionals." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jyotitechnosoft.com/career" />
        <meta property="og:image" content="https://jyotitechnosoft.com/assets/logo192.png" />
        <link rel="canonical" href="https://jyotitechnosoft.com/career" />
      </Helmet>
      <Box className="career">
        {/* <Box className="career-first-section" sx={{ backgroundColor: "#1F5795" }}>
          <Container sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box className="career-content">
              <Box
                className="career-first-content"
                sx={{
                  mt: {
                    xs: 0,
                    sm: 0,
                    md: 3,
                  },
                }}
              >
                <Link component={RouterLink} to="/" className="breadcrumb-link">
                  Home
                </Link>
                <ChevronRightIcon className="chevron-icon" />
                <span>{"career"}</span>
              </Box>
              <Typography
                className="career-title"
                sx={{
                  mt: {
                    xs: 1,
                    sm: 4,
                  },
                }}
              >
                Shape a Future You’re Proud Of
              </Typography>
              <Box className="career-gif"></Box>
            </Box>
            <Box className="career-image" sx={{ py: 3 }}>
              <img
                src="/assets/career-img.png"
                alt="Career"
                style={{
                  borderRadius: "10px",
                }}
              />
            </Box>
          </Container>
        </Box> */}
        <HeaderMainPage
          smallTitle="Career"
          page="Shape a Future You’re Proud Of"
          imageSrc="/assets/career-img.png"
          showGif={true}
        />
        <Box className="career-second-section">
          <Box className="career-working-section">
            <Container>
              <Box className="career-title-section">
                <Box maxWidth="lg" mb={4}>
                  <Typography className="career-title">
                    {careerSubTitle}
                  </Typography>
                  <Typography className="career-subtitle" mt={1}>
                    A culture that supports, inspires, and helps you thrive.
                  </Typography>
                </Box>
              </Box>
              <Box className="career-main-container" mb={4}>
                <Grid container rowSpacing={6} columnSpacing={4}>
                  {items.map((item, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          className={`career-item-container color-${index % 6}`}
                        >
                          <Box
                            component="img"
                            src={item.imageUrl}
                            alt={item.title}
                            className="item-image"
                            loading="lazy"
                          />
                        </Box>
                        <Typography className="item-title">
                          {item.title}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Container>
          </Box>
          <Box className="career-role-section" pb={1}>
            <Container>
              <Box mt={2} className="career-title-section">
                <Box>
                  <Typography className="career-title">
                    {jobs.length > 0
                      ? careerSubTitleSecond
                      : "Join Us in the Future"}
                  </Typography>
                  <Typography className="career-subtitle" mt={1}>
                    {jobs.length > 0
                      ? "Unlock your future with a role that’s built for you."
                      : "Opportunities coming soon."}
                  </Typography>
                </Box>
              </Box>
              <Box className="job-container">
                {loading ? (
                  <Box display="flex" justifyContent="center" alignItems="center" py={8}>
                    <Typography variant="h6" color="text.secondary">
                      Loading job listings...
                    </Typography>
                  </Box>
                ) : error ? (
                  <Box display="flex" flexDirection="column" alignItems="center" py={8}>
                    <Typography variant="h6" color="error" mb={2}>
                      {error}
                    </Typography>
                    <Button 
                      variant="contained" 
                      onClick={fetchJobs}
                      sx={{ backgroundColor: '#F76336', '&:hover': { backgroundColor: '#d94d24' } }}
                    >
                      Retry
                    </Button>
                  </Box>
                ) : jobs.length > 0 ? (
                  <Box className="job-filters" mb={4}>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
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
                      <Grid size={{ xs: 6, sm: 3 }}>
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
                      <Grid size={{ xs: 6, sm: 3 }}>
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
                ) : null}

                <Grid container spacing={2.5}>
                  {jobs.length === 0 ? (
                    <Box className="no-job-card" py={6}>
                      <img
                        src="/assets/oops-img.png"
                        alt="No jobs available"
                        style={{
                          width: "100%",
                          maxWidth: "450px",
                          height: "auto",
                        }}
                        loading="lazy"
                      />
                      <Typography
                        mt={6}
                        className="no-job-header"
                        fontWeight={600}
                        gutterBottom
                      >
                        We’re not hiring right now, but we’d still love to
                        connect!
                      </Typography>
                      <Typography
                        mt={4}
                        className="no-job-text"
                        maxWidth="sm"
                        mb={3}
                      >
                        We’re not hiring at the moment, but we’re always on the
                        lookout for great talent. Share your details, and we’ll
                        reach out when an opportunity comes up!
                      </Typography>
                      <Button className="no-job-button" onClick={() => navigate("/contact")}>
                        Let’s Stay in Touch
                      </Button>
                    </Box>
                  ) : paginatedJobs.length === 0 ? (
                    <Box width="100%" textAlign="center" py={4}>
                      <Typography variant="h6" color="text.secondary">
                        Looks like there are no job opening avaliable right now.
                      </Typography>
                    </Box>
                  ) : (
                    <Grid container spacing={2.5}>
                      {paginatedJobs.map((job) => (
                        <Grid size={{ xs: 12, sm: 6, lg: 6, xl: 6 }} key={job.id}>
                          <Box
                            className="job-card"
                            sx={{
                              minWidth: {
                                md: "545px",
                              },
                            }}
                          >
                            <CardContent>
                              <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                mb={2}
                              >
                                <Typography className="job-title">
                                  {job.jobName}
                                </Typography>
                                <Button
                                  component={RouterLink}
                                  to={`/career-details?job=${job.id}`}
                                  className="apply-button"
                                >
                                  Apply
                                </Button>
                              </Box>
                              <Box
                                display="flex"
                                alignItems="center"
                                className="job-detail"
                              >
                                <BusinessCenterIcon
                                  sx={{ mr: 1 }}
                                  fontSize="small"
                                />
                                <Typography>
                                  Experience: {job.experience}
                                </Typography>
                              </Box>
                              <Box
                                display="flex"
                                alignItems="center"
                                className="job-detail"
                              >
                                <PeopleAltIcon sx={{ mr: 1 }} fontSize="small" />
                                <Typography>
                                  No. of openings: {job.openings}
                                </Typography>
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
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Grid>
              </Box>
              {paginatedJobs.length > 0 && (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mt={4}
                  gap={2}
                  mb={4}
                  sx = {{backgroundColor: "#F5F8FB"}}
                >
                  <IconButton
                    onClick={() => {
                      if (page > 0) setPage((prev) => Math.max(prev - 1, 0));
                    }}
                    sx={{
                      backgroundColor: '#F76336',
                      color: '#fff',
                      width: 36,
                      height: 36,
                      borderRadius: '12px',
                      opacity: totalPages === 0 || page === 0 ? 0.5 : 1,
                      pointerEvents: totalPages === 0 || page === 0 ? 'none' : 'auto',
                      '&:hover': {
                        backgroundColor: '#d94d24',
                      },
                    }}
                  >
                    <ChevronLeftIcon sx={{ fontSize: '20px' }} />
                  </IconButton>
                  {totalPages > 0 &&
                    Array.from({ length: totalPages }).map((_, index) => (
                      <Box
                        key={index}
                        onClick={() => setPage(index)}
                        sx={{
                          width: 14,
                          height: 14,
                          borderRadius: '4px',
                          backgroundColor: page === index ? '#F76336' : '#F2F2F4',
                          cursor: 'pointer',
                          marginRight: 1,
                          transition: 'background 0.2s',
                          display: 'inline-block',
                        }}
                      />
                    ))}
                  <IconButton
                    onClick={() =>
                      setPage((prev) => Math.min(prev + 1, totalPages - 1))
                    }
                    sx={{
                      backgroundColor: '#F76336',
                      color: '#fff',
                      width: 36,
                      height: 36,
                      borderRadius: '12px',
                      opacity:
                        totalPages === 0 || page === totalPages - 1 ? 0.5 : 1,
                      pointerEvents:
                        totalPages === 0 || page === totalPages - 1
                          ? 'none'
                          : 'auto',
                      '&:hover': {
                        backgroundColor: '#d94d24',
                      },
                    }}
                  >
                    <ChevronRightIcon sx={{ fontSize: '20px' }} />
                  </IconButton>
                </Box>
              )}
            </Container>
          </Box>
        </Box>
        <Box mb={2}>
          {paginatedJobs.length > 0 && (
            <FooterCommonPage
              title="Get Notified for Future Job Openings"
              buttonText="Notify me"
              buttonLink="/contact"
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default React.memo(Career);
