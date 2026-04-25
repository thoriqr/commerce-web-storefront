# Storefront

[Live Demo](https://store.commerce.web.id)

## Overview

E-commerce storefront built around a variant-centric product system, enabling flexible product browsing and a seamless checkout experience, integrated with a custom backend API.

---

## Features

- **Variant-centric product model**  
  Products are structured around variants, supporting both single and multi-variant configurations with a consistent data model.

- **Hybrid data fetching strategy**  
  Combines server-side rendering for initial load with client-side caching and synchronization.

- **Client-side caching with TanStack Query**  
  Reduces unnecessary refetching and simplifies data management without relying on manual state handling.

- **Authentication handling with Axios interceptors**  
  Implements token-based authentication with automatic refresh handling for protected requests.

- **Route protection and authentication flow**  
  Ensures proper access control for protected routes and prevents access to authentication pages when already logged in.

- **Checkout with shipping calculation**  
  Calculates shipping costs using RajaOngkir API before order confirmation.

- **Order and payment integration**  
  Handles order creation and payment processing using Midtrans Snap without full page redirects.

---

## Tech Stack

- **Core:** Next.js (App Router), TypeScript
- **Data Fetching:** TanStack Query, Axios
- **Forms & Validation:** Zod, React Hook Form
- **UI:** Tailwind CSS, shadcn/ui

---

## Architecture Overview

The application uses a hybrid data fetching approach to balance performance and flexibility.

- Public data is fetched on the server using Next.js SSR for faster initial load and improved SEO.
- Authenticated and dynamic data is handled on the client using TanStack Query for caching and synchronization.
- Axios is used for HTTP requests with interceptor-based authentication handling, including automatic token refresh.
- Authentication is managed using cookies, separating access tokens and refresh tokens.
- Checkout flow calculates shipping costs via RajaOngkir before order confirmation.
- Order processing integrates with Midtrans Snap for seamless in-app payment handling.

This separation ensures a responsive user experience while maintaining proper handling of authentication and external integrations.

---

## Getting Started

1. Create a `.env` file based on `.env.example`.

2. Install dependencies and run the development server:

```bash
npm install
npm run dev
```
