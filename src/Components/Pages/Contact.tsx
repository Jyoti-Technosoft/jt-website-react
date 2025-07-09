import React, { useEffect, useState } from "react";
import {
    Box,
    keyframes,
    Grid,
    Stack,
    TextField,
    useMediaQuery,
    Typography,
    Button
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios"
import { Helmet } from 'react-helmet';

import HeaderMainPage from "./shared/HeaderMainPage.tsx";
import "../../styles/contact.css";
const BASE_URL = "https://jyotitechnosoft.com/assets/backend";
const API_ENDPOINTS = {
  contactUs: `${BASE_URL}/contactus.php`
};

const branches = [
    {
        id: "main",
        name: "Main Branch",
        icon: <FmdGoodIcon />,
        address: "228, Second Floor, Green Elina, Nr. Sneh Sankul's Vadi, Anand Mahal Rd, Giriraj Society, Adajan, Surat, Gujarat 395009",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.849950595389!2d72.79385851529051!3d21.19811888590681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3ad62b2491a66dc4!2sJyoti%20Technosoft!5e0!3m2!1sen!2sin!4v1586443823071!5m2!1sen!2sin"
    },
    {
        id: "pal",
        name: "Pal Branch",
        icon: <AddLocationAltIcon />,
        address: "Rajhans Multiplex, 417, Sumerru Business Corner, Nr. Somchintamani Appt, B/H, Pal Gam, Surat, Gujarat 395009",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.1278184068738!2d72.78305117595066!3d21.18708078232079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04dbae1416371%3A0x3345ded92523ceb6!2sJyoti%20Technosoft%20LLP!5e0!3m2!1sen!2sin!4v1682142289891!5m2!1sen!2sin"
    },
];

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const Contact: React.FC = () => {
    const isNotSmallScreen = useMediaQuery("(min-width: 768px)");
    const [activeBranch, setActiveBranch] = useState(branches[1]);
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

    const handleCaptchaChange = (value: string | null) => {
        setCaptchaValue(value);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

      setFormData((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
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

        if (response.data.success) {
          setSubmitMessage("Your message has been sent successfully!");
          setIsSuccess(true);
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            mobileNo: "",
            subject: "",
            message: "",
          });
          setCaptchaValue(null);
          } else {
            setSubmitMessage(response.data.message || "Failed to send message. Please try again.");
            setIsSuccess(true);
          }
        } catch (error) {
          console.error("Error submitting contact form:", error);
          if (axios.isAxiosError(error) && error.response) {
            setSubmitMessage(`Failed to send message: ${error.response.status} - ${error.response.data?.message || 'Server error'}`);
          } else {
            setSubmitMessage("An unexpected error occurred. Please try again later.");
          }
          setIsSuccess(false);
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
       window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

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

                <Box className="contact-details-section">
                  <p className="contact-details-title">
                    <EmailIcon /> Drop us a line
                  </p>
                  <p
                    style={{ marginTop: "0px" }}
                    className="contact-details-text"
                  >
                    <span className="contact-dash">-</span>{" "}
                    info@jyotitechnosoft.com
                  </p>
                  <p className="contact-details-text">
                    <span className="contact-dash">-</span>{" "}
                    business@jyotitechnosoft.com
                  </p>
                </Box>

                <Box className="contact-details-section" position={"relative"}>
                  <div className="circle-2"></div>
                  <Box mt={3}>
                    <p className="contact-details-title">
                      <CallIcon />
                      Let's talk
                    </p>
                    <p
                      style={{ marginTop: "13px" }}
                      className="contact-details-text"
                    >
                      <span className="contact-dash">-</span>+91 92657 12724
                    </p>
                    <p className="contact-details-text">
                      <span className="contact-dash">-</span>+91 92657 12724
                    </p>
                  </Box>
                </Box>
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
                        Until then, take a look at what we’ve built with other forward-thinking clients.
                      </Typography>
                      <Typography className="thank-you-subtitle" mt={1}>
                        <a href="/our-work" style={{ color: "#333333", textDecoration: "underline" }}>
                          See success stories
                        </a>
                      </Typography>
                    </Box>
                  ) : ( 
                  <Stack
                    mt={isNotSmallScreen ? 14 : 5}
                    px={isNotSmallScreen ? 12 : 8}
                    pb={8}
                    pt={8}
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
                  {/* <Box my={2}>
                      <img width="55%" height="80%" src="/assets/captcha-image.png" alt="captcha" />
                  </Box> */}
                  <Box my={2}>
                    <ReCAPTCHA
                      sitekey="6LfmNKMZAAAAAKrDxRn2_NcHoRPW9-uFuWs98XCx"
                      onChange={handleCaptchaChange}
                    />
                  </Box>
                  <Button 
                  type="submit"
                  className="submit-btn" variant="contained" disabled={loading || !captchaValue}>{loading ? "SUBMITTING..." : "SUBMIT"}</Button>
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
            </Grid>
          </Box>

          <div>
            <iframe
              title="Jyoti Technosoft LLP Location"
              src={activeBranch?.mapUrl}
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
            spacing={isNotSmallScreen ? 16 : 6}
            display={"flex"}
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent={"space-between"}
            columns={[1, 1, 2]}
            mx="auto"
          >
            {branches?.map((branch, index) => (
              <div
                key={branch.id}
                className={`office-address ${index === 1 ? "relative" : ""}`}
                onClick={() => setActiveBranch(branch)}
              >
                {index === 1 && <div className="circle-3"></div>}
                <p
                  className={`office-branch ${
                    activeBranch?.id === branch?.id ? "active" : ""
                  }`}
                >
                  {branch?.icon} {branch?.name}
                </p>
                <p
                  className={`branch-address ${
                    activeBranch?.id === branch?.id ? "active" : ""
                  }`}
                >
                  {branch?.address}
                </p>
              </div>
            ))}
          </Grid>
        </div>
      </>
    );
};

export default Contact;
