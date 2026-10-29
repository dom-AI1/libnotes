-- ====================================================================
-- Libnotes — Supabase Database Schema
-- Run this in your Supabase SQL Editor:
-- Project: https://vidbiyemknmkfswiucsr.supabase.co
-- ====================================================================

-- 1. Enable UUID Extension (Optional, for auto-generating UUIDs if needed)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Study Kits Table
CREATE TABLE IF NOT EXISTS public.study_kits (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    academic_class TEXT NOT NULL,
    chapter TEXT NOT NULL,
    duration TEXT NOT NULL,
    video_url TEXT,
    file_name TEXT,
    file_size TEXT,
    date_created TEXT NOT NULL,
    note_style TEXT NOT NULL,
    language TEXT NOT NULL,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    timestamps JSONB NOT NULL DEFAULT '[]'::jsonb,
    flashcards JSONB NOT NULL DEFAULT '[]'::jsonb,
    quiz JSONB NOT NULL DEFAULT '[]'::jsonb,
    quick_revision_points JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Create Quiz Attempts Table
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id TEXT PRIMARY KEY,
    kit_id TEXT NOT NULL,
    kit_title TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    score INTEGER NOT NULL DEFAULT 0,
    total INTEGER NOT NULL DEFAULT 0,
    percentage INTEGER NOT NULL DEFAULT 0,
    weak_topics JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.study_kits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

-- 5. Policies for Public / Anonymous Read and Write (Using Publishable / Anon Key)
CREATE POLICY "Allow public read access to study_kits" 
ON public.study_kits 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert and update access to study_kits" 
ON public.study_kits 
FOR ALL 
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow public read access to quiz_attempts" 
ON public.quiz_attempts 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert access to quiz_attempts" 
ON public.quiz_attempts 
FOR ALL 
USING (true)
WITH CHECK (true);

-- 6. Add Indexes for Query Performance
CREATE INDEX IF NOT EXISTS idx_study_kits_subject ON public.study_kits (subject);
CREATE INDEX IF NOT EXISTS idx_study_kits_created_at ON public.study_kits (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_kit_id ON public.quiz_attempts (kit_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_created_at ON public.quiz_attempts (created_at DESC);

-- 7. Create User Profiles Table (Linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    display_name TEXT,
    avatar_url TEXT,
    preferred_language TEXT DEFAULT 'Hinglish',
    has_seen_welcome BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own profile
CREATE POLICY "Allow users to read their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Allow users to update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- Allow users to insert their own profile
CREATE POLICY "Allow users to insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Function and trigger to automatically create profile on Supabase auth signup (Google OAuth or Email)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, display_name, avatar_url, preferred_language, has_seen_welcome)
    VALUES (
        new.id,
        new.email,
        COALESCE(
            new.raw_user_meta_data->>'full_name',
            new.raw_user_meta_data->>'display_name',
            new.raw_user_meta_data->>'name',
            split_part(new.email, '@', 1)
        ),
        COALESCE(
            new.raw_user_meta_data->>'avatar_url',
            new.raw_user_meta_data->>'picture'
        ),
        'Hinglish',
        false
    )
    ON CONFLICT (id) DO UPDATE SET
        display_name = COALESCE(EXCLUDED.display_name, profiles.display_name),
        avatar_url = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url),
        updated_at = timezone('utc'::text, now());
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


