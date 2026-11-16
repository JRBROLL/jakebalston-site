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

/* ---- Photo descriptions (alt text): read by Google and screen readers, never shown on the page.
   One plain sentence per photo, keyed by project and photo number. ---- */
const ALTS = {
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
  "1": "Black and white portrait of musician Benjamin Torrens standing on rocks by the sea on a grey morning.",
  "2": "Benjamin Torrens throwing a stone into the sea from the rocks, black and white medium format photograph.",
  "3": "Benjamin Torrens on the coast beside a weathered wooden cross, looking out to sea, black and white."
 }
};
