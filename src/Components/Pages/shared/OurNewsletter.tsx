import React, { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import EastIcon from '@mui/icons-material/East';

const OurNewsletter: React.FC = () => {
    const [showInput, setShowInput] = useState(false);
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribeClick = useCallback(() => {
        setShowInput(true);
    }, []);

    const handleSubmitClick = useCallback(() => {
        if (email.trim() !== '') {
            setSubscribed(true);
        }
    }, [email]);

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
                        <Button variant="contained" className="ourNewsletter-button youreIn-btn">
                            You're in!
                        </Button>
                    ) : (
                        <Box className="input-container">
                            <TextField
                                type="email"
                                placeholder="Email Here"
                                variant="outlined"
                                size="small"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="email-input"
                            />
                            <Button
                                variant="contained"
                                className="submit-btn"
                                onClick={handleSubmitClick}
                            >
                                <EastIcon />
                            </Button>
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
