import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Box, 
  Typography, 
  Container, 
  Chip, 
  Button, 
  useTheme, 
  IconButton,
  CardMedia,
  Grid,
  styled
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import dataArray from '../../jt-website.json';

const StyledCard = styled(Box)(({ theme }) => ({
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: theme.shadows[4],
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
  backgroundColor: theme.palette.background.paper,
}));

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const [project, setProject] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (projectId) {
      const projectIndex = parseInt(projectId);
      const foundProject = dataArray.portfolio[projectIndex];
      
      if (foundProject) {
        setProject(foundProject);
      } else {
        navigate('/our-work');
      }
    }
  }, [projectId, navigate]);

  const handleBack = () => {
    // Check if user came from same page or new tab
    if (window.history.length > 1) {
      navigate(-1); // Go back if there's history
    } else {
      navigate('/our-work'); // Go to our work page if no history (opened in new tab)
    }
  };

  const handleImageNavigation = useCallback((direction: 'prev' | 'next' | number, totalImages: number) => {
    setCurrentImageIndex(prev => {
      if (typeof direction === 'number') {
        return direction;
      } else if (direction === 'prev') {
        return (prev - 1 + totalImages) % totalImages;
      } else {
        return (prev + 1) % totalImages;
      }
    });
  }, []);

  if (!project) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Typography>Loading project details...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Helmet>
        <title>{project.projectName} | Jyoti Technosoft LLP</title>
        <meta name="description" content={`${project.description?.substring(0, 160)}...`} />
      </Helmet>

      <Box
        sx={{
          backgroundColor: '#1F5795',
          py: { xs: 4, md: 6 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
              sx={{
                color: 'white',
                textTransform: 'none',
                fontWeight: 500,
                mb: 3,
                pl: 0,
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                }
              }}
            >
              Back to Our Work
            </Button>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                color: 'white',
                fontSize: { xs: '1.8rem', md: '2.5rem' },
                lineHeight: 1.2,
                maxWidth: '800px',
                mx: 'auto',
                textAlign: 'center',
              }}
            >
              {project.projectName}
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>

        <Grid container spacing={6} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 7 }}>
            <StyledCard>
              <Box
                sx={{
                  position: 'relative',
                  paddingTop: '56.25%', // 16:9 aspect ratio
                  overflow: 'hidden',
                }}
              >
                {project.Images && project.Images.length > 0 ? (
                  <>
                    <CardMedia
                      component="img"
                      image={
                        project.Images && project.Images[currentImageIndex] 
                          ? project.Images[currentImageIndex].startsWith('http') 
                            ? project.Images[currentImageIndex] 
                            : `/${project.Images[currentImageIndex]}`
                          : "/assets/images/portfolio/default.png"
                      }
                      alt={project.projectName}
                      loading="lazy"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        transition: 'transform 0.5s ease',
                        '&:hover': {
                          transform: 'scale(1.03)',
                        }
                      }}
                    />
                    {project.Images.length > 1 && (
                      <>
                        <IconButton
                          size="large"
                          onClick={() => handleImageNavigation('prev', project.Images.length)}
                          disabled={project.Images.length <= 1}
                          aria-label="Previous image"
                          sx={{
                            position: 'absolute',
                            left: 16,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: 'rgba(0,0,0,0.9)',
                            },
                            backdropFilter: 'blur(4px)',
                          }}
                        >
                          <ChevronLeftIcon />
                        </IconButton>
                        <IconButton
                          size="large"
                          onClick={() => handleImageNavigation('next', project.Images.length)}
                          disabled={project.Images.length <= 1}
                          aria-label="Next image"
                          sx={{
                            position: 'absolute',
                            right: 16,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: 'rgba(0,0,0,0.9)',
                            },
                            backdropFilter: 'blur(4px)',
                          }}
                        >
                          <ChevronRightIcon />
                        </IconButton>
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 16,
                            left: 0,
                            right: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 1,
                            px: 2,
                          }}
                        >
                          {project.Images.map((_: any, index: number) => (
                            <Box
                              key={index}
                              onClick={() => handleImageNavigation(index, project.Images.length)}
                              sx={{
                                flex: 1,
                                maxWidth: 60,
                                height: 4,
                                borderRadius: 1,
                                backgroundColor:
                                  currentImageIndex === index
                                    ? 'white'
                                    : 'rgba(255,255,255,0.5)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  backgroundColor: 'white',
                                },
                              }}
                            />
                          ))}
                        </Box>
                      </>
                    )}
                  </>
                ) : (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'grey.100',
                    }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      No image available
                    </Typography>
                  </Box>
                )}
              </Box>
            </StyledCard>

            {(
              <Box sx={{ mt: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: 'text.primary',
                  }}
                >
                  Technologies Used
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {[...(project.mainTechnology || []), ...(project.useTechnology || [])]
                .filter(
                  (tech: any, index: number, self: any[]) =>
                    index === self.findIndex((t) => t.technologyName === tech.technologyName)
                )
                .map((tech: any, idx: number) => (
                  <Chip
                    key={idx}
                    label={tech.technologyName}
                    sx={{
                      px: 2,
                      py: 1,
                      backgroundColor: 'primary.light',
                      color: 'primary.contrastText',
                      fontWeight: 500,
                      '& .MuiChip-label': {
                        px: 1,
                      },
                    }}
                  />
                ))}
                </Box>
              </Box>
            )}
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: 'text.primary',
                }}
              >
                Project Overview
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#333333",
                  lineHeight: 1.8,
                  mb: 3,
                  fontSize: '15px',
                }}
              >
                {project.description}
              </Typography>

              {project.detailedDescription && (
                <Typography
                  variant="body1"
                  sx={{
                    color: "#333333",
                    lineHeight: 1.8,
                    mb: 4,
                    fontSize: '15px',
                  }}
                >
                  {project.detailedDescription}
                </Typography>
              )}

              {project.viewDemo && (
                <Button
                  variant="contained"
                  color="primary"
                  href={project.viewDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1.05rem',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 6px 16px rgba(0,0,0,0.15)`,
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  View Live Demo
                </Button>
              )}
            </Box>

            {project.features && project.features.length > 0 && (
              <StyledCard sx={{ p: { xs: 3, md: 4 } }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: 'text.primary',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      bottom: -8,
                      width: 60,
                      height: 4,
                      backgroundColor: theme.palette.secondary.main,
                      borderRadius: 2,
                    }
                  }}
                >
                  Key Features
                </Typography>
                <Box component="ul" sx={{ pl: 2.5, m: 0 }}>
                  {project.features.map((feature: string, index: number) => (
                    <Box
                      key={index}
                      component="li"
                      sx={{
                        mb: 2,
                        color: 'text.secondary',
                        lineHeight: 1.6,
                        position: 'relative',
                        pl: 3,
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          top: '0.6em',
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: theme.palette.primary.main,
                        }
                      }}
                    >
                      {feature}
                    </Box>
                  ))}
                </Box>
              </StyledCard>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProjectDetail;