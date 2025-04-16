"use client";
import { VerificationPageBlock } from "@/widgets/blocks/verification-page/verification-page";
import { useTranslations } from "next-intl";

export default function VerificationCodePage() {
  const t = useTranslations();

  return (
    <main className="inner-page">
      <title>{t("verification-codes.title")}</title>
      <VerificationPageBlock />
    </main>
  );
}
