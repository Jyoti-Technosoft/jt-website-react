import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import HeaderMainPage from './shared/HeaderMainPage.tsx';
import { API_ENDPOINTS } from '../../config/api.ts';

const NewsletterConfirm: React.FC = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('Confirming your subscription...');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('Invalid confirmation link.');
            return;
        }

        const confirmSubscription = async () => {
            try {
                const response = await axios.get(`${API_ENDPOINTS.newsletterConfirm}?token=${token}`);
                if (response.data.success) {
                    setStatus('success');
                    setMessage(response.data.message || 'Subscription confirmed successfully!');
                } else {
                    setStatus('error');
                    setMessage(response.data.message || 'Failed to confirm subscription.');
                }
            } catch (error) {
                setStatus('error');
                if (axios.isAxiosError(error) && error.response) {
                    setMessage(error.response.data?.message || 'Failed to confirm subscription.');
                } else {
                    setMessage('An unexpected error occurred. Please try again later.');
                }
            }
        };

        confirmSubscription();
    }, [token]);

    return (
        <>
            <Helmet>
                <title>Newsletter Confirmation | Jyoti Technosoft LLP</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <HeaderMainPage
                smallTitle="Newsletter"
                page="Confirmation"
                imageSrc="/assets/contact-img.png"
                showGif={false}
            />

            <Container maxWidth="md">
                <Box sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
                    {status === 'loading' && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <CircularProgress size={60} sx={{ color: '#1f5795', mb: 3 }} />
                            <Typography variant="h5" sx={{ color: '#1f5795' }}>
                                {message}
                            </Typography>
                        </Box>
                    )}

                    {status === 'success' && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeInUp 0.6s ease' }}>
                            <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'success.main', mb: 3 }} />
                            <Typography variant="h3" sx={{ color: '#1f5795', mb: 2, fontWeight: 'bold', fontSize: { xs: '2rem', md: '2.5rem' } }}>
                                You're all set!
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#64748b', mb: 4, maxWidth: '600px' }}>
                                {message}
                            </Typography>
                            <Button component={Link} to="/" variant="contained" sx={{ backgroundColor: '#1f5795', '&:hover': { backgroundColor: '#154173' }, px: 4, py: 1.5 }}>
                                Return to Home
                            </Button>
                        </Box>
                    )}

                    {status === 'error' && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeInUp 0.6s ease' }}>
                            <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main', mb: 3 }} />
                            <Typography variant="h3" sx={{ color: '#1f5795', mb: 2, fontWeight: 'bold', fontSize: { xs: '2rem', md: '2.5rem' } }}>
                                Oops!
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#64748b', mb: 4, maxWidth: '600px' }}>
                                {message}
                            </Typography>
                            <Button component={Link} to="/" variant="contained" sx={{ backgroundColor: '#1f5795', '&:hover': { backgroundColor: '#154173' }, px: 4, py: 1.5 }}>
                                Return to Home
                            </Button>
                        </Box>
                    )}
                </Box>
            </Container>
        </>
    );
};

export default NewsletterConfirm;
