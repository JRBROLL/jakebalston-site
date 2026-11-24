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
  {"slug": "hyll", "title": "HYLL", "architect": "YOUTH", "archLabel": "Interiors", "site": "https://youth.studio/project/hyll/", "credits": [["Architect", "Tim Groom Architects", "https://timgroomarchitects.com"]], "place": "Charingworth, Cotswolds", "year": "2025–ongoing", "note": "", "text": "Hyll is a hotel in Charingworth, near Chipping Campden, in the north Cotswolds: a Grade II-listed manor house and its stone outbuildings, set in sixty acres of meadow with long views across the hills. YOUTH, working with Tim Groom Architects, took the house back rather than adding to it, leaving stone, timber and plaster to carry the rooms, with paintings by contemporary artists hung throughout. An ongoing commission, photographed through the seasons.", "quotes": [{"q": "A space where guests genuinely feel like they have an opportunity to pause.", "by": "Sarah Ramsbottom, Hyll", "img": 2}, {"q": "A response to the rugged natural landscape of the Cotswolds.", "by": "Liam McGroarty, YOUTH", "img": 7}, {"q": "Hyll is not about escape – it is about reconnection.", "by": "Oliver Collinge, YOUTH", "img": 25}], "cover": 1, "count": 27, "section": "commissions", "listBy": "Hyll Hotel", "listYear": "Ongoing"},
  {slug:"windermere", title:"Windermere Jetty Museum", architect:"Carmody Groarke", site:"https://carmodygroarke.com", place:"Lake Windermere, Lake District", year:"2022", note:"RIBA National Award 2021", text:"A museum for Lakeland Arts on the eastern shore of Windermere, rehousing an internationally significant collection of boats on the site of the old steamboat museum. Carmody Groarke reworked the Lake District's working buildings into a cluster of copper-clad forms, with galleries, a boatyard and a conservation workshop sitting side by side on the water's edge.", quotes:[{"q": "A connection between people, boats and water.", "by": "Andy Groarke, Carmody Groarke"}, {"q": "You can really hear the knock of the boats onto the jetties.", "by": "Andy Groarke"}], count:18, section:"commissions"},
  {"slug": "mb", "title": "MB", "architect": "", "role": "", "place": "", "year": "2026", "date": "2026-08-14", "note": "", "text": "My son had just found out what I do for a living, and had one request: photos of him being a rock star. Three frames, thirty seconds, shot on my phone.", "quotes": [], "cover": 3, "printCount": 3, "count": 3, "section": "journal", "coverPos": "center top", "jGap": 1},
  {slug:"benjamin-torrens", title:"Benjamin Torrens", architect:"", with:"Benjamin Torrens, musician", role:"Musician", place:"", year:"2026", date:"2026-09-25", note:"", text:"Benjamin Torrens is a musician and a friend. A grey morning on the coast, shot on medium format in black and white for an upcoming release.", quotes:[{"q":"Between the sea and a song yet written.", "by":"Jake Balston", "img":3}], cover:1, coverAlign:"left", printCount:1, pick:[0,1,2], count:3, section:"journal"},
  {"slug": "josh-lynott", "title": "Josh Lynott", "architect": "", "credits": [["Poet", "Josh Lynott", "https://anotetotherunners.com"]], "role": "Poet and runner", "place": "Love Trails, Gower", "year": "2025", "date": "2025-07-01", "note": "", "text": "Late sun at Love Trails, the running and music festival on the Gower. Josh had brought his sign, a white board that filled over the weekend with notes from runners passing by. We sat beside it and spoke deeply about photography, running and poetry, and about slowing down enough to notice what is true to you: the idea at the heart of his work as a poet and ultrarunner from Melbourne, and of his project A Note to the Runners. Shot on 35mm film.", "quotes": [{"q": "There were many more days we were strangers than friends,", "by": "", "img": 1, "lines": ["There were many", "more days", "we were strangers", "than friends,"]}, {"q": "but the ones we were friends,", "by": "", "img": 4, "lines": ["but the ones", "we were", "friends,"]}, {"q": "mattered the most.", "by": "Jake Balston", "img": 9, "lines": ["mattered", "the most."]}], "cover": 1, "pick": [0, 7, 5], "count": 9, "section": "journal", "printCount": 3, "jRow": true},
  {"slug": "firefly-adventures", "title": "Firefly Adventures", "architect": "", "role": "Whernside, Yorkshire Dales", "place": "Whernside, Yorkshire Dales", "year": "2025", "date": "2025-10-01", "note": "", "text": "Somewhere in the middle of a Firefly Adventures programme, the group conversation and self-reflection step outside and onto a hill. For this group it was Whernside, climbing from the Ribblehead Viaduct into wind and rain that never eased. I followed behind with the camera: hoods up, heads down, the path vanishing into cloud ahead and reappearing at our feet.", "quotes": [{"q": "Sideways rain, cutting wind, biting at the nose, warm smiles, powerful words, carry the weary legs.", "by": "Jake Balston", "img": 10, "lines": ["Sideways rain,", "cutting wind,", "biting at the nose,", "warm smiles,", "powerful words,", "carry the weary legs."]}], "cover": 1, "printCount": 4, "count": 12, "section": "journal", "jPage": true, "jGap": 1.5},
  {"slug": "lulworth-lodge", "title": "Lulworth Lodge", "architect": "", "role": "Lulworth Cove, Dorset", "place": "Lulworth Cove, Dorset", "year": "2025", "date": "2025-04-01", "note": "", "text": "A slow evening exploring Lulworth from Lulworth Lodge, a small hotel built on the site of the village's old watermill, a short walk from the cove. Wandering the hills and the water's edge as the light turned gold, and back down the lane as the day faded.", "quotes": [], "cover": 1, "printCount": 3, "count": 5, "section": "journal", "coverPos": "center bottom", "jGap": 0.35},
  {"slug": "george-baggaley", "title": "George Baggaley", "architect": "", "credits": [["Potter", "George Baggaley", "https://georgebaggaley.art"]], "role": "Potter", "place": "Sheffield", "year": "2022", "date": "2022-07-01", "note": "", "text": "A collaborative morning in George's Sheffield studio, photographing his pots in the light from a single window, with dried flowers from my hometown florist, Little Perth. We talked back and forth about the beauty of well used things, and an inherited stool said it best. A perch from his family's pottery factory, well worn by the generations of potters before him and much loved, with a patina only time can give. George carries that line on in his own way, coiling each vessel by hand from foraged and recycled clay.", "quotes": [{"q": "Slow conversation, slow light, and a stool sat upon by generations.", "by": "Jake Balston", "img": 1}], "cover": 1, "pick": [0, 1, 3], "count": 9, "section": "journal", "printCount": 3, "jPage": true, "jGap": 0},
  {"slug": "scotland", "title": "Scotland", "architect": "", "role": "Ongoing series", "place": "Scotland", "year": "2018–ongoing", "date": "2018-03-01", "note": "", "text": "An ongoing series from trips north since 2018: Skye, the North Coast 500, the Highlands in winter. A handful of selects from a larger body of work, added to as the trips go on.", "quotes": [{"q": "Harsh ridge lines disappear behind soft ceilings.", "by": "Jake Balston", "img": 7}], "cover": 1, "pick": [0, 1, 4], "count": 9, "section": "journal", "printCount": 2, "jGap": 0.4},
  {"slug": "clifton-cathedral", "title": "Clifton Cathedral", "architect": "", "credits": [["Architect", "Percy Thomas Partnership"]], "role": "Bristol", "place": "Clifton, Bristol", "year": "2017", "date": "2017-09-06", "note": "", "text": "Wandering around Clifton, following my feet, I stumbled across the cathedral, tucked away behind the trees. I explored it slowly and alone, the empty holy space blanketed by soft light. Completed by the Percy Thomas Partnership in 1973, it was among the first cathedrals designed around the reforms of the Second Vatican Council, gathering everyone close around the altar.", "quotes": [], "cover": 8, "pick": [0, 9, 11], "printCount": 3, "count": 12, "section": "journal", "jPage": true, "jGap": 1},
  {"slug": "pen-y-fan", "title": "Pen y Fan", "architect": "", "role": "Brecon Beacons", "place": "Pen y Fan, Wales", "year": "2017", "date": "2017-12-01", "note": "", "text": "Corn Du first, then on to Pen y Fan, deep in December snow. The wind, spiteful, swept across the ridge and took the snow with it, lifting it off the slopes and sending it dancing along the mountainside in waves. We followed three figures ahead of us, there and gone again, matchsticks on a white, lightly brushed canvas.", "quotes": [], "cover": 1, "pick": [0, 6, 4], "count": 8, "section": "journal", "printCount": 3, "jRow": true},
];

/* ---- Running orders: [spread, photo numbers]. F = big right + words left, H = mirror, G = one big photo,
   A = smaller photo on its own, M = magazine page, B/C/D = two photos on a diagonal, P = two the same size. ---- */
const LAYOUTS = {
  "hyll":[["G",1],["F",2],["B",3,4],["B",5,6],["H",7],["G",8],["G",9],["C",10,11],["P",12,13],["M",14],["H",15],["C",16,17],["C",18,19],["B",20,21],["G",22],["P",23,24],["F",25],["P",26,27]],
  "chatham":[["F",1],["B",2,3],["G",4],["D",5,6],["F",7],["H",8],["G",9],["A",10],["C",11,12],["H",13],["F",14]],
  "osprey-house":[["F",1],["H",2],["B",3,4],["G",5],["C",6,7],["P",8,9],["F",10],["C",11,23],["B",12,13],["B",14,15],["H",16],["C",17,18],["C",19,20],["F",21],["H",24]],
  "grand-street":[["F",1],["B",2,3],["C",5,6],["F",7],["D",8,10],["B",9,17],["H",11],["F",13],["F",14],["H",15],["C",19,16],["F",18],["A",20],["H",21],["B",22,23],["F",24],["H",26],["F",27],["D",28,29]],
  "cambridge-place":[["F",1],["B",2,3],["F",4],["C",6,5],["C",7,8],["A",10],["H",11],["B",12,13],["G",14],["C",15,16],["F",17],["D",18,19]],
  "hampstead-house":[["F",1],["B",2,3],["F",4],["C",5,6],["F",8],["D",7,9],["A",10],["C",11,12]],
  "lalliance":[["G",1],["B",2,3],["D",4,5]],
  "mb":[["F",1],["P",2,3]],
  "benjamin-torrens":[["F",1],["B",2,3]],
  "clifton-cathedral":[["F",1],["B",2,3],["H",4],["C",5,6],["M",7],["B",8,9],["P",10,11],["F",12]],
  "pen-y-fan":[["F",1],["B",2,3],["H",4],["C",5,6],["F",7],["M",8]],
  "scotland":[["F",1],["B",2,3],["H",4],["C",5,6],["F",7],["B",8,9]],
  "josh-lynott":[["F",1],["B",2,3],["H",4],["C",5,6],["P",7,8],["F",9]],
  "firefly-adventures":[["F",1],["B",2,3],["H",4],["C",5,6],["M",7],["B",8,9],["F",10],["P",11,12]],
  "lulworth-lodge":[["F",1],["B",2,3],["H",4],["M",5]],
  "george-baggaley":[["F",1],["B",2,3],["H",4],["C",5,6],["M",7],["P",8,9]],
  "windermere":[["F",1],["B",2,3],["F",4],["C",5,6],["F",7],["D",8,9],["A",10],["H",11],["B",12,14],["C",13,15],["H",16],["F",17],["H",18]],
};

/* ---- Moving photographs: number → clip at /vid/<slug>-NN.mp4, poster is the still of the same number ---- */
const VIDS = {"hyll":[]};   // clips switched off for now; numbers will be 1, 8, 25

/* ---- Artworks in the photographs: number → [title, artist, artist's site]; credited in the photo descriptions and page data ---- */
const ARTWORKS = {"hyll": {"4": ["A Shiver of the Trees", "Philip Maltman", "https://philipmaltman.com"], "7": ["Gloria", "Lily Fine", "https://lilyfine.com"], "11": ["Waters of Deceit", "Mary West", "https://marywestpaintings.com"], "14": ["She Waits", "Alice Carr", "https://alicecarr.com"], "21": ["Girl in Patterned Shawl", "Shaun Duke", "https://shaunduke.co.uk"]}};

/* ---- Photos left out of a project (their numbers are kept so the others don't move) ---- */
const DROPS = {"osprey-house":[22], "grand-street":[4,12,25], "cambridge-place":[9]};

/* ---- Each project's Wada colour combination (plate number) ---- */
const PROJECT_COLOUR = {"mb":50,"lulworth-lodge":60,"firefly-adventures":94,"clifton-cathedral":104,"pen-y-fan":321,"josh-lynott":52,"scotland":343,"george-baggaley":190,"hyll":234,"benjamin-torrens":296,"chatham":190,"osprey-house":243,"th-house":246,"grand-street":126,"deyne-avenue":266,"bethesda":"296b","cambridge-place":214,
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
const DIMS = {"mb":[[2266,4028],[3024,4032],[3024,4032]],"lulworth-lodge":[[2401,3600],[2401,3600],[2401,3600],[2880,3600],[2401,3600]],"firefly-adventures":[[2401,3600],[2401,3600],[2401,3600],[2401,3600],[2401,3600],[2401,3600],[2401,3600],[2401,3600],[2401,3600],[2880,3600],[2401,3600],[2401,3600]],"clifton-cathedral":[[2400,3600],[2880,3600],[2025,3600],[2880,3600],[2880,3600],[2400,3600],[2880,3600],[2880,3600],[2400,3600],[2880,3600],[2880,3600],[2400,3600]],"pen-y-fan":[[3086,3600],[3086,3600],[3085,3600],[3085,3600],[3085,3600],[3086,3600],[3085,3600],[3085,3600]],"josh-lynott":[[2387,3600],[2387,3600],[2387,3600],[2387,3600],[2387,3600],[2880,3600],[2880,3600],[2880,3600],[2387,3600]],"scotland":[[3600,3600],[3600,3600],[3086,3600],[3600,3600],[3600,3085],[3086,3600],[3600,3600],[3600,3600],[3086,3600]],"george-baggaley":[[5261,6576],[5254,6567],[5232,6540],[5265,6581],[5223,7830],[5203,6504],[5183,7770],[4971,6628],[4086,5108]],"hyll":[[2401,3600],[3600,2571],[2401,3600],[2880,3600],[3600,2401],[3600,2401],[2880,3600],[2880,3600],[3600,2402],[3600,2401],[2401,3600],[2401,3600],[2401,3600],[2880,3600],[2401,3600],[3600,2401],[2401,3600],[2880,3600],[2880,3600],[2401,3600],[2880,3600],[3600,2571],[2401,3600],[2401,3600],[2401,3600],[2401,3600],[2401,3600]],"benjamin-torrens":[[3600,2700],[3600,2700],[3600,2700]],"hampstead-house":[[3817,5343],[3101,4341],[3260,4075],[3632,5085],[3703,5184],[3402,4763],[3424,4280],[3735,5229],[3404,4254],[3290,4606],[3085,4320],[3278,4589]],"garden-apartments":[[2570,3600],[2572,3600],[2402,3600],[3600,3600]],"deyne-avenue":[[2401,3600],[2401,3600],[2880,3600],[2880,3600],[2880,3600],[2880,3600],[2880,3600],[2880,3600],[2401,3600],[2401,3600],[2401,3600],[2880,3600],[2880,3600],[2880,3600],[2880,3600]],"cambridge-place":[[3075,3600],[2700,3600],[2699,3600],[2700,3600],[2700,3600],[2700,3600],[2402,3600],[2700,3600],[1571,2200],[3600,2880],[2571,3600],[2401,3600],[2572,3600],[3600,2880],[2401,3600],[2700,3600],[3600,2880],[2572,3600],[2880,3600]],"windermere":[[3600,3600],[3600,3600],[2880,3600],[2880,3600],[2880,3600],[2880,3600],[2880,3600],[2880,3600],[2025,3600],[3600,3600],[2880,3600],[2880,3600],[2880,3600],[2879,3600],[2571,3600],[2571,3600],[2880,3600],[2880,3600]],"bethesda":[[2880,3600],[2881,3600],[3600,2025],[3600,2571],[3600,2571],[2880,3600],[2025,3600],[2880,3600],[2880,3600]],"lalliance":[[3600,2700],[2880,3600],[2880,3600],[3600,2700],[2400,3600]],"chatham":[[2358,3600],[3600,2880],[2402,3600],[2402,3600],[3600,2401],[2402,3600],[2402,3600],[3600,3600],[2402,3600],[2880,3600],[2880,3600],[2880,3600],[2880,3600],[2880,3600]],"osprey-house":[[2700,3600],[2700,3600],[2880,3600],[2402,3600],[3600,2400],[3600,2880],[2881,3600],[2120,3600],[2144,3600],[2880,3600],[2880,3600],[2402,3600],[2881,3600],[2402,3600],[2402,3600],[2402,3600],[2700,3600],[2880,3600],[2881,3600],[2402,3600],[2880,3600],[1760,2200],[2402,3600],[2880,3600]],"grand-street":[[2400,3600],[2880,3600],[2402,3600],[2200,1467],[2880,3600],[2880,3600],[2880,3600],[3600,3600],[2402,3600],[2402,3600],[2880,3600],[1649,2200],[2700,3600],[2880,3600],[2880,3600],[2880,3600],[2402,3600],[2880,3600],[3600,2880],[2400,3600],[3600,2880],[3600,2880],[2700,3600],[2880,3600],[1467,2200],[2402,3600],[3599,3600],[2880,3600],[2353,3600]],"th-house":[[3600,2400],[2880,3600],[2402,3600],[2571,3600],[2880,3600],[2571,3600],[3600,3328],[2880,3600],[2880,3600],[2880,3600],[2880,3600],[2880,3600],[2880,3600],[2571,3600],[3600,2400],[2571,3600],[2881,3600],[3600,2025]]};

/* ---- Photo descriptions (alt text): read by Google and screen readers, never shown on the page.
   One plain sentence per photo, keyed by project and photo number. ---- */
const ALTS = {
 "mb": {"1": "Black and white phone photograph: a young boy with long hair looks down the lens over an acoustic guitar, playing like a rock star.", "2": "Black and white: the boy throws his head forward over the guitar, hair flying, mid rock-star moment.", "3": "Black and white: the boy pulls a fierce rock-star face, chin up, fingers on the guitar strings."},
 "lulworth-lodge": {"1": "Lulworth Lodge, a white-painted hotel with dormer windows and tall chimneys, beneath a wooded hillside above Lulworth Cove.", "2": "A guest bedroom at Lulworth Lodge: a rattan cabinet, a striped table lamp and dried grasses, a small landscape painting on panelled walls.", "3": "Lulworth Cove in evening light, a single boat on the still water below chalk cliffs and gorse-covered hills.", "4": "Golden evening light on the folded cliffs near Lulworth Cove, birds circling above the sea.", "5": "The lane outside Lulworth Lodge at dusk, its white walls and tall chimneys under a bare tree, the moon above."},
 "firefly-adventures": {"1": "Black and white: a line of walkers on the track below Whernside, the Ribblehead Viaduct and cloud-capped hills behind.", "2": "Black and white: a group of walkers climbs a hillside path above a shallow beck on the way up Whernside.", "3": "Black and white: walkers pause at a dry-stone wall above a waterfall in a steep moorland valley.", "4": "Black and white: a flagstone path leads into thick cloud across the moor, a group of walkers faint ahead.", "5": "Black and white: walkers in waterproofs and rucksacks follow a stone path up into the mist.", "6": "Black and white: a flagstone path winding away across the moor, vanishing into the cloud.", "7": "Black and white: walkers come down a wet path beside a wall and fence on Whernside, cloud filling the valley beside them.", "8": "Black and white: the group shelters behind a dry-stone wall near the top of Whernside in wind and rain.", "9": "Black and white: two hooded walkers descend in the rain, the Ribblehead Viaduct far below in the haze.", "10": "Black and white: a wet path cuts through dark moorland grass, fields and trees fading into the rain beyond.", "11": "Black and white: walkers with rucksacks and poles head down through a field of sheep towards the Ribblehead Viaduct.", "12": "Black and white: a lone tree and a flock of birds in front of the Ribblehead Viaduct under heavy grey cloud."},
 "clifton-cathedral": {"1": "Clifton Cathedral in Bristol, a brutalist cathedral of pink-aggregate concrete by the Percy Thomas Partnership, its spire of concrete fins rising above the entrance steps.", "2": "Detail of Clifton Cathedral's pink aggregate concrete panels, a zinc gutter and concrete spout with a rain chain hanging from it.", "3": "Inside Clifton Cathedral: board-marked concrete walls, an opening to a side chapel and the white altar raised above rows of chairs.", "4": "Board-marked concrete beams and walls meet in a corner of Clifton Cathedral, a hexagonal opening cut into the beam above.", "5": "The sanctuary of Clifton Cathedral beneath a tall concrete wall, the altar, a wooden lectern and a hexagonal lamp hanging overhead.", "6": "Steps up to the altar at Clifton Cathedral, a dark stone font and a slender gold cross against board-marked concrete.", "7": "Wide view across rows of chairs to the altar of Clifton Cathedral, tall concrete walls and a band of windows behind.", "8": "A concrete beam pierced with hexagonal openings crosses the board-marked walls of Clifton Cathedral.", "9": "A tall doorway in a board-marked concrete wall at Clifton Cathedral, soft daylight falling on the plane beyond.", "10": "Rows of rust-red upholstered chairs in the nave of Clifton Cathedral, seen close.", "11": "A hexagonal rooflight above board-marked concrete walls and beams in Clifton Cathedral.", "12": "Looking up into the lantern of Clifton Cathedral, concrete ribs and warm wooden panels converging towards the light."},
 "pen-y-fan": {"1": "A snow-covered hillside in the Brecon Beacons on the way to Pen y Fan, three tiny walkers crossing it under low grey cloud.", "2": "The snow-crusted ridge of Corn Du rising to a point against a pale sky, two small figures near its crest.", "3": "The summit of Corn Du half lost in cloud, frost-covered slopes falling away and a lone walker on the path below.", "4": "Snow-covered ridges of the Brecon Beacons stretching into mist, a pale escarpment catching the light and walkers small on the skyline.", "5": "Wind lifts snow off a ridge near Pen y Fan, spindrift streaming across the slope in soft waves.", "6": "Snow blown across a deep curved bowl beneath the ridge of Pen y Fan, a single figure at the bottom right for scale.", "7": "Three walkers in dark jackets lean into the wind on a snowy ridge near Pen y Fan, spindrift swirling around their legs.", "8": "Rolling snow-covered hills of the Brecon Beacons under a soft grey sky, seen from the ridge on the way down."},
 "josh-lynott": {"1": "Poet and runner Josh Lynott reads on a hay bale beneath his A Note to the Runners board at Love Trails festival, trees and marquees behind.", "2": "Josh Lynott signs a copy of his book A Note to the Runners, a handwritten message on the title page.", "3": "Josh Lynott walks across the festival field towards his A Note to the Runners board, seen from behind.", "4": "Josh Lynott reads a book on a hay bale in front of his A Note to the Runners board, its surface filled with messages from runners.", "5": "Over the shoulder: Josh Lynott reads a page of poetry, rings and festival wristbands on his wrist.", "6": "Josh Lynott sits on a hay bale beneath his A Note to the Runners board, the board covered in handwritten notes.", "7": "Close view of hands holding open a book of poems, a page lifting in the sunlight above the grass.", "8": "Portrait of Josh Lynott smiling in a cap and black T-shirt, the handwritten notes of his A Note to the Runners board behind him.", "9": "Josh Lynott's A Note to the Runners board in a festival field, its centre reading: everyone wants to know how far I ran but not how much fun I had."},
 "scotland": {"1": "Black and white: a flock of birds wheeling over a sea cliff on Scotland's north coast.", "2": "Black and white: a white cottage beneath a crescent moon and telegraph wires on the north coast of Scotland.", "3": "A lone stone hut on a ridge of rust-coloured moorland on the Isle of Skye, under a clear evening sky.", "4": "Black and white: a snow-dusted Highland mountain framed by the dark edge of a car window.", "5": "Black and white: a Highland road running into fog between pines, snow on the verges.", "6": "Snow on a Highland mountain catching the last pink light, the valley below already in shadow.", "7": "Black and white: a snow-covered peak above dark forest, seen past a blurred hand in the foreground.", "8": "Black and white: a small white building on the shore of a Scottish loch beneath low hills.", "9": "Black and white: a sea loch and distant mountains under heavy cloud in the west of Scotland."},
 "george-baggaley": {"1": "A dark vessel by George Baggaley swelling and leaning in curves like a body, small handles at the neck, beside a sprig of pale leaves.", "2": "A tall red clay vessel by George Baggaley, its coiled walls rippling in uneven bands, a dried brown leaf lying beside it.", "3": "Two coil-built vessels in dark foraged clay by George Baggaley, one tall and one squat, with a sprig of dried flowers on a linen shelf.", "4": "A large red clay vessel by George Baggaley, rounded and asymmetric, with tiny loop handles at its rim, against a linen backdrop.", "5": "A slender dark vessel by George Baggaley twisting as it rises, holding dried white flowers, with tiny handles on its sides.", "6": "A stacked, undulating vessel in mottled grey-brown clay by George Baggaley, beside a single dried stem set in a stone.", "7": "A tall, dark cylindrical vessel by George Baggaley with small handles near the top, beside a stem of dried white flowers.", "8": "George Baggaley's studio: red clay vessels on and around a wooden stool before a linen backdrop, a patterned rug underfoot and pieces on plinths.", "9": "Black and white portrait of the potter George Baggaley seated in his studio, coil-built vessels on plinths behind him."},
 "hyll": {"1": "Front of Hyll, a Grade II-listed Cotswold stone manor house in Charingworth, with ivy, mullioned windows and the hotel's name beside the oak door.", "2": "View from the gardens at Hyll across lavender and grasses to the north Cotswold hills, a gravel path running down towards the fields.", "3": "Boot room at Hyll: waxed jackets on wall hooks, wellington boots beneath an upholstered bench, a framed print and red vase on the shelf above.", "4": "A Shiver of the Trees by Philip Maltman hangs above leather chairs and a candlelit side table in a lounge at Hyll.", "5": "Guest bedroom at Hyll: deep brown walls, a low wide bed in dark linen, wall lights and full-length curtains at a small window, interiors by YOUTH.", "6": "Writing desk with a leaning mirror and lamp in a dark brown guest bedroom at Hyll, the end of the bed in soft focus, interiors by YOUTH.", "7": "Gloria by Lily Fine hangs in a dim hallway at Hyll as a guest passes in soft focus.", "8": "A guest writes a card at a dark timber desk in a bedroom at Hyll, a mirror propped against the wall in front.", "9": "Bedroom suite at Hyll under exposed timber beams, with a sitting area of leather chairs and a low table beyond the bed, interiors by YOUTH.", "10": "Sitting area in a guest suite at Hyll: a low sofa beneath timber beams, a ceramic lamp, dried stems in a dark vase and a low oak table, interiors by YOUTH.", "11": "Waters of Deceit by Mary West hangs above a green sofa with striped cushions, between two white table lamps, in a lounge at Hyll.", "12": "A guest reads in an armchair in a bedroom at Hyll, dried flowers in a dark vase beside her, under the slope of the roof.", "13": "A hand draws back a heavy linen curtain in a guest bedroom at Hyll, the cloth catching the window light.", "14": "She Waits by Alice Carr hangs on a plain wall beside a carved stone fireplace at Hyll, a clay vessel on the mantel.", "15": "Attic bedroom at Hyll beneath exposed oak beams, a guest reading on the bed beside a small stone-mullioned window.", "16": "Pale guest bedroom at Hyll: a dark scalloped desk with a mirror and lamp, a sculptural stool and the corner of the bed.", "17": "A framed print of stacked vessel shapes on panelled walls above a linen sofa with patterned cushions, in a lounge at Hyll.", "18": "Bathroom under the eaves at Hyll: a tiled bath, a timber beam overhead and a lit walk-in shower behind dark-framed glass, interiors by YOUTH.", "19": "Dried flowers in a black ceramic pot on the edge of a bath at Hyll, afternoon light falling across plaster walls.", "20": "A guest walks a vaulted corridor at Hyll, wall lights leading to a plant and a dark urn beneath a painting at the far end, interiors by YOUTH.", "21": "Girl in Patterned Shawl by Shaun Duke hangs on a plastered wall at Hyll, a trailing plant in the deep window reveal beside it.", "22": "Garden front of Hyll, the stone manor and its gables seen down a lavender-lined path across the lawn, pines behind.", "23": "Courtyard terrace at Hyll set with a long outdoor dining table, ivy over the Cotswold stone walls and a lawn in front.", "24": "Hands raised among long grasses in a meadow at Hyll, holding a dried seed head against the trees.", "25": "Two guests cycle up a meadow at Hyll at dusk, a lone oak on the skyline behind them.", "26": "A guest walks through tall summer grasses in the meadows at Hyll, in soft focus against the field.", "27": "A standing stone known as Bad Boy in the meadow at Hyll, woodland and the Cotswold hills fading into evening haze beyond."},
 "osprey-house": {
  "1": "Osprey House glowing at dusk behind autumn trees, reflected in a tidal pond in the salt marsh of Mashomack Preserve, Shelter Island, by Desai Chia Architecture.",
  "2": "Corner of Osprey House, its upper terrace and glass balustrade cantilevered over marsh grasses, clad in charred cypress under a standing-seam metal roof.",
  "3": "Osprey House from the gravel drive among autumn oaks, its raised living floor and angled roofline turned towards Cedar Island Cove.",
  "4": "Kitchen with an angled grey island beneath an exposed timber-rafter ceiling, white oak floor, Osprey House by Desai Chia Architecture.",
  "5": "Open kitchen under a ribbed timber ceiling, a long sculptural island set against a dark wall, with views out at either end.",
  "6": "Covered upper terrace with a woven lounge chair, the glass balustrade framing trees, marsh and Cedar Island Cove beyond.",
  "7": "Close detail of charred cypress cladding folding into an angled soffit, the grain silvered like driftwood.",
  "8": "Tall white hallway with oak floor, a glazed door at the far end opening onto the trees.",
  "9": "Quiet white bedroom corner with a tall doorway, built-in storage and oak floor.",
  "10": "Osprey House almost hidden in the autumn tree line across the water of Cedar Island Cove, Shelter Island.",
  "11": "Osprey House glimpsed through windswept oaks and coastal planting, only its roofline showing above the scrub.",
  "12": "Osprey House from the shell beach, its two-storey charred cypress form and external stair set among the trees.",
  "13": "Corner glazing and upper terrace of Osprey House among autumn foliage, the cladding weathered to driftwood grey.",
  "14": "Entrance side of Osprey House, the charred cypress upper floor hovering over a recessed dark ground floor and gravel drive, water beyond.",
  "15": "Living space beneath a vaulted timber-rafter ceiling, sliding glass walls opening onto the terrace above the cove.",
  "16": "View along the kitchen and dining space under the vaulted rafter ceiling, a narrow slot window at the far end.",
  "17": "Dining table with black chairs against grey-washed timber panelling, a window onto the marsh and water.",
  "18": "Dining area and living room under a pitched timber ceiling, corner glazing looking out over the cove.",
  "19": "Living room with a corner fireplace and floor-to-ceiling windows looking through the trees to the marsh and Cedar Island Cove.",
  "20": "Full-height slot window framing autumn trees and water at the end of a white living space.",
  "21": "Oak staircase rising past a charred-timber wall, a slender steel handrail cutting across it.",
  "23": "Fireplace column and seating beneath the pitched rafters, glazing opening onto the terrace and water.",
  "24": "Covered entrance beneath the cantilevered charred cypress upper floor, warm light from a timber-lined doorway."
 },
 "chatham": {
  "1": "Chatham Residence seen low through a beech and oak forest on its hilltop in Columbia County, New York, behind an old dry stone wall.",
  "2": "Chatham Residence by Desai Chia Architecture on the crest of a grassy rise, its curving corrugated metal roof sweeping out over full-height glass.",
  "3": "Long glazed gallery with pale oak floor and dark steel window frames, the forest just beyond the glass.",
  "4": "Quiet white corridor ending in a tall window that frames a green lawn.",
  "5": "Kitchen of pale oak joinery with a stone-topped island and twin taps, a suspended white fireplace beyond.",
  "6": "Living room edge where floor-to-ceiling glass meets white walls and oak floors, the meadow outside.",
  "7": "Suspended white fireplace hanging in a glazed living space, sliding walls open onto the woodland.",
  "8": "Marble dining table with timber chairs under a looping sculptural pendant, glass walls open to the forest and lawn.",
  "9": "Mature beech and oak trunks rising from fresh grass at the forest edge around Chatham Residence.",
  "10": "The curved metal roof of Chatham Residence cinching inward like the outline of an oak leaf, set against spring trees.",
  "11": "Deep curving roof overhang of Chatham Residence sheltering a glazed living room, a fire pit on the lawn in front.",
  "12": "Under the dark timber soffit of the curving roof, a stone terrace with ferns and a circular opening to the sky.",
  "13": "From beneath a slender column and overhang, stepping stones climbing a grassy bank to the guest house of Chatham Residence.",
  "14": "Two pale gabled outbuildings on the Chatham estate half lost in morning mist among tall trees."
 },
 "th-house": {
  "1": "TH House, a 1964 modernist house in Ditchling in the South Downs National Park, low and red behind a garden pond and lush planting, renovated by DEDRAFT.",
  "2": "Long low elevation of TH House with timber screens and a green roof, a curving gravel path and stone bench in the garden.",
  "3": "Glazed timber-framed entrance of TH House set in deep planting, corten edging and gravel.",
  "4": "Garden wing of TH House with a shallow-pitched roof and Douglas fir fins, white gaura and grasses in front.",
  "5": "Curving Douglas fir wall and ribbed timber ceiling in a glazed corridor, terrazzo floor underfoot.",
  "6": "Narrow timber-lined corridor with dark tiled floor and fir ceiling joists, light at the far end.",
  "7": "Home studio with a long timber desk under exposed fir joists, windows onto the garden and paintings propped against the wall.",
  "8": "Glazed timber corridor along the garden wing, a planted window ledge and views onto the meadow planting.",
  "9": "View through a timber doorway into the white kitchen with terrazzo floor and burgundy stools.",
  "10": "New garden wing clad in dark glazed ceramic tiles beneath a great oak, red-framed windows looking out.",
  "11": "Brick-paved path beneath a timber pergola leading through grasses to the entrance of TH House.",
  "12": "Entrance porch lined in Douglas fir beside a wall of bespoke dark glazed ceramic tiles, a carved timber door handle.",
  "13": "Original open-tread spiral staircase rising in front of a tall gridded window and brick wall.",
  "14": "Living room with timber-lined walls and ceiling, a stove, and a wall of glazing onto the garden, original 1960s character intact.",
  "15": "Long living room of TH House with a deep green sofa, an Eames lounge chair and a stove, fir-boarded ceiling and clerestory windows.",
  "16": "Looking out through tall dark window frames to the courtyard garden, stone bench and red-brick wing.",
  "17": "TH House at dusk under a great oak, warm light in the long low windows, grasses sweeping across the lawn.",
  "18": "TH House at dusk across the garden, the red-brick wings and new timber-clad upper room glowing behind deep borders."
 },
 "grand-street": {
  "1": "103 Grand Street in Williamsburg, Brooklyn, its red-brick street front and fire escapes framed by street trees, by Of Possible.",
  "2": "Red-brick street elevation of 103 Grand Street, Williamsburg, rebuilt with the building's original brick, a new dark steel shopfront at street level.",
  "3": "Dark steel storefront of 103 Grand Street with planted window boxes along the Brooklyn sidewalk.",
  "5": "Rear façade of 103 Grand Street clad in white fluted terracotta tiles, stepping back in terraces with tall black-framed windows.",
  "6": "Close view of the rear façade's matte white terracotta stepping up against a pale sky, Williamsburg, Brooklyn.",
  "7": "Double-height living room with tall timber windows, full-length linen curtains and a paper lantern, pine floor.",
  "8": "Tall plastered room lit from a full-height timber window, a white wire chair in the corner.",
  "9": "Exposed timber joists meeting a plaster wall and reclaimed brick in a 103 Grand Street loft.",
  "10": "Kitchen with a stone-topped timber island and brass tap, glazed doors opening to a planted terrace.",
  "11": "Loft room with exposed joists, a reclaimed brick wall and a large paper lantern hanging over pine floorboards.",
  "13": "Stone-topped kitchen island in front of a reclaimed brick wall and timber-lined window.",
  "14": "Sheer linen curtain falling from a pine-boarded ceiling to the floor, soft daylight behind.",
  "15": "Reclaimed brick wall punched with timber-framed windows, a single grey chair and timber stool on pine boards.",
  "16": "Double-height room with a plaster wall, brick and deep timber windows under exposed joists.",
  "17": "Quiet corner with a grey chair, a timber side table and a paper lantern against warm plaster.",
  "18": "Kitchen of warm timber joinery with a marble-topped island and brass tap.",
  "19": "Two grey chairs and a carved timber stool on wide pine floorboards, seen from above.",
  "20": "Full-height timber window wall with sheer curtains looking onto a planted terrace, a wire chair beside it.",
  "21": "Timber kitchen with a marble splashback and island, a curtained window and stair beyond.",
  "22": "Marble-topped island and full-height timber cabinetry in the kitchen of a 103 Grand Street home.",
  "23": "Double-height plastered room with a paper lantern, timber window bays and exposed joists.",
  "24": "White corridor with timber door frames leading to a tall window at the end.",
  "26": "Deep-set timber window in a reclaimed brick wall looking out over Williamsburg's street trees.",
  "27": "Open kitchen with timber cabinetry, open shelving and white stools against a reclaimed brick wall.",
  "28": "A single grey chair and timber stool against a softly lit plaster wall on pine floorboards.",
  "29": "Shadow of a figure falling across a plaster wall beside a grey chair and timber stool, pine floor."
 },
 "deyne-avenue": {
  "1": "Deyne Avenue in Prestwich, Manchester: a red-brick bungalow extended by Loader Monteith with a green copper entrance and dark dormers behind a cottage garden.",
  "2": "Front of the Deyne Avenue house with its green-toned copper entrance porch, red brick and clay roof tiles, new dark dormers above.",
  "3": "Side view of the Deyne Avenue extension, a green copper-framed box and a dark angular dormer rising above the garden.",
  "4": "View from the hall through a white opening into the kitchen and garden room, pale oak floors and timber shelving.",
  "5": "Garden room in the new rear extension with green velvet sofas, a pitched timber ceiling and sliding doors to the garden.",
  "6": "Living room opening into the kitchen through a deep plywood-lined hatch with shelving, exposed timber rafters above.",
  "7": "Kitchen glimpsed through a thick white doorway, a range cooker and kettle beneath a timber shelf.",
  "8": "Dining nook with a timber table and teal bench under a pendant light, framed by white walls.",
  "9": "Upstairs landing study with built-in plywood desk, an orange folding chair and a window onto the hedge.",
  "10": "Narrow white stair with plywood treads climbing to the new upper floor beneath the dormer roof.",
  "11": "Plywood stair rising under a sloping ceiling, a timber handrail set into the wall.",
  "12": "Pink-plastered bathroom under the eaves with a walk-in shower, round basin and black fittings.",
  "13": "Bedroom in the roof with a small square window and a wide view of trees at dusk, sliding door to a pink bathroom.",
  "14": "The same eaves bedroom with the blind half drawn, soft evening light on the pink floor.",
  "15": "Late sun falling across the kitchen splashback, a stainless steel range cooker and timber shelf above."
 },
 "bethesda": {
  "1": "Bethesda Residence by Desai Chia Architecture seen from the garden, its grey fibre cement form set among mature trees and neighbouring houses in Bethesda, Maryland.",
  "2": "Street front of Bethesda Residence: a crisp grey fibre cement façade with a projecting framed window above the garage and a young tree by the entrance.",
  "3": "Sculptural white stair enclosure and built-in cabinetry rising through the light-filled ground floor.",
  "4": "Dining table with dark chairs under a linear pendant and exposed timber joists, the faceted white stair volume behind.",
  "5": "Kitchen with a dark island and stools, white stone splashback and exposed timber ceiling, sliding glass doors to the garden.",
  "6": "Living space opening to the garden beneath timber joists, white angled walls of the stair and light well alongside.",
  "7": "Looking up into the three-storey faceted light well, daylight falling down its angled white walls.",
  "8": "Doorway into a pale stone bathroom with a freestanding tub, timber joinery in the foreground.",
  "9": "Corner of Bethesda Residence with its faceted fibre cement massing, a framed upper window and planted front garden."
 },
 "cambridge-place": {
  "1": "Cambridge Place in Kensington, London: a white stucco-fronted Victorian house behind black railings and clipped bay trees, renovated by UNAGRU.",
  "2": "Drawing room corner with a ponytail palm, a curved white armchair and a seascape above a built-in niche of pale vases.",
  "3": "Drawing room with a marble fireplace and gilt mirror, cream sofas facing across a Persian rug on herringbone oak.",
  "4": "Fireside corner with a carved marble mantel, a cream armchair and table lamp, soft light through linen curtains.",
  "5": "Panelled double doors open onto the hall and a curving Victorian staircase with turned white balusters.",
  "6": "The hall and staircase glimpsed through a half-open panelled door, herringbone oak floor in the foreground.",
  "7": "Looking up the curving mahogany handrail and white balusters of the original staircase.",
  "8": "Flush built-in wardrobes beside a full-length linen curtain in a quiet bedroom.",
  "10": "Lower-ground kitchen with full-height pale cabinetry, dark timber island and limestone floor, a sunlit painting in the hall.",
  "11": "Kitchen seen through a wide pocket door, a concrete pendant over the timber island.",
  "12": "View through the kitchen to the dining room and the bright garden courtyard beyond.",
  "13": "Long view from the kitchen through to the dining table and courtyard glazing at the back of the house.",
  "14": "Dining table with oxblood leather chairs beside a tall plant, a doorway to the stair beyond.",
  "15": "Dark timber kitchen units and stone worktop beneath pale wall cabinets, a slate-grey splashback.",
  "16": "A single oxblood leather chair at the dining table, pocket doors opening to the hall and stair.",
  "17": "Dining room with oxblood leather chairs around a long dark table, a wall of glass opening to the courtyard garden.",
  "18": "Dining table beside a black-framed glass wall, the planted courtyard and outdoor seating beyond.",
  "19": "Courtyard garden with white-painted brick walls, trailing ivy, a cushioned bench and potted plants beside a black-framed opening."
 },
 "hampstead-house": {
  "1": "Hampstead House, Trevor Dannatt's 1960 house in Hampstead, London, with Coppin Dockray's black steel upper extension above pale brick and timber windows.",
  "2": "Black steel extension with deep folded fins and timber-framed windows, set against the neighbouring Victorian brick and chimney.",
  "3": "Corner of the black steel extension, its folded panels and timber window framing the garden trees.",
  "4": "Original timber staircase rising beside pale brick walls and a glazed timber door.",
  "5": "Oak joinery with carved drawer fronts set against pale painted brickwork.",
  "6": "Close detail of the oak panelling and shadow gaps in the joinery.",
  "7": "Pale brick wall meeting a slatted timber ceiling, daylight washing down from a rooflight.",
  "8": "Kitchen and study with oak joinery, a slatted timber ceiling and linen curtains.",
  "9": "Long galley kitchen with oak cabinetry, stone worktop and timber-slatted ceiling leading to a sitting area and garden window.",
  "10": "Garden side of Hampstead House with a white outdoor fireplace, pale brick chimney and standing-seam roof.",
  "11": "Courtyard with a yellow table and chairs, the black steel extension and timber-framed glazing glowing at dusk.",
  "12": "Black steel extension cantilevering over warm timber-framed windows lit from within."
 },
 "garden-apartments": {
  "1": "76A Cooper Street in Bushwick, Brooklyn: Of Possible's five-storey building in dark corrugated metal among clapboard row houses and autumn street trees.",
  "2": "The dark corrugated metal front of 76A Cooper Street glimpsed through autumn leaves, warm light in its tall windows.",
  "3": "Street elevation of 76A Cooper Street, a sober dark metal façade with paired windows between pale clapboard neighbours.",
  "4": "Upper floors of 76A Cooper Street, paired windows set into dark corrugated metal against bare winter branches."
 },
 "lalliance": {
  "1": "Le Skyroom at L'Alliance New York, renovated by Of Possible: a calm white room with pale oak floors and a freestanding white wall.",
  "2": "White freestanding wall and pale oak floor in Le Skyroom, a cylindrical duct above.",
  "3": "Corner of Le Skyroom where white walls meet under a deep ceiling reveal, oak floor in soft daylight.",
  "4": "Le Skyroom's open floor running to slanted floor-to-ceiling windows looking out over Manhattan.",
  "5": "Slanted floor-to-ceiling glazing of Le Skyroom framing Manhattan towers above a white wall."
 },
 "windermere": {
  "1": "Windermere Jetty Museum by Carmody Groarke on the shore of Lake Windermere in the Lake District, its dark pitched roofs rising above a green bank.",
  "2": "Entrance to Windermere Jetty Museum, a timber-lined glazed foyer beneath a dark copper-clad gable.",
  "3": "Deep overhanging eaves of the copper-clad museum buildings sheltering a glazed corner.",
  "4": "Gable end of a copper-clad museum building with a tall glazed opening behind lakeside reeds.",
  "5": "Sharp pitched profiles of the copper-clad buildings at Windermere Jetty against a grey Lakeland sky.",
  "6": "Copper-clad gable of the museum with a deep timber-lined doorway, gorse and boulders in the foreground.",
  "7": "Timber-lined opening through a copper-clad building framing a boat and the lake beyond.",
  "8": "Tall sliding glass doors in the weathered copper cladding above a rough concrete plinth, wet from rain.",
  "9": "Two traditional wooden rowing boats drawn up beside a copper-clad wall on the gravel shore.",
  "10": "A classic launch passing a small wooded island on misty Lake Windermere.",
  "11": "Copper-clad boathouse at the water's edge with a varnished steam launch moored at the jetty.",
  "12": "Looking out from the timber-lined wet dock to a steam launch moored on Windermere.",
  "13": "Inside the wet dock, a varnished launch afloat beside timber walkways, the lake through a tall opening.",
  "14": "Timber roof boarding and steel beams in the boathouse, rigging lines catching the light.",
  "15": "Timber-lined gallery with an industrial pendant and steel mesh balustrade above the wet dock.",
  "16": "A wooden sailing dinghy moored in the museum's wet dock beneath timber galleries.",
  "17": "An old timber boathouse beside a curving pool of water under bare trees at Windermere Jetty.",
  "18": "The dark copper-clad buildings of Windermere Jetty Museum seen across the rippling lake."
 },
 "benjamin-torrens": {
  "1": "Benjamin Torrens on the coast beside a weathered wooden cross, looking out to sea, black and white.",
  "2": "Black and white portrait of musician Benjamin Torrens standing on rocks by the sea on a grey morning.",
  "3": "Benjamin Torrens throwing a stone into the sea from the rocks, black and white medium format photograph."
 }
};
