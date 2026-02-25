import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01T00:00:00.000Z'));
    logger = new JsonLogger();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('formats message as JSON with level and message', () => {
    // @ts-expect-no-error - access private for test purposes
    const result = (logger as any).formatMessage('log', 'hello', ['Context']);
    const parsed = JSON.parse(result);

    expect(parsed).toMatchObject({
      level: 'log',
      message: 'hello',
      context: 'Context',
      timestamp: '2020-01-01T00:00:00.000Z',
    });
  });

  it('writes formatted JSON to console.log', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});

    logger.log('hello', 'Context', { a: 1 });

    expect(spy).toHaveBeenCalledTimes(1);
    const payload = JSON.parse(spy.mock.calls[0][0] as string);
    expect(payload.level).toBe('log');
    expect(payload.message).toBe('hello');
    expect(payload.context).toBe('Context');
    expect(payload.params).toEqual([{ a: 1 }]);
  });
}

