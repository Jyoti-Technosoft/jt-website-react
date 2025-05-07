import React, { useState } from "react";
import {
    Box,
    Grid,
    Stack,
    TextField,
    useMediaQuery,
    Typography
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

import "../../Styles/contact.css";

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

const Contact: React.FC = () => {
    const isNotSmallScreen = useMediaQuery("(min-width: 768px)");
    const [activeBranch, setActiveBranch] = useState(branches[1]);

    return (
        <>
            <Box className="contact-first-section">
                <Box className="contact-content">
                    <div className="contact-first-content">
                        <span>Home</span>
                        <ChevronRightIcon className="chevron-icon" />
                        <span>{"Contact"}</span>
                    </div>
                    <Typography className="contact-title">
                        Contact Us
                    </Typography>
                    <div className="contact-gif" ></div>
                    <div className="contact-wave" ></div>
                </Box>
                <Box className="contact-image">
                    <img src="/assets/contact-img.png" alt="Contact Us" />
                </Box>
            </Box>
            <div id="contact2">
                <Box pt={isNotSmallScreen ? 1 : 3} px={{ xs: 2, md: 10, lg: 20 }}>
                    <Grid
                        spacing={isNotSmallScreen ? 3 : 1}
                        sx={{
                            py: isNotSmallScreen ? 8 : 0,
                            position: "relative",
                            width: "100%",
                            mx: "auto",
                            maxWidth: "1100px"
                        }}
                    >
                        <Stack spacing={5} pt={0} px={isNotSmallScreen ? 6 : 1}>
                            <p className="contact-headertext2">
                                Let’s discuss
                            </p>
                            <p className="contact-smallHeader">
                                Your project details in depth with our experts and get quick solutions for your technical problems.
                            </p>

                            {/* Email Section */}
                            <Box className="contact-details-section" >
                                <p className="contact-details-title">
                                    <EmailIcon /> Drop us a line
                                </p>
                                <p style={{ marginTop: "0px" }} className="contact-details-text">
                                    <span className="contact-dash">-</span> info@jyotitechnosoft.com
                                </p>
                                <p className="contact-details-text">
                                    <span className="contact-dash">-</span> business@jyotitechnosoft.com
                                </p>
                            </Box>

                            {/* Phone Section */}
                            <Box className="contact-details-section" position={"relative"}>
                                <div className="circle-2"></div>
                                <Box mt={3}>
                                    <p className="contact-details-title"><CallIcon />Let's talk</p>
                                    <p style={{ marginTop: "13px" }} className="contact-details-text"><span className="contact-dash">-</span>+91 92657 12724</p>
                                    <p className="contact-details-text"><span className="contact-dash">-</span>+91 92657 12724</p>
                                </Box>
                            </Box>
                        </Stack>

                        {/* Contact Form */}
                        <Stack position={"relative"}>
                            <div className="circle-1"></div>
                            <Stack mt={isNotSmallScreen ? 14 : 5} px={isNotSmallScreen ? 12 : 8} pb={8} pt={8} className="contact-card">
                                <p className="contact-card-title">Drop us a Message</p>
                                <Grid className="grid-container" spacing={isNotSmallScreen ? 3 : 0}>
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
                                <Grid className="grid-container" spacing={isNotSmallScreen ? 3 : 0}>
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
                                    id="Enter Subject"
                                    label="Subject"
                                    placeholder="Enter Subject"
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
                                        }
                                    }}
                                />
                                <Box my={2}>
                                    <img width="55%" height="80%" src="/assets/captcha image.png" alt="captcha" />
                                </Box>
                                <button className="submit-btn">
                                    SUBMIT
                                </button>
                            </Stack>
                        </Stack>
                    </Grid>
                </Box>

                {/* Google Map */}
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

                {/* Office Locations */}
                <Grid p={2} maxWidth={"1040px"} spacing={isNotSmallScreen ? 16 : 6} display={"flex"} flexDirection={{ xs: "column", md: "row" }} justifyContent={"space-between"} columns={[1, 1, 2]} mx="auto">
                    {branches?.map((branch, index) => (
                        <div
                            key={branch.id}
                            className={`office-address ${index === 1 ? "relative" : ""}`}
                            onClick={() => setActiveBranch(branch)}
                        >
                            {index === 1 && <div className="circle-3"></div>}
                            <p className={`office-branch ${activeBranch?.id === branch?.id ? "active" : ""}`}>
                                {branch?.icon} {branch?.name}
                            </p>
                            <p className={`branch-address ${activeBranch?.id === branch?.id ? "active" : ""}`}>
                                {branch?.address}
                            </p>
                        </div>
                    ))}
                </Grid>
            </div >
        </>
    );
};

export default Contact;
