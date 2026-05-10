# Storefront

[Live Demo](https://store.commerce.web.id)

## Overview

E-commerce storefront built with Next.js and TypeScript, integrated with a custom backend API for product browsing, checkout, and payment flow.

---

## Features

- **Variant-based product model**  
  Products support both single and multi-variant configurations with a consistent data structure.

- **Server-side and client-side data fetching**  
  Uses SSR for initial page load and TanStack Query for client-side caching.

- **Client-side caching with TanStack Query**  
  Handles caching and data updates for dynamic client-side data.

- **Authentication with Axios interceptors**  
  Supports token-based authentication with automatic token refresh for protected requests.

- **Protected routes and authentication flow**  
  Restricts access to protected pages and redirects authenticated users from login pages.

- **Checkout with shipping calculation**  
  Calculates shipping costs using RajaOngkir before order confirmation.

- **Order and payment integration**  
  Handles order creation and payment processing using Midtrans Snap.

---

## Tech Stack

- **Core:** Next.js (App Router), TypeScript
- **Data Fetching:** TanStack Query, Axios, Fetch API
- **Forms & Validation:** Zod, React Hook Form
- **UI:** Tailwind CSS, shadcn/ui

---

## Architecture Overview

The application combines server-side and client-side data fetching.

- Public data is fetched on the server using Next.js SSR.
- Authenticated and dynamic data is handled on the client using TanStack Query for caching.
- Axios is mainly used for authenticated requests with automatic token refresh handling.
- Authentication uses cookies to separate access tokens and refresh tokens.
- Checkout flow calculates shipping costs using RajaOngkir before order confirmation.
- Orders are processed with Midtrans Snap for payment handling.

---

## Getting Started

1. Create a `.env` file based on `.env.example`.

2. Install dependencies and run the development server:

```bash
npm install
npm run dev
```
