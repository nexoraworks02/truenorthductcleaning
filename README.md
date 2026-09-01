This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Marketing Tracking

Set `NEXT_PUBLIC_META_PIXEL_ID` to your Meta Pixel / Dataset ID to enable browser-side Meta Pixel tracking. When it is empty, the Pixel does not load.

Set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in Vercel to your Web3Forms access key to send booking form submissions to email. Web3Forms access keys are designed to be used from browser-side forms.

Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` to the content value from Google Search Console's HTML tag method to verify the domain.

## SEO

The production canonical domain is `https://www.example.com`.

After deploying, submit these URLs in Google Search Console:

- `https://www.example.com`
- `https://www.example.com/sitemap.xml`

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
