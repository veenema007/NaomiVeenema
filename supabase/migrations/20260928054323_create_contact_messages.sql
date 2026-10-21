/*
# Create contact_messages table (single-tenant, no auth)

1. New Tables
- `contact_messages`
- `id` (uuid, primary key)
- `name` (text, not null) — sender's name
- `email` (text, not null) — sender's email address
- `subject` (text, not null) — message subject
- `message` (text, not null) — message body
- `lang` (text, default 'nl') — language the form was submitted in
- `created_at` (timestamptz, default now()) — submission timestamp
2. Security
- Enable RLS on `contact_messages`.
- Allow anon + authenticated INSERT only (public visitors can submit contact forms).
- No SELECT/UPDATE/DELETE for anon — only the admin (service role) can read messages.
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  lang text NOT NULL DEFAULT 'nl',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages"
ON contact_messages FOR INSERT
TO anon, authenticated WITH CHECK (true);
