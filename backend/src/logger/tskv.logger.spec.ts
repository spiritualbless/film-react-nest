import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01T00:00:00.000Z'));
    logger = new TskvLogger();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('formats message in TSKV format', () => {
    // @ts-expect-no-error - access private for test purposes
    const result = (logger as any).formatMessage('log', 'hello', [
      'Context',
      { a: 1 },
    ]);

    expect(result).toBe(
      'time=2020-01-01T00:00:00.000Z\tlevel=log\tmessage=hello\tcontext=Context\tparams={"a":1}',
    );
  });

  it('writes formatted line to console.log', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});

    logger.log('hello', 'Context');

    expect(spy).toHaveBeenCalledTimes(1);
    const line = spy.mock.calls[0][0] as string;
    expect(line).toContain('level=log');
    expect(line).toContain('message=hello');
    expect(line).toContain('context=Context');
  });
}

