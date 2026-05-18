// ─────────────────────────────────────────────
//  Static data: cell entities & components
// ─────────────────────────────────────────────
import { CellEntity } from "@/types/biology";

export const CELL_ENTITIES: CellEntity[] = [
  // ── Nerve Cell ────────────────────────────
  {
    id: "nerve-cell",
    label: "Nerve Cell",
    description:
      "A neuron is an electrically excitable cell that transmits nerve impulses across synapses to communicate with other cells.",
    category: "neuron",
    color: "#6366f1",
    components: [
      {
        id: "soma",
        label: "Soma (Cell Body)",
        position: [0, 0, 0],
        color: "#818cf8",
        definition:
          "The soma is the central bulbous region that contains the nucleus and drives overall metabolic activity of the neuron.",
        details: [
          { key: "Diameter", value: "5 – 100 µm" },
          { key: "Contains", value: "Nucleus, ER, Golgi" },
          { key: "Function", value: "Protein synthesis & integration" },
        ],
      },
      {
        id: "axon",
        label: "Axon",
        position: [2.2, 0, 0],
        color: "#a5b4fc",
        definition:
          "The axon is a long slender projection that conducts electrical impulses away from the soma toward target cells.",
        details: [
          { key: "Length", value: "Up to 1 m in humans" },
          { key: "Diameter", value: "0.2 – 20 µm" },
          { key: "Speed", value: "0.5 – 120 m/s" },
        ],
      },
      {
        id: "dendrites",
        label: "Dendrites",
        position: [-2.2, 0, 0],
        color: "#c7d2fe",
        definition:
          "Dendrites are tree-like extensions that receive synaptic inputs from other neurons and carry signals to the soma.",
        details: [
          { key: "Surface area", value: "~40 000 µm²" },
          { key: "Spines", value: "1 000 – 10 000 per neuron" },
          { key: "Role", value: "Afferent signal reception" },
        ],
      },
      {
        id: "myelin-sheath",
        label: "Myelin Sheath",
        position: [2.2, 1.6, 0],
        color: "#e0e7ff",
        definition:
          "A lipid-rich insulating layer wrapped around the axon by Schwann cells that dramatically increases conduction velocity.",
        details: [
          { key: "Composition", value: "70% lipid, 30% protein" },
          { key: "Node gap", value: "Nodes of Ranvier ~1 µm" },
          { key: "Disease link", value: "Multiple sclerosis" },
        ],
      },
    ],
  },
  // ── Muscle Cell ───────────────────────────
  {
    id: "muscle-cell",
    label: "Muscle Cell",
    description:
      "Skeletal muscle fibers are long, multinucleated cells capable of rapid contraction powered by ATP hydrolysis.",
    category: "animal",
    color: "#f43f5e",
    components: [
      {
        id: "sarcomere",
        label: "Sarcomere",
        position: [0, 0, 0],
        color: "#fb7185",
        definition:
          "The sarcomere is the fundamental contractile unit of striated muscle, bounded by Z-discs.",
        details: [
          { key: "Length", value: "2 – 3.5 µm (at rest)" },
          { key: "Proteins", value: "Actin, Myosin, Titin" },
          { key: "Mechanism", value: "Sliding-filament theory" },
        ],
      },
      {
        id: "mitochondria",
        label: "Mitochondria",
        position: [-2.2, 0, 0],
        color: "#fda4af",
        definition:
          "Dense mitochondria clustered near myofibrils supply continuous ATP to sustain repetitive contractions.",
        details: [
          { key: "Density", value: "Up to 35% cell volume" },
          { key: "ATP yield", value: "~30 ATP per glucose" },
          { key: "Genome", value: "16 569 bp circular DNA" },
        ],
      },
      {
        id: "sr",
        label: "Sarcoplasmic Reticulum",
        position: [2.2, 0, 0],
        color: "#fecdd3",
        definition:
          "Specialized smooth ER that stores and rapidly releases Ca²⁺ ions to trigger myofilament sliding.",
        details: [
          { key: "Ca²⁺ concentration", value: "≥1 mM in lumen" },
          { key: "Key protein", value: "SERCA pump" },
          { key: "Release site", value: "Terminal cisternae" },
        ],
      },
      {
        id: "nucleus-m",
        label: "Nucleus (peripheral)",
        position: [0, 1.6, 0],
        color: "#ffe4e6",
        definition:
          "Skeletal muscle fibers are multinucleated; each nucleus is pushed to the cell periphery during development.",
        details: [
          { key: "Count", value: "Hundreds per fiber" },
          { key: "Location", value: "Sub-sarcolemmal" },
          { key: "Domain", value: "~0.5 mm of fiber length" },
        ],
      },
    ],
  },
  // ── Plant Cell ────────────────────────────
  {
    id: "plant-cell",
    label: "Plant Cell",
    description:
      "Plant cells are eukaryotic cells distinguished by a rigid cell wall, central vacuole, and chloroplasts that drive photosynthesis.",
    category: "plant",
    color: "#22c55e",
    components: [
      {
        id: "chloroplast",
        label: "Chloroplast",
        position: [0, 0, 0],
        color: "#4ade80",
        definition:
          "Chloroplasts are double-membrane organelles housing the thylakoid network where light reactions of photosynthesis occur.",
        details: [
          { key: "Size", value: "5 – 8 µm" },
          { key: "Genome", value: "120 – 160 kb circular DNA" },
          { key: "Pigment", value: "Chlorophyll a/b, carotenoids" },
        ],
      },
      {
        id: "cell-wall",
        label: "Cell Wall",
        position: [2.2, 0, 0],
        color: "#86efac",
        definition:
          "A rigid extracellular matrix primarily composed of cellulose microfibrils that provides structural support and turgor resistance.",
        details: [
          { key: "Primary thickness", value: "0.1 – 1 µm" },
          { key: "Main polymer", value: "Cellulose (β-1,4-glucan)" },
          { key: "Plasmodesmata", value: "40 – 200 per 100 µm²" },
        ],
      },
      {
        id: "vacuole",
        label: "Central Vacuole",
        position: [-2.2, 0, 0],
        color: "#bbf7d0",
        definition:
          "A large water-filled organelle occupying up to 90% of cell volume; maintains turgor pressure and stores metabolites.",
        details: [
          { key: "pH", value: "~5 (acidic)" },
          { key: "Membrane", value: "Tonoplast" },
          { key: "Contents", value: "Water, ions, anthocyanins" },
        ],
      },
      {
        id: "nucleus-p",
        label: "Nucleus",
        position: [0, 1.6, 0],
        color: "#dcfce7",
        definition:
          "The membrane-bound control center enclosing chromatin (DNA + histones) and the nucleolus for rRNA synthesis.",
        details: [
          { key: "Diameter", value: "5 – 10 µm" },
          { key: "Pores", value: "3 000 – 4 000 per nucleus" },
          { key: "Ploidy", value: "2n in most somatic cells" },
        ],
      },
    ],
  },
];
