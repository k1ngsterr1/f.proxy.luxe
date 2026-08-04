export type ProxyCopyProtocol = "http" | "socks5";

interface CopyableProxy {
  export?: { ports: number };
  ip: string;
  login: string;
  password: string;
  port_http?: number | string;
  port_socks?: number | string;
  type: string;
}

const formatProxyIp = (ip: string) => {
  if (ip.includes(":") && !ip.startsWith("[")) return `[${ip}]`;
  return ip;
};

export const getProxyCopyLines = (
  proxy: CopyableProxy,
  protocol: ProxyCopyProtocol
): string[] => {
  if (!proxy.ip || !proxy.login || !proxy.password) return [];

  const ip = formatProxyIp(proxy.ip);

  if (proxy.type === "resident") {
    const portCount = Number(proxy.export?.ports);
    if (!Number.isInteger(portCount) || portCount < 1) return [];

    return Array.from(
      { length: portCount },
      (_, index) => `${ip}:${10000 + index}:${proxy.login}:${proxy.password}`
    );
  }

  const port = protocol === "socks5" ? proxy.port_socks : proxy.port_http;
  if (!port) return [];

  return [`${ip}:${port}:${proxy.login}:${proxy.password}`];
};
