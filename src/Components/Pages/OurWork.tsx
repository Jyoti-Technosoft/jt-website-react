import React, { useState } from "react";
import {
  Typography,
  Box,
  keyframes,
  Grid,
  CardMedia,
  CardContent,
  Chip,
  Button,
  TablePagination,
  Tooltip,
} from "@mui/material";

import HeaderCommon from "./shared/HeaderCommonPage.tsx";
import FooterCommonPage from "./shared/FooterCommonPage.tsx";
import dataArray from "../../jt-website.json";
import "../../styles/career.css";

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const OurWork: React.FC = () => {
  const logos = dataArray?.clientlogos || [];
  const projects = dataArray?.portfolio.filter((p) => p.projectName) || [];
  const [selectedTech, setSelectedTech] = useState("All");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [imageIndexes, setImageIndexes] = useState({});

  const rawTechnologies =
    dataArray?.portfolio.map((project) => project.technology) || [];
  const uniqueTechnologies = Array.from(new Set(rawTechnologies));

  const filteredProjects =
    selectedTech === "All"
      ? projects
      : projects.filter(
          (project) =>
            project.technology?.toLowerCase() === selectedTech.toLowerCase()
        );

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const paginatedProjects = filteredProjects.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <>
      <HeaderCommon smallTitle="Our Work" page="Explore Our Work" />
      <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, pt: 2, overflow: "hidden" }}>
        <Box sx={{ width: "100%", display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              width: "max-content",
              animation: `${scroll} ${logos.length * 3}s linear infinite`,
            }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <Box
                key={index}
                sx={{
                  minWidth: "120px",
                  flexShrink: 0,
                  mx: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src={logo.imagePath}
                  alt={`Client Logo ${index}`}
                  sx={{
                    width: "180px",
                    height: "60px",
                    objectFit: "contain",
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Typography sx={{ textAlign: "center", mt: 4 }}>
        Some of our work is protected by NDAs, but we’ve prepared demo projects
        to showcase our expertise and quality.
      </Typography>

      <Box
        sx={{
          width: "100%",
          paddingLeft: "6rem",
          paddingRight: "6rem",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            overflowX: "auto",
            mb: 3,
            mt: 2,
            fontSize: "18px",
            borderBottom: "1px solid #ACACAC",
          }}
        >
          {uniqueTechnologies.map((tech, index) => (
            <Button
              key={index}
              onClick={() => {
                setSelectedTech(tech);
                setPage(1);
              }}
              sx={{
                color: "black",
                borderRadius: "unset",
                borderBottom:
                  selectedTech === tech ? "2px solid #1976d2" : "none",
                padding: "8px 16px",
                textTransform: "capitalize",
                fontWeight: selectedTech === tech ? "bold" : "normal",
              }}
            >
              {tech}
            </Button>
          ))}
        </Box>
      </Box>

      <Grid container spacing={4} sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 3 }}>
        {paginatedProjects.map((project, index) => {
          if (!project.projectName) return null;
          const currentImageIndex = imageIndexes.hasOwnProperty(
            project.projectName
          )
            ? imageIndexes[project.projectName]
            : 0;
          const totalImages = project.Images?.length || 1;

          return (
            <Grid size={{ xs: 12 }} key={index}>
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  flexDirection: {
                    xs: "column",
                    md: index % 2 === 0 ? "row" : "row-reverse",
                  },
                  px: {
                    xs: "16px",
                    sm: "24px",
                    md: "32px",
                    lg: "45px",
                  },
                }}
              >
                <Box
                  sx={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: { xs: 240, sm: 360, md: 400 },
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      overflow: "hidden",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={
                        project.Images?.[currentImageIndex] ||
                        "assets/images/portfolio/default.png"
                      }
                      alt={project.projectName}
                      sx={{
                        maxHeight: "100%",
                        width: "auto",
                        objectFit: "contain",
                      }}
                    />
                  </Box>

                  {/* Dots selector below fixed container */}
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                  >
                    {project.Images?.map((_, imgIndex) => (
                      <Box
                        key={imgIndex}
                        sx={{
                          width:
                            currentImageIndex === imgIndex ? "24px" : "10px",
                          height: "10px",
                          borderRadius:
                            currentImageIndex === imgIndex ? "4px" : "50%",
                          backgroundColor:
                            currentImageIndex === imgIndex
                              ? "#1976d2"
                              : "#c4c4c4",
                          margin: "0 4px",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                        onClick={() =>
                          setImageIndexes((prev) => ({
                            ...prev,
                            [project.projectName]: imgIndex,
                          }))
                        }
                      />
                    ))}
                  </Box>
                </Box>

                <CardContent
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    {project.logo && (
                      <Box
                        component="img"
                        src={project.logo}
                        alt={`${project.projectName} Logo`}
                        sx={{ height: 30, mr: 1 }}
                      />
                    )}
                    <Typography variant="h5">{project.projectName}</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2, mt: 2 }}>
                    {project.description}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                    Technologies
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {[
                      ...(project.mainTechnology || []),
                      ...(project.useTechnology || []),
                    ]
                      .filter(
                        (tech, index, self) =>
                          index ===
                          self.findIndex(
                            (t) => t.technologyName === tech.technologyName
                          )
                      )
                      .map((tech, idx) => (
                        <Tooltip title={tech.technologyName} key={idx}>
                          <Chip
                            label={tech.technologyName}
                            size="small"
                            sx={{
                              px: 1,
                              py: 2,
                              border: "1px solid #D9D9D9",
                              width: "calc(25% - 8px)",
                              minWidth: "100px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              cursor: "pointer",
                            }}
                          />
                        </Tooltip>
                      ))}
                  </Box>
                </CardContent>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", pr: "5rem", mt: 2 }}
      >
        <TablePagination
          component="div"
          count={filteredProjects.length}
          page={page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[4, 8, 12]}
          labelRowsPerPage="Projects per page:"
          showFirstButton
          showLastButton
        />
      </Box>
      <FooterCommonPage
        title="Inspired by Our Work? Let’s Create Yours!"
        buttonText="GET IN TOUCH"
      />
    </>
  );
};

export default OurWork;
