### Operational Heuristic: Consistency Check
1. Target State vs. Actual State: Does the current workspace contain multiple patterns for the same outcome (e.g., both REST and GraphQL setups, two different state managers)?
2. Ghost Dependencies: Are there imported modules or utilities in the target file that are not utilized by the new architectural direction?
3. Contradictory Intent: Does the existing codebase contain "TODOs" or comments that align with the old path but contradict the current prompt?