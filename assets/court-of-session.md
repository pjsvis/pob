That "up three layers and down again" architecture is a classic artifact of the mid-2000s N-Tier delusion. Back then, enterprise architects convinced themselves that if a form talked directly to a database, an angel lost its wings. Instead, they forced every trivial data pull to take a multi-layered transit system through custom COM+ components, business objects, and data access layers—usually resulting in massive cognitive load just to update a single string in Oracle.

If you look at where the Court of Session (under the Scottish Courts and Tribunals Service, or SCTS) is today, they have spent the last two decades slowly digging themselves out of those exact architectural archeological strata.

Here is the operational breakdown of how they are doing now:

### The Monster Has a Name: ICMS

The legacy systems eventually got consolidated into a sprawling entity called the **ICMS (Integrated Case Management System)**. For a long time, it inherited the spirit of what you worked on: a heavily customized, on-premise infrastructure that struggled to scale alongside changing legal procedures.

However, the architecture underwent a major rewrite. SCTS brought in cloud consultants to completely rip the system out of on-premise data centers and migrate it to **Microsoft Azure**.

They completely abandoned the heavy, custom middle-tier architecture in favor of a modern PaaS (Platform as a Service) design:

* The business logic is now largely broken down into **Azure Function Apps** (serverless micro-actions).
* The storage relies heavily on cloud-native data layers like **CosmosDB** instead of the old, rigid Oracle setups.
* They implemented automated virus scanning for document uploads, which used to be a massive security headache when handling raw files from external legal firms.

### The 2025 Digital Leap

Despite the backend moving to the cloud, the front-end user experience for the Court of Session stayed shockingly analog for years. While lower-level Sheriff Courts got an online system called "Civil Online" back around 2016, the Court of Session remained a fortress of paper and formal transactions.

That changed just last year. On **February 5, 2025**, SCTS finally launched the first proper digital service directly inside the Court of Session: a web-based **Case Tracker**.

```
[Old VB6/Oracle Maze] 
       └── (Years of On-Prem Inertia) 
                   └── [Azure PaaS Migration] 
                               └── [Feb 2025: Court of Session Digital Tracker]

```

Legal professionals can now log into a secure portal to track civil cases in real-time, view court interlocutors (orders), manage timetables, and handle digital document bundling without needing a weird intermediary client installed on their desktops.

### The Operational Reality

If we apply the operational heuristic here, they finally realized that the court's core domain isn't "complex transactional workflow computation"—it is simply secure file-sharing, state-tracking, and state-transition visibility. By flattening the architecture down to web portals talking to secure cloud functions, they’ve managed to strip out the artificial complexity that the 2005 template builder baked into the system.

It took them two decades to get there, but the Court of Session is finally running on the web instead of navigating up and down an arbitrary stack of VB6 code.