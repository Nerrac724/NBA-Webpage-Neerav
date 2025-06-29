import React, { useState } from 'react';
import { Download, Award, Calendar, Users } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface DocumentFile {
  name: string;
  url: string;
}

interface ProgramItem {
  id: string;
  name: string;
  accreditationStatus: 'Accredited' | 'Under Review' | 'Preparing';
  validityPeriod: string;
  lastAccredited: string;
  studentStrength: number;
  documents: DocumentFile[];
}

interface ProgramCategory {
  title: string;
  description: string;
  programs: ProgramItem[];
}

const programsData: Record<string, ProgramCategory> = {
  'ug-programs': {
    title: 'Undergraduate Programs',
    description: 'Bachelor of Engineering programs accredited by NBA',
    programs: [
      {
        id: 'computer-engineering',
        name: 'Computer Engineering (CE)',
        accreditationStatus: 'Accredited',
        validityPeriod: '2021-2027',
        lastAccredited: '2021',
        studentStrength: 240,
        documents: [
          { name: 'Self Assessment Report.pdf', url: '/nba/computer/sar.pdf' },
          { name: 'NBA Certificate.pdf', url: '/nba/computer/certificate.pdf' },
          { name: 'Program Outcomes.pdf', url: '/nba/computer/outcomes.pdf' },
          { name: 'Curriculum Details.pdf', url: '/nba/computer/curriculum.pdf' },
          { name: 'Faculty Profiles.pdf', url: '/nba/computer/faculty.pdf' },
          { name: 'Lab Infrastructure.pdf', url: '/nba/computer/labs.pdf' }
        ]
      },
      {
        id: 'computer-science-engineering',
        name: 'Computer Science and Engineering (CSE)',
        accreditationStatus: 'Accredited',
        validityPeriod: '2022-2028',
        lastAccredited: '2022',
        studentStrength: 180,
        documents: [
          { name: 'Self Assessment Report.pdf', url: '/nba/cse/sar.pdf' },
          { name: 'NBA Certificate.pdf', url: '/nba/cse/certificate.pdf' },
          { name: 'Program Outcomes.pdf', url: '/nba/cse/outcomes.pdf' },
          { name: 'Industry Collaboration.pdf', url: '/nba/cse/industry.pdf' },
          { name: 'Research Activities.pdf', url: '/nba/cse/research.pdf' },
          { name: 'Student Projects.pdf', url: '/nba/cse/projects.pdf' }
        ]
      },
      {
        id: 'electronics-telecom',
        name: 'Electronics & Telecommunications (EXTC)',
        accreditationStatus: 'Accredited',
        validityPeriod: '2020-2026',
        lastAccredited: '2020',
        studentStrength: 120,
        documents: [
          { name: 'Self Assessment Report.pdf', url: '/nba/extc/sar.pdf' },
          { name: 'NBA Certificate.pdf', url: '/nba/extc/certificate.pdf' },
          { name: 'Lab Infrastructure.pdf', url: '/nba/extc/labs.pdf' },
          { name: 'Faculty Profiles.pdf', url: '/nba/extc/faculty.pdf' },
          { name: 'Industry Partnerships.pdf', url: '/nba/extc/partnerships.pdf' },
          { name: 'Communication Systems Lab.pdf', url: '/nba/extc/comm-lab.pdf' }
        ]
      }
    ]
  },
  'pg-programs': {
    title: 'Postgraduate Programs',
    description: 'Master of Technology and Master of Computer Applications programs accredited by NBA',
    programs: [
      {
        id: 'mtech-computer',
        name: 'M.Tech Computer Engineering',
        accreditationStatus: 'Accredited',
        validityPeriod: '2023-2029',
        lastAccredited: '2023',
        studentStrength: 36,
        documents: [
          { name: 'Self Assessment Report.pdf', url: '/nba/mtech-comp/sar.pdf' },
          { name: 'NBA Certificate.pdf', url: '/nba/mtech-comp/certificate.pdf' },
          { name: 'Research Publications.pdf', url: '/nba/mtech-comp/publications.pdf' },
          { name: 'Thesis Guidelines.pdf', url: '/nba/mtech-comp/thesis.pdf' },
          { name: 'Advanced Lab Facilities.pdf', url: '/nba/mtech-comp/advanced-labs.pdf' },
          { name: 'Industry Collaboration.pdf', url: '/nba/mtech-comp/industry.pdf' }
        ]
      },
      {
        id: 'mca',
        name: 'Master of Computer Applications (MCA)',
        accreditationStatus: 'Accredited',
        validityPeriod: '2023-2029',
        lastAccredited: '2023',
        studentStrength: 60,
        documents: [
          { name: 'Self Assessment Report.pdf', url: '/nba/mca/sar.pdf' },
          { name: 'NBA Certificate.pdf', url: '/nba/mca/certificate.pdf' },
          { name: 'Program Curriculum.pdf', url: '/nba/mca/curriculum.pdf' },
          { name: 'Software Development Labs.pdf', url: '/nba/mca/software-labs.pdf' },
          { name: 'Industry Training Programs.pdf', url: '/nba/mca/training.pdf' },
          { name: 'Placement Records.pdf', url: '/nba/mca/placements.pdf' }
        ]
      }
    ]
  },
  'institutional': {
    title: 'Institutional Documents',
    description: 'General NBA accreditation documents and institutional policies',
    programs: [
      {
        id: 'institutional-sar',
        name: 'Institutional Self Assessment',
        accreditationStatus: 'Accredited',
        validityPeriod: 'Ongoing',
        lastAccredited: '2023',
        studentStrength: 0,
        documents: [
          { name: 'Institutional SAR.pdf', url: '/nba/institutional/sar.pdf' },
          { name: 'NBA Manual.pdf', url: '/nba/institutional/manual.pdf' },
          { name: 'Quality Assurance.pdf', url: '/nba/institutional/qa.pdf' },
          { name: 'Continuous Improvement.pdf', url: '/nba/institutional/improvement.pdf' },
          { name: 'Accreditation Timeline.pdf', url: '/nba/institutional/timeline.pdf' },
          { name: 'Institutional Policies.pdf', url: '/nba/institutional/policies.pdf' }
        ]
      },
      {
        id: 'assessment-reports',
        name: 'Assessment & Review Reports',
        accreditationStatus: 'Accredited',
        validityPeriod: 'Annual',
        lastAccredited: '2023',
        studentStrength: 0,
        documents: [
          { name: 'Annual Assessment Report.pdf', url: '/nba/assessment/annual.pdf' },
          { name: 'Peer Review Report.pdf', url: '/nba/assessment/peer-review.pdf' },
          { name: 'External Evaluation.pdf', url: '/nba/assessment/external.pdf' },
          { name: 'Action Taken Report.pdf', url: '/nba/assessment/action-taken.pdf' },
          { name: 'Quality Enhancement Report.pdf', url: '/nba/assessment/quality-enhancement.pdf' },
          { name: 'Compliance Report.pdf', url: '/nba/assessment/compliance.pdf' }
        ]
      }
    ]
  }
};

export const ProgramsPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ug-programs');
  const [expandedPrograms, setExpandedPrograms] = useState<Set<string>>(new Set());
  const [ref, isVisible] = useIntersectionObserver();

  const tabs = [
    { id: 'ug-programs', label: 'UG Programs' },
    { id: 'pg-programs', label: 'PG Programs' },
    { id: 'institutional', label: 'Institutional' }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setExpandedPrograms(new Set());
  };

  const toggleProgramExpansion = (programId: string) => {
    const newExpanded = new Set(expandedPrograms);
    if (newExpanded.has(programId)) {
      newExpanded.delete(programId);
    } else {
      newExpanded.add(programId);
    }
    setExpandedPrograms(newExpanded);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accredited':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Preparing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <section 
      ref={ref}
      className={`py-16 lg:py-24 bg-white dark:bg-dark-900 transition-all duration-700 ${
        isVisible ? 'animate-fade-in' : 'opacity-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 delay-200 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            NBA Accredited Programs
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            National Board of Accreditation certified engineering programs ensuring quality education and industry readiness
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={`mb-8 transition-all duration-700 delay-400 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
        }`}>
          <div 
            className="flex flex-wrap justify-center gap-2 bg-gray-100 dark:bg-dark-800 p-2 rounded-xl"
            role="tablist"
            aria-label="NBA Programs Navigation"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, () => handleTabClick(tab.id))}
                className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-800 ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-dark-700 hover:shadow-md'
                }`}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                tabIndex={activeTab === tab.id ? 0 : -1}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Panels */}
        <div className={`transition-all duration-700 delay-600 ${
          isVisible ? 'animate-fade-in' : 'opacity-0'
        }`}>
          {Object.entries(programsData).map(([categoryId, category]) => (
            <div
              key={categoryId}
              id={`panel-${categoryId}`}
              className={`${activeTab === categoryId ? 'block' : 'hidden'}`}
              role="tabpanel"
              aria-labelledby={`tab-${categoryId}`}
            >
              <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl border border-gray-200 dark:border-dark-700 overflow-hidden">
                {/* Panel Header */}
                <div className="bg-gradient-to-r from-primary-600 to-accent-teal p-6">
                  <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-primary-100 text-lg">
                    {category.description}
                  </p>
                </div>

                {/* Panel Content */}
                <div className="p-6">
                  <div className="space-y-6">
                    {category.programs.map((program, index) => (
                      <div
                        key={program.id}
                        className={`group border border-gray-200 dark:border-dark-600 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 animate-scale-in`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {/* Program Header */}
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-dark-700 dark:to-dark-600 p-6">
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="font-playfair text-xl font-bold text-gray-900 dark:text-white mb-2">
                                {program.name}
                              </h4>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                                <div className="flex items-center gap-2">
                                  <Award className="w-4 h-4" />
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(program.accreditationStatus)}`}>
                                    {program.accreditationStatus}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  <span>Valid: {program.validityPeriod}</span>
                                </div>
                                {program.studentStrength > 0 && (
                                  <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    <span>{program.studentStrength} Students</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={() => toggleProgramExpansion(program.id)}
                              onKeyDown={(e) => handleKeyDown(e, () => toggleProgramExpansion(program.id))}
                              className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-700"
                              aria-expanded={expandedPrograms.has(program.id)}
                              aria-controls={`content-${program.id}`}
                            >
                              <span className="font-medium">View Documents</span>
                              <div className={`w-5 h-5 transition-transform duration-300 ${
                                expandedPrograms.has(program.id) ? 'rotate-45' : ''
                              }`}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </div>
                            </button>
                          </div>
                        </div>

                        {/* Program Documents */}
                        <div
                          id={`content-${program.id}`}
                          className={`bg-white dark:bg-dark-800 transition-all duration-300 overflow-hidden ${
                            expandedPrograms.has(program.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className="p-6 border-t border-gray-200 dark:border-dark-600">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {program.documents.map((doc, docIndex) => (
                                <a
                                  key={docIndex}
                                  href={doc.url}
                                  download
                                  className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-50 to-accent-teal/10 dark:from-dark-600 dark:to-dark-500 rounded-lg hover:from-primary-100 hover:to-accent-teal/20 dark:hover:from-dark-500 dark:hover:to-dark-400 transition-all duration-300 group border border-primary-200 dark:border-dark-500 hover:border-primary-300 dark:hover:border-dark-400 hover:shadow-md"
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-primary-600 text-white rounded-lg group-hover:bg-primary-700 transition-colors duration-300">
                                      <Download className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-gray-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-accent-teal transition-colors duration-300">
                                      {doc.name}
                                    </span>
                                  </div>
                                  <div className="text-primary-600 dark:text-accent-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Download className="w-4 h-4" />
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className={`mt-12 text-center transition-all duration-700 delay-800 ${
          isVisible ? 'animate-fade-in' : 'opacity-0'
        }`}>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/nba-complete-documentation.pdf"
              download
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-teal text-white font-semibold rounded-lg hover:from-primary-700 hover:to-accent-teal/90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Complete NBA Documentation
            </a>
            <a
              href="/nba-manual.pdf"
              download
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent-gold to-accent-gold/80 text-dark-900 font-semibold rounded-lg hover:from-accent-gold/90 hover:to-accent-gold/70 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              NBA Manual & Guidelines
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};