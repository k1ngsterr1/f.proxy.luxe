"use client"
import { useState } from "react";

interface IPv6CheckResponse {
    domain: string;
    hasIPv6: boolean;
    ipv6Addresses: string[];
    timestamp: string;
}

export default function Page() {
    const [domain, setDomain] = useState<string>("");
    const [result, setResult] = useState<IPv6CheckResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleCheck = async () => {
        if (!domain) {
            setError("Пожалуйста, введите домен");
            return;
        }

        const cleanDomain = domain.replace(/^https?:\/\//, "");

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch(
                "http://localhost:3003/v1/services/ipv6-checker/check",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ domain: cleanDomain }),
                }
            );

            if (!response.ok) {
                throw new Error("Ошибка при проверке IPv6");
            }

            const data: IPv6CheckResponse = await response.json();
            setResult(data);
        } catch (err) {
            let errorMessage = "Произошла ошибка при проверке";
            if (err instanceof Error) {
                errorMessage = err.message;
            }
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="inner-page">
            <section className="prcheck">
                <div className="scontainer">
                    <h1 className="section-header">
                        ПРОВЕРИТЬ ПОДДЕРЖКУ <span>САЙТОМ IPV6</span>
                    </h1>
                    <p className="prcheck-text">
                        С помощью данного сервиса вы можете проверить любой сайт на поддержку доступа по IPv6.
                    </p>

                    {/* Блок статуса */}
                    {isLoading && <div className="status-info">Проверка...</div>}
                    {error && <div className="status-info error">{error}</div>}
                    {result && (
                        <div className={`status-info ${result.hasIPv6 ? "success" : "error"}`}>
                            {result.hasIPv6 ? (
                                `Сайт ${result.domain} поддерживает IPv6. Адреса: ${result.ipv6Addresses.join(", ")}`
                            ) : (
                                `Сайт ${result.domain} не поддерживает IPv6`
                            )}
                        </div>
                    )}

                    <div className="ipvs">
                        <div className="ipvs-hint">http(s)://</div>
                        <input
                            type="text"
                            className="ipvs-inp"
                            placeholder="google.com"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                        />
                    </div>
                    <div className="btn-wrap">
                        <button
                            className="btn"
                            onClick={handleCheck}
                            disabled={isLoading}
                        >
                            {isLoading ? "Проверка..." : "Проверить"}
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}