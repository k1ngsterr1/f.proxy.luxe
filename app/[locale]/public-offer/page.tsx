import PublicOfferPage from "@/widgets/blocks/public-offer-page/public-offer-block";
import { useTranslations } from "next-intl";

export default function PublicOffer() {
  const i18n = useTranslations();

  return (
    <main className="inner-page">
      <title>{i18n("public-offers.title")}</title>

      <PublicOfferPage />
    </main>
  );
}
