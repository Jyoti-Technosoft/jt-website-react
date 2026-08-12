import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useLocation, useNavigate, useSearchParams, Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useTheme } from "@mui/material/styles";
import Link from "@mui/material/Link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Helmet } from 'react-helmet-async';

import HeaderMainPage from "./shared/HeaderMainPage.tsx";
import FooterCommonPage from "./shared/FooterCommonPage.tsx";
import OptimizedImage from "../OptimizedImageV2.tsx";
import dataArray from "../../jt-website.json";
import "../../styles/career.css";

const OurWork: React.FC = () => {
  const theme = useTheme();
  const projectSectionRef = React.useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const projects = (dataArray?.portfolio.filter((p) => p.projectName) || []).sort((a, b) => (b.priority || 0) - (a.priority || 0));
  
  // Initialize state from URL params or use defaults
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(4);
  const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({});
  const hasInitialized = React.useRef(false);

  // Get all unique technologies from projects in the selected category
  const rawTechnologies = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(project => {
      if (selectedCategory === "All" || project.category.includes(selectedCategory)) {
        (project.mainTechnology || []).forEach(t => techs.add(t.technologyName));
      }
    });
    return Array.from(techs).sort();
  }, [projects, selectedCategory]);

  // Get all categories from the data
  const categories = useMemo(() => dataArray?.portfolioCategories || ["All"], []);
  
  // Filter and sort projects based on selected category and technologies
  const filteredProjects = useMemo(() => {
    // First filter by category
    const categoryFiltered = projects.filter(project => 
      selectedCategory === "All" || project.category.includes(selectedCategory)
    );

    // If no technologies are selected, return all projects in the category
    if (selectedTechs.length === 0) {
      return categoryFiltered;
    }

    // For each project, count how many selected technologies it matches
    const projectsWithMatchCount = categoryFiltered.map(project => {
      const projectTechNames = [
        ...(project.mainTechnology || []).map(t => t.technologyName)
      ];

      const matchedTechs = selectedTechs.filter(selectedTech => 
        projectTechNames.some(
          techName => techName.toLowerCase() === selectedTech.toLowerCase()
        )
      );
      
      return {
        ...project,
        matchedTechs,
        matchCount: matchedTechs.length,
        // Check if it matches all selected technologies
        matchesAll: matchedTechs.length === selectedTechs.length,
        // Check if it matches the most recently selected technology
        matchesLatest: selectedTechs.length > 0 && 
          projectTechNames.some(
            techName => techName.toLowerCase() === selectedTechs[selectedTechs.length - 1].toLowerCase()
          )
      };
    });

    // Filter out projects that don't match any selected technology
    const techFiltered = projectsWithMatchCount.filter(project => project.matchCount > 0);

    // Sort projects by:
    // 1. Projects that match ALL selected technologies
    // 2. Projects that match the most recently selected technology
    // 3. All other matching projects
    return techFiltered.sort((a, b) => {
      // First sort by whether it matches all selected techs
      if (a.matchesAll !== b.matchesAll) {
        return a.matchesAll ? -1 : 1;
      }
      
      // Then sort by whether it matches the latest selected tech
      if (a.matchesLatest !== b.matchesLatest) {
        return a.matchesLatest ? -1 : 1;
      }
      
      // Then sort by number of matching technologies (descending)
      if (a.matchCount !== b.matchCount) {
        return b.matchCount - a.matchCount;
      }
      
      // Finally, maintain original order (by priority) for projects with same match count
      return (b.priority || 0) - (a.priority || 0);
    });
  }, [projects, selectedCategory, selectedTechs]);

  // Initialize state from URL on component mount - only runs once
  useEffect(() => {
    if (hasInitialized.current) return;
    
    const category = searchParams.get('category') || 'All';
    const techs = searchParams.getAll('tech') || [];
    const pageNum = parseInt(searchParams.get('page') || '1');
    
    // Only update state if the URL values are different from current state
    if (categories.includes(category) && category !== selectedCategory) {
      setSelectedCategory(category);
    }
    
    // Update technologies from URL
    if (techs.length > 0) {
      setSelectedTechs(techs);
    }
    
    const newPage = isNaN(pageNum) ? 1 : Math.max(1, pageNum);
    if (newPage !== page) {
      setPage(newPage);
    }
    
    hasInitialized.current = true;
    
    if (projectSectionRef.current) {
      const timer = setTimeout(() => {
        projectSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [categories, page, searchParams, selectedCategory]);

  useEffect(() => {
    if (!hasInitialized.current) return;

    const params = new URLSearchParams();
    
    if (selectedCategory !== 'All') {
      params.set('category', selectedCategory);
    }
    
    // Add all selected technologies to the URL
    selectedTechs.forEach(tech => {
      params.append('tech', tech);
    });
    
    if (page > 1) {
      params.set('page', page.toString());
    }
    
    const newSearch = params.toString();
    const currentSearch = location.search.slice(1);
    
    if (newSearch !== currentSearch) {
      navigate(`?${newSearch}`, { 
        replace: true,
        state: { 
          preventScrollReset: true,
          fromNavigation: true
        }
      });
    }
  }, [selectedCategory, selectedTechs, page, navigate, location.search]);

  const handleCategoryChange = (newCategory: string) => {
    // Only update if category is actually changing
    if (newCategory !== selectedCategory) {
      setSelectedCategory(newCategory);
      // Only reset page, keep selected technologies
      setSelectedTechs([]);
      setPage(1);
      
      // Scroll to projects after a short delay to allow the component to update
      if (projectSectionRef.current) {
        setTimeout(() => {
          projectSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  const handleTechChange = (tech: string) => {
    setSelectedTechs(prevTechs => {
      // Toggle the selected technology
      const newTechs = prevTechs.includes(tech)
        ? prevTechs.filter(t => t !== tech) // Remove if already selected
        : [...prevTechs, tech]; // Add if not selected
      
      setPage(1);
      
      // Scroll to projects after a short delay to allow the component to update
      if (projectSectionRef.current) {
        setTimeout(() => {
          projectSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      
      return newTechs;
    });
  };

  // Memoize paginated projects
  const paginatedProjects = useMemo(() => {
    return filteredProjects.slice(
      (page - 1) * rowsPerPage,
      page * rowsPerPage
    );
  }, [filteredProjects, page, rowsPerPage]);

  const totalPages = useMemo(() => 
    Math.ceil(filteredProjects.length / rowsPerPage), 
    [filteredProjects.length, rowsPerPage]
  );

  // Memoize image navigation handlers
  const handleImageNavigation = useCallback((projectName: string, direction: 'prev' | 'next' | number, totalImages: number) => {
    setImageIndexes((prev) => {
      const currentIndex = prev[projectName] || 0;
      let newIndex: number;
      
      if (typeof direction === 'number') {
        newIndex = direction;
      } else if (direction === 'prev') {
        newIndex = (currentIndex - 1 + totalImages) % totalImages;
      } else {
        newIndex = (currentIndex + 1) % totalImages;
      }
      
      return {
        ...prev,
        [projectName]: newIndex,
      };
    });
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage !== page) {
      setPage(newPage);
      
      // Add scroll behavior when changing pages
      if (projectSectionRef.current) {
        projectSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

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
        imageSrc="/assets/our-work.png"
        showGif={true}
      />
      <Container>
        <Box className="our-work" sx={{ overflow: "hidden" }}>
        <Typography sx={{ textAlign: "center", mt: 8, color: "#1a1a1a" }} ref={projectSectionRef}>
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
                  <ChevronLeftIcon />
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
                  <ChevronRightIcon />
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
                  variant={selectedTechs.includes(tech) ? 'contained' : 'outlined'}
                  onClick={() => handleTechChange(tech)}
                  sx={{
                    textTransform: 'none',
                    borderRadius: '20px',
                    border: '1px solid #D9D9D9 !important',
                    color: selectedTechs.includes(tech) ? "#ffffff" : '#333333',
                    backgroundColor: selectedTechs.includes(tech) 
                      ? theme.palette.primary.main 
                      : 'transparent',
                    '&:hover': {
                      backgroundColor: selectedTechs.includes(tech)
                        ? theme.palette.primary.dark
                        : 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  {tech}
                </Button>
              ))}
            </ButtonGroup>
          </Box>

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
                <Grid size={{ xs: 12 }} key={project.projectId || index}>
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
                        <OptimizedImage
                          src={
                            project.Images?.[currentImageIndex] ||
                            "assets/images/portfolio/default.png"
                          }
                          alt={project.projectName}
                          loading="lazy"
                          sizes="(max-width: 900px) 100vw, 50vw"
                          style={{
                            maxHeight: "100%",
                            maxWidth: "100%",
                            objectFit: "contain",
                            borderRadius: "10px",
                            border: "4px solid #CFCFCF",
                            margin: "auto",
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
                            onClick={() => handleImageNavigation(project.projectName, 'prev', project.Images.length)}
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
                              onClick={() => handleImageNavigation(project.projectName, imgIndex, project.Images.length)}
                            />
                          ))}
                          <IconButton
                            size="small"
                            sx={{ mx: 1 }}
                            onClick={() => handleImageNavigation(project.projectName, 'next', project.Images.length)}
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
                            loading="lazy"
                            sx={{ height: 30, mr: 1 }}
                          />
                        )}
                        <Link
                          component={RouterLink}
                          to={`/our-work/${project.projectId}`}
                          sx={{
                            fontSize: "20px",
                            color: "#333333",
                            fontWeight: 600,
                            cursor: 'pointer',
                            textDecoration: 'none',
                            '&:hover': {
                              color: '#F76336',
                              textDecoration: 'underline',
                            }
                          }}
                        >
                          {project.projectName}
                        </Link>
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
                        {(project.mainTechnology || [])
                          .slice()
                          .sort((a, b) => a.technologyName.localeCompare(b.technologyName))
                          .map((tech) => (
                          <Tooltip
                            title={tech.technologyName}
                            key={tech.technologyName}
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
              onClick={() => handlePageChange(Math.max(page - 1, 1))}
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
                  onClick={() => handlePageChange(index + 1)}
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
              onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
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
      </Box>
      </Container>
      <FooterCommonPage
        title="Inspired by Our Work? Let's Create Yours!"
        buttonText="GET IN TOUCH"
        buttonLink="/contact"
      />
    </>
  );
};

export default React.memo(OurWork);
