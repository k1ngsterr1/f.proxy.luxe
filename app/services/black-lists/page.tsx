"use client"
import { useState } from "react";

interface BlacklistResult {
    ip: string;
    isListed: boolean;
    blacklists: string[];
    blacklistCount: number;
    timestamp: string;
}

export default function BlackListPage() {
    const [ip, setIP] = useState<string>("");
    const [result, setResult] = useState<BlacklistResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const validateIP = (ip: string) => {
        const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return ipv4Pattern.test(ip);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!ip) {
            setError("Пожалуйста, введите IP-адрес");
            return;
        }

        if (!validateIP(ip)) {
            setError("Введите корректный IPv4-адрес");
            return;
        }

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch(
                "https://api.proxy.luxe/services/blacklist-checker/check",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ip }),
                }
            );

            if (!response.ok) {
                throw new Error("Ошибка при проверке черного списка");
            }

            const data: BlacklistResult = await response.json();
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
            <section className="blist">
                <div className="scontainer">
                    <h1 className="section-header"><span>ЧЕРНЫЙ СПИСОК</span></h1>

                    <p className="blist-text">
                        Бесплатный инструмент, с помощью которого вы можете проверить наличие вашего, либо любого
                        другого IP-адреса в базах данных антиспама. <br/>Будут ли заблокированы ваши электронные
                        сообщения или чаты форума? Проверка происходит по более 50 базам, которые отслеживают черные
                        списки IP-адресов.
                    </p>

                    {isLoading && <div className="status-info">Проверка...</div>}
                    {error && <div className="status-info error">{error}</div>}
                    {result && (
                        <div className={`status-info ${result.isListed ? "error" : "success"}`}>
                            {result.isListed ? (
                                <>
                                    IP {result.ip} найден в {result.blacklistCount} чёрных списках:
                                    <ul>
                                        {result.blacklists.map((list, index) => (
                                            <li key={index}>{list}</li>
                                        ))}
                                    </ul>
                                </>
                            ) : (
                                `IP ${result.ip} не найден в чёрных списках`
                            )}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="blist">
                        <p className="blist-hint">IP адрес</p>
                        <div className="btn-wrap">
                            <input
                                type="text"
                                className="blist-inp"
                                value={ip}
                                onChange={(e) => setIP(e.target.value)}
                                placeholder="98.108.185.177"
                            />
                        </div>
                        <div className="btn-wrap">
                            <button
                                type="submit"
                                className="blist-btn btn"
                                disabled={isLoading}
                            >
                                {isLoading ? "Проверка..." : "Проверить"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}