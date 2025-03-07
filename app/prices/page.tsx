import Flags from "@/assets/images/flags.png"
import Image from "next/image";

export default function Prices() {
    return (
        <main className="inner-page">
            <section className="price">
                <div className="scontainer">
                    <h1 className="section-header"><span>ЦЕНЫ НА ПРОКСИ</span></h1>
                    <p className="price-text">Бесплатный инструмент, с помощью которого вы можете проверить наличие
                        вашего, либо любого другого IP-адреса в базах данных антиспама. <br/>Будут ли заблокированы ваши
                        электронные сообщения или чаты форума? Проверка происходит по более 50 базам, которые
                        отслеживают черные списки IP-адресов.</p>
                    <h2 className="price-header"><span>IPv6</span> ПРОКСИ</h2>
                    <div className="table-wrap">
                        <div className="price-table">
                            <div className="price-table__row price-table__row--header">
                                <div className="tcountry">
                                    СТРАНА
                                </div>
                                <div className="tcount">
                                    КОЛ-ВО IP
                                </div>
                                <div className="tprice">
                                    СТОИМОСТЬ ОДНОГО IP
                                </div>
                            </div>
                            <div className="price-table__row price-table__row--subheader">
                                <div className="tcountry">

                                </div>
                                <div className="tcount">

                                </div>
                                <div className="tprice tprice-header">
                                    <div className="tprice-item">3 дня</div>
                                    <div className="tprice-item">1 неделя</div>
                                    <div className="tprice-item">2 недели</div>
                                    <div className="tprice-item">1 месяц</div>
                                </div>
                            </div>
                            <div className="price-table__row">
                                <div className="tcountry">
                                    <Image src={Flags} alt=""/>
                                </div>
                                <div className="tcount">
                                    1 − 9
                                </div>
                                <div className="tprice">
                                    <div className="tprice-item">3.6 руб.</div>
                                    <div className="tprice-item">6.72 руб.</div>
                                    <div className="tprice-item">12.6 руб.</div>
                                    <div className="tprice-item">25.2 руб.</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2 className="price-header"><span>IPv4</span> ПРОКСИ</h2>

                    <div className="table-wrap">
                        <div className="price-table">
                            <div className="price-table__row price-table__row--header">
                                <div className="tcountry">
                                    СТРАНА
                                </div>
                                <div className="tcount">
                                    КОЛ-ВО IP
                                </div>
                                <div className="tprice">
                                    СТОИМОСТЬ ОДНОГО IP
                                </div>
                            </div>
                            <div className="price-table__row price-table__row--subheader">
                                <div className="tcountry">

                                </div>
                                <div className="tcount">

                                </div>
                                <div className="tprice tprice-header">
                                    <div className="tprice-item">3 дня</div>
                                    <div className="tprice-item">1 неделя</div>
                                    <div className="tprice-item">2 недели</div>
                                    <div className="tprice-item">1 месяц</div>
                                </div>
                            </div>
                            <div className="price-table__row">
                                <div className="tcountry">
                                    <Image src={Flags} alt=""/>
                                </div>
                                <div className="tcount">
                                    1 − 9
                                </div>
                                <div className="tprice">
                                    <div className="tprice-item">3.6 руб.</div>
                                    <div className="tprice-item">6.72 руб.</div>
                                    <div className="tprice-item">12.6 руб.</div>
                                    <div className="tprice-item">25.2 руб.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className="price-header"><span>IPv4 SHARED</span> ПРОКСИ</h2>

                    <div className="table-wrap">
                        <div className="price-table">
                            <div className="price-table__row price-table__row--header">
                                <div className="tcountry">
                                    СТРАНА
                                </div>
                                <div className="tcount">
                                    КОЛ-ВО IP
                                </div>
                                <div className="tprice">
                                    СТОИМОСТЬ ОДНОГО IP
                                </div>
                            </div>
                            <div className="price-table__row price-table__row--subheader">
                                <div className="tcountry">

                                </div>
                                <div className="tcount">

                                </div>
                                <div className="tprice tprice-header">
                                    <div className="tprice-item">3 дня</div>
                                    <div className="tprice-item">1 неделя</div>
                                    <div className="tprice-item">2 недели</div>
                                    <div className="tprice-item">1 месяц</div>
                                </div>
                            </div>
                            <div className="price-table__row">
                                <div className="tcountry">
                                    <Image src={Flags} alt=""/>
                                </div>
                                <div className="tcount">
                                    1 − 9
                                </div>
                                <div className="tprice">
                                    <div className="tprice-item">3.6 руб.</div>
                                    <div className="tprice-item">6.72 руб.</div>
                                    <div className="tprice-item">12.6 руб.</div>
                                    <div className="tprice-item">25.2 руб.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}