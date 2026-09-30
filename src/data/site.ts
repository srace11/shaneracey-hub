// Site-wide details for the hub. Social links with an empty url are hidden.

export const site = {
  name: 'Shane Racey',
  url: 'https://shaneracey.com',
  role: 'Developer · Data Scientist',
  bio: 'I build small, focused apps. By day I work in data science; before that I studied operations research at Cornell and pole vaulted for Cornell and Kentucky.',
  description: 'Apps and projects by Shane Racey, a developer and data scientist.',
  email: '', // TODO: e.g. hello@shaneracey.com
  socials: [
    { label: 'GitHub', url: 'https://github.com/srace11' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/shaneracey/' },
    { label: 'Instagram', url: 'https://www.instagram.com/s_racey2/' },
    { label: 'X', url: '' }, // TODO
  ],
} as const;
