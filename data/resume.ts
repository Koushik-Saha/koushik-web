import resumeData from './resume.json';

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  summary?: string;
  highlights: string[];
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  metrics: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface PublicationItem {
  id: string;
  title: string;
  journal: string;
  year: string;
  status: 'Published' | 'Accepted' | 'Under Review';
  doi?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  gpa?: string;
}

export interface LeadershipItem {
  id: string;
  title: string;
  description: string;
}

export const RESUME_DATA = {
  ...resumeData,
  experience: resumeData.experience as ExperienceItem[],
  projects: resumeData.projects as ProjectItem[],
  publications: resumeData.publications as PublicationItem[],
  education: resumeData.education as EducationItem[],
  leadership: resumeData.leadership as LeadershipItem[]
};
