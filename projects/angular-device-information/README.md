<head>
  <meta name="google-site-verification" content="zApSXb8oh9SIBjqaVNlIs_IPT7sTwY4vwk59YS_CshE" />
</head>

<h1 align="center">📱 angular-device-information</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/angular-device-information"><img src="https://img.shields.io/npm/v/angular-device-information.svg" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/angular-device-information"><img src="https://img.shields.io/npm/dm/angular-device-information.svg" alt="npm downloads" /></a>
  <a href="https://github.com/becher/angular-device-information/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/angular-device-information.svg" alt="license" /></a>
  <img src="https://img.shields.io/badge/Angular-14--21-red?logo=angular" alt="Angular 14-21" />
  <img src="https://img.shields.io/badge/SSR-Compatible-green" alt="SSR Compatible" />
  <img src="https://img.shields.io/badge/No_Deprecated_APIs-✓-brightgreen" alt="No Deprecated APIs" />
</p>

<p align="center">
  A lightweight Angular service to detect <strong>device type</strong>, <strong>OS</strong>, <strong>browser</strong>, and more —<br/>
  works on <strong>Mobile</strong>, <strong>Tablet</strong>, and <strong>Desktop</strong> for 2000+ devices including all modern smartphones.
</p>

---

## 🆕 What's New in v5.0.0

- 🚫 **Removed all deprecated browser APIs** — no more `navigator.appVersion` or `navigator.appName`
- 🛡️ **Fully SSR-safe** — all `screen`, `navigator`, `document` accesses guarded for server-side rendering
- 📦 **Angular 14 → 21** support — single version works across 8 major Angular releases
- 🔍 Browser version now extracted purely from `userAgent` — future-proof and standards-compliant
- 🧭 **Hybrid regex modernization (2024–2026)** — major brands (Samsung, Pixel, Xiaomi, OPPO, OnePlus, Vivo, Realme, Huawei/Honor, etc.) now use future-proof, compact regex patterns while preserving 30+ legacy brand patterns for zero regressions. This keeps the library maintainable and backward-compatible.
- 🪄 **Windows 11 detection via Client Hints** — when available the service uses `navigator.userAgentData.getHighEntropyValues(['platformVersion'])` to distinguish Windows 11 (platformVersion major ≥ 13) from Windows 10 (classic UA reports `Windows NT 10.0` for both).
- ⚖️ **New API: `getPreciseDeviceInfo()`** — async helper that waits for Client Hints to return the most accurate OS information (useful when you need guaranteed Windows 11 detection).
- ✅ **Unit tests:** comprehensive suite expanded and passing (now **177** unit tests covering modern UAs, iPad desktop-mode, Client Hints, SSR safety and export patterns).

---

## ✨ Features

- ✅ Detects **Mobile**, **Tablet** or **Desktop** instantly
- ✅ Covers **2000+ devices** — iPhone, Samsung, Pixel, Xiaomi, OnePlus, Huawei, OPPO, Vivo, Realme, Honor…
- ✅ Detects **OS**: Windows 11, macOS Sonoma/Sequoia, Android, iOS, HarmonyOS, ChromeOS, Linux…
- ✅ Detects **Browser**: Chrome, Edge, Firefox, Safari, Brave, Vivaldi, Samsung Browser, MIUI, UC…
- ✅ Returns **screen resolution**, **OS version**, **browser version**, **cookies**
- ✅ **SSR-safe** (Angular Universal / `@angular/ssr` — server-side rendering)
- ✅ **Zero deprecated APIs** — uses only `navigator.userAgent` (no `appVersion` / `appName`)
- ✅ Works with Angular **14, 15, 16, 17, 18, 19, 20, 21**
- ✅ Zero dependencies, tree-shakeable

---

## 📦 Installation

```bash
npm install angular-device-information --save
```

> NPM: https://www.npmjs.com/package/angular-device-information

---

## 🚀 Quick Start

### 1. Add to your module (NgModule — optional for standalone)

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AngularDeviceInformationService } from 'angular-device-information';

@NgModule({
  imports:      [ BrowserModule ],
  providers:    [ AngularDeviceInformationService ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {}
```

### 2. For Standalone Components (Angular 14+)

No module needed — just inject directly:

```typescript
import { Component } from '@angular/core';
import { AngularDeviceInformationService } from 'angular-device-information';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `<p>Device type: {{ deviceType }}</p>`
})
export class AppComponent {
  deviceType = '';

  constructor(private deviceInfo: AngularDeviceInformationService) {
    this.deviceType = deviceInfo.getDeviceType(); // 'Mobile' | 'Tablet' | 'Desktop'
  }
}
```

### 3. Using `inject()` (Angular 14+)

```typescript
import { Component, inject } from '@angular/core';
import { AngularDeviceInformationService } from 'angular-device-information';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `<p>Browser: {{ browser }}</p>`
})
export class AppComponent {
  private device = inject(AngularDeviceInformationService);
  browser = this.device.getDeviceInfo().browser;
}
```

---

## 📖 Usage

### Detect device type

```typescript
import { AngularDeviceInformationService } from 'angular-device-information';

@Component({ ... })
export class MyComponent {
  constructor(private device: AngularDeviceInformationService) {

    if (device.isMobile()) {
      console.log('Running on a mobile phone');
    } else if (device.isTablet()) {
      console.log('Running on a tablet');
    } else {
      console.log('Running on a desktop');
    }

    // Or get it as a string:
    console.log(device.getDeviceType()); // 'Mobile' | 'Tablet' | 'Desktop'
  }
}
```

### Get detailed device information

```typescript
const info = this.device.getDeviceInfo();

console.log(info.os);                 // 'Windows' | 'Android' | 'iOS' | 'Mac OS X' | 'Linux' | ...
console.log(info.osVersion);          // '11' | '14.0' | '10' | ...
console.log(info.browser);            // 'Chrome' | 'Firefox' | 'Safari' | 'Edge' | 'Brave' | ...
console.log(info.browserVersion);     // '120.0.0.0'
console.log(info.browserMajorVersion); // 120
console.log(info.screen_resolution);  // '1920 x 1080'
console.log(info.cookies);            // true | false
console.log(info.userAgent);          // raw user-agent string
```

### Precise Windows 11 detection (Client Hints)

When you need a guaranteed OS value (Windows 11 vs Windows 10), use the async helper `getPreciseDeviceInfo()` which will attempt to query the User-Agent Client Hints API (`navigator.userAgentData.getHighEntropyValues(['platformVersion'])`) when available. If Client Hints are not present or the browser denies access, the method falls back to the UA-based detection.

```typescript
// Async: waits for Client Hints when available
const precise = await this.device.getPreciseDeviceInfo();
console.log(precise.os); // 'Windows 11' (if platformVersion >= 13) or 'Windows'
```


### Real-world example — adaptive layout

```typescript
import { Component, OnInit } from '@angular/core';
import { AngularDeviceInformationService } from 'angular-device-information';

@Component({
  selector: 'app-layout',
  template: `
    <div [class]="layoutClass">
      <p *ngIf="isMobile">📱 Mobile layout</p>
      <p *ngIf="isTablet">⬜ Tablet layout</p>
      <p *ngIf="isDesktop">🖥️ Desktop layout</p>
    </div>
  `
})
export class LayoutComponent implements OnInit {
  isMobile  = false;
  isTablet  = false;
  isDesktop = false;
  layoutClass = '';

  constructor(private device: AngularDeviceInformationService) {}

  ngOnInit() {
    this.isMobile  = this.device.isMobile();
    this.isTablet  = this.device.isTablet();
    this.isDesktop = this.device.isDesktop();
    this.layoutClass = this.device.getDeviceType().toLowerCase() + '-view';
  }
}
```

---

## 🔌 API Reference

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `isMobile()` | `boolean` | `true` if the device is a mobile phone |
| `isTablet()` | `boolean` | `true` if the device is a tablet |
| `isDesktop()` | `boolean` | `true` if the device is a desktop browser |
| `getDeviceType()` | `string` | `'Mobile'` \| `'Tablet'` \| `'Desktop'` |
| `getDeviceInfo()` | `DeviceInfo` | Full device information object |

### DeviceInfo Object

| Property | Type | Example values |
|----------|------|----------------|
| `os` | `string` | `'Windows'`, `'Android'`, `'iOS'`, `'Mac OS X'`, `'Linux'`, `'HarmonyOS'`, `'Chrome OS'` |
| `osVersion` | `string \| number` | `'11'`, `'14.0'`, `'13'` |
| `browser` | `string` | `'Chrome'`, `'Firefox'`, `'Safari'`, `'Edge'`, `'Brave'`, `'Samsung Browser'`, `'MIUI Browser'` |
| `browserVersion` | `string` | `'120.0.0.0'` |
| `browserMajorVersion` | `number` | `120` |
| `screen_resolution` | `string` | `'1920 x 1080'`, `'390 x 844'` |
| `cookies` | `boolean` | `true` \| `false` |
| `userAgent` | `string` | raw UA string |

---

## 🔒 No Deprecated APIs

Version 5.0.0 removes **all** deprecated browser APIs:

| Deprecated API (removed) | Replaced with |
|---------------------------|---------------|
| `navigator.appVersion` | Parsed from `navigator.userAgent` |
| `navigator.appName` | Detected via UA pattern matching |
| `window.navigator.appVersion` | Not used at all |
| `window.navigator.appName` | Not used at all |

This ensures the library is future-proof and compatible with browsers that may remove these legacy APIs.

---

## 📱 Supported Devices (2026)

### Phones
Google Pixel 6–9 Pro, iPhone 12–16, Samsung Galaxy S21–S25, OnePlus 8–13, Xiaomi Mi/Redmi/POCO, Huawei P/Mate/Nova, OPPO Find X / Reno, Vivo X/V/iQOO, Realme GT/C-series, Honor Magic, Sony Xperia, Motorola Edge/Razr, Nothing Phone, Fairphone, Asus ROG Phone, Tecno, Infinix, ZTE, Nubia…

### Tablets
iPad Pro M1–M4 / Air / mini, Samsung Galaxy Tab S7–S9 / Tab A / FE, Microsoft Surface Pro/Go/Book, Google Pixel Tablet, Xiaomi Pad 5/6, Huawei MatePad Pro 11/13, Lenovo Tab P11/P12 / Yoga Tab, Amazon Fire tablets, OnePlus Pad, Realme Pad, OPPO Pad, Honor Pad, Nokia T-series, TCL NXTPAPER…

### Browsers
Chrome, Firefox, Safari, Edge (Chromium), Brave, Arc, Vivaldi, Opera, Yandex, UC Browser, Samsung Browser, MIUI Browser, Huawei Browser, DuckDuckGo, Naver Whale, Puffin…

### Operating Systems
Windows 10/11, macOS Monterey/Ventura/Sonoma/Sequoia, Android 10–15, iOS 14–18, iPadOS, HarmonyOS, ChromeOS, Fuchsia, Linux, Ubuntu, Tizen, KaiOS…

---

## 🛠️ Angular Compatibility

| Angular version | Library version | Status |
|-----------------|-----------------|--------|
| 8 – 13 | 1.x | Legacy |
| 14 – 21 | **5.0.0** (latest) | ✅ Current |

> **v5.0.0** is a single build that works across Angular 14, 15, 16, 17, 18, 19, 20, and 21.

---

## 💙 Support

If this library saved you time, consider supporting its development:

<a href="https://www.paypal.com/donate/?hosted_button_id=6NTWH6ZLKN4RC" target="_blank">
  <img alt="Donate with PayPal" border="0" src="https://pics.paypal.com/00/s/MGNhMjc1OWQtYmM4Ni00OWM3LTkyN2ItZTliMWI1ZTM0YWZi/file.PNG" width="180" />
</a>

---

## 📄 License

[MIT](https://github.com/becher/angular-device-information/blob/master/LICENSE) © Becher

