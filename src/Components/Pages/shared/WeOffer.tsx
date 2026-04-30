import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import SectionIntro from "./SectionIntro.tsx";
import ServiceCard from "../../shared/ServiceCard.tsx";
import { homeContent } from "../../../content/homeContent";
import "../../../styles/home.css";

const WeOffer: React.FC = () => (
  <Box className="we-offer-section">
    <Container className="weOffer-container">
      <SectionIntro
        title={homeContent.weOffer.title}
        description={homeContent.weOffer.description}
      />
      <Grid container spacing={3} className="weOffer-main-container">
        {homeContent.weOffer.data.map((offer) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={offer.id}>
            <ServiceCard item={offer} />
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

export default React.memo(WeOffer);
