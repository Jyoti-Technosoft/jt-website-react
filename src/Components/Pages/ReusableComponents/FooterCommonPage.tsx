import React from "react";
import { Button } from "@mui/material";

import "../../../Styles/footer-common.css";

interface FooterCommonProps {
    title: string;
    buttonText: string;
}

const FooterCommonPage: React.FC<FooterCommonProps> = ({ title, buttonText }) => {
    return (
        <div className="main-footer-common">
            <div className="main-footer">
                <span className="footer-title">{title}</span>
                <Button className="footer-btn">{buttonText}</Button>
            </div>
        </div>
    );
};

export default FooterCommonPage;
