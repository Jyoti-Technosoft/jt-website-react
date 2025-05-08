import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import HeaderCommon from "../Pages/ReusableComponents/HeaderCommonPage.tsx";
import dataArray from '../../jt-website.json';
import "../../styles/career-details.css";

const CareerDetails: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get('job');

  const job = dataArray.jobs.find((job) => job.id === Number(jobId));

  if (!job) {
    return <Typography>Job not found</Typography>;
  }

  return (
    <Box>
      <HeaderCommon smallTitle="Career" subTitle={job.jobName} page={job.jobName} />
      <Box className="career-details-container">
        <Typography variant="h6" gutterBottom>
            Roles and Responsibilities
        </Typography>
        <Typography variant="body1" gutterBottom>
            {job.jobDescription}
        </Typography>
        <div dangerouslySetInnerHTML={{ __html: job.briefJobDescription }} />

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Job Requirements
        </Typography>
        <div dangerouslySetInnerHTML={{ __html: job.jobRequirement }} />
      </Box>
    </Box>
  );
};

export default CareerDetails;
