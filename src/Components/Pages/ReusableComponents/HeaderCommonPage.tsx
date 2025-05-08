import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import "../../../styles/header-common.css";

interface HeaderCommonProps {
    page: string;
    smallTitle: string;
    subTitle?: string;
}

const HeaderCommonPage: React.FC<HeaderCommonProps> = ({ page, smallTitle, subTitle }) => {
    return (
        <div className="main-header-common">
            <div className="main-header">
                <div className="first-content-about-header">
                    <span>Home</span>
                    <ChevronRightIcon className="chevron-icon" />
                    <span>{smallTitle}</span>
                    {subTitle && (
                        <>
                            <ChevronRightIcon className="chevron-icon" />
                            <span>{subTitle}</span>
                        </>
                    )}
                </div>
                <div className="header-pageName">{page}</div>
            </div>
        </div>
    );
};

export default HeaderCommonPage;
