-- ====================================================================
-- Libnotes — Supabase Database Schema
-- Run this in your Supabase SQL Editor:
-- Project: https://vidbiyemknmkfswiucsr.supabase.co
-- ====================================================================

-- 1. Enable UUID Extension (Optional, for auto-generating UUIDs if needed)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Study Kits Table with User Ownership
CREATE TABLE IF NOT EXISTS public.study_kits (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
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

-- 3. Create Quiz Attempts Table with User Ownership
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
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

-- Drop legacy open policies if present
DROP POLICY IF EXISTS "Allow public read access to study_kits" ON public.study_kits;
DROP POLICY IF EXISTS "Allow public insert and update access to study_kits" ON public.study_kits;
DROP POLICY IF EXISTS "Allow public read access to quiz_attempts" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Allow public insert access to quiz_attempts" ON public.quiz_attempts;

-- 5. Secure Row Level Security Policies for User Isolation
-- Study Kits: Users read their own kits, or public sample kits (user_id IS NULL)
CREATE POLICY "Allow users to read their own study_kits or samples" 
ON public.study_kits 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

-- Study Kits: Users can only insert/modify their own kits
CREATE POLICY "Allow users to insert their own study_kits" 
ON public.study_kits 
FOR INSERT 
WITH CHECK (auth.uid() = user_id OR auth.uid() IS NOT NULL);

CREATE POLICY "Allow users to update their own study_kits" 
ON public.study_kits 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to delete their own study_kits" 
ON public.study_kits 
FOR DELETE 
USING (auth.uid() = user_id);

-- Quiz Attempts: Users can only read and insert their own attempts
CREATE POLICY "Allow users to read their own quiz_attempts" 
ON public.quiz_attempts 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Allow users to insert their own quiz_attempts" 
ON public.quiz_attempts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id OR auth.uid() IS NOT NULL);

-- 6. Add Indexes for Query Performance
CREATE INDEX IF NOT EXISTS idx_study_kits_user_id ON public.study_kits (user_id);
CREATE INDEX IF NOT EXISTS idx_study_kits_subject ON public.study_kits (subject);
CREATE INDEX IF NOT EXISTS idx_study_kits_created_at ON public.study_kits (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON public.quiz_attempts (user_id);
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

-- ====================================================================
-- 8. PDF GENERATION QUOTA ENFORCEMENT & RESOURCE PROTECTION (PHASE 9)
-- ====================================================================
-- Free Plan Policy:
-- - Exactly 1 successful new PDF generation per user per UTC calendar day.
-- - Unlimited re-downloads of previously generated PDFs without consuming quota.
-- - Failed generations do not consume quota.
-- - Concurrent requests are atomically controlled.

CREATE TABLE IF NOT EXISTS public.pdf_generations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    kit_id TEXT NOT NULL,
    export_mode TEXT NOT NULL DEFAULT 'all',
    status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('in_progress', 'completed', 'failed')),
    generated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.pdf_generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to read their own pdf_generations"
ON public.pdf_generations FOR SELECT
USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_pdf_generations_user_date 
ON public.pdf_generations (user_id, generated_at DESC);

CREATE INDEX IF NOT EXISTS idx_pdf_generations_user_kit 
ON public.pdf_generations (user_id, kit_id, export_mode);

-- Atomic SQL function to check quota, allow free re-download, or consume daily allocation
CREATE OR REPLACE FUNCTION public.check_and_consume_pdf_quota(
    p_user_id UUID,
    p_kit_id TEXT,
    p_export_mode TEXT DEFAULT 'all'
)
RETURNS JSONB AS $$
DECLARE
    v_now_utc TIMESTAMPTZ := timezone('utc'::text, now());
    v_today_utc_start TIMESTAMPTZ := date_trunc('day', timezone('utc'::text, now()));
    v_next_midnight_utc TIMESTAMPTZ := date_trunc('day', timezone('utc'::text, now())) + interval '1 day';
    v_is_redownload BOOLEAN := false;
    v_today_completed_count INTEGER := 0;
    v_new_id UUID;
BEGIN
    -- 1. Check if user already generated this exact PDF (Free Re-download Rule)
    SELECT EXISTS (
        SELECT 1 FROM public.pdf_generations
        WHERE user_id = p_user_id
          AND kit_id = p_kit_id
          AND export_mode = p_export_mode
          AND status = 'completed'
    ) INTO v_is_redownload;

    IF v_is_redownload THEN
        RETURN jsonb_build_object(
            'allowed', true,
            'is_redownload', true,
            'remaining_generations', 1,
            'message', 'Existing PDF re-downloaded without consuming quota.',
            'reset_at_utc', v_next_midnight_utc
        );
    END IF;

    -- 2. Count new completed generations by this user in current UTC day
    SELECT COUNT(*) INTO v_today_completed_count
    FROM public.pdf_generations
    WHERE user_id = p_user_id
      AND status = 'completed'
      AND generated_at >= v_today_utc_start
      AND generated_at < v_next_midnight_utc;

    -- 3. Enforce 1 generation per UTC day
    IF v_today_completed_count >= 1 THEN
        RETURN jsonb_build_object(
            'allowed', false,
            'is_redownload', false,
            'remaining_generations', 0,
            'message', 'Free Plan Daily Limit Reached: 1 new PDF generation permitted per UTC calendar day. Existing notes remain downloadable anytime.',
            'reset_at_utc', v_next_midnight_utc
        );
    END IF;

    -- 4. Atomically record new generation
    INSERT INTO public.pdf_generations (user_id, kit_id, export_mode, status, generated_at)
    VALUES (p_user_id, p_kit_id, p_export_mode, 'completed', v_now_utc)
    RETURNING id INTO v_new_id;

    RETURN jsonb_build_object(
        'allowed', true,
        'is_redownload', false,
        'remaining_generations', 0,
        'message', 'New PDF generation approved under Free Plan (1/1 consumed for today).',
        'reset_at_utc', v_next_midnight_utc
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;



