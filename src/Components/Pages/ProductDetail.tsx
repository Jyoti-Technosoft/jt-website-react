import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Box, Typography, Button, Grid, Container, Chip, Paper, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import LaunchIcon from "@mui/icons-material/Launch";
import DescriptionIcon from "@mui/icons-material/Description";
import CodeIcon from "@mui/icons-material/Code";

import jtWebsiteData from "../../jt-website.json";

const ProductDetail: React.FC = () => {
  const { productName } = useParams<{ productName: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Find the product from JSON data
  const product = jtWebsiteData.products?.find(
    (p: any) => p.productName.toLowerCase() === productName?.toLowerCase()
  );

  const handleDownload = async (url: string) => {
    try {
      const formattedUrl = url.startsWith('http') 
        ? url 
        : `${window.location.origin}${url}`;
      
      const response = await fetch(formattedUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${product?.productName || 'Brochure'}-Brochure.pdf`; // dynamic filename
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
};

  useEffect(() => {
    if (!product) {
      navigate('/products');
    }
  }, [product, navigate]);

  if (!product) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6">Product not found</Typography>
      </Box>
    );
  }

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (!product.Images || product.Images.length <= 1) return;
    if (direction === 'prev') {
      setCurrentImageIndex((prev) => (prev - 1 + product.Images.length) % product.Images.length);
    } else {
      setCurrentImageIndex((prev) => (prev + 1) % product.Images.length);
    }
  };

  const handleBrochurePreview = () => {
    if (product.brochureUrl) {
      const url = product.brochureUrl.startsWith('http') 
        ? product.brochureUrl 
        : `${window.location.origin}${product.brochureUrl}`;
      window.open(url, '_blank');
    }
  };
  
  return (
    <>
      <Helmet>
        <title>{product.productName} - Jyoti Technosoft LLP</title>
        <meta name="description" content={product.description} />
        <meta name="keywords" content={`${product.productName}, ${product.technology}, ${product.category?.join(', ')}`} />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Back Button */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/products')}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Back to Products
          </Button>
        </Box>

        {/* Product Header */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a' }}>
            {product.productName}
          </Typography>
          
          {/* Category Chips */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3, flexWrap: 'wrap' }}>
            {product.category?.map((cat: string, index: number) => (
              <Chip
                key={index}
                label={cat}
                size="small"
                sx={{
                  backgroundColor: '#347CCC',
                  color: 'white',
                  fontWeight: 500,
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Product Images Gallery */}
        <Box sx={{ position: 'relative', mb: 6, maxWidth: 800, mx: 'auto' }}>
          <Box
            component="img"
            src={product.Images?.[currentImageIndex] ? `/${product.Images[currentImageIndex]}` : "/assets/images/portfolio/default.png"}
            alt={product.productName}
            sx={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: 2,
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            }}
            onError={(e) => {
              console.log('Image failed to load:', product.Images?.[currentImageIndex]);
              e.currentTarget.src = "/assets/images/portfolio/default.png";
            }}
          />

          {/* Image Navigation */}
          {product.Images && product.Images.length > 1 && (
            <>
              <IconButton
                onClick={() => handleImageNavigation('prev')}
                sx={{
                  position: 'absolute',
                  left: 20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.9)',
                  '&:hover': { background: 'white' },
                }}
              >
                <ChevronLeftIcon />
              </IconButton>

              <IconButton
                onClick={() => handleImageNavigation('next')}
                sx={{
                  position: 'absolute',
                  right: 20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.9)',
                  '&:hover': { background: 'white' },
                }}
              >
                <ChevronRightIcon />
              </IconButton>

              {/* Image Indicators */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 20,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: 1,
                }}
              >
                {product.Images.map((_: any, idx: number) => (
                  <Box
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: currentImageIndex === idx ? '#347CCC' : 'rgba(255,255,255,0.6)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  />
                ))}
              </Box>
            </>
          )}
        </Box>

        {/* Product Information */}
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Description */}
            <Paper sx={{ p: 4, mb: 4, borderRadius: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: '#347CCC', display: 'flex', alignItems: 'center', gap: 1 }}>
                <DescriptionIcon />
                About {product.productName}
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 3 }}>
                {product.description}
              </Typography>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#347CCC' }}>
                Detailed Description
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.6, color: '#666' }}>
                {product.detailedDescription}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            {/* Key Features */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#347CCC' }}>
                Key Features
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {product.keyFeatures?.map((feature: string, index: number) => (
                  <Typography key={index} variant="body2" sx={{ py: 0.5 }}>
                    {feature}
                  </Typography>
                ))}
              </Box>
            </Paper>

            {/* Technologies Used */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#347CCC', display: 'flex', alignItems: 'center', gap: 1 }}>
                <CodeIcon />
                Technologies Used
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                {(product.mainTechnology || []).map((tech: any, index: number) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Box
                      component="img"
                      src={tech.images}
                      alt={tech.technologyName}
                      title={tech.technologyName}
                      sx={{
                        width: 48,
                        height: 48,
                        objectFit: 'contain',
                        borderRadius: 2,
                        backgroundColor: 'white',
                        padding: 1,
                        boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease',
                        cursor: 'default',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                        },
                      }}
                    />
                    <Typography variant="caption" sx={{ 
                      fontSize: '0.75rem', 
                      color: '#666',
                      fontWeight: 500,
                      textAlign: 'center',
                    }}>
                      {tech.technologyName}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>

            {/* Quick Actions */}
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#347CCC' }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {product.viewDemo && (
                  <Button
                    variant="contained"
                    startIcon={<LaunchIcon />}
                    href={product.viewDemo}
                    target="_blank"
                    sx={{
                      background: 'linear-gradient(135deg, #347CCC 0%, #2a5ca8 100%)',
                      color: 'white',
                      fontWeight: 600,
                      py: 1.5,
                      px: 3,
                      borderRadius: 2.5,
                      fontSize: '1rem',
                      textTransform: 'none',
                      boxShadow: '0 4px 15px rgba(52, 124, 204, 0.3)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #2a5ca8 0%, #1e4a8a 100%)',
                        boxShadow: '0 6px 20px rgba(52, 124, 204, 0.4)',
                        transform: 'translateY(-2px)',
                      },
                      '&:active': {
                        transform: 'translateY(0)',
                      },
                    }}
                  >
                    View Live Demo
                  </Button>
                )}
                
                {product.brochureUrl && (
                  <Box sx={{ display: 'flex', gap: 2.5, justifyContent: 'center', mt: 2, flexDirection: 'column' }}>
                    <Button
                      variant="outlined"
                      startIcon={<VisibilityIcon />}
                      onClick={handleBrochurePreview}
                      sx={{
                        borderColor: '#347CCC',
                        color: '#347CCC',
                        fontWeight: 600,
                        py: 1.5,
                        px: 3,
                        borderRadius: 2.5,
                        fontSize: '1rem',
                        textTransform: 'none',
                        borderWidth: 2,
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 8px rgba(52, 124, 204, 0.15)',
                        '&:hover': {
                          borderColor: '#2a5ca8',
                          backgroundColor: 'rgba(52, 124, 204, 0.04)',
                          color: '#2a5ca8',
                          boxShadow: '0 4px 12px rgba(52, 124, 204, 0.25)',
                          transform: 'translateY(-2px)',
                        },
                        '&:active': {
                          transform: 'translateY(0)',
                        },
                      }}
                    >
                      Preview Brochure
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      onClick={() => handleDownload(product.brochureUrl)}
                      sx={{
                        borderColor: '#347CCC',
                        color: '#347CCC',
                        fontWeight: 600,
                        py: 1.5,
                        px: 3,
                        borderRadius: 2.5,
                        fontSize: '1rem',
                        textTransform: 'none',
                        borderWidth: 2,
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 8px rgba(52, 124, 204, 0.15)',
                        '&:hover': {
                          borderColor: '#2a5ca8',
                          backgroundColor: 'rgba(52, 124, 204, 0.04)',
                          color: '#2a5ca8',
                          boxShadow: '0 4px 12px rgba(52, 124, 204, 0.25)',
                          transform: 'translateY(-2px)',
                        },
                        '&:active': {
                          transform: 'translateY(0)',
                        },
                      }}
                    >
                      Download Brochure
                    </Button>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProductDetail;
