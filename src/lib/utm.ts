export type UTMParams = {
  source: string;
  medium: string;
  campaign: string;
  term?: string;
  content?: string;
};

export type UTMValidation = {
  valid: boolean;
  issues: string[];
  params: UTMParams;
};

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

export function buildUtmUrl(input: string, params: UTMParams): string {
  const url = new URL(input.trim());
  const values: Record<string, string | undefined> = {
    utm_source: params.source,
    utm_medium: params.medium,
    utm_campaign: params.campaign,
    utm_term: params.term,
    utm_content: params.content,
  };

  Object.entries(values).forEach(([key, value]) => {
    if (value?.trim()) url.searchParams.set(key, value.trim());
    else url.searchParams.delete(key);
  });

  return url.toString();
}

export function readUtmParams(input: string): UTMParams {
  const url = new URL(input.trim());
  return {
    source: url.searchParams.get('utm_source') ?? '',
    medium: url.searchParams.get('utm_medium') ?? '',
    campaign: url.searchParams.get('utm_campaign') ?? '',
    term: url.searchParams.get('utm_term') ?? '',
    content: url.searchParams.get('utm_content') ?? '',
  };
}

export function validateUtmUrl(input: string): UTMValidation {
  const issues: string[] = [];
  let params: UTMParams = { source: '', medium: '', campaign: '', term: '', content: '' };

  try {
    const url = new URL(input.trim());
    if (!['http:', 'https:'].includes(url.protocol)) issues.push('Use an http:// or https:// URL.');
    if (url.username || url.password) issues.push('Remove embedded login credentials from the URL.');
    params = readUtmParams(input);
  } catch {
    issues.push('Enter a complete URL, including the protocol.');
  }

  if (!params.source.trim()) issues.push('Add a source so the platform is identifiable.');
  if (!params.medium.trim()) issues.push('Add a medium so the channel is identifiable.');
  if (!params.campaign.trim()) issues.push('Add a campaign name so the initiative is measurable.');

  const duplicateKeys = UTM_KEYS.filter((key) => input.match(new RegExp(`${key}=`, 'gi'))?.length && input.match(new RegExp(`${key}=`, 'gi'))!.length > 1);
  if (duplicateKeys.length) issues.push(`Remove duplicate parameters: ${duplicateKeys.join(', ')}.`);

  return { valid: issues.length === 0, issues, params };
}

export function csvEscape(value: string): string {
  return `"${value.replaceAll('"', '""')}"`;
}

