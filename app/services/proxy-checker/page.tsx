"use client"
import { useState } from "react";

interface ProxyResult {
    ip: string;
    port: number;
    isActive: boolean;
    protocol: string;
    country?: string;
    anonymityLevel?: string;
    supportsIPv6?: boolean;
    authRequired: boolean;
    responseTime?: number;
    error?: string;
}

export default function ProxyCheckerPage() {
    const [proxyList, setProxyList] = useState<string>("");
    const [checkLocation, setCheckLocation] = useState<boolean>(false);
    const [results, setResults] = useState<ProxyResult[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleCheckProxies = async () => {
        if (!proxyList) {
            setError("Пожалуйста, введите список прокси");
            return;
        }

        // Разделяем список прокси на отдельные строки
        const proxies = proxyList.split("\n").filter((line) => line.trim() !== "");

        setIsLoading(true);
        setError(null);
        setResults([]);

        try {
            const results = await Promise.all(
                proxies.map(async (proxy) => {
                    try {
                        const response = await fetch("https://api.proxy.luxe/proxy-checker/check", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                proxy,
                                checkLocation,
                            }),
                        });

                        if (!response.ok) {
                            throw new Error("Ошибка при проверке прокси");
                        }

                        return await response.json();
                    } catch (err) {
                        return {
                            ip: proxy.split(":")[0],
                            port: parseInt(proxy.split(":")[1], 10),
                            isActive: false,
                            protocol: "unknown",
                            authRequired: proxy.split(":").length > 2,
                            error: err instanceof Error ? err.message : "",
                        };
                    }
                })
            );

            setResults(results);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError("Произошла ошибка при проверке прокси");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="inner-page">
            <section className="prcheck">
                <div className="scontainer">
                    <h1 className="section-header">
                        <span>ПРОКСИ ЧЕКЕР</span>
                    </h1>
                    <p className="prcheck-text">
                        Бесплатный онлайн сервис для проверки работоспособности прокси серверов. Анализ каждого прокси на
                        доступность, тип и страну. <br />
                        Возможность проверки анонимных (индивидуальных) прокси с авторизацией по логину и паролю. Проверка IPv6
                        прокси.
                    </p>

                    <div className="prcheck-inner">
                        <div className="prcheck-form">
              <textarea
                  className="prcheck-textarea"
                  placeholder="Список прокси"
                  value={proxyList}
                  onChange={(e) => setProxyList(e.target.value)}
              />
                            <label className="checkbox">
                                <input
                                    className="checkbox-inp"
                                    type="checkbox"
                                    checked={checkLocation}
                                    onChange={(e) => setCheckLocation(e.target.checked)}
                                />
                                <span className="checkbox-box"></span>
                                <span className="checkbox-text">Определять локацию прокси</span>
                            </label>
                        </div>

                        <div className="prcheck-info">
                            <h2 className="prcheck-header">В каком формате добавлять прокси в прокси-чекер?</h2>
                            <div className="separator"></div>
                            <p className="prcheck-rtext">
                                Если у вас публичные прокси (без логина и пароля), то <span>IP:PORT</span> <br />
                                Если у вас приватные прокси (с авторизацией по логину и паролю), то{" "}
                                <span>IP:PORT:USER:PASS</span>
                            </p>
                            <p className="prcheck-rtext">P.S.: Если вы купили прокси у нас, то они приватные!</p>

                            <button className="btn" onClick={handleCheckProxies} disabled={isLoading}>
                                {isLoading ? "Проверка..." : "Проверить прокси"}
                            </button>
                        </div>
                    </div>

                    {/* Отображение результатов */}
                    {error && <div className="error-message">{error}</div>}
                    {results.length > 0 && (
                        <div className="results">
                            <h3>Результаты проверки:</h3>
                            <ul>
                                {results.map((result, index) => (
                                    <li key={index}>
                                        <strong>{result.ip}:{result.port}</strong> —{" "}
                                        {result.isActive ? (
                                            <span className="success">Активен</span>
                                        ) : (
                                            <span className="error">Неактивен</span>
                                        )}
                                        {result.country && `, Страна: ${result.country}`}
                                        {result.error && `, Ошибка: ${result.error}`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="prcheck-hint">Возможности прокси чекера:</div>
                    <div className="prcheck-scope">
                        <div>
                            <span>•</span> Проверка доступности IPv4 и IPv6 прокси
                        </div>
                        <div>
                            <span>•</span> Возможность проверки анонимных прокси с авторизацией по логину и паролю
                        </div>
                        <div>
                            <span>•</span> Проверка HTTP(-s) и SOCKS прокси
                        </div>
                        <div>
                            <span>•</span> Автоматическое определение протокола Прокси
                        </div>
                        <div>
                            <span>•</span> Автоматическое определение протокола прокси
                        </div>
                        <div>
                            <span>•</span> Автоматическое определение протокола прокси
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}