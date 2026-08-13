import React, { useState, useCallback, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import EastIcon from '@mui/icons-material/East';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { API_ENDPOINTS } from '../../../config/api.ts';

const OurNewsletter: React.FC = () => {
    const [showInput, setShowInput] = useState(false);
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const handleCaptchaChange = useCallback((value: string | null) => {
        setCaptchaValue(value);
    }, []);


    const handleSubscribeClick = useCallback((e?: React.MouseEvent<HTMLButtonElement>) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setShowInput(true);
    }, []);

    const handleSubmitClick = useCallback(async (e?: React.FormEvent | React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (email.trim() === '') {
            setMessage({ text: 'Please enter a valid email address.', type: 'error' });
            return;
        }

        if (!captchaValue) {
            setMessage({ text: 'Please complete the reCAPTCHA verification.', type: 'error' });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const response = await axios.post(API_ENDPOINTS.newsletterSubscribe, {
                email: email.trim(),
                recaptcha: captchaValue
            });

            if (response.data.success) {
                setSubscribed(true);
                setMessage({ text: response.data.message || 'Thanks for subscribing! You will receive further emails whenever we publish a new blog.', type: 'success' });
            } else {
                setMessage({ text: response.data.message || 'Failed to subscribe.', type: 'error' });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setMessage({ text: error.response.data?.message || 'Failed to subscribe. Please try again.', type: 'error' });
                } else if (error.request) {
                    setMessage({ text: 'Network Error: Cannot connect to the backend server. Please check if it is running.', type: 'error' });
                } else {
                    setMessage({ text: 'Unable to subscribe at the moment. Please try again later.', type: 'error' });
                }
            } else {
                setMessage({ text: 'Unable to subscribe at the moment. Please try again later.', type: 'error' });
            }
        } finally {
            setLoading(false);
            recaptchaRef.current?.reset();
            setCaptchaValue(null);
        }
    }, [email, captchaValue]);

    return (
        <Box className="ourNewsletter-section">
            <Box className="ourNewsletter-main-container">
                <Typography className="ourNewsletter-title">
                    Join Our Newsletter
                </Typography>
                <Typography className="ourNewsletter-description">
                    Stay ahead in web development and tech hiring! Subscribe to get the latest trends, expert insights, and exclusive offers straight to your inbox.
                </Typography>
                {showInput ? (
                    subscribed ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Button variant="contained" className="ourNewsletter-button youreIn-btn" sx={{ mb: 2 }}>
                                You're in!
                            </Button>
                            {message && (
                                <Typography color="success.main" variant="body2" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                                    {message.text}
                                </Typography>
                            )}
                        </Box>
                    ) : (
                        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                            <Box className="input-container" sx={{ width: '100%', maxWidth: '400px' }}>
                                <TextField
                                    type="email"
                                    placeholder="Email Here"
                                    variant="outlined"
                                    size="small"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (message) setMessage(null);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleSubmitClick(e);
                                        }
                                    }}
                                    className="email-input"
                                    required
                                    autoComplete="email"
                                    inputProps={{
                                        "aria-label": "Email address"
                                    }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className="submit-btn"
                                    disabled={loading}
                                    onClick={(e) => handleSubmitClick(e)}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : <EastIcon />}
                                </Button>
                            </Box>

                            <Box className="recaptcha-wrapper" sx={{ mt: 2, mb: 1, display: 'flex', justifyContent: 'center' }}>
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    sitekey="6LfmNKMZAAAAAKrDxRn2_NcHoRPW9-uFuWs98XCx"
                                    onChange={handleCaptchaChange}
                                />
                            </Box>

                            {message && (
                                <Typography
                                    color={message.type === 'error' ? 'error.main' : 'success.main'}
                                    variant="body2"
                                    sx={{ mt: 1, fontWeight: 'medium', textAlign: 'center' }}
                                >
                                    {message.text}
                                </Typography>
                            )}
                        </Box>
                    )

                ) : (
                    <Button
                        variant="contained"
                        className="ourNewsletter-button"
                        onClick={handleSubscribeClick}
                    >
                        Subscribe
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default React.memo(OurNewsletter);
