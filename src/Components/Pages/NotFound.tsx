import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Helmet } from 'react-helmet-async';

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Jyoti Technosoft LLP</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to our homepage." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          py={8}
        >
          <Typography variant="h1" color="primary" sx={{ fontSize: '6rem', fontWeight: 'bold', mb: 2 }}>
            404
          </Typography>
          <Typography component="h2" variant="h2" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4} maxWidth="sm">
            Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
            <Button
              component={Link}
              to="/"
              variant="contained"
              color="primary"
              size="large"
            >
              Go Home
            </Button>
            <Button
              component={Link}
              to="/contact"
              variant="outlined"
              color="primary"
              size="large"
            >
              Contact Us
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default React.memo(NotFound);



