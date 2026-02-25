import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class JsonLogger implements LoggerService {
  private formatMessage(
    level: string,
    message: any,
    optionalParams: any[] = [],
  ): string {
    const [context, ...restParams] =
      optionalParams.length && typeof optionalParams[0] === 'string'
        ? [optionalParams[0], optionalParams.slice(1)]
        : [undefined, optionalParams];

    const payload: Record<string, unknown> = {
      timestamp: new Date().toISOString(),
      level,
      message,
    };

    if (context) {
      payload.context = context;
    }

    if (restParams.length) {
      payload.params = restParams;
    }

    return JSON.stringify(payload);
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

