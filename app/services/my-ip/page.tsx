"use client"; // Указываем, что это клиентский компонент

import { useEffect, useState } from "react";
import Image from "next/image";
import YandexMap from "@/components/YandexMap";
import RuFlag from "@/assets/images/rus-lang.png"
import Geo from "@/assets/images/geo.png"

interface IpData {
    ip: string;
    country: string;
    city: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    time: string;
    headers: {
        [key: string]: string;
    };
}

export default function MyIpClient() {
    const [ipData, setIpData] = useState<IpData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3003/services/ip/my-ip");
                if (!response.ok) {
                    console.log(response.ok)
                }
                const data = await response.json();
                setIpData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Неизвестная ошибка");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <main className="inner-page">Загрузка...</main>;
    }

    if (error) {
        return <main className="inner-page">Ошибка: {error}</main>;
    }

    if (!ipData) {
        return <main className="inner-page">Данные не найдены</main>;
    }

    return (
        <main className="inner-page">
            <section className="myip">
                <div className="scontainer">
                    <h1 className="section-header section-header--img">
                        <Image src={Geo} alt="" width={Geo.width} height={Geo.height} />
                        ВАШ IP-АДРЕС:
                        <span>&nbsp;{ipData.ip}</span>
                    </h1>
                    <p className="myip-text">
                        С помощью данного сервиса вы можете узнать свой IP-адрес, а также получить подробную информацию
                        о нем. <br />Помимо информации об IP здесь отображаются данные, которые передает ваш браузер на
                        сервер.
                    </p>
                    <div className="myip-inner">
                        {/* Основная информация об IP */}
                        <div className="myip-item">
                            <div className="myip-item__name">IP</div>
                            <div className="myip-item__text">{ipData.ip}</div>
                        </div>

                        <div className="myip-item">
                            <div className="myip-item__name">Страна</div>
                            <div className="myip-item__text myip-item__text--img">
                                <span>{ipData.country}</span>
                                <Image src={RuFlag}  width={RuFlag.width} height={RuFlag.height} alt="" />
                            </div>
                        </div>

                        <div className="myip-item">
                            <div className="myip-item__name">Город</div>
                            <div className="myip-item__text">{ipData.city}</div>
                        </div>

                        <div className="myip-item">
                            <div className="myip-item__name">Почтовый индекс</div>
                            <div className="myip-item__text">{ipData.postalCode}</div>
                        </div>

                        <div className="myip-item">
                            <div className="myip-item__name">Широта</div>
                            <div className="myip-item__text">{ipData.latitude}</div>
                        </div>

                        <div className="myip-item">
                            <div className="myip-item__name">Долгота</div>
                            <div className="myip-item__text">{ipData.longitude}</div>
                        </div>

                        <div className="myip-item">
                            <div className="myip-item__name">Время</div>
                            <div className="myip-item__text">{ipData.time}</div>
                        </div>

                        <div className="separator"></div>

                        <h2 className="myip-header">Сведения, предоставленные <br />вашим браузером:</h2>

                        {Object.entries(ipData.headers).map(([header, value]) => (
                            <div className="myip-item" key={header}>
                                <div className="myip-item__name">{header}</div>
                                <div className="myip-item__text">{value}</div>
                            </div>
                        ))}

                        <div className="myip-map" id="map">
                            <YandexMap latitude={ipData.latitude} longitude={ipData.longitude} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}