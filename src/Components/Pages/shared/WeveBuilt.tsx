import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Typography } from '@mui/material';

import dataArray from "../../../jt-website.json";
import "../../../styles/home.css";

const WeveBuilt: React.FC = () => {
    const { WeveBuilt } = dataArray?.home;
    return (
        <Box className="weveBuilt-section">
            <Container className="weveBuilt-container">
                <Box>
                    <Typography className="weveBuilt-title">
                        {WeveBuilt?.title}
                    </Typography>
                    <Box className="weveBuilt-description-container">
                        <Typography className="weveBuilt-description">
                            {WeveBuilt?.description1}
                        </Typography>
                    <Link to="/our-work" style={{ textDecoration: 'none' }}>
                        <Typography
                            sx={{
                            cursor: 'pointer',
                            fontWeight: 500,
                            fontSize: "18px",
                            color: '#333333',
                            '&:hover': {
                                color: '#347CCC',
                            },
                            }}
                        >
                            {WeveBuilt?.description2}
                        </Typography>
                    </Link>
                    </Box>
                </Box>
                <Grid container spacing={3} className="weveBuilt-main-container">
                    {WeveBuilt?.data?.map((item) => (
                        <Grid size={{ xs: 12, sm:6, md:4 }} key={item?.id} className="weveBuilt-grid-item">
                            <Box className="weveBuilt-card">
                                <img src={item?.imageSrc} alt={item?.title} className="weveBuilt-image" />
                                <Typography className="weveBuilt-text">{item?.title}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}

export default WeveBuilt;
