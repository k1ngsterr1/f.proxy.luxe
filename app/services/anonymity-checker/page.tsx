"use client";

import {useEffect, useState} from "react";
import {UAParser} from "ua-parser-js";

interface IpData {
    ip: string;
    hostname?: string;
    city?: string;
    region?: string;
    country?: string;
    postal?: string;
    timezone?: string;
    loc?: string;
    org?: string;
}

interface ProxyData {
    isProxy: boolean;
    isVPN: boolean;
    isTor: boolean;
}

interface BlacklistData {
    isBlacklisted: boolean;
    reports: number;
}

export default function AnonymityChecker() {
    const [ipData, setIpData] = useState<IpData | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [proxyData, setProxyData] = useState<ProxyData>({
        isProxy: false,
        isVPN: false,
        isTor: false,
    });
    const [blacklistData, setBlacklistData] = useState<BlacklistData>({
        isBlacklisted: false,
        reports: 0,
    });
    const [webRTC, setWebRTC] = useState(false);
    const [flash, setFlash] = useState(false);
    const [java, setJava] = useState(false);
    const [activeX, setActiveX] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Получаем данные о IP
    useEffect(() => {
        const fetchIpData = async () => {
            try {
                const response = await fetch("https://ipinfo.io/json?token=d81de8201144f2");
                if (!response.ok) {
                    throw new Error("Ошибка при загрузке данных");
                }
                const data = await response.json();
                setIpData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Неизвестная ошибка");
            }
        };

        fetchIpData();
    }, []);

    // Получаем данные о браузере и системе
    useEffect(() => {
        const parser = new UAParser();
        const result = parser.getResult();
        setUserData(result);
    }, []);

    // Проверка прокси, VPN, Tor
    useEffect(() => {
        const fetchProxyData = async () => {
            if (!ipData?.ip) return;

            try {
                const response = await fetch(`https://v2.api.iphub.info/ip/${ipData.ip}`, {
                    headers: {
                        "X-Key": "MjcwNTQ6eVdqOVFua0xSZ0hLZGtHbnRLcEJxaWFSTEVDOGVLN0Y=",
                    },
                });
                const data = await response.json();
                setProxyData({
                    isProxy: data.proxy === 1,
                    isVPN: data.vpn === 1,
                    isTor: data.tor === 1,
                });
            } catch (err) {
                console.error("Ошибка при проверке прокси/VPN/Tor:", err);
            }
        };

        fetchProxyData();
    }, [ipData]);

    // Проверка черного списка
    useEffect(() => {
        const fetchBlacklistData = async () => {
            if (!ipData?.ip) return;

            try {
                const response = await fetch(`https://api.abuseipdb.com/api/v2/check?ipAddress=${ipData.ip}`, {
                    headers: {
                        "Key": "94ae7b413f40717fa4812d85526f40892f6e9c041eaa9d6c558812349d5fe0ffece3f68b5e6fc61d",
                        "Accept": "application/json",
                    },
                });
                const data = await response.json();
                setBlacklistData({
                    isBlacklisted: data.data.abuseConfidenceScore > 0,
                    reports: data.data.totalReports,
                });
            } catch (err) {
                console.error("Ошибка при проверке черного списка:", err);
            }
        };

        fetchBlacklistData();
    }, [ipData]);

    // Проверка WebRTC
    useEffect(() => {
        const checkWebRTC = () => {
            return new Promise((resolve) => {
                const pc = new RTCPeerConnection({iceServers: []});
                pc.createDataChannel("");
                pc.createOffer()
                    .then((offer) => pc.setLocalDescription(offer))
                    .catch(() => {
                    });

                pc.onicecandidate = (ice) => {
                    if (!ice.candidate) {
                        resolve(false);
                        return;
                    }
                    const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
                    const ipMatch = ipRegex.exec(ice.candidate.candidate);
                    if (ipMatch) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                };
            });
        };

        checkWebRTC().then(setWebRTC);
    }, []);

    // Проверка Flash, Java, ActiveX
    useEffect(() => {
        const checkFlash = () => {
            try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                return Boolean(navigator.mimeTypes["application/x-shockwave-flash"]);
            } catch (e) {
                return false;
            }
        };

        const checkJava = () => {
            try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                return Boolean(navigator.javaEnabled());
            } catch (e) {
                return false;
            }
        };

        const checkActiveX = () => {
            try {
                // @ts-ignore
                return Boolean(window.ActiveXObject);
            } catch (e) {
                return false;
            }
        };

        setFlash(checkFlash());
        setJava(checkJava());
        setActiveX(checkActiveX());
    }, []);

    // Завершение загрузки
    useEffect(() => {
        if (ipData && userData) {
            setLoading(false);
        }
    }, [ipData, userData]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    if (!ipData || !userData) {
        return <div>Данные не найдены</div>;
    }

    // Разделяем координаты на широту и долготу
    const [latitude, longitude] = ipData.loc ? ipData.loc.split(",") : [null, null];

    return (
        <main className="inner-page">
            <section className="prcheck">
                <div className="scontainer">
                    <h1 className="section-header"><span>ПРОВЕРКА АНОНИМНОСТИ</span></h1>
                    <p className="prcheck-text">
                        С помощью данного сервиса вы можете проверить, насколько вы анонимны в сети, насколько данные,
                        предоставляемые вашим компьютером/браузером, совпадают с данными, предоставляемыми вашим
                        IP-адресом.
                    </p>
                    <div className="anon">
                        <div className="anon-inner">
                            <div className="anon-item anon-item--myip">
                                <div className="anon-item__row ccenter">
                                    <div className="atitle">
                                        Мой IP
                                        <span className="atitle-ip">
                                            {ipData.ip}
                                        </span>
                                        <a href="#" className="atitle-hideip">
                                            Скрыть IP
                                        </a>
                                    </div>
                                    <div className="atext">
                                        <div className="astatus astatus--gold">
                                            Whois
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="anon-item">
                                <div className="anon-item__row ccenter">
                                    <div className="atitle">
                                        Хост
                                    </div>
                                    <div className="atext atext--double">
                                        <span>{ipData.hostname || "Неизвестно"}</span>
                                        <a href="#" className="astatus astatus--gold">
                                            Whois
                                        </a>
                                    </div>
                                </div>
                                <div className="anon-item__row ccenter">
                                    <div className="atitle">
                                        Страна
                                    </div>
                                    <div className="atext">
                                        <span>{ipData.country} ({ipData.region})</span>
                                        <img src="img/rus-lang.png" alt=""/>
                                    </div>
                                </div>
                                <div className="anon-item__row">
                                    <div className="atitle">
                                        Город
                                    </div>
                                    <div className="atext">
                                        {ipData.city || "Неизвестно"}
                                    </div>
                                </div>
                                <div className="anon-item__row">
                                    <div className="atitle">
                                        Почтовый индекс
                                    </div>
                                    <div className="atext">
                                        {ipData.postal || "Неизвестно"}
                                    </div>
                                </div>
                                <div className="anon-item__row ccenter">
                                    <div className="atitle">
                                        Координаты
                                    </div>
                                    <div className="atext atext--double">
                                        <span>{ipData.loc || "Неизвестно"}</span>
                                        <a href="#" className="astatus astatus--gold">
                                            Карта
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="anon-item">
                                <div className="anon-item__row">
                                    <div className="atitle">
                                        ОС
                                    </div>
                                    <div className="atext">
                                        {userData.os.name} {userData.os.version}
                                    </div>
                                </div>
                                <div className="anon-item__row">
                                    <div className="atitle">
                                        Браузер
                                    </div>
                                    <div className="atext">
                                        {userData.browser.name} {userData.browser.version}
                                    </div>
                                </div>
                            </div>
                            <div className="anon-item">
                                <div className="anon-item__row">
                                    <div className="atitle">
                                        Временная зона IP
                                    </div>
                                    <div className="atext">
                                        {ipData.timezone || "Неизвестно"}
                                    </div>
                                </div>
                                <div className="anon-item__row">
                                    <div className="atitle">
                                        Время IP
                                    </div>
                                    <div className="atext">
                                        {new Date().toLocaleString()}
                                    </div>
                                </div>
                                <div className="anon-item__row">
                                    <div className="atitle">
                                        Время системное
                                    </div>
                                    <div className="atext">
                                        {new Date().toLocaleString()}
                                    </div>
                                </div>
                            </div>
                            <div className="anon-item">
                                <div className="anon-item__row">
                                    <div className="atitle">
                                        UserAgent
                                    </div>
                                    <div className="atext">
                                        {navigator.userAgent}
                                    </div>
                                </div>
                                <div className="anon-item__row ccenter">
                                    <div className="atitle">
                                        UserAgent JS
                                    </div>
                                    <div className="atext">
                                        <div className="astatus astatus--green">
                                            Совпадает
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="anon-item">
                                <div className="anon-item__row">
                                    <div className="atitle">
                                        Язык
                                    </div>
                                    <div className="atext">
                                        {navigator.language}
                                    </div>
                                </div>
                                <div className="anon-item__row ccenter">
                                    <div className="atitle">
                                        Браузер
                                    </div>
                                    <div className="atext">
                                        <span>{navigator.language}</span>
                                        <img src="img/rus-lang.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="anon-item">
                                <div className="anon-item__row">
                                    <div className="atitle">
                                        Экран
                                    </div>
                                    <div className="atext">
                                        {window.screen.width}x{window.screen.height}, {window.screen.colorDepth} бит
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="anon-inner">
                            <div className="anon-status anon-status--red">
                                Моя анонимность 80%
                            </div>
                            <div className="anon-item anon-item--status">
                                <div className="anon-item__row">
                                    <div className="atitle">Прокси</div>
                                    <div className="atext">
                                        <div className={`astatus astatus--${proxyData.isProxy ? "red" : "green"}`}>
                                            {proxyData.isProxy ? "Yes" : "No"}
                                        </div>
                                    </div>
                                </div>
                                <div className="anon-item__row">
                                    <div className="atitle">VPN</div>
                                    <div className="atext">
                                        <div className={`astatus astatus--${proxyData.isVPN ? "red" : "green"}`}>
                                            {proxyData.isVPN ? "Yes" : "No"}
                                        </div>
                                    </div>
                                </div>
                                <div className="anon-item__row">
                                    <div className="atitle">Tor</div>
                                    <div className="atext">
                                        <div className={`astatus astatus--${proxyData.isTor ? "red" : "green"}`}>
                                            {proxyData.isTor ? "Yes" : "No"}
                                        </div>
                                    </div>
                                </div>
                                <div className="anon-item__row">
                                    <div className="atitle">Черный список</div>
                                    <div className="atext">
                                        <div
                                            className={`astatus astatus--${blacklistData.isBlacklisted ? "red" : "green"}`}>
                                            {blacklistData.isBlacklisted ? "Yes" : "No"}
                                        </div>
                                    </div>
                                </div>
                                <div className="anon-item__row">
                                    <div className="atitle">WebRTC</div>
                                    <div className="atext">
                                        <div className={`astatus astatus--${webRTC ? "red" : "green"}`}>
                                            {webRTC ? "Yes" : "No"}
                                        </div>
                                    </div>
                                </div>
                                <div className="anon-item__row">
                                    <div className="atitle">Flash</div>
                                    <div className="atext">
                                        <div className={`astatus astatus--${flash ? "red" : "green"}`}>
                                            {flash ? "Yes" : "No"}
                                        </div>
                                    </div>
                                </div>
                                <div className="anon-item__row">
                                    <div className="atitle">Java</div>
                                    <div className="atext">
                                        <div className={`astatus astatus--${java ? "red" : "green"}`}>
                                            {java ? "Yes" : "No"}
                                        </div>
                                    </div>
                                </div>
                                <div className="anon-item__row">
                                    <div className="atitle">ActiveX</div>
                                    <div className="atext">
                                        <div className={`astatus astatus--${activeX ? "red" : "green"}`}>
                                            {activeX ? "Yes" : "No"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}