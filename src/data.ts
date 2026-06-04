import { CaseStudy, SkillCategory, Hobby, Testimonial } from './types';

export const HERO_DATA = {
  name: "Hi, I'm Sarthak Bajaj — a Journalist by degree, Product Designer by passion, turning complex AI and B2B problems into simple, human-centered experiences.",
  role: "Designed AI experiences and B2B products across travel, edtech, and traceability systems — focusing on solving real user problems.",
  tagline: "",
  metrics: [
    { label: 'Product: YoLearn Landing Experience', value: '~20% Higher Signup Conversion' },
    { label: 'Product: TravelMatic B2B Travel Platform', value: '~2 Minutes Saved Per Booking' },
    { label: 'Product: AI-Guided Revision Experience', value: 'Increased Feature Adoption by 30%' },
    { label: 'Product: Textile Traceability System', value: 'Increased Operational Efficiency' }
  ]
};

export const ABOUT_ME = {
  bio: 'I OPERATE AT THE COINCIDENCE OF DISTRIBUTED LOGIC AND COGNITIVE ERGONOMICS. FOR OVER A DECADE, I HAVE TRANSFORMED CRYPTIC API PATHWAYS, EMBEDDED SYSTEM METRICS, AND COMPLEX HIGH-FREQUENCY PIPELINES INTO SCALABLE, INTUITIVE GRAPHICAL COCKPITS. MY PIXEL DISCIPLINE ENSURES THAT MILLISECONDS LOST TO RECONCILIATION COGNITION SHRINK TO ZERO.',
  philosophy: 'COMPLEXITY IS A DENSITY PROBLEM, NOT A CLUTTER PROBLEM. BY ENFORCING STRICT GRID ALIGNMENT, INTENTIONAL COLOR BOUNDARIES, AND CLEAR HIERARCHICAL DISCIPLINE, EVEN THE DENSEST METADATA CHANNELS BECOME EFFORTLESS TO READ INCIDENTALLY.',
  experience: [
    {
      year: '2024-PRES',
      role: 'PRINCIPAL TERMINAL DESIGNER',
      company: 'KUBETRONICS OPERATING LABS',
      desc: 'AUTHORING THE SYSTEM-UI DESKTOP DIRECTIVES FOR ENTERPRISE SPANNER MONITORING CONSOLES.'
    },
    {
      year: '2021-2024',
      role: 'DIRECTOR OF INTERACTION',
      company: 'HELIOS FLIGHT ENGINEERING',
      desc: 'LED GROUND-CONTROL UI FOR AUTONOMOUS INDUSTRIAL SPRAYING SYSTEM COCKPITS.'
    },
    {
      year: '2018-2021',
      role: 'SYSTEMS ARCHITECT / DESIGNER',
      company: 'NEXUS REPLICA CO.',
      desc: 'CONSTRUCTED MODULAR GRAPH DESIGN SYSTEMS REDUCING LATENCY-ALERT DELAYS BY 45%.'
    }
  ]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'VISUAL DESIGN & STRUCTURAL LAYOUT',
    skills: [
      'PIXEL-PERFECT INTERFACE DENSITY',
      'TACTILE DOT-MATRIX SCHEMATICS',
      'HIGH-CONTRAST MONOCHROME PALETTES',
      'MONOMINIMAL GRID RULES',
      'RESPONSIVE FLEX-ALIGN BENTO GRID',
      'ISO-GRID WIREFRAME SCHEMES'
    ]
  },
  {
    title: 'LOGIC & PROTOCOL INTEGRATION',
    skills: [
      'FRONTEND REACT 19 & TAILWIND',
      'STATE SYNCHRONIZATION TUNNELS',
      'D3 HIGH-STREAM CONSOLE CHARTS',
      'PREDICTIVE INTERACTION DESIGN',
      'COMPLEX DASHBOARD COGNITIVE LOADS',
      'SVG RENDERING ENGINE FLOWS'
    ]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'revise-smarter',
    title: 'Helping Students Revise Smarter with AI-Guided Study Paths',
    category: 'EDTECH AI SYSTEM',
    description: 'Designed an AI-guided revision experience that helps students create structured study plans inside the existing chat workflow instead of relying on disconnected tools.',
    role: 'Lead UX / Product Designer',
    year: '2024',
    thumbnail: `
+-----------------------------------+
|  [AI REVISION EXPERT SYSTEM]      |
|                                   |
|   Chat > [Generate Study Plan]    |
|   |--> checkpoint_1: AI core      |
|   |--> checkpoint_2: diagnostic   |
|                                   |
|  * 70-85% SESSION INTEGRATION     |
+-----------------------------------+`,
    difficulty: 'LOW INITIAL TOOL ADOPTION (~4%)',
    tags: ['AI GUIDANCE', 'INTERFACE CONSOLIDATION', 'CHAT WORKFLOW', 'COGNITIVE OPTIMIZATION'],
    problem: 'Helping Students Revise Smarter with AI-Guided Study Paths',
    solution: 'Designed an integrated learning pathway within the core chat interface, enabling active study diagnostics and plan generation without tool-switching.',
    metrics: [
      'Integrated revision planning into the platform’s most-used experience (70–85% of sessions), solving low adoption of standalone learning tools (~4%).'
    ]
  },
  {
    id: 'textile-traceability',
    title: 'Solving Inventory & Source Tracking for Textile Businesses',
    category: 'TRACEABILITY & SUPPLY LOGISTICS',
    description: 'Designed a traceability system for textile manufacturers to manage supplier workflows, production stages, and audit-ready documentation across complex supply chains.',
    role: 'Systems Interaction Architect',
    year: '2024',
    thumbnail: `
+-----------------------------------+
|  [SUPPLY CHAIN TRACE MATRIX]      |
|                                   |
|   [Audit-Ready Docs Portal]       |
|   Supplier A --> Spinner B --> GAr    |
|   [Status: Verifying Credentials]  |
|                                   |
|  * SPREADSHEETS RETIRED           |
+-----------------------------------+`,
    difficulty: 'COMPLEX MULTI-TIER AUDITING',
    tags: ['WORKFLOW DESIGN', 'TRACEABILITY LOGS', 'COMPLIANCE RADAR', 'SUPPLY WORKFLOWS'],
    problem: 'Solving Inventory & Source Tracking for Textile Businesses',
    solution: 'Designed a centralized multi-party workflow mapping suppliers to subcontractors, securing audit logs and instant certification queries.',
    metrics: [
      'Replaced fragmented spreadsheet-based tracking with a structured workflow designed for faster document retrieval, clearer subcontractor visibility, and scalable traceability management.'
    ]
  },
  {
    id: 'travelmatic-platform',
    title: 'Saving ~2 Minutes per Booking to Help Agents Handle More Bookings',
    category: 'HIGH-VELOCITY TRANSACTIONS',
    description: 'Redesigned a legacy B2B train booking workflow to reduce navigation friction while keeping the experience familiar for travel agents managing multiple bookings simultaneously.',
    role: 'Lead Product Designer',
    year: '2023',
    thumbnail: `
+-----------------------------------+
|  [TRAVELMATIC B2B TRAIN SECTOR]   |
|                                   |
|   [Active Train Reservation]       |
|   Search --> Map Seat --> Checkout|
|   [Save ~120s booking limit]       |
|                                   |
|  * 60% REVENUE FLUIDITY           |
+-----------------------------------+`,
    difficulty: 'MULTI-WINDOW NAV FRICTION',
    tags: ['COGNITIVE ERGONOMICS', 'B2B TRANSACTION', 'FLOW COMPRESSION', 'TIME REDUCTION'],
    problem: 'Saving ~2 Minutes per Booking to Help Agents Handle More Bookings',
    solution: 'Engineered a unified modal layout that bundles search filters with train occupancy charts and instant traveler manifests, minimizing application switching.',
    metrics: [
      'Optimized a booking flow taking ~4–5 minutes on average, focusing on the train module contributing nearly 60% of platform revenue.'
    ]
  },
  {
    id: 'yolearn-landing',
    title: 'Increasing Conversions by 20% Through a Redesigned Landing Experience',
    category: 'GROWTH EXPERIENCE',
    description: 'Redesigned the landing experience to better communicate the platform’s AI-first vision, improve product clarity, and guide users more effectively toward signup.',
    role: 'Principal Growth Designer',
    year: '2023',
    thumbnail: `
+-----------------------------------+
|  [YOLEARN CONCENTRIC GROWTH]      |
|                                   |
|   /---------------------------\\   |
|   |  AI-First Vision Segment  |   |
|   \\---------------------------/   |
|                                   |
|  * ~20% SIGNUP CONVERSION BOOST   |
+-----------------------------------+`,
    difficulty: 'PLATFORM PRODUCT CLARITY GAP',
    tags: ['GROWTH EXPERIENCES', 'CONVERSION OPTIMIZATION', 'MOBILE ACCESSIBILITY', 'PRODUCT POSITIONING'],
    problem: 'Increasing Conversions by Redesigning the Landing Experience',
    solution: 'Completely overhauled the layout hierarchy with modular interactive sandbox showcases and unified user call-to-actions targeting app installs.',
    metrics: [
      'Improved landing page communication, product positioning, and mobile app visibility — contributing to ~20% higher signup conversions and clearer product understanding for users.'
    ]
  }
];

export const RETRO_HOBBIES: Hobby[] = [
  {
    id: 'key-modding',
    name: 'VINTAGE KEYBOARD MODDING',
    iconName: 'Keyboard',
    badge: '1984 ALPS PINS',
    description: 'RESTORING AND CUSTOM-WIRING VINTAGE CHERRY AND IBM BUCKLING-SPRING TERMINAL KEYBOARDS FOR ULTRA-THICK TACTILE FEEDBACK INTEGRATION.'
  },
  {
    id: 'pixel-mapping',
    name: 'AMIGA PIXEL GRID ARTWORK',
    iconName: 'Grid',
    badge: 'MONOCHROME 8-BIT',
    description: 'CREATING RAW GRID SCHEMATICS AND MONOCHROME MATRIX SPRITES BOUNDED BY RIGID CRT RASTER LIMITS TO CELEBRATE THE LIMITATIONS OF RETRO MEMORY.'
  },
  {
    id: 'hardware-emu',
    name: 'HARDWARE EMULATION LABS',
    iconName: 'Cpu',
    badge: 'FPGA CORE SYSTEM',
    description: 'ASSEMBLING CYCLONE CHIP ARCHITECTURES TO SIMULATE THE SOUND CHIPS AND TEXT GENERATORS OF THE EARLY APPLE IIE COMPILATION ERA.'
  },
  {
    id: 'greenhouse-bus',
    name: 'SOLARPUNK EDGE PROPUB',
    iconName: 'Sprout',
    badge: 'IOT MONITOR BUS',
    description: 'WIRING SOLARPUNK HYDROPONIC NUTRIENT CHANNELS BACKED BY OFF-GRID EMBEDDED RASPBERRY PI REPLICATION LOGS.'
  }
];

export const ENDORSEMENTS: Testimonial[] = [
  {
    id: 'e-1',
    author: 'COMMANDER MARCUS STERLING',
    role: 'CHIEF FLIGHT CONTROLLER',
    company: 'HELIOS TELEMETRY LABS',
    quote: 'THE HELIOS FLIGHT DECK LAYOUT REDUCED PILOT REFLECTION GRIPE IN DESERT OPERATIONS TO PURE ZERO. CONTRAST DESIGN WAS THE DIFFERENCE BETWEEN MISSION LOSS AND MISSION COMPLETE.',
    rating: 5
  },
  {
    id: 'e-2',
    author: 'DR. EVELYN FORREST',
    role: 'DIRECTOR OF BIOCYBERNETICS',
    company: 'NEXUS AUTOMATA',
    quote: 'ALEXIS REJECTS DESIGN DECORATIVE SLOP. THEY BRING RUTHLESS COGNITIVE DISCIPLINE. TESTING OUR ENHANCED SECURITY MATRIX GRAPH GAVE US INSTANT INTELLIGENCE RETRIEVAL UNDER 2 SECONDS.',
    rating: 5
  }
];
