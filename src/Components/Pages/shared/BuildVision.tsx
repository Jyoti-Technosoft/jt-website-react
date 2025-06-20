import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

import "../../../styles/hire-us.css";

const BASE_URL = "https://jyotitechnosoft.com/assets/backend";
const API_ENDPOINTS = {
  business: `${BASE_URL}/bussiness.php`,
};

const BuildVision: React.FC = () => {
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    contact: "",
    hire: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    let key: string;
    switch (id) {
      case "name":
        key = "name";
        break;
      case "Company Name":
        key = "companyName";
        break;
      case "Email":
        key = "email";
        break;
      case "Mobile No":
        key = "contact";
        break;
      case "Enter Tech Requirement":
        key = "hire";
        break;
      case "Message":
        key = "description";
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

    if (!formData.name || !formData.email || !formData.description) {
      setSubmitMessage(
        "Please fill in all required fields (First Name, Email, Message)."
      );
      setIsSuccess(false);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(API_ENDPOINTS.business, {
        name: formData.name,
        companyName: formData.companyName,
        emailAddress: formData.email,
        contact: formData.contact,
        hire: formData.hire,
        description: formData.description,
        recaptcha: captchaValue,
      });

      if (response.data.success) {
        setSubmitMessage("Your message has been sent successfully!");
        setIsSuccess(true);
        setFormData({
          name: "",
          companyName: "",
          email: "",
          contact: "",
          hire: "",
          description: "",
        });
        setCaptchaValue(null);
      } else {
        setSubmitMessage(
          response.data.message || "Failed to send message. Please try again."
        );
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (axios.isAxiosError(error) && error.response) {
        setSubmitMessage(
          `Failed to send message: ${error.response.status} - ${
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

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  useEffect(() => {
    console.log("isSuccess changed:", isSuccess);
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

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
            <Box
              className="build-your-version"
              sx={{ zIndex: 1, px: { xs: 2, md: 0 } }}
            >
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
            {isSuccess ? (
              <Box
                pb={8}
                pt={12}
                className="contact-card"
                display="flex"
                flexDirection="column"
                alignItems="left"
                justifyContent="center"
                textAlign="left"
              >
                <Typography className="thank-you-title">
                  Thank you for getting in touch.
                </Typography>
                <Typography className="thank-you-subtitle" mt={4}>
                  We have successfully received your message, our pros will get
                  back to you shortly.
                </Typography>

                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  mt={4}
                  mb={3}
                >
                  <Grid>
                    <Box
                      component="img"
                      src="/assets/images/portfolio/yatch-mockup.png"
                      alt="Success 1"
                      width={180}
                      sx={{ borderRadius: 2 }}
                    />
                  </Grid>
                  <Grid>
                    <Box
                      component="img"
                      src="/assets/images/portfolio/pratibha-mockup.png"
                      alt="Success 2"
                      width={180}
                      sx={{ borderRadius: 2 }}
                    />
                  </Grid>
                </Grid>

                <Typography className="thank-you-subtitle" mt={4}>
                  Until then, take a look at what we’ve built with other
                  forward-thinking clients.
                </Typography>
                <Typography className="thank-you-subtitle" mt={1}>
                  <a
                    href="/our-work"
                    style={{ color: "#333333", textDecoration: "underline" }}
                  >
                    See success stories
                  </a>
                </Typography>
              </Box>
            ) : (
              <Stack
                className="contact-card"
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  mb: { xs: 4, md: 0 },
                  mt: { xs: 4, md: 0 },
                }}
              >
                <Typography className="contact-card-title">Drop us a Message</Typography>
                <Grid className="grid-container">
                  <TextField
                    id="name"
                    label="Your Name"
                    placeholder="Your Name"
                    type="text"
                    variant="outlined"
                    className="form-input1"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                  <TextField
                    id="companyName"
                    label="Company Name"
                    placeholder="Company Name"
                    type="text"
                    variant="outlined"
                    className="form-input1"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                </Grid>
                <Grid className="grid-container">
                  <TextField
                    id="Email"
                    label="Email"
                    placeholder="Email"
                    type="email"
                    variant="outlined"
                    className="form-input1"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                  <TextField
                    id="contact"
                    label="Mobile No"
                    placeholder="91+"
                    type="tel"
                    variant="outlined"
                    className="form-input1"
                    value={formData.contact}
                    onChange={handleInputChange}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                </Grid>
                <TextField
                  id="hire"
                  label="Tech Requirement"
                  placeholder="Enter Tech Requirement"
                  type="text"
                  variant="outlined"
                  className="form-input2"
                  value={formData.hire}
                  onChange={handleInputChange}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
                <TextField
                  id="description"
                  label="Message"
                  type="text"
                  variant="outlined"
                  className="form-input2"
                  placeholder="Message"
                  multiline
                  rows={1}
                  value={formData.description}
                  onChange={handleInputChange}
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
                <Button
                  type="submit"
                  className="submit-btn"
                  variant="contained"
                  disabled={loading || !captchaValue}
                >
                  {loading ? "SUBMITTING..." : "SUBMIT"}
                </Button>
                {/* {submitMessage && (
                  <Typography
                    color={isSuccess ? "success.main" : "error.main"}
                    sx={{ mt: 2 }}
                  >
                    {submitMessage}
                  </Typography>
                )} */}
              </Stack>
            )}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default BuildVision;
