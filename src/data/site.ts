// Site-wide details for the hub. Social links with an empty url are hidden.

export const site = {
  name: 'Shane Racey',
  url: 'https://shaneracey.com',
  role: 'App Developer · Data Scientist',
  heading: "Hi, I'm Shane",
  bio: "I did my undergrad at Cornell and my Master's at Kentucky. I was a pole vaulter at both schools competing on their track and field teams. Now, I work as a data scientist in insurance while indie building small apps on the side. Check out my work below.",
  description: 'Apps and projects by Shane Racey, a developer and data scientist.',
  email: '', // TODO: e.g. hello@shaneracey.com
  socials: [
    { label: 'GitHub', url: 'https://github.com/srace11' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/shaneracey/' },
    { label: 'Instagram', url: 'https://www.instagram.com/s_racey2/' },
    { label: 'X', url: '' }, // TODO
  ],
} as const;
