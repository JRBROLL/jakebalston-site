/* Jake Balston: site behaviour. Content lives in content.js */
/* ---------- Data ---------- */

/* Colour: combinations from Sanzo Wada, A Dictionary of Color Combinations (1933).
   Each combination gives a pale colour (tinted into the paper), a deep colour (the ink) and an accent for small details. */
const WADA = {   // exact swatches only. pale = paper, ink = text, acc = small details (a third colour from the same plate, or the ink when the third is too pale to read)
  296:{pale:"#f5ecc2", ink:"#34454c", acc:"#71502f", names:"Sulpher Yellow · Slate Color · Pale Raw Umber"},
  "296b":{pale:"#f5ecc2", ink:"#71502f", acc:"#34454c", names:"Sulpher Yellow · Pale Raw Umber · Slate Color", plate:296},
  190:{pale:"#ebd3a2", ink:"#111314", acc:"#d96629", names:"Ivory Buff · Black · English Red"},
  243:{pale:"#ebd3a2", ink:"#34454c", acc:"#bb7125", names:"Ivory Buff · Slate Color · Raw Sienna"},
  246:{pale:"#f5ecc2", ink:"#a84222", acc:"#a84222", names:"Sulpher Yellow · Brick Red"},
  126:{pale:"#ebd3a2", ink:"#1c4286", acc:"#1c4286", names:"Ivory Buff · Deep Lyons Blue"},
  262:{pale:"#ebd3a2", ink:"#437742", acc:"#da525d", names:"Ivory Buff · Cossack Green · Eugenia Red"},
  214:{pale:"#ebd3a2", ink:"#4f4086", acc:"#a36752", names:"Ivory Buff · Violet · Sudan Brown"},
  113:{pale:"#fdd4bd", ink:"#4b3317", acc:"#4b3317", names:"Seashell Pink · Vandyke Brown"},
  270:{pale:"#f5ecc2", ink:"#6b7140", acc:"#da525d", names:"Sulpher Yellow · Olive Green · Eugenia Red"},
  151:{pale:"#f5ecc2", ink:"#064f6e", acc:"#064f6e", names:"Sulpher Yellow · Vandar Poel's Blue"},
  266:{pale:"#ebd3a2", ink:"#00978d", acc:"#e31f26", names:"Ivory Buff · Benzol Green · Spectrum Red"},
  310:{pale:"#f5ecc2", ink:"#253122", acc:"#837e31", names:"Sulpher Yellow · Deep Slate Olive · Olive"},
  343:{pale:"#ebd3a2", ink:"#ae5224", acc:"#064f6e", names:"Ivory Buff · Burnt Sienna · Vandar Poel's Blue"},
};
// Hand-set running orders: [spread, image numbers…]. Images left out are dropped from the project.


// Every swatch on each plate, in the book's order, for the little colour tag at the left edge
const PLATE_SWATCHES = {"266": ["#e31f26", "#ebd3a2", "#8fa071", "#00978d"], "310": ["#f5ecc2", "#eeb480", "#837e31", "#253122"], "296": ["#f5ecc2", "#d8a37b", "#71502f", "#34454c"], "190": ["#ebd3a2", "#d96629", "#111314"], "243": ["#bb7125", "#ebd3a2", "#6b7140", "#34454c"], "246": ["#f8b6ba", "#a84222", "#f5ecc2", "#fdc57e"], "126": ["#ebd3a2", "#e2b540", "#1c4286"], "262": ["#da525d", "#ebd3a2", "#b09f36", "#437742"], "214": ["#ebd3a2", "#a36752", "#4f4086"], "113": ["#fdd4bd", "#4b3317"], "270": ["#da525d", "#f5ecc2", "#6b7140", "#437742"], "151": ["#f5ecc2", "#f99d1b", "#064f6e"], "343": ["#ae5224", "#ebd3a2", "#635a3a", "#064f6e"]};
const plateOf = k => (WADA[k]&&WADA[k].plate) || k;
const SITE_COLOUR = 296;

const NEUTRAL = {ground:"#ecebe7", ink:"#17171a", acc:"#8d8c88"};
const hx=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const toHex=a=>"#"+a.map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,"0")).join("");
const mix=(a,b,t)=>toHex(hx(a).map((v,i)=>v*(1-t)+hx(b)[i]*t));
let colourState=0, currentWada=SITE_COLOUR;  // 0 full colour · 1 all black & white · 2 colour photographs, calm site
/* Take saturation out of a colour, keeping its hue and lightness (f = share kept) */
function desat(h,f){
  let [r,g,b]=hx(h).map(v=>v/255); const mx=Math.max(r,g,b), mn=Math.min(r,g,b), l=(mx+mn)/2, d=mx-mn;
  if(!d) return h;
  let s0=d/(1-Math.abs(2*l-1)), hh = mx===r?((g-b)/d)%6 : mx===g?(b-r)/d+2 : (r-g)/d+4; hh*=60; if(hh<0) hh+=360;
  const s1=s0*f, c=(1-Math.abs(2*l-1))*s1, x=c*(1-Math.abs((hh/60)%2-1)), m=l-c/2;
  const [a,b2,c2] = hh<60?[c,x,0]:hh<120?[x,c,0]:hh<180?[0,c,x]:hh<240?[0,x,c]:hh<300?[x,0,c]:[c,0,x];
  return toHex([a+m,b2+m,c2+m].map(v=>v*255));
}
const PAPER_SAT=.8;                 // every paper keeps 80% of its saturation
const QUIET_GROUND="#d6d6d6";       // black and white modes: an 84% grey-white
function applyColour(){
  const w = WADA[currentWada];
  const base = colourState===2 || !w ? NEUTRAL : {ground: w.pale, ink: w.ink, acc: w.acc};
  const pal = {...base, ground: colourState===0 ? desat(base.ground,PAPER_SAT) : QUIET_GROUND};
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
// Home: every photograph on the site, shuffled each visit (each opens its project at that image)
let HOME_ALL = null;
function homeAll(){ const a=[]; PROJECTS.filter(p=>p.section==="commissions").forEach(p=>{ shown(p).forEach(i=>a.push([p,i])); });
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
const HOME_ROTATION = ["osprey-house","hampstead-house","chatham","deyne-avenue","th-house"];





/* ---------- Images (temporary: taken from the current Squarespace site) ---------- */

function ratio(p,i){ const d=DIMS[p.slug][i]; return d[0]/d[1]; }
function img(p,i){ return `/img/${p.slug}-${String(i+1).padStart(2,"0")}.webp`; }
function thumb(p,i){ return `/img/${p.slug}-${String(i+1).padStart(2,"0")}-t.webp`; }
function preload(p,list){ list.forEach(i=>{ if(i>=0&&i<p.count){ const im=new Image(); im.src=img(p,i);} }); }

/* ---------- Helpers ---------- */
const $=id=>document.getElementById(id);
const pad=n=>String(n).padStart(2,"0");
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");
PROJECTS.forEach(p=>{ if(LAYOUTS[p.slug]) p.layout=LAYOUTS[p.slug]; if(DROPS[p.slug]) p.drop=DROPS[p.slug]; });
const cov=p=>(p.cover||1)-1;
const shown=p=>Array.from({length:p.count},(_,i)=>i).filter(i=>!(p.drop||[]).includes(i+1));
const bySlug=Object.fromEntries(PROJECTS.map(p=>[p.slug,p]));
const isBook=()=>innerWidth>=900 && innerWidth>innerHeight*1.05;
const known=a=>a && !/confirm/.test(a);
let state={route:"home", project:null, page:0, mode:"pages", hover:null};

const half=side=>!isBook()? "1/13" : side==="L" ? "1/7" : side==="R" ? "7/13" : "1/13";
/* Images are never cropped and never run under the header or footer:
   each sits whole inside a box on the grid, within the band between them. */
const band=(t,h)=>`top:calc(var(--top) + (100% - var(--top) - var(--bot)) * ${t});height:calc((100% - var(--top) - var(--bot)) * ${h})`;
function imgBox(p,i,cols,t=0,h=1,pos="center"){
  return `<div class="cell" style="grid-column:${cols}"><div class="ib" style="${band(t,h)}"><img src="${img(p,i)}" style="object-position:${pos}" alt="${esc(p.title)}${known(p.architect)?", "+esc(p.architect):""}, image ${i+1}"></div></div>`;
}
function fullHalf(p,i,side,src,crop){
  const W=innerWidth/2+parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--pad")||20), H=innerHeight;
  const cover = crop || Math.abs(Math.log(ratio(p,i)/(W/H)))<.22;   // near the shape of the half: fill it; otherwise show whole at full height
  return `<div class="cell full ${side==="L"?"bleedL":"bleedR"}" style="grid-column:${side==="L"?"1/7":"7/13"}"><img src="${src||img(p,i)}" style="object-fit:${cover?"cover":"contain"};object-position:${side==="L"?"left":"right"} center" alt="${esc(p.title)}${known(p.architect)?", "+esc(p.architect):""}"></div>`;
}
function imageCell(p,i,side){ return imgBox(p,i,half(side),0,1, side==="L"?"left center":side==="R"?"right center":"center"); }
const textCell=(side,inner,cls="",attrs="")=>`<div class="cell ${cls}" style="grid-column:${half(side)}" ${attrs}><div class="tbox">${inner}</div></div>`;
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
  const book=isBook(), name=`<a class="name" href="/">Jake Balston</a><div class="dim" style="margin-top:4px">Architectural photographer<br>Based in the UK</div>`;
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
const isLand=(p,i)=>ratio(p,i)>1.15, isPort=(p,i)=>ratio(p,i)<.95;
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
      let key=ORDER[k++%ORDER.length]; const a=list[j], b=list[j+1], left=list.length-j;
      if(key==="G" && !isLand(p,a)) key="F";
      if(key==="P" && !(left>=2 && isPort(p,a) && isPort(p,b))) key="C";
      if(["B","D","C","P"].includes(key) && left<2) key = isLand(p,a)?"G":"H";
      const n = SPREADS[key].pair || SPREADS[key].slots.length===2 ? 2 : 1;
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
  const L=innerWidth*.05, W=innerWidth*.9, T=top+8, H=innerHeight-top-bot-16, two=sp.imgs.length===2;
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
  for(let j=0;j<words.length;){ const n=[2,1,2,1][lines.length%4]; lines.push(words.slice(j,j+n).join(" ")); j+=n; }
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
function figure(p,i,left,top,w){
  return `<figure class="ph" style="left:${left}px;top:${top}px;width:${w}px"><img src="${img(p,i)}" width="${Math.round(w)}" height="${Math.round(w/ratio(p,i))}" alt="${esc(p.title)}${known(p.architect)?", "+esc(p.architect):""}, image ${i+1}"></figure>`;
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
  for(let j=0;j<words.length;){ const n=[2,1,2,1][lines.length%4]+(words.length>9?1:0); lines.push(words.slice(j,j+n).join(" ")); j+=n; }
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
  const wk=PROJECT_COLOUR[p.slug], w=WADA[wk]||{};
  const facts=[["Architect",p.architect],["With",p.with],["Location",p.place],["Year",p.year],["Recognition",p.note],["Colour",`Wada ${plateOf(wk)}`]].filter(([,v])=>v)
    .map(([k,v])=>{
      // The architect's name links to their practice (opens in a new tab); project pages are never linked
      const val = k==="Architect" && p.site ? `<a class="ext" href="${p.site}" target="_blank" rel="noopener">${esc(v)}</a>` : k==="Colour" ? v : esc(v);
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
    html=`<div class="cell" style="grid-column:1/13"><div class="tbox full" style="display:block"><div class="scroll" style="height:100%"><div class="ix">${shown(p).map(i=>`<button data-img="${i}"><img loading="lazy" src="${thumb(p,i)}" alt="${esc(p.title)} image ${i+1}"></button>`).join("")}</div></div></div></div>`;
  } else if(sp.type==="open") html=textCell("L",openerInner(p))+(book?fullHalf(p,cov(p),"R",null,true):imgBox(p,cov(p),"7/13",0,1,"right center"));
  else if(sp.type==="book") html=bookSpread(p,sp);
  else if(sp.type==="opentext") html=textCell("X",openerInner(p));
  else if(sp.type==="phone") html=phonePage(p,sp);
  else if(sp.type==="words") html=phoneWords(sp.quote);
  swap(html);
  [S[state.page+1],S[state.page-1]].forEach(x=>x&&preload(p,x.imgs));

  const nums=sp.imgs.length? sp.imgs.map(i=>pad(i+1)).join("–") : "00";
  const next=nextProject(p);
  const ctl = `<button id="modeBtn">${state.mode==="index"?"Pages":"Index"}</button>&emsp;<a href="/${next.slug}/">Next project</a>`;
  if(!book) setFoot([["1/5",ctl],["5/9",sp.imgs.length&&state.mode!=="index"?`<span class="dim">${nums} / ${pad(p.count)}</span>`:"","center"],["9/13",esc(p.title),"right"]]);
  else if(state.mode!=="index" && sp.type==="open") setFoot([["1/4",ctl]]);
  else setFoot([["1/4",ctl],["6/7",state.mode==="index"?"":`${nums} / ${pad(p.count)}`],["7/8",`<span class="dim">Colour ${plateOf(PROJECT_COLOUR[p.slug])}</span>`],["10/13",esc(p.title),"right"]]);
  swatchTag(PROJECT_COLOUR[p.slug]);
  if(book && sp.type==="open" && state.mode!=="index") setTimeout(adaptNav,320);
  $("modeBtn").onclick=()=>{ state.mode=state.mode==="index"?"pages":"index"; renderProject(); };
}
function nextProject(p){ const same=PROJECTS.filter(x=>x.section===p.section); return same[(same.indexOf(p)+1)%same.length]; }

/* ---------- Home: a small image in a lot of space ---------- */
let homeTimer=null, homeK=0;
function renderHome(){
  swatchTag(null); document.body.classList.add("home");
  document.title="Jake Balston · Architectural photographer, UK";
  renderHead(null); setWada(SITE_COLOUR); quietOff();
  if(!HOME_ALL) HOME_ALL=homeAll();
  const [p,pi]=HOME_ALL[homeK%HOME_ALL.length], book=isBook();
  if(!book){
    swap(`<div class="cell" style="grid-column:1/13">
      <a id="homeImg" href="/${p.slug}/" data-img="${pi}" style="position:absolute;left:8%;right:8%;top:22%;height:50%;display:block">
        <img src="${img(p,pi)}" alt="${esc(p.title)}" style="width:100%;height:100%;object-fit:contain;object-position:center;transition:opacity .6s"></a></div>`);
    setFoot([["1/13",`<div style="text-align:center">Architecture and interiors, photographed<br>for architects, designers and publishers.</div>`]]);
  } else swap(`<div class="cell" style="grid-column:1/13">
      <div style="position:absolute;left:0;${book?"top:50%;transform:translateY(-50%)":"top:var(--top)"};text-transform:uppercase;letter-spacing:.08em">Architectural photography</div>
      ${book?`<div style="position:absolute;right:0;top:50%;transform:translateY(-50%);text-transform:uppercase;letter-spacing:.08em;text-align:right">Working worldwide</div>`:""}
    </div>
    <div class="cell" style="grid-column:${book?"6/8":"4/10"}">
      <a id="homeImg" href="/${p.slug}/" data-img="${pi}" style="position:absolute;left:0;right:0;top:${book?"31%":"30%"};height:${book?"38%":"34%"};display:block">
        <img src="${thumb(p,pi)}" alt="${esc(p.title)}" style="width:100%;height:100%;object-fit:contain;object-position:center;transition:opacity .6s"></a>
    </div>`);
  if(book) setFoot([["1/2","JB"],["2/3","2026"],["5/9",`<div style="text-align:center">Architecture and interiors, photographed<br>for architects, designers and publishers.</div>`],["11/13",`${PROJECTS.filter(p=>p.section==="commissions").length} projects`,"right"]]);
  clearInterval(homeTimer);
  homeTimer=setInterval(()=>{
    if(state.route!=="home") return clearInterval(homeTimer);
    homeK++; const [q,qi]=HOME_ALL[homeK%HOME_ALL.length], a=$("homeImg"); if(!a) return;
    const im=a.querySelector("img"); im.style.opacity=0;
    const nx=new Image(); nx.onload=()=>{ im.src=nx.src; im.alt=q.title; a.href="/"+q.slug+"/"; a.dataset.img=qi; im.style.opacity=1; }; setTimeout(()=>{ nx.src=isBook()?thumb(q,qi):img(q,qi); },600);
  },4500);
}

/* ---------- Commissions / Personal: a table, with the cover alongside ---------- */
function renderList(section){
  swatchTag(null);
  document.title = section==="journal" ? "Journal · Jake Balston" : "Commissions · Jake Balston, architectural photographer";
  renderHead(section, section==="journal"?null:"list"); setWada(SITE_COLOUR); quietOff();
  const list=PROJECTS.filter(x=>x.section===section), book=isBook(), J=section==="journal";
  if(!list.length){
    renderHead(section); swap(`<div class="cell" style="grid-column:1/13"><div class="pwords" style="left:${book?"44%":"8%"}"><span style="padding-left:1.2em">Journal.</span><span>Photographs</span><span style="padding-left:2.6em">away from</span><span style="padding-left:1.6em">architecture.</span><span class="dim by" style="padding-left:2.6em">First entries soon</span></div></div>`);
    setFoot([["1/13",`<span class="dim">Journal</span>`]]); return;
  }
  if(J) return renderJournal(list, book);
  const pv=state.hover && bySlug[state.hover] && bySlug[state.hover].section===section ? bySlug[state.hover] : list[0];
  const table=`<div class="tbl"><div class="th"><span>${J?"Entry":"Project"}</span><span>${J?"About":"Architect"}</span><span class="c3">Location</span><span class="c4">Year</span></div>
    ${list.map(x=>`<a href="/${x.slug}/" data-pv="${x.slug}" class="${book&&x===pv?"on":""}"><span class="t">${esc(x.title)}</span><span>${J?esc(x.role||""):known(x.architect)?esc(x.architect):"&nbsp;"}</span><span class="c3">${esc(x.place.split(",")[0]||"")}</span><span class="c4">${x.year}</span></a>`).join("")}</div>`;
  if(book){
    swap(fullHalf(pv,cov(pv),"L",null,true).replace('class="cell','id="pv" class="cell')+
         `<div class="cell" style="grid-column:7/13"><div class="tbox full" style="display:block"><div class="scroll" style="height:100%">${table}</div></div></div>`);
    setTimeout(()=>document.querySelectorAll("[data-pv]").forEach(a=>a.addEventListener("mouseenter",()=>{
      const q=bySlug[a.dataset.pv]; state.hover=q.slug;
      $("pv").querySelector("img").src=img(q,cov(q));
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
const JOURNAL_TEST = false;        // 20 placeholder entries to judge the layout; switch off once real entries arrive
function journalItems(list){
  const items=list.map(p=>({p, date:p.date||"", title:p.title, prints:(p.pick||shown(p).slice(0,3)).map(i=>({r:ratio(p,i), src:thumb(p,i), i}))}));
  if(JOURNAL_TEST){
    const R=[.75,.75,1,1.33,1.5,.8], rnd=k=>{ const x=Math.sin(k*12.9898+3.1)*43758.5453; return x-Math.floor(x); };
    for(let e=0;e<20;e++){
      const d=new Date(2026,8-e,28-((e*7)%23)), n=1+Math.floor(rnd(e+1)*3.2);
      items.push({p:null, title:`Placeholder entry ${e+1}`, date:d.toISOString().slice(0,10),
        prints:Array.from({length:n},(_,j)=>({r:R[Math.floor(rnd(e*5+j+9)*R.length)], ph:true}))});
    }
  }
  return items.sort((a,b)=>b.date.localeCompare(a.date));
}
const fmtDate=d=>d? d.slice(5,7)+" "+d.slice(2,4) : "";      // month and year: "09 26"
function renderJournal(list, book){
  const pad=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--pad"))||20;
  const W=innerWidth-2*pad, gut=book? W/12*.5 : 0, pages=book?2:1, PW=book?(W-gut)/2:W, col=PW/6;
  const band=innerHeight-(book?150:150);
  const rh=book? Math.max(96,Math.min(150,PW*.2,band*.2)) : Math.max(84,PW*.27), pitch=rh+(book?64:46), hair=book?10:7;
  const rnd=k=>{ let h=(k*2654435761)>>>0; h^=h>>>15; h=Math.imul(h,2246822519)>>>0; h^=h>>>13; return (h>>>0)/4294967296; };
  const items=journalItems(list);
  let row=0, pg=0, x=0, k=0, html="";
  const pageX=g=> g*(PW+gut);
  items.forEach((it,n)=>{
    let w=it.prints.reduce((a,q)=>a+rh*q.r,0)+hair*(it.prints.length-1);
    const sc = w>PW*.92 ? (PW*.92-hair*(it.prints.length-1))/(w-hair*(it.prints.length-1)) : 1;   // a wide cluster is shrunk to fit its page
    if(sc<1) w=PW*.92;
    // where this cluster starts on the current page: first on a page may sit indented; later ones leave a loose gap
    let start = x===0 ? (rnd(++k)<.4 ? col*(1+Math.floor(rnd(++k)*3)) : 0) : x + col*(.5+Math.floor(rnd(++k)*3)*.5);
    start=Math.round(start/(col/2))*(col/2);
    if(x===0 && start+w>PW) start=0;                  // a fresh page always takes the cluster
    if(start+w>PW){                                     // no room: next page, or the next row
      pg++; x=0; if(pg>=pages){ pg=0; row++; }
      start = rnd(++k)<.4 ? col*(1+Math.floor(rnd(++k)*3)) : 0;
      if(start+w>PW) start=0;
    }
    // sometimes a page row is left with one cluster only, as in the reference
    let cx=pageX(pg)+start, y=row*pitch, h=rh*sc;
    html+=`<div class="jset" data-j="${it.p?it.p.slug:""}" style="left:${cx}px;top:${y+(rh-h)}px;height:${h}px">`+
      it.prints.map((q,j)=>{ const pw=h*q.r, l=it.prints.slice(0,j).reduce((a,z)=>a+h*z.r+hair,0);
        return q.ph ? `<span class="jph" style="left:${l}px;width:${pw}px"></span>`
                    : `<a href="/${it.p.slug}/" data-ji="${q.i}" style="left:${l}px;width:${pw}px"><img loading="lazy" src="${q.src}" alt="${esc(it.title)}"></a>`; }).join("")+
      `<span class="n">${fmtDate(it.date)}</span></div>`;
    x=start+w;
    if(x>col*2.5 && rnd(++k)<.5){ pg++; x=0; if(pg>=pages){ pg=0; row++; } }      // sometimes a page row keeps just one cluster
  });
  const H=(row+1)*pitch;
  const spine = "";
  swap(`<div class="cell" style="grid-column:1/13"><div class="tbox full" style="display:block"><div class="scroll" style="height:100%"><div class="jsheet" style="height:${H}px">${spine}${html}</div></div></div></div>`);
  const real=list.length, foot=it=>setFoot([["1/7",`<span class="dim">Journal</span>`],["7/13",it?`${esc(it.title)}<span class="dim">${it.p&&it.p.role?" · "+esc(it.p.role):""} · ${fmtDate(it.date)}</span>`:`<span class="dim">${real} ${real===1?"entry":"entries"}${JOURNAL_TEST?" · with 20 placeholders":""}</span>`,"right"]]);
  foot(null);
  setTimeout(()=>{ const sets=[...document.querySelectorAll(".jset")];
    sets.forEach((el,n)=>{ el.addEventListener("mouseenter",()=>foot(items[n])); });
    document.querySelectorAll(".jset a").forEach(a=>a.addEventListener("click",()=>{ pendingImg=+a.dataset.ji; }));
  },320);
}
const pad2=n=>String(n).padStart(2,"0");
/* Commissions footer: follows the hovered project, showing its place in the list and its recognition if it has one */
function listFoot(list,q){
  const n=list.indexOf(q)+1;
  setFoot([["7/8",`${pad(n)} / ${pad(list.length)}`],["8/13",q.note?`<span class="acc">${esc(q.note)}</span>`:`<span class="dim">${q.section==="journal"?"Journal":"Selected commissions"}</span>`,"right"]]);
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
    <div class="k">Awards</div><div class="v">${AWARDS.map(([y,a,p])=>`<div>${esc(a)} <span>${esc(p)}, ${y}</span></div>`).join("")}</div>
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
// Touch: the first tap on a hidden header or footer only brings them back
["head","foot"].forEach(id=>$(id).addEventListener("click", e=>{
  const w=$("world");
  if(false){ e.preventDefault(); }
}, true));
$("stage").addEventListener("click", e=>{
  if(canHover) return;
  const w=$("world"); if(!w.classList.contains("quiet")) return;
  const y=e.clientY; if(y<120 || y>innerHeight-70){ peek(3500); }
}, true);

/* ---------- Rendering, routing, input ---------- */
let swapT=null;
function swap(html){
  const st=$("stage"); clearTimeout(swapT); document.removeEventListener("click",pvClick);
  const go=()=>{ st.innerHTML=html; st.classList.remove("fade"); wire(); };
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
  document.querySelectorAll("[data-img]").forEach(b=>b.onclick=()=>{
    const i=+b.dataset.img, S=spreads(state.project);
    state.page=Math.max(0,S.findIndex(s=>s.imgs.includes(i))); state.mode="pages"; renderProject();
  });
}
function step(d){
  if(!bySlug[state.route]||state.mode!=="pages") return;
  const n=spreads(state.project).length; state.page=(state.page+d+n)%n; renderProject();
}
let pendingImg=null;
document.addEventListener("click",e=>{ const a=e.target.closest("#homeImg"); if(a) pendingImg=+a.dataset.img; }, true);
function route(keep){
  document.body.classList.remove("home");
  let h=location.pathname.split("/").filter(Boolean)[0]||"home";
  if(h==="personal") h="commissions";
  if(!["home","commissions","journal","information"].includes(h)&&!bySlug[h]) h="home";
  state.route=h;
  if(h==="home") return renderHome();
  if(h==="commissions"||h==="journal") return renderList(h);
  if(h==="information") return renderInfo();
  if(keep===true && state.project===bySlug[h]) return renderProject();
  state.project=bySlug[h]; state.page=0; state.mode="pages";
  if(pendingImg!==null){ const S=spreads(state.project); state.page=Math.max(0,S.findIndex(x=>x.imgs.includes(pendingImg))); pendingImg=null; }
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
// old #addresses from the prototype still work
if(location.hash.length>1 && location.pathname==="/") history.replaceState(null,"","/"+location.hash.slice(1)+"/");
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
$("stage").innerHTML="";  // the text version of the page (for search engines) gives way to the real one
(document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(()=>route());
