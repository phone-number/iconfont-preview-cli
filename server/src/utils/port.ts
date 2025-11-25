import portfinder from "portfinder";

/**
 * 从给定的端口开始寻找可用端口
 * @param startPort 开始端口
 * @returns 可用端口
 */
export const findAvailablePort = async (startPort: number) => {
  return await portfinder.getPortPromise({ port: startPort });
};