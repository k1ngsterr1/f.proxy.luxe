import { PrivacyBlock } from "@/widgets/blocks/privacy-page/privacy-block";
import { useTranslations } from "next-intl";

export default function PrivacyPolicy() {
  const i18n = useTranslations();

  return (
    <main className="inner-page">
      <title>{i18n("privacy-policys.title")}</title>
      <PrivacyBlock />
    </main>
  );
}
