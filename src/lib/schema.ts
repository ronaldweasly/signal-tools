export type SchemaType = 'Article' | 'FAQPage' | 'Organization' | 'Product' | 'Event' | 'BreadcrumbList' | 'LocalBusiness';

export type SchemaFields = Record<string, string | Array<{ question: string; answer: string }> | Array<{ name: string; url: string }>>;

export const SCHEMA_TYPES: Array<{ id: SchemaType; label: string; description: string }> = [
  { id: 'Article', label: 'Article', description: 'Editorial or blog content.' },
  { id: 'FAQPage', label: 'FAQ page', description: 'Questions and answers on one page.' },
  { id: 'Organization', label: 'Organization', description: 'Brand identity and contact details.' },
  { id: 'Product', label: 'Product', description: 'A product with an offer and optional rating.' },
  { id: 'Event', label: 'Event', description: 'A scheduled event with place and dates.' },
  { id: 'BreadcrumbList', label: 'Breadcrumbs', description: 'A navigational breadcrumb trail.' },
  { id: 'LocalBusiness', label: 'Local business', description: 'A business with location and contact details.' },
];

export function generateSchema(type: SchemaType, fields: SchemaFields): Record<string, unknown> {
  const base = { '@context': 'https://schema.org', '@type': type } as Record<string, unknown>;

  switch (type) {
    case 'FAQPage':
      return {
        ...base,
        mainEntity: (fields.questions as Array<{ question: string; answer: string }> | undefined ?? [])
          .filter((item) => item.question.trim() && item.answer.trim())
          .map((item) => ({ '@type': 'Question', name: item.question.trim(), acceptedAnswer: { '@type': 'Answer', text: item.answer.trim() } })),
      };
    case 'BreadcrumbList':
      return {
        ...base,
        itemListElement: (fields.items as Array<{ name: string; url: string }> | undefined ?? [])
          .filter((item) => item.name.trim() && item.url.trim())
          .map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name.trim(), item: item.url.trim() })),
      };
    case 'Article':
      return { ...base, headline: fields.headline, author: { '@type': 'Person', name: fields.author }, datePublished: fields.datePublished, image: fields.image, url: fields.url };
    case 'Organization':
      return { ...base, name: fields.name, url: fields.url, logo: fields.logo, sameAs: typeof fields.sameAs === 'string' ? fields.sameAs.split('\n').map((item) => item.trim()).filter(Boolean) : [] };
    case 'Product':
      return { ...base, name: fields.name, description: fields.description, image: fields.image, offers: { '@type': 'Offer', price: fields.price, priceCurrency: fields.currency || 'USD', availability: 'https://schema.org/InStock', url: fields.url } };
    case 'Event':
      return { ...base, name: fields.name, description: fields.description, startDate: fields.startDate, endDate: fields.endDate, eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode', location: { '@type': 'VirtualLocation', url: fields.url } };
    case 'LocalBusiness':
      return { ...base, name: fields.name, url: fields.url, telephone: fields.telephone, address: { '@type': 'PostalAddress', streetAddress: fields.streetAddress, addressLocality: fields.city, addressRegion: fields.region, postalCode: fields.postalCode, addressCountry: fields.country || 'US' } };
  }
}

export function validateSchema(type: SchemaType, fields: SchemaFields): string[] {
  const required = type === 'FAQPage' ? [] : type === 'BreadcrumbList' ? [] : ['name'];
  return required.filter((key) => typeof fields[key] !== 'string' || !String(fields[key]).trim()).map((key) => `Add a value for ${key}.`);
}

export function jsonLdScript(schema: Record<string, unknown>): string {
  return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n<\/script>`;
}

