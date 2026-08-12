import React, { useEffect, useState, useCallback } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Helmet } from 'react-helmet-async';
import axios from "axios"
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

import HeaderMainPage from "./shared/HeaderMainPage.tsx";
import { API_ENDPOINTS } from "../../config/api.ts";
import "../../styles/contact.css";

const officeLocation = {
    id: "pal",
    name: "Office Location",
    icon: <AddLocationAltIcon />,
    address: "Rajhans Multiplex, 417, Sumerru Business Corner, Nr. Somchintamani Appt, B/H, Pal Gam, Surat, Gujarat 395009",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.1278184068738!2d72.78305117529066!3d21.18708078232079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04dbae1416371%3A0x3345ded92523ceb6!2sJyoti%20Technosoft%20LLP!5e0!3m2!1sen!2sin!4v1682142289891!5m2!1sen!2sin"
};

const Contact: React.FC = () => {
    const isNotSmallScreen = useMediaQuery("(min-width: 768px)");
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      mobileNo: "",
      subject: "",
      message: "",
    });

    // Memoize handlers to prevent recreation on every render
    const handleCaptchaChange = useCallback((value: string | null) => {
        setCaptchaValue(value);
    }, []);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value } = e.target;
      let key: string;
      switch (id) {
          case "First Name": key = "firstName"; break;
          case "Last Name": key = "lastName"; break;
          case "Email": key = "email"; break;
          case "Mobile No": key = "mobileNo"; break;
          case "Enter Subject": key = "subject"; break;
          case "Message": key = "message"; break;
          default: key = id; break;
      }

      // Clear error messages when user starts typing
      if (submitMessage && !submitMessage.includes("successfully")) {
        setSubmitMessage(null);
      }

      setFormData((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    }, [submitMessage]);

    // Function to reset form data
    const resetForm = useCallback(() => {
      setIsSuccess(false);
      setSubmitMessage(null);
      setCaptchaValue(null);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobileNo: "",
        subject: "",
        message: "",
      });
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setSubmitMessage(null);

      if (!captchaValue) {
        setSubmitMessage("Please complete the reCAPTCHA verification.");
        setIsSuccess(false);
        setLoading(false);
        return;
      }

      if (!formData.firstName || !formData.email || !formData.message) {
          setSubmitMessage("Please fill in all required fields (First Name, Email, Message).");
          setIsSuccess(false);
          setLoading(false);
          return;
      }

      try {
        const response = await axios.post(API_ENDPOINTS.contactUs, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          emailAddress: formData.email,
          mobileNo: formData.mobileNo,
          subject: formData.subject,
          message: formData.message,
          recaptcha: captchaValue,
        });

        if (response.data.success || response.data.sucess) {
          setSubmitMessage("Your message has been sent successfully!");
          // Clear form immediately
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            mobileNo: "",
            subject: "",
            message: "",
          });
          setCaptchaValue(null);
          // Show success page immediately
          setIsSuccess(true);
          setSubmitMessage(null); // Clear the success message when transitioning to success page
        } else {
          setSubmitMessage(response.data.message || "Failed to send message. Please try again.");
          setIsSuccess(false);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setSubmitMessage(`Failed to send message: ${error.response.status} - ${error.response.data?.message || 'Server error'}`);
        } else {
          setSubmitMessage("An unexpected error occurred. Please try again later.");
        }
        setIsSuccess(false);
      } finally {
        setLoading(false);
      }
    }, [formData, captchaValue]);

    useEffect(() => {
       window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
      if (isSuccess) {
        const timer = setTimeout(() => {
          setIsSuccess(false);
          setSubmitMessage(null);
        }, 10000);
        return () => clearTimeout(timer);
      }
    }, [isSuccess]);


    return (
      <>
        <Helmet>
          <title>Contact Us | Jyoti Technosoft LLP</title>
          <meta name="description" content="Contact Jyoti Technosoft LLP for IT solutions, web development, and digital transformation services." />
          <meta property="og:title" content="Contact Us | Jyoti Technosoft LLP" />
          <meta property="og:description" content="Contact Jyoti Technosoft LLP for IT solutions, web development, and digital transformation services." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://jyotitechnosoft.com/contact" />
          <meta property="og:image" content="https://jyotitechnosoft.com/assets/logo192.png" />
          <link rel="canonical" href="https://jyotitechnosoft.com/contact" />
        </Helmet>
        <HeaderMainPage
          smallTitle="Contact"
          page="Let’s Build Together"
          imageSrc="/assets/contact-img.png"
          showGif={true}
        />
        {/* Enhanced Contact Introduction Section */}
        <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: "#ffffff" }}>
          <Container maxWidth="lg">
            <Box textAlign="center" mb={4}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  fontWeight: 700,
                  color: "#1f5795",
                  mb: 2,
                  position: "relative"
                }}
              >
                Let's Build Something Amazing Together
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#64748b",
                  maxWidth: "600px",
                  margin: "0 auto",
                  lineHeight: 1.6
                }}
              >
                Transform your ideas into powerful digital solutions with our expert team. We're here to help you succeed.
              </Typography>
            </Box>

            {/* Contact Stats */}
            <Grid container spacing={3} mb={8}>
              {[
                { number: "9 AM – 8 PM", label: "Mon–Sat Support" },
                { number: "98%", label: "Client Satisfaction" },
                { number: "< 24h", label: "Response" },
              ].map((stat, index) => (
                <Grid size={{ xs: 6, sm: 4 }} key={index}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 3,
                      background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                      border: "1px solid rgba(31, 87, 149, 0.08)",
                      borderRadius: "16px",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      transform: "translateY(0)",
                      opacity: 1,
                      animation: `fadeInUp 0.6s ease ${index * 0.1}s forwards`,
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 20px 40px rgba(31, 87, 149, 0.15)",
                        border: "1px solid rgba(31, 87, 149, 0.15)"
                      }
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: "#1f5795",
                        mb: 1,
                        background: "linear-gradient(135deg, #1f5795 0%, #3f87df 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#64748b",
                        fontWeight: 500
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Original Map Section */}
        <div id="contact2">
          <Box pt={isNotSmallScreen ? 1 : 3} px={{ xs: 2, md: 10, lg: 20 }}>
            <Grid
              spacing={isNotSmallScreen ? 3 : 1}
              sx={{
                py: isNotSmallScreen ? 8 : 0,
                position: "relative",
                width: "100%",
                mx: "auto",
                maxWidth: "1100px",
              }}
            >
              <Stack spacing={5} pt={0} px={isNotSmallScreen ? 6 : 1}>
                <p className="contact-headertext2">Let’s discuss</p>
                <p className="contact-smallHeader">
                  Your project details in depth with our experts and get quick
                  solutions for your technical problems.
                </p>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: { xs: "1.5rem", md: "1.8rem" },
                        fontWeight: 700,
                        color: "#1f5795",
                        mb: 3
                      }}
                    >
                      Get in Touch
                    </Typography>

                    <Box sx={{ mb: 4 }}>
                      <Box sx={{ display: "flex", alignItems: "start", mb: 3 }}>
                        <EmailIcon sx={{ mt: 0.5, mr: 2, color: "#1f5795", fontSize: 24 }} />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: "#1f5795" }}>
                            Email Us
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#64748b" }}>
                            business@jyotitechnosoft.com
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#64748b" }}>
                            info@jyotitechnosoft.com
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "start", mb: 3 }}>
                        <CallIcon sx={{ mt: 0.5, mr: 2, color: "#1f5795", fontSize: 24 }} />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: "#1f5795" }}>
                            Call Us
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#64748b" }}>
                            +91 9054551083
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#64748b" }}>
                            Mon-Sat: 9:00 AM - 8:00 PM
                          </Typography>
                        </Box>
                      </Box>

                    </Box>
                  </Box>
                </Grid>
              </Stack>

              <Stack position={"relative"}>
                <div className="circle-1"></div>
                {isSuccess ? (
                    <Box
                      mt={isNotSmallScreen ? 14 : 5}
                      px={isNotSmallScreen ? 12 : 8}
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
                        We have successfully received your message, our pros will get back to you shortly.
                      </Typography>

                      <Grid container spacing={2} justifyContent="center" mt={4} mb={3}>
                        <Grid>
                          <Box
                            component="img"
                            src="/assets/images/portfolio/yatch-mockup.png"
                            alt="Success 1"
                            width={180}
                            loading="lazy"
                            sx={{ borderRadius: 2 }}
                          />
                        </Grid>
                        <Grid>
                          <Box
                            component="img"
                            src="/assets/images/portfolio/pratibha-mockup.png"
                            alt="Success 2"
                            width={180}
                            loading="lazy"
                            sx={{ borderRadius: 2 }}
                          />
                        </Grid>
                      </Grid>

                      <Typography className="thank-you-subtitle" mt={4}>
                        Until then, take a look at what we’ve built with other forward-thinking clients.
                      </Typography>
                      <Typography className="thank-you-subtitle" mt={1}>
                        <a href="/our-work" style={{ color: "#333333", textDecoration: "underline" }}>
                          See success stories
                        </a>
                      </Typography>
                      
                      <Box mt={3} textAlign="center">
                        <Button 
                          variant="outlined" 
                          onClick={resetForm}
                          sx={{ 
                            borderColor: "#333333", 
                            color: "#333333",
                            '&:hover': {
                              borderColor: "#333333",
                              backgroundColor: "rgba(51, 51, 51, 0.04)"
                            }
                          }}
                        >
                          Send Another Message
                        </Button>
                      </Box>
                    </Box>
                  ) : ( 
                  <Stack
                    mt={isNotSmallScreen ? 14 : 5}
                    px={isNotSmallScreen ? 12 : { xs: 3, sm: 5, md: 12 }}
                    pb={{ xs: 4, md: 8 }}
                    pt={{ xs: 4, md: 8 }}
                    className="contact-card"
                    component="form"
                    onSubmit={handleSubmit}
                >
                  <Typography className="contact-card-title">Drop us a Message</Typography>
                  <Grid
                    className="grid-container"
                    spacing={isNotSmallScreen ? 3 : 0}
                  >
                    <TextField
                      id="First Name"
                      label="First Name"
                      placeholder="First Name"
                      type="text"
                      variant="outlined"
                      className="form-input1"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
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
                      value={formData.lastName}
                      onChange={handleInputChange}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                    />
                  </Grid>
                  <Grid
                    className="grid-container"
                    spacing={isNotSmallScreen ? 3 : 0}
                  >
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
                      id="Mobile No"
                      label="Mobile No"
                      placeholder="91+"
                      type="tel"
                      variant="outlined"
                      className="form-input1"
                      value={formData.mobileNo}
                      onChange={handleInputChange} 
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                    />
                  </Grid>
                  <TextField
                    id="Enter Subject"
                    label="Subject"
                    placeholder="Enter Subject"
                    type="text"
                    variant="outlined"
                    className="form-input2"
                    value={formData.subject}
                    onChange={handleInputChange}
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
                    value={formData.message}
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
                  <Box className="recaptcha-wrapper">
                    <ReCAPTCHA
                      sitekey="6LfmNKMZAAAAAKrDxRn2_NcHoRPW9-uFuWs98XCx"
                      onChange={handleCaptchaChange}
                    />
                  </Box>
                  
                  {submitMessage && (
                    <Typography
                      color={submitMessage.includes("successfully") ? "success.main" : "error.main"}
                      sx={{ mt: 2, mb: 2, textAlign: 'center', fontWeight: submitMessage.includes("successfully") ? 'bold' : 'normal' }}
                    >
                      {submitMessage}
                    </Typography>
                  )}
                  
                  <Button 
                  type="submit"
                  className="submit-btn" variant="contained" disabled={loading || !captchaValue}>{loading ? "SUBMITTING..." : "SUBMIT"}</Button>
                </Stack>
                )}
              </Stack>
            </Grid>
          </Box>

          <div>
            <iframe
              title="Jyoti Technosoft LLP Location"
              src={officeLocation.mapUrl}
              width="100%"
              height="450"
              style={{
                border: 0,
                boxShadow: "md",
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <Grid
            p={2}
            maxWidth={"1040px"}
            mx="auto"
          >
            <div className="office-address">
              <p className="office-branch">
                {officeLocation.icon} {officeLocation.name}
              </p>
              <p className="branch-address">
                {officeLocation.address}
              </p>
            </div>
          </Grid>
        </div>
      </>
    );
};

export default React.memo(Contact);
