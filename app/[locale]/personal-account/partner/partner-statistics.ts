export type ReferralStatistics = {
  id: string; userId: string; createdAt: string;
  purchasesCount: number; purchasesTotal: string;
  commissionAmount: string | null; recordedCommission: string; commissionComplete: boolean;
};
export type PartnerDetails = {
  referrals: ReferralStatistics[];
  availableBalance: string; allTimeEarn: string;
};
const isDecimal = (value: unknown): value is string => typeof value === 'string' && /^\d+(?:\.\d+)?$/.test(value);
export function parsePartnerDetails(value: unknown): PartnerDetails {
  const data = value as PartnerDetails | undefined;
  if (!data || !isDecimal(data.availableBalance) || !isDecimal(data.allTimeEarn) || !Array.isArray(data.referrals) || data.referrals.some(row =>
    !row || typeof row.id !== 'string' || typeof row.userId !== 'string' || !Number.isFinite(Date.parse(row.createdAt)) ||
    !Number.isSafeInteger(row.purchasesCount) || row.purchasesCount < 0 || !isDecimal(row.purchasesTotal) ||
    !isDecimal(row.recordedCommission) || typeof row.commissionComplete !== 'boolean' ||
    (row.commissionComplete ? !isDecimal(row.commissionAmount) : row.commissionAmount !== null)
  )) throw new Error('Invalid partner statistics response');
  return data;
}
export function formatPartnerMoney(value: string, keepPrecision = false): string {
  const [whole, fraction = ''] = value.split('.');
  if (keepPrecision) return `${whole}.${fraction.replace(/0+$/, '').padEnd(2, '0')}`;
  // Decimal strings keep cents accurate even above Number.MAX_SAFE_INTEGER.
  let cents = BigInt(whole) * BigInt(100) + BigInt((fraction + '00').slice(0, 2));
  if (Number(fraction[2] || '0') >= 5) cents += BigInt(1);
  const digits = cents.toString().padStart(3, '0');
  return `${digits.slice(0, -2)}.${digits.slice(-2)}`;
}
