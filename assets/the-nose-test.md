# The Nose Test: A Reader-Reproducible Experiment in Pre-Computed Targeting

*Persisted 14 July 2026. Arising from the spectral hinge investigation (see `the-spectral-hinge.md` and brief `2026-07-14-brief-eigenvalues-in-biotensegrity.md`). This is research material (the yap), not voiced text. The voice pass happens if and when this enters the manuscript or an appendix.*

---

## The experiment

Lie on your back on a rigid floor. Arms out to the sides, backs of the hands resting on the floor. Eyes closed.

Slowly curl your hands off the floor. Slowly curl your forearms off the floor. Slowly raise one arm and move it so that the back of your wrist touches the tip of your nose.

Then try the inside of the wrist. Then the index finger. Then the thumb.

Measure the error. The base-level accuracy, eyes closed, slow movement, from a floor-known starting position, is on the order of 1cm.

## What the experiment measures

This is a proprioceptive targeting test with known boundary conditions:

- **Starting position:** fully specified by the floor. The back is on a rigid surface, arms out, backs of hands down. Every joint angle is known because the floor is rigid and the body is resting against it.
- **Target:** the tip of the nose — a fixed point on the skeleton that doesn't move relative to the body's coordinate frame.
- **Feedback:** proprioceptive only. Eyes closed. No visual correction.
- **Movement speed:** deliberately slow. This removes momentum and ballistic correction — the nervous system cannot launch-and-hope; it must guide continuously.
- **Endpoint:** varied (back of wrist, inside of wrist, fingertip, thumb). Each variation changes which point on the hand must find the nose, but the hand is a rigid body, so the transform between endpoints is a fixed offset.

The 1cm error is the resolution of the body's pre-computed spatial map, measured under clean boundary conditions, without visual backup.

## The eyes-open variant

Now stand up. Eyes open. Wipe your nose with the back of your hand.

Notice what you actually do. You don't go straight for the nose at full speed. You bring the hand close to the mouth, slow down, and then move in for the wipe. A fast approach to a rough position, then a slow, fine correction to the target.

This is a two-phase movement: fast approach, slow correction. Everyone does it. Nobody notices it.

## The cost asymmetry

The reason for the two-phase movement is that the cost of an error is not symmetric. A miss by 1cm is a successful wipe. A miss by 5cm is a jab. A miss at full speed is a bash in the face with a bony fist.

The nose is on the face. The face is the most expensive place to miss. The nervous system knows the map is good to ~1cm variance, but 1cm is the variance, not the worst case. A 3-sigma error is 3cm — the difference between a wipe and a bloody nose. The slow final approach is the nervous system reducing the variance by reading the proprioceptive stream at higher resolution, averaging out the noise before committing to contact.

## The spectral reading

### The floor as known boundary

The floor gives the known starting position — that's why the test works lying down. The back is on a rigid datum, arms out, hands down. Every joint angle is specified by the boundary condition. The nervous system has a clean reference frame. This is the same role the floor plays in the spectral re-computation framing: a known boundary that gives the body a fully specified starting configuration.

Prediction: the floor-based targeting should be more accurate than the standing-based targeting, because the floor provides a known boundary condition. Standing, the starting position is less constrained (the arm hangs, the shoulder has degrees of freedom), and the accuracy should degrade. Testable.

### The nose as fixed eigenvector

The tip of the nose is a constant in the body's coordinate frame. The hand has to find it, which means the nervous system has to compute the transform from "hand on floor" to "hand at nose." That's a coordinate transform in the Pellionisz/Llinás sense — the cerebellum converts the proprioceptive coordinates of the hand's current position into the motor coordinates needed to reach the nose.

The fact that it can do this to 1cm accuracy, slowly, eyes closed, from a floor-known start, is a measurement of the pre-computed coordinate map's resolution. The map was already there. The floor just gave it a clean starting point to read from.

### The endpoint variation as rigid-body offset

When you switch from "back of wrist to nose" to "index finger to nose," the target in the body frame doesn't change — the nose is still the nose. What changes is which point on the hand has to reach it. The hand is a rigid body, so the transform from "back of wrist at nose" to "index finger at nose" is a fixed offset — a known rigid-body transform within the hand's own frame.

The fact that accuracy stays around 1cm regardless of endpoint suggests the nervous system computes the target in a body-fixed frame and then applies the endpoint offset, rather than re-computing the whole trajectory for each endpoint. The nose is the dominant target; the endpoint is a minor correction. That's the compression move — store the target once, apply the offset as needed.

### The two-phase movement as Green/Yellow traversal

The eyes-open wipe is the approach-and-retreat protocol running in real time, in a context everyone has performed thousands of times:

- **Green (fast approach):** hand is far from the face, moving fast. The error margin is large, the cost of a miss is low. The body runs the pre-computed trajectory at speed. The eigenvector is roughly right; an error of several cm costs nothing.
- **Yellow (slow correction):** hand is near the mouth, slowing down. The error margin is narrowing, the cost of a miss is rising. The nervous system switches to high-resolution proprioceptive reading — the slow approach. Each increment is a small loading of the eigenvector, a threshold check, a retreat, another approach. The variance is being reduced by averaging.
- **Red (contact):** hand is at the target. The movement stops. The wipe happens.

The slow phase is not vision doing fine targeting. Vision got the hand to the rough position. The slow phase is proprioception doing the fine targeting, because the final 1cm is below visual resolution at that range and because the face is too expensive to trust to vision alone. The eyes are open, but the eyes are not the primary guide for the final approach. Proprioception is.

### The cost asymmetry as selection pressure

The approach-and-retreat protocol is not a conscious choice. You don't decide to slow down near your face; the nervous system slows you down, sub-cortically, the same way the GTO cuts force without asking. The protocol was built by selection pressure: over evolutionary time and individual development, the body learned that self-targeting movements to the face need a slow final approach because the cost of an error is catastrophic. The inconvenience of a bash in the nose is the selection pressure that built the protocol.

This is the same structure as the GTO threshold, but for self-directed movement:

- The **GTO** protects against an eigenvalue that's too high — too much force along a principal direction. It checks the eigenvalue and cuts.
- The **slow approach** protects against an eigenvector that's slightly off — direction error on a self-target. It checks the eigenvector and corrects.

Both are threshold-checking mechanisms on a pre-computed spectral structure. The GTO checks the eigenvalue; the slow approach checks the eigenvector.

## What this gives the book

This is a reader-reproducible experiment in 30 seconds. The reader lies on the floor, closes their eyes, touches their nose, and measures their own accuracy. The 1cm error is not a number in a paper — it's a felt quantity, measured on the reader's own body.

The experiment demonstrates:

1. **The pre-computed map exists.** The body has a spatial map of itself, accurate to ~1cm, readable without vision, from a known boundary condition. The floor is the known boundary; the nose is the fixed target; the 1cm error is the map's resolution.
2. **The map is spectral.** The target (nose) is a fixed eigenvector in the body frame. The endpoint offset (which part of the hand) is a minor correction. The nervous system stores the target once and applies the offset, rather than re-computing per endpoint.
3. **The approach-and-retreat protocol is real and observable.** The eyes-open wipe shows the two-phase movement — fast approach, slow correction — that everyone does and nobody notices. Naming it gives the reader a new way to feel a familiar action.
4. **The protocol is driven by cost asymmetry.** The slow final approach exists because a miss at full speed is a bash in the face. The face is the most expensive place to miss. The protocol is the nervous system pricing that asymmetry.

## Falsifiability

**Assertion: the floor-based targeting is more accurate than standing-based targeting, because the floor provides a known boundary condition.**

Falsifier: if targeting accuracy (eyes closed, slow movement, hand to nose) is the same lying on a rigid floor as standing upright, the "floor as known boundary" claim weakens. Testable by comparing accuracy across the two conditions with the same subjects.

**Assertion: the slow final approach is proprioceptive, not visual.**

Falsifier: if the slow final approach disappears or degrades when eyes are closed (for the upright wipe), then vision is the primary guide for the final approach, not proprioception. Testable by comparing the movement profile (speed vs. distance from target) with eyes open vs. closed.

**Assertion: the 1cm accuracy is the resolution of the pre-computed map, not a real-time computation.**

Falsifier: if the accuracy degrades systematically with movement speed (slower = more accurate, because more time for real-time computation), the "pre-computed" framing weakens — it would suggest real-time computation is contributing. The prediction from the pre-computed framing is that accuracy is roughly speed-independent for slow movements (the map is already there; speed doesn't change the map's resolution), but degrades sharply for fast movements (ballistic, no continuous correction). Testable by measuring accuracy across speeds.

## Connection to the spectral hinge

The nose test is the spectral hinge made tangible. The abstract claims — fascia stores eigenvectors, the body reads a pre-computed map, the approach-and-retreat protocol is eigenvector traversal — become a felt experiment: lie down, close your eyes, touch your nose, measure the error. The 1cm is the eigenstructure's resolution. The slow approach is the Yellow-zone traversal. The cost asymmetry is the selection pressure that built the threshold-checking protocol.

The experiment is also the falsifier for the "floor as known boundary" assertion, stated in a form the reader can run on themselves: try the same movement standing up, eyes closed, and see if the accuracy changes. If it doesn't, the floor's role as a known boundary is less important than the framing claims. If it does, the framing has a measurable prediction confirmed by the reader's own body.

## Epistemic register

Same as the spectral hinge: model, not measurement. The nose test is a reader-reproducible observation that demonstrates the model's predictions. The 1cm accuracy is a measurement; the spectral interpretation of why the accuracy is 1cm is a model. The book presents the measurement, names the model, states the falsifier, and invites the reader to test both.

## The Jaynes floor

The worst case for the spectral hinge is that it ends up like Julian Jaynes's *The Origin of Consciousness in the Breakdown of the Bicameral Mind* (1976): a bold, falsifiable, structurally coherent hypothesis that turned out to be wrong — or at least, wrong enough that the evidence didn't support it. But Jaynes's book was interesting enough to be worth falsifying, and it named a question nobody else had asked in that way. The book's value is not that it was right; it's that it made the question visible.

The criticism of Jaynes — "where are the competing hypotheses?" — is the same criticism that applies to the biomechanics field. The field has the ingredients (tensegrity, tensor network theory, continuum mechanics, eigenvalue methods) and has not built the bridge. The spectral hinge is a bridge. It may be the wrong bridge. But it's a bridge, and the field's failure is the absence of bridges, not the presence of wrong ones.

The Jaynes floor sets the epistemic standard: the book is not claiming to be right. The book is claiming to be interesting enough to be worth falsifying, and to be more falsifiable than the alternative, which is no hypothesis at all. If the spectral hinge is wrong, it's a Jaynes — a bold, coherent, named question that turned out not to survive the evidence. That's a worthwhile thing to have written, because it makes the question visible, and the next hypothesis has to engage with it rather than starting from nothing.

The difference between the spectral hinge and Jaynes is that the spectral hinge is falsifiable by measurement, not by reinterpretation. Jaynes's evidence was historical and literary — the Iliad, the absence of introspection in ancient texts — evidence that could be reinterpreted multiple ways. The nose test is a number. The floor-vs-standing comparison is a test. The speed-accuracy relationship is a curve. These are falsifiable in a way that "the Achaeans couldn't introspect" is not. A charming wrong hypothesis that dies by measurement is more useful than a charming wrong hypothesis that survives by being unfalsifiable, because the measurement tells the next hypothesis what to explain.

The book's contribution is the framing and the falsifiability, not the proof. Jaynes is the floor. Penrose is the ceiling — the model of how to present bold theoretical work with confidence and without overclaiming (see the bibliography asset).
