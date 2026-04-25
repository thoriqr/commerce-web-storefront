# Storefront

[Live Demo](https://store.commerce.web.id)

## Overview

A modern e-commerce storefront with product browsing, variant selection, and a complete checkout experience, integrated with a custom backend API.

---

## Features

- **Variant-centric product model**  
  Products are structured around variants, allowing both single and multi-variant products to share a consistent data model.

- **Hybrid data fetching strategy**  
  Combines server-side rendering for initial load and React Query for client-side caching and synchronization.

- **Client-side caching with React Query**  
  Eliminates unnecessary refetching and avoids manual data handling with useEffect.

- **Authentication handling with Axios interceptors**  
  Implements token-based authentication with automatic refresh handling for protected requests.

- **Route protection and authentication flow**  
  Ensures protected routes are only accessible to authenticated users and prevents access to auth pages when already logged in.

- **Checkout with shipping calculation**  
  Calculates shipping costs using RajaOngkir API before confirming the order.

- **Order and payment integration**  
  Handles order creation and payment processing using Midtrans Snap without full page redirects.

---

## Tech Stack

### **Next.js (App Router)**

Used to build a server-rendered storefront with improved initial load performance and SEO.  
Server-side rendering is applied to public data where authentication is not required.

---

### **React Query**

Handles client-side data fetching, caching, and synchronization.  
Reduces boilerplate by eliminating manual state handling with useEffect.

---

### **Axios**

Used for authenticated requests with interceptor support.  
Automatically handles token refresh when encountering expired sessions.

---

### **Zod & React Hook Form**

Used for client-side form validation in authentication flows.  
Provides immediate feedback while maintaining server-side validation as fallback.

---

### **Tailwind CSS**

Utility-first styling approach for rapid UI development and consistent design.

---

## Architecture Overview

The application uses a hybrid data fetching approach to balance performance and flexibility.

- Public data is fetched on the server using Next.js SSR for faster initial load and better SEO.
- Authenticated and dynamic data is handled on the client using React Query for caching and synchronization.
- Authentication is managed using cookies, separating access tokens and refresh tokens.
- Axios interceptors handle token expiration and automatically retry failed requests.
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
