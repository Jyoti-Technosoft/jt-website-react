import React from "react";

import BaseCard from "./BaseCard";
import { OfferItem } from "../../types/content";

interface ServiceCardProps {
  item: OfferItem;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ item, className = "" }) => {
  return (
    <BaseCard
      title={item.title}
      description={item.description}
      image={item.imageSrc || item.imageSrc1}
      className={`service-card ${className}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
      }}
    />
  );
};

export default ServiceCard;
