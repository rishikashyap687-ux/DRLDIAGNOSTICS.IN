/**
 * Home collection service areas — SAMPLE DATA.
 *
 * Collection is planned nationwide. Until the admin service-area module ships
 * (see PLAN.md), this list holds the PIN codes where the team can collect
 * today. A PIN not listed here is never auto-confirmed: the patient is offered
 * a service enquiry instead.
 */

export interface ServiceArea {
  pin: string
  area: string
  city: string
  state: string
  slots: string[]
}

const daySlots = [
  '07:00 – 08:00',
  '08:00 – 09:00',
  '09:00 – 10:00',
  '10:00 – 11:00',
  '11:00 – 12:00',
  '16:00 – 17:00',
  '17:00 – 18:00',
]

export const serviceAreas: ServiceArea[] = [
  { pin: '110094', area: 'Sabapur, Karawal Nagar, Sonia Vihar', city: 'Delhi', state: 'Delhi', slots: daySlots },
  { pin: '110090', area: 'Mustafabad, Bhajanpura (part)', city: 'Delhi', state: 'Delhi', slots: daySlots },
  { pin: '110093', area: 'Nand Nagri, Gokalpuri', city: 'Delhi', state: 'Delhi', slots: daySlots },
  { pin: '110053', area: 'Yamuna Vihar, Bhajanpura, Maujpur', city: 'Delhi', state: 'Delhi', slots: daySlots },
  { pin: '110032', area: 'Shahdara, Vishwas Nagar', city: 'Delhi', state: 'Delhi', slots: daySlots },
  { pin: '110084', area: 'Burari, Mukundpur', city: 'Delhi', state: 'Delhi', slots: daySlots },
  { pin: '110007', area: 'Kamla Nagar, Vijay Nagar', city: 'Delhi', state: 'Delhi', slots: daySlots },
  { pin: '110009', area: 'Mukherjee Nagar, Model Town', city: 'Delhi', state: 'Delhi', slots: daySlots },
  { pin: '201102', area: 'Loni', city: 'Ghaziabad', state: 'Uttar Pradesh', slots: daySlots },
]

export const allSlots = daySlots

export function findServiceArea(pin: string): ServiceArea | undefined {
  return serviceAreas.find((a) => a.pin === pin.trim())
}

export const indianStates = [
  'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh',
  'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry',
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal',
]
