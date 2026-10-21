export type UserRole = 'admin' | 'teacher' | 'student';

export type AccountStatus = 'active' | 'pending' | 'suspended';

export interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  role: UserRole;
  class_name?: string;
  account_status: AccountStatus;
  avatar_url?: string;
  created_at: string;
  updated_at?: string;
}

export type ContentStatus = 'draft' | 'published' | 'archived';

export interface Category {
  id: string;
  name: string;
  category_type: 'news' | 'event' | 'resource' | 'achievement';
  created_at?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  english_title?: string;
  slug: string;
  summary: string;
  content: string;
  category_id: string;
  category_name?: string;
  cover_image_path: string;
  gallery_image_paths?: string[];
  author_id: string;
  author_name?: string;
  status: ContentStatus;
  is_featured: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  start_at: string;
  end_at: string;
  category_id: string;
  category_name?: string;
  organizer_id: string;
  organizer_name?: string;
  registration_url?: string;
  status: ContentStatus;
  visibility: 'public' | 'student_only' | 'staff_only';
  cover_image_path?: string;
  gallery_image_paths?: string[];
  created_at: string;
  updated_at: string;
}

export type ResourceSubject =
  | 'Biology'
  | 'Chemistry'
  | 'Physics'
  | 'Mathematics'
  | 'Scientific Research'
  | 'STEM'
  | 'Worksheets'
  | 'Learning Documents'
  | 'Other Academic Resources';

export type ResourceType =
  | 'PDF'
  | 'Document'
  | 'Presentation'
  | 'Spreadsheet'
  | 'Link'
  | 'Video';

export type AccessLevel = 'public' | 'student' | 'teacher';

export interface LearningResource {
  id: string;
  title: string;
  description: string;
  subject: ResourceSubject;
  resource_type: ResourceType;
  file_path?: string;
  external_url?: string;
  access_level: AccessLevel;
  author_id: string;
  author_name?: string;
  file_size?: string;
  status: ContentStatus;
  downloads_count?: number;
  created_at: string;
  updated_at: string;
}

export type AchievementCategory =
  | 'Science competitions'
  | 'Mathematics competitions'
  | 'Science projects'
  | 'Research presentations'
  | 'Academic awards'
  | 'School activities';

export type AchievementStatus = 'draft' | 'pending_review' | 'published' | 'archived';

export interface Achievement {
  id: string;
  title: string;
  event_name: string;
  category: AchievementCategory;
  academic_year: string;
  achievement_date: string;
  description: string;
  result: string;
  student_names?: string; // privacy respected: only published approved names
  image_paths: string[];
  submitted_by: string;
  submitter_name?: string;
  status: AchievementStatus;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  actor_id: string;
  actor_name: string;
  actor_role: UserRole;
  action: string;
  entity_type: string;
  entity_id: string;
  details?: string;
  created_at: string;
}

export interface WebsiteSettings {
  program_name_th: string;
  program_name_en: string;
  school_name_th: string;
  school_name_en: string;
  vision_statement: string;
  contact_address: string;
  contact_phone: string;
  contact_email: string;
  facebook_url?: string;
  announcement_banner_active: boolean;
  announcement_banner_text?: string;
  // Seasonal / Periodic Admission Announcements (e.g. รับสมัคร, ตัวจริง-สำรอง, รายงานตัว)
  admission_active: boolean;
  admission_badge?: string;
  admission_title?: string;
  admission_desc?: string;
  admission_link_label?: string;
  admission_link_url?: string;
  admission_pdf_url?: string;
}
