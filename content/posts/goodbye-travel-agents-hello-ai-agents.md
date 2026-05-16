+++
date = '2026-05-16T00:00:00+09:00'
draft = false
publishdate = '2026-05-16T00:00:00+09:00'
tags = ['ai', 'claude-code', 'codex', 'happy', 'mcp', 'wanderlog', 'flutter', 'travel', 'japan', 'productivity', 'workflow']
title = 'Goodbye Travel Agents, Hello AI Agents'
thumbnail = '/images/goodbye-travel-agents-hello-ai-agents/cover.jpg'
+++

I'm writing this on the [Shinkansen](https://en.wikipedia.org/wiki/Shinkansen) heading to Osaka, halfway through a solo 10-day trip across Japan that I planned almost entirely with AI agents.

This post isn't about how AI can write a generic itinerary — anything can do that now. It's about the small, weirdly clever ways agents earned their keep on this trip: rewriting the itinerary in place so my own trip viewer would render the day correctly, cross-referencing Reddit, YouTube transcripts, and official sources on its own to validate each leg, optimizing a 7-hour layover down to the minute, and replanning the afternoon when check-in finished early.

<!--more-->
<!-- toc -->

> [!NOTE]
> This article was co-created with **Claude Opus 4.7 Max**. It has been human-reviewed and iteratively revised to my liking — still through AI, in the same conversational loop that powered most of the trip itself. The voice and opinions are mine; the first drafts and clean-up passes are Claude's.

Just me, a [Wanderlog](https://wanderlog.com/) trip, a pile of specific questions, and one orchestrator wiring it together: my own [fork](https://github.com/denysvitali/happy_flutter) of [Happy](https://happy.engineering) ([setup details further down](#the-setup-my-happy-fork)).

## How I used to plan trips

To be honest, I never actually used a travel agent. My planning method was a kind of artisanal scavenger hunt that started with a Google Flights search and spiralled from there: dozens of search tabs, trusting random Reddit reviews from strangers I'd never met, watching hours of YouTube vlogs at 1.5x speed, and reading [Wikivoyage](https://en.wikivoyage.org/) end to end. Whatever survived the filter — a temple, a restaurant, a Shinkansen connection — would land in [Wanderlog](https://wanderlog.com/), my trip-planning home for years. It worked, but it was slow, and the signal-to-noise ratio was rough — for every useful tip there were five outdated ones and a sponsored post pretending not to be. I eventually had to build my own app to make Wanderlog bearable; [more on that further down](#trip-viewer-a-wanderlog-of-my-own).

That whole scavenger-hunt pipeline is what AI agents are now quietly replacing for me. Not because the sources are gone — Reddit, Wikivoyage, and YouTube are still where the knowledge lives — but because I no longer have to *be* the one to ingest, deduplicate, and reconcile it. An agent can read ten YouTube transcripts in the time it would take me to watch one. It can cross-check a Reddit anecdote against the official JR site before I even open a tab. The radical change isn't that AI is smarter than the internet — it's that it does the boring synthesis work I used to do by hand.

My honeymoon followed a long version of the "golden route" — Tokyo, Nikko, Kyoto, Nara, Osaka, Hiroshima, Yokohama, back to Tokyo — researched the old way: great, but pretty close to everyone else's trip. For trip number two I wanted something different: a [Hokuriku](https://en.wikipedia.org/wiki/Hokuriku_region) loop with [Kanazawa](https://en.wikipedia.org/wiki/Kanazawa), an [onsen](https://en.wikipedia.org/wiki/Onsen) night in [Kaga](https://en.wikipedia.org/wiki/Kaga,_Ishikawa), a deliberate detour through Shanghai on the way in and out. The problem with going off-script is that there's no script. You're back to research — comparing trains, checking restaurant queues, double-checking whether your passport actually qualifies for visa-free transit. That's where AI agents stopped being a curiosity and started being genuinely useful.

I've already written about how AI made me [a happier engineer]({{< ref "im-happy-engineer-now" >}}); turns out it also makes me a happier traveler. I'll get to the actual stack later in the post.

## The trip, briefly

10 days, five Japanese stops, one Shanghai detour:

- **Tokyo** — arrival, mid-trip pivot, and final base.
- **Kanazawa** — new territory, anchoring a Hokuriku loop back through places I loved last time.
- **Kaga Onsen** — one night in a ryokan.
- **Osaka** — a long day on the way south.
- **Shanghai** — twice, courtesy of the flight routing. Outbound I left the airport (last year's China trip skipped Shanghai); return stays airside.

Roughly 60 places on the trip, four flights, half a dozen [Shinkansen](https://en.wikipedia.org/wiki/Shinkansen) and limited-express reservations, and exactly zero printed PDFs.

## A 7-hour layover, edited from inside it

The trip starts with a 7-hour Shanghai layover. An earlier session had already brainstormed a candidate route — [Yu Garden](https://en.wikipedia.org/wiki/Yu_Garden), [The Bund](https://en.wikipedia.org/wiki/The_Bund), a sit-down [xiaolongbao](https://en.wikipedia.org/wiki/Xiaolongbao) lunch — so the question for the next session wasn't *what should I do* but the much more useful *am I actually gonna make it?*

What came back wasn't a vague "yes, you have time." It was:

- A check on [PVG](https://en.wikipedia.org/wiki/Shanghai_Pudong_International_Airport) immigration wait times from live data
- Confirmation that my passport qualifies for visa-free transit (and a warning *not* to ask for the 240-hour transit stamp — the 30-day visa-free entry is the right lane)
- [Maglev](https://en.wikipedia.org/wiki/Shanghai_maglev_train) timings vs. metro alternatives
- A queue-aware lunch slot: 11:55 AM at Jia Jia Tang Bao, not 12:15, because the line spikes at noon
- A backup: Lin Long Fang, run by the same family, two blocks away, almost no queue

I followed it almost verbatim. Then, mid-route, I realised I was running ahead of plan, so I opened the session and typed:

{{% msg-user %}}
I'm in Shanghai right now and it's 10:23 — I already visited Yu Garden, The Bund, Nanjing road and I'm now super close to Jia Jia Tang — but it's probably too early for lunch now. What should I do, considering this is my first and likely last time in Shanghai? I still want to get to the airport in time though.
{{% /msg-user %}}

A new mini-itinerary came back tuned to the actual time I had, the actual block I was on, and the hard cutoff for the Maglev back. The pre-trip plan was a starting point; the trip itself got edited while I was inside it.

## Mining YouTube for places guidebooks miss

For a second visit to Japan, the usual recommendation engines are useless — every blog post wants to send you to [Fushimi Inari](https://en.wikipedia.org/wiki/Fushimi_Inari-taisha). So I asked the AI to do something a guidebook can't: download the auto-generated transcripts of a dozen "hidden gems in Japan" YouTube videos and synthesize them.

The pipeline, sketched in a couple of prompts:

1. [`yt-dlp`](https://github.com/yt-dlp/yt-dlp) `--write-auto-subs --skip-download` against a list of video URLs
2. Parse the `.vtt` caption files
3. Cross-reference with relevant Reddit threads (via the `search-mcp` server my agent already had)
4. Deduplicate and rank by how often a place was mentioned

By the time this finished running, most of my actual May 11–20 itinerary was already locked in — so the real payoff was a ranked shortlist of places that *didn't* fit in this trip: a [Tōhoku](https://en.wikipedia.org/wiki/T%C5%8Dhoku_region) road-trip skeleton and a few [Hokkaido](https://en.wikipedia.org/wiki/Hokkaido) anchors, queued up for trip number three. Worth running anyway: the same pipeline will surface much more during pre-trip planning when there's actually space on the calendar.

## Real-time replanning, from wherever I happened to be

Kanazawa, May 14. I finished a morning of sights earlier than expected and suddenly had four hours to kill before my next anchor. "What can I do with the next four hours within walking distance of where I am?" Ten options came back, ranked by time-of-day suitability — [D.T. Suzuki Museum](https://en.wikipedia.org/wiki/D._T._Suzuki_Museum) (better in afternoon light), [Nishi Chaya District](https://en.wikipedia.org/wiki/Higashi_Chaya), a [gold-leaf](https://en.wikipedia.org/wiki/Gold_leaf) workshop with a reservation phone number.

The AI didn't replace the planning; it just made replanning cheap enough that I bothered to do it. The Kaga ryokan check-in below is the canonical example — same idea, longer thread, real MCP mutations at the end.

## Trip-viewer: a Wanderlog of my own

[Wanderlog](https://wanderlog.com/)'s planning model is great; the app itself is painfully slow and the UI hasn't improved in years — I stopped paying for Pro over it.

> [!NOTE]
> **Update, mid-draft:** opening Wanderlog to double-check something for this post, I noticed the app is suddenly snappier. Looks like the update they pushed a few days ago genuinely landed. Credit where it's due.

I'd already taken a stab at fixing this years ago. [`denysvitali/trip-viewer`](https://github.com/denysvitali/trip-viewer) — a small Flutter app that imports a Wanderlog trip and renders it as a timeline, a map, an expense list, and a packing list — has been around for a while. I originally hacked it together using one of the first GPT models through GitHub Copilot, and it's served me well across several trips since. For this trip I gave it a proper revamp with GPT-5.5 — most of the timeline and map rewrite came from a single long session, and the new version finally feels like something I'd ship if it weren't already personal. It refreshes from Wanderlog on pull-to-refresh (and silently in the background after about a week). The planning still lives in Wanderlog; the looking-at-it lives somewhere I (mostly) built, and my trip ends up neatly organized exactly how I want to read it on a phone.

{{< img src="/images/goodbye-travel-agents-hello-ai-agents/trip-viewer.jpg" alt="trip-viewer rendering the Japan trip timeline on mobile" width="360" >}}

There's a catch, though: Wanderlog has no documented public API, and — at least until I built [`wanderlog-cli`](https://github.com/denysvitali/wanderlog-cli) — no MCP either. So before agents could touch anything I took the app apart, figured out how each operation maps to a backend call, and built an MCP server that exposes the right tools on top of it. With that in place, my agents can now modify any trip I own — add places, reorder days, switch a train reservation, leave a note — through structured tool calls. No prompt-engineering a JSON payload, no manual edits, no copy-pasting from chat into Wanderlog's UI.

Here's the loop that emerged during the trip — verbatim from the May 15 thread, the one captured in the screenshot below.

I open the session at the ryokan:

{{% msg-user %}}
I've just arrived at the Ryukan, it's May 15th. Can you readapt my plan based on this information? I think dinner it at 6 PM. Create a proposal first, then, only if I accept it, modify the plan.
{{% /msg-user %}}

The agent comes back with current vs. proposed:

{{% msg-agent %}}
Here's the current May 15 plan vs. where you are now:

**Original (afternoon):**
- 14:00–15:00 mokume woodturning (optional)
- 15:15–16:15 Kakusenkei Gorge Promenade
- 16:15–17:00 Kiku no Yu public bathhouse
- 17:00–17:30 Yamanaka Onsen stroll

**Proposed re-plan** (you've checked in at Kuriya Yasohachi, dinner 18:00):

1. **Drop mokume** — you've skipped that window by arriving at the ryokan.
2. **~15:30–16:30 · Kakusenkei Gorge Promenade** — ~10 min walk north from Yasohachi, the highlight of Yamanaka. Easy 1 km riverside loop with Ayatori Bridge + Korogi Bridge.
3. **~16:30–17:00 · Yuge Kaido stroll** — the lantern-lit shopping street along the gorge, ends at Kiku-no-yu / Yamanaka Onsen square. Short and on the way back.
4. **~17:00–17:45 · Ryokan onsen bath** — soak in Yasohachi's bath before dinner (recommended over Kiku-no-yu since you've paid for the in-house onsen and kaiseki is right after).
5. **18:00 · Kaiseki dinner at Yasohachi.**

Trade-off: this skips the public bathhouse (Kiku no Yu) in favor of the ryokan's own bath — more relaxed, no rushing back wet. If you'd rather do Kiku no Yu, swap step 4 for it (~16:30–17:15) and shorten the gorge walk.

Want me to apply this to the itinerary?
{{% /msg-agent %}}

Meanwhile reality slips:

{{% msg-user %}}
It's 3:33 PM right now and I'm checking in. This might take a while
{{% /msg-user %}}

The agent recalibrates against the slip:

{{% msg-agent %}}
Got it — assuming check-in wraps around 16:00, you've got ~2 hours before dinner. Tighter proposal:

1. **~16:00–17:00 · Kakusenkei Gorge + Yuge Kaido combined** — walk from the ryokan up to the gorge (Ayatori Bridge area), loop back along Yuge Kaido (lantern street). About 1 hour at an easy pace.
2. **~17:00–17:45 · Ryokan onsen bath at Yasohachi** — soak before kaiseki.
3. **18:00 · Dinner.**

Drop mokume, Kiku-no-yu, and the separate Yamanaka Onsen block entirely — not enough runway and they overlap with what you'll see on the gorge/Yuge Kaido walk.

If check-in drags past 16:30 and you're tired, fallback is: skip the outing, head straight to the ryokan bath at ~17:00, dinner at 18:00.

Want me to apply this?
{{% /msg-agent %}}

Reality slips a second time — this time, in my favour:

{{% msg-user %}}
Finished my check-in. It's 3:48 PM now and the dinner is at 7 PM. Plan accordingly. I'll be able to do the Onsen until 1AM (and then again at 5AM)
{{% /msg-user %}}

And the final proposal lands:

{{% msg-agent %}}
More breathing room — ~3 hours before dinner, and onsen can wait until after. Revised:

1. **~16:00–17:15 · Kakusenkei Gorge Promenade** — full loop at a relaxed pace (Ayatori Bridge → Korogi Bridge, ~1.2 km).
2. **~17:15–18:00 · Yuge Kaido + Yamanaka Onsen square** — lantern street stroll, peek at Kiku-no-yu exterior + the foot bath if open.
3. **~18:00–19:00 · Back to ryokan, change into yukata, rest.**
4. **19:00 · Kaiseki dinner.**
5. **~20:30–22:00 · Ryokan onsen** — first soak post-dinner (give the kaiseki ~1 hour to settle).
6. **~05:30 · Sunrise onsen** — second soak when it reopens at 05:00.

Skipping mokume (closed by now) and Kiku-no-yu as a separate bath stop (your ryokan onsen is already booked twice).

Want me to apply this to the itinerary?
{{% /msg-agent %}}

{{% msg-user %}}
Yes
{{% /msg-user %}}

The agent runs through a stack of MCP calls — `Delete Itinerary Block`, `Update Place Visit Time`, `Update Place Notes`, a few of each — and confirms:

{{% msg-agent %}}
Applied. May 15 now reads:

- **Kaga Onsen Station transfer** — marked done (check-in 15:48)
- **16:00–17:15** Kakusenkei Gorge Promenade (full loop)
- **17:15–18:00** Yuge Kaido stroll back to ryokan
- **Kuriya Yasohachi** — 19:00 dinner, ~20:30 onsen, ~05:30 sunrise onsen

Dropped mokume and Kiku-no-yu. Enjoy the gorge.
{{% /msg-agent %}}

A pull-to-refresh in trip-viewer renders the new May 15 in the timeline and on the map.

{{< img src="/images/goodbye-travel-agents-hello-ai-agents/happy-wanderlog-mcp.jpg" alt="Happy fork showing the agent applying the revised May 15 plan: a stack of Wanderlog MCP tool calls (Delete Itinerary Block, Update Place Visit Time, Update Place Notes) followed by a summary of the new day" width="360" >}}

The non-obvious part of all this is *shape-awareness*. Wanderlog will happily accept sloppy data — a hotel filed as a "place to visit", a Shinkansen reservation crammed into the wrong day, a note glued to the back of the wrong activity. A naïve agent left to its own JSON-wrangling would do all of that. So `wanderlog-cli`'s MCP doesn't expose a generic `update_trip(payload)` tool: it surfaces a small, opinionated vocabulary — `add_train`, `add_flight`, `add_place`, `update_place_visit_time`, `delete_itinerary_block` and so on — that mirrors the *shapes* trip-viewer can render. The agent picks the right verb; it doesn't have to invent the JSON.

That cuts out a whole class of errors before they happen, but it doesn't eliminate them entirely. Early on the agent kept filing hotels as `add_place` instead of grouping them under their check-in day; I corrected it once, and the rest of the trip stayed clean.

This is the part I keep coming back to: **the chat is throwaway, the trip is data, and a small app you own is the real surface**. The agent is just the thing that keeps the data clean.

## The setup: my Happy fork

A quick aside on the harness, because the whole trip ran through it.

I've already written about how I became [a happier engineer]({{< ref "im-happy-engineer-now" >}}) thanks to [Happy](https://happy.engineering) — the open-source mobile/web client for Claude Code. I also gave a short talk about that setup at a [Zurich Gophers Meetup](https://www.meetup.com/zurich-gophers/events/312193706/) earlier this year — the [recording is on YouTube](https://youtu.be/f1a_MRLibqU) — walking through the self-hosted deployment, the workspace pods, and the per-provider environment scripts.

Things have only improved since. My current daily driver is my own [fork](https://github.com/denysvitali/happy_flutter), which adds three things I needed badly:

1. **Per-session harness switching, with aggregation.** I can pick [Claude Code](https://www.anthropic.com/claude-code) or [OpenAI Codex](https://openai.com/codex/) per session, and the fork happily aggregates multiple sessions inside the same folder into one view. In-session model swapping is more nuanced: it works when the receiving model isn't picky about a conversation history written by a different model. Anthropic is fussy about that (looking at you, Claude). Kimi 2.6 and Xiaomi's MiMo, on the other hand, take cross-model history in stride, which is what makes mid-conversation model swaps actually useful. No more `tmux`, no more SSH-into-laptop dance — every harness is one tap away.
2. **Model shopping in one tap.** The profile picker exposes the full lineup I've wired up — MiniMax M2.7, DeepSeek V4-Pro and V4-Flash, Z.AI's GLM-5.1, Kimi K2.6, Xiaomi's MiMo, plus the usual Anthropic/OpenAI defaults — all behind an Anthropic-compatible interface. Kimi 2.6 in particular has been a surprise: capable enough to occasionally beat GPT-5.5 and consistently better than the nerfed Opus 4.7, at a fraction of the price. I *could* A/B two models on the same prompt by spinning up parallel sessions; in practice I almost never do — picking the right model upfront and committing to it tends to be enough.
3. **Mobile-native I/O.** I can dictate via offline [speech-to-text](https://en.wikipedia.org/wiki/Speech_recognition) — powered by [sherpa-onnx](https://github.com/k2-fsa/sherpa-onnx), so it keeps working when the connection is spotty and doesn't ship my voice to a cloud STT — glide-type on [Gboard](https://play.google.com/store/apps/details?id=com.google.android.inputmethod.latin&hl=en-US) while walking through a station, or have replies read back to me with offline TTS from the same stack. Session resumption from a cold phone is quick enough that "what should I do with the next two hours?" fires off before the platform clock changes. And the rendering is genuinely good (see the screenshots): tool calls collapse cleanly, code is legible at phone-sized type, and there's no flickering even when long replies stream in.

The companion changes live in a forked **[server + daemon](https://github.com/denysvitali/happy-cli-go)** that I'll be open-sourcing in a follow-up post — the repo isn't public yet, but the link will start working the moment it is.

{{< img src="/images/goodbye-travel-agents-hello-ai-agents/happy-model-picker.jpg" alt="The Happy fork's profile picker, showing the providers I had wired up during the trip: Default (server-configured), MiniMax M2.7, DeepSeek V4-Pro, DeepSeek V4-Flash, Z.AI GLM-5.1, Kimi K2.6, and a Xiaomi MiMo token plan — all exposed through the Anthropic-compatible interface" width="360" >}}

{{< img src="/images/goodbye-travel-agents-hello-ai-agents/happy-web-research.jpg" alt="A mid-trip Osaka session where the agent fans out three Search-mcp Web Read tool calls and then synthesises a 'Why it feels empty' analysis of the day's schedule, all on my phone" width="360" >}}

## "Tokyo to Canada": when speech-to-text gets it wrong

A lot of the on-trip planning happened by voice or by glide-typing into the chat — phone in pocket, walking through a station, dictating instead of typing. I leaned on [sherpa-onnx](https://github.com/k2-fsa/sherpa-onnx) the whole trip; it handles spoken English fluently, but the model is English-trained, so Japanese proper nouns dropped mid-sentence routinely got mapped to whichever English word sounds closest. The funniest example I've collected:

{{% msg-user %}}
I am specifically interested in knowing how to get from Tokyo to **Canada**, one on the first day […] when should I take the train […] from Tokyo station to **Kanazawa**.
{{% /msg-user %}}

The transcript service heard "Canada" the first time and "Kanazawa" the second time, in the same paragraph. A human reading that would do a double-take. The agent didn't. It just answered the question I'd actually asked — Tokyo to Kanazawa on the [Hokuriku Shinkansen](https://en.wikipedia.org/wiki/Hokuriku_Shinkansen), the [Kagayaki](https://en.wikipedia.org/wiki/Kagayaki_(train)) vs the [Hakutaka](https://en.wikipedia.org/wiki/Hakutaka), [JR Pass](https://en.wikipedia.org/wiki/Japan_Rail_Pass) math, jet-lag-friendly departure windows — without flagging the typo or asking me to clarify. The context made the intent obvious, and the agent acted on it.

The practical upshot: I stopped proofreading dictated messages before sending. Saved me a surprising amount of time, especially when walking with one hand full of luggage.

## Two harnesses, different jobs: Claude Code and Codex

I didn't use one harness — I used two, and the split was deliberate.

**Claude Code (running Opus 4.7)** was my travel companion. Voice notes and quick text both, mutations of the Wanderlog trip, layover research, replanning the afternoon when reality slipped — anything stateful and trip-shaped went here, leaning on context from previous days I didn't have to re-explain. Opus's planning instincts and tool-use discipline make it my pick for this kind of work.

**Codex (running GPT-5.5)** got the engineering work — the Flutter and Go code behind [trip-viewer](https://github.com/denysvitali/trip-viewer) and [`wanderlog-cli`](https://github.com/denysvitali/wanderlog-cli), refactors, edge cases in the parser, the rough spots I kept hitting on the road. Focused, repository-rooted work — exactly where Codex + GPT-5.5 shines.

The lesson: having more than one harness isn't redundant. Each one's strongest with a particular model on a particular kind of task; picking the right pair upfront beats forcing one to do everything.

## Key concepts: what made this work

A few patterns kept showing up across all the planning sessions. They're worth naming because I'll use them again on the next trip.

### Treat the AI as a researcher, not an oracle

The useful prompts weren't "plan my trip." They were "given these constraints, validate this assumption with live sources." Web search is doing most of the work — the AI's job is to *frame* the question, run the searches, and reconcile the answers.

### Itinerary as a structured document, not a chat log

Wanderlog was the source of truth. The AI mutated it via an MCP tool, and [trip-viewer](https://github.com/denysvitali/trip-viewer) consumed the same data on my phone. The chat is ephemeral; the trip is data; the viewer is the surface. Inside that data, each day has two or three *hard anchors* — a train, a dinner reservation, a check-in time — and the rest are soft slots the AI is free to rearrange. The separation means I can hand the itinerary to a human (my wife, future me) without making them scroll through a transcript.

### Pipelines beat prompts

The YouTube transcript scraper isn't a clever prompt — it's a tiny pipeline (`yt-dlp` → parse → dedupe). Once you start thinking of trip research as a data problem, the AI stops being a chatbot and starts being a colleague who can write the script.

### Real-time use is the real unlock

Pre-trip planning saved hours. On-trip replanning changed how the trip *felt*. Missed train, queue too long, free afternoon — none of these become stressful when the cost of asking "what now?" is approximately zero.

## What I'd improve next time

Two honest critiques:

- **Claude planned conservatively — or I just moved fast.** A lot of segments were laid out with generous buffers, which had me re-planning mid-trip more than I expected and arriving back from the Shanghai layover comically early. Not a big deal — definitely better than the alternative of missing a flight or a Shinkansen — and I can totally imagine a less-rushed traveler finding the original margins about right. Still, next time I'd nudge the agent to plan a little tighter, or at least flag when its safety margin is bigger than I asked for.
- **My MCP surface is too low-level.** `Delete Itinerary Block`, `Update Place Visit Time`, `Update Place Notes` are honest mappings of Wanderlog's data model, but they leak into the prompts more than I'd like — the agent ends up calling four or five tools to shift one afternoon. A higher-level `replan_day(date, new_anchors)` or `move_block(from, to)` would compress the round-trips, cost less in tokens, and reduce the chance of a half-applied edit when something errors out. That's the next thing I'll add to `wanderlog-cli`.

## Goodbye travel agents

I don't think travel agents are going away *yet*. There's still a market for the *I want someone else to handle this entirely* experience — especially since Japan, for all its competence, makes train reservations absurdly painful. At home in Switzerland I open the [SBB Mobile app](https://play.google.com/store/apps/details?id=ch.sbb.mobile.android.b2c&hl=en-US), pick origin and destination, tap once, and walk onto the train. I never have to think about who runs the line, how many operators the journey crosses, or whether the schedule is current — *one* app, end to end. I'm spoiled. In Japan, [JR West](https://www.westjr.co.jp/global/en/) and [JR East](https://www.jreast.co.jp/multi/en/) are parallel universes with different booking sites, different machines, different rules. JR East lets you load a reservation onto your [IC card](https://en.wikipedia.org/wiki/Suica) and tap through. JR West makes you queue at a specific JR West machine for a paper ticket before you can board the train you've already paid for. Wtf.

But for someone like me, who's always done the planning by hand — search tabs, Reddit threads, YouTube vlogs, Wikivoyage — the calculus has changed. The sources haven't gone anywhere; agents just do the synthesis I used to do, faster, and without skipping the dull pages.

**AI doesn't replace the curiosity. It removes the friction between having a question and getting an answer worth acting on.**

And now, my station is up. Time to explore Osaka! If you happen to be around and want to grab a coffee or a beer, [ping me on X](https://x.com/DenysVitali).
