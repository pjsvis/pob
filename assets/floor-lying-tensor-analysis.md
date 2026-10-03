# Floor Lying, Active Stress, and the Down-Regulation Trajectory

*Source material — research notes for potential book inclusion. Companion to `the-geometry-of-rest.md` (voiced) and `sleep-tension-and-structural-lockup.md` (raw dialogue). This file extends the tensor treatment to the GI and tremor readouts, and records the literature anchors. Register: technical source, not voiced prose — voice pass at draft time.*

## Origin

Follows a sustained personal observation: sleeping and resting on a firm floor produces 

1. an apparently autonomous down-regulation of muscle tone
2. a slow proximal-to-distal migration of aches through the lower body, 
3. occasional cramps at the distal extremities (feet, calves)
4. lessening of lateral hip imbalance under side-lying
5. internal stomach movement followed by gas release
6. small tremors in the leg muscles during the transition. 
 
The question was whether the phenomenology survives translation from metaphor ("tension squeezed out through the toes") into tensor mechanics. The answer below is: yes, mostly, with three honest caveats.

## 0.5 Anticipated objection: the "apes evolved comfortable beds" argument

A foreseeable counter to the floor-lying thesis is the bedding-industry deployment of Samson & Shumaker's primatology (great apes build sleeping platforms; platform-sleepers sleep deeper than branch-sitting monkeys; the platform transition ~14–18 MYA may have supported cognitive evolution). 

The move: apes evolved to use comfortable platforms → comfortable surfaces are what we are adapted for → therefore soft mattresses are the evolutionarily correct surface and the floor is wrong. **This is a bait-and-switch on "comfortable."** 

The ape sleeping platform is woven branches and leaves — a *firm, supportive* surface whose selected function is the removal of postural-maintenance demand (the ape can fully relax, not balance upright). 

The "comfort" under selection is *postural support*, not *softness*. The modern compliant mattress removes postural-maintenance demand too (you can lie down) but adds *accommodation of structural deviation* — the opposite service. The ape platform is mechanically closer to the firm floor than to the compliant mattress; the word "bed" hides the difference between a firm supporting surface and a compliant accommodating one.

**The honest limit.** Samson's research adjudicates platform-vs-no-platform (apes vs monkeys), not firm-vs-soft *within* platform-present. So the research does not directly support the firm floor; it merely fails to support the mattress-as-soft-surface. 

The firm-vs-compliant argument remains the biomechanical one in §§1–3 (active-stress down-regulation, structural-deviation exposure), not an evolutionary one. The bedding-industry use of Samson is a just-so story that, read at face value, leans against the product it is used to sell — the marketing department reached for an evolutionary justification and grabbed one whose actual mechanism (firm support → deep sleep) inverts the softness claim.

**The second bait-and-switch — posture.** The same papers the bedding blogs cite carry a second axis they elide harder than the firmness one. 

Samson & Shumaker (2013, *Behaviour* 150:845–861) report orang-utan sleep posture directly: dorsal 20.5%, ventral 8.6%, **right 31.5%, left 33.2%**, vertical 6.2% — i.e. ~65% side-lying, and "individuals rarely slept on their ventral side." 

Posture is idiosyncratic and night-to-night (Azy preferred left, Lucy right). The field data agrees: Samson & Hunt (2014, *PLoS ONE* e95361) titles its finding "stable, **firm**, but compliant" tree species selected for platform construction; van Casteren et al. (2012, *PNAS*) show the nest is mechanically *nonuniform* — rigid woven edges, gently compliant lined centre — i.e. the ape platform is a futon, not a mattress. 

So the honest reading of Samson is not "firm platform" alone but **"firm platform + side-lying"** — which is the Buddhist lion posture (right side) and the Ayurvedic left-side recommendation verbatim. The configuration no great ape adopts is the one the product sells: supine sprawl on a compliant surface. 

The bedding-industry citation of Samson elides the firmness axis *and* the posture axis; read at face value the primatology points away from the mattress and away from the supine sprawl, toward the firm-floor side-curl the traditions prescribe. (Honest wrinkle, because the protocol demands it: the captive SPCI arm of Samson's work gave orang-utans *memory foam* — scored 1.5 — and more-complex platforms correlated with reduced fragmentation. 

That *is* the mattress industry's Exhibit A, and it is exactly the "memory-foam-on-futon" degenerate case flagged in the traditional-practices asset. But the captive comparison is memory-foam-vs-bare-laminate-floor, not firm-vs-compliant-within-a-platform, and the apes are still side-lying on it. 

Field data and captive data agree on posture and disagree only on the compliance axis, where the captive study is precisely the confound predicted — so the disagreement is not a threat but the predicted load-bearing distinction.)

## 1. The state variables and the floor as boundary condition

Body Ω ⊂ ℝ³, reference **X**, current **x** = χ(**X**, t). Kinematics:

**F** = ∂**x**/∂**X**,  **C** = **F**ᵀ**F**,  **E** = ½(**C** − **I**)

Cauchy stress **σ**(**x**, t); second Piola-Kirchhoff **S** = J**F**⁻¹**σ****F**⁻ᵀ; J = det**F**.

Quasi-static equilibrium throughout (hours, not impacts):

∇·**σ** + ρ**b** = 0,  **b** = ρ**g**

The floor is a rigid Signorini contact: on Γ_c, u_n ≤ 0 with complementarity (p_n ≥ 0, p_n · u_n = 0), Coulomb friction on the tangent; on Γ_f, traction-free **σ**·**n** = 0. The mattress it replaces was a compliant Winkler foundation (reaction ∝ local indentation). The distinction is load-bearing: the compliant substrate lets the body sink and *accommodates* its asymmetries; the rigid substrate localises contact at bony prominences and forces the internal stress field to satisfy equilibrium against a sharper reaction. (This is the formal version of the "mattress as structural cast" argument in `sleep-tension-and-structural-lockup.md`.)

## 2. The decomposition that does the work

For skeletal muscle and innervated fascia the stress is not a single constitutive function of strain. It splits:

**σ** = **σ**_passive(**C**, **Ė**; t) + **σ**_active(**a**, **C**, **Ċ**; t)

- **σ**_passive: viscoelastic response of the collagen/elastin ground substance — Fung-type quasi-linear viscoelasticity, with relaxation function G(t) and equilibrium response. Carries the structural load path.
- **σ**_active: contractile contribution along fibre unit vectors **n**_i:

**σ**_active = Σᵢ aᵢ(**x**, t) · T(aᵢ, λᵢ, dλᵢ/dt) · **n**_i ⊗ **n**_i

where aᵢ ∈ [0,1] is the activation of muscle i, λᵢ = |**F****n**_0i| the fibre stretch, T the Hill-type active stress (function of activation, length, velocity). **The crucial point: aᵢ is not a mechanical variable. It is a neuro-control input set by the CNS.** The body's "tone" is, in tensor terms, the current value of the vector **a**(**x**, t).

The active-stress decomposition is standard in the muscular-biomechanics literature; see Hill (1938) for the force–length–velocity–activation relations and Huxley (1957) for the sliding-filament basis. The continuum active-stress formalism in soft tissue is set out in Humphrey (*Cardiovascular Solid Mechanics*, 2002; *Continuum Biomechanics*, but note Humphrey's primary domain is cardiac — the formal structure transfers, the constitutive constants do not).

## 3. The release, formally

What the floor does, by removing postural demand and sensory novelty, is drive the CNS to reduce **a** over time. In the quiet unloaded state the autonomic nervous system runs a slow downward trajectory:

d**a**/dt < 0   (proximal postural musculature, predominantly)

This is not a constitutive change — the tissue's *material* does not change on this timescale. It is a change in the *input* to the active-stress term. At each instant the body solves:

∇·[**σ**_passive(**C**) + **σ**_active(**a**(t), **C**)] + ρ**g** = 0

subject to the rigid contact BC. As **a**(t) decreases, **σ**_active shrinks and the equilibrium stress field **σ**(**x**, t) redistributes — because gravity and the floor reaction are unchanged (global equilibrium fixes total reaction at body weight), but the *internal load path* that transmits this reaction shifts from active-cable to passive-structural.

## 4. The "migration" as a moving level set

Define the perceptual "ache" locus as the set where the von Mises invariant of the deviatoric stress exceeds a threshold:

σ_vm(**x**, t) = √(3/2)·√(**s**:**s**),   **s** = **σ** − ⅓ tr(**σ**) **I**

The ache "migrates" means: argmax_**x** σ_vm(**x**, t) moves through Ω as t increases. Its *distal* direction is load-path geometry. Active tone is concentrated in proximal paraspinal and pelvic musculature — short-span, high-cross-section cables. As **σ**_active drops there, the residual load transfers to the passive structures, which are long-span and run distally: thoracolumbar fascia, iliotibial band, plantar fascia, Achilles. The stress field redistributes from a proximal-active-short-span pattern to a distal-passive-long-span pattern. The σ_vm peak moves toward the feet. That is the tensor content of "squeezed down and out through the toes." The metaphor is discarded; the phenomenology survives.

## 5. The cramp as local instability at the terminus

At the distal end (foot intrinsics, gastroc-soleus) the cross-sectional area A carrying the redistributed force is small; σ = F/A is large; ε ≈ σ/E is large. When σ_vm locally crosses the recruitment threshold the spinal reflex arc fires involuntarily:

aᵢ(**x**_foot, t) → transient spike

A local instability: at the one location the system was offloading *to*, it momentarily re-injects active stress. The cramp is the tensor-field spike — **σ**_active jumping upward, producing a high-frequency, high-amplitude local stress felt as pain. It is not tension "leaving"; it is the system hitting the boundary of what the distal passive tissue can accommodate.

## 6. Side-lying and lateral asymmetry: asymmetric BC and reference-config remodelling

Side-lying changes Γ_c to a lateral contact: one trochanter, one iliac crest, one shoulder, one lateral leg. The BC is asymmetric with respect to the body's medial plane — gravity is symmetric (downward), the constraint is lateral — producing a stress field **σ**_ij(**x**, t) not mirror-symmetric across the medial plane.

For a body with pre-existing lateral asymmetry (universal), formalised as a left-minus-right difference in reference strain tensors Δ**C**_0 = **C**_0,L − **C**_0,R, or equivalently asymmetric resting activation a_L ≠ a_R in the hip abductors, the side-lying load acts directly on the asymmetric structures.

**Left and right are mirror-image BCs; single-side loading drifts, alternation nets to zero.** The formalism treats left-side and right-side lying as mirror-symmetric asymmetric BCs — **C**_0,L and **C**_0,R are interchanged by the medial reflection. A sustained single-side practice therefore drives ||Δ**C**_0|| in *one* direction (loading the side that needs it, or over-correcting the side that does not, depending on sign); alternating left and right over time drives it in *both* and nets the drift toward zero. Call this the Poynting argument by analogy: if the curl (the asymmetric loading) accumulates in one chirality, the Poynting vector of the remodelling trajectory drifts off-axis; uncurling in both chiralities keeps it pointing where you want. The prediction is that the *practice* must alternate, not choose — and that is exactly what the traditions collectively do (Buddhism right, Ayurveda left, the Yogaratnakara post-meal sequence supine→right→left→any explicitly rotates). No tradition prescribes a single side forever; the split between traditions is the evidence that a single chirality is a bias and the rotation is the correction. The Samson posture data (§0.5: right 31.5% / left 33.2%, idiosyncratic per night) is the same cycling in the ape record.

**The block as boundary condition.** Pure passive side-lying is one thing; side-lying *with a yoga block between the knees* is a different boundary-value problem. The block is a localised constraint at the knee that fixes the geometry of the top leg while letting it drape, so gravity acting on the leg's mass produces a sustained, directed torque at the hip — a gravity-driven mobilisation along a specific line. This is not the floor doing nothing; it is a self-administered, gravity-powered, geometrically-constrained low-load stretch. The two coupled processes then operate:

- **Creep.** Under the constant gravity-driven σ the viscoelastic strain E(t) increases toward an asymptote E_∞(σ). Time constants long (minutes to hours). The load is constant and monotonic — no oscillation, no session-to-session variance, no dependence on practitioner attention. This is the mechanical advantage of gravity-driven over practitioner-applied loading: the Estébanez cadaveric work shows the tissue mechanism is creep-and-progressive-fibre-recruitment, and creep responds to *sustained* load; a practitioner's force is intermittent and variable.
- **Reference-config remodelling.** The tissue's equilibrium length shifts; the reference right Cauchy-Green tensor **C**_0, under zero load, changes. The asymmetry norm ||Δ**C**_0(t)|| reduces over days/weeks, because the block-constrained side-lying equilibrium (which loads the asymmetric structures) becomes the new reference. On standing, the body equilibrates about a more symmetric reference configuration. **A measured instance**: top-leg hip angle mobilised from ~30° down to parallel with the bottom leg, over weeks of sustained block-supported side-lying. That is, in n=1, exactly the ||Δ**C**_0(t)||↓ trajectory the formalism predicts.

**The "feels right, not forced" criterion is load-regime discrimination.** The Estébanez series and its cited basis (Thornton, Shrive & Frank 2002, on ligament creep) distinguish creep that *recruits fibres progressively at low stress* (remodelling, safe) from creep that *damages fibres at high stress* (degradation). Forced stretching crosses into the linear region past the "first stop" — high stress, fibre-damage risk. The sustained, gravity-driven, comfortable position stays in the progressive-recruitment region — low stress, monotonic, asymptotic. The comfort is not a vague preference; it is the afferent signal that the load is in the remodelling regime rather than the damage regime. This is the same discrimination the perturbation protocol in `AGENTS.md` marks with the gate between "note" and "touch": the "feels right" is the benchmark signal that the perturbation is controlled, not noisy.

**What the literature supports (and where it is thin).** The *mechanism* — low-load, long-duration creep and stress-relaxation changing capsular-ligament length — is directly evidenced for the hip by the Estébanez-de-Miguel cadaveric series (below): a 5-minute high-force long-axis distraction produces ~20% strain in the inferior iliofemoral ligament, with the major change in the first minute and a significant change by ~45 s, attributable to creep and progressive fibre recruitment; the Thornton-Shrive-Frank work it cites (below) distinguishes low-stress remodelling creep from high-stress damage creep. That establishes the timescale, the tissue-level mechanism, and the load-regime discrimination for sustained-load remodelling. The block-supported, gravity-driven, self-administered variant described above is, mechanistically, the same regime (sustained low-load creep) with a different force source (gravity, not therapist) — and gravity has the mechanical advantage of being constant, monotonic, and session-invariant, where a practitioner's force is intermittent and variable. *What is not evidenced*: the specific claim that *block-supported passive side-lying* drives the reference-config asymmetry ||Δ**C**_0|| down — but the n=1 30°→parallel hip-angle measurement recorded above is the prediction confirmed, and the mechanism is the documented one. The constructive-rest / semi-supine tradition (Alexander, Dart — see §8) uses supine, not side-lying, and explicitly notes side-lying "creates asymmetrical tension patterns." **But the imprecation and the observation may be describing different conditions.** The Alexander caution is about side-lying *with postural tone held* — a braced body on a compliant surface, which does indeed freeze asymmetries in; the body sinks around its own compensations exactly as the mattress does in the `sleep-tension-and-structural-lockup.md` argument. The practice under discussion here is the opposite condition: side-lying on a firm floor *after* active tone has down-regulated (the premise of §3), with a block fixing the geometry, so the lateral BC acts on a released body where **a** is low and the load is gravity-driven — the regime where passive creep and reference-config remodelling would actually occur rather than be defended against. The imprecation may be right for the condition it describes (braced side-lying on a soft surface) and wrong for this one (released, block-supported side-lying on a rigid one). That distinction does not make the rebalancing claim true, but it removes the cheap refutation — the claim is no longer "against received opinion" so much as "in a different regime the received opinion did not consider." Still an undocumented hypothesis to instrument rather than a finding, now with a measured instance behind it.

## 7. The stomach: a second active-stress structure, same control input

The GI tract is mechanically a thick-walled viscoelastic tube (shell domain Ω_GI) containing a two-phase mixture — liquid/solid chyme plus dispersed gas. Its wall has the same formal decomposition:

**σ**_wall = **σ**_passive(**C**) + **σ**_active_smooth(**a**_smooth, **C**)

**σ**_active_smooth is the smooth-muscle contractile contribution, driven by the enteric and autonomic nervous systems rather than the somatic. Hill-type structure is formally identical (activation-modulated stress along the circumferential and longitudinal smooth-muscle layers), but **a**_smooth is set by the autonomic system, timescales slower.

Under standing/sitting sympathetic tone, **a**_smooth is elevated — wall hypertonic, lumen locally clamped, segmental pockets trap gas, peristalsis (the migrating motor complex, MMC) suppressed. Under the floor-induced parasympathetic shift: (i) **a**_smooth(**x**, t) ↓, local constrictions release, luminal geometry opens, trapped gas coalesces and is transportable; (ii) the MMC resumes — rhythmic contractile waves advect the gas bolus distally toward the rectum. "Internal movement followed by gas release" = **σ**_wall redistributing plus the two-phase mixture advected by resuming peristalsis. The gas release at the terminus is the same formal structure as the cramp at the foot — material trapped by upstream active tone reaching the open boundary once that tone drops.

**The honest confound (Hume's Razor).** Lying down also changes the *geometry* of the domain by buoyancy: dispersed gas, less dense than chyme, migrates cranially when standing and caudally (toward the rectum) when supine. So the gas release has a purely positional mechanism — buoyancy-driven relocation — independent of the autonomic story and producing the observed effect regardless of tone state. The positional mechanism is the parsimonious one and must not be assumed away. Adjudication: does gas release occur in supine floor-lying but not in supine *bed* lying? If yes, autonomic (position controlled for). If both, positional. That is the experiment the formalism points to.

## 8. The tremors: the dynamic signature of a system in transition

The quasi-static picture (§3) is incomplete. The transition has dynamics, and the dynamics are oscillatory. Write:

**σ**_active(**x**, t) = **σ̄**_active(**x**, t) + **σ̃**_active(**x**, t)

**σ̄** the monotonic downward trajectory, **σ̃** a small-amplitude quasi-periodic perturbation. The tremor *is* **σ̃** — felt as time-varying strain **Ê**(t) = **C**⁻¹·**σ̃**_active (linearised regime). Two mechanisms, both likely:

**(a) Feedback-loop re-tuning.** Muscle tone is maintained by a closed loop — spindle senses length, γ-motor neuron adjusts output to hold setpoint. As target setpoint **a**_target(t) itself decreases, the feedback controller re-tracks; during the transition the loop gain is momentarily inappropriate for the new (lower) target — too high — and the system exhibits a limit-cycle oscillation. Same mathematics as a PID controller hunting during a setpoint change. The tremor is the limit cycle; amplitude is the transient tracking error.

**(b) Stiffness-amplitude coupling.** The effective tangent stiffness ∂**σ**/∂**C** has an active contribution — contracted muscle is stiffer. As **σ̄**_active drops, so does the active part of the tangent stiffness. Neuromuscular noise is always present (physiological tremor, ~5–12 Hz). This noise produces strain ε_noise = σ_noise / K_eff; as K_eff drops with the tone, the *same* neural noise produces *larger* strain — the tremor amplitude grows. The tissue becomes a softer spring; the same input force moves it further.

Both predict tremors *during the transition* and not at endpoints — the discriminating feature. A system at a stable tone setpoint does not tremor (beyond the sub-perceptible baseline); a system *between* setpoints does. So the tremors are corroborating evidence for the core claim that **a**(t) is genuinely *changing*, not merely low. They are the dynamic signature of the down-regulation process itself.

## 9. The synthesis: one state variable, three readouts

The systems move: do not treat the skeletal-muscle release, the GI release, and the tremors as three phenomena. They are three expressions of a single underlying control trajectory — the autonomic shift A(t), which the floor perturbs downward. A(t) appears as:

- **a**_skeletal(t) ↓ in the musculoskeletal constitutive law → **σ**_active drops → stress redistribution → migration → distal cramps
- **a**_smooth(t) ↓ in the GI wall constitutive law → wall tone drops, MMC resumes → gas transport and release
- d**a**/dt ≠ 0 in the neuromuscular feedback loop → controller re-tuning → tremors

The first is the static-equilibrium response (stress field re-solving). The second is the same in a different domain (GI wall). The third is the *dynamic* response — it appears only because the setpoint is moving, not because of where it has moved *to*. The cramps and gas release are functions of **a**; the tremors are a function of d**a**/dt. That is why tremors are transient (vanish once the new setpoint is held) while the other two persist (consequences of the new setpoint itself).

**The skeptical bottom line.** The synthesis is elegant, and elegance is a warning sign — exactly the narrative the protocol warns against (compulsive narrative syndrome). The three readouts *could* be independent: the gas could be purely buoyancy (positional, not autonomic), the tremors could be benign fasciculation from fatigue or cold rather than feedback re-tuning, and only the skeletal-muscle release might be genuinely autonomic. The formalism does not adjudicate — it tells what each story *would* look like in tensor terms, not which is true.

## 10. What to instrument to turn observation into evidence

The formalism tells you what to measure:

- **The migration.** Trajectory of argmax σ_vm over hours. Proxy: pressure-map (Xsensor-style) time series in supine — Brummer et al. (2018) show the approach works for Feldenkrais FI; a floor-lying time series would be the analogue.
- **The rebalancing.** Pre/post ||Δ**C**_0|| — left-minus-right reference strain asymmetry. Proxy: standing posture photographs and single-leg-stand balance, pre/post a sustained floor-lying intervention period.
- **The autonomic shift.** Cardiac vagal tone / baroreflex sensitivity time series across the floor-lying session (the NeuroScope-style beat-to-beat methodology of Julu). If A(t) is genuinely moving, CVT should rise as sympathetic restraint withdraws.
- **The positional confound for gas (STANDING FIRST EXPERIMENT — cheap, no equipment).** Supine floor vs supine bed, position controlled, meal timing controlled (fasted comparison is the clean one; post-prandial is a separate, second experiment). Log every gas-release event with time, location, and time-of-last-meal, over a few weeks of irregular sessions so the MMC cycle (~90–120 min) and recumbency duration vary independently of location. Differential gas release (floor, not bed, at matched recumbency) → autonomic mechanism survives its cheapest test and the more expensive instrumentation is earned. Equal release in both → buoyancy is doing the work and the §7 autonomic reading collapses to the parsimonious positional mechanism, taking one leg off the §9 three-readout synthesis. **This is the gate, not the building** — it adjudicates only the GI confound; the migration, tremors, and side-lying rebalancing need their own instruments in the cost order below.

## References (annotated)

### Floor lying, constructive rest, semi-supine — the practice tradition

- **Alexander Technique lying-down work / "constructive rest" / "semi-supine."** The Mouritz companion entry (`mouritz.org/companion/article/lying-down-work`) gives the history: origin attributed to F. M. Alexander in Australia, the term "semi-supine" coined by the anatomist Raymond Dart in his 1970 lecture. The position is supine, knees bent, feet flat, head on books, on a *firm* surface (floor preferred to bed "as it will give a level surface for better support" — Fitz-Simon, ACAT). Marjory Barlow on the purpose: "a very good opportunity just to give orders — to inhibit and give orders and not do anything, and you haven't got the problem of your equilibrium." This is, in the language of §3, the explicit removal of the postural-demand term so that **a** can down-regulate without the equilibrium constraint. **Note**: the tradition is emphatically *supine*, and the literature explicitly cautions that side-lying "creates asymmetrical tension patterns" — directly counter to the personal observation in §6. The side-lying claim is therefore against received opinion in this tradition.
- **Mabel Todd (1929)** coined "constructive rest" in ideokinesis; Sweigard (*Human Movement Potential*, 1974) defines it as supine, knees up, arms across chest. The term predates its Alexander-Technique adoption.
- **Brummer, Walach & Schmidt (2018), "Feldenkrais 'Functional Integration' Increases Body Contact Surface in the Supine Position," *Front. Psychol.* 9:2023.** RCT, 30 subjects, Xsensor pressure-mapping. FI treatment objectively increases contact surface and pressure on the mat, differentially on the side treated first — first *objective* demonstration that a bodywork method changes muscle tone in supine as measured by contact geometry. This is the methodological anchor for the §10 "migration" instrumentation: the floor-lying analogue is the same measurement without the therapist.

### Active-stress mechanics, creep, tissue remodelling

- **Hill, A. V. (1938), "The heat of shortening and the dynamic constants of muscle," *Proc. R. Soc. B*.** The force–length–velocity–activation relations underlying T(a, λ, dλ/dt).
- **Huxley, A. F. (1957), "Muscle structure and theories of contraction," *Prog. Biophys. Biophys. Chem*.** Sliding-filament basis for the active stress.
- **Humphrey, J. D., *Cardiovascular Solid Mechanics* (2002) and *Continuum Biomechanics* (Cambridge, 2025).** The continuum active-stress decomposition σ = σ_passive + σ_active in soft tissue. Primary domain is cardiac; formal structure transfers, constitutive constants do not.
- **Fung, Y. C., *Biomechanics: Mechanical Properties of Living Tissues* (2nd ed., 1993).** Quasi-linear viscoelasticity (QLV), relaxation function G(t) — the passive-term constitutive scaffold.
- **Estébanez-de-Miguel et al. (2020), *Musculoskelet. Sci. Pract.* 50:102262; and (2023), *Arch. Phys. Med. Rehabil.* (doi:10.1016/j.apmr.2023.03.022).** Cadaveric series, 13 hips / 9 fresh-frozen cadavers. A 5-minute high-force long-axis distraction mobilisation produces ~20% strain in the inferior iliofemoral ligament; the major change occurs in the first minute, half the total by 30 s, significant by 45 s. Attributed to creep and progressive fibre recruitment (different fibres have different crimped lengths, recruited progressively as stretch increases). **This is the direct evidence for the §6 mechanism** — low-load long-duration loading changes capsular-ligament length, on minute timescales, by creep. It does *not* evidence the hours-long passive side-lying case (the load is therapist-applied high-force, ~324 N), but the tissue-mechanical mechanism is the same.
- **Thornton, G. M., Shrive, N. G., & Frank, C. B. (2002), "Ligament creep recruits fibres at low stresses and can lead to modulus-reducing fibre damage at higher creep stresses," *J. Orthop. Res.* 20:967–74; and Thornton, Oliynyk, Frank & Shrive (1997), *J. Orthop. Res.* 15:652–56.** The load-regime discrimination the §6 "feels right, not forced" criterion turns on: creep at low stress progressively recruits fibres (remodelling, safe, asymptotic); creep at high stress damages fibres (modulus-reducing, degrading). The comfort signal is the afferent readout of which regime the load is in. Cited as the mechanism basis by Estébanez.

### Tremor, fusimotor drive, and stiffness-amplitude coupling

- **Jalaleddini, Nagamori, Laine, Golkar, Kearney & Valero-Cuevas (2017), "Physiological tremor increases when skeletal muscle is shortened: implications for fusimotor control," *J. Physiol.* 595(24):7331–7346.** Tremor amplitude *increases* as muscle shortens — contrary to the stretch-reflex-amplitude prediction — and the change requires modulation of γ-static fusimotor drive. Physiological tremor is a non-invasive probe of afferent gain. **Anchor for §8(a)**: the γ-loop re-tuning mechanism is real, measurable, and decoupled from stretch-reflex amplitude.
- **Nagamori, Laine & Valero-Cuevas (2018), "Cardinal features of involuntary force variability can arise from the closed-loop control of viscoelastic afferented muscles," *PLoS Comput. Biol.* 14(1):e1005884.** Closed-loop simulation of afferented muscle: low-frequency "common drive" (1–5 Hz) emerges from viscoelastic mechanics + error correction, and physiological tremor (5–12 Hz) emerges only with proprioceptive feedback. Tuning Ia afferent gain and γ-static fusimotor drive modulates both. **Anchor for §8(b)**: the stiffness-amplitude coupling and the emergence of tremor from closed-loop neuromechanics.
- **Vernooij, Reynolds & Lakie (2016), "Physiological tremor reveals how thixotropy adapts skeletal muscle for posture and movement," *R. Soc. Open Sci.* 3:160065.** Tremor frequency and amplitude track muscle thixotropy: still muscle is stiff (high tremor frequency ~20 Hz), moving muscle is soft (low ~8 Hz), with no corresponding EMG change. The tremor spectrum is a mechanical-resonance readout of muscle stiffness. **Anchor for §8(b)**: the stiffness drop → frequency/amplitude shift is directly evidenced, and the thixotropic stiffening at rest is the mechanism by which posture is held cheaply (relevant to the release phenomenology — as tone drops, thixotropic "stiction" also drops, and the resonant signature shifts).
- **Williams & Baker (2009), "Renshaw Cell Recurrent Inhibition Improves Physiological Tremor by Reducing Corticomuscular Coupling at 10 Hz," *J. Neurosci.* 29(20):6616–6624.** Recurrent inhibition via Renshaw cells feeds 10 Hz oscillations back in antiphase, cancelling them. Multiple mechanisms exist to suppress tremor; the floor-induced tremor is the transient failure of these mechanisms during re-tuning, not their absence.

### GI motility, motilin, the MMC, and autonomic coupling

- **Vantrappen, Janssens, Peeters, Bloom, Christofides & Hellemans (1979), "Motilin and the interdigestive migrating motor complex in man," *Dig. Dis. Sci.* 24:497.** Plasma motilin cycles ~every 100 min in fasted humans, peak preceding the phase III activity front; exogenous motilin induces phase III. **Anchor for §7**: the MMC is the resuming peristalsis, and it is motilin-driven.
- **Takahashi (2012), "Mechanism of Interdigestive Migrating Motor Complex," *J. Neurogastroenterol. Motil.* 18(3):246–257.** Review: MMC cycle mediated by a motilin–5-HT positive feedback; gastric MMC is vagal-dependent and 5-HT3-receptor mediated, intestinal MMC is 5-HT4 / IPAN-mediated. Acoustic stress attenuates gastric phase III via reduced vagal activity and increased sympathetic activity; subsets of functional-dyspepsia patients show reduced vagal activity and impaired gastric phase III. **Anchor for §7 and §9**: the autonomic–GI coupling is direct and bidirectional. The parasympathetic shift the floor induces is exactly the direction that resumes gastric phase III.
- **Di Lorenzo, Dooley & Valenzuela (1991), "Role of fasting gastrointestinal motility in the variability of gastrointestinal transit time assessed by hydrogen breath test," *Gut* 32:1127.** MMC phase determines transit time (phase I 155 min, phase II 120 min, phase III 94 min). The state of the MMC measurably governs how gas/bolus moves — supporting the "trapped gas released when MMC resumes" reading.

### Autonomic measurement (for the §10 instrumentation)

- **Julu, P. O. O. (2020), "Normal autonomic neurophysiology of postural orthostatic tachycardia...," *Physiol. Rep.* (doi:10.14814/phy2.14465).** Beat-to-beat cardiac vagal tone (CVT, on a linear vagal scale) and cardiac sensitivity to baroreflex (CSB) derivable from ECG + finger pressure. The methodology for quantifying the §9 autonomic trajectory A(t) in real time. Supine baseline CVT ~10.8 LVS units in normals; the trajectory under floor-lying is unmeasured.

### Cognitive/behavioural (for the larger argument, already in `the-geometry-of-rest.md`)

- **Loewenstein, G. (1996), the Hot-Cold Empathy Gap.** Already cited in the existing asset; retained here for the "preachy recovered patient" thread, not for the tensor analysis.

### Anticipated counter — the primatology / bedding-industry argument

- **Samson, D. R. & Shumaker, R. W. (2013 onwards), American Journal of Physical Anthropology** (and Samson's subsequent work on great ape sleep architecture, e.g. Samson & Nunn 2015, *Sleep Medicine Reviews*, on the evolutionary ecology of sleep). Great apes build sleeping platforms (woven branches/leaves, built nightly, in trees); monkeys do not; platform-sleepers achieve deeper, longer, less-fragmented sleep than branch-sitters. The platform transition (~14–18 MYA) is argued to have supported cognitive evolution via sleep-quality gains. **Bedding-industry use of this work (e.g. Night Air Beds' blog "Studying Primates Reveals the Value of Comfortable Beds") performs a bait-and-switch on "comfortable"**: the ape platform is firm and supportive; the mattress is compliant. See §0.5 of the asset body for the analysis and the honest limit (Samson adjudicates platform-vs-no-platform, not firm-vs-soft).
- **Samson, D. R. & Shumaker, R. W. (2013), "Documenting orang-utan sleep architecture: sleeping platform complexity increases sleep quality in captive *Pongo*," *Behaviour* 150:845–861.** The paper the bedding blogs cite also reports the posture distribution the blogs elide: dorsal 20.5%, ventral 8.6%, right 31.5%, left 33.2%, vertical 6.2%; ventral rare; posture idiosyncratic per individual and per night. **Anchor for §0.5's second bait-and-switch** — the ape sleep configuration is firm platform + side-lying, not soft platform + supine.
- **Samson, D. R. & Hunt, K. D. (2014), "Chimpanzees preferentially select sleeping platform construction tree species with biomechanical properties that yield stable, firm, but compliant nests," *PLoS ONE* 9:e95361.** The title states the finding the bedding industry omits: apes select tree species for *firmness* (with a measured compliance), not softness. Field data on the firm-vs-compliant axis the captive memory-foam study confounds.
- **van Casteren, A., Sellers, W. I., Thorpe, S. K. S., Coward, S., Crompton, R. H., Myatt, J. P. & Ennos, A. R. (2012), "Nest-building orangutans demonstrate engineering know-how to produce safe, comfortable beds," *PNAS* 109(18):6873–7.** The nest is mechanically *nonuniform*: rigid woven structural edges (greenstick-fractured thicker branches), gently compliant lined centre (detached thinner branches). Mechanically a futon-on-tatami, not a mattress. Supports the §0.5 reading that the ape platform sits on the firm end of the compliance axis and the nonuniformity is a feature, not a softness defect.
- **Samson, D. R. & Nunn, C. L. (2015), "Sleep intensity and the evolution of human cognition," *Evol. Anthropol.* 24:225–37; and Nunn, Samson & Krystal (2016), "Shining evolutionary light on human sleep and sleep disorders," *Evol. Med. Public Health* 2016(1):227–243.** Humans are the shortest-sleeping, highest-REM-fraction primate — a derived state argued to track the tree-to-ground sleep transition. The ontogeny thread (infant apes and infant humans both sleep curled; supine sprawl is learned/cultural) is flagged here for a dedicated search before drafting; the McKenna mother–infant co-sleeping line touches the same developmental default.

### The measured thinness of the sleep-*posture*-biomechanics literature

The gap this asset sits in is not asserted but measured by systematic reviews. **Cheng et al. (2023), "Computational Biomechanics of Sleep: A Systematic Mapping Review" (*Bioengineering* 10:917)**, maps 27 finite-element sleep studies: 19 on obstructive sleep apnea (airway collapse), 3 on sleep bruxism (TMJ stress), 5 on sleep ergonomics (pillow + mattress). **Every ergonomics study modelled supine only; the review states outright "there was no research exploring side-lying positions in this review, and all evaluated supine posture."** The computational biomechanics of sleep is, as of 2023: supine, on a mattress, for mattress-design and airway purposes — nothing on side-lying, nothing on hours-long passive tissue loading, nothing on the hip. **Cary et al. (2019), *BMJ Open* scoping review on sleep posture and spinal symptoms**, screened 4186 articles and identified *four*; all used self-reported posture (inaccuracy up to 33%); the authors conclude "there were not enough high-quality studies to adequately answer our research question" and call for side-lying to be subclassified — the block-supported / braced distinction §6 already makes. **Saini et al. (2025)**, systematic review of posture vs low back pain: six observational studies, crude findings. This is the state of the field in its own words: the biomechanics of *sleeping position as a sustained-load tissue-remodelling variable* is an orphan — not suppressed, but unfunded and departmentally unowned. The absence is produced by funding topology (sleep medicine funds brain/breathing; the bedding industry funds mattress comfort and pressure-relief; nobody funds "does floor sleeping remodel your hip capsule"), disciplinary boundary (no department owns resting-posture biomechanics), and methodological difficulty (longitudinal in-vivo tissue remodelling under sustained load is hard to measure). The Tetley piece in `assets/sleeping-positions.md` is a lone anecdotal voice in the *biomechanics* register; it is not data, but it is approximately all there is in that register that addresses the *instinctive-posture-as-biomechanics* question directly.

**The traditional-practice register is NOT thin — only the biomechanics register is.** The gap is a translation failure between registers, not a recording failure. The practices are extensively documented across multiple traditions: (i) **Buddhism** — the *sīhaseyya* (lion posture), the Buddha's prescribed sleeping position (right side, one foot on the other, mindful), documented in the Pali canon (DN 16, the death scene; MN 53, the standard monastic sleeping posture; SN 4.7) and depicted in the reclining Buddha iconography of every Buddhist country; (ii) **Ayurveda** — *vāmaśayyā* (left-side sleeping after meals, recommended by Sushruta for digestion) and a detailed *typology of sleeping surfaces* in Charaka Samhita, Sushruta Samhita, and Ashtanga Hridaya, classifying *bhūmi-śayyā* (ground sleeping, said to pacify vata and give strength), *khatvā* (cot), *dārupatta* (wooden planks), *andolikā* (hanging bed) — a traditional medical system that recorded sleeping-surface and sleeping-position as health-relevant variables two millennia ago; (iii) **Yoga** — *śavāsana* (corpse pose), supine floor lying as the universal resting posture; (iv) **Floor-sleeping cultures** — Japanese futon on tatami, Korean yō on ondol, Indian charpai, Mongolian, Bedouin, and Native American ground-sleeping traditions, all extensively documented ethnographically. What failed was not memory but *translation*: the biomechanics field (young, funded by mattress design and sleep medicine) did not read the traditional-practice record, and the traditional-practice fields do not have the tensor/creep/reference-config language. The book's contribution is the *synthesis* — reading the Ayurvedic surface typology and the Buddhist lion posture through the active-stress/creep formalism, and showing that the traditional recommendation (firm ground, side-lying, relaxation) is exactly what the mechanics predicts. The traditions did not forget; the biomechanics field did not ask them.

## Honest gaps

1. **Passive long-duration side-lying as a remodelling load is not in the literature.** The hip-mobilisation literature is therapist-applied, high-force, minute-scale. The constructive-rest tradition is supine and explicitly disfavours side-lying. The personal observation that side-lying *reduces* lateral hip imbalance is, at present, against received opinion and undocumented. Worth a brief, not a chapter.
2. **The "migration" is felt, not measured.** The Brummer pressure-map methodology would instrument it; nobody has run the floor-lying time series.
3. **The autonomic-shift reading of the gas release is confounded by buoyancy.** The positional mechanism is real and parsimonious; the differential floor-vs-bed experiment has not been done.
4. **The tremors-as-re-tuning reading is plausible but not unique.** Benign fasciculation, fatigue, and cold are alternative generators. The discriminating prediction (tremors transient during transition, absent at endpoints) is testable but untested.

The formalism is well-founded; the observations are real; the causal attribution is a working hypothesis held at the strength of working hypotheses.
