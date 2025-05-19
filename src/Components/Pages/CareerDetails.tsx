import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Stack,
  TextField,
  useMediaQuery,
  Typography,
  Button,
} from "@mui/material";

import HeaderCommon from "./shared/HeaderCommonPage.tsx";
import dataArray from "../../jt-website.json";
import "../../styles/career-details.css";

const CareerDetails: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isNotSmallScreen = useMediaQuery("(min-width: 768px)");
  const jobId = queryParams.get("job");

  const job = dataArray.jobs.find((job) => job.id === Number(jobId));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!job) {
    return <Typography>Job not found</Typography>;
  }

  return (
    <Box>
      <HeaderCommon
        smallTitle="Career"
        subTitle={job.jobName}
        page={job.jobName}
      />
      <Box className="career-details-container">
        <Typography className="career-details-title" mb={2} gutterBottom>
          Roles and Responsibilities
        </Typography>
        <Typography variant="body1" gutterBottom>
          {job.jobDescription}
        </Typography>
        <div
          className="job-requirement"
          dangerouslySetInnerHTML={{ __html: job.briefJobDescription }}
        />

        <Typography className="career-details-title" mb={2} mt={4} gutterBottom>
          Skills And Requirements
        </Typography>
        <div
          className="job-requirement"
          dangerouslySetInnerHTML={{ __html: job.jobRequirement }}
        />

        <Typography className="career-details-title" mb={2} mt={4} gutterBottom>
          Address
        </Typography>
        <Typography variant="body1" gutterBottom>
          {job.address}
        </Typography>
      </Box>
      <Box
        px={{ xs: 2, md: 10, lg: 20 }}
        className="join-our-team-container"
        sx={{ position: "relative" }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "250px",
            height: "250px",
            background:
              "radial-gradient(circle at top right, #4B7AB7 0%, transparent 70%)",
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "250px",
            height: "250px",
            background:
              "radial-gradient(circle at bottom left, #4B7AB7 0%, transparent 70%)",
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: isNotSmallScreen ? "row" : "column",
            width: "100%",
            maxWidth: "1100px",
            maxHeight: "754px",
            mx: "auto",
            py: isNotSmallScreen ? 8 : 0,
          }}
        >
          <Box
            sx={{
              flex: 1,
              width: "100%",
              height: "100%",
            }}
          >
            <Box
              component="img"
              src="/assets/career-details-img.png"
              alt="Career Related Contact"
              sx={{
                width: "100%",
                height: "100%",
                borderTopLeftRadius: isNotSmallScreen ? 20 : 0,
                borderBottomLeftRadius: isNotSmallScreen ? 20 : 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                objectFit: "cover",
              }}
            />
          </Box>
          <Box
            px= {6}
            className="join-our-team-card"
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Stack position={"relative"} mt={2}>
              <Stack
                className="contact-card"
                sx={{ position: "relative", zIndex: 1 }}
              >
                <p className="contact-card-title">Join Our Team</p>

                <Box
                  mt={2}
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%" } }}>
                    <TextField
                      id="First Name"
                      label="First Name"
                      placeholder="First Name"
                      fullWidth
                      variant="outlined"
                      className="form-input1"
                      slotProps={{ inputLabel: { shrink: true } }}
                    />
                  </Box>
                  <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%" } }}>
                    <TextField
                      id="Last Name"
                      label="Last Name"
                      placeholder="Last Name"
                      fullWidth
                      variant="outlined"
                      className="form-input1"
                      slotProps={{ inputLabel: { shrink: true } }}
                    />
                  </Box>
                  <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%" } }}>
                    <TextField
                      id="Email"
                      label="Email"
                      placeholder="Email"
                      fullWidth
                      variant="outlined"
                      className="form-input1"
                      slotProps={{ inputLabel: { shrink: true } }}
                    />
                  </Box>
                  <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%" } }}>
                    <TextField
                      id="Mobile No"
                      label="Mobile No"
                      placeholder="91+"
                      fullWidth
                      variant="outlined"
                      className="form-input1"
                      slotProps={{ inputLabel: { shrink: true } }}
                    />
                  </Box>
                  <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%" } }}>
                    <TextField
                      id="Salary"
                      label="Current Salary"
                      placeholder="Salary"
                      fullWidth
                      variant="outlined"
                      className="form-input1"
                      slotProps={{ inputLabel: { shrink: true } }}
                    />
                  </Box>
                  <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%" } }}>
                    <TextField
                      id="Notice Period"
                      label="Notice Period"
                      placeholder="Notice Period"
                      fullWidth
                      variant="outlined"
                      className="form-input1"
                      slotProps={{ inputLabel: { shrink: true } }}
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    border: "1px dashed #49454F",
                    borderRadius: "4px",
                    p: 2,
                    textAlign: "center",
                    position: "relative",
                    mt: 2,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "-10px",
                      left: "16px",
                      backgroundColor: "#fff",
                      px: "4px",
                      fontSize: "12px",
                      color: "#49454F",
                    }}
                  >
                    Upload Here
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{ display: "inline", color: "#49454F" }}
                  >
                    Drag and drop file here or
                  </Typography>
                  <Button
                    component="label"
                    sx={{
                      ml: "8px",
                      textTransform: "none",
                      borderRadius: "10px",
                      backgroundColor: "#4B7AB7",
                      color: "white",
                      px: "15px",
                      py: "5px",
                    }}
                  >
                    Browse for file
                    <input hidden type="file" />
                  </Button>
                </Box>

                <Box mt={2} py={1}>
                  <img
                    width="55%"
                    height="80%"
                    src="/assets/captcha-image.png"
                    alt="captcha"
                  />
                </Box>

                <Box mt={2}>
                  <button className="submit-btn">SUBMIT</button>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CareerDetails;
