import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";

import "../../../styles/hire-us.css";

const BuildVision: React.FC = () => {
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  return (
    <Box sx={{ backgroundColor: "#FFFFFF" }}>
      <Container
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 0,
          margin: "0 auto",
          maxWidth: "unset",
        }}
      >
        <Box
          className="hire-contact-section"
          mt={6}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
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
            <Box className="build-your-version" sx={{ zIndex: 1, px: { xs: 2, md: 0 } }}>
              <Typography fontWeight={600} fontSize={"20px"} color="#347CCC">
                Build Your Vision with Experts
              </Typography>
              <Typography
                fontWeight={500}
                fontSize={"15px"}
                color="#333333"
                mt={1}
              >
                Let’s discuss your project and turn your ideas into reality.
              </Typography>
            </Box>
            <Box
              sx={{
                zIndex: 1,
                position: "relative",
                top: "10px",
                display: { xs: "none", md: "block" },
              }}
            >
              <img
                src="/assets/hire-us-contact-img.png"
                alt="placeholder"
                style={{
                  width: "740px",
                  height: "585px",
                  marginBottom: "0",
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
              className="contact-card"
              sx={{
                mb: { xs: 4, md: 0 },
                mt: { xs: 4, md: 0 },
              }}
            >
              <p className="contact-card-title">Drop us a Message</p>
              <Grid
                className="grid-container"
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
                <ReCAPTCHA
                  sitekey="6LfmNKMZAAAAAKrDxRn2_NcHoRPW9-uFuWs98XCx"
                  onChange={handleCaptchaChange}
                />
              </Box>
              <button className="submit-btn">SUBMIT</button>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default BuildVision;
