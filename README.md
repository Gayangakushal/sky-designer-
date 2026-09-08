# Sky Admin Console

Inspect the complete uploaded Sky Designers project before making changes.

This is an existing React + Vite + TypeScript project. It already contains:

- @supabase/supabase-js
- src/integrations/supabase/client.ts
- src/integrations/supabase/types.ts
- src/hooks/useAdminAuth.ts
- src/pages/AdminLogin.tsx
- src/pages/AdminDashboard.tsx
- /admin/login route
- /admin protected route
- existing Supabase migrations
- user_roles table
- bookings table
- team_members table
- reviews table
- portfolio_items table
- portfolio storage bucket

Do not create a second authentication system or duplicate the existing tables.

MAIN GOAL

Complete the existing Supabase backend and admin login system so that only one authorized administrator can log in and manage website content.

Admin login credentials:



SECURITY REQUIREMENTS

- Use Supabase Authentication with email and password.
- Do not store the password in any public database table.
- Do not hardcode the email or password inside React, TypeScript, JavaScript, CSS, HTML, environment files, or Git.
- Do not expose the Supabase secret key or service-role key in the frontend.
- Use only the Supabase publishable key in the Vite frontend.
- Password authentication must use supabase.auth.signInWithPassword().
- Keep Row Level Security enabled.
- The public website must not have a signup page.
- Only the manually created administrator account should access the dashboard.

SUPABASE CONNECTION

Use the existing Supabase configuration already included in the project.

Existing environment variable names:

VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
VITE_SUPABASE_PROJECT_ID

Do not display or commit their real values.

Inspect the existing supabase/config.toml and connect Lovable to the same Supabase project. Do not create a separate Supabase project unless the current project cannot be connected.

AUTHENTICATION FLOW

Keep and improve the existing login route:

/admin/login

Required login flow:

1. Administrator enters email and password.
2. Call supabase.auth.signInWithPassword().
3. After successful authentication, query public.user_roles.
4. Confirm that the authenticated user has the admin role.
5. If the user is an admin, redirect to /admin.
6. If the user is not an admin, immediately sign them out and show “Access Denied”.
7. If the credentials are incorrect, show a clear login error.
8. Keep the session after page refresh.
9. Automatically refresh the auth token.
10. Redirect unauthenticated visitors from /admin to /admin/login.
11. Add a working logout button.
12. Prevent protected admin data from loading before the admin-role check finishes.

ADMIN ROLE DATABASE

Preserve or create the following secure role structure:

- app_role enum containing admin and user
- public.user_roles table
- user_id references auth.users(id) with ON DELETE CASCADE
- unique constraint on user_id and role
- has_role() security-definer function
- Row Level Security enabled

The administrator must receive:

role = admin

Do not rely only on frontend route protection. Database RLS policies must also enforce admin access.

DATABASE CONTENT MANAGEMENT

The administrator must be able to manage the following from the admin dashboard:

1. Pricing packages
2. Pricing comparison data
3. Team members
4. Portfolio items
5. Reviews
6. Customer inquiries or bookings
7. Basic website settings

Keep the existing tables and add only the missing tables.

CREATE PRICING TABLES

Create a new migration for the following normalized structure.

Table: pricing_packages

Fields:

- id uuid primary key default gen_random_uuid()
- slug text unique not null
- tier text not null
- name text not null
- price_lkr integer not null
- billing_period text default '/mo'
- description text
- badge text
- is_popular boolean default false
- is_active boolean default true
- sort_order integer default 0
- created_at timestamptz default now()
- updated_at timestamptz default now()

Table: pricing_categories

Fields:

- id uuid primary key default gen_random_uuid()
- name text unique not null
- sort_order integer default 0
- created_at timestamptz default now()
- updated_at timestamptz default now()

Table: pricing_features

Fields:

- id uuid primary key default gen_random_uuid()
- category_id uuid references pricing_categories(id) on delete cascade
- label text not null
- sort_order integer default 0
- created_at timestamptz default now()
- updated_at timestamptz default now()

Table: pricing_feature_values

Fields:

- id uuid primary key default gen_random_uuid()
- package_id uuid references pricing_packages(id) on delete cascade
- feature_id uuid references pricing_features(id) on delete cascade
- included boolean
- display_value text
- created_at timestamptz default now()
- updated_at timestamptz default now()
- unique(package_id, feature_id)

CREATE SITE SETTINGS TABLE

Table: site_settings

Fields:

- id uuid primary key default gen_random_uuid()
- setting_key text unique not null
- setting_value jsonb not null default '{}'
- updated_at timestamptz default now()

Use this table for editable public details such as:

- business phone number
- WhatsApp number
- contact email
- office address
- hero badge
- hero heading
- hero description
- social-media links

ROW LEVEL SECURITY

Enable RLS on every new public table.

Public website access:

- anon and authenticated users may SELECT active pricing packages
- anon and authenticated users may SELECT pricing categories
- anon and authenticated users may SELECT pricing features
- anon and authenticated users may SELECT pricing feature values
- anon and authenticated users may SELECT approved public website content
- anon visitors may submit legitimate bookings or inquiries

Admin access:

- only authenticated users with public.has_role(auth.uid(), 'admin') may INSERT, UPDATE or DELETE pricing data
- only administrators may edit site settings
- only administrators may manage team members
- only administrators may manage portfolio items
- only administrators may see all reviews
- only administrators may read and manage bookings or inquiries

Do not use permissive write policies such as USING (true) for admin content.

PRICING DATA MIGRATION

The project currently contains static pricing information in files such as:

- src/data/pricingPackages.ts
- src/data/pricingComparison.ts
- src/components/PricingSection.tsx
- src/pages/Packages.tsx

Read the existing data and seed it into Supabase.

Required packages:

STANDARD
Startup Foundation
LKR 35,000 / month

PREMIUM
Brand Growth Package
LKR 65,000 / month

PLATINUM
Market Leader Package
LKR 100,000 / month
Badge: MOST POPULAR
is_popular: true

CORPORATE
Omnichannel Dominance
LKR 200,000 / month

Seed all existing comparison categories and features:

- Advertising Platforms
- Strategy & Onboarding
- Content & Creative
- Tech & Infrastructure
- Support & Reporting

Preserve all current feature limits, included states, excluded states and display values.

PUBLIC PRICING UI

Update the active pricing cards and comparison table to fetch their data from Supabase.

Requirements:

- show a loading skeleton while fetching
- show a user-friendly error state
- maintain the existing professional website design
- preserve the Platinum “Most Popular” styling
- preserve responsive behavior
- do not create page-level horizontal overflow
- use the current static data as a temporary fallback only when a Supabase fetch fails
- do not duplicate package data in multiple components after migration

ADMIN DASHBOARD

Extend the existing AdminDashboard instead of creating another dashboard.

Add these navigation tabs:

- Overview
- Pricing Packages
- Package Comparison
- Bookings
- Team
- Portfolio
- Reviews
- Site Settings

PRICING PACKAGE MANAGEMENT

Allow the administrator to:

- create a package
- edit package name
- edit tier
- edit price
- edit billing period
- edit description
- change badge
- mark a package as Most Popular
- enable or disable a package
- change display order
- delete a package with confirmation

PACKAGE COMPARISON MANAGEMENT

Allow the administrator to:

- create categories
- rename categories
- reorder categories
- add comparison features
- edit feature labels
- set each package value as Included, Not Included or Custom Text
- change the sort order
- delete features with confirmation

OTHER ADMIN FEATURES

Team:

- create, edit and delete team members
- upload team images to Supabase Storage
- show an image preview
- save the public image URL

Portfolio:

- create, edit and delete portfolio items
- upload images or videos to the existing portfolio bucket
- delete old files safely when replacing media

Reviews:

- create reviews
- approve or unapprove reviews
- edit reviews
- delete reviews

Bookings:

- view submitted bookings
- change status
- delete bookings
- display date and contact details clearly

Site Settings:

- edit phone
- edit WhatsApp
- edit email
- edit address
- edit hero text
- edit social links

STORAGE

Preserve the existing public portfolio bucket.

Create another bucket named:

team-media

Requirements:

- public may view team images
- only authenticated administrators may upload, update or delete files
- file names must be sanitized
- validate image type and file size
- do not expose a service-role key

ADMIN USER CREATION

Do not create the admin user from public frontend code.

Complete all migrations and authentication code, then tell me to create the administrator through:

Supabase Dashboard → Authentication → Users → Add User

Administrator email:

kowshallagayanga@gmail.com

Initial password:

gayanga2005

After the Auth user is created, provide the exact SQL statement needed to assign the admin role using the user’s email.

Do not insert the plain-text password into SQL or any public table.

ERROR HANDLING

Every database operation must:

- check the Supabase error result
- show a clear toast message
- avoid pretending an operation succeeded
- refresh or update UI state only after a successful operation
- disable submit buttons while saving
- prevent duplicate form submissions

CODE QUALITY

- Follow the existing project structure and conventions.
- Use the existing Supabase client.
- Use reusable hooks or service functions for database operations.
- Avoid duplicated queries.
- Regenerate or update Supabase TypeScript types.
- Remove unused imports and old hardcoded admin content.
- Do not install unnecessary libraries.
- Do not modify unrelated public website sections.
- Do not reveal environment-variable values in the response.

FINAL VERIFICATION

After implementation:

1. Apply all Supabase migrations.
2. Confirm all tables exist.
3. Confirm RLS is enabled.
4. Confirm public users cannot modify content.
5. Confirm non-admin authenticated users cannot access admin data.
6. Confirm the admin login page works.
7. Confirm /admin redirects unauthorized users.
8. Confirm pricing data loads from Supabase.
9. Confirm admin pricing edits appear on the public website.
10. Confirm image upload works.
11. Run TypeScript, ESLint and production build checks.
12. Fix all errors related to the changes.
13. List every file changed.
14. List every migration created.
15. Explain the exact final manual steps required to create the first admin account.

Implement the working backend and admin dashboard directly. Do not only provide instructions or mock UI.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3fde663f-2c14-4795-955e-4c3e4fa447b2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
