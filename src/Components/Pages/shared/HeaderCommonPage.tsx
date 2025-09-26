import React, { useMemo } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

import "../../../styles/header-common.css";

interface HeaderCommonProps {
  page: string;
  smallTitle?: string;
  subTitle?: string;
  subHeader?: string;
}

const HeaderCommonPage: React.FC<HeaderCommonProps> = ({
  page,
  smallTitle,
  subTitle,
  subHeader,
}) => {
  // Memoize path generation to prevent recalculation
  const smallTitlePath = useMemo(() => 
    smallTitle ? `/${smallTitle.toLowerCase().replace(/\s+/g, "-")}` : "", 
    [smallTitle]
  );

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

export default React.memo(HeaderCommonPage);
