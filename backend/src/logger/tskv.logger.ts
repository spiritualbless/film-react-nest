import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private stringifyValue(value: any): string {
    if (typeof value === 'string') {
      return value;
    }

    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }

  private escape(value: string): string {
    return value
      .replace(/\\/g, '\\\\')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/=/g, '\\=');
  }

  private formatMessage(
    level: string,
    message: any,
    optionalParams: any[] = [],
  ): string {
    const timestamp = new Date().toISOString();

    const [context, ...restParams] =
      optionalParams.length && typeof optionalParams[0] === 'string'
        ? [optionalParams[0], optionalParams.slice(1)]
        : [undefined, optionalParams];

    const fields: Record<string, string> = {
      time: timestamp,
      level,
      message: this.stringifyValue(message),
    };

    if (context) {
      fields.context = context;
    }

    if (restParams.length) {
      fields.params = this.stringifyValue(restParams);
    }

    return Object.entries(fields)
      .map(([key, value]) => `${key}=${this.escape(value)}`)
      .join('\t');
  }

  log(message: any, ...optionalParams: any[]): void {
    console.log(this.formatMessage('log', message, optionalParams));
  }

  error(message: any, ...optionalParams: any[]): void {
    console.error(this.formatMessage('error', message, optionalParams));
  }

  warn(message: any, ...optionalParams: any[]): void {
    console.warn(this.formatMessage('warn', message, optionalParams));
  }

  debug?(message: any, ...optionalParams: any[]): void {
    console.debug(this.formatMessage('debug', message, optionalParams));
  }

  verbose?(message: any, ...optionalParams: any[]): void {
    console.debug(this.formatMessage('verbose', message, optionalParams));
  }

  fatal?(message: any, ...optionalParams: any[]): void {
    console.error(this.formatMessage('fatal', message, optionalParams));
  }
}

