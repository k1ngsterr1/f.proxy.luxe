import { Metadata } from "next";
import HomeClient from "./home-client";

export async function generateMetadata(): Promise<Metadata> {
  return {
    keywords: [
      "купить прокси",
      "ipv6 прокси",
      "ipv4 прокси",
      "индивидуальные прокси",
      "персональные прокси",
      "анонимные прокси",
      "прокси дешево",
      "купить proxy",
      "proxy ru",
      "https прокси",
      "socks5 прокси",
      "быстрые прокси",
      "стабильные прокси",
      "резидентские прокси",
      "ISP",
      "резидентные",
    ],
    description:
      "Купить прокси дешево, индивидуальные резидентские и анонимные. IPv4, IPv6, резидентские прокси. HTTPs, Socks5 прокси. Прокси для социальных сетей.",
  };
}

export default function Home() {
  return <HomeClient />;
}
