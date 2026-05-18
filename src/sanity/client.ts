import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'i22von0a',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2024-05-04', // use current date (YYYY-MM-DD) to target the latest API version
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
