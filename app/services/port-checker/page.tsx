"use client"
import {FormEvent, useState} from "react";

interface PortCheckResult {
    ip: string;
    port: number;
    status: "open" | "closed" | string;
    responseTime: number;
    timestamp: string;
}

export default function PortChecker() {
    const [ip, setIP] = useState<string>("");
    const [port, setPort] = useState<string>("");
    const [result, setResult] = useState<PortCheckResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!ip || !port) {
            setError("Пожалуйста, заполните IP и порт");
            return;
        }

        const portNumber = parseInt(port, 10);
        if (isNaN(portNumber)) {
            setError("Порт должен быть числом");
            return;
        }

        if (portNumber < 1 || portNumber > 65535) {
            setError("Порт должен быть в диапазоне от 1 до 65535");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                "https://api.proxy.luxe/services/port-checker/check",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ip,
                        port: portNumber,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Ошибка при проверке порта");
            }

            const data: PortCheckResult = await response.json();
            setResult(data);
        } catch (err) {
            let errorMessage = "Произошла ошибка при проверке порта";
            if (err instanceof Error) {
                errorMessage = err.message;
            }
            setError(errorMessage);
            setResult(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="inner-page">
            <section className="prcheck">
                <div className="scontainer">
                    <h1 className="section-header"><span>ПРОВЕРКА ПОРТОВ</span></h1>

                    <p className="prcheck-text">
                        Простой и бесплатный онлайн-инструмент для проверки открытых портов на вашем, либо удаленном
                        компьютере / устройстве, будет полезен при тестировании настройки перенаправления портов на
                        машине. Например, если вы столкнулись с проблемой подключения к программе (электронная почта,
                        IM-клиент и т.д.), Возможно, что порт, требуемый приложением, блокируется брандмауэром или
                        интернет-провайдером, в таких случаях этот инструмент может помочь вам в диагностике проблемы.
                        Это также может быть полезно по соображениям безопасности, если вы беспокоитесь о том, открыт
                        или закрыт конкретный порт.
                    </p>

                    {isLoading && <div className="status-info">Проверка...</div>}
                    {error && <div className="status-info error">{error}</div>}
                    {result && (
                        <div className={`status-info ${result.status}`}>
                            Порт {result.port} на IP {result.ip} -{" "}
                            {result.status === "open" ? "ОТКРЫТ" : "ЗАКРЫТ"}
                        </div>
                    )}


                    <div className="port">
                        <form className="port-form" onSubmit={handleSubmit}>
                            <div className="port-form__inner">
                                <p className="port-form__hint">IP адрес</p>
                                <input
                                    name="ip"
                                    type="text"
                                    className="port-inp"
                                    placeholder="98.108.185.177"
                                    value={ip}
                                    onChange={(e) => setIP(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="port-form__inner">
                                <p className="port-form__hint">Порт</p>
                                <input
                                    name="port"
                                    type="text"
                                    className="port-inp"
                                    placeholder="8080"
                                    value={port}
                                    onChange={(e) => setPort(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn port-btn"
                                disabled={isLoading}
                            >
                                {isLoading ? "Проверка..." : "Проверить"}
                            </button>
                        </form>

                        <ul className="port-list">
                            <li>
                                <button onClick={() => setPort("80")}>HTTP - 80</button>
                            </li>
                            <li>
                                <button onClick={() => setPort("115")}>SFTP - 115</button>
                            </li>
                            <li>
                                <button onClick={() => setPort("25")}>SMTP - 25</button>
                            </li>
                            <li>
                                <button onClick={() => setPort("8080")}>HTTP - 8080</button>
                            </li>
                            <li>
                                <button onClick={() => setPort("21")}>FTP - 21</button>
                            </li>
                            <li>
                                <button onClick={() => setPort("22")}>SSH - 22</button>
                            </li>
                            <li>
                                <button onClick={() => setPort("143")}>IMAP - 143</button>
                            </li>
                            <li>
                                <button onClick={() => setPort("443")}>HTTPS - 443</button>
                            </li>
                            <li>
                                <button onClick={() => setPort("873")}>RSYNC - 873</button>
                            </li>
                            <li>
                                <button onClick={() => setPort("993")}>IMAPS - 993</button>
                            </li>
                            <li>
                                <button onClick={() => setPort("110")}>POP3 - 110</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    );
}