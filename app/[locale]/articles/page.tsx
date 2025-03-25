export default function Articles() {
    return (
        <main className="inner-page">
            <section className="articles">
                <div className="scontainer">
                    <h1 className="section-header"><span>статьи</span></h1>
                    <ul className="nav-list">
                        <li><a href="#">Инструкции</a></li>
                        <li><a href="#">Android</a></li>
                        <li><a href="#">SMTP - 25</a></li>
                        <li><a href="#">Proxy</a></li>
                        <li><a href="#">Mail</a></li>
                        <li><a href="#">SSH - 22</a></li>
                        <li><a href="#">IMAP - 143</a></li>
                        <li><a href="#">Apple</a></li>
                        <li><a href="#">Dns</a></li>
                        <li><a href="#">Вконтакте</a></li>
                        <li><a href="#">POP3 - 110</a></li>
                    </ul>
                    <div className="articles-inner">
                        <div className="article">
                            <div className="article-preview">
                                <img src="img/man-logo.png" alt=""/>
                            </div>
                            <div className="article-inner">
                                <h2 className="article-header">Настройка прокси в BroBot <span>20.03.2021</span></h2>
                                <p className="article-text">Brobot – приложение для работы с социальными сетями
                                    Одноклассники, ВКонтакте, LovePlanet, Мамба, работает с 2009 года. В этой инструкции
                                    мы рассмотрим, как подключить индивидуальный IPv4 прокси к программе Brobot.</p>
                                <div className="article-footer">
                                    <div className="article-tags">
                                        <img src="img/article-icon.png" alt=""/>
                                        <a href="#" className="article-tags__link">инструкции,</a>
                                        <a href="#" className="article-tags__link">brobot,</a>
                                        <a href="#" className="article-tags__link">настройка</a>
                                    </div>
                                    <a href="/articles/post" className="article-more">Читать далее...</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}