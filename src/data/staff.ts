export type StaffMember = {
  name: string;
  title: string;
  /** Leave out until a portrait is available; the card shows a placeholder silhouette. */
  photo?: { src: string; width: number; height: number };
};

/** Teaching staff are grouped by the stream they teach in: move an entry between `science` and `commerceArts` to regroup it. */
export const staff: Record<
  'science' | 'commerceArts' | 'otherTeaching' | 'boarding' | 'support',
  StaffMember[]
> = {
  science: [
    {
      name: 'Mr Deepen Gurung',
      title: 'Mathematics',
      photo: {
        src: '/assets/teachers/deepen-gurung.webp',
        width: 560,
        height: 700,
      },
    },
    {
      name: 'Mr Pratiyush Chettri',
      title: 'Chemistry & Biology',
      photo: {
        src: '/assets/teachers/pratiyush-chettri.webp',
        width: 840,
        height: 1050,
      },
    },
    {
      name: 'Mr Niten Bhandari',
      title: 'Physics',
      photo: {
        src: '/assets/teachers/niten-bhandari.webp',
        width: 560,
        height: 700,
      },
    },
    {
      name: 'Mr Sanjok Pradhan',
      title: 'Biology & General Science',
      photo: {
        src: '/assets/teachers/sanjok-pradhan.webp',
        width: 560,
        height: 700,
      },
    },
    {
      name: 'Mr Ranjit Bhandari',
      title: 'Computer',
      photo: {
        src: '/assets/teachers/ranjit-bhandari.webp',
        width: 560,
        height: 700,
      },
    },
  ],
  commerceArts: [
    {
      name: 'Miss Dipna Lama',
      title: 'English I',
      photo: {
        src: '/assets/teachers/dipna-lama.webp',
        width: 560,
        height: 700,
      },
    },
    {
      name: 'Miss Saikriti Chettri',
      title: 'English II',
      photo: {
        src: '/assets/teachers/saikriti-chettri.webp',
        width: 560,
        height: 700,
      },
    },
    {
      name: 'Mr Pushkar Rai',
      title: 'English I & II, Drama (XI–XII)',
      photo: {
        src: '/assets/teachers/pushkar-rai.webp',
        width: 560,
        height: 700,
      },
    },
    {
      name: 'Miss Sharmili Bhandari',
      title: 'Hindi',
      photo: {
        src: '/assets/teachers/sharmili-bhandari.webp',
        width: 560,
        height: 700,
      },
    },
    {
      name: 'Mr Naren Pradhan',
      title: 'Nepali',
      photo: {
        src: '/assets/teachers/naren-pradhan.webp',
        width: 560,
        height: 700,
      },
    },
    {
      name: 'Miss Nisha Sharma',
      title: 'Nepali',
    },
    {
      name: 'Miss Chandana Ghimire',
      title: 'Geography / Economics',
      photo: {
        src: '/assets/teachers/chandana-ghimire.webp',
        width: 560,
        height: 700,
      },
    },
    {
      name: 'Mr Biswas Rai',
      title: 'Geography',
      photo: {
        src: '/assets/teachers/biswas-rai.webp',
        width: 560,
        height: 700,
      },
    },
    {
      name: 'Miss Muna Lepcha',
      title: 'History',
    },
    {
      name: 'Miss Pema Cheden Sherpa',
      title: 'Political Science',
      photo: {
        src: '/assets/teachers/pema-cheden-sherpa.webp',
        width: 560,
        height: 700,
      },
    },
    {
      name: 'Miss Poonam Tamang',
      title: 'Sociology',
      photo: {
        src: '/assets/teachers/poonam-tamang.webp',
        width: 560,
        height: 700,
      },
    },
    {
      name: 'Mr Saptak Chettri',
      title: 'Physical Training (PTI)',
      photo: {
        src: '/assets/teachers/saptak-chettri.webp',
        width: 560,
        height: 700,
      },
    },
    {
      name: 'Miss Renisha Rai',
      title: 'Culture',
      photo: {
        src: '/assets/teachers/renisha-rai.webp',
        width: 560,
        height: 700,
      },
    },
    {
      name: 'Miss Sangila Thapa',
      title: 'Dance',
      photo: {
        src: '/assets/teachers/sangila-thapa.webp',
        width: 560,
        height: 700,
      },
    },
    {
      name: 'Miss Lakchung Sherpa',
      title: 'Librarian',
      photo: {
        src: '/assets/teachers/lakchung-sherpa.webp',
        width: 560,
        height: 700,
      },
    },
    {
      name: 'Miss Priti Tamang',
      title: 'Nepali',
    },
    {
      name: 'Miss Sushma Rai',
      title: 'English',
    },
  ],
  // Teachers who are not tied to the Science or Commerce & Arts stream, or whose subject is not on record yet.
  otherTeaching: [
    {
      name: 'Miss Sunita Subba',
      title: 'Pre-primary',
    },
    {
      name: 'Miss Sumi Pradhan',
      title: 'Assistant Teacher',
    },
    {
      name: 'Miss Anjali Ghatani',
      title: 'Teacher',
    },
    {
      name: 'Miss Renu Pradhan',
      title: 'Assistant Teacher',
    },
  ],
  boarding: [
    {
      name: 'Mr Biswajeet Tamang',
      title: 'Hostel warden',
    },
    {
      name: 'Miss Madhu Tamang',
      title: 'Hostel warden',
    },
    {
      name: 'Miss Shika Ojha',
      title: 'Hostel warden',
    },
    {
      name: 'Miss Sampita Pradhan',
      title: 'Hostel warden',
    },
    {
      name: 'Sister Beautina Gurung',
      title: 'Hostel cook',
    },
    {
      name: 'Sister Karuna Gurung',
      title: 'Hostel cook',
    },
  ],
  support: [
    {
      name: 'Sri Mahesh Karki',
      title: 'Security guard',
    },
    {
      name: 'Sri Sanjay Mallik',
      title: 'Janitor',
    },
    {
      name: 'Sri Kaziman Bhandari',
      title: 'Water department',
    },
    {
      name: 'Sri Pranam Gurung',
      title: 'Water department',
    },
  ],
};

/** Teachers who have their own profile page at /faculty/<slug>. */
export const teachers: StaffMember[] = [...staff.science, ...staff.commerceArts, ...staff.otherTeaching];

/** URL slug for a staff member: "Mr Deepen Gurung" becomes "deepen-gurung". */
export const staffSlug = (member: StaffMember) =>
  member.name
    .replace(/^(Mr|Mrs|Ms|Miss|Sri|Sister)\s+/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
