"use client";

import { ChangeEvent, FormEvent, useState } from "react";

interface WhoisData {
    domain: string;
    status: string;
    created: string;
    expires: string;
    registrar: string;
    nameservers: string[];
    registrant: {
        name: string;
        organization: string;
        street: string;
        city: string;
        state: string;
        country: string;
    };
    range: string;
    registry: string;
    networkName: string;
    organization: string;
    lastUpdated: string;
    rawDataLink: string;
}

export default function Whois() {
    const [ip, setIp] = useState<string>("");
    const [data, setData] = useState<WhoisData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setIp(event.target.value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setData(null);

        const query = ip.trim();

        if (!query) {
            setError("Пожалуйста, введите IP или домен");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch("https://api.proxy.luxe/services/whois/lookup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query }),
            });

            if (!response.ok) {
                throw new Error("Ошибка при получении данных");
            }

            const result: WhoisData = await response.json();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Неизвестная ошибка");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("ru-RU");
    };

    return (
        <main className="inner-page">
            <section className="blist">
                <div className="scontainer">
                    <h1 className="section-header">
                        <span>WHOIS</span>
                    </h1>
                    <p className="blist-text">
                        Whois сервис (или whois service) - простой и бесплатный инструмент...
                    </p>

                    <form action="#" className="blist-form" onSubmit={handleSubmit}>
                        <p className="blist-hint">IP адрес</p>
                        <div className="btn-wrap">
                            <input
                                type="text"
                                className="blist-inp"
                                onChange={onChangeHandler}
                                value={ip}
                                placeholder="Введите IP или домен"
                            />
                        </div>
                        <div className="btn-wrap">
                            <button type="submit" className="blist-btn btn" disabled={loading}>
                                {loading ? "Загрузка..." : "Проверить"}
                            </button>
                        </div>
                    </form>

                    {error && (
                        <div className="blist-error" style={{ color: "red", marginTop: "1rem" }}>
                            {error}
                        </div>
                    )}

                    {data && (
                        <div className="whois-results" style={{ marginTop: "2rem" }}>
                            <h2>Результаты для {data.domain}</h2>
                            <div className="result-grid">
                                <div><strong>Статус:</strong> {data.status}</div>
                                <div><strong>Создан:</strong> {formatDate(data.created)}</div>
                                <div><strong>Истекает:</strong> {formatDate(data.expires)}</div>
                                <div><strong>Регистратор:</strong> {data.registrar}</div>
                                <div><strong>Серверы имён:</strong> {data.nameservers}</div>
                                <div><strong>Диапазон IP:</strong> {data.range}</div>
                                <div><strong>Реестр:</strong> {data.registry}</div>
                                <div><strong>Сетевое имя:</strong> {data.networkName}</div>
                                <div><strong>Организация:</strong> {data.organization}</div>
                                <div><strong>Обновлено:</strong> {formatDate(data.lastUpdated)}</div>

                                <div style={{ marginTop: "1rem" }}>
                                    <h3>Регистрант:</h3>
                                    <div>Имя: {data.registrant.name}</div>
                                    <div>Организация: {data.registrant.organization}</div>
                                    <div>Город: {data.registrant.city}</div>
                                    <div>Страна: {data.registrant.country}</div>
                                </div>

                                <div style={{ marginTop: "1rem" }}>
                                    <a href={data.rawDataLink} target="_blank" rel="noopener noreferrer">
                                        Полные данные WHOIS
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}