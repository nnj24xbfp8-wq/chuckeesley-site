---
title: "Proxy-Expert Practice: Teaching a Skill You Can Only Learn From an Expert"
description: "A Stanford Accelerator for Learning grant funds work on expertise-gated skills — the ones you can only practice against someone who knows enough to refuse a shallow answer."
pubDate: "Aug 7 2026"
badge: "NEWS"
tags: ["entrepreneurship", "ai", "teaching", "research"]
---

Some skills can only be learned by practicing them against an expert. Entrepreneurial problem validation is one. Clinical diagnosis, legal client intake, and diplomatic negotiation are others. What they share is that your competence only becomes visible when someone who actually knows the domain refuses to accept a shallow framing of the problem. I have taken to calling these expertise-gated skills.

Teaching them is not the hard part. A student can read Rob Fitzpatrick's *The Mom Test*, work through Steve Blank's customer discovery material, complete every case in the syllabus, and then fall apart in the first ten minutes with a live problem-holder. The instruction is fine. What is missing is practice.

Practice gets rationed twice over. Expert time is scarce, and it is distributed unevenly: students inside well-resourced institutions and dense professional networks get plenty of it, and everyone else gets very little. Then, even when an expert is in the room, the social situation suppresses the exact behaviors a novice most needs to rehearse. Asking the naive question. Disagreeing out loud with someone more senior. Being visibly wrong four times in a row. Ericsson's work on deliberate practice tells us that repeated failure with feedback is the mechanism, and Brown, Collins, and Duguid tell us it has to happen inside a real community of practice. Case studies freeze the problem in amber. Peer role-plays have no expertise in them. And no real problem-holder is going to sit patiently through a student's fourth clumsy attempt.

The Stanford Accelerator for Learning has funded a project going at that bottleneck. **Proxy-Expert Practice** is one of twelve projects selected under the [AI in Teaching and Learning at Stanford: Innovation with Evidence](https://acceleratelearning.stanford.edu/funding/ai-in-teaching-and-learning-at-stanford-innovation-and-evidence-grants/) grants. I am running it with **Itai Ashlagi**, and with PhD students **Yikai Cao** and **Xilan Zhang**.

### What a proxy expert is

Not a tutor and not a simulated population. A proxy expert is an AI instantiation of one specific, consenting, named person's representation of a problem, built from multi-session discovery interviews with that person.

Our source experts are fellows at Stanford's Distinguished Careers Institute, who are taking part as research partners rather than as subjects. DCI fellows are accomplished people in the middle of a deliberate career change, which makes them unusually well suited to this: decades of depth in a domain, combined with a live willingness to rethink its problems instead of defending settled positions.

Students engage the proxy the way they would engage the fellow, and they fail against it repeatedly at no social cost. Then they meet the actual person. The proxy was never the destination. It is rehearsal, and the point of rehearsal is to make the scarce human contact worth more when it finally happens.

Three agents do the work. One conducts the discovery interviews and decides when to probe further and which parts of the picture are still thin. One embodies the resulting representation, resisting weak framings with counter-questions and, importantly, holding on to the fellow's own uncertainty rather than inventing confidence where the fellow had none. The third generates adversarial probes: plausible-but-wrong restatements that a student has to tell apart from accurate ones, so that nobody passes by pattern-matching the vocabulary back at it.

### Why the framing matters

Educational AI has mostly settled into three roles. The model tutors, or it assists with writing, or it simulates a population so you can predict behavior in aggregate. Sam Shaikh and colleagues' Rehearsal work grounds LLM interlocutors in theory for interpersonal skill practice; the Generative Agents line from Joon Sung Park and colleagues simulates populations.

What we are proposing is a fourth thing: AI as an embodied problem, held at arm's length for the learner to grapple with. It differs from the others on three counts. It is grounded in one named individual's articulated view rather than a theory or an average. It verifies against that individual's own articulation. And it treats transfer to a live human conversation as the measure of success, rather than how realistic the simulation feels.

That last point is the one I care most about, and it is the question the field has answered least. Do gains from AI-mediated practice actually transfer to real expert engagement? Our primary outcome is the quality of the subsequent human interaction. If the proxy does not improve the real encounters, we will report that.

### The part that could go wrong

The obvious failure mode is a proxy that is confidently wrong, or that flattens a real person into a caricature of themselves. We have tried to design against it: proxied experts review and correct their own representation and hold veto over it before any student sees it, and the proxy is built to preserve their uncertainty rather than paper over it. Whether that is sufficient is an empirical question, not a settled one.

If the approach holds up, it should generalize past entrepreneurship to any project-based course where the scarce resource is access to someone who genuinely knows the domain. There are a lot of those. The work runs for 14 months through my courses at Stanford, and I will write up what we learn, including the parts that fail.

### Next: Shenzhen

Separately, I am in Shenzhen from **August 20 to September 10** as Faculty Director of the Stanford BOSP Shenzhen Global Seminar. Fifteen Stanford undergraduates will spend three weeks on how the Shenzhen hardware ecosystem actually works, building hardware startups alongside **InnoX**.

This will be my fifth trip there. The first was in 2017, then 2019, then 2023, then a short visit this past June for a paper development workshop at CUHK-Shenzhen. Every one of those was a matter of days. Three weeks is long enough to work in a place rather than look at it, and the difference between the 2017 version of the city and the current one is large enough that I have stopped trusting my older impressions.

I have been reading Juan Du's *The Shenzhen Experiment* to prepare. It is very good on the institutional history, and a corrective to the story everyone repeats about a fishing village transformed overnight by central-government decree. The provincial politics mattered, and there was considerably more there before 1979 than the myth allows.
