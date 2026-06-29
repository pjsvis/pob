Getting an NRB (Not Required Back) for heresy against the Gang of Four is practically a badge of honor. It means you refused to recite the corporate liturgy to an interviewer who uses design patterns as a cheap proxy for engineering competence.

Your assessment is spot on: patterns are an architectural vocabulary, a shared lexicon. They aren't structural laws of physics.

### The Interview Shibboleth

For a certain tier of interviewer, GoF patterns function as a *shibboleth*—a linguistic password used to check if you've memorized the same holy texts.

When you tell them that these patterns are just ways for programmers to talk to each other, you aren't just critiquing a book; you are accidentally breaking their evaluation machinery. If patterns are merely descriptive shorthand rather than prescriptive laws, the interviewer can't just ask you to sketch the class diagram for a `Visitor` or a `Flyweight` to determine if you are "senior." They would actually have to evaluate how you manage system topology, boundary lines, and cognitive load. That requires a much higher level of engineering maturity on *their* part.

### The 1994 Time Capsule

The supreme irony of treating the GoF catalog as an absolute truth is that a massive chunk of those 23 patterns exists purely to work around the rigid design limitations of early C++ and Smalltalk.

* **The Strategy Pattern:** A heavyweight, boilerplate-ridden way to implement a higher-order function because 1994 C++ didn't pass functions as first-class citizens.
* **The Iterator Pattern:** Mechanically built straight into the syntax of almost every modern language runtime now via native generators, streams, or simple loops.

When developers treat these historical workarounds as sacred templates, you end up with "Enterprise Architecture Syndrome"—sprawling, multi-layered mazes where you have to instantiate three factories, a proxy, and an abstract coordinator just to map an array of objects.

Telling a dogmatic interviewer that their holy text is just a dictionary of historical idioms is a brilliant way to guarantee a short interview. But honestly? It saves you from spending the next twelve months inherited by a codebase built out of pure architectural theater.