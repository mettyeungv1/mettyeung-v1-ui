# MYA Website — Basis of Design (BOD) / Technical Specification

> **Version:** 2.0 (Deep Analysis)  
> **Date:** 2026-02-19  
> **Project:** `mettyeung-v1-ui`  
> **Live API:** `https://api.mettyeung27.org/api/v1`  
> **Tech Stack:**  
> - Next.js `15.5.3` (App Router, Server Components + Client Components)  
> - React `18.2.0`, TypeScript `5.2.2`  
> - TailwindCSS `3.4.18`, Framer Motion `10.16.0`  
> - Radix UI (shadcn/ui pattern), Zustand for state  
> - i18n: Custom `useTranslation()` hook + JSON locale files (`locales/en.json`, `km.json`, `ja.json`, `ko.json`)  
> - Auth: NextAuth v5 beta  

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Codebase Deep Analysis](#2-codebase-deep-analysis)
3. [Navigation Changes](#3-navigation-changes)
4. [HOME Page — Detailed Spec](#4-home-page)
5. [ABOUT Page — Detailed Spec](#5-about-page)
6. [STRUCTURE Page — Detailed Spec](#6-structure-page)
7. [ACTIVITY Page — Detailed Spec](#7-activity-page)
8. [VIDEO & CONTACT — No Changes](#8-video--contact)
9. [Translation (i18n) Master List](#9-translation-i18n-master-list)
10. [Code Bugs & Technical Debt Found](#10-code-bugs--technical-debt-found)
11. [Backend API Requirements](#11-backend-api-requirements)
12. [File Change Matrix](#12-file-change-matrix)
13. [Development Phases & Estimates](#13-development-phases--estimates)

---

## 1. Executive Summary

### What the Client Wants

| Page | Status | Key Changes |
|------|--------|-------------|
| **HOME** | 🔄 Update | Update history text, add Membership section, update achievement stats to 70/15/5 |
| **ABOUT > About Us** | 🔄 Update | Update subtitle, replace Vision/Values with Goals + Mission |
| **ABOUT > Structure** | 🔄 Update | Add org summary counts (20/21/6/4/16), add membership breakdown (164/98/170/3) |
| **ABOUT > Our Network** | 🔄 Minor | Update section title, add logo linking to partner websites |
| **ABOUT > MOU** | 🆕 New | New section listing 17 signed MOUs |
| **ACTIVITY** | 🔄 Update | Add sub-nav with 10 categories, add highlight section for Projects/Training/Seminar/Hair |
| **VIDEO** | ✅ Keep | រក្សាទុកដដែរ (Keep as-is) |
| **CONTACT** | ✅ Keep | រក្សាទុកដដែរ (Keep as-is) |

---

## 2. Codebase Deep Analysis

### 2.1 Project Conventions Observed

| Convention | Detail |
|-----------|--------|
| **Component pattern** | Client components use `"use client"` directive. Server components in `app/*/page.tsx` fetch data and pass as props. |
| **Data fetching** | Server components call `service/*-service.ts` functions which use `fetchAPI()` from `lib/api.ts`. |
| **Static data** | Data arrays live in `lib/data/*.ts`, types in `lib/types/*.ts`. |
| **Translation** | All display text uses `t("key.path")` via `useTranslation()`. Keys defined in `locales/*.json`. |
| **Animation** | `framer-motion` for all animations. Shared `AnimatedSection` wrapper in `components/ui/animated-section.tsx`. |
| **UI Components** | shadcn/ui pattern: `Card`, `Badge`, `Button`, `Input` etc. in `components/ui/`. |
| **Image optimization** | Next.js `Image` component with `normalizeUrl()` from `lib/utils/image.ts` for API media. |
| **Styling** | TailwindCSS classes. Custom colors: `khmer-gold`, `khmer-red`, `primary-900`, `accent-600` defined in `tailwind.config.ts`. |

### 2.2 Current Page → Component Mapping

```
HOME (app/page.tsx)
├── HeroCarousel          ← components/hero-carousel.tsx           (API: banners)
├── MissionSection        ← components/home/mission-section.tsx     (i18n: home.ourHistory*)
├── StatsSection          ← components/home/states-section.tsx      (data: lib/data/home.ts → stats[])
├── FeaturesSection       ← components/home/feature-section.tsx     (data: lib/data/home.ts → features[])
└── HomeCTASection        ← components/home/home-cta-section.tsx    (i18n: home.join*)

ABOUT (app/about/page.tsx)
├── AboutHeroSection      ← components/about/about-hero-section.tsx (i18n: about.subtitle, about.badge*)
├── MissionVisionSection  ← components/about/mission-vision-section.tsx → ValueCard (data: lib/data/about.ts)
└── PartnersSection       ← components/about/partner-section.tsx    (API: partners, infinite scroll)

STRUCTURE (app/structure/page.tsx)
├── StructureHero         ← components/structure/strucuture-hero.tsx (stats grid COMMENTED OUT lines 34-75)
├── StructureFilterBar    ← components/structure/structure-filterbar.tsx
└── DepartmentCard[]      ← components/structure/department-card.tsx → PersonCard (API: structures/associations)

ACTIVITY (app/news/page.tsx)
├── PageHero              ← components/gallery/page-hero.tsx
├── Featured News         ← inline in news-page-client.tsx (lines 250-270)
├── NewsFilterSidebar     ← components/news/new-filter-sidebar.tsx  (API: categories)
└── NewsGrid              ← components/news/news-grid.tsx → NewsCard (API: blogs)

VIDEO (app/videos/page.tsx)
└── VideosPageClient      ← components/gallery/videos-page-client.tsx (API: videos, categories)

CONTACT (app/contact/page.tsx)
├── ContactHeroSection    ← components/contact/contact-hero-section.tsx
├── ContactInfoGrid       ← components/contact/contact-info-grid.tsx
├── ContactForm           ← components/contact/contact-from.tsx
└── ContactSidebar        ← components/contact/contact-sidebar.tsx
```

### 2.3 API Endpoints in Use

| Endpoint | Service File | Used By |
|----------|-------------|---------|
| `GET /banners` | `service/banner/banner-service.ts` | Home HeroCarousel |
| `GET /partners?sort=order&page=N&limit=12` | `service/partner/partner-service.ts` | About PartnersSection |
| `GET /blogs?sort=-publishedAt&page=N&limit=12` | `service/blog/blog-service.ts` | Activity/News listing |
| `GET /blogs/:id` | `service/blog/blog-service.ts` | News detail |
| `GET /categories` | `service/category/category-service.ts` | Activity sidebar filter |
| `GET /videos?sort=-createdAt&page=N&limit=12` | `service/video/video-service.ts` | Video page |
| `GET /structures` | `service/structure/structure-service.ts` | Structure member list |
| `GET /structures/associations` | `service/structure/structure-service.ts` | Structure departments |

---

## 3. Navigation Changes

### 3.1 Current Navigation

**File:** `components/layout/header.tsx` lines 30-61

```typescript
const navigation: NavItem[] = [
  { key: "nav.home", href: "/" },
  {
    key: "nav.about", href: "/about",
    submenu: [
      { key: "nav.subMenuAbout", href: "/about" },
      { key: "nav.structure", href: "/structure" },
      { key: "nav.network", href: "/about#network" },
    ],
  },
  { key: "nav.activity", href: "/news" },
  { key: "nav.videos", href: "/videos" },
  { key: "nav.contact", href: "/contact" },
];
```

### 3.2 Required Navigation

```typescript
const navigation: NavItem[] = [
  { key: "nav.home", href: "/" },
  {
    key: "nav.about", href: "/about",
    submenu: [
      { key: "nav.subMenuAbout", href: "/about" },
      { key: "nav.structure", href: "/structure" },
      { key: "nav.network", href: "/about#network" },
      { key: "nav.mou", href: "/about#mou" },           // ← NEW
    ],
  },
  {
    key: "nav.activity", href: "/news",
    submenu: [                                            // ← NEW submenu
      { key: "nav.activityAll", href: "/news" },
      { key: "nav.training", href: "/news?category=training" },
      { key: "nav.upskilling", href: "/news?category=upskilling" },
      { key: "nav.seminar", href: "/news?category=seminar" },
      { key: "nav.social", href: "/news?category=social" },
      { key: "nav.hairSalon", href: "/news?category=hair-salon" },
      { key: "nav.rideForMY", href: "/news?category=ride" },
      { key: "nav.wellbeing", href: "/news?category=wellbeing" },
      { key: "nav.meeting", href: "/news?category=meeting" },
      { key: "nav.other", href: "/news?category=other" },
    ],
  },
  { key: "nav.videos", href: "/videos" },
  { key: "nav.contact", href: "/contact" },
];
```

### 3.3 Developer Notes — Activity Sub-nav URL Handling

The existing `NewsPageClient` (line 37) already reads `searchParams.get("category")`. However, the current filtering passes `categoryId` to the API. The incoming URL `?category=training` provides a slug, **not an ID**.

**Resolution options:**
1. **(Recommended)** Change the nav links to use actual category IDs from the DB instead of slugs. This requires fetching category IDs first.
2. Map slugs to IDs in the `NewsPageClient` component.
3. Update the backend `GET /blogs` endpoint to support filtering by category slug as well as ID.

> ⚠️ **IMPORTANT**: The `news-page-client.tsx` line 123 sends `params.categoryId = selectedSubCategory || selectedCategory`. If the header sends a **slug** string like `"training"`, this will NOT be a valid category ID for the backend.  
> **Developer must coordinate with backend** to determine the correct approach.

### 3.4 Footer Update

**File:** `components/layout/footer.tsx` lines 24-50

The `footerColumns` array should be updated to include Activity sub-links and the MOU link. Currently:
```typescript
const footerColumns = [
  { titleKey: "footer.quickLinks", links: [
    { nameKey: "nav.home", href: "/" },
    { nameKey: "nav.about", href: "/about" },
    { nameKey: "nav.structure", href: "/structure" },
    { nameKey: "nav.videos", href: "/videos" },
  ]},
  { titleKey: "nav.news", links: [
    { nameKey: "nav.latestNews", href: "/news" },
    { nameKey: "nav.events", href: "/news?category=events" },
  ]},
];
```

**Update to:**
```typescript
const footerColumns = [
  { titleKey: "footer.quickLinks", links: [
    { nameKey: "nav.home", href: "/" },
    { nameKey: "nav.about", href: "/about" },
    { nameKey: "nav.structure", href: "/structure" },
    { nameKey: "nav.mou", href: "/about#mou" },        // ADD
    { nameKey: "nav.videos", href: "/videos" },
  ]},
  { titleKey: "nav.activity", links: [                   // RENAME from nav.news
    { nameKey: "nav.activityAll", href: "/news" },       // UPDATE
    { nameKey: "nav.training", href: "/news?category=training" },
    { nameKey: "nav.seminar", href: "/news?category=seminar" },
    { nameKey: "nav.hairSalon", href: "/news?category=hair-salon" },
  ]},
];
```

---

## 4. HOME Page

### 4.1 Section Order (Current → Proposed)

```
CURRENT                         PROPOSED
─────────                       ────────
1. HeroCarousel       ✅ keep   1. HeroCarousel
2. MissionSection     🔄 text   2. MissionSection (updated text)
3. StatsSection       🔄 data   3. MembershipSection ← NEW
4. FeaturesSection    ✅ keep   4. StatsSection (updated values)
5. HomeCTASection     ✅ keep   5. FeaturesSection
                                6. HomeCTASection
```

### 4.2 `app/page.tsx` — Updated

```tsx
// CURRENT (line 1-28):
import { MissionSection } from "@/components/home/mission-section";
import { StatsSection } from "@/components/home/states-section";
import { FeaturesSection } from "@/components/home/feature-section";
import { HomeCTASection } from "@/components//home/home-cta-section";

// ADD:
import { MembershipSection } from "@/components/home/membership-section";

// RENDER ORDER UPDATE:
<HeroCarousel banners={banners} />
<MissionSection />
<MembershipSection />     {/* ← NEW: inserted here */}
<StatsSection />
<FeaturesSection />
<HomeCTASection />
```

### 4.3 MissionSection — Translation Update Only

**File:** `components/home/mission-section.tsx`  
**No code changes.** Only update `locales/en.json`:

```json
"home.ourHistoryDetail": "Mett Yeung Association (MYA) is a private association that was established on December 2, 2020, under the initiative of 27 founding members. The 27 founding members jointly prepared and drafted the statutes, internal regulations, and rules, focusing on Improving Living Standards, Knowledge, Job Opportunities, and Business, which are the welfare of Cambodian society. The association received legal registration with the Ministry of Interior through Prakas No. 245, dated January 27, 2021, as a \"Legal Entity.\""
```

### 4.4 NEW: `components/home/membership-section.tsx`

**Purpose:** Display membership eligibility + 4 membership type cards.

**Data definition** — add to `lib/data/home.ts`:
```typescript
import { Star, Award, Users, Heart } from "lucide-react";

export interface MembershipType {
  titleKey: string;
  descriptionKey: string;
  icon: LucideIcon;
  color: string;     // gradient for icon bg
}

export const membershipTypes: MembershipType[] = [
  {
    titleKey: "home.membership.founding",
    descriptionKey: "home.membership.foundingDesc",
    icon: Star,
    color: "from-amber-500 to-amber-600",
  },
  {
    titleKey: "home.membership.honorary",
    descriptionKey: "home.membership.honoraryDesc",
    icon: Award,
    color: "from-purple-500 to-purple-600",
  },
  {
    titleKey: "home.membership.active",
    descriptionKey: "home.membership.activeDesc",
    icon: Users,
    color: "from-blue-500 to-blue-600",
  },
  {
    titleKey: "home.membership.supporting",
    descriptionKey: "home.membership.supportingDesc",
    icon: Heart,
    color: "from-green-500 to-green-600",
  },
];
```

**Also add type to `lib/types/home.ts`:**
```typescript
export interface MembershipType {
  titleKey: string;
  descriptionKey: string;
  icon: LucideIcon;
  color: string;
}
```

**Component template** (`components/home/membership-section.tsx`):
```tsx
"use client";

import { useTranslation } from "@/lib/i18n";
import { membershipTypes } from "@/lib/data/home";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Card, CardContent } from "@/components/ui/card";

export function MembershipSection() {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            {t("home.membershipTitle")}
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed text-start md:text-justify">
            {t("home.membershipIntro")}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {membershipTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <AnimatedSection key={type.titleKey} delay={index * 0.1}>
                <Card className="h-full text-center hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {t(type.titleKey)}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {t(type.descriptionKey)}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

### 4.5 StatsSection — Data Update

**File:** `lib/data/home.ts` — replace `stats` array (lines 12-41):

| Current | New |
|---------|-----|
| `stats.members` / 430 | `stats.members` / 435 |
| `stats.projects` / 72 | `stats.socialActivities` / 70 |
| `stats.training` / 12 | `stats.upskilling` / 15 |
| `stats.beneficiaries` / 10000 | `stats.trainingECI` / 5 |

**Component `states-section.tsx`** — No code change needed. It iterates `stats.map()` dynamically.

**`MetricCard` component** (`components/ui/metric-card.tsx`) — No change needed. Uses `AnimatedNumber` for count-up animation. Note: `description` prop rendering is currently **commented out** (line 72). This is fine.

---

## 5. ABOUT Page

### 5.1 Section Order (Current → Proposed)

```
CURRENT                             PROPOSED
─────────                           ────────
1. AboutHeroSection     🔄 text     1. AboutHeroSection (updated subtitle)
2. MissionVisionSection 🔄 data     2. GoalsMissionSection (was MissionVision, now 2 cards)
3. PartnersSection      🔄 minor    3. PartnersSection (keep, update title + add linking)
                                    4. MOUSection ← NEW
```

### 5.2 AboutHeroSection — Translation Only

**File:** `components/about/about-hero-section.tsx`  
**No code changes.** Update `locales/en.json` → `about.subtitle`:

```json
"about.subtitle": "Mett Yeung is a private non-profit legal entity established with the aim of strengthening friendship, solidarity, loyalty and building a support network between self-employed or self-employed workers, technical experts, service workers and other business practitioners both domestically and internationally, as well as improving the standard of living, job opportunities and business cooperation with relevant parties who have similar objectives."
```

### 5.3 MissionVisionSection → Goals + Mission

**File:** `lib/data/about.ts` — Replace `missionVisionValues` (lines 15-37):

**Current:** 3 items (Mission, Vision, Values)  
**New:** 2 items (Goals, Mission)

```typescript
import { Target, Rocket } from "lucide-react";

export const missionVisionValues: ValueItem[] = [
  {
    icon: Target,
    titleKey: "about.goals.title",
    descriptionKey1: "about.goals.desc1",
    borderColor: "border-l-blue-500",
    iconColor: "text-indigo-500",
  },
  {
    icon: Rocket,
    titleKey: "about.mission.title",
    descriptionKey1: "about.mission.desc1",
    borderColor: "border-l-blue-500",
    iconColor: "text-amber-500",
  },
];
```

**⚠️ IMPORTANT — ValueCard Bullet Point Problem:**

The "Our Goals" content has 4 bullet points. The current `ValueCard` (`components/about/value-card.tsx` line 23-25) renders `descriptionKey1` as a single `<span>`:

```tsx
<p className="text-gray-600 leading-relaxed space-y-4">
  <span>{t(item.descriptionKey1)}</span>
</p>
```

**This WILL NOT render bullet points correctly.** Developer must choose one approach:

**Option A — Extend ValueItem type** (Recommended):

Add `listItems?: string[]` to `ValueItem` in `lib/types/about.ts`:
```typescript
export interface ValueItem {
  icon: React.ElementType;
  titleKey: string;
  descriptionKey1: string;
  listItemKeys?: string[];    // ← NEW
  borderColor: string;
  iconColor: string;
}
```

Update `value-card.tsx` to render:
```tsx
{item.listItemKeys && (
  <ul className="list-disc list-inside space-y-2 text-gray-600 mt-4">
    {item.listItemKeys.map(key => (
      <li key={key}>{t(key)}</li>
    ))}
  </ul>
)}
```

Then in `lib/data/about.ts` for goals:
```typescript
{
  icon: Target,
  titleKey: "about.goals.title",
  descriptionKey1: "about.goals.intro",
  listItemKeys: [
    "about.goals.item1",
    "about.goals.item2",
    "about.goals.item3",
    "about.goals.item4",
  ],
  borderColor: "border-l-blue-500",
  iconColor: "text-indigo-500",
}
```

**Option B — Use `\n•` in translation string** (Quick but hacky):

Set `about.goals.desc1` with newlines and render with `whitespace-pre-line` CSS.

### 5.4 PartnersSection — Minor Updates

**File:** `components/about/partner-section.tsx`

Change 1: Update title translation key value:
```json
"about.partner.title": "Our Network"   // was "Our Friends Network"
```

Change 2: **Add external linking to partner logos** (lines 113-127). Requires backend to add `websiteUrl` field to Partner entity.

**Current rendering (line 116-122):**
```tsx
<Image src={partner.media?.url || "/my-cut.png"} ... />
```

**Updated rendering:**
```tsx
{partner.websiteUrl ? (
  <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer">
    <Image src={partner.media?.url || "/my-cut.png"} ... />
  </a>
) : (
  <Image src={partner.media?.url || "/my-cut.png"} ... />
)}
```

**Type update** — `lib/types/partner.ts`:
```typescript
export interface Partner {
  id: string;
  order: number;
  websiteUrl?: string | null;    // ← ADD
  createdAt: string | Date;
  updatedAt: string | Date;
  media: PartnerMedia | null;
}
```

### 5.5 NEW: MOU Section

**Files to create:**
1. `lib/data/mou.ts` — MOU data array
2. `components/about/mou-section.tsx` — Render component

**Parent integration** — `app/about/page.tsx` (line 22-29):

```tsx
// ADD import:
import { MOUSection } from "@/components/about/mou-section";

// ADD after PartnersSection:
<section id="mou" className="scroll-mt-24">
  <MOUSection />
</section>
```

**Data file: `lib/data/mou.ts`:**
```typescript
export interface MOUItem {
  id: number;
  partnerNameKey: string;
  cooperationKey: string;
}

export const mouList: MOUItem[] = [
  { id: 1,  partnerNameKey: "mou.partner.aspire",   cooperationKey: "mou.coop.training" },
  { id: 2,  partnerNameKey: "mou.partner.coffee",   cooperationKey: "mou.coop.training" },
  { id: 3,  partnerNameKey: "mou.partner.yeac",     cooperationKey: "mou.coop.training" },
  { id: 4,  partnerNameKey: "mou.partner.dham",     cooperationKey: "mou.coop.training" },
  { id: 5,  partnerNameKey: "mou.partner.rma",      cooperationKey: "mou.coop.training" },
  { id: 6,  partnerNameKey: "mou.partner.nil",      cooperationKey: "mou.coop.training" },
  { id: 7,  partnerNameKey: "mou.partner.digi",     cooperationKey: "mou.coop.training" },
  { id: 8,  partnerNameKey: "mou.partner.hfc",      cooperationKey: "mou.coop.training" },
  { id: 9,  partnerNameKey: "mou.partner.ctcr",     cooperationKey: "mou.coop.wellbeing" },
  { id: 10, partnerNameKey: "mou.partner.iit",      cooperationKey: "mou.coop.training" },
  { id: 11, partnerNameKey: "mou.partner.westline", cooperationKey: "mou.coop.training" },
  { id: 12, partnerNameKey: "mou.partner.oudong",   cooperationKey: "mou.coop.transport" },
  { id: 13, partnerNameKey: "mou.partner.ceta",     cooperationKey: "mou.coop.electronics" },
  { id: 14, partnerNameKey: "mou.partner.cita",     cooperationKey: "mou.coop.training" },
  { id: 15, partnerNameKey: "mou.partner.akhlem",   cooperationKey: "mou.coop.training" },
  { id: 16, partnerNameKey: "mou.partner.cra",      cooperationKey: "mou.coop.training" },
  { id: 17, partnerNameKey: "mou.partner.mycut",    cooperationKey: "mou.coop.media" },
];
```

(See §9 for full translation keys)

---

## 6. STRUCTURE Page

### 6.1 Current State Analysis

**`components/structure/strucuture-hero.tsx`** (NOTE: filename has typo — `strucuture`):
- Lines 34-75 contain a **stats grid that is entirely commented out**.
- It was designed to show counts (departmentCount, totalMembers, 6 Years, 25+ Projects).

**`components/structure/structure-page-client.tsx`**:
- Uses API data from `GET /structures/associations` rendered through `DepartmentCard`.
- Has `departmentStylingMap` (lines 29-81) with 6 department types: Honorary Member, Executive Committee, Board of Directors, Senior Advisors, Association Branches, Board Director.

### 6.2 Required Changes

#### A. Restore & Update StructureHero Stats

**File:** `components/structure/strucuture-hero.tsx`  
**Action:** Uncomment lines 34-75 and update values to match client requirements:

| Stat | Value | Color |
|------|-------|-------|
| Board of Directors | 20 | `text-khmer-gold` |
| Senior Advisors | 21 | `text-khmer-red` |
| Executive Committee | 6 | `text-blue-600` |
| Honorary Members | 4 | `text-purple-600` |
| Branches | 16 | `text-green-600` |

The dev needs to expand from 4 stats to 5 stats in the grid. Change `grid-cols-2 md:grid-cols-4` to `grid-cols-2 md:grid-cols-5`.

#### B. NEW: Membership Summary Section

Add a new section below the hero OR inside `structure-page-client.tsx` (before the Organizational Chart heading at line 173).

**Summary counts to display:**

| Label | Count | Translation Key |
|-------|-------|-----------------|
| Public Sector | 164 | `structure.membership.public` |
| Private Sector | 98 | `structure.membership.private` |
| Hairdressers | 170 | `structure.membership.hairdressers` |
| Associations | 3 | `structure.membership.associations` |

**Recommended implementation:** Create `components/structure/membership-summary.tsx` using the same `MetricCard` component from `components/ui/metric-card.tsx` (4-card grid).

**Insert point in `structure-page-client.tsx`:**
```tsx
// After line 170 (StructureFilterBar), before line 171 (section py-16)
<MembershipSummary />
```

**Note:** The `structure.membership.*` counts are STATIC numbers provided by the client. If the client wants these to be dynamic from the API in the future, a new endpoint would be needed.

---

## 7. ACTIVITY Page

### 7.1 Current Architecture Deep Dive

The Activity page (`/news`) uses a **blog-based architecture**:

```
app/news/page.tsx (Server Component)
  ├── Fetches: listBlogsService() + listCategoriesService()
  ├── normalizes image URLs
  └── Passes to: NewsPageClient

NewsPageClient (Client Component - 313 lines)
  ├── State: searchTerm, selectedCategory, selectedSubCategory, posts[], page, hasMore
  ├── URL sync: reads/writes ?q=, ?category=, ?subCategory= params
  ├── Filter flow: handleSearchChange → updateUrl → useEffect → listBlogsService()
  ├── Infinite scroll: IntersectionObserver → loadMorePosts()
  └── Renders:
      ├── PageHero (title from t("nav.news"), subtitle from t("events.heroDescription"))
      ├── Featured News section (if any isFeatured posts)
      ├── Sidebar (NewsFilterSidebar - search + categories + recent)
      └── Grid (NewsGrid → NewsCard[])
```

**Key insight:** Categories come from `GET /categories` API. The `mapToUICategories()` function in `service/category/category-service.ts` maps them to `UICategory[]` with parent/child hierarchy. The `NewsFilterSidebar` renders parent categories with expandable subcategories.

### 7.2 Required: Activity Highlights Section

The client wants a **highlighted overview** above the blog feed showing:

| Highlight | Items | Content |
|-----------|-------|---------|
| **Projects** | 6 | Upskill Training, Enhancing Productivity (NIL+RMA), MEP, F&B, ECI, Well-Being |
| **Training** | 2 | JUNO Academy K-Trendy, T.E.A.M.S. cooling equipment |
| **Seminar** | 6 | With dates, topics, speakers, venue (NTTI). 434 total participants |
| **Hair & Salon** | 70 | "Organized 70 Hair and Salon for Mett Yeung" |

**Implementation:**

Create `components/news/activity-highlights.tsx`:
- Use Radix `Tabs` component (`@radix-ui/react-tabs`, already in package.json) for 4 tabs
- Each tab displays its content as cards/list

Create `lib/data/activity.ts` and `lib/types/activity.ts` for static data.

**Seminar data structure:**
```typescript
export interface Seminar {
  id: number;
  date: string;         // "2025-03-22"
  topicKey: string;     // translation key
  speakerKey: string;   // translation key
  venue: string;        // "NTTI"
}

export const seminars: Seminar[] = [
  {
    id: 1,
    date: "2025-03-22",
    topicKey: "activity.seminar.topic1",
    speakerKey: "activity.seminar.speaker1",
    venue: "NTTI",
  },
  // ... 5 more
];
```

**Insert point in `news-page-client.tsx` or `app/news/page.tsx`:**
```tsx
// After PageHero, before Featured News section
<ActivityHighlights />
```

### 7.3 Category Filtering — Backend Coordination

The 10 activity sub-categories in the nav need to exist in the backend `categories` table. The `NewsFilterSidebar` already renders all categories from the API dynamically. So once backend adds these categories, they will automatically appear in the sidebar.

**For the nav header dropdown:** The links use `?category=slug` format. The developer needs to handle this:

**In `news-page-client.tsx`, the initial category is read from URL (line 37):**
```typescript
const initialCategory = searchParams.get("category") || "all";
```

This value is then used in API filtering (line 123):
```typescript
params.categoryId = selectedSubCategory || selectedCategory;
```

**Problem:** `selectedCategory` will be a slug like `"training"` from the URL, but the API expects a UUID category ID.

**Solution:** Add a slug-to-ID mapping in `news-page-client.tsx`:
```typescript
// After categories are loaded (useEffect, line 69-79):
useEffect(() => {
  if (Array.isArray(initialCategories)) {
    const uiCats = mapToUICategories(initialCategories, ...);
    setCategories(uiCats);
    
    // Resolve URL slug to category ID
    const urlCategory = searchParams.get("category");
    if (urlCategory && urlCategory !== "all") {
      const matchedCat = uiCats.find(c => 
        c.name_en.toLowerCase().replace(/\s+/g, "-") === urlCategory
      );
      if (matchedCat) {
        setSelectedCategory(matchedCat.id);
      }
    }
  }
}, [initialCategories, initialPosts]);
```

---

## 8. VIDEO & CONTACT

**Both pages are marked រក្សាទុកដដែរ (Keep as-is).** No changes required.

- `app/videos/page.tsx` — Fetches videos from API, renders via `VideosPageClient`
- `app/contact/page.tsx` — Static page with form, sidebar, hero

---

## 9. Translation (i18n) Master List

### New Keys for `locales/en.json`

```json
{
  "nav.mou": "MOU",
  "nav.activityAll": "All",
  "nav.training": "Training",
  "nav.upskilling": "Upskilling",
  "nav.seminar": "Seminar",
  "nav.social": "Social",
  "nav.hairSalon": "Hair and Salon",
  "nav.rideForMY": "Ride for Mettyeung",
  "nav.wellbeing": "Well Being",
  "nav.meeting": "Meeting",
  "nav.other": "Other",
  
  "home.membershipTitle": "MYA Membership",
  "home.membershipIntro": "MYA Membership Including: Organizations, Associations, Federations, and other Legal Entities registered in accordance with the laws of the Kingdom of Cambodia and engage with activities related to self-employment, technical, service workers, and other business practitioners both domestically and, or individuals aged 18 years and older, may apply to become members of the association. Members who are legal entities or individuals may become members of the MYA by applying for membership and are recognized as members of the association through the agreement of the Chairman of the Executive Committee.",
  "home.membership.founding": "Founding Members",
  "home.membership.foundingDesc": "Active members who initiated the establishment of the MYA",
  "home.membership.honorary": "Honorary Members",
  "home.membership.honoraryDesc": "Members who have supported the activities of the MYA",
  "home.membership.active": "Active Members",
  "home.membership.activeDesc": "Members who actively participate in activities for the MYA",
  "home.membership.supporting": "Supporting Members",
  "home.membership.supportingDesc": "Members who are not in the three membership categories and support all activities of the MYA",
  
  "stats.socialActivities": "Social Activities",
  "stats.upskilling": "Upskilling",
  "stats.trainingECI": "Training (ECI)",
  "home.socialActivitiesDesc": "Social activities completed as of February 2026",
  "home.upskillingDesc": "Upskilling programs delivered",
  "home.trainingECIDesc": "Ecosystem of Incubator (ECI) training programs",

  "about.goals.title": "Our Goals",
  "about.goals.intro": "Mett Yeung has the following goals:",
  "about.goals.item1": "Gathering people who work or earn their own money, technical experts, service workers and other business practitioners both domestically and internationally",
  "about.goals.item2": "Providing support, sharing experiences, Job opportunities, consulting and training to members",
  "about.goals.item3": "Seeking support from relevant parties and participating to building a business support network",
  "about.goals.item4": "Representing and protecting the interests of MYA members",
  "about.mission.desc1": "Compiling networking, gathering members together to form interest groups according to their interests to foster better relationships, provide support, share experiences, provide job opportunities, consulting and provide training in various skills.",

  "mou.title": "Memorandum of Understanding (MOU)",
  "mou.subtitle": "Mett Yeung has signed the MOU with institutions and private companies for cooperation on professional training and technical skills.",
  "mou.prefix": "MOU between MYA and",
  "mou.coop.training": "to cooperation on Training and Human Resource Development",
  "mou.coop.wellbeing": "to cooperation on promoting mental well-being",
  "mou.coop.transport": "to Cooperation on Providing Transportation Services for Training and Humanitarian Activities",
  "mou.coop.electronics": "to Cooperation on Training and Human Resource for Development in the Electronics and Technology Field",
  "mou.coop.media": "to Cooperation on Providing Photo and Video Production Services for Training Activities and Charity Events",
  "mou.partner.aspire": "Aspire Design Academy Company",
  "mou.partner.coffee": "Coffee Co., Ltd.",
  "mou.partner.yeac": "the Young Entrepreneurs Association of Cambodia",
  "mou.partner.dham": "Dham Computer International Company",
  "mou.partner.rma": "RMA (Cambodia) Co., Ltd.",
  "mou.partner.nil": "the National Institute of Labor",
  "mou.partner.digi": "Digi Academy",
  "mou.partner.hfc": "HFC (Cambodia) Microfinance Company Limited",
  "mou.partner.ctcr": "the Center for Trauma Care and Research",
  "mou.partner.iit": "the Institute of Industrial Technology",
  "mou.partner.westline": "Westline Education Group",
  "mou.partner.oudong": "the Company of Oudong Express",
  "mou.partner.ceta": "the Cambodia Electronics and Technology Association",
  "mou.partner.cita": "the Cambodia Institute of Technology and Agriculture",
  "mou.partner.akhlem": "Akhlem (Cambodia) Co., Ltd.",
  "mou.partner.cra": "Cambodia Restaurant Association",
  "mou.partner.mycut": "Mycut Firm Co., Ltd.",

  "structure.summary.bod": "Board of Directors",
  "structure.summary.advisors": "Senior Advisors",
  "structure.summary.executive": "Executive Committee",
  "structure.summary.honorary": "Honorary Members",
  "structure.summary.branches": "Branches",
  "structure.membership.title": "Our Membership",
  "structure.membership.public": "Public Sector",
  "structure.membership.private": "Private Sector",
  "structure.membership.hairdressers": "Hairdressers",
  "structure.membership.associations": "Associations",

  "activity.highlights.title": "Activity Highlights",
  "activity.tab.projects": "Projects",
  "activity.tab.training": "Training",
  "activity.tab.seminar": "Seminars",
  "activity.tab.hairSalon": "Hair & Salon",
  "activity.seminar.totalParticipants": "Total Participants",
  "activity.hairSalon.count": "Hair and Salon events organized",
  "activity.seminar.topic1": "The 7 Habits of Highly Effective People",
  "activity.seminar.speaker1": "Oknha Pech Bolen and Ms. Nut Clara",
  "activity.seminar.topic2": "Measuring Work Results: Key Performance Indicators (KPIs)",
  "activity.seminar.speaker2": "Ms. Yu Bory",
  "activity.seminar.topic3": "Networking Like a Pro: Building Relationships That Boost Your Career",
  "activity.seminar.speaker3": "Ms. Lim Hung",
  "activity.seminar.topic4": "Life's Balance",
  "activity.seminar.speaker4": "Oknha Pech Bolen",
  "activity.seminar.topic5": "Artificial Intelligence Skills for Everyone, Level 1",
  "activity.seminar.speaker5": "Mr. Hean Sopheap",
  "activity.seminar.topic6": "Improving Effectiveness in Leadership and Communication Based on Human Behavior: DISC",
  "activity.seminar.speaker6": "Ms. Yu Borey"
}
```

### Keys to UPDATE (existing keys with new values)

```json
{
  "home.ourHistoryDetail": "(see §4.3 for full text)",
  "home.achievementsDesc": "Through all activities, MYA has provided support and improved the Standard of Living, Job and Business Opportunities of Self-Employed, workers, technical, service workers and other business practitioners both domestically and internationally.",
  "about.subtitle": "(see §5.2 for full text)",
  "about.mission.title": "Our Mission",
  "about.partner.title": "Our Network"
}
```

> ⚠️ **REMINDER:** All new/updated keys must be mirrored in `km.json` (Khmer), `ja.json`, and `ko.json` with appropriate translations.

---

## 10. Code Bugs & Technical Debt Found

During deep analysis, I identified the following issues:

| # | File | Line | Issue | Severity |
|---|------|------|-------|----------|
| 1 | `components/structure/strucuture-hero.tsx` | filename | **Typo in filename**: "strucuture" should be "structure" | Low (but confusing) |
| 2 | `app/page.tsx` | 6 | **Double slash**: `@/components//home/home-cta-section` | Low (works but messy) |
| 3 | `components/structure/department-card.tsx` | 29-64 | **Duplicate CardHeader** nesting and **duplicate description** rendering (lines 56-58 AND 61-63) | Medium (visual bug) |
| 4 | `components/news/news-grid.tsx` | 32 | **Hardcoded English**: "All News" should use `t()` | Low |
| 5 | `components/news/news-grid.tsx` | 92, 95 | **Hardcoded English**: "No News Found", "Please try..." should use `t()` | Low |
| 6 | `components/news/new-filter-sidebar.tsx` | 63, 67 | **Hardcoded English**: "Search", "Search news..." should use `t()` | Low |
| 7 | `components/news/news-card.tsx` | 63 | **Hardcoded author**: Always shows "Mettyeung27" instead of actual author name | Low |
| 8 | `components/structure/structure-filterbar.tsx` | 46 | **Hardcoded English**: "All Departments" should use `t()` | Low |
| 9 | `lib/data/structure.ts` | 1-130 | **Legacy static data**: Uses `generateMembers()` for fake member data. Currently unused (live API data from `structure-service.ts` is used instead). Can be deleted or archived. | Low |
| 10 | `lib/data/about.ts` | 39-42 | **Legacy partners array**: `partners: Partner[]` with hardcoded 2 items. Unused since `PartnersSection` uses API. Can be deleted. | Low |
| 11 | `components/ui/metric-card.tsx` | 72 | **Commented-out description**: `{/* <p className="text-gray-500 text-sm">{description}</p> */}` — description data is passed but never rendered | Low |

---

## 11. Backend API Requirements

| # | Endpoint | Change | Priority | Needed For |
|---|----------|--------|----------|------------|
| 1 | `GET /categories` | Ensure **10 categories** exist: Training, Upskilling, Seminar, Social, Hair and Salon, Ride for Mettyeung, Well Being, Meeting, Other, (plus existing ones) | **HIGH** | Activity sub-nav and filtering |
| 2 | `GET /partners` | Add **`websiteUrl`** field to Partner entity response | Medium | Partner logo linking |
| 3 | `GET /partners` | Ensure all **29 partner** logos are uploaded | Medium | Our Network section |
| 4 | Blog CMS | Enter highlighted activities (6 seminars, 5 projects, 2 trainings, 70 hair/salon events) as blog posts with correct categories | Medium | Activity page content |
| 5 | `GET /blogs` | Support filtering by category **slug** in addition to ID (or provide a `GET /categories/by-slug/:slug` endpoint) | Medium | Nav dropdown → category filtering |

---

## 12. File Change Matrix

### Files to CREATE (6 files)

| # | File Path | Type | Est. LOC |
|---|-----------|------|----------|
| 1 | `components/home/membership-section.tsx` | React Client Component | ~60 |
| 2 | `components/about/mou-section.tsx` | React Client Component | ~50 |
| 3 | `components/news/activity-highlights.tsx` | React Client Component | ~120 |
| 4 | `components/structure/membership-summary.tsx` | React Client Component | ~50 |
| 5 | `lib/data/mou.ts` | Static Data | ~40 |
| 6 | `lib/data/activity.ts` + `lib/types/activity.ts` | Static Data + Types | ~80 |

### Files to MODIFY (14 files)

| # | File Path | Change Scope |
|---|-----------|-------------|
| 1 | `components/layout/header.tsx` | Add MOU submenu + Activity submenu (lines 30-61) |
| 2 | `components/layout/footer.tsx` | Update `footerColumns` (lines 24-50) |
| 3 | `app/page.tsx` | Import + render `MembershipSection` |
| 4 | `app/about/page.tsx` | Import + render `MOUSection` |
| 5 | `components/structure/strucuture-hero.tsx` | Uncomment + update stats grid (lines 34-75) |
| 6 | `components/structure/structure-page-client.tsx` | Insert `MembershipSummary` before org chart |
| 7 | `components/about/value-card.tsx` | Add bullet-point list rendering |
| 8 | `components/about/partner-section.tsx` | Add external link wrapping for logos |
| 9 | `components/news/news-page-client.tsx` | Add `ActivityHighlights`, handle slug→ID mapping |
| 10 | `lib/data/home.ts` | Update `stats[]`, add `membershipTypes[]` |
| 11 | `lib/data/about.ts` | Update `missionVisionValues[]` from 3 → 2 items |
| 12 | `lib/types/home.ts` | Add `MembershipType` interface |
| 13 | `lib/types/about.ts` | Add `listItemKeys?` to `ValueItem` |
| 14 | `lib/types/partner.ts` | Add `websiteUrl?` field |

### Locale files to UPDATE (5 files)

| File | Scope |
|------|-------|
| `locales/en.json` | ~70 new/updated keys (see §9 for full list) |
| `locales/km.json` | Khmer translations for all new keys |
| `locales/ja.json` | Japanese translations (lower priority) |
| `locales/ko.json` | Korean translations (lower priority) |

### Files — NO CHANGE

| File | Reason |
|------|--------|
| `components/hero-carousel.tsx` | Banner from API ✅ |
| `components/home/home-cta-section.tsx` | Content OK ✅ |
| `components/home/feature-section.tsx` | Content OK ✅ |
| `components/home/feature-card.tsx` | UI wrapper ✅ |
| `components/about/about-hero-section.tsx` | Only i18n text change ✅ |
| `components/about/glowing-card.tsx` | UI wrapper ✅ |
| All `components/ui/*` | Shared primitives ✅ |
| `app/videos/page.tsx` | រក្សាទុកដដែរ ✅ |
| `app/contact/page.tsx` | រក្សាទុកដដែរ ✅ |
| All `service/*.ts` | No API change needed (frontend side) ✅ |
| `middleware.ts` | Auth routing, unrelated ✅ |
| `auth.ts` | Unrelated ✅ |

---

## 13. Development Phases & Estimates

### Phase 1 — Translation & Data Updates (Day 1)

| Task | Files | Time |
|------|-------|------|
| Add all new keys to `en.json` | 1 file | 2h |
| Add Khmer translations to `km.json` | 1 file | 3h |
| Update `lib/data/home.ts` (stats + membershipTypes) | 1 file | 30m |
| Update `lib/data/about.ts` (goals + mission) | 1 file | 30m |
| Create `lib/data/mou.ts` | 1 file | 30m |
| Create `lib/data/activity.ts` + `lib/types/activity.ts` | 2 files | 1h |
| Update `lib/types/home.ts`, `about.ts`, `partner.ts` | 3 files | 30m |

### Phase 2 — New Components (Day 2-3)

| Task | Files | Time |
|------|-------|------|
| Create `MembershipSection` + integrate in `page.tsx` | 2 files | 2h |
| Create `MOUSection` + integrate in `about/page.tsx` | 2 files | 2h |
| Update `ValueCard` for list items | 1 file | 1h |
| Restore StructureHero stats + create `MembershipSummary` | 2 files | 3h |
| Create `ActivityHighlights` with tabs | 1 file | 4h |

### Phase 3 — Navigation & Integration (Day 4)

| Task | Files | Time |
|------|-------|------|
| Update `header.tsx` nav array | 1 file | 1h |
| Update `footer.tsx` columns | 1 file | 30m |
| Handle Activity category slug→ID in `news-page-client.tsx` | 1 file | 2h |
| Partner logo linking in `partner-section.tsx` (after backend) | 1 file | 1h |

### Phase 4 — QA & Polish (Day 5)

| Task | Detail |
|------|--------|
| Responsive testing | All new sections on mobile/tablet/desktop |
| i18n verification | Switch all 5 languages, verify keys render |
| Cross-browser | Chrome, Safari, Firefox |
| Animation review | Entrance/exit transitions on new components |
| Fix identified bugs (§10) | Optional but recommended |

---

**Total Estimated Effort: 5-7 working days** (1 frontend developer)  
**Backend dependency: 1-2 days** (categories + partner websiteUrl)

---

*End of Document — v2.0*
