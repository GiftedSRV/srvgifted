import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '@/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface AuthContextType {
  user: any | null;
  profile: UserProfile | null;
  role: UserRole | null;
  isLoading: boolean;
  isSupabaseLive: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null; profile?: UserProfile | null }>;
  signUp: (email: string, password: string, displayName?: string, role?: UserRole) => Promise<{ error: Error | null; profile?: UserProfile | null }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ error: Error | null }>;
  changePassword: (newPassword: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSupabaseLive, setIsSupabaseLive] = useState<boolean>(isSupabaseConfigured());

  // Check active Supabase session
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      const configured = isSupabaseConfigured();
      setIsSupabaseLive(configured);

      if (configured) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser(session.user);
            await fetchProfile(session.user.id, session.user.email);
          } else {
            setUser(null);
            setProfile(null);
          }
        } catch (err) {
          console.warn('Supabase session initialization note:', err);
          setUser(null);
          setProfile(null);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setIsLoading(false);
    };

    initAuth();

    // Listen to Supabase auth events
    if (isSupabaseConfigured()) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          await fetchProfile(session.user.id, session.user.email);
        } else {
          setUser(null);
          setProfile(null);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const fetchProfile = async (userId: string, userEmail?: string): Promise<UserProfile | null> => {
    if (!isSupabaseConfigured()) return null;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (data) {
        setProfile(data as UserProfile);
        return data as UserProfile;
      } else {
        // If profile does not exist in table yet, create a default profile record
        const defaultRole: UserRole = userEmail?.toLowerCase().includes('admin')
          ? 'admin'
          : userEmail?.toLowerCase().includes('teacher')
          ? 'teacher'
          : 'student';

        const newProfile: UserProfile = {
          id: userId,
          email: userEmail || '',
          display_name: userEmail?.split('@')[0] || 'User',
          role: defaultRole,
          account_status: 'active',
          created_at: new Date().toISOString(),
        };

        try {
          await supabase.from('profiles').insert([newProfile]);
        } catch (insertErr) {
          console.warn('Profile auto-insert note:', insertErr);
        }

        setProfile(newProfile);
        return newProfile;
      }
    } catch (err) {
      console.warn('Error fetching profile from Supabase:', err);
      return null;
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);

    if (!isSupabaseConfigured()) {
      setIsLoading(false);
      return {
        error: new Error(
          'ระบบยังไม่ได้เชื่อมต่อกับ Supabase: กรุณากำหนดค่า VITE_SUPABASE_URL และ VITE_SUPABASE_ANON_KEY ในไฟล์ .env'
        ),
        profile: null,
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        setIsLoading(false);
        const translatedMsg =
          error.message === 'Invalid login credentials'
            ? 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
            : error.message;
        return { error: new Error(translatedMsg), profile: null };
      }

      if (data.user) {
        setUser(data.user);
        const userProf = await fetchProfile(data.user.id, data.user.email);
        setIsLoading(false);
        return { error: null, profile: userProf };
      }

      setIsLoading(false);
      return { error: new Error('ไม่พบข้อมูลผู้ใช้งาน'), profile: null };
    } catch (err: any) {
      setIsLoading(false);
      return { error: err, profile: null };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    displayName?: string,
    role: UserRole = 'student'
  ) => {
    setIsLoading(true);

    if (!isSupabaseConfigured()) {
      setIsLoading(false);
      return {
        error: new Error('ระบบยังไม่ได้เชื่อมต่อกับ Supabase'),
        profile: null,
      };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
        options: {
          data: {
            display_name: displayName || email.split('@')[0],
            role: role,
          },
        },
      });

      if (error) {
        setIsLoading(false);
        return { error, profile: null };
      }

      if (data.user) {
        setUser(data.user);
        const prof = await fetchProfile(data.user.id, data.user.email);
        setIsLoading(false);
        return { error: null, profile: prof };
      }

      setIsLoading(false);
      return { error: null, profile: null };
    } catch (err: any) {
      setIsLoading(false);
      return { error: err, profile: null };
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured()) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Signout note:', e);
      }
    }
    setUser(null);
    setProfile(null);
  };

  // Only the logged-in user can update their own profile information
  const updateProfile = async (data: Partial<UserProfile>): Promise<{ error: Error | null }> => {
    if (!user || !profile) {
      return { error: new Error('กรุณาเข้าสู่ระบบก่อนดำเนินการ') };
    }

    try {
      // Security: Only allow updating safe fields (display_name, class_name, avatar_url)
      const allowedData = {
        display_name: data.display_name?.trim() || profile.display_name,
        class_name: data.class_name?.trim() || profile.class_name,
        avatar_url: data.avatar_url || profile.avatar_url,
        updated_at: new Date().toISOString(),
      };

      if (isSupabaseConfigured()) {
        const { error } = await supabase
          .from('profiles')
          .update(allowedData)
          .eq('id', user.id);

        if (error) {
          return { error };
        }
      }

      setProfile((prev) => (prev ? { ...prev, ...allowedData } : null));
      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  // Only the logged-in user can change their own password via Supabase Auth
  const changePassword = async (newPassword: string): Promise<{ error: Error | null }> => {
    if (!user) {
      return { error: new Error('กรุณาเข้าสู่ระบบก่อนดำเนินการ') };
    }

    if (!isSupabaseConfigured()) {
      return { error: new Error('ระบบยังไม่ได้เชื่อมต่อกับ Supabase') };
    }

    if (!newPassword || newPassword.length < 6) {
      return { error: new Error('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร') };
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        return { error };
      }

      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        role: profile?.role || null,
        isLoading,
        isSupabaseLive,
        signIn,
        signUp,
        signOut,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};