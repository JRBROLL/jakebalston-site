"""Build (or rebuild) the static page for one project or journal entry, its share image,
and its sitemap entry, from js/content.js. Usage: python3 tools/make_page.py <slug>
Run from the site folder. Photo descriptions (ALTS) and credits are included."""
import re, json, os, sys, html, subprocess
from PIL import Image
OUT = "."
DOMAIN = "https://jakebalston.com"
open("/tmp/_dump.js","w").write(open("js/content.js").read() + "\nconsole.log(JSON.stringify({PROJECTS, AWARDS, PRESS, BOOKS, CLIENTS, DIMS, LAYOUTS, DROPS, ALTS, ARTWORKS}));")
C = json.loads(subprocess.check_output(["node", "/tmp/_dump.js"]))
P = C["PROJECTS"]
def e(x): return html.escape(str(x or ""), quote=True)
def clip(t, n=158):
    t = re.sub(r"\s+", " ", t or "").strip()
    return t if len(t) <= n else t[:t.rfind(" ", 0, n)].rstrip(",;:") + "…"
def og(slug, idx):
    src = f"{OUT}/img/{slug}-{idx:02d}.jpg"; im = Image.open(src).convert("RGB")
    W, H = 1200, 630; r = max(W/im.width, H/im.height)
    im = im.resize((round(im.width*r), round(im.height*r)), Image.LANCZOS)
    l, t = (im.width-W)//2, (im.height-H)//2
    im.crop((l, t, l+W, t+H)).save(f"{OUT}/og/{slug}.jpg", "JPEG", quality=90, optimize=True, progressive=True)
PERSON = {"@type": "Person", "@id": DOMAIN + "/#jake", "name": "Jake Balston", "jobTitle": "Architectural photographer",
          "url": DOMAIN + "/", "email": "mailto:info@jakebalston.com", "telephone": "+44 7791 760474",
          "address": {"@type": "PostalAddress", "addressCountry": "GB"},
          "sameAs": ["https://instagram.com/jakebalston"],
          "knowsAbout": ["Architectural photography", "Interior photography"]}

def page(path, title, desc, body, ld, ogimg, ogtype="website"):
    url = DOMAIN + path
    return f"""<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="{ogtype}">
<meta property="og:site_name" content="Jake Balston">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{DOMAIN}/og/{ogimg}.jpg">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#f0e9c9">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/fonts/newsreader-latin-300-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/css/site.css">
<script type="application/ld+json">{json.dumps({"@context": "https://schema.org", "@graph": ld}, ensure_ascii=False)}</script>
</head>
<body>
<div class="world" id="world">
  <main class="g12 stage" id="stage"><div class="sr">{body}</div></main>
  <header class="g12 head" id="head"></header>
  <footer class="g12 foot" id="foot"></footer>
</div>
<noscript><div style="padding:24px;font-family:Georgia,serif">{body}</div></noscript>
<script src="/js/content.js"></script>
<script src="/js/site.js"></script>
</body>
</html>
"""

NAV = '<nav><a href="/">Jake Balston</a> · <a href="/commissions/">Commissions</a> · <a href="/journal/">Journal</a> · <a href="/information/">Information</a></nav>'
def write(path, doc):
    d = OUT + path; os.makedirs(d, exist_ok=True); open(d + "index.html", "w").write(doc)
def ALT(slug, i, p, who):
    return (C.get("ALTS") or {}).get(slug, {}).get(str(i+1)) or f'{p["title"]}{", " + who if who else ""}, photograph {i+1} by Jake Balston'
def artwork(slug, i):
    a = (C.get("ARTWORKS") or {}).get(slug, {}).get(str(i+1))
    if not a: return {}
    return {"about": {"@type": "VisualArtwork", "name": a[0], "creator": {"@type": "Person", "name": a[1], **({"url": a[2]} if len(a) > 2 and a[2] else {})}}}
want = sys.argv[1]
P = [p for p in P if p["slug"] == want]
assert P, "no such slug"
for p in P:
    slug = p["slug"]; J = p["section"] == "journal"
    who = p.get("architect") or ""
    title = f'{p["title"]}{", " + who if who else ""} · Jake Balston{"" if J else ", architectural photographer"}'
    desc = clip(p.get("text") or f'{p["title"]}{" by " + who if who else ""}, {p.get("place","")}. Photographed by Jake Balston.')
    n = len([i for i in range(p["count"]) if (i+1) not in (C["DROPS"].get(slug) or [])])
    quotes = "".join(f'<blockquote>{e(q["q"])} <cite>{e(q["by"])}</cite></blockquote>' for q in p.get("quotes") or [])
    alts = "".join(f'<li><img src="/img/{slug}-{i+1:02d}-t.jpg" alt="{e(ALT(slug,i,p,who))}" loading="lazy" width="{round(800*C["DIMS"][slug][i][0]/max(C["DIMS"][slug][i]))}" height="{round(800*C["DIMS"][slug][i][1]/max(C["DIMS"][slug][i]))}"></li>'
                   for i in range(p["count"]) if (i+1) not in (C["DROPS"].get(slug) or []))
    facts = "".join(f"<dt>{k}</dt><dd>{e(v)}</dd>" for k, v in [(p.get("archLabel") or "Architect", who), *[(c[0], c[1]) for c in p.get("credits") or []], ("With", p.get("with")), ("Location", p.get("place")), ("Year", p.get("year")), ("Recognition", p.get("note"))] if v)
    body = f'<h1>{e(p["title"])}</h1>{NAV}<dl>{facts}</dl><p>{e(p.get("text",""))}</p>{quotes}<p>{n} photographs by Jake Balston.</p><ul>{alts}</ul>'
    work = {"@type": "ImageGallery" if not J else "CreativeWork", "url": f"{DOMAIN}/{slug}/", "name": p["title"],
            "description": desc, "author": {"@id": DOMAIN + "/#jake"}, "image": f"{DOMAIN}/og/{slug}.jpg",
            "dateCreated": p.get("year")}
    if p.get("place"): work["contentLocation"] = {"@type": "Place", "name": p["place"]}
    if who: work["about"] = {"@type": "Organization", "name": who, **({"url": p["site"]} if p.get("site") else {})}
    if p.get("credits"): work["contributor"] = [{"@type": "Organization", "name": c[1], **({"url": c[2]} if len(c) > 2 else {})} for c in p["credits"]]
    shown_ = [i for i in range(p["count"]) if (i+1) not in (C["DROPS"].get(slug) or [])]
    work["associatedMedia"] = [{"@type": "ImageObject", "contentUrl": f"{DOMAIN}/img/{slug}-{i+1:02d}.jpg",
        "thumbnailUrl": f"{DOMAIN}/img/{slug}-{i+1:02d}-t.jpg", "description": ALT(slug, i, p, who),
        "name": f'{p["title"]}, photograph {i+1}', "creator": {"@id": DOMAIN + "/#jake"}, "creditText": "Jake Balston",
        "copyrightNotice": "© Jake Balston", "copyrightHolder": {"@id": DOMAIN + "/#jake"},
        "acquireLicensePage": DOMAIN + "/information/", **artwork(slug, i)} for i in shown_]
    write(f"/{slug}/", page(f"/{slug}/", title, desc, body, [PERSON, work], slug, "article"))
    og(slug, p.get("cover", 1))

# sitemap: add or replace this page's entry
sm = open("sitemap.xml").read()
imgs = "".join(f"<image:image><image:loc>{DOMAIN}/img/{slug}-{i+1:02d}.jpg</image:loc></image:image>" for i in shown_)
entry = f"<url><loc>{DOMAIN}/{slug}/</loc>{imgs}</url>"
sm = re.sub(rf"<url><loc>{re.escape(DOMAIN)}/{re.escape(slug)}/</loc>.*?</url>\n?", "", sm)
sm = sm.replace("</urlset>", entry + "\n</urlset>")
open("sitemap.xml", "w").write(sm)
print("built", slug)
