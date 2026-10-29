# Libnotes — Google OAuth Setup & Configuration Guide

This guide details how to configure Google Sign-In with Supabase Authentication for Libnotes at **₹0 cost**.

---

## 1. Supabase Project Information

- **Supabase Project URL**: `https://vidbiyemknmkfswiucsr.supabase.co`
- **Publishable Key**: `sb_publishable_Te9UBMPCAklAoErXTuGUNQ_DBGD4cKc`
- **Supabase OAuth Callback URL**: `https://vidbiyemknmkfswiucsr.supabase.co/auth/v1/callback`

---

## 2. Google Cloud Console Configuration

1. Visit the [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select a project (e.g. `Libnotes-App`).
3. Configure the **OAuth Consent Screen**:
   - **User Type**: External
   - **App Name**: `Libnotes`
   - **User Support Email**: Your administrator email
   - **Authorized Domains**: `supabase.co`
   - **Scopes**: `.../auth/userinfo.email`, `.../auth/userinfo.profile`, `openid`
4. Create Credentials:
   - Navigate to **APIs & Services > Credentials**.
   - Click **+ Create Credentials > OAuth client ID**.
   - **Application Type**: Web application
   - **Name**: `Libnotes Supabase Client`
   - **Authorized JavaScript origins**:
     - `http://localhost:5173`
     - `https://vidbiyemknmkfswiucsr.supabase.co`
     - Your production domain (when deployed)
   - **Authorized redirect URIs**:
     - `https://vidbiyemknmkfswiucsr.supabase.co/auth/v1/callback`
5. Copy your **Client ID** and **Client Secret**.

---

## 3. Configure Supabase Dashboard

1. Navigate to your [Supabase Dashboard](https://supabase.com/dashboard/project/vidbiyemknmkfswiucsr).
2. Go to **Authentication > Providers > Google**.
3. Toggle Google to **Enabled**.
4. Paste the **Client ID** and **Client Secret** obtained from Google Cloud Console.
5. Click **Save**.

### Configure URL Configuration in Supabase
1. Go to **Authentication > URL Configuration**.
2. Set **Site URL**:
   - `http://localhost:5173` (or production domain)
3. Under **Redirect URLs**, add:
   - `http://localhost:5173/#/auth/callback`
   - `http://localhost:5173/**`
   - Production domain callbacks (e.g. `https://your-domain.com/#/auth/callback`)

---

## 4. How the Flow Operates in Libnotes

1. **User Action**: Learner clicks **"Continue with Google"** on `/signup` or `/login`.
2. **Provider Redirect**: `signInWithGoogle()` calls `supabase.auth.signInWithOAuth()` using the PKCE flow.
3. **Google Consent**: Google prompts account selection and permissions.
4. **Supabase Callback**: Google redirects to `https://vidbiyemknmkfswiucsr.supabase.co/auth/v1/callback`, establishing a secure JWT session.
5. **App Callback Handler**:
   - The application receives the session via `detectSessionInUrl: true` or hash `/auth/callback`.
   - `syncUserProfile()` runs idempotently:
     - Extracts `full_name`, `email`, and `picture`/`avatar_url` from Google metadata.
     - Saves/updates the user profile in public `profiles`.
     - Checks `has_seen_welcome`.
6. **Chatpata Welcome Modal**:
   - For **first-time users** (`has_seen_welcome === false`), the celebratory **Chatpata Welcome Modal** triggers with celebratory confetti.
   - For **returning users** (`has_seen_welcome === true`), the user is routed straight to their notes dashboard without repeating the celebration.
7. **Mark As Seen**: When learner clicks **"Let's Get Learning →"**, `markWelcomeAsSeen()` updates `has_seen_welcome = true` in Supabase and localStorage.

---

## 5. Security & Privacy Guarantees

- **₹0 Cost**: Supabase free tier includes up to 50,000 monthly active users and unlimited Google OAuth logins.
- **No Leaked Secrets**: Client secrets reside solely in the Supabase backend vault; never exposed to browser or bundled files.
- **Row Level Security**: Users can only read and update their own profile records (`auth.uid() = id`).
- **Idempotency**: Logging in repeatedly never duplicates records or resets user preferences.

