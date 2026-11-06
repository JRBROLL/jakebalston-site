/* =====================================================================
   Jake Balston: site content
   Everything you might want to change lives here: project words, quotes,
   running orders, colours, awards, press, clients, the journal.
   Edit the words between the quotes, keep the commas and brackets.
   ===================================================================== */
/* ---- Projects and journal entries (section: "commissions" or "journal") ----
   cover: which photo opens the project (1 = first). quotes: the architect's words; img pins a quote beside that photo. */
const PROJECTS = [
  {slug:"chatham", title:"Chatham Residence", architect:"Desai Chia", site:"https://www.desaichia.com", place:"Chatham, New York", year:"2025", note:"World Architecture Festival, Finalist 2026", text:"A single-storey house on 80 acres of Columbia County farmland, for a couple starting a new life away from New York City. It sits on the crest of the land with glass facing the forest and the Catskills, under a curving metal roof drawn from the outline of native oak leaves, whose deep overhangs cast shifting, leaf-like shadows.", quotes:[{"q": "Casting shadows that mimic nature.", "by": "Desai Chia", "img": 7}], count:14, section:"commissions"},
  {slug:"osprey-house", title:"Osprey House", architect:"Desai Chia", site:"https://www.desaichia.com", place:"Shelter Island, New York", year:"2023", note:"Architecture MasterPrize, Winner 2024", text:"A family house at the edge of Mashomack Preserve on Shelter Island, named after the ospreys that nest across the island. In the local 'upside-down' tradition, the living spaces sit upstairs facing the marsh and Cedar Island Cove, while charred cypress cladding, close in colour to beach driftwood, lets the house settle quietly into the tree line.", quotes:[{"q": "An architectural threshold at the edge of Mashomack Preserve.", "by": "Desai Chia", "img": 1}, {"q": "To inconspicuously observe nature.", "by": "Desai Chia", "img": 10}], count:24, section:"commissions"},
  {slug:"th-house", title:"TH House", architect:"DEDRAFT", site:"https://dedraft.co.uk", place:"Ditchling, South Downs National Park", year:"2025", note:"Published in Dezeen, 2026", text:"A 1964 modernist house in Ditchling, inside the South Downs National Park, looking over a garden of ponds and mature trees. DEDRAFT added a new heart to the plan and a wing that wraps the garden, staying true to the original language of the house, with bespoke ceramic tiles on a curving entrance wall and Douglas fir lining the rooms.", quotes:[{"q": "True to the original modernist language of the house.", "by": "Grant Straghan, DEDRAFT"}], count:18, section:"commissions"},
  {slug:"grand-street", title:"Grand Street", architect:"Of Possible", site:"https://www.ofpossible.com", place:"Brooklyn, New York", year:"2024", note:"Published in Wallpaper* and ArchDaily", text:"Three homes in Williamsburg, two duplexes and a triplex, stacked in a terracotta-clad building two blocks from the East River. Of Possible paired the neighbourhood's loft-style living with outdoor space for every unit, and gave the back of the building, so often an afterthought in New York, as much care as the street front.", quotes:[{"q": "Loft-style living with outdoor space for everyone.", "by": "Of Possible"}], count:29, section:"commissions"},
  {slug:"deyne-avenue", title:"Deyne Avenue", architect:"Loader Monteith", site:"https://loadermonteith.co.uk", place:"Manchester", year:"2026", note:"Published in Dezeen, 2026", text:"Loader Monteith turned a two-bedroom red-brick bungalow in Prestwich into a four-bedroom family home, all within a remarkably tight footprint. A new angular extension at the back takes its red brick from the streets around it, trimmed in copper and topped with a sedum roof.", quotes:[{"q": "Maximise the space without compromising on architectural ambition.", "by": "Matt Loader, Loader Monteith"}], count:15, section:"commissions"},
  {slug:"bethesda", title:"Bethesda Residence", architect:"Desai Chia", site:"https://www.desaichia.com", place:"Bethesda, Maryland", year:"2025", note:"Future House Award 2026", text:"A new family house on a compact suburban lot minutes from downtown Bethesda, balancing openness with privacy among close neighbours. Crisp fibre cement panels give it a sculptural presence that catches the changing light, while a three-storey faceted light well draws daylight deep into the house.", quotes:[{"q": "A crisp, sculptural facade that captures texture and shifting light throughout the day.", "by": "Desai Chia"}], count:9, section:"commissions"},
  {slug:"cambridge-place", title:"Cambridge Place", architect:"UNAGRU", site:"https://www.unagru.com", place:"Kensington, London", year:"2025", note:"", count:19, section:"commissions"},
  {slug:"hampstead-house", title:"Hampstead House", architect:"Coppin Dockray", site:"https://www.coppindockray.co.uk", place:"Hampstead, London", year:"2022", note:"RIBA London Award 2024", text:"A 1960 house by the modernist architect Trevor Dannatt, a British take on California's Case Study Houses, saved from possible demolition. Coppin Dockray peeled back decades of piecemeal additions, added black steel extensions and new gardens for a growing family, and cut the house's annual carbon emissions by more than half.", quotes:[{"q": "The careful balance between the building's character and form.", "by": "Sandra Coppin, Coppin Dockray"}], count:12, section:"commissions"},
  {slug:"garden-apartments", title:"Garden Apartments", architect:"Of Possible", site:"https://www.ofpossible.com", place:"Brooklyn, New York", year:"2023", note:"", text:"76A Cooper Street is a new five-storey building in Bushwick, Brooklyn, with four apartments. At the back the building steps down in a run of terraces, and each one carries a small garden for the home beside it, so every apartment, however high, lives at garden level. To the street it keeps a sober face of corrugated metal, plain and built to last.", quotes:[{"q": "Each unit is effectively a garden level apartment.", "by": "Of Possible"}], count:4, section:"commissions"},
  {slug:"lalliance", title:"L'Alliance", architect:"Of Possible", site:"https://www.ofpossible.com", place:"Manhattan, New York", year:"2024", note:"", text:"Le Skyroom sits at the very top of L'Alliance New York's Beaux Arts building, a short walk from Central Park. Of Possible's renovation clears the room back to its soaring floor-to-ceiling windows, so the city's daylight falls across white oak floors and bright white walls, a calm, open room held high above Manhattan.", count:5, section:"commissions"},
  {slug:"windermere", title:"Windermere Jetty Museum", architect:"Carmody Groarke", site:"https://carmodygroarke.com", place:"Lake Windermere, Lake District", year:"2022", note:"RIBA National Award 2021", text:"A museum for Lakeland Arts on the eastern shore of Windermere, rehousing an internationally significant collection of boats on the site of the old steamboat museum. Carmody Groarke reworked the Lake District's working buildings into a cluster of copper-clad forms, with galleries, a boatyard and a conservation workshop sitting side by side on the water's edge.", quotes:[{"q": "A connection between people, boats and water.", "by": "Andy Groarke, Carmody Groarke"}, {"q": "You can really hear the knock of the boats onto the jetties.", "by": "Andy Groarke"}], count:18, section:"commissions"},
  {slug:"benjamin-torrens", title:"Benjamin Torrens", architect:"", with:"Benjamin Torrens, musician", role:"Musician", place:"", year:"2026", date:"2026-09-25", note:"", text:"Benjamin Torrens is a musician and a friend. A grey morning on the coast, shot on medium format in black and white for an upcoming release.", quotes:[{"q":"Between the sea and a song yet written.", "by":"Jake Balston", "img":3}], cover:3, pick:[2,0,1], count:3, section:"journal"},
];

/* ---- Running orders: [spread, photo numbers]. F = big right + words left, H = mirror, G = one big photo,
   A = smaller photo on its own, M = magazine page, B/C/D = two photos on a diagonal, P = two the same size. ---- */
const LAYOUTS = {
  "chatham":[["F",1],["B",2,3],["G",4],["D",5,6],["F",7],["H",8],["G",9],["A",10],["C",11,12],["H",13],["F",14]],
  "osprey-house":[["F",1],["H",2],["B",3,4],["G",5],["C",6,7],["P",8,9],["F",10],["C",11,23],["B",12,13],["B",14,15],["H",16],["C",17,18],["C",19,20],["F",21],["H",24]],
  "grand-street":[["F",1],["B",2,3],["C",5,6],["F",7],["D",8,10],["B",9,17],["H",11],["F",13],["F",14],["H",15],["C",19,16],["F",18],["A",20],["H",21],["B",22,23],["F",24],["H",26],["F",27],["D",28,29]],
  "cambridge-place":[["F",1],["B",2,3],["F",4],["C",6,5],["C",7,8],["A",10],["H",11],["B",12,13],["G",14],["C",15,16],["F",17],["D",18,19]],
  "hampstead-house":[["F",1],["B",2,3],["F",4],["C",5,6],["F",8],["D",7,9],["A",10],["C",11,12]],
  "lalliance":[["G",1],["B",2,3],["D",4,5]],
  "benjamin-torrens":[["F",3],["B",1,2]],
  "windermere":[["F",1],["B",2,3],["F",4],["C",5,6],["F",7],["D",8,9],["A",10],["H",11],["B",12,14],["C",13,15],["H",16],["F",17],["H",18]],
};

/* ---- Photos left out of a project ---- */
const DROPS = {"osprey-house":[22], "grand-street":[4,12,25], "cambridge-place":[9]};

/* ---- Each project's Wada colour combination (plate number) ---- */
const PROJECT_COLOUR = {"benjamin-torrens":296,"chatham":190,"osprey-house":243,"th-house":246,"grand-street":126,"deyne-avenue":266,"bethesda":"296b","cambridge-place":214,
  "hampstead-house":310,"garden-apartments":270,"lalliance":151,"windermere":343};

/* ---- Information page ---- */
const AWARDS = [
  ["2026","World Architecture Festival, Finalist","Chatham Residence"],
  ["2026","Architizer A+Awards, Special Mention","Chatham Residence"],
  ["2025","Architizer A+Awards, Jury Winner","Desai Chia"],
  ["2025","Camden Design Awards, Highly Commended","Hampstead House"],
  ["2024","Architecture MasterPrize, Winner","Osprey House"],
  ["2024","Interior Design Best of Year, Honoree","Osprey House"],
  ["2024","RIBA London Award","Hampstead House"],
];

const PRESS = [
  ["Dezeen","Deyne Avenue, TH Residence, Osprey House, Hampstead House"],
  ["Wallpaper*","Chatham Residence, 103 Grand Street, Hampstead House, The Bide"],
  ["Forbes","Osprey House"],["ArchDaily","Osprey House, 103 Grand Street"],["RIBA Journal","Hampstead House"],
];

const BOOKS = [["TASCHEN, Homes for Our Time","The Bide, 2026"],["Benton Buckley, Women of Architecture","Desai Chia, 2026"]];

const CLIENTS = ["Desai Chia Architecture","Coppin Dockray","Of Possible","DeDraft","Loader Monteith","Tim Groom Architects","UNAGRU","PAD Studio"];

/* ---- Photo sizes (filled in when photos are added) ---- */
const DIMS = {"benjamin-torrens":[[2200,1650],[2200,1650],[2200,1650]],"hampstead-house":[[1572,2200],[1572,2200],[1760,2200],[1571,2200],[1571,2200],[1571,2200],[1760,2200],[1571,2200],[1760,2200],[1571,2200],[1571,2200],[1571,2200]],"garden-apartments":[[1571,2200],[1572,2200],[1468,2200],[2200,2200]],"deyne-avenue":[[1467,2200],[1467,2200],[1760,2200],[1760,2200],[1760,2200],[1760,2200],[1760,2200],[1760,2200],[1467,2200],[1467,2200],[1467,2200],[1760,2200],[1760,2200],[1760,2200],[1760,2200]],"cambridge-place":[[1879,2200],[1650,2200],[1649,2200],[1650,2200],[1650,2200],[1650,2200],[1468,2200],[1650,2200],[1571,2200],[2200,1760],[1571,2200],[1467,2200],[1572,2200],[2200,1760],[1467,2200],[1650,2200],[2200,1760],[1572,2200],[1760,2200]],"windermere":[[2200,2200],[2200,2200],[1760,2200],[1760,2200],[1760,2200],[1760,2200],[1760,2200],[1760,2200],[1237,2200],[2200,2200],[1760,2200],[1760,2200],[1760,2200],[1759,2200],[1571,2200],[1571,2200],[1760,2200],[1760,2200]],"bethesda":[[1760,2200],[1761,2200],[2200,1238],[2200,1571],[2200,1571],[1760,2200],[1237,2200],[1760,2200],[1760,2200]],"lalliance":[[2200,1650],[1760,2200],[1760,2200],[2200,1650],[1467,2200]],"chatham":[[1441,2200],[2200,1760],[1468,2200],[1468,2200],[2200,1467],[1468,2200],[1468,2200],[2200,2200],[1468,2200],[1760,2200],[1760,2200],[1760,2200],[1760,2200],[1760,2200]],"osprey-house":[[1650,2200],[1650,2200],[1760,2200],[1468,2200],[2200,1467],[2200,1760],[1761,2200],[1296,2200],[1310,2200],[1760,2200],[1760,2200],[1468,2200],[1761,2200],[1468,2200],[1468,2200],[1468,2200],[1650,2200],[1760,2200],[1761,2200],[1468,2200],[1760,2200],[1760,2200],[1468,2200],[1760,2200]],"grand-street":[[1467,2200],[1760,2200],[1468,2200],[2200,1467],[1760,2200],[1760,2200],[1760,2200],[2200,2200],[1468,2200],[1468,2200],[1760,2200],[1649,2200],[1650,2200],[1760,2200],[1760,2200],[1760,2200],[1468,2200],[1760,2200],[2200,1760],[1467,2200],[2200,1760],[2200,1760],[1650,2200],[1760,2200],[1467,2200],[1468,2200],[2199,2200],[1760,2200],[1438,2200]],"th-house":[[2200,1467],[1760,2200],[1468,2200],[1571,2200],[1760,2200],[1571,2200],[2200,2034],[1760,2200],[1760,2200],[1760,2200],[1760,2200],[1760,2200],[1760,2200],[1571,2200],[2200,1467],[1571,2200],[1761,2200],[2200,1238]]};
