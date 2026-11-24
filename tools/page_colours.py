"""Write each page's paper colour into its <head>, so the very first paint (and the phone browser's top and
bottom bars, which take their colour from it) already match the site, before the scripts have run.

Usage (from the site folder, after make_page.py or any colour change):  python3 tools/page_colours.py
Opens every page in a headless browser, reads the colour the site sets, and writes it into a small inline
script after the theme-color tag. Visitors in black and white mode get the grey instead."""
import glob, re, subprocess, time
from playwright.sync_api import sync_playwright

TAG = '<script id="paper">'
def snippet(c):
    return (TAG + "/* paper colour before the site loads, so the phone's browser bars match */(function(c){"
            "try{if(/^[12]$/.test(localStorage.getItem(\"jb-colour\")))c=\"#ebebeb\"}catch(e){}"
            "document.documentElement.style.setProperty(\"--pageBg\",c);"
            "document.querySelector('meta[name=\"theme-color\"]').content=c})(\"" + c + "\")</script>")

pages = sorted(glob.glob("*/index.html")) + ["index.html"]
srv = subprocess.Popen(["python3", "-m", "http.server", "8797"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1)
try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        for f in pages:
            pg = b.new_page(viewport={"width": 390, "height": 844})
            pg.goto("http://localhost:8797/" + f.replace("index.html", "")); pg.wait_for_timeout(2000)
            c = pg.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--pageBg').trim()")
            pg.close()
            s = open(f).read()
            s = re.sub(r'<script id="paper">.*?</script>', "", s)
            s = re.sub(r'<meta name="theme-color" content="[^"]*">', f'<meta name="theme-color" content="{c}">' + snippet(c), s, count=1)
            open(f, "w").write(s); print(c, f)
        b.close()
finally:
    srv.kill()
