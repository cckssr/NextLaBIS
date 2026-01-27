/**
 * Extended mock data with property type definitions and edge cases for testing
 * the collection view UI with various property configurations.
 */

export interface PropertyMetadata {
  code: string;
  name: string;
  description: string;
  propertyKind:
    | "BOOLEAN"
    | "INTEGER"
    | "REAL"
    | "VARCHAR"
    | "MULTILINE_VARCHAR"
    | "TIMESTAMP"
    | "JSON"
    | "ENUM"
    | "CONTROLLED_VOCABULARY";
  mandatory: boolean;
  showInTable: boolean;
  editable: boolean;
}

export interface PropertyValue {
  code: string;
  value: string | number | boolean | null;
  error?: string;
}

/**
 * Sample property definitions that would be used across all objects
 */
export const quantumDotPropertyDefinitions: PropertyMetadata[] = [
  // Basic identification
  {
    code: "SAMPLE_NAME",
    name: "Sample Name",
    description: "Human-readable name of the quantum dot sample",
    propertyKind: "VARCHAR",
    mandatory: true,
    showInTable: true,
    editable: false,
  },
  {
    code: "BATCH_NUMBER",
    name: "Batch Number",
    description: "Synthesis batch identifier",
    propertyKind: "VARCHAR",
    mandatory: true,
    showInTable: true,
    editable: false,
  },

  // Composition properties
  {
    code: "CORE_MATERIAL",
    name: "Core Material",
    description: "Material of the quantum dot core (e.g., CdSe, PbS, InP)",
    propertyKind: "CONTROLLED_VOCABULARY",
    mandatory: true,
    showInTable: true,
    editable: true,
  },
  {
    code: "SHELL_MATERIAL",
    name: "Shell Material",
    description: "Shell material composition",
    propertyKind: "VARCHAR",
    mandatory: false,
    showInTable: true,
    editable: true,
  },
  {
    code: "SHELL_THICKNESS",
    name: "Shell Thickness",
    description: "Estimated thickness of the shell in nanometers",
    propertyKind: "REAL",
    mandatory: false,
    showInTable: true,
    editable: true,
  },

  // Size properties
  {
    code: "PARTICLE_SIZE_NM",
    name: "Particle Size (nm)",
    description:
      "Diameter of quantum dots as determined by TEM or XRD analysis",
    propertyKind: "REAL",
    mandatory: true,
    showInTable: true,
    editable: false,
  },
  {
    code: "SIZE_DISTRIBUTION",
    name: "Size Distribution (%)",
    description: "Standard deviation of particle size distribution",
    propertyKind: "REAL",
    mandatory: false,
    showInTable: true,
    editable: false,
  },

  // Optical properties
  {
    code: "BANDGAP_EV",
    name: "Bandgap Energy (eV)",
    description: "Optical bandgap energy estimated from absorption edge",
    propertyKind: "REAL",
    mandatory: false,
    showInTable: true,
    editable: false,
  },
  {
    code: "PHOTOLUMINESCENCE_QY",
    name: "Photoluminescence Quantum Yield (%)",
    description: "Quantum yield of photoluminescence",
    propertyKind: "REAL",
    mandatory: false,
    showInTable: true,
    editable: false,
  },
  {
    code: "EMISSION_WAVELENGTH_NM",
    name: "Emission Wavelength (nm)",
    description: "Peak wavelength of photoluminescence emission",
    propertyKind: "REAL",
    mandatory: false,
    showInTable: true,
    editable: false,
  },

  // Electronic properties
  {
    code: "CARRIER_MOBILITY",
    name: "Carrier Mobility (cm²/Vs)",
    description: "Measured charge carrier mobility",
    propertyKind: "REAL",
    mandatory: false,
    showInTable: false,
    editable: false,
  },
  {
    code: "THRESHOLD_VOLTAGE",
    name: "Threshold Voltage (V)",
    description: "Gate threshold voltage in transistor configuration",
    propertyKind: "REAL",
    mandatory: false,
    showInTable: false,
    editable: false,
  },

  // Storage and handling
  {
    code: "STORAGE_SOLVENT",
    name: "Storage Solvent",
    description: "Solvent used for storage and dispersion",
    propertyKind: "CONTROLLED_VOCABULARY",
    mandatory: true,
    showInTable: true,
    editable: true,
  },
  {
    code: "STORAGE_TEMPERATURE",
    name: "Storage Temperature (°C)",
    description: "Recommended storage temperature",
    propertyKind: "INTEGER",
    mandatory: true,
    showInTable: true,
    editable: true,
  },
  {
    code: "EXPIRATION_DATE",
    name: "Expiration Date",
    description: "Expected usability expiration",
    propertyKind: "TIMESTAMP",
    mandatory: false,
    showInTable: true,
    editable: true,
  },

  // Quality and validation
  {
    code: "IS_VALIDATED",
    name: "Validation Status",
    description: "Whether sample has passed quality checks",
    propertyKind: "BOOLEAN",
    mandatory: true,
    showInTable: true,
    editable: true,
  },
  {
    code: "QUALITY_SCORE",
    name: "Quality Score (0-100)",
    description: "Overall quality assessment score",
    propertyKind: "INTEGER",
    mandatory: false,
    showInTable: true,
    editable: false,
  },

  // Notes and documentation
  {
    code: "PREPARATION_NOTES",
    name: "Preparation Notes",
    description: "Detailed notes about sample preparation",
    propertyKind: "MULTILINE_VARCHAR",
    mandatory: false,
    showInTable: false,
    editable: true,
  },
  {
    code: "MEASUREMENT_NOTES",
    name: "Measurement Notes",
    description: "Notes about measurements and observations",
    propertyKind: "MULTILINE_VARCHAR",
    mandatory: false,
    showInTable: false,
    editable: true,
  },

  // Advanced properties
  {
    code: "CRYSTAL_STRUCTURE",
    name: "Crystal Structure",
    description: "Crystal phase (zinc-blende, wurtzite, rock-salt)",
    propertyKind: "CONTROLLED_VOCABULARY",
    mandatory: false,
    showInTable: true,
    editable: false,
  },
  {
    code: "LATTICE_CONSTANT",
    name: "Lattice Constant (Å)",
    description: "Unit cell lattice constant from XRD",
    propertyKind: "REAL",
    mandatory: false,
    showInTable: false,
    editable: false,
  },
];

/**
 * Edge case property values for testing UI handling
 */
export const propertyEdgeCases = {
  // Empty/null values
  empty: {
    code: "TEST_PROP",
    value: null,
  },

  // Very long strings
  veryLongString: {
    code: "TEST_LONG_STRING",
    value:
      "This is an extremely long string that tests how the UI handles text overflow and wrapping. It contains multiple sentences with detailed information about quantum dot synthesis procedures, characterization methods, storage conditions, and recommended usage guidelines. Additional content includes specifications for measurement equipment, calibration procedures, and quality assurance protocols.",
  },

  // Very large numbers
  veryLargeNumber: {
    code: "TEST_LARGE_NUMBER",
    value: 123456789012345.6789,
  },

  // Very small numbers
  verySmallNumber: {
    code: "TEST_SMALL_NUMBER",
    value: 0.00000000001234,
  },

  // Special characters
  specialCharacters: {
    code: "TEST_SPECIAL_CHARS",
    value: "CdSe/ZnS (core/shell) @ 25°C ± 2K, λ = 540 nm, η = 85%, α ≈ 0.95",
  },

  // Unicode characters
  unicodeCharacters: {
    code: "TEST_UNICODE",
    value: "Müller äöü Ångström Å nm³ 日本語 中文 العربية",
  },

  // Multiline text
  multilineText: {
    code: "TEST_MULTILINE",
    value: `Line 1: Sample preparation
Line 2: Centrifugation at 5000 rpm for 10 minutes
Line 3: Dispersion in toluene
Line 4: Storage at -20°C`,
  },

  // Scientific notation
  scientificNotation: {
    code: "TEST_SCIENTIFIC",
    value: 1.23e-15,
  },

  // Percentage values
  percentage: {
    code: "TEST_PERCENTAGE",
    value: 94.5,
  },

  // Temperature ranges
  temperatureRange: {
    code: "TEST_TEMP_RANGE",
    value: "-20 to 25 °C",
  },

  // JSON-like structure
  jsonLikeData: {
    code: "TEST_JSON",
    value: JSON.stringify({
      core: "CdSe",
      shell: "ZnS",
      size_nm: 4.5,
      properties: {
        bandgap_eV: 2.1,
        photoluminescence_qy: 0.85,
      },
    }),
  },

  // Dates and timestamps
  timestamp: {
    code: "TEST_TIMESTAMP",
    value: new Date("2024-12-15T14:30:45.123Z").toISOString(),
  },

  // Boolean values
  booleanTrue: {
    code: "TEST_BOOL_TRUE",
    value: true,
  },
  booleanFalse: {
    code: "TEST_BOOL_FALSE",
    value: false,
  },
};

/**
 * Sample property values for different quantum dot objects
 * Tests different combinations of properties, presence/absence, and value ranges
 */
export const samplePropertyValueSets = {
  // Complete, well-characterized sample
  complete: [
    { code: "SAMPLE_NAME", value: "QD_B1_001" },
    { code: "BATCH_NUMBER", value: "BATCH_001" },
    { code: "CORE_MATERIAL", value: "CdSe" },
    { code: "SHELL_MATERIAL", value: "ZnS" },
    { code: "SHELL_THICKNESS", value: 1.5 },
    { code: "PARTICLE_SIZE_NM", value: 4.2 },
    { code: "SIZE_DISTRIBUTION", value: 8.5 },
    { code: "BANDGAP_EV", value: 2.08 },
    { code: "PHOTOLUMINESCENCE_QY", value: 0.87 },
    { code: "EMISSION_WAVELENGTH_NM", value: 595 },
    { code: "CARRIER_MOBILITY", value: 0.15 },
    { code: "STORAGE_SOLVENT", value: "Toluene" },
    { code: "STORAGE_TEMPERATURE", value: -20 },
    { code: "IS_VALIDATED", value: true },
    { code: "QUALITY_SCORE", value: 92 },
    { code: "CRYSTAL_STRUCTURE", value: "Zinc-blende" },
    { code: "LATTICE_CONSTANT", value: 6.05 },
  ],

  // Minimal sample (only mandatory fields)
  minimal: [
    { code: "SAMPLE_NAME", value: "QD_B2_001" },
    { code: "BATCH_NUMBER", value: "BATCH_002" },
    { code: "CORE_MATERIAL", value: "PbS" },
    { code: "PARTICLE_SIZE_NM", value: 3.5 },
    { code: "STORAGE_SOLVENT", value: "Hexane" },
    { code: "STORAGE_TEMPERATURE", value: 4 },
    { code: "IS_VALIDATED", value: false },
  ],

  // Sample with many null values (sparse data)
  sparse: [
    { code: "SAMPLE_NAME", value: "QD_B3_001" },
    { code: "BATCH_NUMBER", value: "BATCH_003" },
    { code: "CORE_MATERIAL", value: "InP" },
    { code: "SHELL_MATERIAL", value: null },
    { code: "SHELL_THICKNESS", value: null },
    { code: "PARTICLE_SIZE_NM", value: 3.8 },
    { code: "SIZE_DISTRIBUTION", value: null },
    { code: "BANDGAP_EV", value: null },
    { code: "PHOTOLUMINESCENCE_QY", value: null },
    { code: "STORAGE_SOLVENT", value: "Cyclohexane" },
    { code: "STORAGE_TEMPERATURE", value: -20 },
    { code: "IS_VALIDATED", value: true },
  ],

  // Sample with extreme values
  extreme: [
    { code: "SAMPLE_NAME", value: "QD_EXTREME_001" },
    { code: "BATCH_NUMBER", value: "BATCH_EXTREME" },
    { code: "CORE_MATERIAL", value: "CdSe/CdS/ZnS" },
    { code: "SHELL_MATERIAL", value: "Multi-layer heterostructure" },
    { code: "SHELL_THICKNESS", value: 25.8 },
    { code: "PARTICLE_SIZE_NM", value: 15.5 },
    { code: "SIZE_DISTRIBUTION", value: 18.2 },
    { code: "BANDGAP_EV", value: 1.25 },
    { code: "PHOTOLUMINESCENCE_QY", value: 0.99 },
    { code: "EMISSION_WAVELENGTH_NM", value: 850 },
    { code: "QUALITY_SCORE", value: 99 },
    { code: "STORAGE_TEMPERATURE", value: -196 },
  ],

  // Sample with special characters in string values
  specialChars: [
    { code: "SAMPLE_NAME", value: "QD_B4_001 (CdSe/ZnS @ RT)" },
    { code: "BATCH_NUMBER", value: "BATCH_2024_Q4_#001" },
    { code: "CORE_MATERIAL", value: "CdSe±0.05 nm" },
    { code: "SHELL_MATERIAL", value: "ZnS (wurtzite, α-phase)" },
    { code: "PREPARATION_NOTES", value: "Synthesized via SILAR (5x) @ 100°C" },
    { code: "MEASUREMENT_NOTES", value: "λ_ex = 405 nm, T = 25 ± 2°C, n = 3" },
  ],

  // Sample with very long descriptions
  longDescriptions: [
    {
      code: "SAMPLE_NAME",
      value:
        "CdSe/CdS/ZnS Multi-layer Heterostructure Quantum Dot with Enhanced Photoluminescence",
    },
    { code: "BATCH_NUMBER", value: "BATCH_001" },
    { code: "CORE_MATERIAL", value: "CdSe" },
    {
      code: "PREPARATION_NOTES",
      value: `This sample was synthesized following a modified hot-injection method. 
The CdSe core was grown at 300°C in a nitrogen atmosphere using cadmium oleate and selenium precursors. 
A gradient CdS shell was then deposited via SILAR (Successive Ionic Layer Absorption and Reaction) 
to minimize lattice strain, followed by a ZnS shell for improved photostability. 
The sample was purified by multiple centrifugation cycles and stored in toluene at -20°C.
Final particle size determined by TEM: 4.2 ± 0.4 nm. PLQY measured at 87% using Absolute PL Quantum Yield Measurement System.`,
    },
    {
      code: "MEASUREMENT_NOTES",
      value: `Absorption spectrum shows clear size-dependent features with exciton peak at 595 nm. 
Fluorescence lifetime measurements using TCSPC revealed single exponential decay with τ = 32.5 ns. 
Temperature-dependent PL (10-300K) shows expected redshift at lower temperatures. 
X-ray diffraction confirms zinc-blende crystal structure with lattice constant a = 6.05 Å.`,
    },
  ],
};

/**
 * Helper function to create sample objects with specific property configurations
 * Useful for testing different UI states
 */
export function createSampleWithProperties(
  sampleCode: string,
  propertySet: (typeof samplePropertyValueSets)[keyof typeof samplePropertyValueSets],
) {
  return {
    code: sampleCode,
    properties: propertySet,
    completeness:
      (propertySet.filter((p) => p.value !== null).length /
        propertySet.length) *
      100,
  };
}

/**
 * Test data for table display edge cases
 */
export const tableDisplayEdgeCases = {
  // Column with all same values
  uniformValues: quantumDotPropertyDefinitions.slice(0, 3).map((prop) => ({
    code: prop.code,
    value: "Same Value",
  })),

  // Column with mixed empty and populated values
  sparseColumn: [
    { code: "PROPERTY_1", value: 42 },
    { code: "PROPERTY_2", value: null },
    { code: "PROPERTY_3", value: 99 },
    { code: "PROPERTY_4", value: null },
    { code: "PROPERTY_5", value: 7 },
  ],

  // Very wide content in narrow column
  wideContentNarrowColumn: [
    {
      code: "LONG_VALUE",
      value:
        "This is an extremely long text that should be displayed in a narrow column which will test text truncation and wrapping behavior",
    },
  ],

  // Many columns (tests horizontal scrolling)
  manyColumns: Array.from({ length: 50 }, (_, i) => ({
    code: `COL_${String(i + 1).padStart(3, "0")}`,
    value: `Value ${i + 1}`,
  })),

  // Many rows (tests vertical scrolling and virtualization)
  manyRows: Array.from({ length: 1000 }, (_, i) => ({
    code: `ROW_${String(i + 1).padStart(4, "0")}`,
    value: `Sample ${i + 1}`,
  })),
};
