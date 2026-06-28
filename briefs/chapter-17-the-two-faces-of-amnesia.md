---
title: "Chapter 17: The Two Faces of Amnesia"
---

# The Two Faces of Amnesia
## The Familiar Hook: The Region That Disappeared

There is a place in your body you have forgotten you own.

You will not know which place it is until the floor reminds you. You lie down, attend to the contact between your back and the ground, and somewhere — a patch of the upper thoracic spine, a corner of the sacrum, a segment of the lateral rib cage — a region you had stopped feeling altogether quietly comes back online. It was not painful. It was not tight. It was simply absent. You had stopped holding a map of it, and so you stopped registering it, and the absence registered as nothing at all.

This is the first face of amnesia, and it is not what you have been told it is. The fitness industry calls it "use it or lose it" — the warning that if you neglect a movement, the tissue withers, the range atrophies, the capability is physically removed. That framing is alarmist, and it is wrong. Nothing has been lost. The tissue is still there, the range is still available, the joint still moves. What has vanished is not the territory but the **map** — the sensory-motor chart the central nervous system holds of that region. The territory is intact and recoverable. The chart is gone. And an uncharted region, to the protective system, does not read as "safe but forgotten." It reads as "unknown." An unknown reads as a threat. The governor walls it off with a low-grade clamp, and you stop feeling the region not because it is damaged but because it has been quarantined.

The second face is the one you meet when you try to teach someone else how you got here. You have spent three weeks on the floor. The iron yoke in your neck has dissolved, your gait has reorganised, your hips sit in a fluid verticality you had forgotten was possible. A friend asks you what you did. You reach for the steps — and find you cannot lay them out. You remember lying on the floor. You remember the grainy boundary moving. You do not remember the path. So you look at your current, optimised state and you describe its *symptoms*: "Stand tall, weight on your heels, shoulders wide, belly long." You hand your friend a photograph of the destination and tell them it is a map.

This is the second face of amnesia, and it is the same error in a different direction. The path that produced your state is gone from memory — not because you are careless, but because the autonomous governor ran the path sub-cortically, and sub-cortical processes do not leave a narrative trace. You cannot teach what you did not consciously do. And so you teach what you can see: the static shape of the finished result, presented as if it were the route to it.

---

## The Mathematical Justification: Two Ways a Map Goes Dark

The two amnesias are mirror images, and they share a single structure: a **process** has been deleted, and only its **output** remains. The output is then mistaken for the cause.

### Somatic amnesia: the map of a region collapses

The body's internal sensory-motor map is modelled as a metric tensor field $g_{ij}$ defined over the configuration manifold. Where the map is current, $g_{ij}$ is well-defined — the tissue's geometry, its resistance, its available range are all encoded. Where the map has gone dark, $g_{ij}$ is undefined — not zero, but **undefined**, like a chart with a blank patch.

The Green-Yellow boundary is where $g_{ij}$ is still being updated. Chapter 5 described the acute case: on the floor, with $z=0$ and $\mathbf{v}_{\text{conscious}} = \mathbf{0}$, the system runs a stochastic update along the frontier $\partial\Omega_{\text{green}} \cap \partial\Omega_{\text{yellow}}$, and the map redraws itself. Somatic amnesia is the **chronic** case: a region where the frontier stopped updating long ago, the stochastic drift never reached it, and the map there was never refreshed.

$$g_{ij}(\mathbf{x}) \to \text{undefined} \quad \text{for } \mathbf{x} \in \Omega_{\text{unmapped}}$$

The governor does not treat an undefined region as neutral. An undefined region is an unpredictable region, and an unpredictable region is a threat. The protective response is to wall it off — to treat the boundary of the unmapped region as a hard Red wall, a permanent lockout. The clamp is not healing a wound; it is quarantining an unknown. And because the quarantine prevents the stochastic update from ever reaching the region, the map never redraws. The amnesia is self-reinforcing.

The crucial point — the one that contradicts the "use it or lose it" alarmism — is that the territory is unchanged. The tissue, the joint, the fascia are all still there, structurally intact, ready to move. Nothing has atrophied, nothing has been removed. What has been lost is the **chart**, and a missing chart is a governance problem, not a structural one. The floor datum addresses it directly: when the system goes to idle and the global threat level drops, the quarantine softens, the stochastic update reaches the unmapped region, and the map begins to redraw. The territory was always there. The chart comes back.

### Practitioner amnesia: the map of the path collapses

The practitioner's amnesia is the same error at a different scale. The path that produced the optimised state is a trajectory $\gamma$ through the configuration space, and the change along that path is a non-conservative line integral:

$$\Delta \mathbf{g} = \int_{\gamma} \boldsymbol{\omega} \neq 0$$

Because the tissue is viscoelastic and non-conservative, the integral around a closed loop is not zero — the path is irreversible. You cannot recover the path from the terminal state; you can only recover the terminal state from the path. The practitioner, looking at their terminal state $\mathbf{g}_{\text{terminal}}$, attempts to teach the path by describing the state's geometry: "weight on the heels, shoulders wide, belly long." But those are the *coordinates of the destination*, not the *differential form along the route*.

$$\mathbf{g}_{\text{terminal}} \neq \int^{-1} \boldsymbol{\omega}$$

There is no inverse integral. The path is not encoded in the result. The practitioner is not lying — they genuinely cannot remember the path, because the autonomous governor ran it without leaving a narrative trace. But the manual they produce, by describing the destination as if it were the route, is a static template handed to a beginner who has not run the trajectory. The beginner tries to hold the shape, and the shape — held by force, without the path — is just another clamp.

### The symmetry

Both amnesias delete a process and leave only its output. Both then mistake the output for the cause.

```
 [ Somatic ]   region map deleted  →  unmapped region read as permanent Red wall
                                    →  the wall (output) mistaken for damage (cause)

 [ Practitioner ]  path map deleted  →  destination geometry read as the route
                                      →  the shape (output) mistaken for the method (cause)
```

In the first, the body treats a missing chart as a missing territory. In the second, the teacher treats a missing path as a present method. Both errors are downstream of the same loss: a process (updating, travelling) has been dropped, and its residue is reified into a thing (a wall, a posture) and presented as the reason.

---

## The Resolution: The Same Floor for Both

The book's method dissolves both amnesias, and it does so with the same act: lie on the floor, go to idle, attend the Green-Yellow boundary.

For the somatic face, the floor drops the global threat level. The quarantine on the unmapped region softens. The stochastic update — the same $\mathbf{g}_{k+1} = \mathbf{g}_k - \gamma \nabla C(\mathbf{g}_k) + \boldsymbol{\zeta}_k$ that runs the frontier in Chapter 5 — finally reaches the blank patch, and the map begins to redraw. The region comes back online. The territory was always there; the chart returns. This is the chronic, un-updated case of the mechanism Chapter 5 described acutely.

For the practitioner face, the floor refuses the deconstruction. You cannot hold "weight on the heels, shoulders wide, belly long" on the floor — there is nothing to hold, nothing to brace, nothing to align. The floor only accepts the idle state and the boundary work. The practitioner who returns to the floor discovers that the path is still there in the doing of it, even if it is gone from the memory of it. The manual they could not write is the manual the floor re-runs. You do not teach the destination by describing it; you teach the path by pointing at the floor.

The two faces of amnesia meet on the rug and dissolve there, by the same mechanism, for the same reason. The territory is never lost. The path is never lost. Only the map goes dark, and the map is redrawn by the same idle-state process that drew it the first time. The body is not broken, and it is not, in the alarming sense, lost. It has simply stopped charting a region, or stopped remembering a route. The floor is where the charting happens, and where the route re-runs whether you remember it or not.

---

## The Hardware Smoke Test (Finding a Region You'd Forgotten)

This is a practical test. It is the method itself, aimed at the somatic face.

Lie on your back on a hard floor. Legs bent, feet flat, arms at your sides. Close your eyes and let the standing-state noise drain for two minutes.

Now attend to the contact between your body and the floor. Find a region that is *quiet* — not painful, not tight, just quiet. A place where the contact is vague, or where your attention slides off, or where you realise you had not been feeling that part of your back at all until just now. That is an unmapped region. The map has gone dark there, and the governor has quarantined it so gently that you registered it as nothing.

Rest your attention on that quiet patch. Do not try to feel it more clearly. Do not try to move it. Just let the floor hold the load while you watch the quiet. Breathe into it. Stay for five minutes.

If, after five minutes, the quiet patch begins to acquire texture — a grain, a temperature, a subtle shift in contact — the map is redrawing. The stochastic update has reached the unmapped region. The territory was always there; the chart is coming back.

> **The Verification Metric:** If you discover that a region of your back you had not registered at all when you lay down is now clearly present — textured, located, quietly part of you again — *without you having stretched it, massaged it, or efforted anything toward it*, then the map has redrawn. The governor has lifted the quarantine on an unmapped region, not because you forced it, but because the floor dropped the threat level enough for the chart to update. The territory was never lost. The chart is back.
