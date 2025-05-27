import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Stack,
  TextField,
  useMediaQuery,
  Typography,
  Button,
  Container,
} from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";

import HeaderCommon from "./shared/HeaderCommonPage.tsx";
import dataArray from "../../jt-website.json";
import "../../styles/career-details.css";

const CareerDetails: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isNotSmallScreen = useMediaQuery("(min-width: 768px)");
  const jobId = queryParams.get("job");
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const job = dataArray.jobs.find((job) => job.id === Number(jobId));

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

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
      <Container>
        <Box className="career-details-container">
          <Typography
            className="career-details-title"
            mt={4}
            mb={2}
            gutterBottom
          >
            Roles and Responsibilities
          </Typography>
          <Typography variant="body1" gutterBottom>
            {job.jobDescription}
          </Typography>
          <div
            className="job-requirement"
            dangerouslySetInnerHTML={{ __html: job.briefJobDescription }}
          />

          <Typography
            className="career-details-title"
            mb={2}
            mt={4}
            gutterBottom
          >
            Skills And Requirements
          </Typography>
          <div
            className="job-requirement"
            dangerouslySetInnerHTML={{ __html: job.jobRequirement }}
          />

          <Typography
            className="career-details-title"
            mb={2}
            mt={4}
            gutterBottom
          >
            Address
          </Typography>
          <Typography mb={6} variant="body1" gutterBottom>
            {job.address}
          </Typography>
        </Box>
      </Container>
      <Box
        px={{ xs: 2, md: 10, lg: 20 }}
        className="join-our-team-container"
        sx={{
          position: "relative",
          mt: { xs: 4, md: 0 },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 250,
            height: 250,
            background:
              "radial-gradient(circle at top right, #4B7AB7 0%, transparent 70%)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 250,
            height: 250,
            background:
              "radial-gradient(circle at bottom left, #4B7AB7 0%, transparent 70%)",
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            width: "100%",
            maxWidth: 1100,
            mx: "auto",
            py: { xs: 2, md: 8 },
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
                borderTopLeftRadius: { md: 20, xs: 0 },
                borderBottomLeftRadius: { md: 20, xs: 0 },
                borderTopRightRadius: { xs: 10, md: 0 },
                borderBottomRightRadius: 0,
                objectFit: "cover",
              }}
            />
          </Box>

          <Box
            px={{ xs: 2, sm: 4, md: 6 }}
            py={{ xs: 3, md: 0 }}
            className="join-our-team-card"
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Stack mt={2}>
              <Stack className="contact-card" sx={{ zIndex: 1 }}>
                <p className="contact-card-title">Join Our Team</p>

                <Box
                  mt={2}
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  {[
                    { label: "First Name" },
                    { label: "Last Name" },
                    { label: "Email" },
                    { label: "Mobile No", placeholder: "91+" },
                    { label: "Current Salary", id: "Salary" },
                    { label: "Notice Period" },
                  ].map((field, index) => (
                    <Box
                      key={index}
                      sx={{
                        flex: { xs: "1 1 100%", sm: "1 1 45%" },
                      }}
                    >
                      <TextField
                        id={field.id || field.label}
                        label={field.label}
                        placeholder={field.placeholder || field.label}
                        fullWidth
                        variant="outlined"
                        className="form-input1"
                        slotProps={{ inputLabel: { shrink: true } }}
                      />
                    </Box>
                  ))}
                </Box>

                <Box
                  sx={{
                    border: "1px dashed #49454F",
                    borderRadius: 2,
                    p: 2,
                    textAlign: "center",
                    position: "relative",
                    mt: 3,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: -10,
                      left: 16,
                      backgroundColor: "#fff",
                      px: 1,
                      fontSize: 12,
                      color: "#49454F",
                    }}
                  >
                    Upload Here
                  </Box>
                  <Typography variant="body2" color="#49454F" display="inline">
                    Drag and drop file here or
                  </Typography>
                  <Button
                    component="label"
                    sx={{
                      ml: 1,
                      textTransform: "none",
                      borderRadius: "10px",
                      backgroundColor: "#4B7AB7",
                      color: "white",
                      px: 3,
                      py: 1,
                    }}
                  >
                    Browse for file
                    <input hidden type="file" />
                  </Button>
                </Box>

                <Box mt={4} textAlign="center">
                  <ReCAPTCHA
                    sitekey="6LfmNKMZAAAAAKrDxRn2_NcHoRPW9-uFuWs98XCx"
                    onChange={handleCaptchaChange}
                  />
                </Box>

                <Box mt={4} textAlign="center">
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
