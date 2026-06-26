# upright state

- a bounded continuum bio-tensegrity structure standing on a Euclidean half space in an orthogonal 1g vector field.
- we could maybe try a walking structure too

```mermaid
graph TD
    %% Style Definitions
    classDef ground fill:#111,stroke:#fff,stroke-width:4px,color:#fff;
    classDef activeNode fill:#eee,stroke:#000,stroke-width:2px,stroke-dasharray: 5 5,color:#000;

    %% Upright Topology
    H(Head Node: Active Pre-stress):::activeNode
    T(Thorax Node: Active Pre-stress):::activeNode
    P(Pelvis Node: Active Pre-stress):::activeNode
    
    %% Loops and Slings
    H <=>|Cervical Tensor Loop| T
    T <=>|Oblique Fascial Slings| P
    T <=>|Shoulder Cross Torsion| T
    
    %% Restricted Vector Output
    P -->|Asymmetric Left Leg Vector| L_Foot[Left Foot Pivot Node]
    P -->|Asymmetric Right Leg Vector| R_Foot[Right Foot Pivot Node]
    
    %% Pinched Boundary Interface
    G[GROUND DATUM: Z = 0]:::ground
    L_Foot ===>|Concentrated Force Vector| G
    R_Foot ===>|Concentrated Force Vector| G
```