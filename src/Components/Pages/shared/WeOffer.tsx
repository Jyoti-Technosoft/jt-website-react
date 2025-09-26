import React, { memo, useMemo } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import dataArray from "../../../jt-website.json";
import "../../../styles/home.css";

const WeOffer: React.FC = memo(() => {
    const { WeOffer } = dataArray?.home;
    
    // Memoize the offer data to prevent unnecessary re-renders
    const offerData = useMemo(() => WeOffer?.data || [], [WeOffer?.data]);
    
    return (
        <Box className="we-offer-section">
            <Container className="weOffer-container">
                <Box>
                    <Typography variant="h2" className="weOffer-title">
                        {WeOffer?.title}
                    </Typography>
                    <Typography className="weOffer-description" mt={1}>
                        {WeOffer?.description}
                    </Typography>
                </Box>
                <Grid container spacing={3} className="weOffer-main-container">
                    {offerData.map((offer) => (
                    <Grid size={{ xs: 12, sm:6, md:3 }} key={offer?.id}>
                    <Card className="weOffer-card">
                        <div style={{ display: 'flex', alignItems: 'center'}}>
                        {offer?.imageSrc && (
                            <CardMedia
                            component="img"
                            image={offer.imageSrc}
                            alt={offer.title}
                            className="weOffer-card-image"
                            loading="lazy"
                            style={{ 
                                objectFit: 'contain',
                                imageRendering: 'auto',
                                transform: 'translateZ(0)',
                                backfaceVisibility: 'hidden'
                            }}
                            />
                        )}
                        {offer?.imageSrc1 && (
                            <CardMedia
                            component="img"
                            image={offer.imageSrc1}
                            alt={offer.title + ' (1)'}
                            className="weOffer-card-image1"
                            loading="lazy"
                            style={{ 
                                objectFit: 'contain',
                                imageRendering: 'auto',
                                transform: 'translateZ(0)',
                                backfaceVisibility: 'hidden'
                            }}
                            />
                        )}
                        </div>
                        <CardContent style={{ padding: '11px 16px 16px' }}>
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
});

WeOffer.displayName = 'WeOffer';

export default React.memo(WeOffer);
