import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type SectionIntroProps = {
  title: string;
  description: string;
  align?: "left" | "center";
  maxWidth?: number | string;
};

const SectionIntro: React.FC<SectionIntroProps> = ({
  title,
  description,
  align = "left",
  maxWidth = 720,
}) => (
  <Box
    sx={{
      maxWidth,
      textAlign: align,
    }}
  >
    <Typography variant="h2" className="section-title">
      {title}
    </Typography>
    <Typography className="section-description" mt={1.5}>
      {description}
    </Typography>
  </Box>
);

export default React.memo(SectionIntro);
