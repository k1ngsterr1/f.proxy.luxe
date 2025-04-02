import Image, { StaticImageData } from "next/image";
import React from "react";
import { useIsMobile } from "../utils/use-is-mobile";

interface AdvantageCardProps {
  image: StaticImageData | string;
  title: string;
  description: string;
  altText?: string;
}

export const AdvantageCard: React.FC<AdvantageCardProps> = ({
  image,
  title,
  description,
  altText = "",
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="adv-item">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={image}
          style={{
            width: isMobile ? 64 : 150,
            height: isMobile ? 64 : 160,
          }}
          width={isMobile ? 150 : 200} // Default width
          height={isMobile ? 100 : 200} // Default height
          alt={altText || title} // Fallback to title for better accessibility
        />
      </div>
      <h3 className="adv-item__header">{title}</h3>
      <div className="adv-item__line"></div>
      <p className="adv-item__text">{description}</p>
    </div>
  );
};
