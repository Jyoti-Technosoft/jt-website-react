import React from "react";
import { Box, Typography, Button } from "@mui/material";

import HomeWhyUs from "../Pages/HomeWhyUs.tsx";
import OurTechnology from "./ReusableComponents/OurTechnology.tsx";
import WeOffer from "./ReusableComponents/WeOffer.tsx";
import WeveBuilt from "./ReusableComponents/WeveBuilt.tsx";
import OurNewsletter from "./ReusableComponents/OurNewsletter.tsx";
import HowWeWork from "./ReusableComponents/HowWeWork.tsx";
import dataArray from "../../jt-website.json";
import "../../Styles/home.css";

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
