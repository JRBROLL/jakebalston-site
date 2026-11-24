/* Jake Balston: site behaviour. Content lives in content.js */
/* ---------- Data ---------- */

/* Colour: combinations from Sanzo Wada, A Dictionary of Color Combinations (1933).
   Each combination gives a pale colour (tinted into the paper), a deep colour (the ink) and an accent for small details. */
const WADA = {   // exact swatches only. pale = paper, ink = text, acc = small details (a third colour from the same plate, or the ink when the third is too pale to read)
  296:{pale:"#f5ecc2", ink:"#34454c", acc:"#71502f", names:"Sulpher Yellow · Slate Color · Pale Raw Umber"},
  "296b":{pale:"#f5ecc2", ink:"#71502f", acc:"#34454c", names:"Sulpher Yellow · Pale Raw Umber · Slate Color", plate:296},
  190:{pale:"#ebd3a2", ink:"#111314", acc:"#d96629", names:"Ivory Buff · Black · English Red"},
  234:{pale:"#fdc57e", ink:"#71502f", acc:"#71502f", names:"Cinnamon Buff · Pale Raw Umber · Pale King's Blue"},
  243:{pale:"#ebd3a2", ink:"#34454c", acc:"#bb7125", names:"Ivory Buff · Slate Color · Raw Sienna"},
  246:{pale:"#f5ecc2", ink:"#a84222", acc:"#a84222", names:"Sulpher Yellow · Brick Red"},
  126:{pale:"#ebd3a2", ink:"#1c4286", acc:"#1c4286", names:"Ivory Buff · Deep Lyons Blue"},
  214:{pale:"#ebd3a2", ink:"#4f4086", acc:"#a36752", names:"Ivory Buff · Violet · Sudan Brown"},
  270:{pale:"#f5ecc2", ink:"#6b7140", acc:"#da525d", names:"Sulpher Yellow · Olive Green · Eugenia Red"},
  151:{pale:"#f5ecc2", ink:"#064f6e", acc:"#064f6e", names:"Sulpher Yellow · Vandar Poel's Blue"},
  266:{pale:"#ebd3a2", ink:"#00978d", acc:"#e31f26", names:"Ivory Buff · Benzol Green · Spectrum Red"},
  310:{pale:"#f5ecc2", ink:"#253122", acc:"#837e31", names:"Sulpher Yellow · Deep Slate Olive · Olive"},
  52:{pale:"#f5ecc2", ink:"#111314", acc:"#111314", names:"Sulpher Yellow · Black"},
  60:{pale:"#ffefae", ink:"#12354e", acc:"#12354e", names:"Pale Lemon Yellow · Dark Tyrian Blue"},
  104:{pale:"#f5ecc2", ink:"#a62c37", acc:"#a62c37", names:"Sulpher Yellow · Carmine Red"},
  94:{pale:"#ebd3a2", ink:"#004f46", acc:"#004f46", names:"Ivory Buff · Dusky Green"},
  50:{pale:"#ebd3a2", ink:"#4e1d4c", acc:"#4e1d4c", names:"Ivory Buff · Dusky Madder Violet"},
  321:{pale:"#f5ecc2", ink:"#253122", acc:"#97acc8", names:"Sulpher Yellow · Deep Slate Olive · Salvia Blue · Light Brown Drab"},
  343:{pale:"#ebd3a2", ink:"#ae5224", acc:"#064f6e", names:"Ivory Buff · Burnt Sienna · Vandar Poel's Blue"},
};
// Every swatch on each plate, in the book's order, for the little colour tag at the left edge
const PLATE_SWATCHES = {"50": ["#ebd3a2", "#4e1d4c"], "94": ["#ebd3a2", "#004f46"], "104": ["#f5ecc2", "#a62c37"], "60": ["#ffefae", "#12354e"], "321": ["#f5ecc2", "#253122", "#97acc8", "#b59392"], "52": ["#f5ecc2", "#111314"], "234": ["#fdc57e", "#71502f", "#a7d4e4"], "266": ["#e31f26", "#ebd3a2", "#8fa071", "#00978d"], "310": ["#f5ecc2", "#eeb480", "#837e31", "#253122"], "296": ["#f5ecc2", "#d8a37b", "#71502f", "#34454c"], "190": ["#ebd3a2", "#d96629", "#111314"], "243": ["#bb7125", "#ebd3a2", "#6b7140", "#34454c"], "246": ["#f8b6ba", "#a84222", "#f5ecc2", "#fdc57e"], "126": ["#ebd3a2", "#e2b540", "#1c4286"], "214": ["#ebd3a2", "#a36752", "#4f4086"], "270": ["#da525d", "#f5ecc2", "#6b7140", "#437742"], "151": ["#f5ecc2", "#f99d1b", "#064f6e"], "343": ["#ae5224", "#ebd3a2", "#635a3a", "#064f6e"]};
const plateOf = k => (WADA[k]&&WADA[k].plate) || k;
const SITE_COLOUR = 296;

const NEUTRAL = {ground:"#ecebe7", ink:"#17171a", acc:"#8d8c88"};
const hx=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const toHex=a=>"#"+a.map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,"0")).join("");
const mix=(a,b,t)=>toHex(hx(a).map((v,i)=>v*(1-t)+hx(b)[i]*t));
let colourState=0, currentWada=SITE_COLOUR;  // 0 full colour · 1 all black & white · 2 colour photographs, calm site
/* Take saturation out of a colour, keeping its hue and lightness (f = share kept) */
function toWhite(h,f){ return toHex(hx(h).map(v=>v+(255-v)*f)); }
function desat(h,f){
  let [r,g,b]=hx(h).map(v=>v/255); const mx=Math.max(r,g,b), mn=Math.min(r,g,b), l=(mx+mn)/2, d=mx-mn;
  if(!d) return h;
  let s0=d/(1-Math.abs(2*l-1)), hh = mx===r?((g-b)/d)%6 : mx===g?(b-r)/d+2 : (r-g)/d+4; hh*=60; if(hh<0) hh+=360;
  const s1=s0*f, c=(1-Math.abs(2*l-1))*s1, x=c*(1-Math.abs((hh/60)%2-1)), m=l-c/2;
  const [a,b2,c2] = hh<60?[c,x,0]:hh<120?[x,c,0]:hh<180?[0,c,x]:hh<240?[0,x,c]:hh<300?[x,0,c]:[c,0,x];
  return toHex([a+m,b2+m,c2+m].map(v=>v*255));
}
const PAPER_SAT=.8;                 // every paper keeps 80% of its saturation
const PAPER_WHITE=.2;               // ...and is then lifted 20% of the way towards white
const QUIET_GROUND="#ebebeb";       // black and white modes: a 92% grey-white
function applyColour(){
  const w = WADA[currentWada];
  const base = colourState===2 || !w ? NEUTRAL : {ground: w.pale, ink: w.ink, acc: w.acc};
  const pal = {...base, ground: colourState===0 ? toWhite(desat(base.ground,PAPER_SAT),PAPER_WHITE) : QUIET_GROUND};
  const r=document.documentElement.style, G=hx(pal.ground);
  r.setProperty("--ground", pal.ground); r.setProperty("--ink", pal.ink);
  r.setProperty("--muted", mix(pal.ink, pal.ground, .5)); r.setProperty("--accent", pal.acc);
  r.setProperty("--hair", mix(pal.ink, pal.ground, .82));
  // Header text uses a "difference" blend so it reads over photographs; on the paper it lands exactly on the ink colour.
  r.setProperty("--headInk", toHex(G.map((v,i)=>v-hx(pal.ink)[i])));
  r.setProperty("--headAcc", toHex(G.map((v,i)=>v-hx(pal.acc)[i])));
  const pageBg = pal.ground;
  r.setProperty("--pageBg", pageBg);
  let tc=document.querySelector('meta[name="theme-color"]'); if(!tc){ tc=document.createElement("meta"); tc.name="theme-color"; document.head.appendChild(tc); } tc.content=pageBg;
  document.documentElement.classList.toggle("cs1", colourState===1);
  document.documentElement.classList.toggle("cs2", colourState===2);
}
function setWada(k){ currentWada=k; applyColour(); }
const COLOUR_TITLES=["Black and white","Colour photographs only","Full colour"];
let spins=0;
function cycleColour(){
  colourState=(colourState+1)%3; spins++;
  document.documentElement.style.setProperty("--rot", (spins*180)+"deg");
  try{ localStorage.setItem("jb-colour", String(colourState)); }catch(e){}
  applyColour(); const b=$("monoBtn"); if(b){ b.title=COLOUR_TITLES[colourState]; b.setAttribute("aria-label",COLOUR_TITLES[colourState]); }
}
// Home: every commissions photograph, shuffled each visit (each opens its project at the first page)
let HOME_ALL = null;
function homeAll(){ const a=[]; PROJECTS.filter(p=>p.section==="commissions").forEach(p=>{ shown(p).forEach(i=>a.push([p,i])); });
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }

/* ---------- Images ----------
   <slug>-NN.jpg is Jake's export, untouched; -m.jpg a 1600px copy (the phone home page), -t.jpg an 800px thumbnail.
   IMG_V goes on every address: change it whenever the photographs are replaced, so browsers fetch the new ones. */
const IMG_V="?v=2611c";

function ratio(p,i){ const d=DIMS[p.slug][i]; return d[0]/d[1]; }
const imgFile=(p,i,suf="")=>`/img/${p.slug}-${String(i+1).padStart(2,"0")}${suf}.jpg${IMG_V}`;
const img=(p,i)=>imgFile(p,i), mid=(p,i)=>imgFile(p,i,"-m"), thumb=(p,i)=>imgFile(p,i,"-t");
/* Moving photographs: the still is the poster and stays in place; the clip loads only when it is on screen and fades in over it */
const hasVid=(p,i)=>typeof VIDS!=="undefined" && (VIDS[p.slug]||[]).includes(i+1);
const vidSrc=(p,i)=>`/vid/${p.slug}-${String(i+1).padStart(2,"0")}.mp4`;
const vidTag=(p,i,style="")=>hasVid(p,i)?`<video class="mv" muted loop playsinline preload="none" disablepictureinpicture aria-hidden="true" data-src="${vidSrc(p,i)}" style="${style}"></video>`:"";
const calm=matchMedia("(prefers-reduced-motion: reduce)");
let vidObs=null;
function wakeVideos(){
  if(vidObs) vidObs.disconnect();
  const vs=[...document.querySelectorAll("#stage video.mv")]; if(!vs.length || calm.matches) return;
  vidObs=new IntersectionObserver(es=>es.forEach(e=>{
    const v=e.target;
    if(e.isIntersecting){
      if(!v.src){ v.src=v.dataset.src; v.addEventListener("playing",()=>v.classList.add("on"),{once:true}); }
      v.play().catch(()=>{});
    } else v.pause();
  }),{threshold:.25});
  vs.forEach(v=>vidObs.observe(v));
}
/* A photo appears only once it has fully arrived and been decoded, so it is never seen half-drawn;
   until then its place shows the paper, and it fades in. Photos the browser already has appear at once. */
function reveal(root){
  root.querySelectorAll("img").forEach(im=>{
    if(im.complete && im.naturalWidth) return im.classList.add("in");
    im.classList.add("wait");
    im.addEventListener("load",()=>im.decode().catch(()=>{}).then(()=>im.classList.add("in")),{once:true});
  });
}
/* Change a photo already on screen only once the new one is ready (the last one asked for wins) */
function swapSrc(im,src){
  im.dataset.want=src; const nx=new Image(); nx.src=src;
  return nx.decode().then(()=>{ if(im.dataset.want===src) im.src=src; }).catch(()=>{});
}
/* Fetching photos ahead of time: queued ones come one at a time at low priority, so they never slow what is on screen;
   urgent ones (a hovered project) start straight away. */
const warmed=new Set(), warmQ=[]; let warming=false;
function fetchImg(src,urgent){
  if(warmed.has(src)) return;
  if(urgent){ const q=warmQ.indexOf(src); if(q>=0) warmQ.splice(q,1); warmed.add(src); const im=new Image(); im.fetchPriority="high"; im.src=src; return; }
  if(!warmQ.includes(src)) warmQ.push(src); pump();
}
function pump(){
  if(warming) return; const src=warmQ.shift(); if(!src) return; if(warmed.has(src)) return pump();
  warmed.add(src); warming=true;
  const im=new Image(); im.fetchPriority="low"; im.onload=im.onerror=()=>{ warming=false; pump(); }; im.src=src;
}
const openingImgs=p=>(spreads(p).find(s=>s.imgs.length)||{imgs:[]}).imgs;   // the photo(s) a project opens on
const warmProject=(p,urgent)=>openingImgs(p).forEach(i=>fetchImg(img(p,i),urgent));
// Fetching ahead in the background only with a mouse and a decent connection: never on phones, slow networks or data saver
const slowNet=()=>{ const c=navigator.connection; return !!c && (c.saveData || /2g|3g/.test(c.effectiveType||"")); };

/* ---------- Helpers ---------- */
const pad=n=>String(n).padStart(2,"0");
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");
PROJECTS.forEach(p=>{ if(LAYOUTS[p.slug]) p.layout=LAYOUTS[p.slug]; if(DROPS[p.slug]) p.drop=DROPS[p.slug]; });
const cov=p=>(p.cover||1)-1;
const shown=p=>Array.from({length:p.count},(_,i)=>i).filter(i=>!(p.drop||[]).includes(i+1));
const bySlug=Object.fromEntries(PROJECTS.map(p=>[p.slug,p]));
const isBook=()=>innerWidth>=900 && innerWidth>innerHeight*1.05;
let state={route:"home", project:null, page:0, mode:"pages", hover:null};

const half=side=>!isBook()? "1/13" : side==="L" ? "1/7" : side==="R" ? "7/13" : "1/13";
/* The opening photograph fills its half of the screen, bleeding off the outer edge. On a project's own opening page
   it can be positioned by hand (coverPos, or coverAlign for the side) and carries a moving version if there is one. */
function fullHalf(p,i,side,opener){
  const pos = opener && p.coverPos ? p.coverPos : ((opener && p.coverAlign) || (side==="L"?"left":"right"))+" center";
  return `<div class="cell full ${side==="L"?"bleedL":"bleedR"}" style="grid-column:${side==="L"?"1/7":"7/13"}"><img src="${img(p,i)}" style="object-fit:cover;object-position:${pos}" alt="${altText(p,i)}">${opener?vidTag(p,i,`object-fit:cover;object-position:${pos}`):""}</div>`;
}
const textCell=(side,inner)=>`<div class="cell" style="grid-column:${half(side)}"><div class="tbox">${inner}</div></div>`;
const _cv=document.createElement("canvas").getContext("2d");
function fitDisplay(text, colsWide){
  const padPx=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--pad"))||20;
  const w=(innerWidth-2*padPx)*colsWide/12, words=text.split(" ");
  const two = words.length>1 && (text.length>15 || !isBook());
  const lines = two? splitTwo(words) : [text];
  _cv.font='300 100px Newsreader, "Iowan Old Style", Georgia, serif';
  const widest=Math.max(...lines.map(l=>_cv.measureText(l).width));   // width at 100px
  const fs=Math.min(innerHeight*.15, w/widest*100*.97);
  return {fs, html: lines.map(esc).join("<br>")};
}
function splitTwo(words){ let best=[words.join(" "),""], d=1e9;
  for(let i=1;i<words.length;i++){ const a=words.slice(0,i).join(" "), b=words.slice(i).join(" "), k=Math.abs(a.length-b.length); if(k<d){d=k;best=[a,b];} } return best; }

/* ---------- Header and footer ---------- */
function renderHead(active, where){
  const book=isBook(), name=`<a class="name" href="/">Jake Balston</a><div class="dim" style="margin-top:4px">Architectural photographer<br>Based in the UK, working worldwide</div>`;
  const sw=`<button class="mono-btn" id="monoBtn"></button>`;
  const contact=`<span class="dim">Enquiries</span><br><a href="mailto:info@jakebalston.com">info@jakebalston.com</a><br><a href="https://instagram.com/jakebalston">Instagram</a>`;
  if(!book) $("head").innerHTML=`<div style="grid-column:1/3"><a class="name" href="/" aria-label="Jake Balston">JB</a></div>
     <nav style="grid-column:3/11;justify-content:center">${nav(active)}</nav><div style="grid-column:11/13;text-align:right">${sw}</div>`;
  else if(where==="project")
    $("head").innerHTML=`<div style="grid-column:1/4">${name}</div><div style="grid-column:4/6">${sw}</div><nav style="grid-column:7/9" id="projNav">${nav(active)}</nav>`;
  else if(where==="list")      // right half only: the cover fills the left half
    $("head").innerHTML=`<div style="grid-column:7/9">${name}</div><div style="grid-column:9/10">${sw}</div><nav style="grid-column:10/11">${nav(active)}</nav><div style="grid-column:11/13;text-align:right">${contact}</div>`;
  else $("head").innerHTML=`<div style="grid-column:1/4">${name}</div><div style="grid-column:4/6">${sw}</div><nav style="grid-column:7/9">${nav(active)}</nav>
    <div style="grid-column:10/12"><span class="dim">Enquiries</span><br><a href="mailto:info@jakebalston.com">info@jakebalston.com</a></div>
    <div style="grid-column:12/13;text-align:right"><a href="https://instagram.com/jakebalston">Instagram</a></div>`;
  const mb=$("monoBtn"); mb.title=COLOUR_TITLES[colourState]; mb.setAttribute("aria-label",COLOUR_TITLES[colourState]); mb.onclick=cycleColour;
}
const nav=a=>[["commissions","Commissions"],["journal","Journal"],["information","Information"]].map(([k,l])=>`<a href="/${k}/" class="${a===k?"on":""}">${l}</a>`).join("");
function setFoot(cells){ $("foot").innerHTML=cells.map(([cols,html,align])=>`<div style="grid-column:${cols};${align?"text-align:"+align:""}">${html}</div>`).join(""); }

/* ---------- Project spreads: photobook pages ----------
   The screen is read as two pages (columns 1-6 and 7-12) on a hidden grid. Each slot says where a photo sits:
   c = columns, w/h = largest share of the columns' width / the band's height it may take,
   x = left|right|center, y = top|bottom|center, cap = "below" (number + words under the photo) or "plate" (title left, number right).
   Photos are always whole, sized to fit their slot, never cropped. */
const SPREADS = {
  F:{slots:[{c:"7/13",w:.9,h:1,x:"right",y:"center"}], words:"L"},     // one big photo on the right page, words stepped down the left
  H:{slots:[{c:"1/7",w:.9,h:1,x:"left",y:"center"}],  words:"R"},     // mirrored
  G:{slots:[{c:"2/12",w:1,h:1,x:"center",y:"center"}]},               // one photo, as big as the spread allows
  A:{slots:[{c:"7/13",w:.66,h:.66,x:"center",y:"center"}]},           // a plate, centred on the right page (never lost in the middle)
  M:{slots:[{c:"7/13",w:.8,h:.84,x:"right",y:"bottom"}]},            // magazine page: one photo set off-centre, low and to the outer edge
  B:{slots:[{c:"1/7",w:.72,h:.74,x:"left",y:"top"},{c:"7/13",w:.86,h:1,x:"right",y:"center"}]},     // Casa Olivè 22–23
  D:{slots:[{c:"1/7",w:.84,h:.84,x:"left",y:"bottom"},{c:"7/13",w:1,h:.7,x:"right",y:"top"}]},       // Casa Olivè 14–15
  C:{slots:[{c:"1/7",w:.94,h:.94,x:"left",y:"top"},{c:"7/13",w:.5,h:.52,x:"right",y:"bottom"}]},     // big photo + a supplementary detail
  P:{pair:true},                                                       // two photos the same size, side by side across the spine
};
/* Rules: photos never carry captions; words only appear on single-photo spreads (F or H), stepped, with the architect's name beneath;
   no three-photo spreads; two-photo spreads always give one photo real size. */
const ORDER = ["B","G","C","F","D","A","H"];
const isLand=(p,i)=>ratio(p,i)>1.15;
function spreadsBook(p){
  const keep=i=>!(p.drop||[]).includes(i+1);
  let s=[{type:"open", imgs:[cov(p)]}];
  if(p.layout){
    s=s.concat(p.layout.map(([key,...n])=>({type:"book", key, imgs:n.map(x=>x-1)})));
  } else {
    const list=[]; for(let i=0;i<p.count;i++) if(keep(i)) list.push(i);
    s.push({type:"book", key:isLand(p,0)?"G":"F", imgs:[0]});
    let j=1, k=0;
    while(j<list.length){
      let key=ORDER[k++%ORDER.length]; const a=list[j], left=list.length-j;
      if(key==="G" && !isLand(p,a)) key="F";
      if(["B","D","C"].includes(key) && left<2) key = isLand(p,a)?"G":"H";
      const n = SPREADS[key].slots.length;
      s.push({type:"book", key, imgs:list.slice(j,j+n)}); j+=n;
    }
  }
  // the architects' words: only on single-photo spreads with an empty page beside them
  const qs=(p.quotes||[]).slice(), free=qs.filter(q=>!q.img), wordy=sp=>sp.type==="book" && SPREADS[sp.key].words;
  qs.filter(q=>q.img).forEach(q=>{ const sp=s.find(x=>wordy(x) && x.imgs.includes(q.img-1)); if(sp) sp.quote=q; else free.push(q); });
  s.forEach(sp=>{ if(wordy(sp) && !sp.quote && free.length) sp.quote=free.shift(); });
  return s;
}
/* Phone: the book becomes single pages. Each desktop spread is turned into one or two pages that keep its character:
   a big photo stays big and centred, a plate stays smaller and off-centre, and a pair becomes a big page and a small one
   on the same diagonal (small high on the left, big low on the right, or the reverse). Two landscapes share one page. */
const PP = {
  full:  {w:1,  h:1,   x:"c", y:"c"},
  plate: {w:.74,h:.6,  x:"c", y:"c"},
  mag:   {w:.8, h:.72, x:"r", y:"b"},
  smallT:{w:.66,h:.58, x:"l", y:"t"},
  smallB:{w:.62,h:.56, x:"r", y:"b"},
  bigT:  {w:1,  h:.9,  x:"l", y:"t"},
  bigB:  {w:1,  h:.9,  x:"r", y:"b"},
  wideT: {w:1,  h:.46, x:"l", y:"t"},
  wideB: {w:.78,h:.42, x:"r", y:"b"},
  upB:   {w:.76,h:.76, x:"r", y:"b"},
  upT:   {w:.76,h:.76, x:"l", y:"t"},
};
function spreadsSingle(p){
  const s=[{type:"opentext", imgs:[]}], page=(imgs,pos)=>s.push({type:"phone", imgs, pos});
  spreadsBook(p).filter(x=>x.type==="book").forEach(sp=>{
    if(sp.quote) s.push({type:"words", imgs:[], quote:sp.quote});
    const [a,b]=sp.imgs, k=sp.key;
    if(sp.imgs.length===1) return page([a],[k==="A"?PP.plate:k==="M"?PP.mag:PP.full]);
    if(k==="P") { page([a],[PP.full]); page([b],[PP.full]); return; }
    const la=isLand(p,a), lb=isLand(p,b);
    if(la && lb) return page([a,b],[PP.wideT,PP.wideB]);                       // two landscapes: one page, on a diagonal
    if(la!==lb){ page([a],[la?PP.wideT:PP.upT]); page([b],[lb?PP.wideT:PP.upB]); return; }
    if(k==="C"){ page([a],[PP.bigT]); page([b],[PP.smallB]); }                 // big first, then the small detail
    else       { page([a],[PP.smallT]); page([b],[PP.bigB]); }                 // small first, then the big photo
  });
  return s;
}
function phonePage(p,sp){
  const css=getComputedStyle(document.body), top=parseFloat(css.getPropertyValue("--top"))||78, bot=parseFloat(css.getPropertyValue("--bot"))||58;
  const L=innerWidth*.05, W=innerWidth*.9, T=top+8, H=innerHeight-top-bot-16;
  return sp.imgs.map((i,j)=>{
    const pos=(sp.pos||[PP.full])[j], r=ratio(p,i);
    const w=Math.min(W*pos.w, H*pos.h*r), h=w/r;
    const left = pos.x==="l"? L : pos.x==="r"? L+W-w : L+(W-w)/2;
    const tp   = pos.y==="t"? T : pos.y==="b"? T+H-h : T+(H-h)/2;
    return figure(p,i,left,tp,w);
  }).join("");
}
function phoneWords(q){
  const words=q.q.split(" "), lines=[];
  if(q.lines) lines.push(...q.lines);
  else for(let j=0;j<words.length;){ const n=[2,1,2,1][lines.length%4]; lines.push(words.slice(j,j+n).join(" ")); j+=n; }
  return `<div class="cell" style="grid-column:1/13"><div class="pwords">${lines.map((l,k)=>`<span style="padding-left:${[1.2,0,2.6,1.6,3.4,.6][k%6]}em">${esc(l)}</span>`).join("")}<span class="dim by" style="padding-left:2.6em">${esc(q.by)}</span></div></div>`;
}
const spreads=p=>isBook()?spreadsBook(p):spreadsSingle(p);

let _geo=null;
function geo(){
  const st=$("stage"), W=st.clientWidth, H=st.clientHeight, cs=getComputedStyle(st);
  const pad=parseFloat(cs.paddingLeft), gut=parseFloat(cs.columnGap)||16;
  const probe=document.createElement("div"); probe.style.cssText="position:absolute;visibility:hidden;height:var(--top)"; st.appendChild(probe);
  const top=probe.offsetHeight; probe.style.height="var(--bot)"; const bot=probe.offsetHeight; probe.remove();
  const colW=(W-2*pad-11*gut)/12;
  return _geo={W,H,pad,gut,colW,top,bandH:H-top-bot,
    span(c){ const [a,b]=c.split("/").map(Number); return {L:pad+(a-1)*(colW+gut), W:(b-a)*colW+(b-a-1)*gut}; }};
}
/* Photo descriptions from content.js (ALTS); falls back to project, architect and number */
function altPlain(p,i){ const d=(typeof ALTS!=="undefined" && ALTS[p.slug]) ? ALTS[p.slug][String(i+1)] : "";
  return d || `${p.title}${p.architect?", "+p.architect:""}, photograph ${i+1} by Jake Balston`; }
function altText(p,i){ return esc(altPlain(p,i)); }
function figure(p,i,left,top,w){
  return `<figure class="ph" style="left:${left}px;top:${top}px;width:${w}px"><img src="${img(p,i)}" width="${Math.round(w)}" height="${Math.round(w/ratio(p,i))}" alt="${altText(p,i)}">${vidTag(p,i)}</figure>`;
}
function place(p,i,slot){
  const g=_geo, sp=g.span(slot.c), r=ratio(p,i);
  const w=Math.min(sp.W*slot.w, g.bandH*slot.h*r), h=w/r;
  const left = slot.x==="left"? sp.L : slot.x==="right"? sp.L+sp.W-w : sp.L+(sp.W-w)/2;
  const top  = slot.y==="top"? g.top : slot.y==="bottom"? g.top+g.bandH-h : g.top+(g.bandH-h)/2;
  return figure(p,i,left,top,w);
}
/* Two photos at exactly the same height, meeting across the spine */
function equalPair(p,a,b){
  const g=_geo, L=g.span("1/7"), R=g.span("7/13"), ra=ratio(p,a), rb=ratio(p,b);
  const h=Math.min(g.bandH*.88, L.W*.92/ra, R.W*.92/rb), top=g.top+(g.bandH-h)/2;
  return figure(p,a,L.L+L.W-h*ra,top,h*ra)+figure(p,b,R.L,top,h*rb);
}
/* Words stepped down an empty page, like the Japanese studio site */
function stepped(quote, side){
  const g=_geo, sp=g.span(side==="L"?"2/6":"8/12"), words=quote.q.split(" "), lines=[];
  if(quote.lines) lines.push(...quote.lines);   // hand-set line breaks, e.g. a poem
  else for(let j=0;j<words.length;){ const n=[2,1,2,1][lines.length%4]+(words.length>9?1:0); lines.push(words.slice(j,j+n).join(" ")); j+=n; }
  return `<div class="stepq" style="left:${sp.L}px;width:${sp.W}px;bottom:calc(var(--bot) + ${g.bandH*.12}px)">${lines.map((l,k)=>`<span style="padding-left:${[1.2,0,2.6,1.6,3.4,.6][k%6]}em">${esc(l)}</span>`).join("")}<span class="dim by" style="padding-left:2.6em">${esc(quote.by)}</span></div>`;
}
/* Two photos on a spread, after Casa Olivè (22–23, 32–33, 14–15): never matched in size, always on a diagonal —
   one photo hangs from the top margin, the other sits on the bottom margin, each pushed to its outer edge.
   Two uprights: one big, one small (B = small first, C = big first).
   An upright with a landscape: the landscape runs the full page width from the top, the upright sits low on the other page.
   Two landscapes: the first full-width from the top, the second a little smaller on the bottom margin. */
function pairSlots(p,a,b,key){
  const la=isLand(p,a), lb=isLand(p,b);
  const big  =(side,y)=>({c:side==="L"?"1/7":"7/13", w:.9, h:.9, x:side==="L"?"left":"right", y});
  const small=(side,y)=>({c:side==="L"?"1/7":"7/13", w:.66,h:.66,x:side==="L"?"left":"right", y});
  const upLow=(side)=>({c:side==="L"?"1/7":"7/13", w:.78,h:.78,x:side==="L"?"left":"right", y:"bottom"});
  const wide =(side,y,w)=>({c:side==="L"?"1/7":"7/13", w, h:.72, x:side==="L"?"left":"right", y});
  if(la && lb) return [wide("L","top",1), wide("R","bottom",.84)];
  if(!la && lb) return [upLow("L"), wide("R","top",1)];
  if(la && !lb) return [wide("L","top",1), upLow("R")];
  return key==="C" ? [big("L","top"), small("R","bottom")] : [small("L","top"), big("R","bottom")];
}
function bookSpread(p,sp){
  geo(); const t=SPREADS[sp.key];
  const slots = (!t.pair && t.slots.length===2) ? pairSlots(p,sp.imgs[0],sp.imgs[1],sp.key) : t.slots;
  let html = t.pair ? equalPair(p,sp.imgs[0],sp.imgs[1]) : slots.map((slot,j)=>place(p,sp.imgs[j],slot)).join("");
  if(t.words && sp.quote) html+=stepped(sp.quote,t.words);
  return html;
}

function openerInner(p){
  const t=fitDisplay(p.title, isBook()?6:12);
  const wk=PROJECT_COLOUR[p.slug];
  const facts=[[p.archLabel||"Architect",p.architect],...(p.credits||[]),["With",p.with],["Location",p.place],["Year",p.year],["Recognition",p.note],["Colour",`Wada ${plateOf(wk)}`]].filter(([,v])=>v)
    .map(([k,v,u])=>{
      // The architect's name links to their practice (opens in a new tab); project pages are never linked
      const val = u ? `<a class="ext" href="${u}" target="_blank" rel="noopener">${esc(v)}</a>` : k===(p.archLabel||"Architect") && p.site ? `<a class="ext" href="${p.site}" target="_blank" rel="noopener">${esc(v)}</a>` : k==="Colour" ? v : esc(v);
      return `<div class="lab">${k}</div><div style="margin-bottom:10px" class="${k==="Recognition"?"acc":""}">${val}</div>`; }).join("");
  return `<div style="grid-column:1/4;grid-row:1">${facts}</div>
    <div style="grid-column:4/7;grid-row:1">${p.text?esc(p.text):''}<div class="lab" style="margin-top:14px">${shown(p).length} photographs</div></div>
    <div class="display" style="grid-column:1/7;grid-row:3;font-size:${t.fs}px">${t.html}</div>`;
}
function renderProject(){
  const p=state.project, S=spreads(p), sp=S[state.page], book=isBook();
  document.title = p.section==="journal" ? `${p.title} · Jake Balston` : `${p.title}${p.architect?", "+p.architect:""} · Jake Balston, architectural photographer`;
  renderHead(p.section, "project"); setWada(PROJECT_COLOUR[p.slug]||SITE_COLOUR);
  setTimeout(updateQuiet,0);
  let html="";
  if(state.mode==="index"){
    html=`<div class="cell" style="grid-column:1/13"><div class="tbox full" style="display:block"><div class="scroll" style="height:100%"><div class="ix">${shown(p).map(i=>`<button data-img="${i}"><img loading="lazy" src="${thumb(p,i)}" alt="${altText(p,i)}"></button>`).join("")}</div></div></div></div>`;
  } else if(sp.type==="open") html=textCell("L",openerInner(p))+fullHalf(p,cov(p),"R",true);
  else if(sp.type==="book") html=bookSpread(p,sp);
  else if(sp.type==="opentext") html=textCell("X",openerInner(p));
  else if(sp.type==="phone") html=phonePage(p,sp);
  else if(sp.type==="words") html=phoneWords(sp.quote);
  swap(html);
  warmQ.length=0;   // anything still queued from elsewhere gives way to this project
  [1,2,-1].map(d=>S[(state.page+d+S.length)%S.length]).forEach(x=>x.imgs.forEach(i=>fetchImg(img(p,i))));

  const nums=sp.imgs.length? sp.imgs.map(i=>pad(dispNo(p,i))).join("–") : "00";
  // artwork in the photos on screen: title and artist (linked to their site) beside the counter
  const arts=(typeof ARTWORKS!=="undefined" && ARTWORKS[p.slug] && state.mode!=="index") ? sp.imgs.map(i=>ARTWORKS[p.slug][String(i+1)]).filter(Boolean) : [];
  const credit=!arts.length?"":sp.imgs.filter(i=>ARTWORKS[p.slug]&&ARTWORKS[p.slug][String(i+1)]).map(i=>[dispNo(p,i),...ARTWORKS[p.slug][String(i+1)]]).map(([n,t,by,u])=>`<span class="dim">${pad(n)}</span>&ensp;<i>${esc(t)}</i>, ${u?`<a class="ext" href="${u}" target="_blank" rel="noopener">${esc(by)}</a>`:esc(by)}`).join("<br>");
  const next=nextProject(p);
  const ctl = `<button id="modeBtn">${state.mode==="index"?"Pages":"Index"}</button>&emsp;<a href="/${next.slug}/">Next project</a>`;
  if(!book) setFoot([["1/5",ctl],["5/9",sp.imgs.length&&state.mode!=="index"?`<span class="dim">${nums} / ${pad(shown(p).length)}</span>`:"","center"],["9/13",credit||esc(p.title),"right"]]);
  else if(state.mode!=="index" && sp.type==="open") setFoot([["1/4",ctl]]);
  else setFoot([["1/4",ctl],["6/7",state.mode==="index"?"":`${nums} / ${pad(shown(p).length)}`],["7/8",`<span class="dim">Colour ${plateOf(PROJECT_COLOUR[p.slug])}</span>`],["8/11",credit],["11/13",esc(p.title),"right"]]);
  swatchTag(PROJECT_COLOUR[p.slug]);
  if(book && sp.type==="open" && state.mode!=="index") setTimeout(adaptNav,320);
  $("modeBtn").onclick=()=>{ state.mode=state.mode==="index"?"pages":"index"; renderProject(); };
}
/* Photos are numbered in the order they appear in the book, whatever their file numbers */
function dispNo(p,i){
  if(!p._disp){ p._disp={}; let n=0;
    spreadsBook(p).filter(x=>x.type==="book").forEach(x=>x.imgs.forEach(k=>{ if(!(k in p._disp)) p._disp[k]=++n; }));
    shown(p).forEach(k=>{ if(!(k in p._disp)) p._disp[k]=++n; }); }
  return p._disp[i]||i+1;
}
function nextProject(p){ const same=PROJECTS.filter(x=>x.section===p.section); return same[(same.indexOf(p)+1)%same.length]; }

/* ---------- Home: a small image in a lot of space ---------- */
let homeTimer=null, homeK=0, homeCur=null, homeWarm=null, homeWarmed=0;
/* Once a home photo has been on screen for two seconds, its project's opening page is fetched in the background
   (up to four projects a visit, mouse and decent connection only); hovering the photo fetches it straight away */
function homeShown(p){
  clearTimeout(homeWarm); if(!canHover || slowNet() || homeWarmed>=4) return;
  homeWarm=setTimeout(()=>{ if(state.route==="home"){ homeWarmed++; warmProject(p); } },2000);
}
function renderHome(){
  swatchTag(null); document.body.classList.add("home");
  document.title="Jake Balston · Architectural photographer, UK";
  renderHead(null); setWada(SITE_COLOUR); quietOff();
  if(!HOME_ALL) HOME_ALL=homeAll();
  const [p,pi]=HOME_ALL[homeK%HOME_ALL.length], book=isBook();
  const homeSrc=(q,qi)=>isBook()?thumb(q,qi):mid(q,qi);
  const photo=`<img src="${homeSrc(p,pi)}" alt="${altText(p,pi)}" style="width:100%;height:100%;object-fit:contain;object-position:center;transition:opacity .6s">`;
  if(!book){
    swap(`<div class="cell" style="grid-column:1/13">
      <a id="homeImg" href="/${p.slug}/" style="position:absolute;left:8%;right:8%;top:22%;height:50%;display:block">${photo}</a></div>`);
    setFoot([["1/13",`<div style="text-align:center">Architecture and interiors, photographed<br>for architects, designers and publishers.<div class="dim" style="margin-top:6px">Based in the UK, working worldwide</div></div>`]]);
  } else swap(`<div class="cell" style="grid-column:1/13">
      <div style="position:absolute;left:0;top:50%;transform:translateY(-50%);text-transform:uppercase;letter-spacing:.08em">Architectural photography</div>
      <div style="position:absolute;right:0;top:50%;transform:translateY(-50%);text-transform:uppercase;letter-spacing:.08em;text-align:right">Working worldwide</div>
    </div>
    <div class="cell" style="grid-column:6/8">
      <a id="homeImg" href="/${p.slug}/" style="position:absolute;left:0;right:0;top:31%;height:38%;display:block">${photo}</a>
    </div>`);
  homeCur=p;
  if(book) setFoot([["1/2","JB"],["2/3","2026"],["5/9",`<div style="text-align:center">Architecture and interiors, photographed<br>for architects, designers and publishers.</div>`],["11/13",`${PROJECTS.filter(p=>p.section==="commissions").length} projects`,"right"]]);
  clearInterval(homeTimer);
  homeTimer=setInterval(()=>{
    if(state.route!=="home") return clearInterval(homeTimer);
    homeK++; const [q,qi]=HOME_ALL[homeK%HOME_ALL.length], a=$("homeImg"); if(!a) return;
    const im=a.querySelector("img"), nx=new Image(); nx.src=homeSrc(q,qi);
    im.style.opacity=0;
    Promise.all([nx.decode().catch(()=>{}), new Promise(r=>setTimeout(r,600))]).then(()=>{
      if(state.route!=="home") return;
      im.src=nx.src; im.alt=altPlain(q,qi); a.href="/"+q.slug+"/"; homeCur=q; im.style.opacity=1; homeShown(q); });
  },4500);
}

/* ---------- Commissions: a table, with the cover alongside ---------- */
function renderList(section){
  swatchTag(null);
  document.title = section==="journal" ? "Journal · Jake Balston" : "Commissions · Jake Balston, architectural photographer";
  renderHead(section, section==="journal"?null:"list"); setWada(SITE_COLOUR); quietOff();
  const list=PROJECTS.filter(x=>x.section===section), book=isBook();
  if(section==="journal") return renderJournal(list, book);
  const pv=state.hover && bySlug[state.hover] && bySlug[state.hover].section===section ? bySlug[state.hover] : list[0];
  const table=`<div class="tbl"><div class="th"><span>Project</span><span>Architect</span><span class="c3">Location</span><span class="c4">Year</span></div>
    ${list.map(x=>`<a href="/${x.slug}/" data-pv="${x.slug}" class="${book&&x===pv?"on":""}"><span class="t">${esc(x.title)}</span><span>${x.listBy?esc(x.listBy):x.architect?esc(x.architect):"&nbsp;"}</span><span class="c3">${esc(x.place.split(",")[0]||"")}</span><span class="c4">${x.listYear||x.year}</span></a>`).join("")}</div>`;
  if(book){
    swap(fullHalf(pv,cov(pv),"L").replace('class="cell','id="pv" class="cell')+
         `<div class="cell" style="grid-column:7/13"><div class="tbox full" style="display:block"><div class="scroll" style="height:100%">${table}</div></div></div>`);
    setTimeout(()=>document.querySelectorAll("[data-pv]").forEach(a=>a.addEventListener("mouseenter",()=>{
      const q=bySlug[a.dataset.pv]; state.hover=q.slug;
      swapSrc($("pv").querySelector("img"),img(q,cov(q)));
      document.querySelectorAll("[data-pv]").forEach(b=>b.classList.toggle("on",b===a));
      listFoot(list,q);
    })),320);
    document.addEventListener("click",pvClick);
  } else swap(`<div class="cell" style="grid-column:1/13"><div class="tbox full" style="display:block"><div class="scroll" style="height:100%">${table}</div></div></div>`);
  if(book) listFoot(list,pv); else setFoot([["1/13",`${list.length} projects`]]);
}
/* Journal index, after the Casa Olivè catalogue spreads. Each entry is one small cluster of prints (a few picked from it,
   touching edge to edge with a hairline gap) with its date beneath. On a desktop the sheet is an open book: clusters never
   cross the spine, and each page holds one or two clusters per row at loose, uneven positions. On a phone it is one page. */
function journalItems(list){
  // prints per entry follow the shape of the photos: narrow ones come in more, wide ones in fewer,
  // filling roughly the same width (about three squares), so the sheet has an assorted rhythm
  // each entry gets its own width, from about one print to four, fixed per entry (from its slug) so it never reshuffles
  const BUDGETS=[1.2,2.3,3.25,4.1,2.8,1.7];
  const budgetOf=p=>{ let h=0; for(const ch of p.slug) h=(h*31+ch.charCodeAt(0))>>>0; return BUDGETS[h%BUDGETS.length]; };
  const printsOf=p=>{ const order=[...(p.pick||[]), ...shown(p).filter(i=>!(p.pick||[]).includes(i))], out=[], B=budgetOf(p); let sum=0;
    if(p.printCount) return order.slice(0,p.printCount).map(i=>({r:ratio(p,i), src:thumb(p,i), i}));   // set by hand
    for(const i of order){ const r=ratio(p,i); if(out.length && sum+r>B) break; out.push({r, src:thumb(p,i), i}); sum+=r; if(out.length>=5) break; }
    return out; };
  const items=list.map(p=>({p, date:p.date||"", title:p.title, prints:printsOf(p)}));
  return items.sort((a,b)=>b.date.localeCompare(a.date));
}
const fmtDate=d=>d? d.slice(5,7)+" "+d.slice(2,4) : "";      // month and year: "09 26"
function renderJournal(list, book){
  const pad=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--pad"))||20;
  const W=innerWidth-2*pad, gut=book? W/12*.5 : 0, pages=book?2:1, PW=book?(W-gut)/2:W, col=PW/6;
  const rh=book? Math.max(96,Math.min(150,PW*.2,(innerHeight-150)*.2)) : Math.max(84,PW*.27), pitch=rh+(book?64:46), hair=book?10:7;
  const rnd=k=>{ let h=(k*2654435761)>>>0; h^=h>>>15; h=Math.imul(h,2246822519)>>>0; h^=h>>>13; return (h>>>0)/4294967296; };
  const items=journalItems(list);
  let row=0, pg=0, x=0, k=0, html=""; const rowY=[0];
  const pageX=g=> g*(PW+gut);
  items.forEach((it,n)=>{
    let w=it.prints.reduce((a,q)=>a+rh*q.r,0)+hair*(it.prints.length-1);
    const sc = w>PW*.92 ? (PW*.92-hair*(it.prints.length-1))/(w-hair*(it.prints.length-1)) : 1;   // a wide cluster is shrunk to fit its page
    if(sc<1) w=PW*.92;
    // every row starts at the very left; the space between entries varies (on the right page, from the spine)
    const indent=()=> pg===0 ? 0 : col*Math.floor(rnd(++k)*5)*.5;
    // hand placement where set: jRow starts a new row, jPage moves to the next page, jGap sets the space before (in columns)
    const P=it.p;
    if((P.jRow && (x>0||pg>0)) || (P.jPage && x>0)){ pg++; x=0; if(P.jRow||pg>=pages){ pg=0; row++; } }
    let start = x===0 ? (P.jGap!=null&&pg>0 ? col*P.jGap : indent()) : x + (P.jGap!=null ? col*P.jGap : col*(1+Math.floor(rnd(++k)*4)*.5));   // at least a column between entries
    if(P.jGap==null) start=Math.round(start/(col/2))*(col/2);   // hand-set gaps are kept exact
    if(x===0 && start+w>PW) start=0;                  // a fresh page always takes the cluster
    if(start+w>PW){                                     // no room: next page, or the next row
      pg++; x=0; if(pg>=pages){ pg=0; row++; }
      start=Math.round(indent()/(col/2))*(col/2);
      if(start+w>PW) start=0;
    }
    while(rowY.length<=row) rowY.push(rowY.length? rowY[rowY.length-1]+pitch+rh*(rnd(++k)*.3) : 0);
    let cx=pageX(pg)+start, y=rowY[row], h=rh*sc;
    html+=`<div class="jset" style="left:${cx}px;top:${y+(rh-h)}px;height:${h}px">`+
      it.prints.map((q,j)=>{ const pw=h*q.r, l=it.prints.slice(0,j).reduce((a,z)=>a+h*z.r+hair,0);
        return `<a href="/${it.p.slug}/" style="left:${l}px;width:${pw}px"><img loading="lazy" src="${q.src}" alt="${altText(it.p,q.i)}"></a>`; }).join("")+
      `<span class="n">${fmtDate(it.date)}</span></div>`;
    x=start+w;
    const nx=(items[n+1]||{}).p||{};
    if(nx.jGap==null && !nx.jPage && !nx.jRow && x>col*2.5 && rnd(++k)<.35){ pg++; x=0; if(pg>=pages){ pg=0; row++; } }      // sometimes a page row keeps just one cluster
  });
  const H=(rowY[row]||0)+pitch;
  swap(`<div class="cell" style="grid-column:1/13"><div class="tbox full" style="display:block"><div class="scroll" style="height:100%"><div class="jsheet" style="height:${H}px">${html}</div></div></div></div>`);
  const real=list.length, foot=it=>setFoot([["1/7",`<span class="dim">Journal</span>`],["7/13",it?`${esc(it.title)}<span class="dim">${it.p.role?" · "+esc(it.p.role):""} · ${fmtDate(it.date)}</span>`:`<span class="dim">${real} ${real===1?"entry":"entries"}</span>`,"right"]]);
  foot(null);
  setTimeout(()=>{ const sets=[...document.querySelectorAll(".jset")];
    sets.forEach((el,n)=>{ el.addEventListener("mouseenter",()=>foot(items[n])); });
  },320);
}
/* Commissions footer: follows the hovered project, showing its place in the list and its recognition if it has one */
function listFoot(list,q){
  const n=list.indexOf(q)+1;
  setFoot([["7/8",`${pad(n)} / ${pad(list.length)}`],["8/13",q.note?`<span class="acc">${esc(q.note)}</span>`:`<span class="dim">Selected commissions</span>`,"right"]]);
}
function pvClick(e){ const el=e.target.closest("#pv"); if(el && state.hover) go(state.hover); else if(el) go(PROJECTS.find(x=>x.section===state.route).slug); }

/* ---------- Information: labels on the left, lists on the right ---------- */
function renderInfo(){
  swatchTag(null);
  document.title="Information · Jake Balston, architectural photographer";
  renderHead("information"); setWada(SITE_COLOUR); quietOff();
  const book=isBook();
  const t=fitDisplay("Photographs of buildings, for the people who make them.", book?6:12);
  const inv=`<div class="inv">
    <div class="k">Contact</div><div class="v"><a href="mailto:info@jakebalston.com">info@jakebalston.com</a><div>+44 7791 760 474</div><div><a href="https://instagram.com/jakebalston">Instagram</a></div></div>
    <div class="k">Project awards</div><div class="v">${AWARDS.map(([y,a,p])=>`<div>${esc(a)} <span>${esc(p)}, ${y}</span></div>`).join("")}</div>
    <div class="k">Publications</div><div class="v">${PRESS.map(([a,p])=>`<div>${esc(a)} <span>${esc(p)}</span></div>`).join("")}</div>
    <div class="k">Books</div><div class="v">${BOOKS.map(([a,p])=>`<div>${esc(a)} <span>${esc(p)}</span></div>`).join("")}</div>
    <div class="k">Clients</div><div class="v">${CLIENTS.map(c=>`<div>${esc(c)}</div>`).join("")}</div>
    <div class="k">Colour</div><div class="v">Each project page takes its colours from a combination in Sanzo Wada's <i>A Dictionary of Color Combinations</i> (1933). The switch beside the menu calms it down: once for black and white, twice for colour photographs only.</div></div>`;
  const about=`<div style="grid-column:1/5;grid-row:1">Jake Balston is an architectural photographer based in the UK, working across the UK, Europe and the United States. His work has been published by Dezeen, Wallpaper*, ArchDaily, Forbes and the RIBA Journal.</div>`;
  if(book){
    swap(textCell("L", about + `<div class="display" style="grid-column:1/7;grid-row:3;font-size:${t.fs*.62}px">Photographs of buildings,<br>for the people<br>who make them.</div>`)
      + `<div class="cell" style="grid-column:7/13"><div class="tbox full" style="display:block"><div class="scroll" style="height:100%">${inv}</div></div></div>`);
  } else swap(`<div class="cell" style="grid-column:1/13"><div class="tbox full" style="display:block"><div class="scroll" style="height:100%"><div style="margin-bottom:26px">${about.replace(/style="[^"]*"/,"")}</div>${inv}</div></div></div>`);
  setFoot(book? [["1/4","Information"],["7/9","© Jake Balston 2026"]] : [["1/13","© Jake Balston 2026"]]);
}

/* ---------- The colour tag: the plate's swatches, packed together, coming in from the left edge ---------- */
function swatchTag(k){
  let t=$("swtag"); if(!t){ t=document.createElement("div"); t.id="swtag"; $("world").appendChild(t); }
  const list = k ? PLATE_SWATCHES[plateOf(k)] : null;
  t.innerHTML = list ? list.map(c=>`<i style="background:${c}"></i>`).join("") : "";
  t.title = k && WADA[k] ? `Wada ${plateOf(k)}: ${WADA[k].names}` : "";
}
/* On the opening spread the menu can sit over the photograph: read the picture under it and use the paper or the ink, whichever reads */
function adaptNav(){
  const n=$("projNav"), cell=document.querySelector("#stage .cell.full"); if(!n||!cell) return;
  const im=cell.querySelector("img"); if(!im.complete){ im.onload=adaptNav; return; }
  const r=n.getBoundingClientRect(), c=cell.getBoundingClientRect();
  if(r.right<c.left) return;
  try{
    const cv=document.createElement("canvas"), W=Math.round(c.width/4), H=Math.round(c.height/4); cv.width=W; cv.height=H;
    const x=cv.getContext("2d"), ir=im.naturalWidth/im.naturalHeight, cr=c.width/c.height, fit=getComputedStyle(im).objectFit;
    let dw,dh; if((fit==="cover")===(ir>cr)){ dh=H; dw=H*ir; } else { dw=W; dh=W/ir; }
    x.drawImage(im, W-dw, (H-dh)/2, dw, dh);   // object-position: right center
    const sx=Math.max(0,(r.left-c.left)/4), sy=Math.max(0,(r.top-c.top)/4), d=x.getImageData(sx,sy,Math.max(1,r.width/4),Math.max(1,r.height/4)).data;
    let L=0,k=0; for(let i=0;i<d.length;i+=4){ if(d[i+3]===0) continue; L+=.2126*d[i]+.7152*d[i+1]+.0722*d[i+2]; k++; }
    const light = k ? L/k > 140 : true;
    n.style.color = light ? "var(--ink)" : "var(--ground)";
  }catch(e){}
}

/* ---------- Quiet mode ---------- */
let peekTimer=null, nearEdge=false;
const canHover = matchMedia("(hover:hover) and (pointer:fine)").matches;
function updateQuiet(){
  const w=$("world"), was=w.classList.contains("quiet");
  const on = bySlug[state.route] && state.mode==="pages" && state.page>0;
  w.classList.toggle("quiet", !!on);
  if(!on){ w.classList.remove("peek"); return; }
  if(!was){ clearTimeout(peekTimer); w.classList.toggle("peek", nearEdge && canHover); }
}
function quietOff(){ $("world").classList.remove("quiet","peek"); }
function peek(ms){ const w=$("world"); w.classList.add("peek"); clearTimeout(peekTimer); if(ms) peekTimer=setTimeout(()=>w.classList.remove("peek"),ms); }
document.addEventListener("pointermove", e=>{
  if(!canHover || e.pointerType!=="mouse") return;
  const near = e.clientY < 130 || e.clientY > innerHeight-80;
  if(near && !nearEdge) peek(0);
  if(!near && nearEdge) peek(900);
  nearEdge=near;
});
// Touch: in quiet mode, a tap near the top or bottom brings the header and footer back for a few seconds
$("stage").addEventListener("click", e=>{
  if(canHover) return;
  const w=$("world"); if(!w.classList.contains("quiet")) return;
  const y=e.clientY; if(y<120 || y>innerHeight-70){ peek(3500); }
}, true);

/* ---------- Rendering, routing, input ---------- */
let swapT=null;
function swap(html){
  const st=$("stage"); clearTimeout(swapT); document.removeEventListener("click",pvClick);
  const go=()=>{ st.innerHTML=html; st.classList.remove("fade"); reveal(st); wire(); wakeVideos(); };
  if(st.children.length>0){ st.classList.add("fade"); swapT=setTimeout(go,260); } else go();
}
function wire(){
  const st=$("stage");
  st.onclick = e=>{
    if(!bySlug[state.route] || state.mode!=="pages" || e.target.closest("a,button")) return;
    const back = e.clientX < innerWidth/2;
    if(back && state.page===0) return;
    step(back?-1:1);
  };
  st.onmousemove = e=>{
    st.style.cursor = (!bySlug[state.route]||state.mode!=="pages") ? "" : (e.clientX<innerWidth/2 ? (state.page===0?"":"w-resize") : "e-resize");
  };
  document.querySelectorAll("#stage .ext").forEach(a=>a.addEventListener("click",e=>e.stopPropagation()));
  document.querySelectorAll("#stage [data-go]").forEach(el=>{
    const g=el.dataset.go; if(g==="0") return;
    el.onclick=e=>{ if(g==="half"){ step(e.clientX<innerWidth/2?-1:1); } else step(+g); };
  });
  const h=$("homeImg");
  if(h){ h.onmouseenter=()=>warmProject(homeCur,true);
    const im=h.querySelector("img"); if(im.complete) homeShown(homeCur); else im.addEventListener("load",()=>homeShown(homeCur),{once:true}); }
  document.querySelectorAll("[data-img]").forEach(b=>b.onclick=()=>{
    const i=+b.dataset.img, S=spreads(state.project);
    state.page=Math.max(0,S.findIndex(s=>s.imgs.includes(i))); state.mode="pages"; renderProject();
  });
}
function step(d){
  if(!bySlug[state.route]||state.mode!=="pages") return;
  const n=spreads(state.project).length; state.page=(state.page+d+n)%n; renderProject();
}
function route(keep){
  document.body.classList.remove("home");
  let h=location.pathname.split("/").filter(Boolean)[0]||"home";
  if(!["home","commissions","journal","information"].includes(h)&&!bySlug[h]) h="home";
  state.route=h;
  if(h==="home") return renderHome();
  if(h==="commissions"||h==="journal") return renderList(h);
  if(h==="information") return renderInfo();
  if(keep===true && state.project===bySlug[h]) return renderProject();
  state.project=bySlug[h]; state.page=0; state.mode="pages";
  renderProject();
}
function layoutMode(){ document.body.classList.toggle("single",!isBook()); }
addEventListener("popstate",()=>route());
/* Clean addresses: internal links change the page without reloading it */
function go(slug){ const u = slug==="home" ? "/" : "/"+slug+"/"; if(u!==location.pathname) history.pushState(null,"",u); route(); }
document.addEventListener("click",e=>{
  const a=e.target.closest('a[href^="/"]'); if(!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target) return;
  e.preventDefault(); const u=a.getAttribute("href"); if(u!==location.pathname) history.pushState(null,"",u); route();
});
let wasBook=isBook(), rz;
addEventListener("resize",()=>{ clearTimeout(rz); rz=setTimeout(()=>{
  const b=isBook(); layoutMode();
  if(b!==wasBook && bySlug[state.route]){
    const prevS = b ? spreadsSingle(state.project) : spreadsBook(state.project);
    const shown=(prevS[state.page]||{imgs:[0]}).imgs[0] ?? 0;
    state.page=Math.max(0,spreads(state.project).findIndex(s=>s.imgs.includes(shown)));
  }
  wasBook=b; route(true);
},150); });
document.addEventListener("keydown",e=>{
  if(e.key==="ArrowRight") step(1);
  if(e.key==="ArrowLeft") step(-1);
  if(e.key==="Escape"&&bySlug[state.route]){ state.mode=state.mode==="pages"?"index":"pages"; renderProject(); }
});
let tx=null,ty=null;
$("stage").addEventListener("touchstart",e=>{tx=e.touches[0].clientX;ty=e.touches[0].clientY;},{passive:true});
$("stage").addEventListener("touchend",e=>{ if(tx===null)return; const dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty; tx=null;
  if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)) step(dx<0?1:-1); });

try{ const c=+localStorage.getItem("jb-colour"); if(c===1||c===2){ colourState=c; spins=c; document.documentElement.style.setProperty("--rot",(c*180)+"deg"); } }catch(e){}
applyColour();
layoutMode();
/* Visitor numbers: Cloudflare Web Analytics, no cookies. spa:true counts every project opened, not just the first page.
   Only on the live site. Visiting jakebalston.com/?me stops your own visits counting on that browser; /?me=off undoes it. */
try{
  const q=new URLSearchParams(location.search);
  if(q.has("me")){ q.get("me")==="off" ? localStorage.removeItem("jb-me") : localStorage.setItem("jb-me","1");
    history.replaceState(null,"",location.pathname); }
  if(location.hostname==="jakebalston.com" && !localStorage.getItem("jb-me")){
    const b=document.createElement("script"); b.defer=true; b.src="https://static.cloudflareinsights.com/beacon.min.js";
    b.dataset.cfBeacon=JSON.stringify({token:"3aa6b39d3a2a4b36aec479aeb41bb6df",spa:true}); document.head.appendChild(b);
  }
}catch(e){}
$("stage").innerHTML="";  // the text version of the page (for search engines) gives way to the real one
(document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(()=>route());
