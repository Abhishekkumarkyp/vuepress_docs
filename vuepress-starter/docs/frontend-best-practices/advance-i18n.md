---
title: Internationalization (i18n)
---

# Internationalization (i18n) & Localization (l10n) in Modern Frontend Frameworks

This guide explains **how to design, build, and ship multi‑language apps** across **Vue, React, Angular, Next.js, and Nuxt**. It is formatted for VuePress (with front‑matter, headings, and code blocks) and includes **practical examples** you can copy‑paste.

---

## Why i18n Matters

- **Reach & UX:** Speak your users’ language; match cultural expectations (dates, currencies, plural rules).
- **Accessibility:** Clear text and formats improve comprehension.
- **Scalability:** Add new locales without refactoring UI code.
- **Compliance & SEO:** Correct `lang`, hreflang, and locale routes help search engines and assistive tech.

**Start early.** Externalize strings from day one to avoid costly rewrites later.

---

## Core Concepts & Best Practices

### Locale
A **locale** combines language and region (e.g., `en-US`, `fr-FR`). Use **BCP‑47** tags consistently. Provide a **default** and **fallback** locale (often `en`).

### Externalize All User‑Facing Text
Do **not** hardcode strings in components. Store them in **resource files** (JSON/XLIFF/etc.) per locale and load via your i18n library.

### Keys vs. Source Text
Prefer **semantic keys** (e.g., `auth.login.title`) over using English text as keys. Keys are stable even if copy changes and help translators understand context.

### Interpolation (Dynamic Values)
Avoid string concatenation. Use **named placeholders**:
```json
// en.json
{
  "greeting": "Welcome back, {name}!"
}
```
```js
t('greeting', { name: user.name });
```

### Pluralization
Different languages have different plural forms.

**ICU MessageFormat example:**
```json
{
  "photos": "{count, plural, =0 {You have no photos} one {You have # photo} other {You have # photos}}"
}
```
```js
t('photos', { count });
```

**i18next-style keys:**
```json
{
  "item_one": "{{count}} item",
  "item_other": "{{count}} items"
}
```
```js
t('item', { count });
```

### Gender / Select
Use **select** rules for gender/context:
```json
{
  "commented": "{gender, select, male {He commented} female {She commented} other {They commented}}"
}
```
```js
t('commented', { gender });
```

### Dates, Numbers, Currency
Use **Intl APIs** (or framework wrappers). **Never** hardcode formats.
```js
new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date());
new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(1234.56);
```

### Right‑to‑Left (RTL)
Support RTL locales (e.g., Arabic, Hebrew):
- Set `<html dir="rtl">` when needed.
- Prefer **logical CSS** (`margin-inline-start`) over left/right.
- Mirror icons where appropriate.

### Unicode & Encoding
Use **UTF‑8** end‑to‑end (source, DB, API, HTML meta).

### Pseudo‑Localization
Test by **expanding** and **accenting** text (e.g., `Héllö Wørłd ！！！`) to reveal clipping and hardcoded strings.

---

## Organizing Translation Files

### Simple Per‑Locale Files
```
locales/
  en.json
  fr.json
  es.json
```

### Split by Feature / Namespace (Recommended for Large Apps)
```
locales/
  en/
    common.json
    home.json
    dashboard.json
  fr/
    common.json
    home.json
    dashboard.json
```
- Keep **structures symmetric** across locales.
- Use **fallbacks** (e.g., `fallbackLng: 'en'`) for missing keys.

---

## Locale Routing, Detection & SEO

- **URL strategy:** Prefix paths with locale (`/fr/about`). Default locale may be unprefixed (`/about`).
- **Detection:** Read browser preferences and **allow manual override** (language switcher).
- **Switchers:** Link to the same page in another locale (keep query/anchor).
- **SEO:** Set `<html lang>`; add `hreflang` alternates; generate sitemaps per locale.
- **Fallback content:** If a page is missing in a locale, show default‑locale content or a friendly notice.

---

## Framework Recipes

### Vue 3 + vue-i18n
**Install:**
```bash
npm i vue-i18n@9
```

**`/src/locales/en.json`:**
```json
{ "welcome": "Hello, {name}!", "items_one": "{count} item", "items_other": "{count} items" }
```
**`/src/locales/fr.json`:**
```json
{ "welcome": "Bonjour, {name} !", "items_one": "{count} article", "items_other": "{count} articles" }
```

**`/src/i18n.ts`:**
```ts
import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import fr from './locales/fr.json';

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, fr }
});
```

**`/src/main.ts`:**
```ts
import { createApp } from 'vue';
import App from './App.vue';
import { i18n } from './i18n';

createApp(App).use(i18n).mount('#app');
```

**Use in a component:**
```vue
<template>
  <h1>{{ t('welcome', { name }) }}</h1>
  <p>{{ t('items', { count }) }}</p>
  <button @click="set('fr')">FR</button>
  <button @click="set('en')">EN</button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();
const name = 'Ava';
const count = 3;
const set = (l: string) => (locale.value = l);
</script>
```

---

### React + i18next (react-i18next)
**Install:**
```bash
npm i i18next react-i18next
```

**`/src/locales/en/translation.json`:**
```json
{ "welcome": "Welcome, {{name}}!", "cart_one": "{{count}} item", "cart_other": "{{count}} items" }
```
**`/src/locales/fr/translation.json`:**
```json
{ "welcome": "Bienvenue, {{name}} !", "cart_one": "{{count}} article", "cart_other": "{{count}} articles" }
```

**`/src/i18n.ts`:**
```ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import fr from './locales/fr/translation.json';

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, fr: { translation: fr } },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
```

**`/src/main.tsx`:**
```tsx
import './i18n';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>
);
```

**Use in a component:**
```tsx
import { useTranslation } from 'react-i18next';

export function Header() {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <h1>{t('welcome', { name: 'Ava' })}</h1>
      <p>{t('cart', { count: 3 })}</p>
      <button onClick={() => i18n.changeLanguage('fr')}>FR</button>
      <button onClick={() => i18n.changeLanguage('en')}>EN</button>
    </div>
  );
}
```

---

### Angular — Built‑in i18n (compile‑time) **and** ngx‑translate (runtime)

#### Built‑in i18n (XLIFF, per‑locale builds)
```html
<!-- app.component.html -->
<h1 i18n>Welcome to our site</h1>
<p i18n="@@homeIntro">This is a sample application.</p>
```
```bash
ng extract-i18n             # generates messages.xlf
# Translate to messages.fr.xlf, then:
ng build --localize         # emits per-locale builds
```

- Pros: fast runtime, great SEO, ICU plurals/select in templates.
- Cons: no instant runtime switch (navigate to a different build/URL).

#### ngx-translate (runtime switching)
```bash
npm i @ngx-translate/core @ngx-translate/http-loader
```
```ts
// app.module.ts
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function loader(http: HttpClient) { return new TranslateHttpLoader(http, 'assets/i18n/', '.json'); }

@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({ loader: { provide: TranslateLoader, useFactory: loader, deps: [HttpClient] } })
  ]
})
export class AppModule {}
```
```html
<!-- app.component.html -->
<h1>{{ 'welcome' | translate:{ name: user } }}</h1>
<button (click)="use('fr')">FR</button>
<button (click)="use('en')">EN</button>
```
```ts
// app.component.ts
constructor(private t: TranslateService) {
  t.setDefaultLang('en'); t.use('en');
}
use(lang: string) { this.t.use(lang); }
```

---

### Next.js — Built‑in routing + next-i18next

**`next.config.js`:**
```js
module.exports = {
  i18n: { locales: ['en', 'fr'], defaultLocale: 'en', localeDetection: true }
};
```

**`next-i18next.config.js`:**
```js
module.exports = {
  i18n: { defaultLocale: 'en', locales: ['en', 'fr'] },
  reloadOnPrerender: process.env.NODE_ENV === 'development'
};
```

**Folder structure:**
```
public/locales/en/common.json
public/locales/fr/common.json
```

**`pages/_app.tsx`:**
```tsx
import { appWithTranslation } from 'next-i18next';
function App({ Component, pageProps }) { return <Component {...pageProps} />; }
export default appWithTranslation(App);
```

**Page usage (`pages/index.tsx`):**
```tsx
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  const { t } = useTranslation('common');
  return <h1>{t('welcome', { name: 'Ava' })}</h1>;
}

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale, ['common'])) } };
}
```

**Switch locale:**
```tsx
import { useRouter } from 'next/router';
const router = useRouter();
router.push(router.asPath, undefined, { locale: 'fr' });
```

---

### Nuxt 3 — @nuxtjs/i18n

**Install & configure (`nuxt.config.ts`):**
```ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'en', iso: 'en', name: 'English' },
      { code: 'ar', iso: 'ar', name: 'العربية', dir: 'rtl' }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: { alwaysRedirect: true },
    lazy: true,
    langDir: 'lang/'
  }
});
```

**Folder structure:**
```
lang/en.json
lang/ar.json
```

**Use in components:**
```vue
<template>
  <h1>{{ $t('welcome', { name: 'Ava' }) }}</h1>
  <NuxtLink :to="switchLocalePath('ar')">AR</NuxtLink>
  <NuxtLink :to="switchLocalePath('en')">EN</NuxtLink>
</template>

<script setup>
const { t, locale, locales } = useI18n();
</script>
```

Nuxt i18n sets `<html lang>`/`dir` automatically and generates localized routes.

---

## Testing Checklist

- [ ] No hardcoded UI strings in templates/components
- [ ] All strings have **keys** and **context**
- [ ] Placeholders use **named variables**
- [ ] **Plural** and **gender** rules verified
- [ ] **Date/number/currency** use Intl or library
- [ ] **RTL** screens visually verified
- [ ] **Fallback locale** configured
- [ ] **Pseudo‑locale** pass (length/diacritics)
- [ ] Locale **routing**, **switcher**, and **SEO** (`lang`, `hreflang`) validated

---

## Quick Reference

**ICU plural:**
```json
"{count, plural, one {# file} other {# files}}"
```

**i18next plural keys:**
```json
{ "file_one": "{{count}} file", "file_other": "{{count}} files" }
```

**Intl format:**
```js
new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(date);
new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' }).format(999.99);
```

---

## Key Takeaways

- Externalize strings; choose **keys** and a clear **file structure**.
- Use **ICU/Plural** and **named placeholders**.
- Format with **Intl**; don’t hardcode dates/numbers.
- Handle **RTL** and **SEO** (routing, `lang`, `hreflang`).
- Leverage framework tools (**vue-i18n**, **react‑i18next**, **Angular i18n** / **ngx‑translate**, **next‑i18next**, **Nuxt i18n**).
