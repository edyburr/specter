# DISTANT TRAVELS 0.8 — THE SPECTER / SP3-CTR

> **Complete data dump on the Specter.**
> Everything the game's script says about it: names, explanations, every appearance, every line of its dialogue, the scenes it causes, the characters' reactions, and the underlying flags/branch logic.
>
> **Spoiler warning:** full Chapter 3 and Chapter 4 spoilers, including Rex's fate.

---

## 0. Source & method

| Item | Value |
|---|---|
| Game | *Distant Travels* |
| Version | `0.8` (`config.version = "0.8"` in `scripts/options.rpy`) |
| Engine | Ren'Py `8.4.1` (`game/script_version.txt` → `(8, 4, 1)`) |
| Archive | `~/Downloads/distant-travels/DistantTravels-0.8-win/game/archive.rpa` |
| Extracted to | `/tmp/opencode/dt_game/` |
| Relevant source files | `chapters/chapter3.rpy`, `chapters/chapter4mike.rpy`, `screens/quickstart.rpy`, `screens/cggallery.rpy`, `screens/musicroom.rpy`, `definitions/audio_definitions.rpy`, `scripts/script.rpy` |

The `.rpa` is an RPA-3.0 archive whose index offsets/lengths are XORed with the key `0x42424242`; the file bodies themselves are stored in plaintext. I extracted the `.rpy`/`.rpyc` sources and searched them directly.

**Quote conventions used below:**
- Quotes are copied verbatim from the script, with Ren'Py text tags (`{glossary=...}`, `{i}`, `{para}`, `{glitch=...}`, etc.) stripped for readability.
- `[player]` is the game's placeholder for the player's chosen name.
- Spelling/grammar errors in the game text are preserved (e.g. "possiblities", "sheperd", "other thank", "chose").
- Speaker names are the names the game displays. The Specter's internal character ID is `mv`, displayed as **"Mysterious Voice"**. That same character object is also used for the Endless White and for some intrusive-thought lines, so context is called out wherever it matters.

---

## 1. One-page summary

The **Specter** — scientific/technical name **SP3-CTR** — is an old Arctonian weapon, a relic of a past war. By the time of the story it is supposed to be inert, collected, and disabled; there should not be any this far from Arctos. It is not a creature. It is a weapon that attacks the mind.

It makes people hear voices, see visions, smell things, or hallucinate. It latches onto whatever it can find in the target's head: fears, doubts, regrets, guilt, memories of lost loved ones, or a person the target knows from Arctos. The result is panic, irrationality, and — in the worst case — violence.

It has two folkloric faces:

- **"Angel"** — you hear/see a lost loved one. Often painful, but familiar.
- **"Demon"** — you hear/see someone who is alive and dear to you, or someone you have not seen. Taken as a bad omen, a premonition that they are in danger.

The weapon does no physical damage by itself. The damage comes from what people do while under its influence. It is described as "a weapon made to disorder armies."

The player is hit at least twice in Chapter 3. The second hit is anomalous: it says Rex's name out loud, Rex hears it, and it triggers a full psychotic break in him. Rex then tries to "save" the player by force, targeting whoever the player earlier named as the most important person on the mission. Depending on the branch, Rex stabs Mike, or John physically disarms him while Charles talks him down; Rex may survive or die (on Mike's route this is decided by the player's Rex affection score; on John's route he always survives in this build).

Chapter 4 adds a major twist: the voice the player heard during the Specter hits is connected to the **Endless White** shard that has been inside the player since childhood. The Endless White says: *"It is why you heard us when the 'specter' hit. You already had me with you."*

---

## 2. Names, terms, and code identity

| Term | Meaning / usage | First/representative source |
|---|---|---|
| **Specter** | The common name. Capitalized and lowercase both appear. | `chapter3.rpy:2488` |
| **specter** | Same, in casual dialogue. | `chapter3.rpy:2324` |
| **SP3-CTR** | The technical/scientific designation. The script never expands the acronym. | `chapter3.rpy:2505`, `chapter3.rpy:2560`, `chapter3.rpy:6467` |
| **Angel** | The famous nickname; specifically the "lost loved one" manifestation. | `chapter3.rpy:2560`, `chapter3.rpy:2708` |
| **Demon** | The darker nickname; the "someone alive/dear is in danger" manifestation. | `chapter3.rpy:2715` |
| **the voice** | How the player and Mike refer to it immediately after a hit. | `chapter3.rpy:2323-2324` |
| **the creepy voice** | John's phrasing. | `chapter3.rpy:2343` |
| **specter hit** | The event of being affected by one. | `quickstart.rpy:41`, `chapter3.rpy:4003` |
| **"Mysterious Voice"** | The displayed name of the `mv` character used for its dialogue. | `scripts/script.rpy:78` |
| **SP3-CTR** | Also used by John as a generic term for the weapon's behavior: "The SP3-CTR latches on to what it can." | `chapter3.rpy:6467` |

There is **no glossary entry** for the Specter or SP3-CTR in `screens/glossary.rpy`. The glossary has entries for Arctos, Broadtown, The Leaves, Team Jules Rules, The Firefly, Quantum Entanglement, The Endless White, CCNA Certification, Theoma and Theoran, and the War of Aggression — but not the Specter.

---

## 3. What the characters say it is

This is the core "explanation" material, quoted by speaker.

### 3.1 Mike — first explanation, observation deck

After the first hit, Mike sits the player down and explains.

> **Mike:** "I'm sorry [player]. What you just experienced is called a Specter."
> — `chapter3.rpy:2488`

> **Mike:** "It's a relic of the past. An old inert weapon from a past war."
> — `chapter3.rpy:2496`

> **Rex:** "It's like running into an old landmine."
> — `chapter3.rpy:2497`

> **Mike:** "The SP3-CTR is a relic of an old weapon from Arctos."
> — `chapter3.rpy:2505`

> **Mike:** "They're supposed to all have gone inert months ago, aside from also being picked up and disabled."
> — `chapter3.rpy:2507`

> **Mike:** "And there aren't supposed to have been any at all this far from Arctos."
> — `chapter3.rpy:2508`

> **Mike:** "Well, there's no physical damage. But there can be some strong reactions."
> — `chapter3.rpy:2512`

> **Mike:** "Yes, it's a good thing. Remember that you're fine. This thing will probably hit two or three times in the coming weeks before it's all over."
> — `chapter3.rpy:2517`

> **Mike:** "About the SP3-CTR, the specter. Or in layman's terms, an 'Angel'."
> — `chapter3.rpy:2560`

> **Mike:** "Everyone usually experiences something different, it can be anything from a smell, to a voice or a vision."
> — `chapter3.rpy:2561`

> **John:** "Some even experience hallucinations."
> — `chapter3.rpy:2563`

> **Mike:** "It's rarely as benevolent as what the nickname suggests."
> — `chapter3.rpy:2564`

> **Mike:** "If you experienced something weird, talking about it usually helps."
> — `chapter3.rpy:2565`

> **Mike:** "John, I'd like you to investigate why none of our alerts warned us against the specter."
> — `chapter3.rpy:2577`

> **Mike:** "You can start tomorrow but it'd be preferable if you could look into it as soon as possible. There might be something wrong with one of our systems."
> — `chapter3.rpy:2578`

### 3.2 Rex — the Angel / Demon folklore

Rex gives the player the soldier's-eye version while they sit in the observation deck.

> **Rex:** "It's not an easy experience to get hit by a specter for the first time."
> — `chapter3.rpy:2608`

> **Rex:** "A Specter has many nicknames, the most famous one being an Angel."
> — `chapter3.rpy:2708`

> **Rex:** "People call it that, because it's not too uncommon to hear the voice or see a vision of a lost loved one."
> — `chapter3.rpy:2709`

> **Rex:** "I imagine your experience was what it was, because it simply leashed onto someone you knew from Arctos."
> — `chapter3.rpy:2710`

> **Rex:** "It's more of an old soldier's tale at this point, but it might help you understand a little of why the Commander reacted as he did, and reached out to you right away."
> — `chapter3.rpy:2713`

> **Rex:** "The other side of them, is usually called a 'Demon'."
> — `chapter3.rpy:2715`

> **Rex:** "If you hear the voice of someone you haven't seen, or someone dear to you who is alive, it's counted as a bad omen."
> — `chapter3.rpy:2716`

> **Rex:** "A dark premonition, or a hint of evil to come."
> — `chapter3.rpy:2717`

> **Rex:** "That's what hits the hardest, and makes powerful men drop to their knees and cry. The base idea, that someone they care about is in trouble."
> — `chapter3.rpy:2718`

> **Rex:** "That's why it's important to know about it. It is what it is, a weapon meant to scare you and create panic."
> — `chapter3.rpy:2720`

> **Rex:** "So if you know about it, it has no power over you."
> — `chapter3.rpy:2721`

Rex also asks the player whether they believe in "Angels and Demons":

> **Rex:** "Do you believe in the so called 'Angels and Demons'?"
> — `chapter3.rpy:2738`

> **You:** "I think it's a romantic tale, and it makes sense somehow."
> — `chapter3.rpy:2741` (if "Yes")

> **Rex:** "Really? I don't, but it's hard to stop thinking about it once you know about it."
> — `chapter3.rpy:2742`

> **You:** "I think there's always an explanation to these things."
> **You:** "And perhaps those tales are just a way to deal with difficult thoughts."
> **You:** "Perhaps it's more a fact that people know their loved ones are in trouble, and that's why they hear the 'demon'?"
> — `chapter3.rpy:2746-2748` (if "No")

> **Rex:** "I agree."
> — `chapter3.rpy:2749`

### 3.3 Mike — the deeper explanation: fear, regret, and "disorder armies"

Later, if the player asks Mike for his own opinion, he gives the most mechanical explanation in the game.

> **Mike:** "I've had a few experiences with them, and I wouldn't call them angels."
> — `chapter3.rpy:3722`

> **Mike:** "It's an old soldier's tale, stemming from there being visions or sounds from lost loved ones."
> — `chapter3.rpy:3723`

> **Mike:** "More often than that, it anchors on to what might be your fears or doubts. So when you have lost someone, it's an easy thing for the chemical released in your brain to trigger."
> — `chapter3.rpy:3724`

> **Mike:** "Usually I- people hear or see someone or something touching on their fears and doubts."
> — `chapter3.rpy:3725`

> **Mike:** "Their biggest regrets. Things that might make them act irrationally."
> — `chapter3.rpy:3726`

> **You:** "Then what he said about them being 'demons' is closer to the truth."
> — `chapter3.rpy:3727`

> **Mike:** "Demons? It is supposedly a dark omen, but I think that is also just another soldier's tale."
> — `chapter3.rpy:3728`

> **Mike:** "As before, it latches onto something you might fear, or wonder about. And if that is a person close to you, it's the same."
> — `chapter3.rpy:3729`

> **Mike:** "It's to make you fear that whoever it is might be in danger, and then panic. It's a weapon made to disorder armies."
> — `chapter3.rpy:3730`

> **Mike:** "Truly terrifying, in my opinion."
> — `chapter3.rpy:3741`

> **Mike:** "Something you didn't recognize? Might be because you're not from Arctos. The weapon wasn't designed with humans in mind."
> — `chapter3.rpy:3747`

> **Mike:** "It probably latched onto something you knew about Arctos, and something you would find dark or intimidating."
> — `chapter3.rpy:3755`

> **Mike:** "So it picked me, or perhaps something you've read in a book once."
> — `chapter3.rpy:3756`

> **Mike:** "It's not real, I promise you that."
> — `chapter3.rpy:3757`

### 3.4 John — the engineer's view

John treats it as a system failure and a weapon, not a ghost.

> **John:** "I take it you heard the creepy voice? The Angel."
> — `chapter3.rpy:2343`

> **John:** "I'm on your side of the court with that one. It's a nickname for it. The scientific name is less interesting."
> — `chapter3.rpy:2345`

> **John:** "That aside, are you alright? They can be quite... stressful."
> — `chapter3.rpy:2346`

> **John:** "A weapon, supposedly non-existent since about a year back."
> — `chapter3.rpy:2350`

> **John:** "I'm about to start tearing the entire system apart and fix this."
> — `chapter3.rpy:5636`

> **John:** "A specter should not be able to hit the Firefly, with all the safeguards in place."
> — `chapter3.rpy:5637`

> **John:** "We didn't bring you into outer space in order to subject you to inhumane weapons on a supposedly safe mission."
> — `chapter3.rpy:5639`

> **John:** "The SP3-CTR latches on to what it can. It's a weapon, it's supposed to scare you."
> — `chapter3.rpy:6467`

### 3.5 Charles — the clinical view

Charles has fewer direct explanations, but his lines frame it as a real, treatable event and warn Rex that the memories are not real.

> **Charles:** "Logical thinking would deem that the case. I guess it's not too bad if you don't have all that many memories of other specters."
> **Charles:** "It adds on itself, really."
> — `chapter3.rpy:2932-2933`

> **Charles:** "Rex, you're in a panic. It's not real."
> **Charles:** "Take two, Rex. Think carefully, you've been here before."
> — `chapter3.rpy:5762-5763`

> **Charles:** "I know, Rex. I know."
> **Charles:** "We'll protect him, Rex."
> — `chapter3.rpy:5774-5775`

### 3.6 Shawn — the dry one-liner

> **Shawn:** "Shouldn't have been a specter here to begin with."
> — `chapter4mike.rpy:539`

### 3.7 The player's own understanding

> **You:** "The voice."
> — `chapter3.rpy:2323`

> **You:** "That's a harrowing description."
> — `chapter3.rpy:2498`

> **You:** "It's a scary thought to run into something like that. But, it's all safe, right?"
> — `chapter3.rpy:2509`

> **You:** "A weapon?"
> — `chapter3.rpy:2506`

> **You:** "Maybe I'm a little too calm then... but that's good in this case, right?"
> — `chapter3.rpy:2514`

> **You:** "I don't think I need therapy for something like this..."
> — `chapter3.rpy:2566`

> **You (inner thought):** "It's the voice again. The Specter."
> — `chapter3.rpy:3872`, `chapter3.rpy:5584`

> **You:** "Someone could be in real trouble from the specter."
> — `chapter3.rpy:3996`

> **You:** "Rex came by my room just after the Specter hit, and was acting strange."
> — `chapter3.rpy:4003`

> **Narrator:** "Your mind flashes back to the explanation about specters he gave you. How some people even experience hallucinations."
> — `chapter3.rpy:5744`

---

## 4. What it does — symptoms, rules, and behavior

### 4.1 Delivery

- The voice is **inside the head**, not directional, not from a speaker.
  > **Narrator:** "It's not coming from anywhere specific, instead it almost sounds like it's inside your head."
  > — `chapter3.rpy:2264`
- It can wake the player from sleep and leave a headache/dehydration feeling.
  > **Narrator:** "You wake up with a headache, almost like you're dehydrated."
  > — `chapter3.rpy:2253`
- The voice can be heard by nearby people too. Rex hears it say his name; John hears it over the navigator.
  > **You:** "Did it just... say your name?"
  > **Rex:** "You heard the same thing?"
  > — `chapter3.rpy:3930-3931`
- The voice's delivery is slow, capitalized, and rendered in small caps by the `mv` character definition (`what_prefix='"{sc=1.1}'`).

### 4.2 Manifestation types

The game lists four explicit categories:

1. **Smell** — "anything from a smell"
2. **Voice** — "to a voice"
3. **Vision** — "or a vision"
4. **Hallucination** — "Some even experience hallucinations."

Source: `chapter3.rpy:2561-2563`.

### 4.3 Targeting logic

It "latches on to what it can" (`chapter3.rpy:6467`). Specifically:

- Fears and doubts (`chapter3.rpy:3724`, `3729`)
- Biggest regrets (`chapter3.rpy:3726`)
- Guilt and memories of lost loved ones (`chapter3.rpy:3723`, `2709`)
- Something the target knows about Arctos (`chapter3.rpy:2710`, `3755`)
- A person close to the target (`chapter3.rpy:3729`)
- In the player's case, it anchors on the route character (Mike/Charles/John) because the player has no Arctos memories of their own (`chapter3.rpy:2666`, `3747`).

### 4.4 Angel vs. Demon

| Face | Trigger | Meaning |
|---|---|---|
| **Angel** | Voice/vision of a **lost loved one** | Painful but familiar; the famous nickname. |
| **Demon** | Voice of **someone alive and dear**, or someone not seen | Bad omen; premonition that they are in danger. |

Rex's summary:

> **Rex:** "If you hear the voice of someone you haven't seen, or someone dear to you who is alive, it's counted as a bad omen."
> **Rex:** "A dark premonition, or a hint of evil to come."
> — `chapter3.rpy:2716-2717`

### 4.5 Effect on the mind

- Panic and irrationality (`chapter3.rpy:3726`, `3730`)
- Fear that a loved one is in danger (`chapter3.rpy:2718`, `3730`)
- In extreme cases, a full psychotic break and violence. Rex is the proof.
- The player experiences a range of physical/psychological sensations:
  - headache, dehydration (`2253`)
  - cold/lonely feeling (`2247-2248`)
  - adrenaline, anxiety, "cold without feeling cold", "about to get a headache", "like falling" (`3994-3995`, `5706-5708`)

### 4.6 No physical damage

> **Mike:** "Well, there's no physical damage. But there can be some strong reactions."
> — `chapter3.rpy:2512`

The physical damage in the story comes from what people do under the influence: Rex stabs Mike.

### 4.7 Repetition and duration

> **Mike:** "This thing will probably hit two or three times in the coming weeks before it's all over."
> — `chapter3.rpy:2517`

The player experiences at least two hits in Chapter 3. The second is explicitly "different" (`chapter3.rpy:3925`, `5651`).

### 4.8 Resistance / mitigation

- **Knowledge helps.**
  > **Rex:** "So if you know about it, it has no power over you."
  > — `chapter3.rpy:2721`
- **Talking helps.**
  > **Mike:** "If you experienced something weird, talking about it usually helps."
  > — `chapter3.rpy:2565`
- **Focusing on something else helps.**
  > **John:** "Relax and focus on something else, [player]."
  > — `chapter3.rpy:5629`
- **Knowing it is not real helps.**
  > **Mike:** "It's not real, I promise you that."
  > — `chapter3.rpy:3757`
  > **John:** "Rex, remember that it's not real. It's the specter. What matters is here, now. You, me, and the rest of the crew."
  > — `chapter3.rpy:5994`

### 4.9 The anomaly

The second hit does things the first did not:

- It says **"Rex."** by name (`chapter3.rpy:3929`, `5655`).
- Rex hears it too (`chapter3.rpy:3931`, `5657`).
- It recites Rex's childhood dream and personal failures, not the player's (`chapter3.rpy:3932-3955`).
- Rex calls it "different than the ones I've experienced" (`chapter3.rpy:3925`, `5651`).

This is the trigger for Rex's breakdown.

### 4.10 Presentation / game-feel

The Specter scenes use:

- `$ varGui_creepyTextBox = True` → flickering text box (`definitions/imagedefinitions.rpy:735-741`)
- Red color overlay (`show imageScene_colorOverlay red`)
- Screen shake (`transformShakeHorizontal`, `transform_transformShakeHorizontalBig`)
- Music cues:
  - `music_echoesFromTheVoid` — first hit
  - `music_theEndlessWhite` — second hit / voice
  - `music_theSpecterStrikes` — Rex's breakdown/confrontation
  - `music_ashAndSnow` — aftermath
- The `mv` character's small-caps text styling (`{sc=1.1}`)
- Occasional `{glitch=...}` text in Chapter 4's voice lines
- A developer comment at `chapter3.rpy:2261`: `## Flickering of entire lights on scene with dark overlay?` — an intended/considered effect for the first hit.

---

## 5. Scene-by-scene: every Specter appearance

### 5.1 Chapter 3, Scene 1 — The first hit (night, player's cabin)

**Where:** Player's cabin on the Firefly, the night after the first route date.
**When:** Chapter 3, "Echoes from the Void."
**Who:** The player (target). Mike/John on the other end of the call. Rex and the rest of the crew are elsewhere.

**Sequence:**

1. The player wakes with a headache, gets water, lies back down, and notices something is "off."
2. Music: `music_echoesFromTheVoid`.
3. The voice begins inside the player's head.
4. The player initially thinks it is not about them:
   > **You (inner thought):** "Memories of my past?"
   > **You (inner thought):** "Whatever this is, it's not talking about me."
   > **You (inner thought):** "That's... comforting."
   > — `chapter3.rpy:2266-2268`
5. The voice continues. Its taunts are **route-specific**: it addresses the route character by rank/name — "Commander" (Mike), "Doctor" (Charles), or "John."
6. The player gets out of bed, not wanting to be alone.
7. The wristband rings. Mike or John calls.
8. Mike's call (Mike route):
   > **Mike:** "Hi. Sorry to wake you up, [player]."
   > **Mike:** "[player]. Did you experience anything strange just now?"
   > **You:** "The voice."
   > **Mike:** "The voice. The specter. It has a few names. It's rarely a pleasant experience."
   > **Mike:** "How are you feeling?"
   > **You:** "Honestly? A little stressed out."
   > **Mike:** "I'm sorry. I should have prepared for something like this."
   > — `chapter3.rpy:2319-2327`
9. John's call (John route):
   > **John:** "You awake, sleeping beauty?"
   > **You:** "Awake-ish. You alright?"
   > **John:** "I take it you heard the creepy voice? The Angel."
   > **You:** "'Angel'? That's not what I would call it."
   > **John:** "I'm on your side of the court with that one. It's a nickname for it. The scientific name is less interesting."
   > — `chapter3.rpy:2340-2345`
10. The player goes to the observation deck (or, on John's route, John walks with them) for the full explanation.

**What the Specter does here:** It wakes the player, speaks in their head, recites the route character's guilt/fears, and then stops. It does not physically harm anyone.

**Route-specific taunt blocks** are in §6.2–§6.4.

> **Note on the Charles route:** The first-hit scene has a Charles-specific taunt block, but the script has no matching "Charles calls the player" branch — only `if varStory_route == "Mike"` and `if varStory_route == "John"` are scripted after the hit (`chapter3.rpy:2317`, `2338`). This looks like an incomplete/route-gated branch in the 0.8 build.

---

### 5.2 Chapter 3, Scene 2 — The observation-deck briefing

**Where:** Firefly observation deck.
**Who:** The player, Mike, Rex, and (on John's route) John.

**Sequence:**

1. Mike explains the Specter/SP3-CTR and the "Angel" nickname.
2. Rex adds the "Demon" folklore.
3. The player can choose how they felt:
   - **"Too calm"** → `varStory_rexAffection += 1`
   - **"I wish I'd stayed at home"** → no affection gain
   (`chapter3.rpy:2650-2659`)
4. The player can say whether they believe in "Angels and Demons":
   - **"Yes"** → no affection gain
   - **"No"** → `varStory_rexAffection += 1`
   (`chapter3.rpy:2737-2749`)
5. The player can tell Mike they heard his name ("Commander"):
   - **"Tell him that you heard his name"** → `varStory_mikeAffection += 1`
   - **"No use in worrying him"** → no gain
   (`chapter3.rpy:3743-3761`)
6. Mike gives his deeper "fear/regret/disorder armies" explanation.
7. Mike promises to find out what caused it and says John will scan for them.

**What the Specter does here:** Nothing directly; this is the exposition scene. But it establishes the rules the player will use to survive the second hit.

**Key flags set/used here:**
- `varStory_huggedMike` (Mike route hug)
- `varStory_rexAffection` (at least 2 points available here)
- `varStory_mikeAffection` (1 point available here)
- `varStory_rexTarget` is set earlier, in the cafeteria conversation with Rex (`chapter3.rpy:3440-3460`), not here.

---

### 5.3 Chapter 3, Scene 3 — The second hit and Rex's breakdown

This is the big one. It is the Specter's main plot appearance and the source of the "Rex episode."

**Where:** Player's cabin → corridor → either Charles's room or the captain's quarters.
**When:** The night after the route date (Mike's stargazing date / John's workshop-and-pizza date).
**Who:** The player, the route character (Mike or John), Rex, and the person Rex fixates on.

**Sequence:**

1. The player goes to sleep after a good day.
2. Music: `music_theEndlessWhite`.
3. The voice starts:
   > **Mysterious Voice:** "Resting, pretending to be happy and safe."
   > **Mysterious Voice:** "Satisfied, after a day of being fed lies."
   > — `chapter3.rpy:3866-3867`, `5577-5578`
4. The player wakes suddenly:
   > **You (inner thought):** "It's the voice again. The Specter."
   > — `chapter3.rpy:3872`, `5584`
5. The voice escalates into a direct attack on the player's self-worth, friendships, and future (§6.5–§6.6).
6. The player gets dressed, not wanting to be alone.
7. The player exits and meets Rex (Mike route) or John (John route).
8. The voice says **"Rex."** Rex hears it.
9. The voice recites Rex's childhood dream and failures (§6.7). Rex is visibly shaken.
10. Rex snaps:
    > **Rex:** "This can't happen again, I'll make sure we take you back to Earth."
    > **Rex:** "The fool has brought you here for nothing but death, and if we bring you to Arctos he will be bringing death back to Earth as well."
    > **Rex:** "I will fill these corridors with scarlet paintings before I let that happen."
    > — `chapter3.rpy:3956-3958`
11. The player realizes Rex is in a frenzy and calls for help. The script routes the call by route/target: on Mike's route the player calls Mike (or Charles first, then Mike, if Rex's target is Charles); on John's route the player is with John and they go after Rex directly, calling Charles first if Rex's target is Charles.
12. The confrontation: Rex is holding a knife. He believes he is saving the player. He accuses Mike/Charles of dragging the player to his death.
13. The branch resolves according to `varStory_rexTarget`, `varStory_route`, and `varStory_rexAffection`.

**What the Specter does here:** It weaponizes Rex's guilt and trauma, turning him into a violent fanatic. It does not control him like a puppet; it amplifies what is already there. Rex later says:

> **Rex:** "Then the specter hit. It intensified those thoughts by a million. It was as if I had the chance to turn back time and undo my biggest regrets."
> — `chapter4mike.rpy:210`, `559`

> **Rex:** "I saw you as young, dumb and naive. Tricked into being here, and having no chance to turn it to a good thing."
> **Rex:** "Instead I was the naive one, falling for the tricks of my own mind."
> — `chapter4mike.rpy:216-217`

**Branch matrix (see §7 for code):**

| `varStory_route` | `varStory_rexTarget` | Outcome |
|---|---|---|
| Mike | Charles | Player calls Charles (no answer), then Mike. Mike intercepts Rex. Rex stabs Mike in the side. Mike throws Rex off. Rex passes out. Rex's survival = `varStory_rexAffection >= 3`. |
| Mike | Mike | Player calls Mike (no answer), runs to the captain's quarters. Rex stabs Mike. Mike throws Rex off. Rex passes out. Survival = affection check. |
| Mike | John | Same as above: the confrontation still defaults to Mike's quarters. (Possible railroading/inconsistency.) |
| John | Charles | John and the player go to Charles's room. John talks Rex down and physically stops him from using the knife. Rex drops it, breaks down, passes out. **No stabbing.** Rex is alive. |
| John | Mike | John and the player go to the captain's quarters. Rex stabs Mike. John pulls Rex off. Rex passes out. `varStory_rexAlive` is not recalculated in this branch (defaults to `True`), so Rex lives. |
| John | John | Same as above: confrontation defaults to Mike's quarters. (Possible railroading/inconsistency.) |

**Rex's breakdown dialogue** is largely shared across branches. Key lines:

> **Rex:** "Mike, you and Charles have basically killed him already. With promises of honor and adventure that you can never keep."
> **Rex:** "There is only pain in this future."
> — `chapter3.rpy:4043-4044`

> **Rex:** "Atone for your sins and I'll take him back home. He shouldn't be trapped here, being lead to his death by us."
> — `chapter3.rpy:4045`

> **Rex:** "It's unfair. We can't drag another world down because of our mistakes."
> — `chapter3.rpy:4049`

> **Rex:** "Lies, lies and more lies. I'm sick of it."
> — `chapter3.rpy:4054`

> **Rex:** "I've figured it out now. There's no one event, not even the end of my world."
> **Rex:** "It's the culmination of all the past few years."
> **Rex:** "Things getting worse and worse. More death, and more pain all around me. And no way to stop it."
> **Rex:** "No matter how much I tried."
> **Rex:** "Eventually, things broke."
> — `chapter3.rpy:4061-4065`

> **Rex:** "I had days where I was too tired to get out of bed, felt too exhausted to end myself. Otherwise I would have ended myself a long time ago."
> — `chapter3.rpy:4082`

> **Rex:** "How can I believe in heaven, when I've seen both hell, and space, that lies beyond heaven?"
> **Rex:** "The endless stars that even the goddess cannot change. And the pain they've caused."
> **Rex:** "If the goddess exists, why does she allow this kind of evil to continue to exist?"
> — `chapter3.rpy:4086-4088`

> **Rex:** "No, I will paint these halls in crimson, if I have to."
> — `chapter3.rpy:4095`

**Aftermath of the stabbing (Mike route / non-Charles branch):**

> **Narrator:** "Before Mike can respond, Rex rushes towards him and lunges towards his side."
> **Narrator:** "Mike lets out a roar of pain, and they tumble to the floor in a struggle."
> — `chapter3.rpy:4358-4371`

> **Rex:** "I've done something horrible, haven't I?"
> **Rex:** "I didn't mean to... the memories, they-"
> **Rex:** "I'm sorry. Please forgive me."
> **Rex:** "Don't hate me, I never wanted to do anything like this."
> — `chapter3.rpy:4416-4420`

> **Rex:** "I don't want to be alone."
> — `chapter3.rpy:4428`

> **Mike:** "Some people carry a lot of weight, and with that, something like the Specter can have a devastating effect."
> **Mike:** "In Rex's case, more than most. I don't know exactly what caused this, but I'll find out."
> **Mike:** "No matter what."
> — `chapter3.rpy:4447-4449` (also `4195-4197`, `5873-5875`, `6126-6128`)

**John-route / Charles-target variant (the only non-stabbing outcome):**

> **Narrator:** "Rex pulls his hand up, as if ready to strike. However, John is holding him by the shoulders already. Rex is unable to move his arms enough."
> **John:** "That's enough Rex."
> **Narrator:** "Rex let's go of the knife starts crying, and huddering."
> — `chapter3.rpy:5814-5818`

> **Rex:** "I've done something horrible, haven't I?"
> **Rex:** "I didn't mean to... the memories, they-"
> **Rex:** "I'm sorry. Please forgive me."
> **Rex:** "Don't hate me, I never wanted to do anything like this."
> **Rex:** "I don't want to be alone."
> — `chapter3.rpy:5819-5826`

**Rex's survival:**

- In the Mike route, `varStory_rexAlive` is set before the confrontation:
  - `if varStory_rexAffection >= 3: varStory_rexAlive = True`
  - `else: varStory_rexAlive = False`
  (`chapter3.rpy:3980-3983`, `4251-4254`)
- In the John route, no such assignment exists; the default is `True` (`scripts/script.rpy:346`), so Rex always survives the night in that route.
- Chapter 4 confirms the outcome:
  - Alive: Rex is in the med bay, then a locked cabin, and later handed to the council (`chapter4mike.rpy:16-20`, `999-1001`).
  - Dead: Geralt says they will hold a proper burial (`chapter4mike.rpy:1001-1004`).

---

### 5.4 Chapter 3, Scene 4 — Aftermath and the scan

**Where:** Med bay / corridors / player's room.
**Who:** The player, Mike, Charles, John, Geralt, Rex (unconscious).

**Key beats:**

1. Mike takes responsibility and offers to send the player home.
2. Mike explains why Rex broke:
   > **Mike:** "Desperation makes people do strange things. And then there was the Specter."
   > — `chapter3.rpy:4607`
3. Mike has already ordered a scan:
   > **Mike:** "I've asked John to set up a system to scan for them, he should have it up in a day or two at most."
   > — `chapter3.rpy:4608`
4. John suspects the ship itself is firing the Specters:
   > **John:** "And then we'll figure out why the ship is firing these on itself."
   > — `chapter3.rpy:5837`
5. Charles and John take care of Rex.
6. The player can reaffirm their choice to stay.

**What the Specter does here:** It is off-screen, but its consequences drive the entire aftermath. The characters now treat it as a ship-level security failure, not just a personal trauma.

---

### 5.5 Chapter 4, Scene 5 — Rex's account (Mike route)

**Where:** Rex's locked cabin / med bay.
**Who:** The player, Rex, Mike (optional), Geralt/Shawn (depending on branch).

If Rex is alive, the player can visit him. Rex explains what the Specter did to him:

> **Rex:** "Then the specter hit. It intensified those thoughts by a million. It was as if I had the chance to turn back time and undo my biggest regrets."
> — `chapter4mike.rpy:210`, `559`

> **Rex:** "I saw my own loss in you."
> **Rex:** "I saw every problem. Every mistake. Every bad outcome. Everything, everywhere, all at once."
> **Rex:** "I saw Arctos finding another world, and then I saw the path we were taking towards it."
> **Rex:** "A path that historically has lead to nothing but destruction."
> **Rex:** "Every path I could see from there lead to the same end. Failure."
> — `chapter4mike.rpy:193-197`

> **Rex:** "I didn't want Arctos to destory another world. Not with it's own problems."
> **Rex:** "I didn't want to *help* Arctos destroy another world."
> — `chapter4mike.rpy:198-199`

> **Rex:** "I saw you as young, dumb and naive. Tricked into being here, and having no chance to turn it to a good thing."
> **Rex:** "Instead I was the naive one, falling for the tricks of my own mind."
> — `chapter4mike.rpy:216-217`

> **You (inner thought):** "It's like he was attacked by his own thoughts..."
> **Narrator:** "Almost."
> **You (inner thought):** "I can relate to the feeling of that, being attacked by my own thoughts."
> **Narrator:** "Not only *your own* thoughts..."
> — `chapter4mike.rpy:211-214`

That last exchange is important: the game explicitly says the Specter is **not only** the target's own thoughts. Something external is involved.

**If Rex is dead:** the player never gets this conversation; Geralt delivers the burial lines instead (`chapter4mike.rpy:1001-1004`), and the player's later stargazing thought is:

> **You (inner thought):** "I wish things would have gone down differently, with Rex."
> — `chapter4mike.rpy:5380`

---

### 5.6 Chapter 4, Scene 6 — The Endless White revelation

**Where:** The player's dream, after the party / before Arctos.
**Who:** The player and the Endless White shard inside them.

This is the scene that recontextualizes the Specter hits.

> **Narrator:** "The tone shifts, and you can hear me clearly now. I have been with you, and your thoughts for as long as you know."
> **Narrator:** "Plainly: Yes."
> **Narrator:** "It is why you heard us when the 'specter' hit. You already had me with you."
> — `chapter4mike.rpy:6542-6544`

The player recognizes the Endless White's voice earlier in the med bay:

> **Narrator:** "You hear a voice, in your head. You're sure it's in your head because it's not coming from any direction."
> **Narrator:** "It's voiceless, like your own thoughts, yet it carries words. More directly, you understand what it would have said if it was words. Like the feeling of an explanation."
> **Mysterious Voice:** "You. We know you."
> **Mysterious Voice:** "Not enemy, not friend."
> **Mysterious Voice:** "A passenger."
> **You (inner thought):** "I know this voice..."
> **You (inner thought):** "Are you... the Endless White?"
> **Mysterious Voice:** "Yes."
> — `chapter4mike.rpy:2280-2288`

**Interpretation:**

There are two readings, and the script supports both:

1. **The voice during the Specter hits was the Endless White shard, not the SP3-CTR itself.** The shard has been with the player since childhood, explains why the player could hear the Specter at all (the weapon was "not designed with humans in mind"), and says outright: *"It is why you heard us when the 'specter' hit."*
2. **The SP3-CTR was the actual source, and the Endless White shard was the medium/amplifier.** The shard's presence let the player "tune in" to the weapon; the taunts about Rex could then be the weapon reading Rex's mind, or the shard projecting what it picked up.

The game does not fully resolve which is which. What is clear:
- The player's connection to the Endless White is the reason the Specter hit them so vividly.
- The same `mv` character object is used for both, so the game deliberately conflates the two voices.
- The Endless White is a separate ancient entity/weapon ("a storage, for matter and sequences, for states of life"), not the SP3-CTR.

---

### 5.7 Mention-only / off-screen appearances

These are places the Specter is referenced but does not "appear" as a scene:

| Source | Line | What it says |
|---|---|---|
| `screens/quickstart.rpy:41` | "After the Specter Hit, did you hug Mike?" | Quick-start flag `varStory_huggedMike` |
| `screens/quickstart.rpy:42` | "When Rex asked how you were feeling after the specter, what did you say?" | Flag `varStory_quickstartRexQuestion1` |
| `screens/quickstart.rpy:43` | "When Rex asked if you believed in 'Angels and Demons', did you?" | Flag `varStory_quickstartRexQuestion2` |
| `screens/quickstart.rpy:46` | "When Rex asked if you were feeling alright during the second Specter hit, were you?" | Flag `varStory_quickstartRexQuestion4` |
| `screens/cggallery.rpy:36` | Gallery item "Rex in the Observation Deck" | "Found in chapter 3 when the specter hits." |
| `screens/musicroom.rpy:187`, `227` | Music room track | "The Specter Strikes" |
| `definitions/audio_definitions.rpy:43` | Audio definition | `audio.music_theSpecterStrikes = "audio/music/The Specter Strikes.ogg"` |
| `chapter4mike.rpy:539` | Shawn | "Shouldn't have been a specter here to begin with." |
| `chapter4mike.rpy:623` | Player's inner thoughts | "Why was there a specter there?" |
| `chapter4mike.rpy:633` | Narrator | "Things are closer to how they were before the specter." |

---

### 5.8 False positives — same voice, different entity

These scenes use the **same `mv` "Mysterious Voice" character** but are not the SP3-CTR. They are included so the voice's appearances are not confused.

#### Chapter 1 date — the ash nightmare

This is the Endless White / ash dream, not the Specter. It uses the same voice styling and the same "inside your head" language.

> **Mysterious Voice:** "No voice."
> **Mysterious Voice:** "No escape...?"
> **Mysterious Voice:** "There is a need."
> **Mysterious Voice:** "Succumb. It is easier. No struggle."
> — `chapter1date.rpy:504-516`

> **Mysterious Voice:** "New. Strange."
> — `chapter1date.rpy:525` (first playthrough)

> **Mysterious Voice:** "You. We know you. The cycle repeats, new choices will have to be made."
> — `chapter1date.rpy:527` (repeat playthrough)

#### Prologue — the "Static-Sounding Voice"

This is Earth's contact signal, not the Specter:

> **Static-Sounding Voice:** "If you can hear this, it means you've found our signal. We're from a planet called Earth and this is our attempt at making contact with alien lifeforms. We are peaceful..."
> — `prologue.rpy:98`

#### Chapter 4 — intrusive "Mysterious Voice" lines

These occur during Mike's Chapter 4 conversation and are almost certainly the Endless White shard / intrusive thoughts, not the SP3-CTR:

> **Mysterious Voice:** "The mask of wishes, cracking already?"
> **Mysterious Voice:** "See who you are without it. Scared. Alone. Inexperienced."
> — `chapter4mike.rpy:1529-1530`

> **Mysterious Voice:** "A rope, hanging far above the ground. Almost in reach."
> **Mysterious Voice:** "But is it a noose or a lifeline?"
> — `chapter4mike.rpy:1612-1613`

---

## 6. The Specter's own dialogue — complete script

This is every line spoken by the `mv` character in the Specter-related scenes, grouped by scene. The same lines are duplicated in some route branches; duplicates are noted rather than repeated.

### 6.1 First hit — common opening (all routes)

> **Mysterious Voice:** "Far from home, and all alone."
> **Mysterious Voice:** "Surrounded by a dark expanse with no saving, trapped by memories of your past."
> **Mysterious Voice:** "Do your memories haunt you, as your actions haunt the souls of the ones you left behind?"
> **Mysterious Voice:** "How they looked up to you, and trusted you."
> **Mysterious Voice:** "And how you left them, instead of staying with them and keeping them safe."
> **Mysterious Voice:** "Do you think now, that your actions change anything?"

Source: `chapter3.rpy:2262-2276`.

### 6.2 First hit — Mike route variant

> **Mysterious Voice:** "No, old friend. I have said it once before, and I will remind you until you join them."
> **Mysterious Voice:** "The ones you pretended to care about are stuck in a bleak, bland afterlife."
> **Mysterious Voice:** "No sun, no warmth, no color."
> **Mysterious Voice:** "No chill from snow, no falling rain. No emotions."
> **Mysterious Voice:** "The empty void awaits, for you as well as the ones you left behind."
> **Mysterious Voice:** "You should have followed the lesson the moment you were taught it."
> **Mysterious Voice:** "Those colors you are so fond of, will fade away before your eyes."
> **Mysterious Voice:** "Stop your futile struggle. Don't keep dragging others down, in a futile attempt to save them."
> **Mysterious Voice:** "Reach for the stars, and the void behind them reaches back towards you."
> **Mysterious Voice:** "Are you going to leave behind another swarm of lost souls, oh *Commander?*"

Source: `chapter3.rpy:2278-2287`.

### 6.3 First hit — Charles route variant

> **Mysterious Voice:** "No, the ones you left behind are long gone, *Doctor.*"
> **Mysterious Voice:** "Lost souls, escaping reality for a better place."
> **Mysterious Voice:** "But, we both know that it is not a better place, is it?"
> **Mysterious Voice:** "The dark abyss awaits. Endless nothing, no possiblities and no future."
> **Mysterious Voice:** "The sheperd leads the lamb from danger."
> **Mysterious Voice:** "But the wolf in sheeps clothing, leads the lambs to their demise."
> **Mysterious Voice:** "If knowledge is power, why are you so powerless?"

Source: `chapter3.rpy:2291-2299`.

### 6.4 First hit — John route variant

> **Mysterious Voice:** "No, you are still a lost soul."
> **Mysterious Voice:** "Did you really think you would find what your heart yearns here, in the endless void of space, John?"
> **Mysterious Voice:** "For someone who leaves their path, and their family behind, you boast a lot."
> **Mysterious Voice:** "A family relying on you, and a family to be made."
> **Mysterious Voice:** "Things that will never happen, after your selfish actions."
> **Mysterious Voice:** "They will haunt you, it does not matter how far away from home you flee."
> **Mysterious Voice:** "Home, is still home."
> **Mysterious Voice:** "Keep running, you'll find yourself far away from yourself. Far away from safety."

Source: `chapter3.rpy:2301-2310`.

### 6.5 Second hit — Mike route (player-directed taunts)

> **Mysterious Voice:** "Resting, pretending to be happy and safe."
> **Mysterious Voice:** "Satisfied, after a day of being fed lies."
> **Mysterious Voice:** "Trapped in a cage, between two worlds."
> **Mysterious Voice:** "No escape, no safety."
> **Mysterious Voice:** "You think them your friends, but they are little else than bloodthirsty beasts."
> **Mysterious Voice:** "Waiting for the chance to strike, and devour you."
> **Mysterious Voice:** "There will be nothing left but bones, and lost dreams."
> **Mysterious Voice:** "You dream of flying in space, and exploring another world on wings. Wings that are not yours."
> **Mysterious Voice:** "I will catch you, and break those wings. You will never fly, instead you will fall."
> **Mysterious Voice:** "Fall into a pit of despair, and darkness."
> **Mysterious Voice:** "The endless dark, that will be your grave. The endless void of space."
> **Mysterious Voice:** "With no color, and no future."
> **Mysterious Voice:** "But. That does not scare you, does it?"
> **Mysterious Voice:** "You, who had no future to look forward to, to begin with."
> **Mysterious Voice:** "Become nourishment for the beasts that have led you to destruction."
> **Mysterious Voice:** "At least then, you will be useful."
> **Mysterious Voice:** "And in that way, at least someone will want you."
>
> **You (inner thought):** "That's not true..."
> **You (inner thought):** "[varStory_route] likes me."
>
> **Mysterious Voice:** "Do you truly believe that?"
>
> **You (inner thought):** "..."
> **You (inner thought):** "Right?"
>
> **Mysterious Voice:** "A man filled with sorrows and loss has nothing to hide, other than a dark past."
> **Mysterious Voice:** "You are nothing but another soul to add to the stream of lost souls he has built his legacy upon."

Source: `chapter3.rpy:3866-3896`.

### 6.6 Second hit — John route (player-directed taunts)

The John route repeats the opening twice and adds a self-worth attack:

> **Mysterious Voice:** "Resting, pretending to be happy and safe."
> **Mysterious Voice:** "Satisfied, after a day of being fed lies."
> *(repeats)*
> **Mysterious Voice:** "Resting, pretending to be happy and safe."
> **Mysterious Voice:** "Satisfied, after a day of being fed lies."
> **Mysterious Voice:** "You are nothing to them, other thank a hunk of flesh."
> **Mysterious Voice:** "Brought here to feed their desires. Their wants."
> **Mysterious Voice:** "And then, you will be nothing. Thrown aside. Worthless."
> **Mysterious Voice:** "Trapped in a cage, between two worlds."
> **Mysterious Voice:** "No escape, no safety."
> **Mysterious Voice:** "You think them your friends, but they are little else than bloodthirsty beasts."
> **Mysterious Voice:** "Waiting for the chance to strike, and devour you."
> **Mysterious Voice:** "There will be nothing left but bones, and lost dreams."
> **Mysterious Voice:** "You dream of flying in space, and explore another world on wings that are not yours."
> **Mysterious Voice:** "I will catch you, and break those wings. You will never fly, instead you will fall."
> **Mysterious Voice:** "Fall into a pit of despair, and darkness."
> **Mysterious Voice:** "The endless dark, that will be your grave. The endless void of space."
> **Mysterious Voice:** "With no color, and no future."
> **Mysterious Voice:** "But. That does not scare you, does it?"
> **Mysterious Voice:** "You, who had no future to look forward to, to begin with."
> **Mysterious Voice:** "Become nourishment for the beasts that have led you to destruction."
> **Mysterious Voice:** "At least then, you will be useful."
> **Mysterious Voice:** "And in that way, at least someone will want you."
>
> **You (inner thought):** "That's not true..."
> **You (inner thought):** "[varStory_route] likes me."
>
> **Mysterious Voice:** "Do you truly believe that?"
>
> **Narrator:** "You think back to the evening you just spent with John."
>
> **You (inner thought):** "I do."
>
> **Mysterious Voice:** "Do not kid yourself."
> **Mysterious Voice:** "You are nothing but another soul to add to the stream of death your so called friends have built their legacy upon."

Source: `chapter3.rpy:5577-5610`.

### 6.7 Second hit — the Rex sequence (both routes)

The voice turns from the player to Rex and recites his past.

> **Mysterious Voice:** "Rex."
>
> **You:** "Did it just... say your name?"
>
> **Mysterious Voice:** "When you were a boy, you dreamt of the stars. And what do you have now?"
> **Mysterious Voice:** "You were told the sky was the limit. To not reach further."
> **Mysterious Voice:** "Yet, you did. And what did you, and the others bring back?"
> **Mysterious Voice:** "Death, and destruction. Nothing else."
>
> **Rex:** "Don't focus on it, [player]."
>
> **Mysterious Voice:** "You thought yourself an adventurer, charting unknown lands and bringing in the future."
> **Mysterious Voice:** "In reality, you're nothing more than a virus. Spreading your disease across the universe."
>
> **Mysterious Voice:** "Your world died, and the stars you reached for just watched."
> **Mysterious Voice:** "Did the stars weep for your world, as its shine faded?"
>
> **Rex:** "No..."
>
> **Mysterious Voice:** "Can you feel the grasp of Death, that you tried to push upon others?"
> **Mysterious Voice:** "The tight feeling, constricting around your neck."
> **Mysterious Voice:** "Crushing your airpipe, as your dreams fizzle out like that last breath of air."

Source: `chapter3.rpy:3929-3955` (Mike route, in person) and `chapter3.rpy:5655-5673` (John route, over the navigator).

### 6.8 Second hit — the war sequence

As the player runs to find Rex's target:

> **Mysterious Voice:** "What starts a war? People?"
> **Mysterious Voice:** "Dreams of glory, and exploration?"
> **Mysterious Voice:** "No, it is conquest. You take from others. You do not make it yourself."
> **Mysterious Voice:** "And that is your legacy."
> **Mysterious Voice:** "An atrocity, paid for in the blood of the innocent."
> **Mysterious Voice:** "Remember, oh adventurer. It is not the war itself, but rather who is behind it."

Source: `chapter3.rpy:3972-3977`, `5686-5691`.

### 6.9 Chapter 4 — "Mysterious Voice" lines (likely Endless White)

> **Mysterious Voice:** "The mask of wishes, cracking already?"
> **Mysterious Voice:** "See who you are without it. Scared. Alone. Inexperienced."

Source: `chapter4mike.rpy:1529-1530`.

> **Mysterious Voice:** "A rope, hanging far above the ground. Almost in reach."
> **Mysterious Voice:** "But is it a noose or a lifeline?"

Source: `chapter4mike.rpy:1612-1613`.

### 6.10 Chapter 4 — Endless White recognition

> **Mysterious Voice:** "You. We know you."
> **Mysterious Voice:** "Not enemy, not friend."
> **Mysterious Voice:** "A passenger."

Source: `chapter4mike.rpy:2282-2284`.

> **Narrator:** "It is why you heard us when the 'specter' hit. You already had me with you."

Source: `chapter4mike.rpy:6544`.

---

## 7. Engineering data: flags, branches, files, and assets

### 7.1 The `mv` character definition

```renpy
define mv = Character(_("Mysterious Voice"), image="imageGui_sideImageBlank",
    what_prefix='"{sc=1.1}', what_suffix='{/sc}"',
    window_background="varGui_talkBoxSet", nameBox_background="nameBox",
    who_outlines=[ (2, "#000000", 1, 1)],
    what_outlines=[ (1, "#000000", 1, 1) ])
```

Source: `scripts/script.rpy:78`.

- Displayed name: **Mysterious Voice**
- `{sc=1.1}` = small-caps styling
- No `color` set, so it uses the default text color (white)
- Same object used for the Specter, the Endless White, and intrusive thoughts.

### 7.2 Relevant flags

| Flag | Default | Set/used in | Meaning |
|---|---|---|---|
| `varStory_huggedMike` | `True` | `script.rpy:344`, `chapter3.rpy:2534/2543` | Whether the player hugged Mike after the first hit. |
| `varStory_rexTarget` | `"Mike"` | `script.rpy:345`, `chapter3.rpy:3440/3450/3460` | Who the player named as most important; who Rex fixates on. |
| `varStory_rexAlive` | `True` | `script.rpy:346`, `chapter3.rpy:3980-3983/4251-4254`, `script.rpy:867-870` (quick start) | Whether Rex survives the second hit. |
| `varStory_rexAffection` | 0 | `chapter3.rpy:2655/2745/3338/3550/3916` | Relationship score; `>= 3` keeps Rex alive (Mike route only). |
| `varStory_quickstartRexQuestion1` | — | `quickstart.rpy:42` | "Too Calm" vs "I wish I'd stayed at home." |
| `varStory_quickstartRexQuestion2` | — | `quickstart.rpy:43` | "Angels and Demons" yes/no. |
| `varStory_quickstartRexQuestion4` | — | `quickstart.rpy:46` | Second-hit "are you alright" yes/no. |
| `varGui_creepyTextBox` | `False` | `script.rpy:298`, `chapter3.rpy:2242/2520/2594/2632`, `chapter4mike.rpy:2265/2448` | Toggles the flickering text box. |
| `varStory_route` | `"none"` | `script.rpy:478` | Mike / Charles / John / Nick route. |
| `varStory_absorbedEndlessWhite` | `False` | `script.rpy:362` | Whether the player accepted the Endless White's offer (Chapter 4). |

### 7.3 How `varStory_rexTarget` is chosen

In the Chapter 3 cafeteria conversation with Rex:

```renpy
menu:
    rex smile "Then, who do you think is the most important, for this mission? Pick one of the people who came to meet you on Earth, to simplify things."
    "Commander Mike Steel":
        $ varStory_rexTarget = "Mike"
    "Doctor Charles Stevenson":
        $ varStory_rexTarget = "Charles"
    "John Maddox, the Engineer":
        $ varStory_rexTarget = "John"
```

Source: `chapter3.rpy:3438-3460`.

Rex's own answer is the player, but he accepts the player's choice as "logical" (`chapter3.rpy:3467-3469`).

### 7.4 How Rex's survival is calculated

Mike route, before the confrontation:

```renpy
if varStory_rexAffection >= 3:
    $ varStory_rexAlive = True
else:
    $ varStory_rexAlive = False
```

Sources: `chapter3.rpy:3980-3983` (Charles-target branch), `chapter3.rpy:4251-4254` (non-Charles branch).

John route: no equivalent assignment in the second-hit block, so `varStory_rexAlive` stays at its default `True` (`script.rpy:346`). This is likely a bug or an unfinished branch.

Quick-start path: `script.rpy:867-870` recalculates it from the quick-start answers.

### 7.5 Affection opportunities relevant to Rex

| Source | Choice | Points |
|---|---|---|
| `chapter3.rpy:2652-2655` | "Too calm" after the first hit | +1 |
| `chapter3.rpy:2743-2745` | "No" to Angels/Demons | +1 |
| `chapter3.rpy:3338` | Offer to cook for everyone | +1 |
| `chapter3.rpy:3550` | "Nope, all good" to Geralt | +1 |
| `chapter3.rpy:3912-3916` | "I'm alright" after the second hit | +1 |

At least 3 of these are needed for Rex to survive on Mike's route.

### 7.6 Branch flow for the second hit

```
Second hit
├─ varStory_route == "Mike"
│  ├─ varStory_rexTarget == "Charles"
│  │  ├─ player calls Charles (no answer)
│  │  ├─ player calls Mike
│  │  ├─ Mike intercepts Rex at Charles's room
│  │  ├─ Rex stabs Mike
│  │  └─ varStory_rexAlive = (rexAffection >= 3)
│  └─ else (Mike or John target)
│     ├─ player calls Mike (no answer)
│     ├─ player runs to captain's quarters
│     ├─ Rex stabs Mike
│     └─ varStory_rexAlive = (rexAffection >= 3)
└─ varStory_route == "John"
   ├─ varStory_rexTarget == "Charles"
   │  ├─ John and player go to Charles's room
   │  ├─ John talks Rex down and disarms him
   │  ├─ no stabbing
   │  └─ Rex survives (varStory_rexAlive default True)
   └─ else (Mike or John target)
      ├─ John and player go to captain's quarters
      ├─ Rex stabs Mike
      ├─ John pulls Rex off
      └─ varStory_rexAlive default True
```

**Inconsistencies / likely bugs in 0.8:**

- In the John route, `varStory_rexAlive` is never recalculated, so Rex always survives even after stabbing Mike.
- In both routes, if Rex's target is John, the confrontation still defaults to Mike's quarters (or Charles's room in the Charles branch). Rex never actually confronts John in the scripted violence.
- The Charles route has a first-hit taunt variant but no matching call/explanation branch.
- `chapter3.rpy:2632` has a developer note: `# If not Mike or John route. Should set somewhere appropriate for Charles.` — confirming the Charles route's creepy-text-box cleanup is unfinished.

### 7.7 File map

| File | Role |
|---|---|
| `chapters/chapter3.rpy` | First hit, observation-deck briefing, second hit, Rex's breakdown, aftermath. The bulk of Specter content. |
| `chapters/chapter4mike.rpy` | Rex's account, Rex's fate, Endless White revelation, Chapter 4 voice lines. |
| `screens/quickstart.rpy` | Quick-start flags for Specter-related choices. |
| `screens/cggallery.rpy` | Rex observation-deck CG, unlocked "when the specter hits." |
| `screens/musicroom.rpy` | "The Specter Strikes" track listing. |
| `definitions/audio_definitions.rpy` | `audio.music_theSpecterStrikes` definition. |
| `definitions/imagedefinitions.rpy` | Flickering text box ConditionSwitch. |
| `scripts/script.rpy` | `mv` character, flags, quick-start logic. |
| `scripts/glitch_tag.rpy` | `{glitch=...}` text effect used in Chapter 4 voice lines. |

### 7.8 Audio

| Track | File | Used for |
|---|---|---|
| **The Specter Strikes** | `audio/music/The Specter Strikes.ogg` | Rex's breakdown/confrontation (`chapter3.rpy:4042`, `4286`, `5685`). |
| **Echoes from the Void** | `audio/music/Echoes from the void.ogg` | First hit (`chapter3.rpy:2257`). |
| **The Endless White** | `audio/music/The Endless White.ogg` | Second hit / voice (`chapter3.rpy:3865`, `5576`). |
| **Ash and Snow** | `audio/music/Ash and Snow.ogg` | Aftermath (`chapter3.rpy:4161`, `4413`, `5822`, `6098`). |

The music-room entries for "The Specter Strikes" are at `screens/musicroom.rpy:187` and `227`.

### 7.9 Visual / UI

- **Flickering text box:** `varGui_creepyTextBox = True` swaps the normal talk box for `imageGui_talkboxNew_flicker` and the narrator box for `imageGui_talkboxNarratorFlicker` (`definitions/imagedefinitions.rpy:735-741`).
- **Red overlay:** `show imageScene_colorOverlay red` at the first and second hits.
- **Screen shake:** `transformShakeHorizontal` on Rex/Mike, `transform_transformShakeHorizontalBig` on Rex's breakdown.
- **Small caps:** `mv`'s `what_prefix='"{sc=1.1}'`.
- **Glitch text:** `{glitch=1.0}`, `{glitch=0.3}` in Chapter 4's voice lines.
- **CG:** `imageCG_rexObservationDeck` (`cgs/cg_rexObservationDeck.png`), gallery entry at `screens/cggallery.rpy:36` — "Rex in the Observation Deck", artist **HugeCookie**, location text: *"Found in chapter 3 when the specter hits."*

---

## 8. Analysis, connections, and open questions

### 8.1 What is the SP3-CTR, really?

The script gives a consistent surface answer:

- An **old Arctonian weapon** (`chapter3.rpy:2505`)
- From a **past war** (`chapter3.rpy:2496`)
- Supposed to be **inert, collected, and disabled** (`chapter3.rpy:2507`)
- Supposed to be **nowhere near this region of space** (`chapter3.rpy:2508`)
- **Not designed with humans in mind** (`chapter3.rpy:3747`)
- A **psychological weapon** meant to **disorder armies** (`chapter3.rpy:3730`)

It does not expand the acronym. There is no codex entry. The name is delivered as a technical designation Mike has memorized.

### 8.2 Is it the same thing as the Endless White?

No — but they are connected in the player's case.

| | SP3-CTR / Specter | The Endless White |
|---|---|---|
| Nature | Old Arctonian psychological weapon | Ancient entity/weapon, "a storage, for matter and sequences, for states of life" (`chapter4mike.rpy:6481`) |
| Origin | Arctos, past war | The creators; has been to Earth "in another timeline" (`chapter4mike.rpy:6468`) |
| Method | Voices, visions, smells, hallucinations; latches onto fears/regrets | Absorbs life; communicates telepathically; can entangle "paths" |
| Goal | Disorder armies; scare | End its own suffering; revenge on "the creations" |
| Player link | Hits the player twice | Has been with the player since childhood; explains why the player heard the Specter |

The key bridge is `chapter4mike.rpy:6544`: *"It is why you heard us when the 'specter' hit. You already had me with you."*

### 8.3 Why Rex?

Rex is the perfect target:

- He has massive guilt about Arctos's history (`chapter4mike.rpy:193-199`).
- He already has depression/suicidal ideation (`chapter3.rpy:4082`).
- He believes he is responsible for dragging the player into danger (`chapter3.rpy:4049`).
- He is a soldier with access to a weapon (`chapter3.rpy:4074`).
- The Specter "intensified those thoughts by a million" (`chapter4mike.rpy:210`).

The weapon does not invent his trauma; it amplifies it until his coping mechanisms fail.

### 8.4 Why the player?

The player is human, not Arctonian. The weapon "wasn't designed with humans in mind" (`chapter3.rpy:3747`). The first hit latches onto the route character because the player has no Arctos memories of their own (`chapter3.rpy:2666`). The second hit is more direct — and the Endless White shard inside the player is the likely reason the player can hear it at all.

### 8.5 The "Angel/Demon" folklore

The names are old soldier's tales, not technical terms:

- **Angel** = a lost loved one. Comforting in a cruel way.
- **Demon** = a living loved one, or someone not seen. A bad omen.

Rex believes the "Demon" side is what breaks strong people, because it makes them fear that someone they care about is in danger (`chapter3.rpy:2718`). Mike thinks both are soldier's tales, but agrees the mechanism is fear/regret (`chapter3.rpy:3728-3730`).

### 8.6 The "two or three times" forecast

Mike predicts two or three hits over the coming weeks (`chapter3.rpy:2517`). The player gets two on-screen hits in Chapter 3. A third may be planned for later chapters (the 0.8 build ends in Chapter 4). The script does not show a third hit.

### 8.7 Who deployed it, and why on the Firefly?

Unanswered in 0.8. The characters treat it as impossible:

- It should be inert.
- It should be disabled.
- It should be nowhere near the Firefly.
- The ship's alerts did not warn them (`chapter3.rpy:2577`).
- John suspects the ship is "firing these on itself" (`chapter3.rpy:5837`).

This is an open plot thread. Possible explanations the script dangles:

- A malfunction in the Firefly's systems.
- Sabotage.
- The weapon is not as inert as believed.
- Something on the ship is attracting/activating them.

### 8.8 The "creators"/"masters" thread

The Endless White says it was made by "the creators" and that "their masters were our masters" (`chapter4mike.rpy:2362-2365`). This is Endless White lore, not Specter lore, but it broadens the setting: Arctos may have been developed with outside help (`chapter4mike.rpy:2489`). Whether the SP3-CTR is also a creator-made relic is not stated. The surface text says it is an Arctonian weapon, so the safer reading is: Arctonians made the Specter; the creators made the Endless White.

### 8.9 Unanswered questions

- What does **SP3-CTR** stand for?
- Who exactly deployed the Specters near the Firefly?
- Why did the second hit target Rex by name when the first targeted the route character?
- Is the voice the SP3-CTR, the Endless White, or a fusion of both?
- Did the player's childhood Endless White shard make them uniquely vulnerable, or uniquely resistant?
- Will there be a third hit?
- What is the connection between the Specter and the War of Aggression?
- Why did the alerts fail?
- Is the "Demon" omen literal (does it predict real danger), or is it just the weapon's fear effect?

---

## 9. Appendix — index of all Specter-related lines

A quick reference of every file/line that mentions the Specter or SP3-CTR in the extracted `.rpy` sources.

### `chapters/chapter3.rpy`

| Line | Speaker | Text |
|---|---|---|
| 2324 | Mike | "The voice. The specter. It has a few names. It's rarely a pleasant experience." |
| 2343 | John | "I take it you heard the creepy voice? The Angel." |
| 2389 | Mike | "The voice. The specter. It has a few names. It's rarely a pleasant experience." |
| 2488 | Mike | "I'm sorry [player]. What you just experienced is called a Specter." |
| 2496 | Mike | "It's a relic of the past. An old inert weapon from a past war." |
| 2497 | Rex | "It's like running into an old landmine." |
| 2505 | Mike | "The SP3-CTR is a relic of an old weapon from Arctos." |
| 2507 | Mike | "They're supposed to all have gone inert months ago, aside from also being picked up and disabled." |
| 2508 | Mike | "And there aren't supposed to have been any at all this far from Arctos." |
| 2512 | Mike | "Well, there's no physical damage. But there can be some strong reactions." |
| 2517 | Mike | "Yes, it's a good thing. Remember that you're fine. This thing will probably hit two or three times in the coming weeks before it's all over." |
| 2560 | Mike | "About the SP3-CTR, the specter. Or in layman's terms, an 'Angel'." |
| 2561 | Mike | "Everyone usually experiences something different, it can be anything from a smell, to a voice or a vision." |
| 2563 | John | "Some even experience hallucinations." |
| 2564 | Mike | "It's rarely as benevolent as what the nickname suggests." |
| 2565 | Mike | "If you experienced something weird, talking about it usually helps." |
| 2577 | Mike | "John, I'd like you to investigate why none of our alerts warned us against the specter." |
| 2608 | Rex | "It's not an easy experience to get hit by a specter for the first time." |
| 2638 | Rex | "I'll have to ask you to excuse my state of dress, I rushed here as soon as I noticed the specter." |
| 2706 | Rex | "Earlier, you mentioned you were able to stay calm because the Specter wasn't relating to you." |
| 2708 | Rex | "A Specter has many nicknames, the most famous one being an Angel." |
| 2715 | Rex | "The other side of them, is usually called a 'Demon'." |
| 2720 | Rex | "That's why it's important to know about it. It is what it is, a weapon meant to scare you and create panic." |
| 2932 | Charles | "Logical thinking would deem that the case. I guess it's not too bad if you don't have all that many memories of other specters." |
| 3720 | You | "Then... If it's alright, will you tell me what your opinion on the Specter is?" |
| 3746 | You | "What I heard, when the specter appeared was something I didn't recognize." |
| 3872 | You (inner thought) | "It's the voice again. The Specter." |
| 3996 | You (inner thought) | "Someone could be in real trouble from the specter." |
| 4003 | You | "Rex came by my room just after the Specter hit, and was acting strange." |
| 4195 | Mike | "Some people carry a lot of weight, and with that, something like the Specter can have a devastating effect." |
| 4447 | Mike | "Some people carry a lot of weight, and with that, something like the Specter can have a devastating effect." |
| 4607 | Mike | "Desperation makes people do strange things. And then there was the Specter." |
| 5584 | You (inner thought) | "It's the voice again. The Specter." |
| 5637 | John | "A specter should not be able to hit the Firefly, with all the safeguards in place." |
| 5744 | Narrator | "Your mind flashes back to the explanation about specters he gave you. How some people even experience hallucinations." |
| 5865 | Narrator | "You wait as John explains to him what he found out about the specter. And what happend to Rex." |
| 5873 | Mike | "Some people carry a lot of weight, and with that, something like the Specter can have a devastating effect." |
| 5994 | John | "Rex, remember that it's not real. It's the specter. What matters is here, now. You, me, and the rest of the crew." |
| 6126 | Mike | "Some people carry a lot of weight, and with that, something like the Specter can have a devastating effect." |
| 6195 | You | "That sounds more scary than a specter." |
| 6250 | You | "Not sure I should ask, but how's it going with the specter?" |
| 6450 | You | "Hey John, about the specter..." |
| 6467 | John | "The SP3-CTR latches on to what it can. It's a weapon, it's supposed to scare you." |

### `chapters/chapter4mike.rpy`

| Line | Speaker | Text |
|---|---|---|
| 210 | Rex | "Then the specter hit. It intensified those thoughts by a million. It was as if I had the chance to turn back time and undo my biggest regrets." |
| 295 | You (inner thought) | "It's more of a normal day, like before the specter." |
| 366 | Rex | "Then the specter hit. It intensified those thoughts by a million. It was as if I had the chance to turn back time and undo my biggest regrets." |
| 442 | You (inner thought) | "It's more of a normal day, like before the specter." |
| 539 | Shawn | "Shouldn't have been a specter here to begin with." |
| 559 | Rex | "Then the specter hit. It intensified those thoughts by a million. It was as if I had the chance to turn back time and undo my biggest regrets." |
| 608 | You (inner thought) | "It's more of a normal day, like before the specter." |
| 623 | You (inner thought) | "Why was there a specter there?" |
| 633 | Narrator | "Things are closer to how they were before the specter." |
| 6544 | Narrator / Endless White | "It is why you heard us when the 'specter' hit. You already had me with you." |

### `screens/quickstart.rpy`

| Line | Text |
|---|---|
| 41 | "After the Specter Hit, did you hug Mike?" |
| 42 | "When Rex asked how you were feeling after the specter, what did you say?" |
| 43 | "When Rex asked if you believed in 'Angels and Demons', did you?" |
| 46 | "When Rex asked if you were feeling alright during the second Specter hit, were you?" |

### `screens/cggallery.rpy`

| Line | Text |
|---|---|
| 36 | "Found in chapter 3 when the specter hits." |

### `screens/musicroom.rpy`

| Line | Text |
|---|---|
| 187 | `varBackend_musicRoom.add("audio/music/The Specter Strikes.ogg", ...)` |
| 227 | `("The Specter Strikes", "audio/music/The Specter Strikes.ogg")` |

### `definitions/audio_definitions.rpy`

| Line | Text |
|---|---|
| 43 | `define audio.music_theSpecterStrikes = "audio/music/The Specter Strikes.ogg"` |

---

## 10. Final notes

- The Specter is a **psychological weapon**, not a ghost or monster. The horror comes from what it makes people feel and do.
- Its two folkloric names, **Angel** and **Demon**, map to the two ways it hurts people: grief for the dead, and fear for the living.
- Its most important victim in the story is **Rex**. The second hit weaponizes his guilt and depression, nearly destroys him, and can kill him.
- The **Endless White** twist reframes the player's experience: the voice may have been the shard inside them all along, or the shard may have been the reason they could hear the weapon. The script deliberately leaves both readings open.
- The 0.8 build leaves several threads unresolved: who deployed the Specters, why the alerts failed, what SP3-CTR stands for, and whether a third hit is coming.

If you want, I can also produce:
- a **timeline** of the two hits with exact in-game day/night markers,
- a **choice map** for every Rex affection point and its consequences,
- or a **clean JSON** of every Specter line for reuse in a wiki/tool.
