# Custom Domain Setup Guide

This guide provides step-by-step instructions for configuring the custom domain `sangharshclasses.in` with your Caffeine-hosted application.

## Overview

- **Primary Domain:** `https://sangharshclasses.in/`
- **WWW Subdomain:** `https://www.sangharshclasses.in/`
- **Caffeine Subdomain:** `https://sangharsh-classes-coaching-9ew.caffeine.xyz/`

**Goal:** Ensure all traffic is served from or redirected to `https://sangharshclasses.in/` with proper SEO canonicalization.

## Prerequisites

- Access to your domain registrar (Hostinger) DNS settings
- Access to Caffeine project dashboard
- Deployment must use `frontend/dist/` as the publish directory (NOT source files)
- `.ic-assets.json` must be present in `frontend/` directory for proper asset serving

## Step 1: Configure DNS Records in Hostinger

Log in to your Hostinger account and navigate to the DNS Zone Editor for `sangharshclasses.in`.

### Required DNS Records

Add the following DNS records:

#### A Record (Apex Domain)
