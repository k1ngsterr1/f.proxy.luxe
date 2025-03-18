import Image, { StaticImageData } from "next/image";
import React from "react";

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
  return (
    <div className="adv-item">
      <div className="adv-item__img">
        <Image
          src={image}
          layout="responsive"
          width={300} // Default width
          height={200} // Default height
          alt={altText || title} // Fallback to title for better accessibility
        />
      </div>
      <h3 className="adv-item__header">{title}</h3>
      <div className="adv-item__line"></div>
      <p className="adv-item__text">{description}</p>
    </div>
  );
};
