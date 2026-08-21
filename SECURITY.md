# 🔐 Security Policy — STUDY UP Online School Platform

## Overview

This document describes the security considerations and policies for the STUDY UP platform. Since this is currently a **static website** (HTML/CSS/JavaScript without backend), the threat model is limited, but security best practices are implemented from day one.

---

## Current Architecture & Threat Model

### What We Have
- **Static site on GitHub Pages** (no server-side code execution)
- **No database** (no SQL injection, no data breach risks)
- **No authentication system yet** (planned for future phases)
- **No payment processing** (planned for future phases)
- **Hardcoded data only** (courses, teachers, facts)

### What's NOT a Risk Right Now
- ❌ SQL Injection
- ❌ Server-side vulnerabilities
- ❌ Database breaches
- ❌ CSRF attacks (no state-changing operations)
- ❌ Authentication bypass

### What IS a Risk
- ✅ XSS (Cross-Site Scripting) — if data comes from external sources
- ✅ Malicious JavaScript injection — if third-party scripts are added
- ✅ Social engineering — through UI manipulation
- ✅ Clickjacking — framing attacks
- ✅ Information disclosure — what we expose in client-side code

---

## Security Measures Implemented

### 1. Content Security Policy (CSP)

**What:** Meta tag in `<head>` that restricts where scripts, styles, and other resources can be loaded from.

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src https://fonts.gstatic.com;
  img-src 'self' data:;
  script-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
">
```

**Protects against:**
- Loading malicious scripts from attacker domains
- Inline script injection
- Clickjacking (frame-ancestors 'none')
- Arbitrary form submission

**Limitation:** GitHub Pages doesn't support CSP headers (only meta tags). Headers are stronger but not available.

---

### 2. Referrer Policy

```html
<meta name="referrer" content="strict-origin-when-cross-origin">
```

**What:** Controls how much information is sent to external sites when following links.

**Protects against:**
- Full URL being leaked to social media when clicking links
- Sensitive query parameters being exposed to external analytics

---

### 3. External Link Protection

All external links have `rel="noopener noreferrer"`:

```html
<a href="https://external-site.com" target="_blank" rel="noopener noreferrer">
  External Link
</a>
```

**Protects against:**
- Reverse tabnabbing — the opened page can't access `window.opener`
- Referrer leaking via the referrer policy bypass

---

### 4. X-UA-Compatible

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```

**What:** Forces modern rendering mode in Internet Explorer (if anyone uses it).

**Protects against:**
- IE rendering exploits

---

### 5. Git Ignore for Secrets

```gitignore
# Переменные окружения
.env
.env.*.local

# SSH ключи и сертификаты
*.pem
*.key

# Локальные файлы с данными (не коммитить)
*.local.md
secrets/
```

**Protects against:**
- Accidentally committing API keys, database credentials, or JWT tokens

---

### 6. Safe DOM Manipulation

**Current code:** Uses `textContent` instead of `innerHTML` for dynamic content.

```javascript
// ✅ SAFE
element.textContent = userProvidedData;

// ❌ UNSAFE
element.innerHTML = userProvidedData; // XSS vulnerability!
```

**Protects against:**
- DOM-based XSS when displaying user data (future-proofing)

---

## Security Limitations on GitHub Pages

### What GitHub Pages DOESN'T Allow

GitHub Pages is a static hosting service. It doesn't allow us to set custom HTTP response headers, which limits our security options:

| Feature | Supported? | Alternative |
|---------|-----------|-------------|
| CSP via HTTP header | ❌ | CSP via meta tag (weaker) |
| X-Frame-Options header | ❌ | CSP frame-ancestors (meta tag) |
| X-Content-Type-Options | ❌ | N/A |
| Strict-Transport-Security | ❌ | HTTPS enforced by GitHub |
| Custom headers | ❌ | N/A |

### Workaround for Full Security

If we need real HTTP headers in the future, we can:

1. **Use Cloudflare (free tier):**
   - Add STUDY UP as a domain in Cloudflare
   - Use Transform Rules to inject security headers
   - Keep GitHub Pages as origin

2. **Migrate to Netlify/Vercel (free tier):**
   - Deploy static files there instead
   - Full control over `_headers` and `_redirects`
   - Support for environment variables

3. **Set up own server:**
   - Full control over headers
   - Needed for backend API anyway (when we add payments, authentication)

---

## Future Security Requirements

### When Implementing User Accounts (Phase 3)

- **Password hashing:** Use bcrypt or Argon2 with strong salts
- **Never store plain passwords:** Check twice
- **Session management:** Short-lived JWT tokens with refresh tokens
- **Token storage:** httpOnly cookies only (not localStorage — XSS vulnerable)
- **Rate limiting:** Prevent brute force attacks on login endpoint
- **Input validation:** Server-side validation (client-side is UX, not security)

Example secure flow:
```
User Login
  ↓
Client sends email + password over HTTPS
  ↓
Server validates email/password (bcrypt comparison)
  ↓
Server generates short-lived JWT (expires in 15 min)
  ↓
Server sends JWT as httpOnly, Secure, SameSite cookie
  ↓
Client uses cookie for authenticated requests automatically
  ↓
Refresh token in separate httpOnly cookie for re-issuing JWT
```

---

### When Implementing File Upload (Homework, Phase 3)

- **Server-side validation only:** Never trust client-side file type checking
- **Check MIME type:** Not just file extension
- **Limit file size:** Prevent storage exhaustion attacks
- **Scan for malware:** Use VirusTotal API or ClamAV
- **Store outside webroot:** Files can't be accidentally executed
- **Renamed files:** Don't store original filename (directory traversal protection)

```javascript
// ✅ Correct
// 1. Validate file type: MIME, magic bytes
// 2. Check file size
// 3. Scan for malware
// 4. Store with random name in private directory
// 5. Return download link only for authorized users

// ❌ Wrong
// 1. Trust client-side type check
// 2. Store in public folder with original name
// 3. Serve directly
```

---

### When Implementing Payments (Phase 4)

- **NEVER process credit cards yourself** — immediate PCI DSS compliance nightmare
- **Use payment provider:** Stripe, YooKassa, PayPal
- **Tokenization:** Let payment provider handle card details
- **Webhooks:** Verify webhook signatures from payment provider
- **SSL/TLS everywhere:** All payment flows over HTTPS only

```
User clicks "Buy Course"
  ↓
Frontend redirects to Stripe Checkout (hosted by Stripe)
  ↓
User enters card details (Stripe handles, never touches our server)
  ↓
Stripe redirects back with success token
  ↓
Our backend verifies token with Stripe API
  ↓
Course enrollment created in database
```

---

## Testing & Monitoring

### Before Going to Production

1. **Security audit:**
   - [ ] Run site through [OWASP ZAP](https://www.zaproxy.org/)
   - [ ] Check [Mozilla Observatory](https://observatory.mozilla.org/)
   - [ ] Verify CSP using [CSP Evaluator](https://csp-evaluator.appspot.com/)

2. **Dependencies check:**
   - [ ] No npm packages currently (good for now)
   - [ ] When adding npm packages: use `npm audit`

3. **Code review:**
   - [ ] No hardcoded API keys in JavaScript
   - [ ] No secrets in `.gitignore`
   - [ ] No `eval()` or `innerHTML` with user data

### Ongoing Monitoring

- GitHub security alerts for dependencies
- Manual code reviews before deploying to main
- Regular CSP policy review (update as needed)

---

## Reporting Security Vulnerabilities

If you find a security issue:

1. **DO NOT** create a public GitHub issue
2. **DO** email security concerns privately
3. **DO** include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if you have one)

Response time: We'll acknowledge within 24 hours and prioritize based on severity.

---

## Checklist for Security Review

Before each deployment:

- [ ] CSP headers/meta tags are in place
- [ ] External links have `rel="noopener noreferrer"`
- [ ] No hardcoded secrets in code
- [ ] `.gitignore` blocks sensitive files
- [ ] No `innerHTML` with user data
- [ ] All HTTPS links, no mixed content
- [ ] No console errors about CSP violations
- [ ] All HTML forms have proper CSRF protection (if added)

---

## References

- [OWASP Top 10 Web Application Security Risks](https://owasp.org/www-project-top-ten/)
- [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Mozilla Web Security Guidelines](https://infosec.mozilla.org/guidelines/web_security)
- [GitHub Pages Security](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#security)
- [PCI DSS Compliance](https://www.pcisecuritystandards.org/) (for payment phase)

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2024 | 1.0 | Initial security policy |

---

**Last Updated:** August 2024  
**Maintained by:** STUDY UP Security Team  
**Status:** Actively maintained
