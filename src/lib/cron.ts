import { CronExpressionParser } from 'cron-parser';
import cronstrue from 'cronstrue';

export type CronResult = {
  valid: boolean;
  description: string;
  nextRuns: string[];
  error?: string;
};

export type CronBuildOptions = {
  minute: string;
  hour: string;
  day: string;
  month: string;
  weekday: string;
};

export function buildCron(options: CronBuildOptions): string {
  return [options.minute, options.hour, options.day, options.month, options.weekday].map((value) => value.trim() || '*').join(' ');
}

export function describeCron(expression: string): string {
  return cronstrue.toString(expression.trim(), { use24HourTimeFormat: true });
}

export function inspectCron(expression: string, currentDate = new Date(), timezone = 'UTC'): CronResult {
  const normalized = expression.trim();
  if (!normalized) return { valid: false, description: '', nextRuns: [], error: 'Enter a cron expression.' };

  try {
    const description = describeCron(normalized);
    const interval = CronExpressionParser.parse(normalized, { currentDate, tz: timezone });
    const nextRuns = Array.from({ length: 3 }, () => interval.next().toDate().toISOString());
    return { valid: true, description, nextRuns };
  } catch (error) {
    return { valid: false, description: '', nextRuns: [], error: error instanceof Error ? error.message : 'This expression is not valid for the selected parser.' };
  }
}

