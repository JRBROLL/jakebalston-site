# jakebalston.com

The portfolio site of Jake Balston, architectural photographer. Plain HTML, CSS and JavaScript: there is no build step, and a Cloudflare Worker serves this folder as it is (settings in `wrangler.jsonc`). Every push to `main` goes live in about a minute.

## Where things live

| Path | What it is |
| --- | --- |
| `js/content.js` | **All the words and running orders.** This covers project text, architects' quotes, spreads, colours, awards, press, clients and journal entries. This is the file to edit. |
| `js/site.js` | How the site behaves: the photobook spreads, the phone pages, colour modes and navigation. |
| `css/site.css` | How the site looks. |
| `img/` | Photographs: `<project>-01.webp` (the full photograph), `-m.webp` (1600px, the phone home page) and `-t.webp` (800px thumbnails). Credit and description are written into each file by `tools/tag_images.py`. When photos are replaced, change `IMG_V` at the top of the images section in `site.js` so browsers fetch the new ones. |
| `<project>/index.html` | One page per project at a clean address (for example `/osprey-house/`). Each holds the title, description and share image that Google and social sites read. |
| `og/` | Share images (1200×630) used when a page is posted on social media or in messages. |
| `sitemap.xml`, `robots.txt` | Tell Google which pages exist. |
| `_redirects` | Keeps the old Squarespace addresses working. |
| `_headers` | Caching rules for Cloudflare. Photos are kept by browsers for a year, which is why `IMG_V` matters. |
| `tools/` | `make_page.py <slug>` builds a project's page, share image and sitemap entry; `tag_images.py` writes credits into the photos. |

## Editing words

Open `js/content.js` on GitHub and click the pencil icon. Change only the text between the quote marks, and keep the commas and brackets as they are. Commit the change and the live site updates in about a minute. If anything breaks, the previous version is one click away in Cloudflare → Workers → jakebalston → Deployments.

If you change a project's title or description, the page in `<project>/index.html` also needs updating, so that Google sees the new wording.

## Adding a project or journal entry

1. Export the photos into a new folder in *Website Photography*, with a `notes.txt` file containing:
   - title
   - architect, or who the entry is with
   - place
   - year or date
   - words
   - which photo is the cover
2. The photos go into `img/` at full resolution with a phone copy and a thumbnail, and the project is given an entry in `content.js` and its own page folder (`tools/make_page.py`).

## Spreads cheat sheet (`LAYOUTS` in content.js)

| Code | Spread |
| --- | --- |
| `F` | One big photo on the right, with the architect's words stepped down the left page |
| `H` | The mirror of F |
| `G` | One photo, as big as the spread allows |
| `A` | A smaller photo set on its own |
| `M` | A magazine page: one photo set low and to the outer edge |
| `B` / `C` | Two photos on a diagonal. B puts the small one first, C puts the big one first |
| `D` | An upright photo with a landscape |
| `P` | Two photos the same size, side by side |

On phones, each desktop spread is turned into single pages automatically.
