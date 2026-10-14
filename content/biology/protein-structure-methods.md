---
title: "Protein structures: crystallography, cryo-EM, apo vs holo"
tags: [molecular-biology, protein-structure, fourier-analysis, lab-methods]
created: 2026-09-18
related: [enzyme-active-sites, gene-expression-and-assays, polyamines-and-cancer]
source: "Claude conversation: Understanding protein expression basics (2026-09)"
---

## Article

Structural biology determines where every atom of a protein sits in space. Seminar talks report structures by method, resolution and what was bound.

### X-ray crystallography

The main technique for atomic structures:

1. Purify the protein and coax it into forming a **crystal**: a regular lattice of many copies of the same molecule.
2. Shoot X-rays at the crystal. Their wavelength (about 1 Å) is on the scale of atomic spacing.
3. The lattice diffracts the X-rays into a pattern of discrete **spots**. A single molecule scatters far too weakly to measure. The lattice adds the scattering of its copies coherently and concentrates it into these spots.
4. Use Fourier analysis to work back from the pattern to an **electron density map**.
5. Fit a model of the protein, whose amino-acid sequence is known, into the density. This gives atomic coordinates.

In step 4, the electron density $\rho$ is periodic on the lattice, so it is a Fourier series
$$
\rho(x) = \frac{1}{V}\sum_{h} F_h\, e^{-2\pi i\, h\cdot x},
$$
summed over reciprocal-lattice vectors $h$, with $V$ the volume of the unit cell. Each spot corresponds to one $h$, and its intensity measures $|F_h|^2$. **The phases of the $F_h$ are not measured**. This is the *phase problem*, and it is why step 4 is not just an inverse Fourier transform. Phases are recovered indirectly, for example from a known similar structure (molecular replacement) or from heavy atoms added to the crystal.

The practical bottleneck is usually step 1: getting a protein to crystallize at all.

### Resolution

Structures are quoted with a **resolution** in ångströms, e.g. "1.95 Å". A smaller number means a sharper, more detailed map. In Fourier terms, resolution $d$ means that only reflections with $|h| \le 1/d$ were measured, so the map is a truncated Fourier series: features finer than about $d$ are blurred out. Resolution is a low-pass cutoff.

### Cryo-EM

**Cryo-electron microscopy** flash-freezes many copies of the protein in a thin layer of ice and images them with an electron microscope. Software combines many 2D images of randomly oriented particles into a 3D map. Each 2D projection's Fourier transform is a central slice of the 3D Fourier transform (the projection-slice theorem), so this is a tomography problem. **No crystal is needed**, which avoids crystallography's main bottleneck. Talks increasingly mix both methods.

### Apo and holo structures

- **Apo** = without ligand: the structure of the protein with nothing bound in its active site or binding pocket.
- **Holo** = ligand-bound (a "complex"): the structure with a substrate, product, inhibitor or cofactor in the pocket.

In classical biochemistry, an *apoenzyme* is an enzyme lacking its required cofactor and a *holoenzyme* has it. Structural biologists use "apo/holo" more loosely, for empty versus ligand-bound.

Researchers solve both versions because **a single structure is a static snapshot**. Comparing apo and holo shows what moves, closes or rearranges when something binds. "We solved the apo structure" means: we have the empty protein as a baseline.

### What "disordered" means

A crystal contains many copies of the protein. If a loop takes a different conformation in each copy, its electron density averages out to a weak smear that cannot be modeled, and the loop is typically missing from the deposited structure. That is what "the loop is disordered" means operationally. In the seminar's spermidine synthase example, the [gatekeeping loop](#/note/enzyme-active-sites/gatekeeping-loops) was disordered in the apo structure and became ordered in the ligand-bound structure: floppy when empty, fixed when a ligand is bound.

## Cards

Q: Why must the protein be crystallized for X-ray crystallography?
A: A single molecule scatters X-rays far too weakly. A crystal's regular lattice of identical copies adds their scattering coherently into discrete, measurable diffraction spots.
See: X-ray crystallography

Q: In X-ray crystallography, what does each diffraction spot measure, and what is the **phase problem**?
A: Each spot gives the intensity $|F_h|^2$ of one Fourier coefficient of the periodic electron density. The phases of the $F_h$ are lost, so the density cannot be obtained by a plain inverse Fourier transform. Phases must be recovered indirectly, e.g. from a similar known structure.
See: X-ray crystallography

Q: A structure is reported at "1.95 Å resolution". What does the number mean, in Fourier terms?
A: Only Fourier coefficients with $|h| \le 1/d$, here $d = 1.95$ Å, were measured, so the map is a truncated Fourier series and details finer than about $d$ are blurred. A smaller number means a sharper map.
See: Resolution

Q: Which step of X-ray crystallography is usually the practical bottleneck?
A: Getting the purified protein to form a crystal at all.
See: X-ray crystallography

Q: What does cryo-EM not require that X-ray crystallography does?
A: A crystal. Cryo-EM images many frozen copies of the protein in random orientations and reconstructs a 3D map from the 2D images.
See: Cryo-EM

Q: What is the difference between an **apo** structure and a **holo** structure?
A: Apo: the protein solved with nothing bound in its active site or pocket. Holo: solved with a ligand (substrate, product, inhibitor or cofactor) bound.
See: Apo and holo structures

Q: Why do structural biologists solve both the apo and holo structures of the same protein?
A: Each structure is a static snapshot. Only the comparison shows how the protein moves in response to binding, e.g. a loop that is disordered when empty and ordered when a ligand is bound.
See: Apo and holo structures

Q: What does it mean that a loop is "disordered" in a crystal structure?
A: It takes different conformations in different copies in the crystal, so its density averages to an unmodelable smear and it is usually missing from the model. In other words, the loop is flexible.
See: What "disordered" means

## Quiz

Q: Structure A is reported at 3.5 Å resolution and structure B at 1.8 Å. Which statement is correct?
- [x] B shows finer detail: its map includes higher-frequency Fourier coefficients
- [ ] A shows finer detail, since a larger number means more data
- [ ] Both show the same detail; resolution only measures crystal size
- [ ] Resolution only refers to cryo-EM maps, so the numbers cannot be compared
E: Resolution $d$ is a cutoff $|h| \le 1/d$ on the measured Fourier coefficients, so a smaller $d$ means more high-frequency information and a sharper map.
See: Resolution

Q: Why can't the electron density be computed directly from the measured diffraction pattern?
- [x] The detector records the intensities $|F_h|^2$ but not the phases of the Fourier coefficients
- [ ] The Fourier transform cannot be inverted on a lattice
- [ ] X-rays destroy the crystal before a full pattern is recorded
- [ ] The pattern depends only on the amino-acid sequence, not on the 3D structure
E: Inverting a Fourier series needs complex coefficients. Losing the phases is the central difficulty of crystallography, solved indirectly by molecular replacement or experimental phasing.
See: X-ray crystallography

Q: A loop is missing from a protein's apo structure but clearly visible in its holo structure. The most likely interpretation is…
- [x] the loop is flexible when the pocket is empty and becomes fixed when the ligand binds
- [ ] the loop was cut off during purification of the apo sample
- [ ] the loop exists only in the presence of the ligand's gene
- [ ] the apo structure was solved at a better resolution
E: "Missing" in a crystal structure usually means disordered: there is no single conformation to model. Ordering on binding is the typical behavior of a gatekeeping loop.
See: What "disordered" means
