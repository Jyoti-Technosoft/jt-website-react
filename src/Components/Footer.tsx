import React from 'react';
import { Box, Typography, Link, Grid, IconButton, Stack, Container } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

import "../styles/footer.css";

const Footer: React.FC = () => {
    return (
        <Box className="footer">
            <Container>
                <Grid className='subFooter1' container spacing={1} justifyContent="space-between" alignItems="flex-start">
                    <Grid size={{ xs:12, sm:6, md:3 }}>
                        <img className='company-logo' src={"/assets/company-logo.png"} alt="Company Logo"/>
                        <Box className='subFooter1-first-col'>
                            <Typography className='followus' variant="body2" component="p">
                                Follow Us
                            </Typography>
                            <IconButton className='social-media' aria-label="facebook" href="#" target="_blank">
                                <FacebookIcon />
                            </IconButton>
                            <IconButton className='social-media' aria-label="instagram" href="#" target="_blank" >
                                <InstagramIcon />
                            </IconButton>
                            <IconButton className='social-media' aria-label="github" href="#" target="_blank" >
                                <GitHubIcon />
                            </IconButton>
                            <IconButton className='social-media' aria-label="linkedin" href="#" target="_blank" >
                                <LinkedInIcon />
                            </IconButton>
                            <IconButton className='social-media' aria-label="twitter" href="#" target="_blank">
                                <TwitterIcon />
                            </IconButton>
                        </Box>
                    </Grid>

                    <Grid size={{ xs:6, sm:6, md:2 }}>
                        <Typography className='footermenu-header' variant="h6" component="h6" gutterBottom >Our Services</Typography>
                        <Stack spacing={1}>
                            <Link className='footermenu' href="#" underline="none">Product Development</Link>
                            <Link className='footermenu' href="#" underline="none">Mobile Development</Link>
                            <Link className='footermenu' href="#" underline="none">Web Development</Link>
                            <Link className='footermenu' href="#" underline="none">App Customization</Link>
                            <Link className='footermenu' href="#" underline="none">Consulting</Link>
                        </Stack>
                    </Grid>

                    <Grid size={{ xs:6, sm:6, md:2 }}>
                        <Typography className='footermenu-header' variant="h6" component="h6" gutterBottom>Technology</Typography>
                        <Stack spacing={1}>
                            <Link className='footermenu' href="#" underline="none">Angular</Link>
                            <Link className='footermenu' href="#" underline="none">React</Link>
                            <Link className='footermenu' href="#" underline="none">Java</Link>
                        </Stack>
                    </Grid>

                    <Grid size={{ xs:6, sm:6, md:2 }}>
                        <Typography className='footermenu-header' variant="h6" component="h6" gutterBottom >Quick Links</Typography>
                        <Stack spacing={1}>
                            <Link className='footermenu' href="/about" underline="none">About Us</Link>
                            <Link className='footermenu' href="#" underline="none">Career</Link>
                            <Link className='footermenu' href="#" underline="none">Our Work</Link>
                            <Link className='footermenu' href="/contact" underline="none">Contact Us</Link>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>

            <Grid size={{ xs:12, md:12 }}>
                <Container>
                    <Box className="subFooter2">
                        <Typography className='subFooter2-title1' variant="body2" component="p" sx={{ mb: 1 }}>
                            Copyright © 2025 Jyoti Technosoft LLP.  All Rights Reserved.
                        </Typography>
                        <Link href="/privacy" className='subFooter2-title2' underline="none" sx={{ mb: 1 }}>
                            Privacy Policy
                        </Link>
                    </Box>
                </Container>
            </Grid>
        </Box>
    );
};

export default Footer;