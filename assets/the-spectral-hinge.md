# The Spectral Hinge: Eigenvalues, Eigenvectors, and the Pre-Computed Body

*Persisted 14 July 2026. Synthesis arising from the eigenvalues-in-biotensegrity investigation (see brief `2026-07-14-brief-eigenvalues-in-biotensegrity.md`). Source material: the Pellionisz/Llinás tensor network theory assets, the floor-as-datum assets, the staved-finger essay, and a literature search on eigenvalue methods in the bio-tensegrity literature. This is research material (the yap), not voiced text. The voice pass happens if and when this enters the manuscript or an appendix.*

*Note added 14 July 2026: the voice pass should use the grad/div/curl operators as the bridge language between the equations and the narrative. The mappings are noted at the end of this asset. The principle is: same thing three times in different ways, but not dogmatically — where 1+1=2, one way is enough.*

*Note added 14 July 2026: the felt-vocabulary layer (good/ache/twinge/pain) is the body's own word for the Green/Yellow/Orange/Red telemetry classification. See `assets/the-felt-vocabulary.md`. The spectral language names the structure (eigenvalues, eigenvectors); the colours name the classification (Green/Yellow/Orange/Red); the words name the felt report (good/ache/twinge/pain). Same thing three times, not dogmatically.*

---

## The central synthesis

The Pellionisz/Llinás papers (1980, 1982) place the metric tensor in the cerebellum: the cerebellum performs the covariant-to-contravariant transform that converts sensory coordinates into motor commands. POB's extension, already stated in the sleep-tension asset, decentralizes this: the fascia *is* the metric tensor, encoded in collagen architecture. The cerebellum reads; the fascia stores.

The missing piece is *what* is stored. You don't store a full tensor at every point — that's expensive, slow, and requires real-time computation to read. You store the **spectral decomposition**: the eigenvectors (the preferred directions, encoded as collagen fiber alignment) and the eigenvalues (the prestress magnitudes, encoded as resting tension). That's the compressed representation. It is the eigenface move — describe a complicated thing by its loudest ingredients — except the "face" is the body's default stress landscape, and the "ghosts" are the principal tension directions laid down in the fascia.

This makes the "pre-computed" claim precise. The body doesn't solve a tensor eigenvalue problem during a fall. The eigenstructure was solved slowly, over thousands of loading cycles, by adaptation:

- **Wolff's law in bone:** trabeculae align along principal stress directions — literally the eigenvector field of the stress tensor.
- **Collagen remodeling in fascia:** fibers align along dominant loading directions — the eigenvectors of the stiffness tensor.
- **Resting muscle tone:** the prestress field whose eigenvalues set the default stiffness landscape.

The spectral decomposition is done in the material, ahead of time, by the body's own slow adaptation. The nervous system reads the recipe, not the raw data.

## The closed loop

Each element connects:

**Golgi tendon organs as eigenvalue threshold detectors.** The GTO measures force along its tendon. A tendon is a collagen cable aligned with a principal stress direction — it *is* an eigenvector of the local stress field. The force the GTO reads is the dominant eigenvalue projected onto that direction. The GTO fires at a threshold: that's an eigenvalue cutoff. The body doesn't compute the full tensor and then check whether the maximum eigenvalue is safe; it runs a one-component sensor along the eigenvector and cuts when the eigenvalue crosses the line. That's why the cutoff is instantaneous — there's no calculation, only a threshold check on a pre-aligned sensor.

Caveat to pressure-test: the GTO is a one-component sensor along a tendon that is, in fact, aligned with a principal stress direction — but the alignment is not perfect, and the GTO measures force, not stress. The reading is defensible if framed as "the GTO reads the dominant eigenvalue projected onto the tendon axis," not "the GTO reads the eigenvalue." The tendon is an eigenvector direction; the GTO reads the eigenvalue component along it.

**Muscle guarding as eigenvector clamping.** When the CNS recruits muscles to prevent a range of motion, it constrains the allowable displacement subspace. In the eigenbasis of the local stiffness, this is equivalent to clamping the dangerous eigenvectors — preventing motion along the principal directions that would produce damaging eigenvalues. Guarding is a spectral projection: the CNS projects out the dangerous eigenvalues by clamping the eigenvectors they live along.

**The Green/Yellow/Red telemetry as spectral risk assessment.** Green = all eigenvalues within the safe envelope. Yellow = an eigenvalue approaching the boundary. Red = an eigenvalue at the threshold, clamp the eigenvector. The classification is a spectral risk read.

**The clavicular fuse (Chapter 20) as pre-computed fracture along an eigenvector.** The clavicle snaps along a line. That line is the dominant eigenvector of the local stress field under impact. But the bone didn't compute that direction during the tackle — it pre-computed it over years of adaptation (Wolff's law). The trabecular architecture is already aligned to the principal stress directions of typical loading. The impact loads the pre-aligned eigenstructure and snaps along the pre-computed line. The fuse was set during adaptation; the blow triggers it.

**The staved-finger essay as eigenvector alignment.** Steepling introduces a constraint that gives all five fingers a shared reference plane. Spectrally: the constraint projects the stress field onto a subspace where the dominant eigenvector is shared across all digits. The CNS gets a common eigenvector to compare against — the "shared baseline" is a shared principal direction. The recovery mechanism (exploring the Green/Yellow boundary) is the CNS updating its eigenvalue thresholds for the shared eigenvector.

## The speed problem, resolved

A lot of simple decisions involve tensors but happen so quickly that calculation is likely done ahead of time. The spectral decomposition is the answer to *how* it's done ahead of time. The body is not computing tensors in real time. It is reading a spectral lookup table that the tissue built by living. The lookup is not a memory access — it is a physical act. You apply a force, the structure responds along its pre-aligned eigenvectors, and the nervous system reads the response. The lookup is the loading.

## The re-computation problem

The eigenstructure is not computed once. It must be re-computed periodically, because the body's loading environment changes and the tissue adapts. The question is: where and how does the body re-solve its eigenvalue problem?

**The floor as the baseline re-computation environment.** The floor is a good place to start working out eigenvectors because we know where everything is. The floor is a rigid datum — a known boundary condition. When you lie on the floor, gravity applies a uniform, known force field to the body. The boundary conditions are fully specified: the floor is flat, rigid, and level; gravity is constant and vertical. This is the cleanest possible setup for a spectral re-computation. The body is loaded with a known field against a known boundary, and the tissue's response reveals the current eigenstructure.

The 20,000-breath cycle (Tetley's "automatic therapist") is then a slow, iterative re-solver. Each breath applies a small, known perturbation (rib cage expansion against a rigid floor). The structure responds along its current eigenvectors. The nervous system reads the response and updates its model. Over a night of sleep on the floor, the body runs ~20,000 iterations of a slow eigenvalue solver, with gravity as the forcing function and the floor as the boundary condition. The eigenstructure drifts toward the floor-aligned baseline.

This is why the floor works and the mattress doesn't. The mattress is a compliant, unknown boundary — it absorbs the perturbation before the eigenstructure can be read. The floor is a rigid, known boundary — the perturbation propagates through the structure and the eigenstructure is revealed. The floor is not a "stretching device"; it is a spectral re-computation environment with known boundary conditions.

## The approach-and-retreat protocol

We can't just jump in with both feet flying. The tentative Yellow areas are there because we still need to test our assertions. We must approach and retreat until we have coloured the Yellow areas Green.

This maps directly onto the Green/Yellow/Red telemetry and the staved-finger recovery mechanism. The eigenstructure re-computation is not a single solve — it is an iterative process that must respect the CNS's risk classification:

- **Green zones** are eigenvector directions where the current eigenstructure is well-calibrated to the floor's boundary conditions. The body can load these fully. No update needed.
- **Yellow zones** are eigenvector directions where the current eigenstructure is uncertain — the stored eigenvectors don't match the floor's boundary conditions, and the CNS doesn't know whether the mismatch is safe. These are the directions that need re-computation. The body approaches (loads the direction), reads the response, updates the eigenvalue estimate, and retreats. Each approach-retreat cycle is one iteration of the solver for that eigenvector.
- **Red zones** are eigenvector directions where the stored eigenvalue is at or beyond the safety threshold. The CNS clamps these (muscle guarding). No re-computation happens in Red until the Yellow work has lowered the surrounding eigenvalues enough that the Red direction can be safely approached.

The "migration of stiffness" described in the floor assets (thoracic → pelvic → lumbar) is the eigenvector-by-eigenvector progression of the solver. The body re-computes the eigenstructure one principal direction at a time, from the most accessible (the thoracic cage, which is the most compliant) to the most defended (the lumbar spine, which carries the highest prestress and the strongest guarding). The stiffness "moves" because the solver is working through the eigenvector basis in order of decreasing eigenvalue magnitude — the loudest directions first, the quietest last.

The protocol is approach-and-retreat because the solver is iterative and the CNS will not let the body load an untested eigenvector to failure. You approach the Yellow boundary, read the response, retreat, and repeat. Each cycle turns a sliver of Yellow Green. Over weeks, the Yellow band retreats and the Green band expands. The eigenstructure is re-solved.

## Why this is a synthesis, not a citation

The literature search found eigenvalue methods used in the bio-tensegrity literature for form-finding (Chai Lian 2020), stability (Hukumori & Nishimura 2024), and modal analysis (Obara & Tomasik 2023, Chen & Feng 2012). The Ingber/Stamenović review (2014) frames stability through the positive-definiteness of the tangent stiffness matrix — an eigenvalue condition. But nobody connects the discrete tensegrity eigenvalue problem to the continuum stress tensor eigenvalue problem. And nobody connects either to the Pellionisz/Llinás cerebellar metric tensor, or to the fascia-as-storage extension, or to the floor as a spectral re-computation environment.

The synthesis:

1. Principal stresses are the eigenvalues of the Cauchy stress tensor; principal directions are its eigenvectors. (Standard continuum mechanics.)
2. The tensegrity's self-stress modes are the eigenvectors of its equilibrium matrix; its stability margins are the eigenvalues of its stiffness matrix. (Structural engineering, applied to biotensegrity.)
3. The fascia stores the spectral decomposition — eigenvectors as fiber directions, eigenvalues as prestress. (POB's extension of Pellionisz/Llinás.)
4. The body reads the pre-computed eigenstructure: the cerebellum does the coordinate transform, the GTOs check eigenvalues against thresholds, the muscles clamp eigenvectors when an eigenvalue goes Red. (The closed loop.)
5. The eigenstructure is re-computed by loading the body against a known boundary (the floor), with the breath cycle as the iterative solver and the approach-retreat protocol as the eigenvector-by-eigenvector traversal. (The floor as spectral re-computation environment.)

Steps 1–2 are established in separate literatures. Step 3 is POB's existing extension. Steps 4–5 appear to be new. The brief should pressure-test whether the gap is real (nobody has built steps 4–5) or whether I've missed a paper.

## What needs pressure-testing before this enters the book

1. **The GTO-as-eigenvalue-threshold reading.** Physically defensible if framed as "the GTO reads the dominant eigenvalue projected onto the tendon axis." Not defensible as "the GTO reads the eigenvalue." The tendon alignment with principal stress directions is real but not perfect. The framing matters.

2. **The discrete–continuous eigenvector analogy.** The tensegrity equilibrium matrix's eigenvectors (self-stress modes) are the discrete analogue of the continuum stress tensor's eigenvectors (principal directions). Both are "directions the system sustains without rotation." Is this a formal isomorphism or a structural analogy? The brief should determine whether the claim is "these are the same mathematical structure" (strong, possibly overclaiming) or "these share a mathematical structure" (weaker, safer, still useful).

3. **The floor-as-spectral-re-computation framing.** This is the most novel and the most vulnerable. The claim is that lying on the floor with known boundary conditions allows the body to re-solve its eigenstructure via iterative loading. Is this defensible from what we know about adaptation, Wolff's law, and collagen remodeling? Or is it a metaphor that sounds physical but isn't? The test: can the re-computation be stated without the spectral language and still make sense? If yes, the spectral language is earning its place. If no, it's decoration.

4. **The voice test.** Any of this that enters the book must pass the single-voice gate against the staved-finger benchmark. The danger is textbook drift ("the characteristic polynomial det(σ − λI) = 0"). The test paragraph should name the spectral thread in the book's register — measured, physical, grounded in a body — before the brief concludes.

## Where it lands

Candidate locations:

- **Appendix B (the historical lineage):** The natural home for the full synthesis. The appendix already houses Pellionisz/Llinás, Levin, and Ogden. The spectral hinge is the thread that connects them.
- **Chapter 20 (clavicular fuse):** The strongest main-text touchpoint. One sentence naming that the clavicle snaps along the dominant eigenvector of the stress field, and that the eigenstructure was pre-computed by adaptation. The appendix carries the full argument.
- **The floor assets / a potential floor chapter:** The floor-as-spectral-re-computation framing could strengthen the floor material if it passes the pressure-test. This is the most speculative candidate.

The voice-test paragraph should be the appendix's opening. If it passes the gate, the appendix has a reason to exist. If it doesn't, the thread stays here, in the assets, as research material.

## Falsifiability: what would break each assertion

The book's job is not to prove these assertions. The book's job is to state them clearly enough that someone could design an experiment to disprove them, and to make them compelling enough that someone would bother. The epistemic status is: model, not measurement. The spectral hinge is a theoretical frame, same as the book's other continuum models. Do not present as established.

Each assertion below is stated with its falsifier — the observation that would break it — and its interest — the reason someone might bother to test it.

### Assertion 1: Fascia stores eigenvectors as fiber directions, eigenvalues as prestress

**Claim:** The spectral decomposition of the body's stress landscape is encoded in the physical architecture of the fascia — collagen fiber alignment is the eigenvector field, resting tension is the eigenvalue field.

**Falsifier:** If collagen fiber directions in fascia do not correlate with the principal stress directions of habitual loading, the claim is false. Testable by histological examination of fascial architecture from individuals with known, distinct loading histories (e.g., sprinters vs. swimmers vs. sedentary), comparing fiber alignment to computed principal stress directions from their respective activity profiles. If the alignment is random or follows a non-stress-driven pattern, the assertion dies.

**Interest:** If true, fascia is a physical memory of the body's stress history, stored in the optimal compression format. The body doesn't carry the full tensor; it carries the spectral decomposition — the loudest directions and their magnitudes. That's the eigenface move, in tissue.

### Assertion 2: The GTO reads the dominant eigenvalue projected onto the tendon axis

**Claim:** The Golgi tendon organ is a one-component threshold detector aligned with a principal stress direction. It fires when the eigenvalue component along its tendon exceeds a threshold. The protective cutoff is instantaneous because it is a threshold check on a pre-aligned sensor, not a computation.

**Falsifier:** If GTO firing thresholds do not correlate with the eigenvalue of the local stress field along the tendon axis (controlling for absolute force), the claim is false. Testable by simultaneous measurement of GTO firing, tendon force, and the full local stress tensor (e.g., via ultrasound elastography). If the GTO fires at a fixed absolute force regardless of the stress tensor's spectral structure, the spectral framing adds nothing.

**Interest:** If true, the body's protective system is calibrated to the spectral structure of stress, not to absolute force. A GTO that reads eigenvalues would fire differently for the same absolute force depending on whether the force is aligned with a principal direction (high eigenvalue, high risk) or off-axis (distributed across eigenvectors, lower risk per direction). That's a non-obvious prediction.

### Assertion 3: The floor is a spectral re-computation environment

**Claim:** Lying on a rigid floor with known boundary conditions allows the body to re-solve its eigenstructure via iterative loading (the breath cycle). The floor is a measurement apparatus with a known forcing function (gravity) and a known boundary (rigid, flat, level), not a stretching device.

**Falsifier:** If lying on a rigid floor does not produce measurable changes in the body's stiffness eigenstructure that differ from lying on a compliant surface (controlling for time, temperature, and posture), the claim is false. Testable by measuring the body's mechanical impedance or stiffness matrix before and after floor vs. mattress sessions. If the floor produces no distinguishable change in the eigenstructure compared to a mattress, the re-computation framing is decoration.

**Interest:** If true, the floor works not by stretching tissue but by providing a clean experimental setup for the body to re-solve its own spectral decomposition. This predicts that a known-but-uncomfortable surface (rigid floor) is more useful than an unknown-but-comfortable one (mattress), because the known boundary is what makes the re-computation possible. It also predicts that the breath cycle is the mechanism (the iterative solver), which means respiratory rate and depth should correlate with the rate of eigenstructural change. Non-obvious, testable, practically consequential.

### Assertion 4: Approach-and-retreat is eigenvector-by-eigenvector traversal

**Claim:** The body re-computes its eigenstructure one principal direction at a time, in order of decreasing eigenvalue magnitude (most defended last). The migration of stiffness (thoracic → pelvic → lumbar) is the solver working through the eigenvector basis.

**Falsifier:** If the order of stiffness resolution during floor practice does not correlate with the eigenvalue magnitudes of the local stiffness matrix (highest prestress resolved last), the claim is false. Testable by tracking the sequence of tissue release (via palpation, ultrasound, or self-report) and comparing it to the computed eigenvalue ranking of the body's stiffness matrix at each location. If the release order is random or follows a non-spectral pattern (e.g., proximal-to-distal regardless of prestress), the spectral traversal claim dies.

**Interest:** If true, the approach-and-retreat protocol is not a generic conservative strategy — it is the optimal traversal order for an iterative eigenvalue solver working through a basis. The body processes the cheapest eigenvectors first and the most expensive last, which is the computationally efficient order. The stiffness moves because the solver is traversing the spectrum. This reframes a well-known clinical observation (stiffness migration) as a structural prediction.

### Assertion 5: The decisions are pre-computed, not computed in real time

**Claim:** The body's fast protective decisions (GTO cutoff, muscle guarding) happen too quickly for real-time tensor computation and are instead threshold checks on a pre-computed spectral structure stored in tissue.

**Falsifier:** This is the hardest to falsify directly, because it is an inference to the best explanation. It would be weakened if (a) neural recordings showed real-time tensor-level computation in the spinal cord or cerebellum at the timescales of protective reflexes (sub-100ms), or (b) the response latencies were shown to be consistent with real-time computation rather than lookup. It would be strengthened if the latencies are too fast for the computational complexity but consistent with threshold checking.

**Interest:** If true, the body is not a computer but a lookup table that reads its own physical structure. The nervous system reads the recipe, not the raw data. This is the assertion that makes the whole synthesis click — it explains the speed, it connects to adaptation, and it gives the eigenvalue thread a biological reason to exist. It is also the most speculative, because the "too fast for computation" argument depends on assumptions about neural computation speed that are not fully settled.

### The epistemic register

These are assertions, not findings. The book should present them as a model — here is what the model predicts, here is what would break it, here is why it is worth testing. The reader is invited into the investigation, not asked to take it on faith. This is the same epistemic register as the walking-songs Poynting work: nobody has computed the stress-velocity product in vivo for a walking singer, and doing so would be formidable. Same epistemic status as the book's other continuum models — models, not measurements.

The book's contribution is not the proof. The book's contribution is the framing — naming the spectral structure that connects things the reader already feels (the clavicle snaps along a line, the stiffness migrates, the floor feels different from the mattress, the GTO fires instantaneously) and showing that the framing is falsifiable. If the framing is interesting enough, someone will design the experiment. If the experiment breaks the framing, the book was still worth writing, because it named a question worth asking.

## Voice-pass directive: grad/div/curl as bridge language

The eigenvalue/eigenvector language is *static* — it describes what is stored but not how it moves. The grad/div/curl language is *dynamic* — it describes change, and change is what the body feels. The voice pass should use the operators to name the dynamics, not just the structure. The two together — static spectral + dynamic operators — give the reader two grips on the same thing: what it is, and what it does.

The memorable core is: two kinds of things can happen faster or slower.

- **Spatial rate (grad):** the gradient points in the direction of steepest increase and has magnitude equal to the rate. Steep or shallow — the direction the body wants to move, and how urgently. The eigenvectors of the stress tensor *are* the directions of the steepest gradient of the strain energy landscape. The eigenvalues *are* the gradient magnitudes. So the spectral decomposition can be stated as: the body stores the direction of steepest change and how steep it is, for each principal direction. That's the eigenpair in grad language — steep and shallow, which the body feels.

- **Dynamic rate (div and curl):** the divergence measures net flux — how fast things are accumulating or dispersing at a point. The curl measures local rotation — how fast things are turning. Both can happen faster or slower: strong divergence, rapid accumulation; weak divergence, slow dispersal. Fast curl, rapid rotation; slow curl, gentle rotation. These are temporal rates — how the field flows or rotates — and they name what the body feels during movement: the speed of convergence and the speed of rotation.

### The specific mappings

**Eigenvectors as gradient directions.** The eigenvectors of the stress tensor are the directions of the steepest gradient of the strain energy density. The eigenvalues are how steep. The body stores the steepest directions and their steepness — that's the spectral decomposition in grad language. The GTO reads the gradient projected onto the tendon axis; the threshold is a gradient threshold. The clavicle snaps along the direction of steepest gradient because that's where the strain energy converges fastest.

**The nose test as gradient following.** The hand follows the gradient of the error field — the direction of steepest decrease in distance to the nose. The slow approach is the nervous system following the gradient at high resolution, taking small steps along the steepest direction. The 1cm is the gradient's resolution — the smallest step the nervous system can distinguish. The fast phase is coarse gradient following (steep direction, big steps); the slow phase is fine gradient following (same direction, small steps, high resolution). The Green/Yellow/Red classification is a gradient magnitude test: shallow gradient far from target (Green), steep gradient near target (Yellow), gradient at threshold (Red).

**The floor as divergence reflection and curl change.** The stress field's divergence is zero at equilibrium — stress flows through without accumulating. The floor's rigid boundary changes the divergence pattern: stress that would flow into a compliant mattress (non-zero divergence at the boundary — the mattress absorbs) is reflected back by the rigid floor (zero divergence at the boundary — the floor reflects). The floor doesn't absorb; it reflects. The re-computation works because the reflection sends the stress back through the body's eigenvectors, and the nervous system reads the response. The curl of the rib cage changes on the floor: on a mattress, the ribs expand outward (low curl, mostly radial); on the floor, the ribs can't expand outward, so the curl changes — the rotation goes into articulating the costovertebral joints. The 20,000 breaths are 20,000 curl-changes at the rib-floor boundary, each one a small rotation the nervous system reads.

**The clavicle fuse as divergence sink.** Chapter 20 already uses ∇·**σ** = 0. The spectral reading extends it: the clavicle is a sink — forces converge into it (negative divergence, rapid accumulation). The surrounding fascia is a source — forces disperse through it (positive divergence, slow dispersal). The cat's paw is all source, no sink — uniformly positive divergence, the force disperses. The human clavicle is a concentrated sink — sharply negative divergence at one point, the force converges. The clavicle snaps because it's the point of maximum convergence (most negative divergence), and the eigenvector is the line along which the convergence happens. The eigenvalue exceeds the yield threshold because the divergence is too negative — the force is arriving faster than the bone can disperse it.

**Approach-and-retreat as gradient traversal.** The approach follows the gradient (steepest decrease in error). The retreat is when the gradient estimate is too noisy — the nervous system pulls back to get a cleaner read on the direction. The Green/Yellow/Red classification is a gradient magnitude test. The approach-and-retreat is iterative gradient descent with a noise-based step size — fast when the gradient is clear and shallow, slow when the gradient is steep and noisy.

### The discipline

The principle is: same thing three times in different ways — equation, spectral language, operator language — but not dogmatically. Where the equation is self-evident (1+1=2 does not need an explanation), one rendering is enough. Where the connection between equation and felt experience is non-obvious, the operator language earns its place as the bridge. The grad/div/curl blocks (the `:::grad`, `:::div`, `:::curl` convention defined in `content/grad-div-curl-demo.md`) are the rendering mechanism; the mappings above are the content that would fill those blocks.

Not every spectral claim needs all three renderings. The discipline is: use the operator language where it helps the reader feel the dynamic, use the spectral language where it helps the reader see the structure, and use the equation where it is precise. Where two of the three are self-evident from the third, one is enough. The book is not a translation exercise — it is a communication exercise, and the reader's body staying in the room is the test.

### Typographic and layout implications (for later)

The `:::grad`, `:::div`, `:::curl` block syntax already exists in the SSG. If the spectral hinge material enters the manuscript, the blocks may need:

- Consistent visual treatment (indent, background, or margin mark) so the reader recognises them as operator-explanation blocks, not regular prose.
- Possibly a fourth block type for the spectral language (`:::spec` or similar), if the eigenvalue/eigenvector explanation earns its own visual slot alongside the operators.
- Marginal cross-references: when a chapter uses an operator block, the margin could note where the operator was first defined (the glossary or Chapter 0), so the reader can look up the term without the chapter re-explaining it.

These are for the layout pass, not the voice pass. The voice pass is: write the blocks in the book's register, against the staved-finger benchmark. The layout pass is: make them look like they belong in the book.

## References

- Pellionisz, A. & Llinás, R. (1980). Tensorial approach to the geometry of brain function: cerebellar coordination via a metric tensor. *Neuroscience*, 5(7), 1125–1136.
- Pellionisz, A. & Llinás, R. (1982). Space-time representation in the brain: the cerebellum as a predictive space-time metric tensor. *Neuroscience*, 7(12), 2949–2970.
- Ingber, D.E., Wang, N. & Stamenović, D. (2014). Tensegrity, cellular biophysics, and the mechanics of living systems. *Rep. Prog. Phys.*, 77(4), 046603.
- Chai Lian, O. et al. (2020). Form-Finding of Spine Inspired Biotensegrity Model. *Applied Sciences*, 10(18), 6344.
- Hukumori, I. & Nishimura, T. (2024). Shape Control of Spine-Type Tensegrity Model by Eigenvalue Constraints of Tangent Stiffness Matrix. *J. Structural Engineering B*, 70B.
- Obara, P. & Tomasik, J. (2023). Dynamic Stability of Tensegrity Structures — Part I. *Materials*, 16(2), 580.
- Fraldi, M. et al. (2019). Buckling soft tensegrities. *J. Mech. Phys. Solids*, 124, 299–324.
- Wolff, J. (1892). Das Gesetz der Transformation der Knochen. (Wolff's law — trabecular alignment along principal stress directions.)
- Tetley, M. (2000). The effect of sleeping surface on spinal alignment. *BMJ* (the 20,000-breath cycle).
