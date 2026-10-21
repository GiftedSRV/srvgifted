-- =========================================================================
-- SARAWITTAYA SCHOOL GIFTED PROGRAM DATABASE SCHEMA
-- โครงการห้องเรียนพิเศษวิทยาศาสตร์–คณิตศาสตร์ ระดับชั้นมัธยมศึกษาตอนต้น
-- โรงเรียนสารวิทยา | SARAWITTAYA SCHOOL
-- =========================================================================

-- Enable pgcrypto for UUID generation if not present
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- -------------------------------------------------------------------------
-- 1. PROFILES TABLE (Linked with Supabase auth.users)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    display_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('admin', 'teacher', 'student')),
    class_name TEXT,
    account_status TEXT NOT NULL DEFAULT 'active' CHECK (account_status IN ('active', 'pending', 'suspended')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for searching profiles
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON public.profiles(account_status);

-- -------------------------------------------------------------------------
-- 2. CATEGORIES TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category_type TEXT NOT NULL CHECK (category_type IN ('news', 'event', 'resource', 'achievement')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_categories_type ON public.categories(category_type);

-- -------------------------------------------------------------------------
-- 3. NEWS ARTICLES TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.news_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    english_title TEXT,
    slug TEXT UNIQUE NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    cover_image_path TEXT,
    gallery_image_paths JSONB DEFAULT '[]'::jsonb,
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    is_featured BOOLEAN DEFAULT FALSE NOT NULL,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_news_status ON public.news_articles(status);
CREATE INDEX IF NOT EXISTS idx_news_slug ON public.news_articles(slug);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON public.news_articles(published_at DESC);

-- -------------------------------------------------------------------------
-- 4. EVENTS / CALENDAR TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    start_at TIMESTAMPTZ NOT NULL,
    end_at TIMESTAMPTZ NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    organizer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    registration_url TEXT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'student_only', 'staff_only')),
    cover_image_path TEXT,
    gallery_image_paths JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_events_start_at ON public.events(start_at ASC);
CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);
CREATE INDEX IF NOT EXISTS idx_events_visibility ON public.events(visibility);

-- -------------------------------------------------------------------------
-- 5. LEARNING RESOURCES TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.learning_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    subject TEXT NOT NULL CHECK (subject IN (
        'Biology', 'Chemistry', 'Physics', 'Mathematics', 
        'Scientific Research', 'STEM', 'Worksheets', 
        'Learning Documents', 'Other Academic Resources'
    )),
    resource_type TEXT NOT NULL CHECK (resource_type IN ('PDF', 'Document', 'Presentation', 'Spreadsheet', 'Link', 'Video')),
    file_path TEXT,
    external_url TEXT,
    access_level TEXT NOT NULL DEFAULT 'public' CHECK (access_level IN ('public', 'student', 'teacher')),
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    file_size TEXT,
    downloads_count INT DEFAULT 0 NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_resources_subject ON public.learning_resources(subject);
CREATE INDEX IF NOT EXISTS idx_resources_status ON public.learning_resources(status);
CREATE INDEX IF NOT EXISTS idx_resources_access ON public.learning_resources(access_level);

-- -------------------------------------------------------------------------
-- 6. ACHIEVEMENTS TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    event_name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN (
        'Science competitions', 'Mathematics competitions', 'Science projects', 
        'Research presentations', 'Academic awards', 'School activities'
    )),
    academic_year TEXT NOT NULL,
    achievement_date DATE NOT NULL,
    description TEXT NOT NULL,
    result TEXT NOT NULL,
    student_names TEXT,
    image_paths JSONB DEFAULT '[]'::jsonb,
    submitted_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'published', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_achievements_year ON public.achievements(academic_year);
CREATE INDEX IF NOT EXISTS idx_achievements_status ON public.achievements(status);
CREATE INDEX IF NOT EXISTS idx_achievements_category ON public.achievements(category);

-- -------------------------------------------------------------------------
-- 7. AUDIT LOGS TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    details TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON public.audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON public.audit_logs(created_at DESC);

-- -------------------------------------------------------------------------
-- HELPER FUNCTIONS FOR SECURITY & ROLE-BASED ACCESS
-- -------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
AS $$
DECLARE
    u_role TEXT;
BEGIN
    SELECT role INTO u_role FROM public.profiles WHERE id = auth.uid();
    RETURN COALESCE(u_role, 'anonymous');
END;
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin' AND account_status = 'active'
    );
$$;

CREATE OR REPLACE FUNCTION public.is_teacher_or_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role IN ('admin', 'teacher') AND account_status = 'active'
    );
$$;

CREATE OR REPLACE FUNCTION public.is_authenticated_user()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND account_status = 'active'
    );
$$;

-- -------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- -------------------------------------------------------------------------

-- 1. Profiles RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by authenticated users"
ON public.profiles FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own profile display name and avatar"
ON public.profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (
    auth.uid() = id 
    -- User cannot escalate their own role
    AND role = (SELECT role FROM public.profiles WHERE id = auth.uid())
);

CREATE POLICY "Admins can manage all profiles"
ON public.profiles FOR ALL
USING (public.is_admin());

-- 2. News Articles RLS
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published news"
ON public.news_articles FOR SELECT
USING (status = 'published');

CREATE POLICY "Teachers can view all news drafts and published items"
ON public.news_articles FOR SELECT
USING (public.is_teacher_or_admin());

CREATE POLICY "Teachers can create news drafts"
ON public.news_articles FOR INSERT
WITH CHECK (public.is_teacher_or_admin());

CREATE POLICY "Teachers can update their own news drafts"
ON public.news_articles FOR UPDATE
USING (
    public.is_admin() OR 
    (public.is_teacher_or_admin() AND author_id = auth.uid())
);

CREATE POLICY "Admins can manage all news"
ON public.news_articles FOR ALL
USING (public.is_admin());

-- 3. Events RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published public events"
ON public.events FOR SELECT
USING (status = 'published' AND visibility = 'public');

CREATE POLICY "Students can view published student events"
ON public.events FOR SELECT
USING (
    status = 'published' AND (
        visibility IN ('public', 'student_only') AND public.is_authenticated_user()
    )
);

CREATE POLICY "Staff can view all events"
ON public.events FOR SELECT
USING (public.is_teacher_or_admin());

CREATE POLICY "Teachers and admins can insert events"
ON public.events FOR INSERT
WITH CHECK (public.is_teacher_or_admin());

CREATE POLICY "Admins can manage all events"
ON public.events FOR ALL
USING (public.is_admin());

-- 4. Learning Resources RLS
ALTER TABLE public.learning_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published public resources"
ON public.learning_resources FOR SELECT
USING (status = 'published' AND access_level = 'public');

CREATE POLICY "Students can view student-level resources"
ON public.learning_resources FOR SELECT
USING (
    status = 'published' AND 
    access_level IN ('public', 'student') AND 
    public.is_authenticated_user()
);

CREATE POLICY "Teachers can view and upload resources"
ON public.learning_resources FOR ALL
USING (public.is_teacher_or_admin());

-- 5. Achievements RLS
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published achievements"
ON public.achievements FOR SELECT
USING (status = 'published');

CREATE POLICY "Teachers can submit achievements"
ON public.achievements FOR INSERT
WITH CHECK (public.is_teacher_or_admin());

CREATE POLICY "Admins can manage all achievements"
ON public.achievements FOR ALL
USING (public.is_admin());

-- 6. Audit Logs RLS
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view audit logs"
ON public.audit_logs FOR SELECT
USING (public.is_admin());

CREATE POLICY "System and authenticated users can insert audit logs"
ON public.audit_logs FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- -------------------------------------------------------------------------
-- TRIGGER FOR USER CREATION (Auto-create Profile upon Supabase Signup)
-- -------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, display_name, role, account_status)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
        'student', -- New users strictly default to student, never admin
        'active'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
