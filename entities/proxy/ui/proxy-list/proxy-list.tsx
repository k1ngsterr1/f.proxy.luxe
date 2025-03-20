import React, { useEffect } from "react";

interface Props {
  proxies: any[];
}

const ProxyList: React.FC<Props> = ({ proxies }: any) => {
  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">IP-адрес</th>
            <th className="border p-2">Протокол</th>
            <th className="border p-2">Порт HTTP</th>
            <th className="border p-2">Порт SOCKS</th>
            <th className="border p-2">Страна</th>
          </tr>
        </thead>
        <tbody>
          {proxies?.map((proxy: any) => (
            <tr key={proxy.id} className="border">
              <td className="border p-2 text-center">{proxy.ip}</td>
              <td className="border p-2 text-center">{proxy.protocol}</td>
              <td className="border p-2 text-center">{proxy.port_http}</td>
              <td className="border p-2 text-center">{proxy.port_socks}</td>
              <td className="border p-2 text-center">{proxy.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProxyList;
