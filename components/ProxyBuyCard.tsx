import { FC, PropsWithChildren } from "react";
import { useTranslations } from "next-intl";

interface ProxyBuyCardProps extends PropsWithChildren {
  title: string;
  description: string;
}

export const ProxyBuyCard: FC<ProxyBuyCardProps> = ({
  title,
  description,
  children,
}) => {
  const i18n = useTranslations("proxy-cards");
  return (
    <div className="buy-col">
      <div className="buy-item">
        <h3
          className="buy-item__header"
          dangerouslySetInnerHTML={{ __html: title }}
        ></h3>
        <div className="separator"></div>
        <p className="buy-item__about">{description}</p>
        <a className="buy-item__btn">{i18n("onePerPerson")}</a>
        {children}
      </div>
    </div>
  );
};
