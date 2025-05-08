import React from 'react';
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
                        <Typography className="weveBuilt-description">
                            {WeveBuilt?.description2}
                        </Typography>
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
