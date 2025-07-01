import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Stack,
  TextField,
  useMediaQuery,
  Typography,
  Button,
  Container,
  Grid,
} from "@mui/material";
import GamepadIcon from "@mui/icons-material/Gamepad";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

import HeaderCommon from "./shared/HeaderCommonPage.tsx";
import dataArray from "../../jt-website.json";
import "../../styles/career-details.css";
const BASE_URL = "https://jyotitechnosoft.com/assets/backend";
const API_ENDPOINTS = {
  career: `${BASE_URL}/career.php`,
};

const CareerDetails: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isNotSmallScreen = useMediaQuery("(min-width: 768px)");
  const jobId = queryParams.get("job");
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const job = dataArray.jobs.find((job) => job.id === Number(jobId));
  const fieldMap: Record<string, keyof typeof formData> = {
    "First Name": "firstName",
    "Last Name": "lastName",
    Email: "email",
    "Mobile No": "mobileNo",
    "Current Salary": "currentSalary",
    "Notice Period": "noticePeriod",
  };
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    currentSalary: "",
    noticePeriod: "",
    resume: null as File | null,
    position: job ? job.jobName : "Angular Developer",
  });
  const GamepadSvg = `<svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 24 24" width="14" fill="#347CCC"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/></svg>`;
  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    let key: string;

    switch (id) {
      case "First Name":
        key = "firstName";
        break;
      case "Last Name":
        key = "lastName";
        break;
      case "Email":
        key = "email";
        break;
      case "Mobile No":
        key = "mobileNo";
        break;
      case "Current Salary":
        key = "currentSalary";
        break;
      case "Notice Period":
        key = "noticePeriod";
        break;
      default:
        key = id;
        break;
    }
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitMessage(null);
    setIsSuccess(null);

    if (!captchaValue) {
      setSubmitMessage("Please complete the reCAPTCHA verification.");
      setIsSuccess(false);
      setLoading(false);
      return;
    }

    if (!formData.firstName || !formData.email || !formData.resume) {
      setSubmitMessage(
        "Please fill in all required fields (First Name, Email, Resume)."
      );
      setIsSuccess(false);
      setLoading(false);
      return;
    }

    try {
      const form = new FormData();
      form.append("firstName", formData.firstName);
      form.append("lastName", formData.lastName);
      form.append("emailAddress", formData.email);
      form.append("mobileNo", formData.mobileNo);
      form.append("currentSalary", formData.currentSalary);
      form.append("noticePeriod", formData.noticePeriod);
      form.append("recaptcha", captchaValue);
      form.append("resume", formData.resume);
      form.append("position", formData.position);

      const response = await axios.post(API_ENDPOINTS.career, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setSubmitMessage("Your application has been submitted successfully!");
        setIsSuccess(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          mobileNo: "",
          currentSalary: "",
          noticePeriod: "",
          resume: null,
          position: job ? job.jobName : "Angular Developer",
        });
        setCaptchaValue(null);
      } else {
        setSubmitMessage(
          response.data.message || "Failed to submit. Please try again."
        );
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (axios.isAxiosError(error) && error.response) {
        setSubmitMessage(
          `Failed to submit: ${error.response.status} - ${
            error.response.data?.message || "Server error"
          }`
        );
      } else {
        setSubmitMessage(
          "An unexpected error occurred. Please try again later."
        );
      }
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const descriptionItems = useMemo(() => {
    if (!job?.briefJobDescription) return [];
    const matches = job.briefJobDescription.match(/<li>(.*?)<\/li>/g) || [];
    return matches.map((item) => item.replace(/<\/?li>/g, ""));
  }, [job]);

  const requirementItems = useMemo(() => {
    if (!job?.jobRequirement) return [];
    const matches = job.jobRequirement.match(/<li>(.*?)<\/li>/g) || [];
    return matches.map((item) => item.replace(/<\/?li>/g, ""));
  }, [job]);

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
            mt={6}
            mb={2}
            gutterBottom
          >
            Roles and Responsibilities
          </Typography>
          <Typography className="career-details-description" gutterBottom>
            {job.jobDescription}
          </Typography>
          <ul style={{ paddingLeft: 0, listStyle: "none" }}>
            {descriptionItems.map((item, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "start",
                  gap: "10px",
                  marginBottom: "20px",
                }}
              >
                <GamepadIcon
                  sx={{ fontSize: 14, color: "#347CCC", mt: "2px" }}
                />
                <span
                  dangerouslySetInnerHTML={{ __html: item }}
                  className="career-details-description"
                />
              </li>
            ))}
          </ul>

          <Typography
            className="career-details-title"
            mt={4}
            mb={2}
            gutterBottom
          >
            Skills And Requirements
          </Typography>

          <ul style={{ paddingLeft: 0, listStyle: "none" }}>
            {requirementItems.map((item, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "start",
                  gap: "10px",
                  marginBottom: "20px",
                }}
              >
                <GamepadIcon
                  sx={{ fontSize: 14, color: "#347CCC", mt: "2px" }}
                />
                <span
                  dangerouslySetInnerHTML={{ __html: item }}
                  className="career-details-description"
                />
              </li>
            ))}
          </ul>

          <Typography className="career-details-title" mt={4} gutterBottom>
            Address
          </Typography>
          <Typography mt={2} mb={6} className="address" gutterBottom>
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
              // height: "100%",
              position: "relative",
              zIndex: 2,
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
                // borderTopRightRadius: { xs: 10, md: 0 },
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
              mt: { xs: 3, md: 0 },
            }}
          >
            <form
              onSubmit={handleSubmit}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            >
              <Stack sx={{ mt: { xs: 0, md: 2 } }}>
                {isSuccess ? (
                  <Box
                    className="contact-card"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    alignItems="left"
                    textAlign="left"
                    minHeight="100vh"
                    py={12}
                    px={4}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      flex={1}
                    >
                      <Box
                        component="img"
                        src="/assets/right.png"
                        alt="Success"
                        width={74}
                        sx={{ borderRadius: 2, mb: 4 }}
                      />

                      <Typography className="thank-you-subtitle" mb={4}>
                        We’ve received your message and our team will get back
                        to you shortly.
                      </Typography>

                      <Typography
                        mt={2}
                        sx={{
                          color: "#333333",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={() => setIsSuccess(false)}
                      >
                        Back to Form
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Stack className="contact-card" sx={{ zIndex: 1 }}>
                    <p className="contact-card-title">Join Our Team</p>

                    <Box
                      mt={{ xs: 3, md: 5 }}
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: { xs: 0, sm: 2 },
                      }}
                    >
                      {[
                        { label: "First Name", id: "First Name", type: "text" },
                        { label: "Last Name", id: "Last Name", type: "text" },
                        { label: "Email", id: "Email", type: "email" },
                        {
                          label: "Mobile No",
                          id: "Mobile No",
                          placeholder: "91+",
                          type: "tel",
                        },
                        {
                          label: "Current Salary",
                          id: "Current Salary",
                          type: "number",
                        },
                        {
                          label: "Notice Period",
                          id: "Notice Period",
                          type: "text",
                        },
                      ].map((field, index) => (
                        <Box
                          key={index}
                          sx={{
                            flex: { xs: "1 1 100%", sm: "1 1 45%" },
                          }}
                        >
                          <TextField
                            id={field.id || field.label}
                            type={field.type || "text"}
                            label={field.label}
                            placeholder={field.placeholder || field.label}
                            fullWidth
                            variant="outlined"
                            className="form-input1"
                            slotProps={{ inputLabel: { shrink: true } }}
                            onChange={handleInputChange}
                            value={formData[fieldMap[field.id]] || ""}
                          />
                        </Box>
                      ))}
                    </Box>
                    <Box
                      onDragOver={(e) => e.preventDefault()}
                      onDragEnter={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (
                          e.dataTransfer.files &&
                          e.dataTransfer.files.length > 0
                        ) {
                          const file = e.dataTransfer.files[0];
                          setFormData((prev) => ({
                            ...prev,
                            resume: file,
                          }));
                          e.dataTransfer.clearData();
                        }
                      }}
                      sx={{
                        border: "1px dashed #49454F",
                        borderRadius: 2,
                        p: 2,
                        textAlign: "center",
                        position: "relative",
                        mt: { xs: 1, sm: 3 },
                        mb: { xs: 0, sm: 2 },
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

                      <Typography
                        variant="body2"
                        color="#49454F"
                        display="inline"
                      >
                        Drag and drop file here or
                      </Typography>

                      <Button
                        component="label"
                        sx={{
                          ml: 1,
                          textTransform: "none",
                          borderRadius: "10px",
                          backgroundColor: "#F76336",
                          color: "white",
                          px: 3,
                          py: 1,
                        }}
                      >
                        {formData.resume
                          ? formData.resume.name
                          : "Browse for file"}
                        <input
                          hidden
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              resume: e.target.files?.[0] || null,
                            }))
                          }
                        />
                      </Button>
                    </Box>
                    <Box my={2} textAlign="center">
                      <ReCAPTCHA
                        sitekey="6LfmNKMZAAAAAKrDxRn2_NcHoRPW9-uFuWs98XCx"
                        onChange={handleCaptchaChange}
                      />
                    </Box>
                    <Box mt={2}>
                      <Button
                        type="submit"
                        className="submit-btn"
                        variant="contained"
                        disabled={loading || !captchaValue}
                      >
                        {loading ? "SUBMITTING..." : "SUBMIT"}
                      </Button>
                      {submitMessage && (
                        <Typography
                          color={isSuccess ? "success.main" : "error.main"}
                          sx={{ mt: 2 }}
                        >
                          {submitMessage}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                )}
              </Stack>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CareerDetails;
