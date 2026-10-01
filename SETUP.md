# shaneracey-hub: setup guide

The hub is the one-page portfolio at `https://shaneracey.com`. Each app card links to that app's own mini-site on `appname.shaneracey.com`, built from the [app-site-template](https://github.com/srace11/app-site-template) repo.

## Files you edit

| File | What it controls |
| --- | --- |
| `src/data/site.ts` | Name, role line, bio, email, social links (an empty `url` hides a link) |
| `src/data/apps.json` | The app cards. One entry per app. |
| `public/apps/` | App icons used by the cards |
| `src/assets/shane.jpg` | Profile photo (square works best; it is resized and converted automatically) |
| `public/og.png` | Link preview image. Regenerate with `npm run og` after changing your name, role or photo. |
| `public/favicon.svg` | Browser tab icon |

### Adding an app

Add an object to `src/data/apps.json` and drop its icon into `public/apps/`:

```json
{
  "slug": "wayspeed",
  "name": "Way Speed",
  "description": "One line about the app.",
  "icon": "/apps/wayspeed.png",
  "status": "live",
  "url": "https://wayspeed.shaneracey.com",
  "appStore": "https://apps.apple.com/app/id0000000000",
  "googlePlay": ""
}
```

- `status` must be `live`, `beta` or `soon` (shown as Live, Beta, Coming soon). Anything else fails the build with a clear error.
- Leave `appStore` or `googlePlay` empty to hide that store button.
- Leave `url` empty for a placeholder card that isn't clickable yet.
- Cards appear in the same order as the JSON array.

Commit and push. Cloudflare redeploys in about a minute.

## Run it locally

Requires Node 22.12 or newer.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
npm run preview
```

## Deploy to Cloudflare Pages

1. In the Cloudflare dashboard go to **Workers & Pages > Create > Pages > Connect to Git**.
2. Pick the `srace11/shaneracey-hub` repo.
3. Build settings:
   - **Project name:** `shaneracey-hub`
   - **Production branch:** `main`
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variables:** `NODE_VERSION` = `22`
4. **Save and Deploy**, then check `https://shaneracey-hub.pages.dev`.

### Current setup: Cloudflare Worker

The hub is currently deployed by the Worker named `shaneracey-com` (Workers Builds), not a Pages project. `wrangler.jsonc` in this repo tells the Worker to run `npm run build` and serve `dist/` as static files. Keep its `name` matching the Worker's name in the dashboard, or the deploy fails. The Worker's deploy command should be `npx wrangler deploy` (the default). Custom domains for a Worker live under **Settings > Domains & Routes** instead of **Custom domains**.

## Point shaneracey.com at the hub

Right now `shaneracey.com` and `www.shaneracey.com` are attached to the Worker that deploys the older `srace11/shaneracey.com` repo. A hostname can only be attached to one project, so move it:

1. **Detach from the old Worker:** Workers & Pages > the Worker for `srace11/shaneracey.com` > **Settings > Domains & Routes**. Remove `shaneracey.com` and `www.shaneracey.com`.
2. **Check DNS:** go to **DNS > Records** for shaneracey.com. If records for `@` (the root) or `www` are still there, delete them. Leave `MX` and `TXT` records (email, verification) alone.
3. **Attach to the hub:** Pages project `shaneracey-hub` > **Custom domains > Set up a custom domain** > `shaneracey.com` > **Activate domain**. Cloudflare creates a proxied CNAME for the root pointing to `shaneracey-hub.pages.dev` (this works on the root domain because Cloudflare flattens it).
4. Repeat step 3 with `www.shaneracey.com`.
5. Optional: redirect www to the root. **Rules > Redirect Rules > Create rule**, "Redirect from WWW to root" template, 301.
6. When both show **Active**, visit `https://shaneracey.com`. The old Worker and repo can then be deleted or archived.

The site is down for a minute or two between steps 1 and 3. Do them back to back.

## Adding a subdomain for an app (appname.shaneracey.com)

Each app is its own Pages project, deployed from its own copy of the template. The full steps are in the template's SETUP.md. In short:

1. Deploy the app's repo as a Pages project (for example `wayspeed` becomes `wayspeed.pages.dev`).
2. In **that** Pages project: **Custom domains > Set up a custom domain** > `wayspeed.shaneracey.com` > **Activate domain**.
3. Cloudflare adds this record to the shaneracey.com zone:

   | Type | Name | Target | Proxy |
   | --- | --- | --- | --- |
   | CNAME | `wayspeed` | `wayspeed.pages.dev` | Proxied |

4. Wait for **Active** (1 to 5 minutes), then open `https://wayspeed.shaneracey.com/privacy`.

Always attach the custom domain in the Pages project first. A CNAME created by hand without it returns error 522. Do not add a wildcard (`*`) record; each app gets its own explicit record.

## Launch checklist for a new app

- [ ] Create the app's repo from the template: `gh repo create appname-site --template srace11/app-site-template --public --clone`
- [ ] Edit `src/app.config.ts` (name, tagline, `url`, colors, contact email, features, FAQ)
- [ ] Replace the icon and screenshots in `public/`, then run `npm run og`
- [ ] Write `src/policies/privacy.md` truthfully: every data type, SDK and permission the app really uses. No `TODO` left, effective date set.
- [ ] Write `src/policies/terms.md`. No `TODO` left.
- [ ] `npm run build` passes and the Draft banner is gone from /privacy and /terms
- [ ] Push to GitHub and deploy as a new Cloudflare Pages project
- [ ] Attach `appname.shaneracey.com` in that project's Custom domains and wait for Active
- [ ] App Store Connect: Privacy Policy URL `https://appname.shaneracey.com/privacy`, Support URL `https://appname.shaneracey.com/support`, Marketing URL `https://appname.shaneracey.com`
- [ ] Google Play Console: App content > Privacy policy `https://appname.shaneracey.com/privacy`; Store settings > Website and Email; Data safety form matches privacy.md
- [ ] Add the app to `src/data/apps.json` in this repo (status `soon` or `beta` until approved, then `live` with store links)

> The privacy policy in the template is a starting point, not legal advice. Review it against what each app actually collects before every submission, and keep it in sync with the App Store "App Privacy" answers and the Google Play "Data safety" form.
