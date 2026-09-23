const IP_AUTHORIZATION_TYPES = new Set(["ipv6", "isp", "resident"]);

export const canManageIpAuthorization = (
  type: string,
  orderId?: string,
): boolean =>
  IP_AUTHORIZATION_TYPES.has(type.toLowerCase()) && Boolean(orderId);
