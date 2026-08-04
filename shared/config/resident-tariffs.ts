export const RESIDENT_TARIFF_PRICES = {
  "1 Gb": 2.4,
  "3 Gb": 7,
  "10 Gb": 21,
  "25 Gb": 50,
  "50 Gb": 90,
  "100 Gb": 170,
} as const;

export type ResidentTariffName = keyof typeof RESIDENT_TARIFF_PRICES;

export const RESIDENT_TARIFFS = Object.entries(RESIDENT_TARIFF_PRICES).map(
  ([name, price]) => ({
    name: name as ResidentTariffName,
    price,
  })
);
