"use client";

import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useState, useEffect } from "react";

interface MapProps {
    latitude: number;
    longitude: number;
}

export default function YandexMap({ latitude, longitude }: MapProps) {
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        setMapLoaded(true);
    }, []);

    if (!mapLoaded) {
        return <div>Загрузка карты...</div>;
    }

    return (
        <YMaps query={{ apikey: "8694c9c8-081f-4e85-8589-a7ff3d771809\n" }}>
            <div className="myip-map" id="map" style={{ width: "100%", height: "400px" }}>
                <Map
                    defaultState={{
                        center: [latitude, longitude], // Центр карты
                        zoom: 12, // Уровень масштабирования
                    }}
                    width="100%"
                    height="400px"
                >
                    <Placemark geometry={[latitude, longitude]} /> {/* Метка на карте */}
                </Map>
            </div>
        </YMaps>
    );
}