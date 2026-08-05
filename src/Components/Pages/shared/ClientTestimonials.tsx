import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import type { ClientTestimonials as ClientTestimonialsType } from "../../../types/content";

interface ClientTestimonialsProps {
  data: ClientTestimonialsType;
}

const ClientTestimonials: React.FC<ClientTestimonialsProps> = ({ data }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400; // Width of one card + gap
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth"
      });
    }
  };

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      setCanScrollLeft(scrollRef.current.scrollLeft > 0);
      setCanScrollRight(
        scrollRef.current.scrollLeft < 
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth
      );
    }
  };

  useEffect(() => {
    checkScrollPosition();
    // Add resize listener to update scroll buttons when window resizes
    const handleResize = () => checkScrollPosition();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0].toUpperCase())
      .slice(0, 2)
      .join("");
  };

  const getAvatarSrc = (avatar?: string) => {
    if (!avatar) return undefined;
    if (avatar.includes("via.placeholder.com")) return undefined;
    return avatar;
  };

  return (
    <Box className="client-testimonials-section">
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, md: 3 } }}>
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Typography variant="h2" className="section-title" sx={{ 
            mb: 3,
            fontSize: { xs: "2rem", md: "2.5rem" }
          }}>
            {data.title}
          </Typography>
          <Typography variant="body1" className="section-description">
            {data.description}
          </Typography>
        </Box>

        {/* Testimonials */}
        <Box sx={{ position: "relative" }}>
          <Typography variant="h5" sx={{ 
            textAlign: "center", 
            mb: 4, 
            color: "var(--text-blue)", 
            fontWeight: 600,
            fontSize: { xs: "1.3rem", md: "1.5rem" }
          }}>
            What Our Clients Say
          </Typography>
          
          {/* Left Arrow */}
          <IconButton
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            sx={{
              position: "absolute",
              left: { xs: -20, md: -40 },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              bgcolor: "rgba(255, 255, 255, 0.9)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 1)",
              },
              "&:disabled": {
                opacity: 0.3,
                bgcolor: "rgba(255, 255, 255, 0.5)",
              },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          {/* Right Arrow */}
          <IconButton
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            sx={{
              position: "absolute",
              right: { xs: -20, md: -40 },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              bgcolor: "rgba(255, 255, 255, 0.9)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 1)",
              },
              "&:disabled": {
                opacity: 0.3,
                bgcolor: "rgba(255, 255, 255, 0.5)",
              },
            }}
          >
            <ChevronRightIcon />
          </IconButton>

          {/* Horizontal Scrolling Container */}
          <Box
            ref={scrollRef}
            onScroll={checkScrollPosition}
            sx={{
              display: "flex",
              gap: 3,
              overflowX: "auto",
              scrollBehavior: "smooth",
              scrollbarWidth: "none", // Firefox
              "&::-webkit-scrollbar": {
                display: "none", // Chrome, Safari, Opera
              },
              px: { xs: 2, md: 4 },
              py: 2,
            }}
          >
            {data.testimonials.map((testimonial, index) => (
              <Card
                key={index}
                sx={{
                  minWidth: { xs: "280px", md: "350px" },
                  maxWidth: { xs: "280px", md: "350px" },
                  flexShrink: 0,
                  border: "1px solid rgba(31, 87, 149, 0.1)",
                  borderRadius: "16px",
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px rgba(31, 87, 149, 0.08)",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: "linear-gradient(90deg, #1f5795, #3f87df)",
                  },
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 16px 48px rgba(31, 87, 149, 0.12)",
                    borderColor: "rgba(31, 87, 149, 0.2)",
                  },
                }}
              >
                <CardContent sx={{ 
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "space-between"
                }}>
                  <Box sx={{ mb: 3, flex: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontStyle: "italic",
                        color: "var(--text-dark)",
                        lineHeight: 1.7,
                        fontSize: "1rem",
                        position: "relative",
                        pl: 3,
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          left: 0,
                          top: -8,
                          fontSize: "3rem",
                          color: "rgba(31, 87, 149, 0.2)",
                          fontFamily: "serif",
                        },
                      }}
                    >
                      {testimonial.quote}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 2.5,
                    mt: "auto"
                  }}>
                    <Avatar
                      src={getAvatarSrc(testimonial.avatar)}
                      alt={testimonial.author}
                      sx={{ 
                        width: 56, 
                        height: 56,
                        border: "2px solid rgba(31, 87, 149, 0.1)"
                      }}
                    >
                      {!getAvatarSrc(testimonial.avatar) ? getInitials(testimonial.author) : null}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ 
                        fontWeight: 700, 
                        color: "var(--text-dark)",
                        fontSize: "1rem"
                      }}>
                        {testimonial.author}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: "var(--text-muted)",
                        fontSize: "0.9rem"
                      }}>
                        {testimonial.role}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: "var(--text-blue)",
                        fontSize: "0.85rem",
                        fontWeight: 600
                      }}>
                        {testimonial.company}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ClientTestimonials;
