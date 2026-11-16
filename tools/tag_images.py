"""Embed photographer credit, copyright and description into WebP files without re-encoding.
Writes an EXIF chunk (Artist, Copyright, ImageDescription) and an XMP chunk (IPTC/Dublin Core credit fields)
into each simple-format (VP8) WebP, converting the container to the extended (VP8X) layout."""
import glob, json, re, struct, sys
from xml.sax.saxutils import escape
from PIL import Image

ALTS = json.load(open(sys.argv[1]))
SITE = "https://jakebalston.com"

def chunk(tag, data):
    out = tag + struct.pack("<I", len(data)) + data
    return out + (b"\0" if len(data) % 2 else b"")

def ascii_(s):
    return s.encode("ascii", "replace").decode()

def exif_bytes(desc):
    e = Image.Exif()
    e[0x010E] = ascii_(desc)                       # ImageDescription
    e[0x013B] = "Jake Balston"                     # Artist
    e[0x8298] = "Copyright Jake Balston. All rights reserved."   # Copyright
    b = e.tobytes()
    return b[6:] if b.startswith(b"Exif\0\0") else b

def xmp_bytes(desc, title):
    d, t = escape(desc), escape(title)
    x = f'''<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
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
<?xpacket end="w"?>'''
    return x.encode("utf-8")

def tag(path, desc, title):
    b = open(path, "rb").read()
    assert b[:4] == b"RIFF" and b[8:12] == b"WEBP"
    if b[12:16] == b"VP8X":
        return "skip (already extended)"
    assert b[12:16] == b"VP8 ", b[12:16]
    vp8 = b[12:]                                   # the VP8 chunk (with header and padding)
    w, h = Image.open(path).size
    flags = 0x08 | 0x04                            # EXIF + XMP present
    vp8x = chunk(b"VP8X", bytes([flags, 0, 0, 0]) + (w - 1).to_bytes(3, "little") + (h - 1).to_bytes(3, "little"))
    body = b"WEBP" + vp8x + vp8 + chunk(b"EXIF", exif_bytes(desc)) + chunk(b"XMP ", xmp_bytes(desc, title))
    open(path, "wb").write(b"RIFF" + struct.pack("<I", len(body)) + body)
    Image.open(path).load()                        # still decodes
    return "ok"

titles = json.load(open(sys.argv[2]))
n = 0
for f in sorted(glob.glob("img/*.webp")):
    m = re.match(r"img/(.+)-(\d\d)(-t)?\.webp$", f)
    slug, num = m.group(1), str(int(m.group(2)))
    desc = ALTS.get(slug, {}).get(num) or f"{titles.get(slug, slug)}, photograph {num} by Jake Balston"
    r = tag(f, desc, f"{titles.get(slug, slug)}, photograph {num}")
    n += r == "ok"
print("tagged", n)
