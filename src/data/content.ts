/**
 * Editorial content. A later milestone moves FAQs, announcements and page copy
 * into the database for the admin "Website management" module (see PLAN.md).
 */

export const faqs = [
  {
    q: 'Is home sample collection really free?',
    a: 'Yes. Wherever free home collection is available for your PIN code, the collection fee is ₹0. You only pay for the tests you book, and there are no hidden collection charges.',
  },
  {
    q: 'Do you collect samples outside Delhi?',
    a: 'We are building free home collection across India. Enter your PIN code on the Free Home Collection page: if we already collect in your area you can book a slot, and if not you can send a service enquiry and our team will contact you.',
  },
  {
    q: 'How do I prepare for a blood test?',
    a: 'Each test page lists its fasting requirement and preparation steps. For fasting tests such as Fasting Blood Sugar or Lipid Profile, avoid food for the stated hours; plain water is allowed. Always follow your doctor’s advice about medicines.',
  },
  {
    q: 'How will my booking be confirmed?',
    a: 'After you submit a booking you receive a booking reference on screen. Our team then contacts you on your mobile number to confirm the slot and the final amount before collection.',
  },
  {
    q: 'How do I download my lab report?',
    a: 'Open Download Reports and use the secure report portal. Reports are released only after they are reviewed and approved by the laboratory.',
  },
  {
    q: 'Are the prices on the website final?',
    a: 'Prices shown as “indicative” are being finalised by the laboratory. Our team confirms the exact amount with you before your sample is collected.',
  },
]

export interface LegalSection {
  heading: string
  body: string[]
}

export interface LegalPage {
  title: string
  description: string
  sections: LegalSection[]
}

const contactLine =
  'For questions about this policy, contact DRL DIAGNOSTICS at A704, Ground Floor, 1st Pusta, Sabapur, North East Delhi, Delhi - 110094, or through the Contact Us page.'

export const legalPages: Record<string, LegalPage> = {
  'privacy-policy': {
    title: 'Privacy Policy',
    description: 'How DRL DIAGNOSTICS collects, uses, stores and protects your personal and health information.',
    sections: [
      { heading: 'Who we are', body: ['DRL DIAGNOSTICS is a pathology and blood testing laboratory located in Sabapur, North East Delhi. This policy explains how we handle personal data when you use our website and services, in line with the Digital Personal Data Protection Act, 2023 and other applicable Indian laws.'] },
      { heading: 'Information we collect', body: ['Details you provide when booking or enquiring: name, mobile number, email (optional), address, PIN code, age or date of birth and gender where a test requires it, selected tests, preferred collection time and instructions.', 'Laboratory reports generated from the samples you provide.', 'Basic technical data such as browser type and pages visited, used to keep the website secure and working.'] },
      { heading: 'Why we use it', body: ['To schedule and carry out sample collection, perform the tests you request, release your reports to you, contact you about your booking, and meet legal and regulatory obligations. We collect only what is needed to provide the service.'] },
      { heading: 'Sharing', body: ['We do not sell your personal data. We share it only with staff and service partners who need it to deliver your tests (for example a collection partner or report delivery system), with your referring doctor when you ask us to, or when required by law.'] },
      { heading: 'Security and storage', body: ['Reports are never placed in publicly accessible storage. Access to patient records is restricted to authorised staff. Data is retained only for as long as required for medical, legal and regulatory purposes.'] },
      { heading: 'Your rights', body: ['You may request access to, correction of, or erasure of your personal data, and withdraw consent where processing is based on consent, subject to legal retention requirements. You may also nominate another person to exercise these rights on your behalf.'] },
      { heading: 'Contact', body: [contactLine] },
    ],
  },
  'terms-and-conditions': {
    title: 'Terms and Conditions',
    description: 'Terms that apply when you use the DRL DIAGNOSTICS website and book tests.',
    sections: [
      { heading: 'Bookings', body: ['A booking submitted on this website is a request. It is confirmed only when our team contacts you to confirm the slot, location and final amount.', 'Home collection is subject to service availability for your location.'] },
      { heading: 'Prices', body: ['Prices displayed as “indicative” may change. The amount confirmed by our team before collection is the amount payable. There is no charge for home collection wherever free collection is available.'] },
      { heading: 'Reports', body: ['Reports are released after laboratory review. Turnaround times are estimates and may vary with the test, sample quality and need for repeat testing.'] },
      { heading: 'Use of the website', body: ['Information on this website is general and does not replace advice from a qualified doctor. Do not misuse the website or attempt to access information that does not belong to you.'] },
      { heading: 'Contact', body: [contactLine] },
    ],
  },
  'patient-consent': {
    title: 'Patient Consent',
    description: 'Consent for sample collection, testing and use of your information.',
    sections: [
      { heading: 'Consent to collection and testing', body: ['By booking a test you consent to the collection of the required sample by trained staff and to the laboratory testing of that sample for the investigations requested.'] },
      { heading: 'Consent to contact', body: ['You agree that DRL DIAGNOSTICS may contact you by phone, SMS, email or WhatsApp about your booking, sample collection and report status.'] },
      { heading: 'Minors and dependants', body: ['If you book for a minor or a person who cannot consent, you confirm that you are their parent, guardian or authorised representative.'] },
      { heading: 'Withdrawing consent', body: ['You may withdraw consent before sample collection by cancelling your booking. Withdrawal does not affect processing already carried out or records we must keep by law.'] },
    ],
  },
  'cancellation-policy': {
    title: 'Cancellation Policy',
    description: 'How to cancel or reschedule a test booking or home collection.',
    sections: [
      { heading: 'Cancelling or rescheduling', body: ['You can cancel or reschedule a booking at any time before the sample is collected by contacting our team with your booking reference.'] },
      { heading: 'Cancellations by DRL DIAGNOSTICS', body: ['We may need to reschedule if collection cannot be arranged at your location or time. We will contact you to offer another slot or a laboratory visit.'] },
    ],
  },
  'refund-policy': {
    title: 'Refund Policy',
    description: 'Refunds for prepaid bookings, where online payment is offered.',
    sections: [
      { heading: 'Current payments', body: ['Online payment is not currently required on this website. Payment is collected at the time of sample collection or at the laboratory after the final amount has been confirmed with you.'] },
      { heading: 'Future online payments', body: ['If online payment is introduced, bookings cancelled before sample collection will be refunded to the original payment method. Refund timelines will be published here.'] },
    ],
  },
  'medical-disclaimer': {
    title: 'Medical Disclaimer',
    description: 'Important information about test descriptions and results on this website.',
    sections: [
      { heading: 'General information only', body: ['Test descriptions on this website are for general information. They are not a diagnosis and do not replace a consultation with a qualified doctor.'] },
      { heading: 'Interpreting results', body: ['Laboratory results must be interpreted by a qualified doctor in the context of your symptoms, history and other investigations. Please consult your doctor about your report.'] },
      { heading: 'Emergencies', body: ['If you have a medical emergency, contact emergency services or go to the nearest hospital immediately.'] },
    ],
  },
}
