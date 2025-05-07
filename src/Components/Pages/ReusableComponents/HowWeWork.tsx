import React from 'react';
import { Box, Container, Grid, Typography, } from '@mui/material';

import dataArray from "../../../jt-website.json";
import "../../../Styles/home.css";

const HowWeWork: React.FC = () => {
    const { HowWeWork } = dataArray?.home;
    const backgroundColors = ["#ECEDE4", "#FFEAEB", "#EBDDD5", "#E6D4DC", "#E2EBF7"];

    return (
        <Box className="howWeWork-section">
            <Container className="howWeWork-container">
                <Box>
                    <Typography className="howWeWork-title">
                        How We Work
                    </Typography>
                    <Typography className="howWeWork-description">
                        Step-by-step process to deliver exceptional results
                    </Typography>
                </Box>
                <Grid container className={"howWeWorkMainContainer"}>
                    {HowWeWork?.data?.map((step, index) => (
                        <Box
                            className={"card"}
                            key={step.id}
                            style={{
                                opacity: index === HowWeWork?.data?.length - 1 ? 0 : 1, 
                                pointerEvents: index === HowWeWork?.data?.length - 1 ? "none" : "auto",
                                top: "40px",
                                backgroundColor: backgroundColors[index % backgroundColors?.length]
                            }}
                        >
                            <Box className={"body"}>
                                <Box className="card-content">
                                    <Typography className={"cardTitle"}>{step?.title}</Typography>
                                    <Box className={"description"}>
                                        <Typography className={"description1"}>{step?.description1}</Typography>
                                        <Typography className={"description2"}>{step?.description2}</Typography>
                                    </Box>
                                </Box>
                                <Box className={"imageContainer"}>
                                    <div className={"inner"}>
                                        <img
                                            src={step?.imageSrc}
                                            alt={step?.title}
                                        />
                                    </div>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}

export default HowWeWork;
