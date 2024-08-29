import { EXTENSION_NAME_SHORT } from '../config';

function generateShortId(): string {
  return Math.random().toString(36).substr(2, 6);
}

// LogLevel 枚举，定义日志级别
enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR,
}

// Logger 类
class Logger {
  private level: LogLevel;

  constructor(level: LogLevel = LogLevel.INFO) {
    this.level = level;
  }

  // 设置日志级别的方法
  public setLevel(level: LogLevel) {
    this.level = level;
  }

  // 调试日志
  public debug(message: string, ...params: any[]): void {
    if (this.level <= LogLevel.DEBUG) {
      console.debug(
        `[${EXTENSION_NAME_SHORT}] [DEBUG] (#${generateShortId()}) ${message}`,
        ...params
      );
    }
  }

  // 信息日志
  public info(message: string, ...params: any[]): void {
    if (this.level <= LogLevel.INFO) {
      console.info(
        `[${EXTENSION_NAME_SHORT}] [INFO] (#${generateShortId()}) ${message}`,
        ...params
      );
    }
  }

  // 警告日志
  public warn(message: string, ...params: any[]): void {
    if (this.level <= LogLevel.WARN) {
      console.warn(
        `[${EXTENSION_NAME_SHORT}] [WARN] (#${generateShortId()}) ${message}`,
        ...params
      );
    }
  }

  // 错误日志
  public error(message: string, ...params: any[]): void {
    if (this.level <= LogLevel.ERROR) {
      console.error(
        `[${EXTENSION_NAME_SHORT}] [ERROR] (#${generateShortId()}) ${message}`,
        ...params
      );
    }
  }
}

// 可以导出 Logger 类实例，或直接导出 Logger 类供外部创建实例
export const logger = new Logger();

// 也可以导出 Logger 类和 LogLevel 枚举，以便可以创建具有不同配置的Logger实例
export { Logger, LogLevel };
