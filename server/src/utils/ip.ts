import os from 'node:os';

export function getLocalIPs(): string[] {
  const interfaces = os.networkInterfaces();
  const ips: string[] = [];

  for (const name of Object.keys(interfaces)) {
    const nets = interfaces[name];
    if (!nets) continue;

    for (const net of nets) {
      // 跳过 IPv6 和回环地址
      if (net.family !== 'IPv4' || net.internal) continue;
      ips.push(net.address);
    }
  }

  return ips;
}