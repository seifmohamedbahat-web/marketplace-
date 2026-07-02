import { surge } from './surge.js';
import { netlify } from './netlify.js';
import { vercel } from './vercel.js';
import { cloudflare } from './cloudflare.js';
import { ghPages } from './ghPages.js';

export const providers = [surge, netlify, vercel, cloudflare, ghPages];

export function getProvider(id) {
  const provider = providers.find((p) => p.id === id);
  if (!provider) {
    const known = providers.map((p) => p.id).join(', ');
    throw new Error(`Unknown provider "${id}". Known providers: ${known}`);
  }
  return provider;
}

export function readyProviders() {
  return providers.filter((p) => p.requiredEnv.every((key) => Boolean(process.env[key])));
}
