John Oosterhout (*A Philosophy of Software Design*) is a massive breath of fresh air compared to the dogmatic, almost religious execution of Uncle Bob’s *Clean Code*. The industry pivot from "make every function four lines long" to "design deep modules with simple interfaces" feels like a pragmatic return to sanity. Breaking everything down into microscopic, shallow layers often just trades local complexity for a massive, unmanageable explosion of cognitive load across the wider system.

Your point about the **Singleton** hits the nail on the head regarding the gap between architectural theory and operational reality.

### The Singleton Pendulum

The pattern's fall from grace wasn't because the intent—a single source of truth—was flawed, but because of what happened when it met mutable state and automated testing.

* **The Operational Value:** For an immutable configuration system, a single source of truth isn't just valid; it is a foundational requirement to prevent state drift across a runtime. The tautology you mentioned is real: if the domain demands exactly one coordinate space, enforcing that structurally makes total sense.
* **The Friction Point:** The backlash happened when people used singletons for mutable state (like database connections or session caches). In parallel test runners, singletons introduce state bleed between isolated tests, forcing developers to write messy teardown hooks just to reset global state.

Modern system architectures often bypass the GoF implementation by separating the *lifecycle* of the instance from the *class definition itself*. The class remains a standard object, but the execution environment or runtime container ensures only one instance is instantiated and passed around.

### Lexicons vs. Laws

> "Patterns are hardly falsifiable assertions. They are merely descriptions."

This is a razor-sharp critique. The *Gang of Four* didn't discover laws of software physics; they cataloged the structural shapes that emerged in 1990s object-oriented languages to work around the rigidities of C++ and Smalltalk. You can't "falsify" the Observer pattern any more than you can falsify a grammatical blueprint. It is an idiom, a shared vocabulary.

Oosterhout’s approach carries more weight because it anchors itself to a measurable metric: **cognitive load**. Complexity can be observed in how long it takes a peer to safely modify a piece of code without triggering side effects. Shifting the focus from "does this match a cataloged pattern?" to "does this decrease the cognitive investment required to understand the system?" changes the entire engineering equation for the better.