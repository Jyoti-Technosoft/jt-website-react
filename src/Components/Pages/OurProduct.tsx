import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useTheme } from "@mui/material/styles";
import Link from "@mui/material/Link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { alpha, styled } from '@mui/material/styles';

import HeaderMainPage from "./shared/HeaderMainPage.tsx";
import FooterCommonPage from "./shared/FooterCommonPage.tsx";
import dataArray from "../../jt-website.json";
import "../../styles/career.css";

// Type definitions for product data
interface Technology {
  images: string;
  technologyName: string;
}

interface Product {
  productName: string;
  productId: number;
  priority: number;
  technology: string;
  category: string[];
  typesOfTechnologies: string[];
  description: string;
  detailedDescription: string;
  logo: string;
  viewDemo: string;
  brochureUrl: string;
  Images: string[];
  mainTechnology: Technology[];
  useTechnology: Technology[];
  keyFeatures: string[];
}

interface JTWebsiteData {
  products?: Product[];
  clientlogos?: Array<{
    imagePath: string;
  }>;
}

const ProductCard = styled(Box)(({ theme }) => ({
  background: 'white',
  borderRadius: theme.spacing(3),
  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
  }
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
  }
}));

const OurProduct: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const data = dataArray as JTWebsiteData;
  const products = (data?.products?.filter((p: Product) => p.productName) || []).sort((a: Product, b: Product) => (b.priority || 0) - (a.priority || 0));
  
  // Initialize state from URL params or use defaults
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(6);
  const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({});
  const hasInitialized = React.useRef(false);

  // Initialize state from URL parameters
  useEffect(() => {
    if (!hasInitialized.current) {
      const pageParam = searchParams.get('page');
      if (pageParam && !isNaN(parseInt(pageParam))) {
        const pageNum = parseInt(pageParam);
        if (pageNum > 0 && pageNum <= Math.ceil(products.length / rowsPerPage)) {
          setPage(pageNum);
        }
      }
      hasInitialized.current = true;
    }
  }, [searchParams, products.length, rowsPerPage]);

  // Update URL when state changes
  useEffect(() => {
    if (!hasInitialized.current) return;
    const params = new URLSearchParams();
    if (page !== 1) {
      params.set('page', page.toString());
    }
    const newUrl = `${location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    if (newUrl !== location.pathname + location.search) {
      navigate(newUrl, { replace: true });
    }
  }, [page, location.pathname, location.search, navigate]);

  // Memoize image navigation handlers
  const handleImageNavigation = useCallback((productName: string, direction: 'prev' | 'next' | number, totalImages: number) => {
    setImageIndexes((prev: Record<string, number>) => {
      const currentIndex = prev[productName] || 0;
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
        [productName]: newIndex,
      };
    });
  }, []);

  // Calculate pagination
  const paginatedProducts = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return products.slice(startIndex, endIndex);
  }, [products, page, rowsPerPage]);

  const totalPages = useMemo(() => Math.ceil(products.length / rowsPerPage), [products.length, rowsPerPage]);

  return (
    <>
      <Helmet>
        <title>Our Products - Jyoti Technosoft LLP</title>
        <meta name="description" content="Explore our innovative products including SiteSync construction management app and Praksis AI-powered educational platform." />
        <meta name="keywords" content="products, software solutions, SiteSync, Praksis, construction management, educational platform" />
      </Helmet>

      <HeaderMainPage 
        page="Discover our innovative software solutions for your business" 
        smallTitle="Our Products"
        imageSrc="/assets/our-product.png"
      />

      {/* Filter Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 600 }}>
            Explore Our Products
          </Typography>
        </Box>

        {/* Products Grid */}
        <Box id="products-section">
          {paginatedProducts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No products found matching your criteria.
              </Typography>
              <Button 
                variant="outlined" 
                onClick={() => setPage(1)}
                sx={{ mt: 2 }}
              >
                Clear Filters
              </Button>
            </Box>
          ) : (
            <Grid container spacing={4}>
              {paginatedProducts.map((product: Product) => {
                const currentImageIndex = imageIndexes[product.productName] || 0;

                return (
                  <Grid size={{ xs: 12, md: 6, lg: 4 }} key={product.productId}>
                    <ProductCard 
                      onClick={() => navigate(`/products/${product.productName.toLowerCase()}`)}
                      sx={{ cursor: 'pointer' }}
                    >
                      {/* Product Image Section */}
                      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                        <CardMedia
                          component="img"
                          image={ product.Images?.[currentImageIndex] || "assets/images/portfolio/default.png" }
                          alt={product.productName}
                          loading="lazy"
                          sx={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                          }}
                        />
                        
                        {/* Image Navigation */}
                        {product.Images && product.Images.length > 1 && (
                          <Box sx={{ 
                            position: 'absolute', 
                            bottom: 10, 
                            left: 0, 
                            right: 0, 
                            display: 'flex', 
                            justifyContent: 'center',
                            gap: 1
                          }}>
                            <IconButton
                              size="small"
                              onClick={() => handleImageNavigation(product.productName, 'prev', product.Images.length)}
                              sx={{ 
                                background: 'rgba(255,255,255,0.9)',
                                '&:hover': { background: 'white' }
                              }}
                            >
                              <ChevronLeftIcon />
                            </IconButton>
                            {product.Images.map((_, idx) => (
                              <Box
                                key={idx}
                                onClick={() => handleImageNavigation(product.productName, idx, product.Images.length)}
                                sx={{
                                  width: currentImageIndex === idx ? 12 : 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  background: currentImageIndex === idx ? 'white' : 'rgba(255,255,255,0.6)',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease',
                                }}
                              />
                            ))}
                            <IconButton
                              size="small"
                              onClick={() => handleImageNavigation(product.productName, 'next', product.Images.length)}
                              sx={{ 
                                background: 'rgba(255,255,255,0.9)',
                                '&:hover': { background: 'white' }
                              }}
                            >
                              <ChevronRightIcon />
                            </IconButton>
                          </Box>
                        )}

                      </Box>

                      {/* Product Content */}
                      <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a' }}>
                            {product.productName}
                          </Typography>
                          
                          <Typography variant="body2" sx={{ 
                            mb: 3, 
                            color: 'text.secondary',
                            lineHeight: 1.6,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}>
                            {product.description}
                          </Typography>

                          {/* Technologies */}
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                              Technologies:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center' }}>
                              {(product.mainTechnology || []).slice(0, 4).map((tech, idx) => (
                                <Box
                                  key={idx}
                                  component="img"
                                  src={tech.images}
                                  alt={tech.technologyName}
                                  title={tech.technologyName}
                                  sx={{
                                    width: 32,
                                    height: 32,
                                    objectFit: 'contain',
                                    borderRadius: 1,
                                    backgroundColor: 'white',
                                    padding: 0.5,
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    transition: 'all 0.2s ease',
                                    cursor: 'default',
                                    '&:hover': {
                                      transform: 'scale(1.1)',
                                      boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                                    },
                                  }}
                                />
                              ))}
                              {(product.mainTechnology || []).length > 4 && (
                                <Typography
                                  variant="caption"
                                  sx={{
                                    fontSize: '0.75rem',
                                    color: '#666',
                                    fontWeight: 500,
                                    alignSelf: 'center',
                                  }}
                                >
                                  +{(product.mainTechnology || []).length - 4} more
                                </Typography>
                              )}
                            </Box>
                          </Box>

                          {/* Key Features */}
                          {product.keyFeatures && product.keyFeatures.length > 0 && (
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                Key Features:
                              </Typography>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {product.keyFeatures.slice(0, 5).map((feature, idx) => (
                                  <Chip
                                    key={idx}
                                    label={feature}
                                    size="small"
                                    sx={{ 
                                      fontSize: '0.7rem',
                                      background: alpha(theme.palette.success.main, 0.1),
                                      color: theme.palette.success.main,
                                    }}
                                  />
                                ))}
                                {product.keyFeatures.length > 5 && (
                                  <Chip
                                    label={`+${product.keyFeatures.length - 5} features`}
                                    size="small"
                                    sx={{ 
                                      fontSize: '0.7rem',
                                      background: alpha(theme.palette.info.main, 0.1),
                                      color: theme.palette.info.main,
                                    }}
                                  />
                                )}
                              </Box>
                            </Box>
                          )}
                        </Box>

                        {/* Action Buttons */}
                        <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
                          {product.viewDemo && (
                            <Link
                              href={product.viewDemo}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{ flex: 1 }}
                            >
                              <ActionButton
                                variant="contained"
                                sx={{ width: '100%' }}
                              >
                                Live Demo
                              </ActionButton>
                            </Link>
                          )}
                          {product.brochureUrl && (
                            <Link
                              href={product.brochureUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{ flex: 1 }}
                            >
                              <ActionButton
                                variant="outlined"
                                sx={{ width: '100%' }}
                              >
                                Brochure
                              </ActionButton>
                            </Link>
                          )}
                        </Box>
                      </CardContent>
                    </ProductCard>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <ButtonGroup variant="outlined">
              <Button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  variant={page === pageNum ? "contained" : "outlined"}
                >
                  {pageNum}
                </Button>
              ))}
              <Button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </ButtonGroup>
          </Box>
        )}
      </Container>
      <FooterCommonPage
        title="Ready to Transform Your Business? Let's Talk!"
        buttonText="GET IN TOUCH"
        buttonLink="/contact"
      />
    </>
  );
};

export default React.memo(OurProduct);
