# The Firefly: Technical Notes

Working reference for the Firefly (registry **AV92-642-92S**), the Arctonian ship in *Distant Travels* (v0.8).

**Tags**
- **[CANON]** comes from the game scripts (file:line).
- **[DERIVED]** is math built on canon.
- **[PROPOSED]** is our own design choice, made to fit canon plus real physics.

Script refs are relative to the unpacked archive (`rpa_out/`, extracted from `DistantTravels-0.8-win/game/archive.rpa`).

---

## 1. Identity & history [CANON]

- "A state of the art explorative spaceship… Seemingly capable of exploration without limits such as running out of supplies or fuel." (`screens/glossary.rpy`, Firefly entry)
- Registry: "Commander of AV92-642-92S 'the Firefly'" (`memories/Mike2.rpy:276`)
- **Name:** "The first prototype… used combustion engines. It used to light up when it took off, just like a firefly in night." (`chapters/chapter1.rpy:1999-2000`)
- **Rebuilt many times:** "As our technology has advanced, she's been rebuilt… Rising from the ashes…" (`chapter1.rpy:2005-2010`). Some parts were kept "as to preserve her history. And personality" (`chapter2.rpy:502-503`). The crew calls her "the Firebird".
- Older than John: "She's been around since before I was born, and she'll probably outlast me." (`chapter2.rpy`, John's tour)
- **Political status:** the Firefly crew leads the AAF (Arctos Armed Forces). Each crew is its own cell. Because of the Firefly's role in the War of Aggression, the crew "more or less has the right to act as their own nation" and holds "about 20 percent" of the world-council vote, the second-largest bloc after the Core chairmen. (`chapter4mike.rpy:2229-2234`, `1490-1492`)
- Previous commander: Watt (Mike1/Mike2 memories).

## 2. Shape: the hologram [CANON art + interpretation]

The source art is `images/objects/hologramship_*.png`, shown during John's tour (`chapter2.rpy:463-637`) and Geralt's safety briefing (`chapter4mike.rpy:1159-1179`). It's a side view with the **bow on the right**: John points at "the front of the ship. Almost where the eyes would be, were it an actual firebird" while the right-hand "top" zone is highlighted (`chapter2.rpy:555-557`).

```
        dorsal tower (chevrons)
             ___/^^\___
  ______ ___/          \______________ ____         ________
 |======|    MAIN BLOCK (mid zone)      \__\_______/  HEAD   \
 |======|  [ folded wing / sponson >>>>>>> ]         |  BRIDGE |>
 |======|___\____________________________/___ ______| (eyes)  /
  twin aft     \___ belly / keel (low zone) ___  \__/\________/
  "cannon" pods          deepest point ↓        \/  ventral hook
```

| Feature | Location | Reading |
|---|---|---|
| Rounded head with a wraparound window band | bow (right) | **Bridge**, "where the eyes would be"; **medical** is next to it |
| Dorsal tower with chevrons, rounded top | above mid-body | **Observation deck**, "a room just above engineering", "circular room with large windows" (`chapter3.rpy:1879`) |
| Central block (the "middle" highlight) | mid-body | **Engineering** ("middle of the ship, just behind the wings"), the core, main habitat |
| Long angular sponson with windows and two round ports | along the flank | **The wings, folded** like a resting bird's |
| Two big stacked cylinders | stern (left) | Most likely the **gravitational cannons** ("what looks almost like large cannons", `chapter2.rpy:511`). They're the only cannon-like shapes on the art. |
| Belly bulge, deepest under mid-body | keel | Lower deck: gym, showers, mess. Ends in a **ventral hook** near the bow. |

**Caveat:** the dev reuses the three highlight zones loosely. John highlights "middle" for engineering, but Geralt highlights "bottom" for it. "Top" is used for the cannons, the bridge *and* the observation deck. So treat the zones as rough regions.

**Vertical stack at mid-ship [PROPOSED, consistent with canon]:**
- observation deck (tower)
- engineering (main block)
- a deep shaft through the belly ("a hatch on the floor… a ladder that goes down a fairly deep tunnel", `chapter4mike.rpy:2729`)
- the ventral airlock used for asteroid EVAs

## 3. Layout & interior [CANON]

- **3 floors**, **2 sets of stairs**, plus maintenance ladders (`chapter3.rpy:1990`).
- **Elevator:** voice-addressed. Say a place, or a person's name ("To Bruce"), unless they're set to private. It also shows bookings and duty rosters. (`chapter3.rpy:1604-1610`, `1678`)
- **Rooms:**
  - bridge (meetings and emergencies, "usually not used very much")
  - navigation deck (busy; Mike's usual post)
  - medical bay (several beds, monitors, research cabinets, a safe)
  - engineering (blueprint tables, workbench, "soft humming of all the engines", a floor hatch to the asteroid airlock)
  - observation deck
  - security (doubles as the **emergency shelter**; weapon lockers, ship-diagnostics display)
  - gym (with bigger showers), recreation room (book ahead), greenhouse (Bruce)
  - canteen/mess (no set mealtimes, rotating cooks, booze for special occasions)
  - cargo hold, plus an "extra cargo hold" (Mike's shooting range and zero-g space)
  - server hall (the player's job), locker room, showers, brig cell
- **Cabins:** moderate size, with a window and a small bathroom. They're "essentially a hologram": furniture rearranges itself and can "feel and act" like anything. Crew give their cabins custom names.
- **AR beach:** a beach and ocean simulation that compresses perceived space by about **10:1**. "We wouldn't have the space for this on the Firefly." (`chapter4mike.rpy:4278-4279`)
- **Systems:**
  - artificial gravity, adjustable per person
  - shields and weapons (automatic, log-reviewed by Geralt, `chapter4mike.rpy:1214`)
  - anti-specter "safeguards" (`chapter3.rpy:5637`)
  - wristband "navigators"
  - a secure channel
  - a live emergency line to Arctos while under way (callsign "Shield")
- **Shuttle:** cloaked, pressurized, no combustion, launches straight from a field. Docks through an airlock with a "thunk".
- **Emergency rules (Geralt):** go to security first, your cabin second. "If the ship stops… all hands on deck", everyone goes to engineering. No smoking and no open fire: "if it does [catch fire], there's no running away." There's no way to throw someone out the airlock.

## 4. Crew [CANON]

The chain of command, in order:
- Mike, Commander
- Charles, doctor and scientist
- Bruce, Lt. Knight (greenhouse and cooking)
- Geralt, Sgt. Stonebadge (security and strategy)
- Shawn, crewman
- Max, navigator

Others aboard:
- John Maddox, chief engineer, now the only engineer
- Frank, shipkeeper (civilian, Civil Defense)
- Rex, researcher (civilian, assigned by the government)
- "A few others" who stay aboard

Canon describes both "a large ship" and "a ship with such a small crew". Rex says most of the crew were "selected by the Firefly" (`chapter4mike.rpy:176`), which is ambiguous: it could mean the crew organisation or the ship itself.

## 5. Propulsion & power [CANON]

- No combustion. **Extragravitational engines** that use extradimensional gravitational energy: "Technically, I'd say it never flies. It falls, upwards." It can fall "in any direction… including the vacuum in space." (`chapter2.rpy:930-990`)
- **Fuel cycle** (`chapter2.rpy:505-528`):
  1. Gravitational cannons grab asteroids ("large magnets, but for anything we want to grab").
  2. Common minerals go through "something similar to fission" to "force a miniature black hole open".
  3. The black hole is fed, and they "harness extradimensional energy".
- **Charles's mechanism:** feed matter into a spinning black hole; it splits in two inside the **ergosphere**, the spin slows, and the energy is harnessed "just like in nuclear power" (`chapter2.rpy:990-1009`). This is the real **Penrose process**.
- "We're quite limited in the extradimensional energy we can harness still."
- **Asteroid mining:** they don't pull the asteroid in. They "control the asteroid's gravity and make them have the same speed and direction as the Firefly". Crew in forcefield bodysuits drive tethered spikes into it. (`chapter4mike.rpy:2648-2760`)
- Navigation follows a computer-pre-planned course, and the navigator handles surprises.

## 6. Distance & FTL [CANON + DERIVED]

- **Arctos is in another galaxy.** Geralt: "being the first human leaving your galaxy" (`chapter4mike.rpy:1079`).
- **The signal:** Charles picked up a spoken contact message from Earth: "If you can hear this, it means you've found our signal. We're from a planet called Earth…" (`prologue.rpy:98`). "They speak our language."
- **[DERIVED]** Human radio has only been going out for about 100 years, so the bubble is about 100 ly. The nearest galaxies are 70,000 ly (Sagittarius Dwarf), 160,000 ly (LMC) and 2.5M ly (Andromeda) away. **The signal can't have arrived at light speed.** Arctonian receivers must pick it up some other way (the extradimensional or entanglement channel: Charles "honed in on that other wave").
- **[DERIVED]** The trip takes about 2 months ("almost two months", `chapter4mike.rpy:3872`), so the effective speed is about 6 × distance in ly, in multiples of c:

  | Destination | Effective speed |
  |---|---|
  | Sagittarius Dwarf | ~420,000c |
  | LMC | ~960,000c |
  | Andromeda | ~15,000,000c |

- **[DERIVED]** It can't be relativistic sublight travel. Julia checks in weekly (`chapter4mike.rpy:5366`), and Mike has a live line to Arctos, so the clocks stay in sync. That means real FTL plus FTL comms.
- **[PROPOSED]** It's a **dimensional fold/shortcut**, not raw speed. Canon supports this through Charles's dimension lecture and "a universe where the shortest distance between two points would not be a straight line… jump into a black hole and bend the lines" (`chapter2date.rpy:738-759`). The "stars going by at light speed" (`chapter4mike.rpy:2746`) is what the transit looks like from inside.
- **[DERIVED]** The ship *can't* cruise in normal space at relativistic speed. A 1 µg dust grain hits with 0.1 kg TNT-equivalent at 0.1c, 3.3 kg at 0.5c and 131 kg at 0.99c. In normal space it moves at orbital or in-system speeds, and that's what the hull is designed for.

## 7. Engine core: black hole sizing [DERIVED/PROPOSED]

A black hole leaks heat as Hawking radiation: smaller ones are hotter and shorter-lived. The real-paper reference is Crane & Westmoreland, "Are Black Hole Starships Possible?" (arXiv:0908.1803).

| Mass | Hawking output | Lifetime | Particle temp. (kT) | Verdict |
|---|---|---|---|---|
| 6×10⁸ kg (Crane & Westmoreland) | ~160 PW (paper) | ~3.5 yr | ~17 GeV | far too hot |
| 10¹¹ kg | ~36 GW* | ~3×10⁹ yr | ~106 MeV | needs ~60,000 m² of radiators |
| **10¹² kg (chosen)** | **~0.36 GW*** | ~3×10¹² yr | ~10.6 MeV | fits the ship |

\*The simple formula counts photons only. The real output is a few times higher.

**Chosen core: 10¹² kg**
- Same mass as a ~900 m rocky asteroid.
- Schwarzschild radius ~1.5×10⁻¹⁵ m, about the size of a proton.
- Spin energy you could extract: ~2.6×10²⁸ J, about 40 million years of humanity's current energy use. That covers "never runs out of fuel".
- Mass lost to Hawking radiation is ~4 µg/s, which is trivial to top up. Canon's mineral feeding is for **spin/power**, not for keeping the core alive.
- **The core outweighs the ship about 100,000:1.**

**Structural consequence**
- An acceleration mismatch of just 0.001 g between core and ship would load the mounts with about **10¹⁰ N**, roughly 300 Saturn V rockets at full thrust. No material can carry that.
- The core floats in a **field cage**, and the "falling" drive accelerates core and ship *together*, so nothing carries the load. This is why "it never flies, it falls" matters.
- Geralt's "if the ship stops, all hands to engineering" reads as a **core-containment emergency**.

**Core gravity** (the artificial gravity system has to cancel it):

| Distance from core | Pull |
|---|---|
| 3 m | ~0.76 g |
| 8 m (observation deck above it) | ~0.1 g |
| 30 m | ~0.008 g |

**Core shielding**
- The core radiates ~10 MeV gamma. Cutting 0.4 GW down to about 1 W takes ~28 half-value layers, which is about **30-50 cm of tungsten-class shielding** (rough figure, ignoring buildup).
- This is the "soft humming" John naps next to.

## 8. Hull structure [DERIVED/PROPOSED]

### Reference A: Star Trek TNG (Technical Manual, Sternbach & Okuda)

Per a Daystrom Institute Technical Library summary. We couldn't check the primary source directly, but the arithmetic checks out.

| Layer (inside → out) | cm |
|---|---|
| Interlaced microfoam duranium filaments | 4.7 |
| Biaxially stressed tritanium fabric (3 × 1.2) | 3.6 |
| Low-density expanded ceramic-polymer composite | 3.76 |
| Multiaxis tritanium truss framework | 8.7 |
| Ceramic-polymer composite | 3.76 |
| Radiation attenuation layer | 4.2 |
| AGP ablative ceramic fabric + 0.15 cm tritanium foil | 1.75 |
| **Total** | **30.47** (~36 cm near major members, where the fabric is 4 × 2.3 cm) |

**Trek material notes**
- Tritanium is "21.4 times as hard as diamond" (TOS "Obsession").
- *Hardness isn't toughness*: diamond shatters. A hull needs toughness.
- Trek hulls also have an inner and outer hull, plus a **structural integrity field** (a force-field lattice across the frame).

### Reference B: real hardware (NASA/ISS)

- **ISS stuffed Whipple shield (US segment):**
  - 2 mm aluminium bumper
  - MLI insulation
  - 6 layers of Nextel + 6 layers of Kevlar
  - 11.4 cm standoff
  - 4.8 mm aluminium rear (pressure) wall
  - Stops a 1.3 cm aluminium sphere at 7 km/s (NASA NTRS 20120002584).
  - Total weight is about 3 g/cm².
- **Inflatable habitats** (NASA TransHab, Bigelow BEAM): the pressure is carried by woven **Vectran** restraint fabric.
- **Radiation:** NASA uses hydrogen-rich polyethylene and water. There are polyethylene blocks in ISS crew quarters, and "water wall" storm shelters use the ship's water supply as shielding.

### Mapping: Trek ↔ real

| TNG layer | Real-world equivalent |
|---|---|
| Microfoam duranium | metal foam / honeycomb sandwich panels |
| Tritanium fabric | Vectran restraint layer (TransHab/BEAM) |
| Ceramic-polymer composite | Nextel/Kevlar Whipple stuffing |
| Tritanium truss | spaceframe |
| Radiation layer (4.2 cm ≈ 4 g/cm² of polyethylene) | thin by NASA standards (studies run 5-20+ g/cm²); Trek leans on its deflectors |
| AGP ablative + foil | Whipple bumper |

**The TNG hull is a stuffed Whipple shield with the empty gap packed solid.** That works because the structural integrity field does the job the gap normally does. It weighs about **37 g/cm² (~370 kg/m²)**, roughly 10× the ISS wall.

### Firefly hull stack [PROPOSED]

Canon never says the Firefly's shields stop radiation (Mass Effect logic: barriers stop projectiles, not radiation or heat), so we add the two things Trek leaves out.

| Layer (inside → out) | cm | Basis |
|---|---|---|
| Titanium metal-foam liner | 4.7 | TNG |
| Pressure layer: Vectran-type restraint + titanium sheet | 3.6 | TNG thickness, BEAM/ISS materials. 1 atm across a 7 m radius only needs ~1.6 mm of titanium; the rest is margin and fatigue. |
| **Water jacket** | **20** | NASA water wall; doubles as the greenhouse/potable reservoir |
| Spaceframe truss (+ force-field lattice) | 8.7 | TNG + canon forcefield tech; the "falling" drive means no thrust loads |
| Ceramic-polymer stuffing | 3.76 | TNG ≈ ISS Nextel/Kevlar |
| **Standoff gap** | **20** | Real Whipple design (ISS uses 11.4 cm; doubled for in-system impact speeds) |
| Ablative bumper + foil | 1.75 | TNG ≈ ISS bumper |
| **Total** | **~62 cm (~2 ft)** | about 53 g/cm² (~530 kg/m²) |

- **Slimmer alternative:** declare that Arctonian shields also deflect radiation. The water jacket then drops to 4.2 cm and the total to about 46 cm.
- **Story bonus:** the hull holds the water supply, so **a hull breach is also a water problem**.

## 9. Wings = radiators [PROPOSED]

- In space, wings only make sense as **heat radiators**.
- On the hologram they're folded sponsons along the flanks, about 40 m × 7.5 m each, or ~300 m² per face.

| Mode | Faces radiating | 1500 K | 1800 K |
|---|---|---|---|
| Folded (outer face only) | 2 | ~175 MW | ~360 MW |
| **Spread** (both faces) | 4 | ~345 MW | ~715 MW |

- Spread wings cover the core's ~0.4 GW photon-only leakage. The extra factor of a few gets handled by running them hotter, or by capturing part of the leakage as ship power.
- **When the core runs hot, the Firefly spreads her wings and they glow orange.** She literally lights up like the original combustion prototype. (This is our invention, not canon.)
- The stern pods (gravitational cannons) sit aft on the spine, clear of the radiator wings.

## 10. Windows [DERIVED/PROPOSED]

- **ISS Cupola:** 4 panes per window: an outer debris pane, two fused-silica pressure panes (25-37 mm each) and an inner scratch pane. The full stack is about 10 cm.
- **"Transparent aluminum"** (Trek IV) really exists as **ALON**:
  - density ~3.7 g/cm³
  - flexural strength 380-700 MPa
  - Knoop hardness ~1800
  - a 1.6 in plate stops a .50 cal armor-piercing round
- **Math:** a 1 m ALON pressure pane needs ~1.8 cm at a 4× safety factor. Built like the Cupola, the full stack is about 8-10 cm.
- Windows add almost no radiation shielding, so **the observation deck is the least shielded room on the ship.** It also sits closest above the core.

## 11. Envelope & mass [PROPOSED, scaled from hologram]

| Item | Value |
|---|---|
| Hologram proportions | length ≈ 4.5 × main-body height |
| Main body | ~15 m tall (3 decks at ~4 m + hull/keel) |
| **Length** | **~70 m** |
| Height incl. tower & belly | ~25 m |
| Width | ~18-20 m (not visible on the art; guessed) |
| Hull area | ~6,500-7,000 m² |
| Hull skin mass | ~3.5 kt at 53 g/cm² (~2.5 kt with the TNG stack) |
| Dry mass | ~8-15 kt (guess) |
| Core | 10¹² kg = 1 billion tonnes |

Usable floor space is about 2,500 m² for roughly 15-20 crew, about 130 m² each. That's roomy by submarine standards and fits John's "it's a large ship". (For comparison, a Virginia-class submarine is 115 m long with a crew of ~135.)

## 12. Weak points & story hooks

- **Mixed-generation spaceframe:** original prototype sections were kept "for personality". Those old sections are the natural failure points.
- **The core's field cage** is a single point of failure, which fits the "ship stops → all hands to engineering" rule.
- **The observation deck:** poor shielding and the closest room above the core.
- **The specter "safeguards"** are electronic, not structural. John: "we'll figure out why the ship is firing these on itself" (`chapter3.rpy:5837`).
- **The water jacket:** a breach is also a water-supply problem.
- **The language puzzle:** Earth speaks Arctos's language, and Charles has the "creations" theory (`chapter4mike.rpy:2486-2491`) and Rex calls Earth a "sister planet". There's an outside-creator hint.

## 13. Open questions

- Exact width and beam (the art is side view only)
- Crew headcount (canon never gives one)
- Exact distance to Arctos (which galaxy?)
- Whether the shields also handle radiation (this decides the 46 cm vs 62 cm hull)
- How the "fission-like" step creates a 10¹²-kg black hole from asteroid minerals (in-universe handwave: the extradimensional "opening")

## Sources

- Crane & Westmoreland, *Are Black Hole Starships Possible?* — https://arxiv.org/pdf/0908.1803 ; summary: https://en.wikipedia.org/wiki/Black_hole_starship
- NASA NTRS, ISS MMOD shielding configurations — https://ntrs.nasa.gov/api/citations/20120002584/downloads/20120002584.pdf
- National Academies, *Protecting the Space Station from Meteoroids and Orbital Debris* — https://www.nationalacademies.org/read/5532/chapter/6
- NASA, Passive Radiation Shielding — https://www.nasa.gov/directorates/spacetech/strg/nstrf2016/Passive_Radiation_Shielding/
- NASA NTRS, GCR thick-shielding study — https://ntrs.nasa.gov/api/citations/20170005580/downloads/20170005580.pdf
- Polyethylene as a radiation shielding standard (OSTI) — https://www.osti.gov/biblio/918614
- ISS Cupola — https://en.wikipedia.org/wiki/Cupola_(ISS_module) ; NASA TFAWS 2024 windows — https://tfaws.nasa.gov/wp-content/uploads/TFAWS2024-PT-24.pdf
- ALON — https://www.designingbuildings.co.uk/wiki/Aluminium_Oxynitride ; Surmet paper — https://www-eng.lbl.gov/~shuman/NEXT/MATERIALS&COMPONENTS/Quartz/ALON.pdf
- Memory Alpha, Tritanium — https://memory-alpha.fandom.com/wiki/Tritanium
- Star Trek: TNG Technical Manual (Sternbach & Okuda, 1991), hull layers via the Daystrom Institute Technical Library summary
- Mass Effect Codex, Technology — https://masseffect.fandom.com/wiki/Codex/Technology
