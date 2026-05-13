// ─── Mock credentials (role determined by login) ───────────────────────────
// resident@besmart.ph / resident123  → role: 'resident'
// mrf@besmart.ph      / mrf123       → role: 'mrf'

// ─── Resident ───────────────────────────────────────────────────────────────
export const mockUser = {
  id: 'user-001',
  name: 'Juan Dela Cruz',
  initials: 'JD',
  email: 'juan.delacruz@email.com',
  phone: '+63 917 123 4567',
  address: '123 Rizal Ave, Batangas City',
  barangay: 'Brgy. Kumintang Ibaba',
  memberSince: 'Jan 2024',
  ecoTokenBalance: 1240,
  totalEarned: 1560,
  totalRedeemed: 320,
  binsReported: 34,
  itemsRedeemed: 8,
};

export const mockTransactions = [
  { id: 'txn-001', type: 'earned',   title: 'Bin Report — Full', description: 'Brgy. Kumintang Ibaba', dateTime: 'May 10, 2025 · 8:32 AM',  amount: 50  },
  { id: 'txn-002', type: 'earned',   title: 'Bin Report — OK',   description: 'Brgy. Pallocan West',   dateTime: 'May 9, 2025 · 3:15 PM',   amount: 20  },
  { id: 'txn-003', type: 'earned',   title: 'Bin Report — Full', description: 'Brgy. Alangilan',       dateTime: 'May 8, 2025 · 10:05 AM',  amount: 50  },
  { id: 'txn-004', type: 'earned',   title: 'Bin Report — OK',   description: 'Brgy. Sta. Rita Karsada', dateTime: 'May 7, 2025 · 1:45 PM', amount: 20  },
  { id: 'txn-005', type: 'earned',   title: 'Bin Report — Full', description: 'Brgy. Libjo',           dateTime: 'May 6, 2025 · 9:00 AM',   amount: 50  },
  { id: 'txn-006', type: 'earned',   title: 'Bin Report — OK',   description: 'Brgy. Cuta',            dateTime: 'May 5, 2025 · 4:20 PM',   amount: 20  },
  { id: 'txn-007', type: 'redeemed', title: 'Jollibee ₱50 GC Redeemed',       description: 'Jollibee',      dateTime: 'May 4, 2025 · 12:00 PM', amount: 200 },
  { id: 'txn-008', type: 'redeemed', title: 'SM Malls ₱100 GC Redeemed',      description: 'SM Malls',      dateTime: 'May 2, 2025 · 2:30 PM',  amount: 80  },
  { id: 'txn-009', type: 'redeemed', title: 'Mercury Drug ₱30 GC Redeemed',   description: 'Mercury Drug',  dateTime: 'Apr 28, 2025 · 11:00 AM', amount: 40 },
];

export const mockMapData = {
  trucks: [
    { id: 'truck-001', label: 'Truck #3 — En Route', status: 'en_route', posX: 0.55, posY: 0.35 },
  ],
  bins: [
    { id: 'bin-001', label: 'Bin · Brgy. Kumintang Ibaba', status: 'full', posX: 0.3,  posY: 0.5  },
    { id: 'bin-002', label: 'Bin · Brgy. Alangilan',       status: 'ok',   posX: 0.65, posY: 0.6  },
    { id: 'bin-003', label: 'Bin · Brgy. Pallocan West',   status: 'ok',   posX: 0.45, posY: 0.72 },
  ],
};

// ─── MRF Worker ─────────────────────────────────────────────────────────────
export const mockMRFUser = {
  id: 'mrf-001',
  name: 'Carlos Reyes',
  initials: 'CR',
  email: 'carlos.reyes@besmart.gov.ph',
  phone: '+63 918 456 7890',
  address: 'MRF Compound, Brgy. Alangilan',
  barangay: 'Brgy. Alangilan',
  facility: 'MRF Alangilan',
  employeeId: 'MRF-2024-003',
  memberSince: 'Mar 2024',
  tokensIssued: 4820,
  scansToday: 12,
  residentsServed: 87,
};

export const mockMRFTransactions = [
  { id: 'mrf-txn-001', residentName: 'Juan Dela Cruz', residentId: 'user-001', wasteType: 'Recyclables',   weight: '2.5 kg', tokensAwarded: 50, dateTime: 'May 12, 2025 · 9:14 AM',  mrf: 'MRF Alangilan' },
  { id: 'mrf-txn-002', residentName: 'Maria Santos',   residentId: 'user-002', wasteType: 'Biodegradable', weight: '1.8 kg', tokensAwarded: 36, dateTime: 'May 12, 2025 · 8:50 AM',  mrf: 'MRF Alangilan' },
  { id: 'mrf-txn-003', residentName: 'Pedro Lim',      residentId: 'user-003', wasteType: 'Recyclables',   weight: '3.0 kg', tokensAwarded: 60, dateTime: 'May 11, 2025 · 4:30 PM',  mrf: 'MRF Alangilan' },
  { id: 'mrf-txn-004', residentName: 'Ana Reyes',      residentId: 'user-004', wasteType: 'Special Waste', weight: '0.5 kg', tokensAwarded: 25, dateTime: 'May 11, 2025 · 2:15 PM',  mrf: 'MRF Alangilan' },
  { id: 'mrf-txn-005', residentName: 'Jose Garcia',    residentId: 'user-005', wasteType: 'Biodegradable', weight: '2.2 kg', tokensAwarded: 44, dateTime: 'May 10, 2025 · 11:00 AM', mrf: 'MRF Alangilan' },
  { id: 'mrf-txn-006', residentName: 'Luz Mendoza',    residentId: 'user-006', wasteType: 'Recyclables',   weight: '4.1 kg', tokensAwarded: 82, dateTime: 'May 10, 2025 · 9:45 AM',  mrf: 'MRF Alangilan' },
];

export const mockMRFLocations = [
  { id: 'mrf-loc-001', name: 'MRF Alangilan',  barangay: 'Brgy. Alangilan',        status: 'available', posX: 0.3,  posY: 0.45 },
  { id: 'mrf-loc-002', name: 'MRF Kumintang',  barangay: 'Brgy. Kumintang Ibaba',  status: 'full',      posX: 0.62, posY: 0.3  },
  { id: 'mrf-loc-003', name: 'MRF Pallocan',   barangay: 'Brgy. Pallocan West',    status: 'available', posX: 0.5,  posY: 0.68 },
  { id: 'mrf-loc-004', name: 'MRF Cuta',       barangay: 'Brgy. Cuta',             status: 'full',      posX: 0.75, posY: 0.55 },
];

// ─── MRF Buyer ───────────────────────────────────────────────────────────────
export const mockBuyerUser = {
  id: 'buyer-001',
  name: 'Ramon Villanueva',
  initials: 'RV',
  email: 'ramon.villanueva@email.com',
  phone: '+63 919 876 5432',
  address: '45 Burgos St, Batangas City',
  barangay: 'Brgy. Cuta',
  memberSince: 'Feb 2025',
  totalPurchases: 18,
  totalSpent: '₱24,500',
  completedReservations: 15,
};

export const mockMRFReservations = [
  { id: 'res-001', mrfName: 'MRF Alangilan',  barangay: 'Brgy. Alangilan',       material: 'Recyclables',   weight: '50 kg',  amount: '₱1,500', status: 'pending',   dateTime: 'May 14, 2025 · 10:00 AM' },
  { id: 'res-002', mrfName: 'MRF Pallocan',   barangay: 'Brgy. Pallocan West',   material: 'Scrap Metal',   weight: '30 kg',  amount: '₱2,100', status: 'pending',   dateTime: 'May 15, 2025 · 2:00 PM'  },
  { id: 'res-003', mrfName: 'MRF Kumintang',  barangay: 'Brgy. Kumintang Ibaba', material: 'Recyclables',   weight: '80 kg',  amount: '₱2,400', status: 'completed', dateTime: 'May 10, 2025 · 9:00 AM'  },
  { id: 'res-004', mrfName: 'MRF Cuta',       barangay: 'Brgy. Cuta',            material: 'Scrap Metal',   weight: '60 kg',  amount: '₱4,200', status: 'completed', dateTime: 'May 8, 2025 · 11:30 AM'  },
  { id: 'res-005', mrfName: 'MRF Alangilan',  barangay: 'Brgy. Alangilan',       material: 'Biodegradable', weight: '40 kg',  amount: '₱800',   status: 'completed', dateTime: 'May 5, 2025 · 3:00 PM'   },
];

export const mockBuyerTransactions = [
  { id: 'btxn-001', mrfName: 'MRF Kumintang',  barangay: 'Brgy. Kumintang Ibaba', material: 'Recyclables',   weight: '80 kg',  amount: '₱2,400', dateTime: 'May 10, 2025 · 9:00 AM'  },
  { id: 'btxn-002', mrfName: 'MRF Cuta',       barangay: 'Brgy. Cuta',            material: 'Scrap Metal',   weight: '60 kg',  amount: '₱4,200', dateTime: 'May 8, 2025 · 11:30 AM'  },
  { id: 'btxn-003', mrfName: 'MRF Alangilan',  barangay: 'Brgy. Alangilan',       material: 'Biodegradable', weight: '40 kg',  amount: '₱800',   dateTime: 'May 5, 2025 · 3:00 PM'   },
  { id: 'btxn-004', mrfName: 'MRF Pallocan',   barangay: 'Brgy. Pallocan West',   material: 'Recyclables',   weight: '100 kg', amount: '₱3,000', dateTime: 'Apr 28, 2025 · 8:00 AM'  },
  { id: 'btxn-005', mrfName: 'MRF Kumintang',  barangay: 'Brgy. Kumintang Ibaba', material: 'Scrap Metal',   weight: '75 kg',  amount: '₱5,250', dateTime: 'Apr 22, 2025 · 1:00 PM'  },
];

// ─── Shared ──────────────────────────────────────────────────────────────────
export const mockRewards = [
  { id: 'rwd-001', name: 'Mercury Drug ₱100 Voucher',    tokenCost: 400, category: 'Services',  partner: 'Mercury Drug',       placeholderColor: '#E3F2FD', featured: true  },
  { id: 'rwd-002', name: 'Jollibee ₱50 GC',             tokenCost: 200, category: 'Food',       partner: 'Jollibee',           placeholderColor: '#FFF9C4', featured: false },
  { id: 'rwd-003', name: 'SM Malls ₱100 GC',            tokenCost: 350, category: 'Shopping',   partner: 'SM Malls',           placeholderColor: '#F3E5F5', featured: false },
  { id: 'rwd-004', name: 'Meralco Bill Discount',        tokenCost: 500, category: 'Utilities',  partner: 'Meralco',            placeholderColor: '#FFF3E0', featured: false },
  { id: 'rwd-005', name: 'Chowking ₱50 GC',             tokenCost: 180, category: 'Food',       partner: 'Chowking',           placeholderColor: '#FFEBEE', featured: false },
  { id: 'rwd-006', name: 'National Bookstore ₱75 GC',   tokenCost: 250, category: 'Shopping',   partner: 'National Bookstore', placeholderColor: '#E8F5E9', featured: false },
];

export const mockPartnerAds = [
  { id: 'ad-001', partner: 'SM Malls',     tagline: '10% off at SM Batangas',  placeholderColor: '#E8EAF6' },
  { id: 'ad-002', partner: 'Jollibee',     tagline: 'Free drink with every meal', placeholderColor: '#FFF9C4' },
  { id: 'ad-003', partner: 'Mercury Drug', tagline: '5% off on vitamins',      placeholderColor: '#E3F2FD' },
];

export const batangasBarangays = [
  'Brgy. Alangilan',
  'Brgy. Cuta',
  'Brgy. Kumintang Ibaba',
  'Brgy. Kumintang Ilaya',
  'Brgy. Libjo',
  'Brgy. Pallocan West',
  'Brgy. Pallocan East',
  'Brgy. Sta. Rita Karsada',
];
