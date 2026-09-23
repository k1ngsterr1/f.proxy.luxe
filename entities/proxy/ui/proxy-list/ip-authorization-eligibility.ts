const IP_AUTHORIZATION_TYPES = new Set(["ipv6", "isp", "resident"]);

export const canManageIpAuthorization = (
  type: string,
  orderId?: string,
  orderNumber?: string,
  providerProxyId?: string,
): boolean => {
  const normalizedType = type.toLowerCase();
  const hasProviderReference =
    normalizedType === "resident"
      ? Boolean(orderNumber)
      : Boolean(providerProxyId);

  return (
    IP_AUTHORIZATION_TYPES.has(normalizedType) &&
    Boolean(orderId) &&
    hasProviderReference
  );
};
