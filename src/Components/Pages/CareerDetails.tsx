import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import GamepadIcon from "@mui/icons-material/Gamepad";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

import HeaderCommon from "./shared/HeaderCommonPage.tsx";
// import dataArray from "../../jt-website.json"; // No longer needed
import "../../styles/career-details.css";
const BASE_URL = "http://192.168.0.197:8000";
const API_ENDPOINTS = {
  career: `${BASE_URL}/career.php`,
  jobs: `${BASE_URL}/jobs.php`,
};

interface Job {
  id: number;
  jobName: string;
  jobDescription: string;
  briefJobDescription: string;
  jobRequirement: string;
  address: string;
}

const CareerDetails: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get("job");
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [job, setJob] = useState<Job | null>(null);
  const [jobLoading, setJobLoading] = useState(true);
  const [jobError, setJobError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Memoize job fetching
  const fetchJob = useCallback(async () => {
    if (!jobId) {
      setJobError("No job ID provided");
      setJobLoading(false);
      return;
    }
    
    try {
      setJobLoading(true);
      setJobError(null);
      const response = await axios.get(API_ENDPOINTS.jobs);
      const found = response.data.jobs.find((j: Job) => j.id === Number(jobId));

      if (!found) {
        setJobError("Job not found");
        setJob(null);
        return;
      }
      
      setJob(found);
      setFormData(prev => ({
        ...prev,
        position: found.jobName
      }));
    } catch (error) {
      console.error("Error fetching job details:", error);
      setJobError("We're having trouble loading this job listing. Please try again later or check our current openings.");
      setJob(null);
    } finally {
      setJobLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

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
  const handleCaptchaChange = useCallback((value: string | null) => {
    setCaptchaValue(value);
  }, []);

  const handleInputChange = useCallback((
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

    // Clear error messages when user starts typing
    if (submitMessage && !submitMessage.includes("successfully")) {
      setSubmitMessage(null);
    }

    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  }, [submitMessage]);

  // Reset form function
  const resetForm = useCallback(() => {
    setIsSuccess(false);
    setSubmitMessage(null);
    setCaptchaValue(null);
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
  }, [job]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
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

      if (response.data.success || response.data.sucess) { // Handle server typo 'sucess'
        setSubmitMessage("Your application has been submitted successfully!");
        // Clear form immediately so users can see it's cleared
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
        // Show success page immediately
        setIsSuccess(true);
        setSubmitMessage(null); // Clear the success message when transitioning to success page
      } else {
        setSubmitMessage(
          response.data.message || "Failed to submit. Please try again."
        );
        setIsSuccess(false);
      }
    } catch (error) {
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
  }, [formData, captchaValue, job]);

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

  if (jobLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography variant="h6" color="text.secondary">
          Loading job details...
        </Typography>
      </Box>
    );
  }

  if (jobError || !job) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" minHeight="50vh" justifyContent="center">
        <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            We're not hiring at the moment
          </Typography>
          <Typography variant="body1" paragraph>
            We're always on the lookout for great talent. Please check back later for new opportunities.
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/career')}
            sx={{ backgroundColor: '#F76336', '&:hover': { backgroundColor: '#d94d24' } }}>
            Back to career page
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box>
      <HeaderCommon
        smallTitle="Car eer"
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
              loading="lazy"
              sx={{
                width: "100%",
                height: "100%",
                borderTopLeftRadius: { md: 20, xs: 0 },
                borderBottomLeftRadius: { md: 20, xs: 0 },
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
                        loading="lazy"
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
                        onClick={resetForm}
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
                    {submitMessage && (
                      <Typography
                        color={submitMessage.includes("successfully") ? "success.main" : "error.main"}
                        sx={{ mt: 2, mb: 2, textAlign: 'center', fontWeight: submitMessage.includes("successfully") ? 'bold' : 'normal' }}
                      >
                        {submitMessage}
                      </Typography>
                    )}
                    <Box mt={2}>
                      <Button
                        type="submit"
                        className="submit-btn"
                        variant="contained"
                        disabled={loading || !captchaValue}
                      >
                        {loading ? "SUBMITTING..." : "SUBMIT"}
                      </Button>
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

export default React.memo(CareerDetails);
