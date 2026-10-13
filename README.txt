Brindavan Boarding School website

Built with Next.js (App Router), React, TypeScript and Tailwind CSS. Animations use GSAP, with Motion for scroll-into-view triggers and ogl for the WebGL headline.

Setup: install Node.js 20 or newer, open a terminal in this folder and run npm install.

Preview: run npm run dev, then visit http://localhost:3000.

Build: run npm run build. The finished site is written to the out folder as plain HTML, CSS and JavaScript. Run npm start to preview that folder.

Hosting: upload the contents of the out folder to the root of any static website host.

Where things live:
  src/app          one folder per page (page.tsx), plus the shared layout
  src/components   header, footer, prospectus dialog and the animated pieces
  src/data         staff list shown on the Academics page
  src/styles       the site stylesheets
  public/assets    images
  legacy           the previous plain HTML site, kept for reference only

Fonts load from Google Fonts. Research sources and image attribution are included in the website footer. School details and official branding require confirmation before official public use.
