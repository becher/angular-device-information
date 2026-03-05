<head>
  <meta name="google-site-verification" content="zApSXb8oh9SIBjqaVNlIs_IPT7sTwY4vwk59YS_CshE" />
</head>

<h1 align="center">📱 angular-device-information</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/angular-device-information"><img src="https://img.shields.io/npm/v/angular-device-information.svg" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/angular-device-information"><img src="https://img.shields.io/npm/dm/angular-device-information.svg" alt="npm downloads" /></a>
  <a href="https://github.com/becher/angular-device-information/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/angular-device-information.svg" alt="license" /></a>
  <img src="https://img.shields.io/badge/Angular-14--19-red?logo=angular" alt="Angular 14-19" />
  <img src="https://img.shields.io/badge/SSR-Compatible-green" alt="SSR Compatible" />
</p>

<p align="center">
  A lightweight Angular service to detect <strong>device type</strong>, <strong>OS</strong>, <strong>browser</strong>, and more —<br/>
  works on <strong>Mobile</strong>, <strong>Tablet</strong>, and <strong>Desktop</strong> for 2000+ devices including all modern smartphones.
</p>

---

## ✨ Features

- ✅ Detects **Mobile**, **Tablet** or **Desktop** instantly
- ✅ Covers **2000+ devices** — iPhone, Samsung, Pixel, Xiaomi, OnePlus, Huawei, OPPO, Vivo, Realme, Honor…
- ✅ Detects **OS**: Windows 11, macOS Sonoma/Sequoia, Android, iOS, HarmonyOS, ChromeOS, Linux…
- ✅ Detects **Browser**: Chrome, Edge, Firefox, Safari, Brave, Vivaldi, Samsung Browser, MIUI, UC…
- ✅ Returns **screen resolution**, **OS version**, **browser version**, **cookies**
- ✅ **SSR-safe** (Angular Universal / server-side rendering)
- ✅ Works with Angular **14, 15, 16, 17, 18, 19**
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

console.log(info.os);                  // 'Windows' | 'Android' | 'iOS' | 'Mac OS X' | 'Linux' | ...
console.log(info.osVersion);           // '11' | '14.0' | '10' | ...
console.log(info.browser);             // 'Chrome' | 'Firefox' | 'Safari' | 'Edge' | 'Brave' | ...
console.log(info.browserVersion);      // '120.0.0.0'
console.log(info.browserMajorVersion); // 120
console.log(info.screen_resolution);   // '1920 x 1080'
console.log(info.cookies);             // true | false
console.log(info.userAgent);           // raw user-agent string
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

### Use in a template directly

```typescript
// component.ts
export class AppComponent {
  info = this.device.getDeviceInfo();
  constructor(public device: AngularDeviceInformationService) {}
}
```

```html
<!-- component.html -->
<div>
  <p>OS: {{ info.os }} {{ info.osVersion }}</p>
  <p>Browser: {{ info.browser }} {{ info.browserMajorVersion }}</p>
  <p>Screen: {{ info.screen_resolution }}</p>
  <p>Device: {{ device.getDeviceType() }}</p>
</div>
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

## 📱 Supported Devices (2026)

### Phones
Google Pixel 6-9, iPhone 12-16, Samsung Galaxy S21-S24, OnePlus 8-12, Xiaomi Mi/Redmi/POCO, Huawei P/Mate/Nova, OPPO Find X / Reno, Vivo X/V/iQOO, Realme GT/C-series, Honor Magic, Sony Xperia, Motorola Edge/Razr, Nothing Phone, Fairphone, Asus ROG Phone, Tecno, Infinix, ZTE, Nubia...

### Tablets
iPad Pro M1-M4 / Air / mini, Samsung Galaxy Tab S7-S9 / Tab A / FE, Microsoft Surface Pro/Go, Google Pixel Tablet, Xiaomi Pad 5/6, Huawei MatePad Pro 11/13, Lenovo Tab P11/P12 / Yoga Tab, Amazon Fire tablets, OnePlus Pad, Realme Pad, OPPO Pad, Honor Pad, Nokia T-series, TCL NXTPAPER...

### Browsers
Chrome, Firefox, Safari, Edge (Chromium), Brave, Arc, Vivaldi, Opera, Yandex, UC Browser, Samsung Browser, MIUI Browser, Huawei Browser, DuckDuckGo, Naver Whale, Puffin...

### Operating Systems
Windows 10/11, macOS Monterey/Ventura/Sonoma/Sequoia, Android 10-15, iOS 14-18, iPadOS, HarmonyOS, ChromeOS, Fuchsia, Linux, Tizen, KaiOS...

---

## 🛠️ Angular Compatibility

| Angular | Library version |
|---------|-----------------|
| Angular 8–13 | v 1.x |
| Angular 14.x | v 2.x |
| Angular 15.x | v 3.x |
| Angular 16.x | v 4.x |
| Angular 14–19 (latest) | v 2.0.0+ (current) |

---

## 💙 Support

If this library saved you time, consider supporting its development:

<a href="https://www.paypal.com/donate/?hosted_button_id=6NTWH6ZLKN4RC" target="_blank">
  <img alt="Donate with PayPal" border="0" src="https://pics.paypal.com/00/s/MGNhMjc1OWQtYmM4Ni00OWM3LTkyN2ItZTliMWI1ZTM0YWZi/file.PNG" width="180" />
</a>

---

## 📄 License

[MIT](https://github.com/becher/angular-device-information/blob/master/LICENSE) © Becher

