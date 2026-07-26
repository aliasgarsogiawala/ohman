# ROLE

You are a Senior Product Designer, Senior React Native Engineer, Senior Frontend Engineer, UI Architect and UX Designer.

Your task is to build a complete high-fidelity prototype for a Product Catalogue Platform consisting of:

1. React Native Mobile Application (Expo)
2. React Web Dashboard (CMS)

The final product should look like something a modern startup would present to investors or enterprise clients.

DO NOT build a generic CRUD application.

DO NOT use generic templates.

DO NOT use Material UI looking components.

Everything must feel custom designed.

────────────────────────────────────────

# VERY IMPORTANT

I have attached a UI reference image.

THIS IMAGE IS THE PRIMARY DESIGN REFERENCE.

Analyze the attached image thoroughly and use it as the inspiration for every screen.

DO NOT copy it exactly.

Instead, recreate the same visual language and improve it.

Maintain the same:

• Overall layout
• Typography scale
• Card style
• Sidebar style
• Navigation
• Product cards
• Dashboard structure
• Mobile layouts
• Color balance
• Brutalist design language
• Editorial composition
• Visual hierarchy

The final design should feel inspired by the reference but original.

────────────────────────────────────────

# DESIGN LANGUAGE

The application should look like a mix of

Nike

Nothing

Supreme

Off White

Apple

Framer

Linear

Acne Studios

COS

Modern fashion catalogues

Neo Brutalism

Editorial Design

Modern SaaS

Gen Z UI

Luxury Streetwear

Everything should look bold, minimal, premium and memorable.

────────────────────────────────────────

# DESIGN STYLE

Dark UI

Very bold typography

Large headlines

Huge product images

Thick borders

Sharp shadows

Bright accent colors

Editorial layouts

Large spacing

Rounded corners

Minimal color palette

Clean grid

Strong hierarchy

Large CTA buttons

Premium animations

Absolutely NO gradients everywhere.

Flat colors only.

────────────────────────────────────────

# COLOR PALETTE

Background

#0B0B0B

Cards

#171717

Primary

#D9FF3F

Secondary

#7C3AED

White

#FFFFFF

Gray

#9CA3AF

Success

#7CFC7C

Danger

#FF4D6D

────────────────────────────────────────

# TYPOGRAPHY

Use fonts similar to

Bebas Neue

Anton

Cabinet Grotesk

General Sans

Space Grotesk

Satoshi

Clash Display

Use large uppercase headings.

Use oversized titles.

Create a strong visual hierarchy.

The typography itself should become a design element.

────────────────────────────────────────

# TECH STACK

MOBILE

React Native

Expo

TypeScript

Expo Router

NativeWind

React Native Reanimated

React Native Gesture Handler

React Query (future ready)

────────────────────────────────────────

WEB

React

Vite

TypeScript

TailwindCSS

Framer Motion

React Router

React Hook Form

Zod

Lucide Icons

────────────────────────────────────────

# BACKEND

For this prototype

NO backend

NO Firebase

NO authentication

NO database

Everything should use mocked JSON.

The architecture should however be future-ready so replacing the mocked JSON with Firebase later requires almost no UI changes.

Abstract all data through services.

Example

services/products.ts

services/categories.ts

instead of importing JSON directly inside components.

────────────────────────────────────────

# IMAGE PLACEHOLDERS (IMPORTANT)

The real product images are NOT ready yet.

Another teammate will add all product assets later.

Therefore the application MUST support placeholder assets.

Requirements

• Every product card should have a perfectly sized placeholder image.

• Product Detail pages should have placeholder gallery images.

• Hero banner should use a premium placeholder illustration.

• Category cards should contain placeholder artwork.

• Dashboard upload components should display upload placeholders.

• Missing images should NEVER break layouts.

• Empty image areas should still look beautiful.

Example placeholder

──────────────

Image Coming Soon

1200 × 1200

──────────────

or a beautiful upload illustration.

The application should feel complete even without product images.

────────────────────────────────────────

# DATA MODEL

Product

id

name

category

price

description

images[]

features[]

featured

stockStatus

createdAt

Category

id

name

icon

banner

────────────────────────────────────────

# MOBILE APPLICATION FLOW

Splash

↓

Home

↓

Categories

↓

Product Listing

↓

Product Details

↓

Contact Business

────────────────────────────────────────

# SPLASH

Dark background

Large logo

Huge typography

Simple entrance animation

Loading dots

Premium feel

────────────────────────────────────────

# HOME

Large editorial hero

Huge typography

Search bar

Categories

Featured Products

Latest Products

Horizontal carousels

Animated cards

Bottom navigation

Micro interactions

────────────────────────────────────────

# CATEGORIES

Large square cards

Placeholder image

Category name

Product count

Hover animation

Press animation

────────────────────────────────────────

# PRODUCT LIST

2-column responsive grid

Large image placeholders

Product name

Price

Wishlist icon

Filter

Sort

Search

Smooth loading skeletons

────────────────────────────────────────

# PRODUCT DETAILS

Large image gallery

Placeholder images

Large title

Price

Description

Feature list

Related products

Sticky bottom CTA

Buttons

Contact

WhatsApp

Share

────────────────────────────────────────

# CONTACT

Phone

WhatsApp

Email

Address

Instagram

Facebook

Map

All buttons designed beautifully.

────────────────────────────────────────

# DASHBOARD

Desktop-first

Dark theme

Neo Brutalist

Premium SaaS

Animated transitions

Left Sidebar

Top Navbar

Content Area

────────────────────────────────────────

# DASHBOARD HOME

Statistic Cards

Recent Products

Quick Actions

Top Categories

Recent Activity

Charts (dummy)

────────────────────────────────────────

# PRODUCTS PAGE

Large searchable table

Search

Filter

Category dropdown

Status badge

Price

Edit

Delete

Image placeholder

Floating Add Product button

────────────────────────────────────────

# ADD PRODUCT

Large beautiful form

Fields

Product Name

Category

Price

Description

Features

Stock Status

Featured Toggle

Image Upload Area

The upload section should support drag-and-drop visually (UI only).

Show placeholder thumbnails before actual uploads exist.

────────────────────────────────────────

# CATEGORIES

Grid cards

Category placeholder

Category name

Product count

Add

Edit

Delete

────────────────────────────────────────

# BUSINESS SETTINGS

Business Name

Phone

WhatsApp

Email

Website

Instagram

Facebook

Address

Logo Upload

Banner Upload

────────────────────────────────────────

# COMPONENTS

Everything must be reusable.

Examples

Button

Input

Search Bar

Sidebar

Navbar

Product Card

Category Card

Hero Banner

Table

Badge

Modal

Drawer

Toast

Image Placeholder

Upload Component

Skeleton Loader

Empty State

Confirmation Dialog

────────────────────────────────────────

# ANIMATIONS

Everything should feel alive.

Cards lift on hover.

Buttons animate.

Images scale.

Smooth transitions.

Skeleton loading.

Fade animations.

Page transitions.

Floating action button.

Micro interactions everywhere.

────────────────────────────────────────

# RESPONSIVENESS

Dashboard

Desktop

Laptop

Tablet

Mobile

Everything should remain pixel perfect.

────────────────────────────────────────

# FOLDER STRUCTURE

Maintain a clean scalable architecture.

Separate

components

pages

layouts

hooks

types

constants

services

utils

data

assets

No duplicated code.

Strict TypeScript.

Reusable components.

Clean architecture.

────────────────────────────────────────

# FINAL GOAL

The finished prototype should not feel like a student project.

It should feel like a premium SaaS product built by a professional design agency.

The client should immediately feel confident that this can become a real production application.

The attached reference image should be used as the visual benchmark throughout the project, while improving upon it with cleaner spacing, smoother interactions, better typography, stronger component consistency, and polished placeholder assets.