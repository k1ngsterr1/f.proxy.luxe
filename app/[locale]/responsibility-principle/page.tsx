import ResponsibilityBlock from "@/widgets/blocks/responsibility-page/responsibility-page";
import { useTranslations } from "next-intl";

export default function ResponsibilityPrinciple() {
  const i18n = useTranslations();
  return (
    <main className="inner-page">
      <title>{i18n("responsibility-principless.title")}</title>
      <ResponsibilityBlock />
    </main>
  );
}
