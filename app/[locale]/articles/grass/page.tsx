"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Calendar, Tag, ChevronUp, Loader } from "lucide-react";
import { useGetArticleById } from "@/entities/articles/hooks/queries/use-get-article-by-id.queries";
import { useTranslations, useLocale } from "next-intl";
import image from "../../../../assets/images/grass_cover.jpg";

function extractDateFromContent(content?: string): string | null {
  if (!content) return null;
  const dateRegex = /(\d{2})\.(\d{2})\.(\d{4})/;
  const match = content.match(dateRegex);
  return match ? match[0] : null;
}

function extractTagsFromContent(content?: string) {
  if (!content) return [{ id: 1, name: "статья", slug: "article" }];
  const categories = [
    { id: 1, name: "Инструкции", slug: "instructions" },
    { id: 2, name: "Android", slug: "android" },
    { id: 3, name: "SMTP - 25", slug: "smtp" },
    { id: 4, name: "Proxy", slug: "proxy" },
    { id: 5, name: "Mail", slug: "mail" },
    { id: 6, name: "SSH - 22", slug: "ssh" },
    { id: 7, name: "IMAP - 143", slug: "imap" },
    { id: 8, name: "Apple", slug: "apple" },
    { id: 9, name: "Dns", slug: "dns" },
    { id: 10, name: "Вконтакте", slug: "vk" },
    { id: 11, name: "POP3 - 110", slug: "pop3" },
  ];

  const tags = [];
  categories.forEach((category) => {
    if (content.toLowerCase().includes(category.name.toLowerCase())) {
      tags.push(category);
    }
  });

  if (tags.length === 0) {
    tags.push({ id: 999, name: "Общее", slug: "general" });
  }

  return tags;
}

export default function ArticlePage() {
  const t = useTranslations("article-slug");
  const locale = useLocale();
  const params = useParams();
  const articleId = params.slug as string;

  const {
    data: article,
    isLoading,
    isError,
    error,
  } = useGetArticleById(articleId);

  const [readingProgress, setReadingProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  const wordsPerMinute = 200;
  const wordCount = article?.content ? article.content.split(/\s+/).length : 0;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const totalHeight = articleRef.current.clientHeight;
      const windowHeight = window.innerHeight;
      const scrolled = window.scrollY;
      const progress = Math.min(
        (scrolled / (totalHeight - windowHeight)) * 100,
        100
      );
      setReadingProgress(progress);
      setShowScrollTop(scrolled > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fallbackContentRu = `
  <h1><strong>GRASS - как заработать, используя прокси и анти-детект браузер</strong></h1>

  <img src="https://media-hosting.imagekit.io/b4c89f872c9142d8/grass_cover.jpg?Expires=1839674543&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=OfJcFusGra38mI4d16hte5K4XllRFhEGhp04P4aV-1b3k8cz5AVoYTPU1N~QcO0bnsPierT8QbJ7lXQLWuOTWphdTUhH7Tgf5uWf41wWw425cTQ4qRbqEustAnYq268D6KkVXUfzfEmSX3DP1-qBz3Fw4hywBgcnm7zTqT3wApjxLDBQR9gMLBEp694yxkNHEvQox4-d1WlEw7BHWXb-Fcx8k1EMpQ3qDCm~4DPT1DEBma3pUuGVKYdYHdGp8VpkX0t54hDMwif7xIrPmbnrgog99d9bWocqpSD9MmJ4jFEnw5kg6QIoeFeWErRfks2GQhlKhBQWk3bnDmJ6wQC3Vw__" alt="GRASS проект" style="width:100%; border-radius:8px; margin: 20px 0;" />

  <p><strong>GRASS</strong> — легендарный и надежный проект среди DePIN-проектов. После листинга GRASS приятно удивил многих, поскольку пользователи смогли легко заработать 100–200 долларов США на каждом аккаунте. Для этого было достаточно установить расширение на свой компьютер, ноутбук или сервер.</p>

  <p>Расширение потребляет мало ресурсов и не мешает основной работе ПК, независимо от того, работаете вы на нём сами или используете ботов для заработка.</p>


  <h2>Ещё не поздно ли присоединиться к GRASS?</h2>
  <p><strong>Нет!</strong> Завершилась только первая эпоха, сейчас идёт вторая, поэтому ещё вполне можно успеть накопить токены GRASS.</p>

  <h2>🚀 Начинаем фармить:</h2>
  <ol>
    <li>Перейдите на сайт и пройдите простую регистрацию.</li>
    <li>Создайте кошелёк Solana:
      <ol>
        <li>Откройте расширение в антидетект-браузере и установите его.</li>
        <li>Запустите расширение, нажмите "Создать новый кошелёк".</li>
        <li>Скопируйте и сохраните сид-фразу (12 слов) — без неё восстановление невозможно.</li>
        <li>Нажмите "Я сохранил(а) свою фразу", вставьте фразу и нажмите "Продолжить".</li>
        <li>Придумайте и введите пароль, нажмите "Продолжить".</li>
        <li>Выберите "Быстрая настройка" → "Укажите Solana".</li>
      </ol>
    </li>
    <li>Пополните кошелёк минимум на 0.001 SOL. GRASS проверит баланс, но не спишет средства.</li>
    <li>Привяжите кошелёк на странице GRASS в разделе "Rewards" и подтвердите email.</li>
  </ol>

  <h3>💸 Где взять SOL?</h3>
  <p>Можно использовать обменники (минимум $0.15) или написать мне — перевести 20₽ на Payeer, и я отправлю вам 0.001 SOL.</p>

  <img src="https://media-hosting.imagekit.io/78c04c11869c4ee4/grass_2.jpg?Expires=1839674543&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Wq5uIS9kiwlznqYsCwxctCz3NlFn5HXyCGkOQUmGA06ySZer1XCBV1NUA~tx22GsRm25V45CMzRuqG6l1I6SCc6u18vM7gQvihtVmgSMoc9Z~htAPx38-I3sc6l5pNh97mSMzRmNCUmrEdJEk~N4cHK0JNJLFFjySagiMUFgHHEwvfDoz1BWqXel7mY6h~irfKr~eL3vDmT~1Lk4Vd2Kuw0HpYWz9mICyFX9YbpRUFvM66-c-P7m4~F1M8NMF4Zl41ja-pSSZ-YjpmX4MBO8cWNVuvMXmN7yRVzATsoairWTsvgiZvz8z5IuYxiG4Vo6-TQDhlI2JcY1jeVcetErHw__" alt="Способы фарма GRASS" style="width:50%;  border-radius:8px; margin: 20px 0;" />

  <h2>✅ Фармим:</h2>
  <ul>
    <li><strong>🖥 Приложение на ПК:</strong> даёт в 2 раза больше поинтов. Потребляет 5 МБ ОЗУ. [ссылка на приложение]</li>
    <li><strong>🌐 Расширение в браузере:</strong> работает, пока браузер открыт.</li>
  </ul>

  <h3>⚠️ Важно!</h3>
  <p>Если видите "Качество подключения 0%" — подождите. Если через 30 минут не работает — смените прокси.</p>

  <h2>🎁 Аирдроп второго сезона</h2>
  <p>В этом сезоне будет распределено <strong>17%</strong> токенов (в первом было 10%). Сейчас — лучшее время для входа!</p>
  <p>Эпохи обычно длятся около месяца. В прошлый раз всё заняло около 10 месяцев, но участники остались довольны.</p>
`;

  const fallbackContentEn = `
  <h1><strong>GRASS – How to Earn Using Proxies and Anti-Detect Browser</strong></h1>

  <img src="https://media-hosting.imagekit.io/b4c89f872c9142d8/grass_cover.jpg?Expires=1839674543&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=OfJcFusGra38mI4d16hte5K4XllRFhEGhp04P4aV-1b3k8cz5AVoYTPU1N~QcO0bnsPierT8QbJ7lXQLWuOTWphdTUhH7Tgf5uWf41wWw425cTQ4qRbqEustAnYq268D6KkVXUfzfEmSX3DP1-qBz3Fw4hywBgcnm7zTqT3wApjxLDBQR9gMLBEp694yxkNHEvQox4-d1WlEw7BHWXb-Fcx8k1EMpQ3qDCm~4DPT1DEBma3pUuGVKYdYHdGp8VpkX0t54hDMwif7xIrPmbnrgog99d9bWocqpSD9MmJ4jFEnw5kg6QIoeFeWErRfks2GQhlKhBQWk3bnDmJ6wQC3Vw__" alt="GRASS project overview" style="width:100%; border-radius:8px; margin: 20px 0;" />

  <p><strong>GRASS</strong> is a legendary and reliable project among DePIN protocols. After listing, GRASS surprised many — users easily earned $100–$200 per account by simply installing a browser extension on a computer, laptop, or server.</p>

  <p>The extension uses few resources and doesn’t interfere with the PC, whether you’re working on it or running bots.</p>


  <h2>Is it too late to join GRASS?</h2>
  <p><strong>No!</strong> The first epoch has ended, the second is ongoing. You still have time to earn GRASS tokens.</p>

  <h2>🚀 Let’s Start Farming:</h2>
  <ol>
    <li>Go to the GRASS website and register.</li>
    <li>Create a Solana wallet:
      <ol>
        <li>Open the extension in an anti-detect browser and install it.</li>
        <li>Launch the extension, click "Create new wallet".</li>
        <li>Copy and save the seed phrase (12 words) — you can't restore without it.</li>
        <li>Click "I saved my phrase", paste it, and continue.</li>
        <li>Create a password, save it, and click continue.</li>
        <li>Choose "Quick setup" → "Select Solana".</li>
      </ol>
    </li>
    <li>Top up your wallet with at least 0.001 SOL. GRASS will check for balance but won’t withdraw.</li>
    <li>Link the wallet in the "Rewards" section and confirm your email.</li>
  </ol>

  <h3>💸 Where to Get SOL?</h3>
  <p>You can use exchanges (minimum $0.15) or message me — send 20 RUB via Payeer, and I’ll send 0.001 SOL to your wallet.</p>

  <img src="https://media-hosting.imagekit.io/78c04c11869c4ee4/grass_2.jpg?Expires=1839674543&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Wq5uIS9kiwlznqYsCwxctCz3NlFn5HXyCGkOQUmGA06ySZer1XCBV1NUA~tx22GsRm25V45CMzRuqG6l1I6SCc6u18vM7gQvihtVmgSMoc9Z~htAPx38-I3sc6l5pNh97mSMzRmNCUmrEdJEk~N4cHK0JNJLFFjySagiMUFgHHEwvfDoz1BWqXel7mY6h~irfKr~eL3vDmT~1Lk4Vd2Kuw0HpYWz9mICyFX9YbpRUFvM66-c-P7m4~F1M8NMF4Zl41ja-pSSZ-YjpmX4MBO8cWNVuvMXmN7yRVzATsoairWTsvgiZvz8z5IuYxiG4Vo6-TQDhlI2JcY1jeVcetErHw__" alt="Farming methods" style="width:50%; border-radius:8px; margin: 20px 0;" />

  <h2>✅ Start Farming:</h2>
  <ul>
    <li><strong>🖥 Desktop App:</strong> earns 2x more points. Uses just 5 MB RAM. [app link]</li>
    <li><strong>🌐 Browser Extension:</strong> works while the browser is open.</li>
  </ul>

  <h3>⚠️ Important!</h3>
  <p>If you see "Connection quality 0%", wait a bit. If nothing changes after 30 mins — switch your proxy.</p>

  <h2>🎁 Second Season Airdrop</h2>
  <p>This season distributes <strong>17%</strong> of tokens (compared to 10% in season 1). It's the perfect time to join!</p>
  <p>Epochs usually last about a month. Last time took ~10 months total, but results were worth it.</p>
`;

  const fallbackContent =
    locale === "en" ? fallbackContentEn : fallbackContentRu;

  return (
    <main
      className="inner-page"
      style={{ backgroundColor: "#000000", color: "#FFFFFF" }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "4px",
          width: `${readingProgress}%`,
          backgroundColor: "#f3d675",
          zIndex: 1000,
          transition: "width 0.2s ease",
        }}
      />

      <section className="article" style={{ padding: "60px 0" }}>
        <div
          className="scontainer"
          style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px" }}
        >
          {isLoading ? (
            <div
              style={{
                backgroundColor: "rgba(243, 214, 117, 0.05)",
                border: "1px solid rgba(243, 214, 117, 0.2)",
                borderRadius: "8px",
                padding: "40px 20px",
                textAlign: "center",
                marginBottom: "40px",
              }}
            >
              <Loader
                size={40}
                className="animate-spin"
                style={{ color: "#f3d675", marginBottom: "16px" }}
              />
              <h3 style={{ color: "#f3d675", marginBottom: "8px" }}>
                {t("article.loading")}
              </h3>
            </div>
          ) : isError ? (
            <div
              style={{
                backgroundColor: "rgba(255, 82, 82, 0.1)",
                border: "1px solid rgba(255, 82, 82, 0.2)",
                borderRadius: "8px",
                padding: "40px 20px",
                textAlign: "center",
                marginBottom: "40px",
              }}
            >
              <Tag
                size={40}
                style={{ color: "#FF5252", marginBottom: "16px" }}
              />
              <h3 style={{ color: "#FF5252", marginBottom: "8px" }}>
                {t("article.error_title")}
              </h3>
              <p style={{ color: "#999999" }}>
                {error?.message || t("article.error_description")}
              </p>
            </div>
          ) : (
            <>
              <h1
                className="section-header"
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  marginBottom: "32px",
                  textAlign: "center",
                }}
              >
                <span style={{ color: "#f3d675", padding: "0 20px" }}>
                  {article?.title ||
                    (locale === "en"
                      ? "GRASS — DePIN Farming Project"
                      : "GRASS — DePIN проект с фармом")}
                </span>
              </h1>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "24px",
                  marginBottom: "40px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#999999",
                  }}
                >
                  <Calendar size={16} style={{ color: "#f3d675" }} />
                  <span style={{ fontSize: "14px" }}>
                    {extractDateFromContent(article?.content) || "19.04.2025"}
                  </span>
                </div>
              </div>

              <div
                className="article-body"
                ref={articleRef}
                style={{
                  backgroundColor: "rgba(243, 214, 117, 0.03)",
                  borderRadius: "12px",
                  border: "1px solid rgba(243, 214, 117, 0.1)",
                  padding: "40px",
                  fontSize: "16px",
                  lineHeight: 1.7,
                  color: "#E0E0E0",
                }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: article?.content || fallbackContent,
                  }}
                />

                <div
                  className="article-footer"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "40px",
                    paddingTop: "20px",
                    borderTop: "1px solid rgba(243, 214, 117, 0.2)",
                    flexWrap: "wrap",
                    gap: "16px",
                  }}
                >
                  <div
                    className="article-tags"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    <Tag size={18} style={{ color: "#f3d675" }} />
                    {extractTagsFromContent(
                      article?.content || fallbackContent
                    ).map((tag, index) => (
                      <Link
                        key={index}
                        href={`/tags/${tag.slug}`}
                        style={{
                          color: "#f3d675",
                          textDecoration: "none",
                          fontSize: "14px",
                          padding: "4px 12px",
                          backgroundColor: "rgba(243, 214, 117, 0.1)",
                          borderRadius: "20px",
                        }}
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "#f3d675",
            color: "#000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            border: "none",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            transition: "all 0.3s ease",
          }}
        >
          <ChevronUp size={24} />
        </button>
      )}
    </main>
  );
}
