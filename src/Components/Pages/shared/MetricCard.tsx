import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type MetricCardProps = {
  value: string;
  label: string;
  supportingText?: string;
};

const MetricCard: React.FC<MetricCardProps> = ({ value, label, supportingText }) => {
  
  return (
    <Box 
      className="metric-card"
      sx={{
        position: "relative",
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        border: "1px solid rgba(31, 87, 149, 0.08)",
        borderRadius: "16px",
        padding: { xs: "1rem 0.75rem", md: "1.25rem 1rem" },
        textAlign: "center",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        minHeight: { xs: "120px", md: "140px" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #1f5795 0%, #3f87df 50%, #52c41a 100%)",
          borderRadius: "16px 16px 0 0",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background: "radial-gradient(circle, rgba(31, 87, 149, 0.03) 0%, transparent 70%)",
          opacity: 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        },
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 20px 40px rgba(31, 87, 149, 0.15)",
          border: "1px solid rgba(31, 87, 149, 0.15)",
          "&::after": {
            opacity: 1,
          },
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography
          className="metric-value"
          sx={{
            fontSize: { xs: "1.5rem", md: "2.25rem" },
            fontWeight: 700,
            color: "#1f5795",
            lineHeight: 1,
            marginBottom: "0.5rem",
            background: "linear-gradient(135deg, #1f5795 0%, #3f87df 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {value}
        </Typography>
        <Typography
          className="metric-label"
          sx={{
            fontSize: { xs: "0.8rem", md: "0.95rem" },
            fontWeight: 600,
            color: "#2d3748",
            lineHeight: 1.3,
            marginBottom: supportingText ? "0.25rem" : 0,
          }}
        >
          {label}
        </Typography>
        {supportingText && (
          <Typography
            className="metric-supportingText"
            sx={{
              fontSize: { xs: "0.75rem", md: "0.8rem" },
              color: "#64748b",
              lineHeight: 1.4,
              maxWidth: "180px",
              margin: "0 auto",
            }}
          >
            {supportingText}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default React.memo(MetricCard);
