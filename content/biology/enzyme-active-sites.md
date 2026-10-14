---
title: Enzymes, substrates and gatekeeping loops
tags: [molecular-biology, enzymes, protein-structure]
created: 2026-09-18
related: [gene-expression-and-assays, protein-structure-methods, polyamines-and-cancer]
source: "Claude conversation: Understanding protein expression basics (2026-09)"
---

## Article

### Enzymes and substrates

An **enzyme** is a protein that catalyzes one specific chemical reaction: it speeds the reaction up without being consumed. The molecule the enzyme acts on is its **substrate**. The substrate binds in a pocket of the enzyme called the **active site**, where it is chemically transformed into the **product**. Some reactions need a second molecule bound alongside, for example one that donates the chemical group being added.

### Ligands

**Ligand** is the broader word: anything that binds a protein. Substrates, products, inhibitors and cofactors are all ligands. **Substrate** specifically means the ligand that gets converted by the reaction. An **inhibitor** is a ligand that blocks the enzyme, for example by occupying the active site so the substrate cannot bind. Drug design against an enzyme usually means designing an inhibitor.

### Example: spermidine synthase

Spermidine synthase is an enzyme of the [polyamine pathway](#/note/polyamines-and-cancer). Its substrate is **putrescine** and its product is **spermidine**. The chemical group added (an aminopropyl group) is donated by **decarboxylated S-adenosylmethionine** (dcSAM):

$$
\text{putrescine} + \text{dcSAM} \;\longrightarrow\; \text{spermidine} + \text{5'-methylthioadenosine}.
$$

The chat called the donor a "cofactor". Since dcSAM is consumed in the reaction, it is more precisely a second substrate. The dcSAM detail is the standard textbook account, added here rather than taken from the chat.

### Gatekeeping loops

"Gatekeeping loop" is not a single term with one fixed definition. It is used for many enzymes, for a **flexible loop of amino acids that sits over the active site and controls access to it**, like a lid or door.

Typical behavior: with nothing bound, the loop is **disordered** (floppy, with no fixed shape). When the substrate binds, the loop folds down over the active site and becomes ordered, locking the substrate in place while the reaction happens. Binding that changes the protein's shape like this is called **induced fit**. The loop can do three jobs:

- **Selectivity.** Only molecules of the right size and shape trigger closure, which filters out molecules that should not react.
- **Catalysis.** The closed loop can shield the reaction from water, or position amino-acid residues correctly for the chemistry.
- **Regulation.** Some loops close only under specific conditions, which gives the cell a way to switch the enzyme on or off.

Spermidine synthase has a well-studied loop of this kind. It is disordered in the structure solved with nothing bound and ordered once a ligand is bound. Seeing this requires comparing two structures, the [apo and holo structures](#/note/protein-structure-methods/apo-and-holo-structures). If a talk says "*the* gatekeeping loop", it means a specific loop of the enzyme under discussion.

## Cards

Q: What is a substrate, and how does it differ from a ligand?
A: A substrate is the molecule an enzyme acts on, the input converted into the product. A ligand is anything that binds a protein: substrates, products, inhibitors and cofactors are all ligands. "Substrate" means specifically the one the reaction converts.
See: Ligands

Q: What reaction does spermidine synthase catalyze, and what donates the added group?
A: Putrescine (substrate) → spermidine (product). The aminopropyl group is donated by decarboxylated S-adenosylmethionine (dcSAM), which becomes 5'-methylthioadenosine.
See: Example: spermidine synthase

Q: What is a "gatekeeping loop" in an enzyme?
A: A flexible loop of amino acids over the active site that controls access to it, like a lid. It is often disordered when nothing is bound and closes, becoming ordered, when the substrate binds. The term is used for many enzymes, not one fixed structure.
See: Gatekeeping loops

Q: How can a gatekeeping loop make an enzyme **selective**?
A: Only molecules of the right size and shape trigger the loop to close over the active site, so molecules that should not react are filtered out.
See: Gatekeeping loops

Q: Besides selectivity, how can the closing of a gatekeeping loop help the **chemistry** itself?
A: The closed loop can shield the reaction from water, and it can position amino-acid residues correctly for the reaction to happen.
See: Gatekeeping loops

Q: How can a gatekeeping loop act as a **regulator** of an enzyme?
A: Some loops close only under specific conditions, which gives the cell a way to switch the enzyme on or off.
See: Gatekeeping loops

Q: What does "induced fit" mean?
A: Binding of a ligand changes the protein's shape, for example a loop that is floppy when empty folds down over the bound substrate.
See: Gatekeeping loops

## Quiz

Q: Which of these is a ligand of an enzyme but **not** its substrate?
- [ ] The molecule that the enzyme converts into product
- [x] An inhibitor that sits in the active site
- [ ] The amino acids that line the active site
- [ ] The mRNA that encodes the enzyme
E: Inhibitors, products and cofactors all bind the protein, so they are ligands. Only the converted molecule is the substrate. The residues lining the pocket are part of the enzyme itself.
See: Ligands

Q: The typical behavior of a gatekeeping loop is…
- [x] disordered when nothing is bound; closed over the active site and ordered when the substrate is bound
- [ ] ordered when nothing is bound; disordered once the substrate binds
- [ ] permanently closed, so the substrate must enter through a separate channel
- [ ] cut off the enzyme after each reaction
E: The loop acts like a lid that closes on binding, which is why its behavior is seen by comparing the empty (apo) and bound (holo) structures.
See: Gatekeeping loops
