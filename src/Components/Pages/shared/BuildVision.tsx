import React from "react";
import { Box, Grid, Stack, TextField, Typography } from "@mui/material";

import "../../../styles/hire-us.css";

const BuildVision: React.FC = () => {
  return (
    <Box className="hire-contact-section"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        paddingBottom: "unset",
        bgcolor: "#FFFFFF",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          position: "relative",
        }}
      >
        <Box className="build-your-version" sx={{ zIndex: 1 }}>
          <Typography fontWeight={600} fontSize={"24px"} color="#347CCC">
            Build Your Vision with Experts
          </Typography>
          <Typography fontWeight={500} fontSize={"16px"} color="#333333" mt={1}>
            Let’s discuss your project and turn your ideas into reality.
          </Typography>
        </Box>
        <Box
          sx={{
            zIndex: 1,
            position: "relative",
            top: "10px",
            // left: "-15%",
            display: { xs: "none", md: "block" },
          }}
        >
          <img
            src="/assets/hire-us-contact-img.png"
            alt="placeholder"
            style={{
              width: "614px",
            }}
          />
        </Box>
      </Box>
      <Stack
        position={"relative"}
        sx={{
          width: { xs: "80%", md: "50%" },
          px: { xs: 2, md: 4 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          // mt={isNotSmallScreen ? 14 : 5}
          // px={isNotSmallScreen ? 12 : 8}
          className="contact-card"
        >
          <p className="contact-card-title">Drop us a Message</p>
          <Grid
            className="grid-container"
            // spacing={isNotSmallScreen ? 3 : 0}
          >
            <TextField
              id="First Name"
              label="First Name"
              placeholder="First Name"
              type="text"
              variant="outlined"
              className="form-input1"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <TextField
              id="Last Name"
              label="Last Name"
              placeholder="Last Name"
              type="text"
              variant="outlined"
              className="form-input1"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
          <Grid
            className="grid-container"
            // spacing={isNotSmallScreen ? 3 : 0}
          >
            <TextField
              id="Email"
              label="Email"
              placeholder="Email"
              type="text"
              variant="outlined"
              className="form-input1"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <TextField
              id="Mobile No"
              label="Mobile No"
              placeholder="91+"
              type="text"
              variant="outlined"
              className="form-input1"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
          <TextField
            id="Enter Tech Requirement"
            label="Tech Requirement"
            placeholder="Enter Tech Requirement"
            type="text"
            variant="outlined"
            className="form-input2"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            id="Message"
            label="Message"
            type="text"
            variant="outlined"
            className="form-input2"
            placeholder="Message"
            multiline
            rows={1}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            style={{ marginBottom: "0px" }}
            sx={{
              "& .MuiInputBase-root": {
                padding: "2px 14px 25.5px 1px",
              },
            }}
          />
          <Box my={2}>
            <img
              width="55%"
              height="80%"
              src="/assets/captcha-image.png"
              alt="captcha"
            />
          </Box>
          <button className="submit-btn">SUBMIT</button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default BuildVision;