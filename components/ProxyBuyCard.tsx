import {FC, PropsWithChildren} from "react";

interface ProxyBuyCardProps extends PropsWithChildren {
    title: string;
    description: string;
}

export const ProxyBuyCard: FC<ProxyBuyCardProps> = ({title, description, children}) => {
    return (
        <div className="buy-col">
            <div className="buy-item">
                <h3 className="buy-item__header" dangerouslySetInnerHTML={{__html: title}}>

                </h3>
                <div className="separator"></div>
                <p className="buy-item__about">{description}</p>
                <a href="#" className="buy-item__btn">Выдаются в одни руки</a>
                {children}
            </div>
        </div>
    )
}