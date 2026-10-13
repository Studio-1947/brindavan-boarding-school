/* Teacher profile details shown at /faculty/<slug>, keyed by the slug from staffSlug().
   Source: the school's teacher biodata register (private/bbsteachers.xlsx).
   Only professional details belong here. Never add dates of birth, addresses, phone numbers,
   email addresses, family details or ID numbers from the register.
   A teacher with no entry still gets a page showing their name, subject and photo. */

export type StaffProfile = {
  role?: string;
  /** Overrides the subject shown on the card when the register is more specific.
   *  Use null when the card shows a role because no subject is on record. */
  subjects?: string | null;
  classes?: string;
  joined?: string;
  languages?: string[];
  about?: string;
  /** The teacher's own stated aim, shown as a quote. */
  philosophy?: string;
  focus?: string[];
  qualifications?: string[];
  experience?: string[];
  strengths?: string[];
};

export const profiles: Record<string, StaffProfile> = {
  'deepen-gurung': {
    role: 'Assistant Teacher',
    subjects: 'Mathematics',
    joined: '2007',
    about:
      'A member of the Brindavan faculty since 2007, with close to two decades of Mathematics teaching. Lessons pair clear explanation with practical problem-solving, and students of differing abilities get individual support.',
    focus: [
      'Engaging Mathematics lessons',
      'Support for students of varied abilities',
      'Individualised guidance',
      'Independent thinking, discipline and character',
    ],
    qualifications: ['B.Sc.', 'D.El.Ed.', 'B.Ed.'],
    experience: ['Assistant Teacher, Brindavan Boarding School (2007–present)'],
    strengths: [
      'Mathematics instruction',
      'Student support and guidance',
      'Classroom management',
      'Inclusive learning',
      'Patience and responsibility',
      'Character development',
    ],
  },
  'niten-bhandari': {
    role: 'Assistant Teacher',
    subjects: 'Physics, Mathematics',
    joined: '2023',
    about:
      'Brings more than nine years of teaching experience to Brindavan, with a focus on Physics and Mathematics taught through clear, practical lessons in a patient and inclusive classroom.',
    qualifications: ['B.Sc.', 'D.El.Ed.'],
    experience: [
      'Assistant Teacher, Brindavan Boarding School (2023–present)',
      'Assistant Teacher, Tharbo High School (2018–2023)',
      'Assistant Teacher, Dreamland English School (2012–2018)',
    ],
    strengths: [
      'Clear practical lessons',
      'Student support',
      'Classroom management',
      'Academic progress',
      'Character development',
    ],
  },
  'dipna-lama': {
    role: 'English Teacher and House In-charge',
    subjects: 'English',
    classes: 'VI–X',
    about:
      'Teaches English and serves as the school’s Overall House In-charge and primary event coordinator, organising literary, cultural and sports events through the year.',
    focus: [
      'English language and literature foundations',
      'Lesson planning with digital teaching aids',
      'Debates, creative arts, sports, assemblies and school functions',
      'Mentoring student leaders',
      'Announcements and public speaking',
    ],
    qualifications: [
      'M.A. in English',
      'B.Ed.',
      'Nursery Primary Teacher Training (NPTT)',
      'Diploma in Computer Application (DCA)',
      'NCC “A” Certificate',
    ],
    strengths: [
      'Literature analysis',
      'Grammar mastery',
      'Interactive classroom management',
      'Early childhood integration',
      'Digital teaching aids',
      'Public speaking',
      'Event coordination',
      'Mentorship',
      'Leadership',
      'Conflict resolution',
    ],
  },
  'sharmili-bhandari': {
    role: 'Assistant Teacher',
    subjects: 'Hindi',
    joined: '2007',
    about:
      'Joined Brindavan in 2007 after teaching and lecturing in Hindi in Himachal Pradesh. Sees teaching as helping students develop confidence and capacity.',
    philosophy: 'Improve academic performance and support well-rounded student development.',
    qualifications: ['M.A. in Hindi', 'B.A.'],
    experience: [
      'Assistant Teacher, Brindavan Boarding School (2007–present)',
      'Lecturer in Hindi, Government Senior Secondary School (1996–1998)',
      'Bhagsu Model Public School, Himachal Pradesh (1995–1996)',
    ],
    strengths: [
      'Academic performance',
      'Teacher, student and parent collaboration',
      'Intellectual, social and emotional development',
      'Mental well-being',
    ],
  },
  'chandana-ghimire': {
    role: 'Assistant Teacher',
    subjects: 'Geography, Economics Applications',
    classes: '8–12',
    joined: '2024',
    about:
      'Joined Brindavan in 2024 as a Geography teacher and later took on Economics Applications as well. Lessons connect the curriculum with real environments, places and human activity, with an emphasis on conceptual foundations and critical thinking.',
    philosophy: 'Help students understand the world and prepare them for life, not only examinations.',
    qualifications: ['M.A. in Geography', 'B.Ed.', 'UGC NET, CTET and WBTET qualified'],
    strengths: [
      'Instructional excellence',
      'Real-world learning',
      'Holistic student mentorship',
      'Classroom management',
      'Geography and Economics teaching',
    ],
  },
  'muna-lepcha': {
    role: 'Assistant Teacher',
    subjects: 'History',
    joined: '2025',
    about:
      'Uses stories, critical thinking and an understanding of the historical past to build students’ curiosity, confidence, discipline and responsibility.',
    philosophy: 'Educate, Inspire and Empower.',
    qualifications: ['M.A. in History', 'B.Ed.'],
    experience: ['Assistant Teacher, Brindavan Boarding School (2025–present)'],
    strengths: [
      'Honesty and punctuality',
      'Integrity',
      'Respect',
      'Equal opportunity',
      'Creativity',
      'Teamwork',
      'Continuous learning and self-improvement',
    ],
  },
  'pema-cheden-sherpa': {
    role: 'Assistant Teacher',
    subjects: 'Political Science',
    classes: 'VI–XII',
    joined: '2008',
    about:
      'Has taught at Brindavan since 2008. Focuses on developing each student’s confidence, potential, personality and academic growth within a favourable learning environment.',
    qualifications: ['M.A. in Political Science', 'B.Ed.'],
    experience: ['Assistant Teacher, Brindavan Boarding School (2008–present)'],
  },
  'poonam-tamang': {
    role: 'Sociology and Computer Teacher, House In-charge',
    subjects: 'Sociology, Computer',
    joined: '2025',
    about:
      'Grew up in the Darjeeling district and joined Brindavan in January 2025. Helps students understand society and learn practical computer applications.',
    philosophy: 'Make learning simple, practical, and useful for students’ futures.',
    focus: [
      'Sociology and practical computer skills',
      'Managing house activities and leading school teams',
      'Mentoring, counselling and motivating pupils',
      'Coordinating cultural activities and participation',
    ],
    qualifications: ['M.A. in Sociology', 'B.Ed.'],
    strengths: [
      'Classroom management',
      'Structured lesson planning',
      'Computer hardware and software fundamentals',
      'Explaining complex concepts simply',
      'Excel',
      'Patient listening and empathy',
      'Conflict resolution',
      'Counselling',
      'Leadership and teamwork',
    ],
  },
  'renisha-rai': {
    role: 'Assistant Teacher',
    joined: '2016',
    languages: ['English', 'Hindi', 'Nepali'],
    philosophy: 'Provide quality education, nurture student abilities and contribute to overall development.',
    focus: [
      'Modern teaching methods',
      'Communication with parents',
      'Activities, meetings and examinations',
      'Student discipline and values',
      'Collaboration and professional development',
    ],
    qualifications: ['B.A. (Honours) in English', 'B.Ed.'],
    experience: ['Assistant Teacher, Brindavan Boarding School (2016–present)'],
    strengths: ['Classroom management', 'Assessment and evaluation', 'Behaviour management', 'Teamwork'],
  },
  'priti-tamang': {
    role: 'Teacher',
    subjects: 'Nepali',
    joined: '2020',
    about:
      'Joined Brindavan in 2020 after 13 years of teaching in other schools. Teaches Nepali with an emphasis on language, cultural identity, heritage and student confidence.',
    qualifications: ['B.A.', 'B.Ed.'],
    experience: [
      'Teacher, Brindavan Boarding School (2020–present)',
      '13 years of teaching before joining Brindavan',
    ],
    strengths: [
      'Literature and cultural identity',
      'Student empowerment',
      'Nepali grammar',
      'Vocabulary',
      'Public speaking',
      'Writing',
      'Inclusive education',
    ],
  },
  'sushma-rai': {
    role: 'Assistant Teacher',
    subjects: 'English',
    languages: ['English', 'Hindi', 'Nepali'],
    philosophy: 'Use teaching experience to create a positive and effective learning environment.',
    focus: [
      'Lessons planned around the school’s context',
      'Assessments',
      'A positive classroom environment and discipline',
      'Social and academic support for students',
      'Use of technology in teaching',
    ],
    qualifications: ['M.A. in English', 'Bachelor’s degree'],
    strengths: ['Classroom management', 'Assessment and evaluation', 'Behaviour management', 'Teamwork'],
  },
  'sunita-subba': {
    role: 'Assistant Teacher',
    subjects: 'Pre-primary',
    joined: '2015',
    languages: ['English', 'Nepali', 'Hindi'],
    about:
      'A pre-primary teacher who uses child-centred, creative methods, with a focus on emotional growth, a positive learning environment and each child’s all-round development.',
    qualifications: ['Bachelor’s degree'],
    strengths: [
      'Activity-based learning',
      'Patience and empathy',
      'Arts and crafts',
      'Lesson planning',
      'Curriculum implementation',
      'Early childhood education',
      'Classroom management',
      'Child development',
    ],
  },
  'sumi-pradhan': {
    role: 'Assistant Teacher',
    subjects: null,
    joined: '2009',
    languages: ['English', 'Hindi', 'Nepali'],
    philosophy:
      'Teach effectively and efficiently, motivate students and create interest with innovative techniques and modern teaching aids.',
    focus: [
      'Lessons planned to suit each class',
      'A positive classroom environment',
      'Managing the classroom space and behaviour',
      'Academic, social and emotional development',
    ],
    qualifications: ['B.Ed.', 'Bachelor’s degree'],
    experience: ['Assistant Teacher, Brindavan Boarding School (2009–present)'],
    strengths: ['Classroom management', 'Assessment and evaluation', 'Behaviour management', 'Teamwork'],
  },
  'anjali-ghatani': {
    role: 'Teacher',
    subjects: null,
    joined: '2023',
    languages: ['Nepali', 'English', 'Hindi'],
    focus: [
      'Preparing and delivering daily lessons',
      'Lesson plans, classwork, homework, tests and examinations',
      'Assessing learning and keeping progress records',
      'Individual guidance',
      'Discipline and encouraging activities',
    ],
    qualifications: ['B.A.', 'Nursery Teacher Training (NTT) and Montessori training'],
    experience: ['Teacher, Brindavan Boarding School (2023–present)'],
  },
  'renu-pradhan': {
    role: 'Assistant Teacher',
    subjects: null,
    languages: ['English', 'Hindi', 'Nepali'],
    philosophy: 'Provide quality education, nurture abilities, and develop professionally.',
    focus: [
      'Planning and delivering lessons to the curriculum',
      'Maintaining discipline',
      'Assessing performance',
      'Individual guidance',
      'Encouraging participation, creativity and confidence',
    ],
    qualifications: ['M.A.', 'Bachelor’s degree'],
    strengths: ['Classroom management', 'Assessment and evaluation', 'Behaviour management', 'Teamwork'],
  },
};
