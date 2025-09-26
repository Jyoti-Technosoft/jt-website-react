import React, { useCallback } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import "../../../styles/footer-common.css";

interface FooterCommonProps {
  title: string;
  buttonText: string;
  buttonLink: string;
}

const FooterCommonPage: React.FC<FooterCommonProps> = ({
  title,
  buttonText,
  buttonLink,
}) => {
  const navigate = useNavigate();
  
  const handleButtonClick = useCallback(() => {
    navigate(buttonLink);
  }, [navigate, buttonLink]);

  return (
    <div className="main-footer-common">
      <div className="main-footer">
        <span className="footer-title">{title}</span>
        <Button className="footer-btn" onClick={handleButtonClick}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(FooterCommonPage);
