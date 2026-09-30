// Typed access to apps.json. To add an app, add one entry to apps.json
// and put its icon in public/apps/.
import raw from './apps.json';

export type AppStatus = 'live' | 'beta' | 'soon';

export interface AppEntry {
  slug: string;
  name: string;
  description: string;
  icon: string;
  status: AppStatus;
  url: string;
  appStore?: string;
  googlePlay?: string;
}

const statuses: AppStatus[] = ['live', 'beta', 'soon'];

export const apps: AppEntry[] = (raw as AppEntry[]).map((a) => {
  if (!statuses.includes(a.status)) {
    throw new Error(`apps.json: "${a.slug}" has status "${a.status}". Use one of: ${statuses.join(', ')}.`);
  }
  return a;
});

export const statusLabel: Record<AppStatus, string> = {
  live: 'Live',
  beta: 'Beta',
  soon: 'Coming soon',
};
