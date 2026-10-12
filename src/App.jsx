import { useMemo, useState } from 'react';
import {
  availabilityOptions,
  defaultStudentRequest,
  defaultTeacherForm,
  initialTeachers,
  languageOptions,
  subjectOptions,
} from './data/mockData';

const navItems = ['Teacher Application', 'Student Request', 'Teacher Repository', 'Admin'];

function App() {
  const [activeTab, setActiveTab] = useState('Teacher Application');
  const [teachers, setTeachers] = useState(initialTeachers);
  const [teacherForm, setTeacherForm] = useState(defaultTeacherForm);
  const [studentRequest, setStudentRequest] = useState(defaultStudentRequest);
  const [matchResult, setMatchResult] = useState([]);

  const approvedTeachers = useMemo(
    () => teachers.filter((teacher) => teacher.approved),
    [teachers],
  );

  const pendingTeachers = useMemo(
    () => teachers.filter((teacher) => !teacher.approved),
    [teachers],
  );

  const handleTeacherFieldChange = (field, value) => {
    setTeacherForm((current) => ({ ...current, [field]: value }));
  };

  const handleTeacherSubmit = (event) => {
    event.preventDefault();
    const newTeacher = {
      id: Date.now(),
      name: teacherForm.name || 'New Teacher',
      gender: teacherForm.gender,
      languages: teacherForm.languages,
      subjects: teacherForm.subjects.map((subject) => ({ name: subject, level: 'Intermediate' })),
      qualifications: [teacherForm.qualifications],
      availability: teacherForm.availability,
      yearsExperience: Number(teacherForm.yearsExperience) || 1,
      headshot: teacherForm.headshot,
      approved: false,
      status: 'pending',
    };

    setTeachers((current) => [newTeacher, ...current]);
    setTeacherForm(defaultTeacherForm);
    setActiveTab('Admin');
  };

  const handleApproveTeacher = (teacherId) => {
    setTeachers((current) =>
      current.map((teacher) =>
        teacher.id === teacherId
          ? { ...teacher, approved: true, status: 'approved' }
          : teacher,
      ),
    );
  };

  const matchTeachers = () => {
    const requiredLanguages = Array.isArray(studentRequest.language)
      ? studentRequest.language
      : [studentRequest.language];

    const requiredAvailability = Array.isArray(studentRequest.availability)
      ? studentRequest.availability
      : [studentRequest.availability];

    const filtered = approvedTeachers
      .filter((teacher) => {
        const hardFilters = [];

        if (studentRequest.gender) {
          hardFilters.push(teacher.gender === studentRequest.gender);
        }

        const teacherLanguages = teacher.languages || [];
        const languageMatch = requiredLanguages.every((requiredLanguage) =>
          teacherLanguages.includes(requiredLanguage),
        );
        hardFilters.push(languageMatch);

        const teacherSubjects = teacher.subjects.map((subject) => subject.name);
        const subjectMatch = teacherSubjects.includes(studentRequest.subject);
        hardFilters.push(subjectMatch);

        const availabilityOverlap = requiredAvailability.some((slot) =>
          teacher.availability.includes(slot),
        );
        hardFilters.push(availabilityOverlap);

        return hardFilters.every(Boolean);
      })
      .map((teacher) => {
        let score = 0;

        if (teacher.gender === studentRequest.gender) score += 25;

        score += (teacher.yearsExperience || 0) * 3;

        const teacherLanguages = teacher.languages || [];
        const languageScore = requiredLanguages.reduce((sum, lang) => {
          return sum + (teacherLanguages.includes(lang) ? 10 : 0);
        }, 0);
        score += languageScore;

        const subjectMatch = teacher.subjects.some((item) => item.name === studentRequest.subject);
        if (subjectMatch) score += 30;

        const overlapCount = requiredAvailability.filter((slot) =>
          teacher.availability.includes(slot),
        ).length;
        score += overlapCount * 10;

        const qualificationBoost = teacher.qualifications?.length
          ? Math.min(teacher.qualifications.length * 5, 15)
          : 0;
        score += qualificationBoost;

        return {
          ...teacher,
          score,
          reasons: [
            teacher.gender === studentRequest.gender ? 'Gender matches requirement' : '',
            languageScore > 0 ? 'Required language match' : '',
            subjectMatch ? 'Subject match' : '',
            overlapCount > 0 ? 'Availability matches request' : '',
            qualificationBoost > 0 ? 'Relevant qualifications present' : '',
          ].filter(Boolean),
        };
      })
      .sort((a, b) => b.score - a.score);

    setMatchResult(filtered);
    setActiveTab('Student Request');
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <div className="eyebrow">MasterHand Learning</div>
          <h1>Temporary Teacher Matching MVP</h1>
        </div>
        <div className="status-pill">Prototype</div>
      </header>

      <nav className="nav-tabs">
        {navItems.map((tab) => (
          <button
            key={tab}
            className={tab === activeTab ? 'nav-tab active' : 'nav-tab'}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {activeTab === 'Teacher Application' && (
        <section className="panel-grid two-column">
          <div className="panel">
            <h2>Teacher Application</h2>
            <form onSubmit={handleTeacherSubmit} className="form-stack">
              <label>
                Full name
                <input
                  value={teacherForm.name}
                  onChange={(e) => handleTeacherFieldChange('name', e.target.value)}
                  placeholder="e.g. Ms. Anitha Kumar"
                />
              </label>

              <label>
                Gender
                <select
                  value={teacherForm.gender}
                  onChange={(e) => handleTeacherFieldChange('gender', e.target.value)}
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Any">Any</option>
                </select>
              </label>

              <label>
                Languages spoken
                <select
                  multiple
                  value={teacherForm.languages}
                  onChange={(e) =>
                    handleTeacherFieldChange(
                      'languages',
                      [...e.target.selectedOptions].map((option) => option.value),
                    )
                  }
                >
                  {languageOptions.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Subjects able to teach
                <select
                  multiple
                  value={teacherForm.subjects}
                  onChange={(e) =>
                    handleTeacherFieldChange(
                      'subjects',
                      [...e.target.selectedOptions].map((option) => option.value),
                    )
                  }
                >
                  {subjectOptions.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Qualifications
                <input
                  value={teacherForm.qualifications}
                  onChange={(e) =>
                    handleTeacherFieldChange('qualifications', e.target.value)
                  }
                  placeholder="e.g. B.A. English, Teaching Certificate"
                />
              </label>

              <label>
                Years of experience
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={teacherForm.yearsExperience}
                  onChange={(e) =>
                    handleTeacherFieldChange('yearsExperience', e.target.value)
                  }
                />
              </label>

              <label>
                Availability
                <select
                  multiple
                  value={teacherForm.availability}
                  onChange={(e) =>
                    handleTeacherFieldChange(
                      'availability',
                      [...e.target.selectedOptions].map((option) => option.value),
                    )
                  }
                >
                  {availabilityOptions.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Headshot URL
                <input
                  value={teacherForm.headshot}
                  onChange={(e) => handleTeacherFieldChange('headshot', e.target.value)}
                  placeholder="https://..."
                />
              </label>

              <button type="submit" className="primary-button">
                Submit teacher profile
              </button>
            </form>
          </div>

          <div className="panel">
            <h2>Submission summary</h2>
            <div className="mini-card">
              <h3>Profile snapshot</h3>
              <ul>
                <li><strong>Name:</strong> {teacherForm.name || 'Not entered yet'}</li>
                <li><strong>Gender:</strong> {teacherForm.gender}</li>
                <li><strong>Languages:</strong> {teacherForm.languages.join(', ') || 'None'}</li>
                <li><strong>Subjects:</strong> {teacherForm.subjects.join(', ') || 'None'}</li>
                <li><strong>Availability:</strong> {teacherForm.availability.join(', ') || 'None'}</li>
                <li><strong>Qualifications:</strong> {teacherForm.qualifications || 'None'}</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'Student Request' && (
        <section className="panel-grid two-column">
          <div className="panel">
            <h2>Student Request</h2>
            <div className="form-stack">
              <label>
                Student type
                <select
                  value={studentRequest.studentType}
                  onChange={(e) =>
                    setStudentRequest((current) => ({
                      ...current,
                      studentType: e.target.value,
                    }))
                  }
                >
                  <option value="prospective">Prospective student</option>
                  <option value="existing">Existing student</option>
                </select>
              </label>

              <label>
                Required gender
                <select
                  value={studentRequest.gender}
                  onChange={(e) =>
                    setStudentRequest((current) => ({
                      ...current,
                      gender: e.target.value,
                    }))
                  }
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Any">No preference</option>
                </select>
              </label>

              <label>
                Level
                <select
                  value={studentRequest.level}
                  onChange={(e) =>
                    setStudentRequest((current) => ({
                      ...current,
                      level: e.target.value,
                    }))
                  }
                >
                  <option value="Primary">Primary</option>
                  <option value="Secondary">Secondary</option>
                  <option value="Junior College">Junior College</option>
                </select>
              </label>

              <label>
                Subject required
                <select
                  value={studentRequest.subject}
                  onChange={(e) =>
                    setStudentRequest((current) => ({
                      ...current,
                      subject: e.target.value,
                    }))
                  }
                >
                  {subjectOptions.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Mandatory language
                <select
                  value={studentRequest.language}
                  onChange={(e) =>
                    setStudentRequest((current) => ({
                      ...current,
                      language: e.target.value,
                    }))
                  }
                >
                  {languageOptions.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Preferred availability
                <select
                  multiple
                  value={studentRequest.availability}
                  onChange={(e) =>
                    setStudentRequest((current) => ({
                      ...current,
                      availability: [...e.target.selectedOptions].map((option) => option.value),
                    }))
                  }
                >
                  {availabilityOptions.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Notes
                <textarea
                  value={studentRequest.notes}
                  onChange={(e) =>
                    setStudentRequest((current) => ({
                      ...current,
                      notes: e.target.value,
                    }))
                  }
                  rows="4"
                />
              </label>

              <button type="button" className="primary-button" onClick={matchTeachers}>
                Match teachers
              </button>
            </div>
          </div>

          <div className="panel">
            <h2>Matching results</h2>
            {matchResult.length === 0 ? (
              <div className="empty-state">
                <p>No matches yet. Press “Match teachers” to test the algorithm.</p>
              </div>
            ) : (
              <div className="results-list">
                {matchResult.map((teacher) => (
                  <div key={teacher.id} className="match-card">
                    <div className="teacher-head">
                      <img src={teacher.headshot} alt={teacher.name} />
                      <div>
                        <h3>{teacher.name}</h3>
                        <p>{teacher.gender} • {teacher.yearsExperience} years</p>
                      </div>
                    </div>

                    <div className="score-row">
                      <span>Match score</span>
                      <strong>{teacher.score}/100</strong>
                    </div>

                    <ul>
                      {teacher.reasons.map((reason) => (
                        <li key={reason}>{reason}</li>
                      ))}
                    </ul>

                    <div className="chip-row">
                      {teacher.languages.map((language) => (
                        <span key={language} className="chip">{language}</span>
                      ))}
                    </div>
                    <button className="secondary-button">Send match request</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {activeTab === 'Teacher Repository' && (
        <section className="panel">
          <h2>Approved teacher repository</h2>
          <div className="teacher-grid">
            {approvedTeachers.map((teacher) => (
              <div key={teacher.id} className="teacher-card">
                <img src={teacher.headshot} alt={teacher.name} />
                <div className="teacher-text">
                  <h3>{teacher.name}</h3>
                  <p>{teacher.gender}</p>
                  <p>{teacher.languages.join(', ')}</p>
                  <p>{teacher.qualifications.join(', ')}</p>
                  <div className="chip-row">
                    {teacher.subjects.map((subject) => (
                      <span key={`${teacher.id}-${subject.name}`} className="chip">
                        {subject.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'Admin' && (
        <section className="panel">
          <h2>Teacher approval queue</h2>
          {pendingTeachers.length === 0 ? (
            <div className="empty-state">
              <p>No pending teacher applications.</p>
            </div>
          ) : (
            <div className="approval-list">
              {pendingTeachers.map((teacher) => (
                <div key={teacher.id} className="approval-card">
                  <div className="teacher-head">
                    <img src={teacher.headshot} alt={teacher.name} />
                    <div>
                      <h3>{teacher.name}</h3>
                      <p>{teacher.gender}</p>
                    </div>
                  </div>

                  <ul>
                    <li><strong>Languages:</strong> {teacher.languages.join(', ')}</li>
                    <li><strong>Subjects:</strong> {teacher.subjects.map((subject) => subject.name).join(', ')}</li>
                    <li><strong>Qualifications:</strong> {teacher.qualifications.join(', ')}</li>
                    <li><strong>Availability:</strong> {teacher.availability.join(', ')}</li>
                  </ul>

                  <button
                    className="primary-button"
                    onClick={() => handleApproveTeacher(teacher.id)}
                  >
                    Approve teacher
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default App;
