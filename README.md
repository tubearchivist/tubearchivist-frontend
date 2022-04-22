# Tube Archivist Frontend

This repo is WIP, recreation of [Tube Archivist](https://github.com/tubearchivist/tubearchivist) frontend in NextJS/React.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setup your environment
Copy *.env.local.example* to *.env.local* and set:
- **NEXTAUTH_SECRET**: Some long random string
- **NEXTAUTH_URL**: Your frontend, most likely `http://localhost:3000`
- **NEXT_PUBLIC_TUBEARCHIVIST_URL**: Your Tube Archivist backend testing server, e.g. `http://localhost:8000`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

### Errors:
- *next command not found*: Install next with `npm install next`
- *Error: Invalid src prop [...] hostname [...] is not configured under images in your `next.config.js`*: Add the *NEXT_PUBLIC_TUBEARCHIVIST_URL* to the list of *domains*.
- *CORS errors in console*: In your backend in `tubearchivist/config/settings.py` replace the line containing *CORS_ALLOWED_ORIGIN_REGEXES* with `CORS_ORIGIN_ALLOW_ALL = True` and rebuild the container. NEVER do that on network accessible installation.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

a test