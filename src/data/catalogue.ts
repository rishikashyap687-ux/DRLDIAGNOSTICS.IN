/**
 * Test catalogue and health packages — SAMPLE DATA.
 *
 * Prices, turnaround times and package contents below are placeholders for
 * design and development. They are shown to visitors as "indicative" while
 * `site.pricesVerified` is false. A later milestone replaces this module with
 * database queries managed from the admin dashboard (see PLAN.md).
 */

export type CategoryId =
  | 'hematology'
  | 'biochemistry'
  | 'thyroid'
  | 'immunology'
  | 'serology'
  | 'hormones'
  | 'vitamins'
  | 'urine'
  | 'stool'
  | 'specialized'

export const categories: { id: CategoryId; name: string; blurb: string }[] = [
  { id: 'hematology', name: 'Hematology', blurb: 'Blood counts, haemoglobin and cell studies' },
  { id: 'biochemistry', name: 'Biochemistry', blurb: 'Sugar, liver, kidney, lipids and minerals' },
  { id: 'thyroid', name: 'Thyroid Tests', blurb: 'TSH, T3, T4 and complete thyroid profile' },
  { id: 'immunology', name: 'Immunology', blurb: 'Inflammation and autoimmune markers' },
  { id: 'serology', name: 'Serology', blurb: 'Infection screening and antibody tests' },
  { id: 'hormones', name: 'Hormone Tests', blurb: 'Reproductive, metabolic and stress hormones' },
  { id: 'vitamins', name: 'Vitamin Tests', blurb: 'Vitamin D, B12 and nutritional markers' },
  { id: 'urine', name: 'Urine Tests', blurb: 'Routine, microscopy and culture' },
  { id: 'stool', name: 'Stool Tests', blurb: 'Routine examination and occult blood' },
  { id: 'specialized', name: 'Specialized Investigations', blurb: 'Histopathology, cytology and more' },
]

export type Fasting = 'none' | '8-10 hours' | '10-12 hours'

export interface LabTest {
  slug: string
  code: string
  name: string
  aka?: string
  category: CategoryId
  description: string
  sampleType: string
  sampleRequirements: string
  fasting: Fasting
  /** Indicative INR price. null = price on request. */
  price: number | null
  turnaround: string
  preparation: string[]
  related: string[]
  popular?: boolean
  homeCollection: boolean
}

const blood = 'Blood (venous)'
const std = 'About 3–5 ml of blood is drawn from a vein in the arm by a trained phlebotomist.'
const noPrep = ['No special preparation is needed.', 'Tell us about any medicines you take regularly.']
const fastPrep = (h: string) => [
  `Fast for ${h} before the sample. Plain water is allowed.`,
  'Avoid alcohol and heavy exercise for 24 hours before the test.',
  'Take regular medicines only as advised by your doctor.',
]

export const tests: LabTest[] = [
  // Hematology
  { slug: 'complete-blood-count-cbc', code: 'HEM001', name: 'Complete Blood Count (CBC)', aka: 'CBC, Haemogram', category: 'hematology', description: 'Measures red cells, white cells, platelets and haemoglobin. Commonly used to check for anaemia, infection and general health.', sampleType: `${blood} — EDTA tube`, sampleRequirements: std, fasting: 'none', price: 300, turnaround: 'Same day', preparation: noPrep, related: ['hemoglobin', 'esr', 'peripheral-blood-smear'], popular: true, homeCollection: true },
  { slug: 'hemoglobin', code: 'HEM002', name: 'Hemoglobin (Hb)', category: 'hematology', description: 'Measures the oxygen-carrying protein in red blood cells. Used to screen for anaemia.', sampleType: `${blood} — EDTA tube`, sampleRequirements: std, fasting: 'none', price: 100, turnaround: 'Same day', preparation: noPrep, related: ['complete-blood-count-cbc', 'iron-studies'], homeCollection: true },
  { slug: 'esr', code: 'HEM003', name: 'Erythrocyte Sedimentation Rate (ESR)', aka: 'ESR', category: 'hematology', description: 'A non-specific marker that can rise with inflammation or infection.', sampleType: `${blood} — citrate tube`, sampleRequirements: std, fasting: 'none', price: 120, turnaround: 'Same day', preparation: noPrep, related: ['c-reactive-protein-crp', 'complete-blood-count-cbc'], homeCollection: true },
  { slug: 'peripheral-blood-smear', code: 'HEM004', name: 'Peripheral Blood Smear', aka: 'PBS, GBP', category: 'hematology', description: 'Microscopic review of blood cells to look at their size, shape and appearance.', sampleType: `${blood} — EDTA tube`, sampleRequirements: std, fasting: 'none', price: 250, turnaround: '1 day', preparation: noPrep, related: ['complete-blood-count-cbc'], homeCollection: true },
  { slug: 'blood-group-rh', code: 'HEM005', name: 'Blood Group & Rh Typing', category: 'hematology', description: 'Identifies ABO blood group and Rh factor.', sampleType: `${blood} — EDTA tube`, sampleRequirements: std, fasting: 'none', price: 150, turnaround: 'Same day', preparation: noPrep, related: ['complete-blood-count-cbc'], homeCollection: true },
  { slug: 'iron-studies', code: 'HEM006', name: 'Iron Studies', aka: 'Serum Iron, TIBC, Ferritin', category: 'hematology', description: 'Assesses iron levels and iron stores in the body.', sampleType: `${blood} — serum`, sampleRequirements: std, fasting: '8-10 hours', price: 900, turnaround: '1 day', preparation: fastPrep('8–10 hours'), related: ['hemoglobin', 'complete-blood-count-cbc'], homeCollection: true },

  // Biochemistry
  { slug: 'blood-glucose-random', code: 'BIO001', name: 'Blood Glucose (Random)', aka: 'RBS', category: 'biochemistry', description: 'Measures blood sugar at any time of day.', sampleType: `${blood} — fluoride tube`, sampleRequirements: std, fasting: 'none', price: 60, turnaround: 'Same day', preparation: noPrep, related: ['fasting-blood-sugar', 'hba1c'], homeCollection: true },
  { slug: 'fasting-blood-sugar', code: 'BIO002', name: 'Fasting Blood Sugar (FBS)', aka: 'FBS', category: 'biochemistry', description: 'Measures blood sugar after an overnight fast. Used to screen for and monitor diabetes.', sampleType: `${blood} — fluoride tube`, sampleRequirements: std, fasting: '8-10 hours', price: 60, turnaround: 'Same day', preparation: fastPrep('8–10 hours'), related: ['postprandial-blood-sugar', 'hba1c'], popular: true, homeCollection: true },
  { slug: 'postprandial-blood-sugar', code: 'BIO003', name: 'Postprandial Blood Sugar (PPBS)', aka: 'PPBS', category: 'biochemistry', description: 'Measures blood sugar 2 hours after a meal.', sampleType: `${blood} — fluoride tube`, sampleRequirements: 'Sample is taken exactly 2 hours after you start your meal.', fasting: 'none', price: 60, turnaround: 'Same day', preparation: ['Eat your usual meal and note the time you start.', 'The sample is drawn 2 hours later.'], related: ['fasting-blood-sugar', 'hba1c'], homeCollection: true },
  { slug: 'hba1c', code: 'BIO004', name: 'HbA1c (Glycated Haemoglobin)', aka: 'HbA1c', category: 'biochemistry', description: 'Reflects average blood sugar over the past 2–3 months.', sampleType: `${blood} — EDTA tube`, sampleRequirements: std, fasting: 'none', price: 450, turnaround: '1 day', preparation: noPrep, related: ['fasting-blood-sugar', 'postprandial-blood-sugar'], popular: true, homeCollection: true },
  { slug: 'liver-function-test', code: 'BIO005', name: 'Liver Function Test (LFT)', aka: 'LFT', category: 'biochemistry', description: 'A group of tests including bilirubin, SGOT, SGPT, ALP, proteins and albumin that check how the liver is working.', sampleType: `${blood} — serum`, sampleRequirements: std, fasting: '8-10 hours', price: 600, turnaround: '1 day', preparation: fastPrep('8–10 hours'), related: ['kidney-function-test', 'lipid-profile'], popular: true, homeCollection: true },
  { slug: 'kidney-function-test', code: 'BIO006', name: 'Kidney Function Test (KFT)', aka: 'KFT, RFT', category: 'biochemistry', description: 'Includes urea, creatinine, uric acid and electrolytes to check kidney function.', sampleType: `${blood} — serum`, sampleRequirements: std, fasting: 'none', price: 600, turnaround: '1 day', preparation: noPrep, related: ['liver-function-test', 'uric-acid', 'urine-routine-microscopy'], popular: true, homeCollection: true },
  { slug: 'lipid-profile', code: 'BIO007', name: 'Lipid Profile', aka: 'Cholesterol test', category: 'biochemistry', description: 'Measures total cholesterol, HDL, LDL, VLDL and triglycerides.', sampleType: `${blood} — serum`, sampleRequirements: std, fasting: '10-12 hours', price: 500, turnaround: '1 day', preparation: fastPrep('10–12 hours'), related: ['liver-function-test', 'fasting-blood-sugar'], popular: true, homeCollection: true },
  { slug: 'uric-acid', code: 'BIO008', name: 'Uric Acid', category: 'biochemistry', description: 'Measures uric acid. Often requested for joint pain or gout.', sampleType: `${blood} — serum`, sampleRequirements: std, fasting: 'none', price: 150, turnaround: 'Same day', preparation: noPrep, related: ['kidney-function-test'], homeCollection: true },
  { slug: 'serum-calcium', code: 'BIO009', name: 'Calcium (Serum)', category: 'biochemistry', description: 'Measures calcium in the blood, important for bones, nerves and muscles.', sampleType: `${blood} — serum`, sampleRequirements: std, fasting: 'none', price: 150, turnaround: 'Same day', preparation: noPrep, related: ['vitamin-d-25-oh', 'kidney-function-test'], homeCollection: true },
  { slug: 'serum-electrolytes', code: 'BIO010', name: 'Serum Electrolytes', aka: 'Na, K, Cl', category: 'biochemistry', description: 'Measures sodium, potassium and chloride.', sampleType: `${blood} — serum`, sampleRequirements: std, fasting: 'none', price: 350, turnaround: 'Same day', preparation: noPrep, related: ['kidney-function-test'], homeCollection: true },

  // Thyroid
  { slug: 'tsh', code: 'THY001', name: 'TSH (Thyroid Stimulating Hormone)', aka: 'TSH', category: 'thyroid', description: 'The main screening test for thyroid function.', sampleType: `${blood} — serum`, sampleRequirements: std, fasting: 'none', price: 250, turnaround: '1 day', preparation: ['Morning samples are preferred.', 'If you take thyroid medicine, ask your doctor whether to take it before the test.'], related: ['thyroid-profile', 't3', 't4'], popular: true, homeCollection: true },
  { slug: 't3', code: 'THY002', name: 'T3 (Triiodothyronine)', aka: 'Total T3', category: 'thyroid', description: 'Measures the active thyroid hormone T3.', sampleType: `${blood} — serum`, sampleRequirements: std, fasting: 'none', price: 200, turnaround: '1 day', preparation: noPrep, related: ['tsh', 'thyroid-profile'], homeCollection: true },
  { slug: 't4', code: 'THY003', name: 'T4 (Thyroxine)', aka: 'Total T4', category: 'thyroid', description: 'Measures the thyroid hormone T4.', sampleType: `${blood} — serum`, sampleRequirements: std, fasting: 'none', price: 200, turnaround: '1 day', preparation: noPrep, related: ['tsh', 'thyroid-profile'], homeCollection: true },
  { slug: 'thyroid-profile', code: 'THY004', name: 'Thyroid Profile (T3, T4, TSH)', category: 'thyroid', description: 'Measures T3, T4 and TSH together for a complete picture of thyroid function.', sampleType: `${blood} — serum`, sampleRequirements: std, fasting: 'none', price: 500, turnaround: '1 day', preparation: ['Morning samples are preferred.'], related: ['tsh', 't3', 't4'], popular: true, homeCollection: true },

  // Immunology
  { slug: 'c-reactive-protein-crp', code: 'IMM001', name: 'C-Reactive Protein (CRP)', aka: 'CRP', category: 'immunology', description: 'A marker that rises with inflammation or infection.', sampleType: `${blood} — serum`, sampleRequirements: std, fasting: 'none', price: 400, turnaround: '1 day', preparation: noPrep, related: ['esr'], homeCollection: true },
  { slug: 'rheumatoid-factor', code: 'IMM002', name: 'Rheumatoid Factor (RA Factor)', category: 'immunology', description: 'An antibody test often requested when evaluating joint symptoms.', sampleType: `${blood} — serum`, sampleRequirements: std, fasting: 'none', price: 400, turnaround: '1 day', preparation: noPrep, related: ['c-reactive-protein-crp', 'uric-acid'], homeCollection: true },
  { slug: 'total-ige', code: 'IMM003', name: 'Total IgE', category: 'immunology', description: 'Measures total immunoglobulin E, often used in allergy evaluation.', sampleType: `${blood} — serum`, sampleRequirements: std, fasting: 'none', price: 600, turnaround: '1–2 days', preparation: noPrep, related: ['complete-blood-count-cbc'], homeCollection: true },

  // Serology
  { slug: 'widal-test', code: 'SER001', name: 'Widal Test', category: 'serology', description: 'An antibody test used as supporting evidence when typhoid fever is suspected.', sampleType: `${blood} — serum`, sampleRequirements: std, fasting: 'none', price: 200, turnaround: 'Same day', preparation: noPrep, related: ['complete-blood-count-cbc', 'dengue-ns1-antigen'], homeCollection: true },
  { slug: 'dengue-ns1-antigen', code: 'SER002', name: 'Dengue NS1 Antigen', category: 'serology', description: 'Detects dengue virus antigen, most useful in the first days of fever.', sampleType: `${blood} — serum`, sampleRequirements: std, fasting: 'none', price: 600, turnaround: 'Same day', preparation: noPrep, related: ['complete-blood-count-cbc', 'malaria-antigen'], homeCollection: true },
  { slug: 'malaria-antigen', code: 'SER003', name: 'Malaria Antigen (Rapid)', category: 'serology', description: 'A rapid test for malaria parasite antigens.', sampleType: `${blood} — EDTA tube`, sampleRequirements: std, fasting: 'none', price: 300, turnaround: 'Same day', preparation: noPrep, related: ['dengue-ns1-antigen', 'complete-blood-count-cbc'], homeCollection: true },
  { slug: 'hbsag', code: 'SER004', name: 'Hepatitis B Surface Antigen (HBsAg)', aka: 'HBsAg', category: 'serology', description: 'Screens for hepatitis B infection.', sampleType: `${blood} — serum`, sampleRequirements: std, fasting: 'none', price: 350, turnaround: '1 day', preparation: noPrep, related: ['liver-function-test'], homeCollection: true },

  // Hormones
  { slug: 'prolactin', code: 'HOR001', name: 'Prolactin', category: 'hormones', description: 'Measures prolactin, a hormone produced by the pituitary gland.', sampleType: `${blood} — serum`, sampleRequirements: std, fasting: 'none', price: 500, turnaround: '1 day', preparation: ['A morning sample, after resting for a few minutes, is preferred.'], related: ['lh', 'fsh'], homeCollection: true },
  { slug: 'lh', code: 'HOR002', name: 'Luteinizing Hormone (LH)', aka: 'LH', category: 'hormones', description: 'A reproductive hormone. Timing may depend on your cycle; follow your doctor\'s advice.', sampleType: `${blood} — serum`, sampleRequirements: std, fasting: 'none', price: 450, turnaround: '1 day', preparation: ['Follow your doctor\'s advice about which day of the cycle to test.'], related: ['fsh', 'prolactin'], homeCollection: true },
  { slug: 'fsh', code: 'HOR003', name: 'Follicle Stimulating Hormone (FSH)', aka: 'FSH', category: 'hormones', description: 'A reproductive hormone often tested with LH.', sampleType: `${blood} — serum`, sampleRequirements: std, fasting: 'none', price: 450, turnaround: '1 day', preparation: ['Follow your doctor\'s advice about which day of the cycle to test.'], related: ['lh', 'prolactin'], homeCollection: true },
  { slug: 'testosterone-total', code: 'HOR004', name: 'Testosterone (Total)', category: 'hormones', description: 'Measures total testosterone.', sampleType: `${blood} — serum`, sampleRequirements: std, fasting: 'none', price: 600, turnaround: '1 day', preparation: ['Morning samples are preferred.'], related: ['lh', 'fsh'], homeCollection: true },

  // Vitamins
  { slug: 'vitamin-d-25-oh', code: 'VIT001', name: 'Vitamin D (25-OH)', aka: 'Vitamin D3', category: 'vitamins', description: 'Measures the main circulating form of vitamin D.', sampleType: `${blood} — serum`, sampleRequirements: std, fasting: 'none', price: 1000, turnaround: '1 day', preparation: noPrep, related: ['vitamin-b12', 'serum-calcium'], popular: true, homeCollection: true },
  { slug: 'vitamin-b12', code: 'VIT002', name: 'Vitamin B12', category: 'vitamins', description: 'Measures vitamin B12, which is needed for nerves and red blood cell formation.', sampleType: `${blood} — serum`, sampleRequirements: std, fasting: '8-10 hours', price: 800, turnaround: '1 day', preparation: fastPrep('8–10 hours'), related: ['vitamin-d-25-oh', 'complete-blood-count-cbc'], popular: true, homeCollection: true },
  { slug: 'folic-acid', code: 'VIT003', name: 'Folic Acid (Folate)', category: 'vitamins', description: 'Measures folate in the blood.', sampleType: `${blood} — serum`, sampleRequirements: std, fasting: '8-10 hours', price: 800, turnaround: '1–2 days', preparation: fastPrep('8–10 hours'), related: ['vitamin-b12'], homeCollection: true },

  // Urine
  { slug: 'urine-routine-microscopy', code: 'URI001', name: 'Urine Routine & Microscopy', aka: 'Urine R/M', category: 'urine', description: 'Physical, chemical and microscopic examination of urine.', sampleType: 'Urine — sterile container', sampleRequirements: 'A clean-catch midstream sample, preferably the first urine of the morning.', fasting: 'none', price: 120, turnaround: 'Same day', preparation: ['Use the sterile container provided.', 'Collect a midstream sample after cleaning the area.'], related: ['urine-culture', 'kidney-function-test'], popular: true, homeCollection: true },
  { slug: 'urine-culture', code: 'URI002', name: 'Urine Culture & Sensitivity', category: 'urine', description: 'Grows and identifies bacteria in urine and tests which antibiotics work against them.', sampleType: 'Urine — sterile container', sampleRequirements: 'Clean-catch midstream sample, ideally before starting antibiotics.', fasting: 'none', price: 600, turnaround: '2–3 days', preparation: ['Collect before starting antibiotics where possible.'], related: ['urine-routine-microscopy'], homeCollection: true },
  { slug: 'urine-microalbumin', code: 'URI003', name: 'Urine Microalbumin', category: 'urine', description: 'Detects small amounts of albumin in urine.', sampleType: 'Urine — sterile container', sampleRequirements: 'Spot urine sample.', fasting: 'none', price: 500, turnaround: '1 day', preparation: noPrep, related: ['kidney-function-test', 'hba1c'], homeCollection: true },

  // Stool
  { slug: 'stool-routine', code: 'STO001', name: 'Stool Routine Examination', category: 'stool', description: 'Physical and microscopic examination of stool.', sampleType: 'Stool — sterile container', sampleRequirements: 'A fresh sample in the container provided.', fasting: 'none', price: 150, turnaround: 'Same day', preparation: ['Avoid contaminating the sample with urine or water.'], related: ['stool-occult-blood'], homeCollection: true },
  { slug: 'stool-occult-blood', code: 'STO002', name: 'Stool Occult Blood', category: 'stool', description: 'Detects hidden blood in stool.', sampleType: 'Stool — sterile container', sampleRequirements: 'A fresh sample in the container provided.', fasting: 'none', price: 200, turnaround: 'Same day', preparation: ['Follow any dietary advice from your doctor.'], related: ['stool-routine'], homeCollection: true },

  // Specialized — availability to be confirmed by the laboratory
  { slug: 'histopathology', code: 'SPL001', name: 'Histopathology (Biopsy)', category: 'specialized', description: 'Microscopic examination of a tissue specimen. Please contact us to confirm availability before sending a specimen.', sampleType: 'Tissue in formalin', sampleRequirements: 'Specimen collected by your doctor or hospital and sent in 10% formalin.', fasting: 'none', price: null, turnaround: 'On request', preparation: ['Your doctor collects the specimen.'], related: ['fnac-cytology'], homeCollection: false },
  { slug: 'fnac-cytology', code: 'SPL002', name: 'Cytology (FNAC / Fluid)', category: 'specialized', description: 'Microscopic examination of cells from fluid or a fine-needle aspirate. Please contact us to confirm availability.', sampleType: 'Aspirate, smear or body fluid', sampleRequirements: 'Collected by a doctor.', fasting: 'none', price: null, turnaround: 'On request', preparation: ['Your doctor collects the specimen.'], related: ['histopathology'], homeCollection: false },
  { slug: 'pap-smear', code: 'SPL003', name: 'Pap Smear', category: 'specialized', description: 'Cervical cytology screening. Please contact us to confirm availability.', sampleType: 'Cervical smear', sampleRequirements: 'Collected by a gynaecologist.', fasting: 'none', price: null, turnaround: 'On request', preparation: ['Avoid testing during menstruation.'], related: ['fnac-cytology'], homeCollection: false },
]

export const testBySlug = new Map(tests.map((t) => [t.slug, t]))

export type PackageCategory =
  | 'general'
  | 'diabetes'
  | 'organ'
  | 'thyroid'
  | 'heart'
  | 'women'
  | 'men'
  | 'senior'

export const packageCategories: { id: PackageCategory; name: string }[] = [
  { id: 'general', name: 'General health' },
  { id: 'diabetes', name: 'Diabetes' },
  { id: 'organ', name: 'Liver & kidney' },
  { id: 'thyroid', name: 'Thyroid' },
  { id: 'heart', name: 'Heart' },
  { id: 'women', name: 'Women' },
  { id: 'men', name: 'Men' },
  { id: 'senior', name: 'Senior citizens' },
]

export interface HealthPackage {
  slug: string
  name: string
  category: PackageCategory
  icon: 'heart-pulse' | 'activity' | 'shield' | 'droplet' | 'flask' | 'bean' | 'heart' | 'venus' | 'mars' | 'users'
  summary: string
  includes: string[]
  parameters: number
  price: number
  /** Only set for a genuine, approved discount. */
  originalPrice?: number
  fasting: Fasting
  sample: string
  turnaround: string
  popular?: boolean
}

export const packages: HealthPackage[] = [
  { slug: 'basic-health-checkup', name: 'Basic Health Checkup', category: 'general', icon: 'shield', summary: 'An essential yearly check of blood counts, sugar and urine.', includes: ['complete-blood-count-cbc', 'fasting-blood-sugar', 'urine-routine-microscopy', 'esr'], parameters: 38, price: 499, fasting: '8-10 hours', sample: 'Blood and urine', turnaround: '1 day', popular: true },
  { slug: 'comprehensive-health-checkup', name: 'Comprehensive Health Checkup', category: 'general', icon: 'activity', summary: 'Blood counts, sugar, liver, kidney, lipids and thyroid in one visit.', includes: ['complete-blood-count-cbc', 'fasting-blood-sugar', 'liver-function-test', 'kidney-function-test', 'lipid-profile', 'tsh', 'urine-routine-microscopy'], parameters: 68, price: 1499, fasting: '10-12 hours', sample: 'Blood and urine', turnaround: '1 day', popular: true },
  { slug: 'full-body-health-checkup', name: 'Full Body Health Checkup', category: 'general', icon: 'heart-pulse', summary: 'Our most complete package, adding HbA1c, thyroid profile and vitamins.', includes: ['complete-blood-count-cbc', 'fasting-blood-sugar', 'hba1c', 'liver-function-test', 'kidney-function-test', 'lipid-profile', 'thyroid-profile', 'vitamin-d-25-oh', 'vitamin-b12', 'serum-calcium', 'iron-studies', 'urine-routine-microscopy'], parameters: 85, price: 2999, fasting: '10-12 hours', sample: 'Blood and urine', turnaround: '1–2 days', popular: true },
  { slug: 'diabetes-screening-package', name: 'Diabetes Screening Package', category: 'diabetes', icon: 'droplet', summary: 'Fasting and post-meal sugar with HbA1c and kidney markers.', includes: ['fasting-blood-sugar', 'postprandial-blood-sugar', 'hba1c', 'kidney-function-test', 'urine-microalbumin'], parameters: 18, price: 999, fasting: '8-10 hours', sample: 'Blood and urine', turnaround: '1 day', popular: true },
  { slug: 'liver-function-package', name: 'Liver Function Package', category: 'organ', icon: 'flask', summary: 'Liver function with hepatitis B screening and blood counts.', includes: ['liver-function-test', 'hbsag', 'complete-blood-count-cbc'], parameters: 37, price: 999, fasting: '8-10 hours', sample: 'Blood', turnaround: '1 day' },
  { slug: 'kidney-function-package', name: 'Kidney Function Package', category: 'organ', icon: 'bean', summary: 'Kidney function, electrolytes, uric acid and urine examination.', includes: ['kidney-function-test', 'serum-electrolytes', 'uric-acid', 'urine-routine-microscopy', 'urine-microalbumin'], parameters: 30, price: 1199, fasting: 'none', sample: 'Blood and urine', turnaround: '1 day' },
  { slug: 'thyroid-profile-package', name: 'Thyroid Profile Package', category: 'thyroid', icon: 'activity', summary: 'Complete thyroid profile with blood counts.', includes: ['thyroid-profile', 'complete-blood-count-cbc'], parameters: 27, price: 699, fasting: 'none', sample: 'Blood', turnaround: '1 day' },
  { slug: 'heart-health-screening', name: 'Heart Health Screening', category: 'heart', icon: 'heart', summary: 'Lipid profile, sugar, CRP and kidney markers.', includes: ['lipid-profile', 'fasting-blood-sugar', 'c-reactive-protein-crp', 'kidney-function-test', 'serum-electrolytes'], parameters: 26, price: 1499, fasting: '10-12 hours', sample: 'Blood', turnaround: '1 day' },
  { slug: 'womens-wellness-package', name: "Women's Wellness Package", category: 'women', icon: 'venus', summary: 'Blood counts, iron, thyroid, vitamins and calcium.', includes: ['complete-blood-count-cbc', 'iron-studies', 'thyroid-profile', 'vitamin-d-25-oh', 'vitamin-b12', 'serum-calcium', 'fasting-blood-sugar'], parameters: 45, price: 2499, fasting: '8-10 hours', sample: 'Blood', turnaround: '1–2 days', popular: true },
  { slug: 'mens-wellness-package', name: "Men's Wellness Package", category: 'men', icon: 'mars', summary: 'Sugar, lipids, liver, kidney, thyroid and testosterone.', includes: ['complete-blood-count-cbc', 'fasting-blood-sugar', 'lipid-profile', 'liver-function-test', 'kidney-function-test', 'tsh', 'testosterone-total'], parameters: 66, price: 2499, fasting: '10-12 hours', sample: 'Blood', turnaround: '1–2 days' },
  { slug: 'senior-citizen-health-package', name: 'Senior Citizen Health Package', category: 'senior', icon: 'users', summary: 'A thorough check for adults over 60, with vitamins and calcium.', includes: ['complete-blood-count-cbc', 'fasting-blood-sugar', 'hba1c', 'liver-function-test', 'kidney-function-test', 'lipid-profile', 'thyroid-profile', 'vitamin-d-25-oh', 'vitamin-b12', 'serum-calcium', 'urine-routine-microscopy'], parameters: 82, price: 2799, fasting: '10-12 hours', sample: 'Blood and urine', turnaround: '1–2 days' },
]

export const packageBySlug = new Map(packages.map((p) => [p.slug, p]))

export const fastingLabel: Record<Fasting, string> = {
  none: 'No fasting',
  '8-10 hours': '8–10 hrs fasting',
  '10-12 hours': '10–12 hrs fasting',
}

export function formatINR(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function categoryName(id: CategoryId): string {
  return categories.find((c) => c.id === id)?.name ?? id
}

export interface SearchHit {
  kind: 'test' | 'package'
  slug: string
  name: string
  detail: string
}

export function searchCatalogue(query: string, limit = 8): SearchHit[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const hits: SearchHit[] = []
  for (const p of packages) {
    if ((p.name + ' ' + p.summary).toLowerCase().includes(q))
      hits.push({ kind: 'package', slug: p.slug, name: p.name, detail: `Health package · ${p.parameters} parameters` })
  }
  for (const t of tests) {
    if ([t.name, t.aka, t.code, t.category].join(' ').toLowerCase().includes(q))
      hits.push({ kind: 'test', slug: t.slug, name: t.name, detail: categoryName(t.category) })
  }
  return hits.slice(0, limit)
}
