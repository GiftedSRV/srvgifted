import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  NewsArticle, CalendarEvent, LearningResource, Achievement, 
  Category, UserProfile, AuditLog, WebsiteSettings, ContentStatus, AchievementStatus 
} from '@/types';
import { 
  INITIAL_NEWS, INITIAL_EVENTS, INITIAL_RESOURCES, 
  INITIAL_ACHIEVEMENTS, INITIAL_CATEGORIES 
} from '@/data/mockData';
import { BRAND } from '@/constants/brand';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useAuth } from './AuthContext';

interface DataContextType {
  // News
  news: NewsArticle[];
  publishedNews: NewsArticle[];
  featuredNews: NewsArticle[];
  addNews: (article: Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'>) => Promise<NewsArticle>;
  updateNews: (id: string, article: Partial<NewsArticle>) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;
  getNewsBySlug: (slug: string) => NewsArticle | undefined;

  // Events
  events: CalendarEvent[];
  publishedEvents: CalendarEvent[];
  upcomingEvents: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, 'id' | 'created_at' | 'updated_at'>) => Promise<CalendarEvent>;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;

  // Resources
  resources: LearningResource[];
  publishedResources: LearningResource[];
  addResource: (res: Omit<LearningResource, 'id' | 'created_at' | 'updated_at'>) => Promise<LearningResource>;
  updateResource: (id: string, res: Partial<LearningResource>) => Promise<void>;
  deleteResource: (id: string) => Promise<void>;
  incrementDownload: (id: string) => Promise<void>;

  // Achievements
  achievements: Achievement[];
  publishedAchievements: Achievement[];
  addAchievement: (ach: Omit<Achievement, 'id' | 'created_at' | 'updated_at'>) => Promise<Achievement>;
  updateAchievement: (id: string, ach: Partial<Achievement>) => Promise<void>;
  deleteAchievement: (id: string) => Promise<void>;

  // Categories
  categories: Category[];

  // Users
  users: UserProfile[];
  updateUserRole: (id: string, role: UserProfile['role']) => Promise<void>;
  updateUserStatus: (id: string, status: UserProfile['account_status']) => Promise<void>;

  // Audit Logs
  auditLogs: AuditLog[];
  logAction: (action: string, entity_type: string, entity_id: string, details?: string) => Promise<void>;

  // Settings
  settings: WebsiteSettings;
  updateSettings: (newSettings: Partial<WebsiteSettings>) => Promise<void>;

  // Status
  isLoading: boolean;
  refreshData: () => Promise<void>;
}

const DEFAULT_SETTINGS: WebsiteSettings = {
  program_name_th: BRAND.PROGRAM_NAME_TH,
  program_name_en: BRAND.PROGRAM_FULL_EN,
  school_name_th: BRAND.SCHOOL_NAME_TH,
  school_name_en: BRAND.SCHOOL_NAME_EN,
  vision_statement: BRAND.SUPPORTING_STATEMENT,
  contact_address: BRAND.CONTACT.ADDRESS_TH,
  contact_phone: BRAND.CONTACT.PHONE,
  contact_email: 'gifted@srv.ac.th',
  facebook_url: BRAND.CONTACT.FACEBOOK,
  announcement_banner_active: false,
  announcement_banner_text: '',
  // Seasonal admission notice
  admission_active: true,
  admission_badge: 'ประกาศผลการคัดเลือก',
  admission_title: 'ประกาศรายชื่อผู้ผ่านการคัดเลือกเข้าศึกษาต่อ (ตัวจริง และ ตัวสำรอง) ชั้นมัธยมศึกษาปีที่ 1',
  admission_desc: 'ขอให้นักเรียนที่มีรายชื่อตัวจริงมารายงานตัวและมอบตัวตามกำหนดการ หากสละสิทธิ์จะเรียกตัวสำรองตามลำดับ',
  admission_link_label: 'ตรวจสอบรายชื่อตัวจริงและตัวสำรอง',
  admission_link_url: '#admission-detail',
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile } = useAuth();
  const [news, setNews] = useState<NewsArticle[]>(() => {
    const saved = localStorage.getItem('gifted_news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem('gifted_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });
  const [resources, setResources] = useState<LearningResource[]>(() => {
    const saved = localStorage.getItem('gifted_resources');
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('gifted_achievements');
    return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
  });
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('gifted_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });
  const [users, setUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('gifted_users');
    return saved ? JSON.parse(saved) : [];
  });
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('gifted_audit_logs');
    return saved ? JSON.parse(saved) : [
      {
        id: 'log-1',
        actor_id: 'demo-admin-1',
        actor_name: 'ครูสมเกียรติ พัฒนกิจ',
        actor_role: 'admin',
        action: 'INITIALIZE_SYSTEM',
        entity_type: 'SYSTEM',
        entity_id: 'sys-0',
        details: 'เริ่มต้นระบบเว็บไซต์ทางการโครงการ GIFTED สารวิทยา',
        created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      }
    ];
  });
  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    const saved = localStorage.getItem('gifted_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('gifted_news', JSON.stringify(news));
  }, [news]);
  useEffect(() => {
    localStorage.setItem('gifted_events', JSON.stringify(events));
  }, [events]);
  useEffect(() => {
    localStorage.setItem('gifted_resources', JSON.stringify(resources));
  }, [resources]);
  useEffect(() => {
    localStorage.setItem('gifted_achievements', JSON.stringify(achievements));
  }, [achievements]);
  useEffect(() => {
    localStorage.setItem('gifted_categories', JSON.stringify(categories));
  }, [categories]);
  useEffect(() => {
    localStorage.setItem('gifted_users', JSON.stringify(users));
  }, [users]);
  useEffect(() => {
    localStorage.setItem('gifted_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);
  useEffect(() => {
    localStorage.setItem('gifted_settings', JSON.stringify(settings));
  }, [settings]);

  // If Supabase is connected, try to fetch real data
  const refreshData = async () => {
    if (!isSupabaseConfigured()) return;
    setIsLoading(true);
    try {
      const [newsRes, eventsRes, resRes, achRes, catRes, profilesRes] = await Promise.all([
        supabase.from('news_articles').select('*').order('created_at', { ascending: false }),
        supabase.from('events').select('*').order('start_at', { ascending: true }),
        supabase.from('learning_resources').select('*').order('created_at', { ascending: false }),
        supabase.from('achievements').select('*').order('achievement_date', { ascending: false }),
        supabase.from('categories').select('*'),
        supabase.from('profiles').select('*').order('created_at', { ascending: true }),
      ]);

      if (newsRes.data && newsRes.data.length > 0) setNews(newsRes.data);
      if (eventsRes.data && eventsRes.data.length > 0) setEvents(eventsRes.data);
      if (resRes.data && resRes.data.length > 0) setResources(resRes.data);
      if (achRes.data && achRes.data.length > 0) setAchievements(achRes.data);
      if (catRes.data && catRes.data.length > 0) setCategories(catRes.data);
      if (profilesRes.data && profilesRes.data.length > 0) setUsers(profilesRes.data);
    } catch (err) {
      console.warn('Supabase fetch note:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Filtered public getters
  const publishedNews = news.filter((n) => n.status === 'published');
  const featuredNews = publishedNews.filter((n) => n.is_featured);
  const publishedEvents = events.filter((e) => e.status === 'published');
  
  // Upcoming events sorted chronologically
  const upcomingEvents = publishedEvents
    .filter((e) => new Date(e.start_at).getTime() >= new Date().setHours(0,0,0,0) - 86400000 * 30) // recent & future
    .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime());

  const publishedResources = resources.filter((r) => r.status === 'published');
  const publishedAchievements = achievements.filter((a) => a.status === 'published');

  const getNewsBySlug = (slug: string) => {
    return news.find((n) => n.slug === slug);
  };

  // Audit Log Helper
  const logAction = async (action: string, entity_type: string, entity_id: string, details?: string) => {
    const newLog: AuditLog = {
      id: 'log-' + Date.now(),
      actor_id: profile?.id || 'anonymous',
      actor_name: profile?.display_name || 'Guest / System',
      actor_role: profile?.role || 'student',
      action,
      entity_type,
      entity_id,
      details,
      created_at: new Date().toISOString(),
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    if (isSupabaseConfigured() && profile) {
      try {
        await supabase.from('audit_logs').insert([{
          actor_id: profile.id,
          action,
          entity_type,
          entity_id,
          details,
        }]);
      } catch (err) {
        console.warn('Failed to write Supabase audit log:', err);
      }
    }
  };

  // News CRUD
  const addNews = async (articleData: Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'>) => {
    const id = 'news-' + Date.now();
    const now = new Date().toISOString();
    const newArticle: NewsArticle = {
      ...articleData,
      id,
      created_at: now,
      updated_at: now,
    };
    setNews((prev) => [newArticle, ...prev]);
    await logAction('CREATE_NEWS', 'news_articles', id, `สร้างข่าว: ${articleData.title}`);

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('news_articles').insert([newArticle]);
      } catch (err) {
        console.warn('Supabase sync note:', err);
      }
    }
    return newArticle;
  };

  const updateNews = async (id: string, articleData: Partial<NewsArticle>) => {
    const now = new Date().toISOString();
    setNews((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...articleData, updated_at: now } : item))
    );
    await logAction('UPDATE_NEWS', 'news_articles', id, `แก้ไขข่าว ID ${id}`);

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('news_articles').update({ ...articleData, updated_at: now }).eq('id', id);
      } catch (err) {
        console.warn('Supabase sync note:', err);
      }
    }
  };

  const deleteNews = async (id: string) => {
    setNews((prev) => prev.filter((item) => item.id !== id));
    await logAction('DELETE_NEWS', 'news_articles', id, `ลบข่าว ID ${id}`);

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('news_articles').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase sync note:', err);
      }
    }
  };

  // Events CRUD
  const addEvent = async (eventData: Omit<CalendarEvent, 'id' | 'created_at' | 'updated_at'>) => {
    const id = 'evt-' + Date.now();
    const now = new Date().toISOString();
    const newEvent: CalendarEvent = {
      ...eventData,
      id,
      created_at: now,
      updated_at: now,
    };
    setEvents((prev) => [...prev, newEvent]);
    await logAction('CREATE_EVENT', 'events', id, `สร้างกิจกรรม: ${eventData.title}`);

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('events').insert([newEvent]);
      } catch (err) {
        console.warn('Supabase sync note:', err);
      }
    }
    return newEvent;
  };

  const updateEvent = async (id: string, eventData: Partial<CalendarEvent>) => {
    const now = new Date().toISOString();
    setEvents((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...eventData, updated_at: now } : item))
    );
    await logAction('UPDATE_EVENT', 'events', id, `แก้ไขกิจกรรม ID ${id}`);

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('events').update({ ...eventData, updated_at: now }).eq('id', id);
      } catch (err) {
        console.warn('Supabase sync note:', err);
      }
    }
  };

  const deleteEvent = async (id: string) => {
    setEvents((prev) => prev.filter((item) => item.id !== id));
    await logAction('DELETE_EVENT', 'events', id, `ลบกิจกรรม ID ${id}`);

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('events').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase sync note:', err);
      }
    }
  };

  // Resources CRUD
  const addResource = async (resData: Omit<LearningResource, 'id' | 'created_at' | 'updated_at'>) => {
    const id = 'res-' + Date.now();
    const now = new Date().toISOString();
    const newRes: LearningResource = {
      ...resData,
      id,
      downloads_count: 0,
      created_at: now,
      updated_at: now,
    };
    setResources((prev) => [newRes, ...prev]);
    await logAction('CREATE_RESOURCE', 'learning_resources', id, `อัปโหลดคลังความรู้: ${resData.title}`);

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('learning_resources').insert([newRes]);
      } catch (err) {
        console.warn('Supabase sync note:', err);
      }
    }
    return newRes;
  };

  const updateResource = async (id: string, resData: Partial<LearningResource>) => {
    const now = new Date().toISOString();
    setResources((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...resData, updated_at: now } : item))
    );
    await logAction('UPDATE_RESOURCE', 'learning_resources', id, `แก้ไขทรัพยากร ID ${id}`);

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('learning_resources').update({ ...resData, updated_at: now }).eq('id', id);
      } catch (err) {
        console.warn('Supabase sync note:', err);
      }
    }
  };

  const deleteResource = async (id: string) => {
    setResources((prev) => prev.filter((item) => item.id !== id));
    await logAction('DELETE_RESOURCE', 'learning_resources', id, `ลบทรัพยากร ID ${id}`);

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('learning_resources').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase sync note:', err);
      }
    }
  };

  const incrementDownload = async (id: string) => {
    setResources((prev) =>
      prev.map((item) => (item.id === id ? { ...item, downloads_count: (item.downloads_count || 0) + 1 } : item))
    );
  };

  // Achievements CRUD
  const addAchievement = async (achData: Omit<Achievement, 'id' | 'created_at' | 'updated_at'>) => {
    const id = 'ach-' + Date.now();
    const now = new Date().toISOString();
    const newAch: Achievement = {
      ...achData,
      id,
      created_at: now,
      updated_at: now,
    };
    setAchievements((prev) => [newAch, ...prev]);
    await logAction('CREATE_ACHIEVEMENT', 'achievements', id, `ส่งผลงานการแข่งขัน: ${achData.title}`);

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('achievements').insert([newAch]);
      } catch (err) {
        console.warn('Supabase sync note:', err);
      }
    }
    return newAch;
  };

  const updateAchievement = async (id: string, achData: Partial<Achievement>) => {
    const now = new Date().toISOString();
    setAchievements((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...achData, updated_at: now } : item))
    );
    await logAction('UPDATE_ACHIEVEMENT', 'achievements', id, `แก้ไขผลงาน ID ${id}`);

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('achievements').update({ ...achData, updated_at: now }).eq('id', id);
      } catch (err) {
        console.warn('Supabase sync note:', err);
      }
    }
  };

  const deleteAchievement = async (id: string) => {
    setAchievements((prev) => prev.filter((item) => item.id !== id));
    await logAction('DELETE_ACHIEVEMENT', 'achievements', id, `ลบผลงาน ID ${id}`);

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('achievements').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase sync note:', err);
      }
    }
  };

  // Users CRUD
  const updateUserRole = async (id: string, role: UserProfile['role']) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role, updated_at: new Date().toISOString() } : u))
    );
    await logAction('UPDATE_USER_ROLE', 'profiles', id, `ปรับบทบาทผู้ใช้ ID ${id} เป็น ${role}`);

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('profiles').update({ role }).eq('id', id);
      } catch (err) {
        console.warn('Supabase sync note:', err);
      }
    }
  };

  const updateUserStatus = async (id: string, status: UserProfile['account_status']) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, account_status: status, updated_at: new Date().toISOString() } : u))
    );
    await logAction('UPDATE_USER_STATUS', 'profiles', id, `ปรับสถานะผู้ใช้ ID ${id} เป็น ${status}`);

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('profiles').update({ account_status: status }).eq('id', id);
      } catch (err) {
        console.warn('Supabase sync note:', err);
      }
    }
  };

  // Settings
  const updateSettings = async (newSettings: Partial<WebsiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    await logAction('UPDATE_SETTINGS', 'settings', 'site-settings', 'ปรับแต่งการตั้งค่าเว็บไซต์');
  };

  return (
    <DataContext.Provider
      value={{
        news,
        publishedNews,
        featuredNews,
        addNews,
        updateNews,
        deleteNews,
        getNewsBySlug,

        events,
        publishedEvents,
        upcomingEvents,
        addEvent,
        updateEvent,
        deleteEvent,

        resources,
        publishedResources,
        addResource,
        updateResource,
        deleteResource,
        incrementDownload,

        achievements,
        publishedAchievements,
        addAchievement,
        updateAchievement,
        deleteAchievement,

        categories,

        users,
        updateUserRole,
        updateUserStatus,

        auditLogs,
        logAction,

        settings,
        updateSettings,

        isLoading,
        refreshData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
