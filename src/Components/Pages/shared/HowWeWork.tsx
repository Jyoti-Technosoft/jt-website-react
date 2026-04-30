import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import SectionIntro from "./SectionIntro.tsx";
import { homeContent } from "../../../content/homeContent";
import "../../../styles/home.css";

const HowWeWork: React.FC = () => {
  const backgroundColors = ["#ECEDE4", "#FFEAEB", "#EBDDD5", "#E6D4DC", "#E2EBF7"];

  return (
    <Box className="howWeWork-section">
      <Box className="howWeWork-container">
        <SectionIntro
          title={homeContent.howWeWork.title}
          description={homeContent.howWeWork.description}
        />
        <Grid container className="howWeWorkMainContainer">
          {homeContent.howWeWork.data.map((step, index) => (
            <Box
              className="card"
              key={step.id}
              style={{
                top: "20px",
                backgroundColor: backgroundColors[index % backgroundColors.length],
              }}
            >
              <Box className="body">
                <Box className="card-content">
                  <Typography className="cardTitle">{step.title}</Typography>
                  <Box className="description">
                    <Typography className="description1">{step.eyebrow}</Typography>
                    <Typography className="description2">{step.details}</Typography>
                  </Box>
                </Box>
                <Box className="imageContainer">
                  <div className="inner">
                    <img src={step.imageSrc} alt={step.title} loading="lazy" />
                  </div>
                </Box>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default React.memo(HowWeWork);
