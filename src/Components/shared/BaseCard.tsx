import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { SxProps } from "@mui/material/styles";

import { appTheme } from "../../theme/theme";
import { borderRadius, shadows, spacing } from "../../theme/designTokens";

export interface BaseCardProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  image?: string;
  icon?: React.ReactNode;
  hover?: boolean;
  sx?: SxProps;
  className?: string;
}

const BaseCard: React.FC<BaseCardProps> = ({
  children,
  title,
  description,
  image,
  icon,
  hover = true,
  sx = {},
  className = "",
}) => {
  return (
    <Card
      className={`base-card ${className}`}
      sx={{
        height: "100%",
        border: `1px solid ${appTheme.palette.divider}`,
        borderRadius: borderRadius.card,
        background: appTheme.palette.background.paper,
        boxShadow: shadows.card,
        transition: `all ${appTheme.transitions.duration.standard} ${appTheme.transitions.easing.easeInOut}`,
        ...(hover && {
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: shadows.cardHover,
            borderColor: appTheme.palette.primary.main,
          },
        }),
        ...sx,
      }}
    >
      <CardContent sx={{ p: spacing.lg, height: "100%" }}>
        {image && (
          <Box
            component="img"
            src={image}
            alt={title}
            sx={{
              width: 44,
              height: 44,
              objectFit: "contain",
              mb: spacing.sm,
            }}
          />
        )}
        
        {icon && (
          <Box sx={{ mb: spacing.sm, display: "flex", alignItems: "center" }}>
            {icon}
          </Box>
        )}
        
        {title && (
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 600,
              fontSize: 18,
              color: appTheme.palette.text.primary,
              mb: description ? spacing.sm : 0,
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
        )}
        
        {description && (
          <Typography
            variant="body2"
            sx={{
              color: appTheme.palette.text.secondary,
              lineHeight: 1.5,
              fontSize: 16,
            }}
          >
            {description}
          </Typography>
        )}
        
        {children}
      </CardContent>
    </Card>
  );
};

export default BaseCard;
