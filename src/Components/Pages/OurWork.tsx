import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  Typography,
  Box,
  keyframes,
  Grid,
  CardMedia,
  CardContent,
  Chip,
  Tooltip,
  Tabs,
  Tab,
  IconButton,
  useMediaQuery,
  Container,
  Button,
  ButtonGroup
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Helmet } from 'react-helmet';

import HeaderMainPage from "./shared/HeaderMainPage.tsx";
import FooterCommonPage from "./shared/FooterCommonPage.tsx";
import dataArray from "../../jt-website.json";
import "../../styles/career.css";

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const OurWork: React.FC = () => {
  const theme = useTheme();
  const projectSectionRef = React.useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const logos = dataArray?.clientlogos || [];
  const projects = (dataArray?.portfolio.filter((p) => p.projectName) || []).sort((a, b) => (b.priority || 0) - (a.priority || 0));
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTech, setSelectedTech] = useState<string>("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [imageIndexes, setImageIndexes] = useState({});

  // Get all unique technologies from projects in the selected category
  const rawTechnologies = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(project => {
      if (selectedCategory === "All" || project.category.includes(selectedCategory)) {
        project.typesOfTechnologies?.forEach(tech => techs.add(tech));
      }
    });
    return Array.from(techs).sort();
  }, [projects, selectedCategory]);

  // Get all categories from the data
  const categories = dataArray?.portfolioCategories || ["All"];
  
  // Filter projects based on selected category and technology
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = selectedCategory === "All" || 
        project.category.includes(selectedCategory);
        
      // If no technology is selected, show all projects in the category
      const matchesTech = !selectedTech || 
        project.typesOfTechnologies?.some(
          tech => tech.toLowerCase() === selectedTech.toLowerCase()
        );
      return matchesCategory && matchesTech;
    });
  }, [projects, selectedCategory, selectedTech]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    if (projectSectionRef.current) {
      projectSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [page]);

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    setSelectedTech("");
    setPage(1);
  };

  const handleTechChange = (tech: string) => {
    // Toggle the selected technology
    setSelectedTech(prevTech => prevTech === tech ? '' : tech);
    setPage(1);
  };

  const paginatedProjects = filteredProjects.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

 const totalPages = Math.ceil(filteredProjects.length / rowsPerPage);

  return (
    <>
      <Helmet>
        <title>Our Work | Jyoti Technosoft LLP</title>
        <meta name="description" content="See our portfolio of successful IT projects and digital solutions delivered by Jyoti Technosoft LLP." />
        <meta property="og:title" content="Our Work | Jyoti Technosoft LLP" />
        <meta property="og:description" content="See our portfolio of successful IT projects and digital solutions delivered by Jyoti Technosoft LLP." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jyotitechnosoft.com/our-work" />
        <meta property="og:image" content="https://jyotitechnosoft.com/assets/logo192.png" />
        <link rel="canonical" href="https://jyotitechnosoft.com/our-work" />
      </Helmet>
      <HeaderMainPage
        smallTitle="Our Work"
        page="Solutions That Drive Success"
        imageSrc="/assets/our-work-img.png"
        showGif={true}
      />
      <Container>
        <Box className="our-work" sx={{ pt: 8, overflow: "hidden" }}>
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
        <Typography sx={{ textAlign: "center", mt: 8, color: "#333333" }} ref={projectSectionRef}>
          Some of our work is protected by NDAs, but we've prepared demo
          projects to showcase our expertise and quality.
        </Typography>

        <Box sx={{ mt: 4, mb: 3 }}>
          {/* Category Tabs */}
          <Box margin={isMobile ? "auto" : "0"} className="ourTechnology-main-container">
            {isMobile ? (
              <Box
                className="mobile-tab-navigation"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                mb={4}
              >
                <IconButton
                  onClick={() => {
                    const currentIndex = categories.indexOf(selectedCategory);
                    if (currentIndex > 0) {
                      handleCategoryChange(categories[currentIndex - 1]);
                    }
                  }}
                  disabled={categories.indexOf(selectedCategory) === 0}
                >
                  <ChevronLeft />
                </IconButton>

                <Tabs
                  value={selectedCategory}
                  onChange={(e, newValue) => handleCategoryChange(newValue)}
                  centered
                  className="technology-tabs"
                >
                  <Tab
                    key={selectedCategory}
                    value={selectedCategory}
                    label={selectedCategory}
                    disableRipple
                    className="technology-tab"
                  />
                </Tabs>

                <IconButton
                  onClick={() => {
                    const currentIndex = categories.indexOf(selectedCategory);
                    if (currentIndex < categories.length - 1) {
                      handleCategoryChange(categories[currentIndex + 1]);
                    }
                  }}
                  disabled={categories.indexOf(selectedCategory) === categories.length - 1}
                >
                  <ChevronRight />
                </IconButton>
              </Box>
            ) : (
              <Box sx={{ mb: 4, py: 2, margin: 0 }}>
                <Tabs
                  value={selectedCategory}
                  onChange={(e, newValue) => {
                    handleCategoryChange(newValue);
                    setPage(1);
                  }}
                  centered
                  className="technology-tabs"
                >
                  {categories.map((category, index) => (
                    <Tab 
                      key={index}
                      label={category} 
                      value={category}
                      disableRipple
                      className="technology-tab"
                    />
                  ))}
                </Tabs>
              </Box>
            )}
          </Box>

          {/* Technology Filters */}
          <Box sx={{ mb: 4, textAlign: 'center', display: 'flex', margin: 0 }}>
            <ButtonGroup
              variant="outlined"
              size={isMobile ? 'small' : 'medium'}
              sx={{
                flexWrap: 'wrap',
                gap: 1,
                justifyContent: 'center',
                '& .MuiButtonGroup-grouped': {
                  borderRadius: '20px !important',
                  margin: '0.25rem',
                },
              }}
            >
              {rawTechnologies.map((tech) => (
                <Button
                  key={tech}
                  variant={selectedTech === tech ? 'contained' : 'outlined'}
                  onClick={() => handleTechChange(tech)}
                  sx={{
                    textTransform: 'none',
                    borderRadius: '20px',
                    border: '1px solid #D9D9D9 !important',
                    color: selectedTech === tech ? "#ffffff" : '#333333',
                    '&.MuiButton-contained': {
                      '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    },
                  }}
                >
                  {tech}
                </Button>
              ))}
            </ButtonGroup>
          </Box>

          {/* <Box
            margin={isMobile ? "auto" : "0"}
          >
            {isMobile && (
              <Box
                className="mobile-tab-navigation"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                mb={2}
              >
                <IconButton
                  onClick={() => {
                    const currentIndex = categories.indexOf(selectedCategory);
                    if (currentIndex > 0) {
                      handleCategoryChange(categories[currentIndex - 1]);
                    }
                  }}
                  disabled={categories.indexOf(selectedCategory) === 0}
                >
                  <ChevronLeft />
                </IconButton>

                <Typography variant="h6" sx={{ px: 2 }}>
                  {selectedCategory}
                </Typography>

                <IconButton
                  onClick={() => {
                    const currentIndex = categories.indexOf(selectedCategory);
                    if (currentIndex < categories.length - 1) {
                      handleCategoryChange(categories[currentIndex + 1]);
                    }
                  }}
                  disabled={categories.indexOf(selectedCategory) === categories.length - 1}
                >
                  <ChevronRight />
                </IconButton>
              </Box>
            )}
          </Box> */}
        </Box>
        <Box>
          <Grid container spacing={6} sx={{ py: 3 }}>
            {paginatedProjects.map((project, index) => {
              if (!project.projectName) return null;
              const currentImageIndex = imageIndexes.hasOwnProperty(
                project.projectName
              )
                ? imageIndexes[project.projectName]
                : 0;
              // const totalImages = project.Images?.length || 1;

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
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: "100%", md: "50%" },
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
                            borderRadius: "10px",
                            border: "4px solid #CFCFCF",
                            margin: "auto",
                            loading: "lazy"
                          }}
                        />
                      </Box>

                      {/* Slider dots with left/right arrows below the image */}
                      {project.Images && project.Images.length > 1 && (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            mt: 2,
                          }}
                        >
                          <IconButton
                            size="small"
                            sx={{ mx: 1 }}
                            onClick={() => {
                              setImageIndexes((prev) => ({
                                ...prev,
                                [project.projectName]:
                                  (currentImageIndex - 1 + project.Images.length) % project.Images.length,
                              }));
                            }}
                            disabled={project.Images.length <= 1}
                            aria-label="Previous image"
                          >
                            <ChevronLeftIcon />
                          </IconButton>
                          {project.Images?.map((_, imgIndex) => (
                            <Box
                              key={imgIndex}
                              sx={{
                                width:
                                  currentImageIndex === imgIndex
                                    ? "24px"
                                    : "10px",
                                height: "10px",
                                borderRadius:
                                  currentImageIndex === imgIndex ? "4px" : "50%",
                                backgroundColor:
                                  currentImageIndex === imgIndex
                                    ? "#F76336"
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
                          <IconButton
                            size="small"
                            sx={{ mx: 1 }}
                            onClick={() => {
                              setImageIndexes((prev) => ({
                                ...prev,
                                [project.projectName]:
                                  (currentImageIndex + 1) % project.Images.length,
                              }));
                            }}
                            disabled={project.Images.length <= 1}
                            aria-label="Next image"
                          >
                            <ChevronRightIcon />
                          </IconButton>
                        </Box>
                      )}
                    </Box>
                    <CardContent
                      sx={{
                        flex: 1,
                        width: { xs: "100%", md: "50%" },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        px: { xs: 1, sm: 2 },
                        pt: { xs: 2, sm: 2 },
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        {project.logo && (
                          <Box
                            component="img"
                            src={project.logo}
                            alt={`${project.projectName} Logo`}
                            sx={{ height: 30, mr: 1 }}
                          />
                        )}
                        <Typography
                          sx={{
                            fontSize: "20px",
                            color: "#333333",
                            fontWeight: 600,
                          }}
                        >
                          {project.projectName}
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          mb: 2,
                          mt: 2,
                          fontSize: "15px",
                          color: "#333333",
                          fontWeight: 400,
                        }}
                      >
                        {project.description}
                      </Typography>
                      <Typography
                        sx={{
                          mt: 2,
                          mb: 2,
                          fontSize: "18px",
                          color: "#333333",
                        }}
                      >
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
                            <Tooltip
                              title={tech.technologyName}
                              key={idx}
                              slotProps={{
                                popper: {
                                  modifiers: [
                                    {
                                      name: "offset",
                                      options: {
                                        offset: [0, -12],
                                      },
                                    },
                                  ],
                                },
                              }}
                            >
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
                                  color: "#333333",
                                  backgroundColor: "#F7F7F7",
                                }}
                              />
                            </Tooltip>
                          ))}
                      </Box>
                      {project.viewDemo && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mt: 4,
                            cursor: "pointer",
                            color: "#F76336",
                            fontWeight: 500,
                          }}
                          onClick={() =>
                            window.open(project.viewDemo, "_blank")
                          }
                        >
                          <Typography
                            variant="body2"
                            sx={{ mr: 1, fontWeight: 500 }}
                          >
                            Preview
                          </Typography>
                          <Box component="span" sx={{ fontSize: "1rem" }}>
                            ➜
                          </Box>
                        </Box>
                      )}
                    </CardContent>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
        {filteredProjects.length > 0 && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={4}
            gap={2}
            mb={4}
          >
            <IconButton
              onClick={() => {
                if (page > 1) setPage((prev) => Math.max(prev - 1, 1));
              }}
              sx={{
                backgroundColor: "#F76336",
                color: "#fff",
                width: 36,
                height: 36,
                borderRadius: "12px",
                opacity: totalPages === 0 || page === 1 ? 0.5 : 1,
                pointerEvents: totalPages === 0 || page === 1 ? "none" : "auto",
                "&:hover": {
                  backgroundColor: "#d94d24",
                },
              }}
            >
              <ChevronLeftIcon sx={{ fontSize: "20px" }} />
            </IconButton>
            {totalPages > 0 &&
              Array.from({ length: totalPages }).map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setPage(index + 1)}
                  sx={{
                    width: 14,
                    height: 14,
                    borderRadius: "4px",
                    backgroundColor: page === index + 1 ? "#F76336" : "#F2F2F4",
                    cursor: "pointer",
                    marginRight: 1,
                  }}
                />
              ))}
            <IconButton
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              sx={{
                backgroundColor: "#F76336",
                color: "#fff",
                width: 36,
                height: 36,
                borderRadius: "12px",
                opacity: totalPages === 0 || page === totalPages ? 0.5 : 1,
                pointerEvents:
                  totalPages === 0 || page === totalPages ? "none" : "auto",
                "&:hover": {
                  backgroundColor: "#d94d24",
                },
              }}
            >
              <ChevronRightIcon sx={{ fontSize: "20px" }} />
            </IconButton>
          </Box>
        )}
      </Container>
      <FooterCommonPage
        title="Inspired by Our Work? Let's Create Yours!"
        buttonText="GET IN TOUCH"
        buttonLink="/contact"
      />
    </>
  );
};

export default OurWork;
