const IP_AUTHORIZATION_TYPES = new Set(["ipv6", "isp", "resident"]);

export const canManageIpAuthorization = (
  type: string,
  orderId?: string,
  orderNumber?: string,
): boolean => {
  const normalizedType = type.toLowerCase();

  return (
    IP_AUTHORIZATION_TYPES.has(normalizedType) &&
    Boolean(orderId) &&
    (normalizedType !== "resident" || Boolean(orderNumber))
  );
};
