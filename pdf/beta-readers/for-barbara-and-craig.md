# For Barbara and Craig — the rigour test

You're reading this book as the people who use these tools every day. Aircraft certification, continuum mechanics, stress tensors, anisotropic materials, finite-element methods — this is your professional vocabulary. The book has to be correct, not just plausible.

## What to read

1. **The onboarding chapter** (`chapter-00-the-vocabulary.pdf`) — the book's introduction to grad, div, curl, and the stress/strain tensors. Check whether the definitions are right, and whether the physical interpretations (divergence as force density, the Poynting effect as a curl-divergence coupling) are sound.
2. **Chapter 02: The Torsion Engine** (`chapter-02-the-torsion-engine.pdf`) — the Poynting effect in the spine. Directly relevant to wing torsion: a hyperelastic cylinder under torsional load develops an axial extension proportional to the square of the twist.
3. **Chapter 10: The Laminated Core** (`chapter-10-the-laminated-core.pdf`) — laminated shell mechanics, angle-ply composite theory, hoop stress. Directly parallel to composite wing structures.
4. **Chapter 18: The Clavicular Fuse** (`chapter-18-the-clavicular-fuse-and-the-tensor-of-impact.pdf`) — brittle failure, stress invariants, the divergence of impact. The clavicle as a calibrated shear pin.

## What to look for

- **The math.** Is the tensor notation correct? Are the indices right? Are the physical interpretations defensible — the divergence of the stress tensor as internal force density, the Green-Lagrange strain, the Belt Friction Equation applied to fascia?
- **The claims.** The book makes strong claims (the Poynting effect runs the spine; the clavicle is a deliberate fuse; the foot is a sensory transducer, not a lever). Do the equations actually support those claims, or are they decorative?
- **The elasticity model.** The book uses $\sigma_{ij} = C_{ijkl}\,\varepsilon_{kl}$ with a fourth-order elasticity tensor "approximately isotropic." Is that approximation defensible for fascia, or is it a simplification that breaks the argument?
- **The finite-strain framing.** Several chapters invoke non-linear continuum mechanics (hyperelasticity, the Poynting effect is second-order). Is the book consistent about when it's in the small-strain regime and when it isn't?

## What not to worry about

- The prose. That's Laura's job.
- Whether the book is accessible. That's Emma's job.
- Whether the equations render. They do.

## How to respond

Flag any equation that's wrong, any index that's misapplied, any physical interpretation that's a stretch. The book is making a biomechanical argument with continuum-mechanics tools, and it has to survive scrutiny from people who use those tools daily. If a claim is correct but the equation that supports it is wrong, tell me — I'd rather hear it now than after publication. Be as technical as you like; I can take it.
