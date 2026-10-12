export const initialTeachers = [
  {
    id: 1,
    name: 'Ms. Kavitha Raman',
    gender: 'Female',
    languages: ['Tamil', 'English', 'Hindi'],
    subjects: [
      { name: 'Sec 3 English', level: 'Advanced' },
      { name: 'Secondary English', level: 'Advanced' },
      { name: 'Primary English', level: 'Advanced' },
    ],
    qualifications: ['Bachelor of Arts in English', 'Teaching Certificate'],
    availability: ['evening', 'afternoon'],
    yearsExperience: 6,
    headshot:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    approved: true,
    status: 'approved',
  },
  {
    id: 2,
    name: 'Mr. Daniel Lim',
    gender: 'Male',
    languages: ['English', 'Chinese', 'Malay'],
    subjects: [
      { name: 'Sec 3 English', level: 'Intermediate' },
      { name: 'H2 English Literature', level: 'Intermediate' },
    ],
    qualifications: ['Bachelor of Arts', 'MOE teaching experience'],
    availability: ['morning', 'evening'],
    yearsExperience: 4,
    headshot:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    approved: true,
    status: 'approved',
  },
  {
    id: 3,
    name: 'Ms. Aisha Rahman',
    gender: 'Female',
    languages: ['Malay', 'English', 'Tamil'],
    subjects: [
      { name: 'Primary Mathematics', level: 'Advanced' },
      { name: 'Primary Science', level: 'Advanced' },
      { name: 'Sec 3 English', level: 'Intermediate' },
    ],
    qualifications: ['BSc in Mathematics', 'Diploma in Education'],
    availability: ['morning', 'afternoon'],
    yearsExperience: 8,
    headshot:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    approved: true,
    status: 'approved',
  },
  {
    id: 4,
    name: 'Ms. Priya Nair',
    gender: 'Female',
    languages: ['Tamil', 'English'],
    subjects: [
      { name: 'Sec 3 English', level: 'Advanced' },
      { name: 'Secondary English', level: 'Advanced' },
      { name: 'H1 English', level: 'Intermediate' },
    ],
    qualifications: ['Bachelor of Education', 'University Degree'],
    availability: ['evening'],
    yearsExperience: 5,
    headshot:
      'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=800&q=80',
    approved: true,
    status: 'approved',
  },
  {
    id: 5,
    name: 'Ms. Leela Subramaniam',
    gender: 'Female',
    languages: ['Tamil', 'English', 'Hindi'],
    subjects: [
      { name: 'Primary English', level: 'Advanced' },
      { name: 'Primary Mathematics', level: 'Intermediate' },
      { name: 'Sec 3 English', level: 'Advanced' },
    ],
    qualifications: ['B.A. English', 'Teacher certification'],
    availability: ['afternoon', 'evening'],
    yearsExperience: 7,
    headshot:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    approved: false,
    status: 'pending',
  },
  {
    id: 6,
    name: 'Mr. Harish Menon',
    gender: 'Male',
    languages: ['Tamil', 'English', 'Malayalam'],
    subjects: [
      { name: 'Primary English', level: 'Advanced' },
      { name: 'Secondary English', level: 'Advanced' },
      { name: 'Sec 3 English', level: 'Intermediate' },
    ],
    qualifications: ['Degree in English', 'MOE tutor'],
    availability: ['morning', 'afternoon'],
    yearsExperience: 3,
    headshot:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    approved: false,
    status: 'pending',
  },
];

export const subjectOptions = [
  'Primary English',
  'Primary Mathematics',
  'Primary Science',
  'Secondary English',
  'Sec 3 English',
  'H1 English',
  'H2 English Literature',
  'Primary Mother Tongue (Tamil)',
  'Secondary Mathematics',
  'Additional Mathematics',
  'Biology',
  'Chemistry',
  'Physics',
  'Economics',
  'Geography',
  'History',
  'Literature in English',
];

export const languageOptions = [
  'English',
  'Chinese',
  'Malay',
  'Tamil',
  'Hindi',
  'Gujarati',
  'Punjabi',
  'Bengali',
  'Urdu',
  'Japanese',
  'French',
  'Spanish',
  'Arabic',
];

export const availabilityOptions = ['morning', 'afternoon', 'evening'];

export const defaultTeacherForm = {
  name: '',
  gender: 'Female',
  languages: ['Tamil'],
  subjects: ['Sec 3 English'],
  qualifications: 'Bachelor\'s degree or equivalent',
  availability: ['evening'],
  headshot:
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
  yearsExperience: 2,
};

export const defaultStudentRequest = {
  studentType: 'prospective',
  gender: 'Female',
  level: 'Secondary',
  subject: 'Sec 3 English',
  language: 'Tamil',
  availability: ['evening'],
  notes: 'Needs a female tutor comfortable speaking in Tamil to support Sec 3 English',
};
