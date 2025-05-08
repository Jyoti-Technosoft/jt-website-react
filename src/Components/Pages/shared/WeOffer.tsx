import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

import dataArray from "../../../jt-website.json";
import "../../../styles/home.css";

const WeOffer: React.FC = () => {
    const { WeOffer } = dataArray?.home;
    return (
        <Box className="we-offer-section">
            <Container className="weOffer-container">
                <Box>
                    <Typography className="weOffer-title">
                        {WeOffer?.title}
                    </Typography>
                    <Typography className="weOffer-description">
                        {WeOffer?.description}
                    </Typography>
                </Box>
                <Grid container spacing={3} className="weOffer-main-container">
                    {WeOffer?.data?.map((offer) => (
                        <Grid size={{ xs: 12, sm:6, md:3 }} key={offer?.id}>
                            <Card className="weOffer-card">
                                <CardMedia
                                    component="img"
                                    image={offer?.imageSrc}
                                    alt={offer?.title}
                                    className="weOffer-card-image"
                                />
                                <CardContent style={{ padding: "11px 16px 16px" }}>
                                    <Typography variant="h6" className="weOffer-card-title">
                                        {offer?.title}
                                    </Typography>
                                    <Typography variant="body2" className="weOffer-card-description">
                                        {offer?.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}

export default WeOffer;
