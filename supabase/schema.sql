-- HireBot Database Schema
CREATE TABLE IF NOT EXISTS profiles (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), email TEXT UNIQUE NOT NULL, full_name TEXT, role TEXT, created_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS jobs (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title TEXT NOT NULL, department TEXT, description TEXT, requirements TEXT[] DEFAULT '{}', status TEXT DEFAULT 'open', user_id UUID REFERENCES profiles(id), created_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS candidates (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, email TEXT, phone TEXT, location TEXT, resume_text TEXT, resume_url TEXT, experience TEXT, education TEXT, skills TEXT[] DEFAULT '{}', ai_score INTEGER DEFAULT 0, ai_summary TEXT, stage TEXT DEFAULT 'applied', source TEXT, job_id UUID REFERENCES jobs(id), user_id UUID REFERENCES profiles(id), created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS interviews (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE, job_id UUID REFERENCES jobs(id), scheduled_at TIMESTAMPTZ, duration INTEGER DEFAULT 60, type TEXT, interviewers TEXT[] DEFAULT '{}', notes TEXT, rating INTEGER, status TEXT DEFAULT 'scheduled', created_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS assessments (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, job_id UUID REFERENCES jobs(id), questions JSONB DEFAULT '[]', duration INTEGER DEFAULT 60, created_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS assessment_results (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), assessment_id UUID REFERENCES assessments(id), candidate_id UUID REFERENCES candidates(id), answers JSONB DEFAULT '[]', score INTEGER DEFAULT 0, completed_at TIMESTAMPTZ);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users own data" ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users manage candidates" ON candidates FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage jobs" ON jobs FOR ALL USING (auth.uid() = user_id);
