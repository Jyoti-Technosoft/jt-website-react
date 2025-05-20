import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";

import "../../../styles/header-common.css";

interface HeaderCommonProps {
  page: string;
  smallTitle?: string;
  subTitle?: string;
}

const generatePath = (title: string) => {
  return `/${title.toLowerCase().replace(/\s+/g, "-")}`;
};

const HeaderCommonPage: React.FC<HeaderCommonProps> = ({
  page,
  smallTitle,
  subTitle,
}) => {
  const smallTitlePath = smallTitle ? generatePath(smallTitle) : "";
  const subTitlePath =
    smallTitle && subTitle
      ? `${smallTitlePath}${generatePath("/" + subTitle)}`
      : "";

  return (
    <div className="main-header-common">
      <div className="main-header">
        <div className="first-content-about-header">
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
        </div>
        <div className="header-pageName">{page}</div>
      </div>
    </div>
  );
};

export default HeaderCommonPage;
