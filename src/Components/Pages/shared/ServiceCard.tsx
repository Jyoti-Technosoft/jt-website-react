import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

type ServiceCardProps = {
  title: string;
  description: string;
  imageSrc?: string;
  imageSrc1?: string;
};

const mediaSx = {
  width: 52,
  height: 52,
  objectFit: "contain",
  imageRendering: "auto",
  transform: "translateZ(0)",
  backfaceVisibility: "hidden",
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  imageSrc,
  imageSrc1,
}) => (
  <Card className="weOffer-card">
    <Box className="weOffer-card-mediaRow">
      {imageSrc ? (
        <CardMedia
          component="img"
          image={imageSrc}
          alt={title}
          className="weOffer-card-image"
          loading="lazy"
          width="52"
          height="52"
          sx={mediaSx}
        />
      ) : null}
      {imageSrc1 ? (
        <CardMedia
          component="img"
          image={imageSrc1}
          alt={`${title} secondary icon`}
          className="weOffer-card-image1"
          loading="lazy"
          width="52"
          height="52"
          sx={mediaSx}
        />
      ) : null}
    </Box>
    <CardContent className="weOffer-card-content">
      <Typography variant="h3" className="weOffer-card-title">
        {title}
      </Typography>
      <Typography variant="body2" className="weOffer-card-description">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

export default React.memo(ServiceCard);
