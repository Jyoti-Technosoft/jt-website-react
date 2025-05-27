import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";

import HomeWhyUs from "../Pages/HomeWhyUs.tsx";
import OurTechnology from "./shared/OurTechnology.tsx";
import WeOffer from "./shared/WeOffer.tsx";
import WeveBuilt from "./shared/WeveBuilt.tsx";
import OurNewsletter from "./shared/OurNewsletter.tsx";
import HowWeWork from "./shared/HowWeWork.tsx";
import dataArray from "../../jt-website.json";
import "../../styles/home.css";

const Home: React.FC = () => {
    const { meetSection } = dataArray?.home;

    return (
        <Box>
            {/* meet Section  */}
            <Box className="first-section-home">
                <Box className="first-section-home-content">
                    <Typography variant="h2" className="first-section-title">
                        {meetSection?.title}
                    </Typography>
                    <Typography variant="body1" className="first-section-description">
                        {meetSection?.description}
                    </Typography>
                    <Button
                        variant="contained"
                        className="build-together"
                    >
                        LET’S BUILD TOGETHER
                    </Button>
                </Box>
            </Box>
            {/* What We Offer */}
            <WeOffer />

            {/* Our Technology */}
            <OurTechnology />

            {/* WhyUs section  */}
            <HomeWhyUs />

            {/* How We Work section  */}
            <HowWeWork/>

            {/* Join Our Newsletter */}
            <OurNewsletter />

            {/* What We’ve Built section */}
            <WeveBuilt />
        </Box>
    );
};

export default Home;
