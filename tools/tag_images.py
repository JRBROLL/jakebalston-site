"""Embed photographer credit, copyright and description into every photo in img/, without re-encoding.

Usage (from the site folder):  python3 tools/tag_images.py

Descriptions come from ALTS in js/content.js. Each file gets an EXIF block (Artist, Copyright,
ImageDescription) and an XMP block (IPTC / Dublin Core credit fields). Existing EXIF and XMP are
replaced, so running it twice is safe. The colour profile and the image data are never touched.
Works on JPEG."""
import glob, json, re, struct, subprocess
from xml.sax.saxutils import escape
from PIL import Image

SITE = "https://jakebalston.com"
C = json.loads(subprocess.run(["node", "-e", open("js/content.js").read() +
    "\nconsole.log(JSON.stringify({PROJECTS, ALTS}));"], capture_output=True, text=True, check=True).stdout)
TITLES = {p["slug"]: p["title"] for p in C["PROJECTS"]}
ALTS = C["ALTS"]


def exif_bytes(desc):
    e = Image.Exif()
    e[0x010E] = desc.encode("ascii", "replace").decode()           # ImageDescription
    e[0x013B] = "Jake Balston"                                      # Artist
    e[0x8298] = "Copyright Jake Balston. All rights reserved."      # Copyright
    return e.tobytes()                                              # starts with Exif\0\0


def xmp_bytes(desc, title):
    d, t = escape(desc), escape(title)
    return f'''<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
<rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/"
 xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/" xmlns:plus="http://ns.useplus.org/ldf/xmp/1.0/"
 photoshop:Credit="Jake Balston" xmpRights:Marked="True" xmpRights:WebStatement="{SITE}/information/">
<dc:creator><rdf:Seq><rdf:li>Jake Balston</rdf:li></rdf:Seq></dc:creator>
<dc:rights><rdf:Alt><rdf:li xml:lang="x-default">© Jake Balston. All rights reserved.</rdf:li></rdf:Alt></dc:rights>
<dc:title><rdf:Alt><rdf:li xml:lang="x-default">{t}</rdf:li></rdf:Alt></dc:title>
<dc:description><rdf:Alt><rdf:li xml:lang="x-default">{d}</rdf:li></rdf:Alt></dc:description>
<plus:Licensor><rdf:Seq><rdf:li rdf:parseType="Resource"><plus:LicensorName>Jake Balston</plus:LicensorName><plus:LicensorURL>{SITE}/information/</plus:LicensorURL></rdf:li></rdf:Seq></plus:Licensor>
</rdf:Description></rdf:RDF></x:xmpmeta>
<?xpacket end="w"?>'''.encode("utf-8")


# ---------- JPEG: marker segments before the image data ----------
XMP_NS = b"http://ns.adobe.com/xap/1.0/\0"


def tag_jpeg(b, desc, title):
    assert b[:2] == b"\xff\xd8"
    i, segs = 2, []
    while True:                                                     # walk the header segments up to the image data
        assert b[i] == 0xFF
        m = b[i + 1]
        if m == 0xDA: break                                         # start of scan: the rest is image data
        n = struct.unpack(">H", b[i + 2:i + 4])[0]
        segs.append(b[i:i + 2 + n]); i += 2 + n
    # drop all metadata (camera EXIF and GPS, XMP, Photoshop, comments); keep JFIF, the colour profile and the coding tables
    def meta(s):
        m = s[1]
        return m == 0xE1 or m == 0xED or m == 0xFE or (0xE3 <= m <= 0xEF and m != 0xEE)
    keep = [s for s in segs if not meta(s)]
    seg = lambda m, d: bytes([0xFF, m]) + struct.pack(">H", len(d) + 2) + d
    app0 = [s for s in keep if s[1] == 0xE0]
    rest = [s for s in keep if s[1] != 0xE0]
    new = seg(0xE1, exif_bytes(desc)) + seg(0xE1, XMP_NS + xmp_bytes(desc, title))
    return b"\xff\xd8" + b"".join(app0) + new + b"".join(rest) + b[i:]


n = 0
for f in sorted(glob.glob("img/*.jpg")):
    m = re.match(r"img/(.+)-(\d\d)(-[tm])?\.jpg$", f)
    slug, num = m.group(1), str(int(m.group(2)))
    title = TITLES.get(slug, slug)
    desc = ALTS.get(slug, {}).get(num) or f"{title}, photograph {num} by Jake Balston"
    b = open(f, "rb").read()
    px = Image.open(f).tobytes()
    out = tag_jpeg(b, desc, f"{title}, photograph {num}")
    open(f, "wb").write(out)
    after = Image.open(f)
    assert after.tobytes() == px, f                                 # the picture itself is untouched
    n += 1
print("tagged", n)
