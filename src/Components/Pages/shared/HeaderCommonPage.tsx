import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";

import "../../../styles/header-common.css";
import { Box } from "@mui/material";

interface HeaderCommonProps {
  page: string;
  smallTitle?: string;
  subTitle?: string;
  subHeader?: string;
}

const generatePath = (title: string) => {
  return `/${title.toLowerCase().replace(/\s+/g, "-")}`;
};

const HeaderCommonPage: React.FC<HeaderCommonProps> = ({
  page,
  smallTitle,
  subTitle,
  subHeader,
}) => {
  const smallTitlePath = smallTitle ? generatePath(smallTitle) : "";
  const subTitlePath =
    smallTitle && subTitle
      ? `${smallTitlePath}${generatePath("/" + subTitle)}`
      : "";

  return (
    <Box className="main-header-common">
      <Box className="main-header">
        <Box className="first-content-about-header">
          <Link to="/" className="breadcrumb-link">
            Home
          </Link>

          {smallTitle && (
            <>
              <ChevronRightIcon className="chevron-icon" />
              {subTitle ? (
                <Link to={smallTitlePath} className="breadcrumb-link">
                  {smallTitle}
                </Link>
              ) : (
                <span>{smallTitle}</span>
              )}
            </>
          )}

          {subTitle && (
            <>
              <ChevronRightIcon className="chevron-icon" />
              <span>{subTitle}</span>
            </>
          )}
        </Box>
        <Box className="header-pageName">{page}</Box>
        {subHeader && (
          <Box className="header-subTitle" mt={2}>{subHeader}</Box>
        )}
      </Box>
    </Box>
  );
};

export default HeaderCommonPage;
