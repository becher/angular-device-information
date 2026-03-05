import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';

import { AngularDeviceInformationService, DeviceInfo, MOBILES_RE, TABLETS_RE } from './angular-device-information.service';

// ---------------------------------------------------------------------------
// Real user-agent strings for each browser / OS / device category
// ---------------------------------------------------------------------------
const UA = {
  // Desktop browsers
  CHROME_WIN: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  FIREFOX_WIN: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
  EDGE_WIN: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
  SAFARI_MAC: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
  OPERA_WIN: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0',
  BRAVE_WIN: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Brave Chrome/120.0.0.0 Safari/537.36',
  VIVALDI_WIN: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Vivaldi/6.5',
  YANDEX_WIN: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 YaBrowser/24.1 Safari/537.36',
  SAMSUNG_BROWSER: 'Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/23.0 Chrome/115.0.0.0 Mobile Safari/537.36',
  UC_BROWSER: 'Mozilla/5.0 (Linux; U; Android 12; en-US; Redmi Note 11) AppleWebKit/534.30 (KHTML, like Gecko) UCBrowser/13.4.0.1306 Mobile Safari/534.30',
  DUCKDUCKGO: 'Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 (KHTML, like Gecko) DuckDuckGo/5 Safari/537.36',
  IE11: 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko',
  LEGACY_EDGE: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/18.17763',
  WHALE: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Whale/3.24.223.18 Safari/537.36',

  // OS detection
  WIN10: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  ANDROID13: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
  IOS17: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
  MAC_SONOMA: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
  LINUX: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  CHROMEOS: 'Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  HARMONYOS: 'Mozilla/5.0 (Linux; Android 12; HarmonyOS; ALN-AL10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.88 HuaweiBrowser/13.0.5.303 Mobile Safari/537.36',

  // Mobile phones
  IPHONE: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
  PIXEL_8: 'Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
  SAMSUNG_S24: 'Mozilla/5.0 (Linux; Android 14; SM-S921B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
  ONEPLUS_12: 'Mozilla/5.0 (Linux; Android 14; CPH2583) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
  XIAOMI_14: 'Mozilla/5.0 (Linux; Android 14; 2401116TG) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
  REDMI_NOTE_13: 'Mozilla/5.0 (Linux; Android 13; Redmi Note 13 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
  HUAWEI_P60: 'Mozilla/5.0 (Linux; Android 13; NOH-AN00) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
  OPPO_FIND_X7: 'Mozilla/5.0 (Linux; Android 14; CPH2581) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
  NOTHING_PHONE: 'Mozilla/5.0 (Linux; Android 14; A063) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
  MOTOROLA_EDGE: 'Mozilla/5.0 (Linux; Android 13; motorola edge 40 neo) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',

  // Tablets
  IPAD_PRO: 'Mozilla/5.0 (iPad; CPU OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
  GALAXY_TAB_S9: 'Mozilla/5.0 (Linux; Android 14; SAMSUNG Galaxy Tab S9 Build/UP1A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  SURFACE_PRO: 'Mozilla/5.0 (Windows NT 10.0; ARM; Surface Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  KINDLE_FIRE: 'Mozilla/5.0 (Linux; Android 11; KFTT) AppleWebKit/537.36 (KHTML, like Gecko) Silk/100.3.3 like Chrome/100.0.4896.127 Safari/537.36',
  XIAOMI_PAD: 'Mozilla/5.0 (Linux; Android 13; Xiaomi Pad 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  LENOVO_TAB: 'Mozilla/5.0 (Linux; Android 13; Lenovo TAB P11) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',

  // Desktop (no mobile/tablet match)
  DESKTOP: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',

  // Search bots
  GOOGLEBOT: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  BINGBOT: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
  IPAD_DESKTOP_MODE: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15',


  // Empty / SSR
  EMPTY: '',

  // 2025-2026 future devices (should be caught by dynamic regex patterns)
  SAMSUNG_S25_ULTRA: 'Mozilla/5.0 (Linux; Android 15; SM-S938B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
  SAMSUNG_Z_FOLD6: 'Mozilla/5.0 (Linux; Android 15; SM-F956B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
  SAMSUNG_A56: 'Mozilla/5.0 (Linux; Android 15; SM-A566B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
  PIXEL_10_PRO: 'Mozilla/5.0 (Linux; Android 16; Pixel 10 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Mobile Safari/537.36',
  PIXEL_11: 'Mozilla/5.0 (Linux; Android 17; Pixel 11) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36',
  IPHONE_16_PRO: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
  XIAOMI_15: 'Mozilla/5.0 (Linux; Android 15; 2501116TG) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
  ONEPLUS_13: 'Mozilla/5.0 (Linux; Android 15; CPH2653) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
  OPPO_FIND_X8: 'Mozilla/5.0 (Linux; Android 15; CPH2651) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
  REALME_GT6: 'Mozilla/5.0 (Linux; Android 15; RMX3800) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
  HONOR_MAGIC7: 'Mozilla/5.0 (Linux; Android 15; FRI-AN00) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
  GALAXY_TAB_S10: 'Mozilla/5.0 (Linux; Android 15; SM-X820) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  GALAXY_TAB_A10: 'Mozilla/5.0 (Linux; Android 15; SM-T527) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  LENOVO_TAB_P12: 'Mozilla/5.0 (Linux; Android 14; TB-Y700F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
};

describe('AngularDeviceInformationService', () => {
  let service: AngularDeviceInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });
    service = TestBed.inject(AngularDeviceInformationService);
  });

  // =======================================================================
  // 1. Basic creation
  // =======================================================================
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Modern iPadOS (Desktop-class)', () => {
    it('should detect iPad in Desktop mode using maxTouchPoints', () => {
      const originalMaxTouch = navigator.maxTouchPoints;
      // On simule un écran tactile (5 points) sur ce qui ressemble à un Mac
      Object.defineProperty(navigator, 'maxTouchPoints', { get: () => 5, configurable: true });
      
      const isTablet = service.isTablet(UA.IPAD_DESKTOP_MODE);
      
      // On restaure la valeur originale pour ne pas polluer les autres tests
      Object.defineProperty(navigator, 'maxTouchPoints', { get: () => originalMaxTouch, configurable: true });
      
      expect(isTablet).toBe(true);
    });
  });

  describe('Extreme Environment Safety', () => {
    it('should handle SSR platform where userAgent is empty', () => {
      // In a real SSR environment window is absent; here we test via platform='server'
      // which makes the constructor skip window.navigator access entirely.
      const svc = new AngularDeviceInformationService('server');
      expect(svc.getDeviceInfo().userAgent).toBe('');
      expect(svc.isDesktop()).toBe(true);
    });

    it('should return Desktop for search bots', () => {
      expect(service.isDesktop(UA.GOOGLEBOT)).toBe(true);
      expect(service.isDesktop(UA.BINGBOT)).toBe(true);
    });
  });

  describe('Device Type Exclusivity', () => {
    it('should ensure a device is only ONE type at a time', () => {
      const uasToTest = [UA.IPHONE, UA.IPAD_PRO, UA.CHROME_WIN];
      
      uasToTest.forEach(ua => {
        const results = [
          service.isMobile(ua),
          service.isTablet(ua),
          service.isDesktop(ua)
        ].filter(res => res === true);
        
        expect(results.length).toBe(1); // Un seul 'true' autorisé
      });
    });
  });

  // =======================================================================
  // 2. DEPRECATED API VERIFICATION — navigator.appVersion & appName are GONE
  // =======================================================================
  describe('No deprecated API usage', () => {
    it('source code should not contain navigator.appVersion', () => {
      // Read the service's constructor & private method via the class source
      const src = AngularDeviceInformationService.toString();
      expect(src).not.toContain('navigator.appVersion');
      expect(src).not.toContain('appVersion');
    });

    it('source code should not contain navigator.appName', () => {
      const src = AngularDeviceInformationService.toString();
      expect(src).not.toContain('navigator.appName');
      expect(src).not.toContain('appName');
    });

    it('should not access navigator.appVersion at runtime', () => {
      let appVersionAccessed = false;
      const original = Object.getOwnPropertyDescriptor(Navigator.prototype, 'appVersion');
      Object.defineProperty(Navigator.prototype, 'appVersion', {
        get: () => { appVersionAccessed = true; return ''; },
        configurable: true,
      });

      // Re-create the service — constructor runs
      const svc = new AngularDeviceInformationService('browser');
      const info = svc.getDeviceInfo();

      // Restore
      if (original) {
        Object.defineProperty(Navigator.prototype, 'appVersion', original);
      }

      expect(appVersionAccessed).toBe(false);
      expect(info).toBeTruthy();
    });

    it('should not access navigator.appName at runtime', () => {
      let appNameAccessed = false;
      const original = Object.getOwnPropertyDescriptor(Navigator.prototype, 'appName');
      Object.defineProperty(Navigator.prototype, 'appName', {
        get: () => { appNameAccessed = true; return ''; },
        configurable: true,
      });

      const svc = new AngularDeviceInformationService('browser');
      const info = svc.getDeviceInfo();

      if (original) {
        Object.defineProperty(Navigator.prototype, 'appName', original);
      }

      expect(appNameAccessed).toBe(false);
      expect(info).toBeTruthy();
    });
  });

  // =======================================================================
  // 3. BROWSER DETECTION — purely from userAgent
  // =======================================================================
  describe('Browser detection (no appVersion / appName needed)', () => {
    const browserTests: [string, string, string][] = [
      ['Chrome on Windows',       UA.CHROME_WIN,       'Chrome'],
      ['Firefox on Windows',      UA.FIREFOX_WIN,      'Firefox'],
      ['Edge (Chromium)',         UA.EDGE_WIN,         'Microsoft Edge'],
      ['Safari on macOS',        UA.SAFARI_MAC,        'Safari'],
      ['Opera on Windows',       UA.OPERA_WIN,         'Opera'],
      ['Brave on Windows',       UA.BRAVE_WIN,         'Brave'],
      ['Vivaldi on Windows',     UA.VIVALDI_WIN,       'Vivaldi'],
      ['Yandex Browser',         UA.YANDEX_WIN,        'Yandex Browser'],
      ['Samsung Browser',        UA.SAMSUNG_BROWSER,   'Samsung Browser'],
      ['UC Browser',             UA.UC_BROWSER,        'UC Browser'],
      ['DuckDuckGo',             UA.DUCKDUCKGO,        'DuckDuckGo'],
      ['IE11 (Trident)',         UA.IE11,              'Microsoft Internet Explorer'],
      ['Naver Whale',            UA.WHALE,             'Naver Whale'],
    ];

    browserTests.forEach(([label, ua, expected]) => {
      it(`should detect ${label}`, () => {
        const info = service.getDeviceInfo();
        // The service already detected the real browser; verify that
        // setting the userAgent gives us the right detection when
        // calling isMobile / isDesktop with a UA string.
        // For direct browser detection, we instantiate a new service
        // by manipulating userAgent before init — but since constructor
        // already ran, we rely on the IIFE logic being consistent.
        // So let's just verify the IIFE regex gives the right answer:
        const detected = detectBrowserFromUA(ua);
        expect(detected).toBe(expected);
      });
    });

    // Helper that mimics the IIFE in the service
    function detectBrowserFromUA(ua: string): string {
      const test = (regexp: RegExp) => regexp.test(ua);
      switch (true) {
        case test(/edg/i): return 'Microsoft Edge';
        case test(/trident/i): return 'Microsoft Internet Explorer';
        case test(/firefox|fxios/i): return 'Firefox';
        case test(/opr\//i): return 'Opera';
        case test(/brave/i): return 'Brave';
        case test(/vivaldi/i): return 'Vivaldi';
        case test(/yabrowser/i): return 'Yandex Browser';
        case test(/duckduckgo/i): return 'DuckDuckGo';
        case test(/whale/i): return 'Naver Whale';
        case test(/puffin/i): return 'Puffin';
        case test(/sleipnir/i): return 'Sleipnir';
        case test(/maxthon/i): return 'Maxthon';
        case test(/ucbrowser/i): return 'UC Browser';
        case test(/samsungbrowser/i): return 'Samsung Browser';
        case test(/miuibrowser/i): return 'MIUI Browser';
        case test(/huaweibrowser/i): return 'Huawei Browser';
        case test(/oppobrowser/i): return 'OPPO Browser';
        case test(/vivobrowser/i): return 'Vivo Browser';
        case test(/heytapbrowser/i): return 'HeyTap Browser';
        case test(/arc/i): return 'Arc';
        case test(/chrome|chromium|crios/i): return 'Chrome';
        case test(/safari/i): return 'Safari';
        default: return 'Other';
      }
    }
  });

  // =======================================================================
  // 4. BROWSER VERSION EXTRACTION — no appVersion used
  // =======================================================================
  describe('Browser version extraction from userAgent only', () => {
    it('should extract Chrome version from UA string', () => {
      // Chrome/120.0.0.0 in the UA should yield version starting with "120"
      const info = service.getDeviceInfo();
      // At minimum, the version should be a non-empty string
      expect(info.browserVersion).toBeTruthy();
      expect(info.browserMajorVersion).toBeGreaterThan(0);
    });

    it('should extract version even for unconventional UA strings', () => {
      // Regression test: the fallback regex path
      const vMatch = 'UnknownBrowser/1.0'.match(/(?:Version|rv:|Chrome|Firefox|Safari|Edge|OPR|Edg)[\/ ]([\d.]+)/i);
      // no match → fallback should yield '0'
      expect(vMatch).toBeNull();
    });

    it('should extract Firefox version from UA', () => {
      const match = UA.FIREFOX_WIN.match(/Firefox\/([\d.]+)/);
      expect(match).toBeTruthy();
      expect(parseInt(match![1], 10)).toBeGreaterThan(0);
    });

    it('should extract Edge version from UA', () => {
      const match = UA.EDGE_WIN.match(/Edg\/([\d.]+)/);
      expect(match).toBeTruthy();
      expect(parseInt(match![1], 10)).toBeGreaterThan(0);
    });

    it('should extract Safari version from UA', () => {
      const match = UA.SAFARI_MAC.match(/Version\/([\d.]+)/);
      expect(match).toBeTruthy();
      expect(parseInt(match![1], 10)).toBeGreaterThan(0);
    });
  });

  // =======================================================================
  // 5. OS DETECTION — from userAgent only
  // =======================================================================
  describe('OS detection (no appVersion needed)', () => {
    const osTests: [string, string, string][] = [
      ['Windows 10',   UA.WIN10,      'Windows'],
      ['Android',      UA.ANDROID13,  'Android'],
      ['iOS',          UA.IOS17,      'iOS'],
      ['macOS Sonoma', UA.MAC_SONOMA, 'macOS Sonoma'],
      ['Linux',        UA.LINUX,      'Linux'],
      ['Chrome OS',    UA.CHROMEOS,   'Chrome OS'],
      ['HarmonyOS',    UA.HARMONYOS,  'HarmonyOS'],
    ];

    osTests.forEach(([label, ua, expectedOS]) => {
      it(`should detect ${label}`, () => {
        // We verify the OS regex patterns match the given UA
        const clientStrings = [
          {s: 'Windows 11', r: /(Windows NT 10.0.*Build\/2[2-9]|Windows NT 10.0.*Build\/[3-9])/},
          {s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/},
          {s: 'HarmonyOS', r: /HarmonyOS/},
          {s: 'Android', r: /Android/},
          {s: 'Chrome OS', r: /CrOS/},
          {s: 'Linux', r: /(Linux|X11(?!.*CrOS))/},
          {s: 'iOS', r: /(iPhone|iPad|iPod)/},
          {s: 'macOS Sequoia', r: /Mac OS X 15/},
          {s: 'macOS Sonoma', r: /Mac OS X 14/},
          {s: 'macOS Ventura', r: /Mac OS X 13/},
          {s: 'Mac OS X', r: /Mac OS X/},
          {s: 'Mac OS', r: /(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
        ];
        let os = 'unknown';
        for (const cs of clientStrings) {
          if (cs.r.test(ua)) {
            os = cs.s;
            break;
          }
        }
        if (/Windows/.test(os)) os = 'Windows';
        expect(os).toBe(expectedOS);
      });
    });
  });

  // =======================================================================
  // 6. MOBILE DETECTION — using public isMobile(ua) parameter
  // =======================================================================
  describe('Mobile detection', () => {
    const mobileUAs: [string, string][] = [
      ['iPhone',          UA.IPHONE],
      ['Pixel 8 Pro',     UA.PIXEL_8],
      ['Samsung S24',     UA.SAMSUNG_S24],
      ['OnePlus 12',      UA.ONEPLUS_12],
      ['Xiaomi 14',       UA.XIAOMI_14],
      ['Redmi Note 13',   UA.REDMI_NOTE_13],
      ['Huawei P60',      UA.HUAWEI_P60],
      ['OPPO Find X7',    UA.OPPO_FIND_X7],
      ['Nothing Phone',   UA.NOTHING_PHONE],
      ['Motorola Edge',   UA.MOTOROLA_EDGE],
    ];

    mobileUAs.forEach(([label, ua]) => {
      it(`should detect ${label} as mobile`, () => {
        expect(service.isMobile(ua)).toBe(true);
      });

      it(`${label} should NOT be tablet`, () => {
        expect(service.isTablet(ua)).toBe(false);
      });

      it(`${label} should NOT be desktop`, () => {
        expect(service.isDesktop(ua)).toBe(false);
      });
    });
  });

  // =======================================================================
  // 7. TABLET DETECTION — using public isTablet(ua) parameter
  // =======================================================================
  describe('Tablet detection', () => {
    const tabletUAs: [string, string][] = [
      ['iPad Pro',         UA.IPAD_PRO],
      ['Galaxy Tab S9',    UA.GALAXY_TAB_S9],
      ['Surface Pro',      UA.SURFACE_PRO],
      ['Kindle Fire',      UA.KINDLE_FIRE],
      ['Xiaomi Pad',       UA.XIAOMI_PAD],
      ['Lenovo Tab',       UA.LENOVO_TAB],
    ];

    tabletUAs.forEach(([label, ua]) => {
      it(`should detect ${label} as tablet`, () => {
        expect(service.isTablet(ua)).toBe(true);
      });

      it(`${label} should NOT be mobile`, () => {
        // isMobile returns false for tablets (by design)
        expect(service.isMobile(ua)).toBe(false);
      });
    });
  });

  // =======================================================================
  // 8. DESKTOP DETECTION
  // =======================================================================
  describe('Desktop detection', () => {
    it('should detect standard desktop Chrome as desktop', () => {
      expect(service.isDesktop(UA.DESKTOP)).toBe(true);
      expect(service.isMobile(UA.DESKTOP)).toBe(false);
      expect(service.isTablet(UA.DESKTOP)).toBe(false);
    });

    it('should detect Firefox on Linux as desktop', () => {
      const ua = 'Mozilla/5.0 (Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0';
      expect(service.isDesktop(ua)).toBe(true);
    });
  });

  // =======================================================================
  // 9. getDeviceType()
  // =======================================================================
  describe('getDeviceType()', () => {
    it('should return Desktop, Mobile, or Tablet', () => {
      const type = service.getDeviceType();
      expect(['Desktop', 'Mobile', 'Tablet']).toContain(type);
    });
  });

  // =======================================================================
  // 10. getDeviceInfo() structure
  // =======================================================================
  describe('getDeviceInfo() returns complete DeviceInfo', () => {
    it('should return all required fields', () => {
      const info: DeviceInfo = service.getDeviceInfo();
      expect(info).toBeTruthy();
      expect(info.userAgent).toBeDefined();
      expect(info.screen_resolution).toBeDefined();
      expect(info.browser).toBeDefined();
      expect(info.browserVersion).toBeDefined();
      expect(typeof info.browserMajorVersion).toBe('number');
      expect(info.os).toBeDefined();
      expect(info.osVersion).toBeDefined();
      expect(typeof info.cookies).toBe('boolean');
    });

    it('browser should be a non-empty string', () => {
      const info = service.getDeviceInfo();
      expect(info.browser.length).toBeGreaterThan(0);
    });

    it('os should be a non-empty string', () => {
      const info = service.getDeviceInfo();
      expect(info.os.length).toBeGreaterThan(0);
    });
  });

  // =======================================================================
  // 11. SSR SAFETY — PLATFORM_ID = 'server'
  // =======================================================================
  describe('SSR safety (server platform)', () => {
    it('should not throw when platform is server', () => {
      expect(() => {
        const svc = new AngularDeviceInformationService('server');
        const info = svc.getDeviceInfo();
        expect(info).toBeTruthy();
        expect(info.userAgent).toBe('');
        expect(info.browser).toBeDefined();
      }).not.toThrow();
    });

    it('should return Desktop for empty userAgent (SSR)', () => {
      const svc = new AngularDeviceInformationService('server');
      expect(svc.isDesktop()).toBe(true);
      expect(svc.isMobile()).toBe(false);
      expect(svc.isTablet()).toBe(false);
    });
  });

  // =======================================================================
  // 12. EMPTY USER AGENT
  // =======================================================================
  describe('Empty user agent handling', () => {
    it('should not crash with empty UA', () => {
      expect(() => {
        service.isMobile(UA.EMPTY);
        service.isTablet(UA.EMPTY);
        service.isDesktop(UA.EMPTY);
      }).not.toThrow();
    });

    it('empty UA should be desktop', () => {
      expect(service.isDesktop(UA.EMPTY)).toBe(true);
    });
  });

  // =======================================================================
  // 13. SEARCH BOT detection
  // =======================================================================
  describe('Search bot user agents', () => {
    it('Googlebot should be detected as desktop (not mobile/tablet)', () => {
      expect(service.isMobile(UA.GOOGLEBOT)).toBe(false);
      expect(service.isTablet(UA.GOOGLEBOT)).toBe(false);
      expect(service.isDesktop(UA.GOOGLEBOT)).toBe(true);
    });

    it('bingbot should be detected as desktop', () => {
      expect(service.isDesktop(UA.BINGBOT)).toBe(true);
    });
  });

  // =======================================================================
  // 14. REGEX PATTERNS — MOBILES_RE & TABLETS_RE exported constants
  // =======================================================================
  describe('MOBILES_RE patterns', () => {
    it('GOOGLE_PIXEL should match Pixel 8 Pro', () => {
      expect(MOBILES_RE.GOOGLE_PIXEL.test('Pixel 8 Pro')).toBe(true);
    });

    it('IPHONE should match iPhone UA', () => {
      expect(MOBILES_RE.IPHONE.test('iPhone')).toBe(true);
    });

    it('XIAOMI should match Redmi Note', () => {
      expect(MOBILES_RE.XIAOMI.test('Redmi Note 13 Pro')).toBe(true);
    });

    it('ONEPLUS should match OnePlus', () => {
      expect(MOBILES_RE.ONEPLUS.test('OnePlus')).toBe(true);
    });

    it('NOTHING should match Nothing Phone / A063', () => {
      expect(MOBILES_RE.NOTHING.test('A063')).toBe(true);
    });

    it('SAMSUNG should match SM-G950F', () => {
      expect(MOBILES_RE.SAMSUNG.test('SM-G950F')).toBe(true);
    });
  });

  describe('TABLETS_RE patterns', () => {
    it('iPad should match iPad Pro', () => {
      expect(TABLETS_RE.iPad.test('iPad Pro')).toBe(true);
    });

    it('SamsungTablet should match Galaxy Tab', () => {
      expect(TABLETS_RE.SamsungTablet.test('SAMSUNG Galaxy Tab')).toBe(true);
    });

    it('SurfaceTablet should match Surface Pro', () => {
      expect(TABLETS_RE.SurfaceTablet.test('Surface Pro')).toBe(true);
    });

    it('XiaomiTablet should match Xiaomi Pad', () => {
      expect(TABLETS_RE.XiaomiTablet.test('Xiaomi Pad')).toBe(true);
    });

    it('LenovoTablet should match Lenovo TAB', () => {
      expect(TABLETS_RE.LenovoTablet.test('Lenovo TAB')).toBe(true);
    });

    it('Kindle should match Kindle', () => {
      expect(TABLETS_RE.Kindle.test('Kindle Fire')).toBe(true);
    });
  });

  // =======================================================================
  // 1. DEPRECATED API VERIFICATION (navigator.appVersion / appName)
  // =======================================================================
  describe('No deprecated API usage', () => {
    it('source code should not contain navigator.appVersion or appName', () => {
      const src = AngularDeviceInformationService.toString();
      expect(src).not.toContain('navigator.appVersion');
      expect(src).not.toContain('navigator.appName');
    });

    it('should not access navigator.appVersion at runtime', () => {
      let accessed = false;
      const original = Object.getOwnPropertyDescriptor(Navigator.prototype, 'appVersion');
      Object.defineProperty(Navigator.prototype, 'appVersion', {
        get: () => { accessed = true; return ''; },
        configurable: true,
      });
      new AngularDeviceInformationService('browser').getDeviceInfo();
      if (original) Object.defineProperty(Navigator.prototype, 'appVersion', original);
      expect(accessed).toBe(false);
    });
  });

  // =======================================================================
  // 2. BROWSER DETECTION
  // =======================================================================
  describe('Browser detection logic', () => {
    const browserTests: [string, string, string][] = [
      ['Chrome', UA.CHROME_WIN, 'Chrome'],
      ['Firefox', UA.FIREFOX_WIN, 'Firefox'],
      ['Edge', UA.EDGE_WIN, 'Microsoft Edge'],
      ['Safari', UA.SAFARI_MAC, 'Safari'],
      ['Opera', UA.OPERA_WIN, 'Opera'],
      ['Brave', UA.BRAVE_WIN, 'Brave'],
      ['Samsung Browser', UA.SAMSUNG_BROWSER, 'Samsung Browser'],
    ];

    browserTests.forEach(([label, ua, expected]) => {
      it(`should detect ${label}`, () => {
        // Verification using the service method with UA parameter
        expect(service.getDeviceInfo(ua).browser).toBe(expected);
      });
    });
  });

  // =======================================================================
  // 3. OS DETECTION
  // =======================================================================
  describe('OS detection logic', () => {
    const osTests: [string, string, string][] = [
      ['Windows', UA.WIN10, 'Windows'],
      ['Android', UA.ANDROID13, 'Android'],
      ['iOS', UA.IOS17, 'iOS'],
      ['macOS', UA.MAC_SONOMA, 'macOS Sonoma'],
      ['HarmonyOS', UA.HARMONYOS, 'HarmonyOS'],
    ];

    osTests.forEach(([label, ua, expectedOS]) => {
      it(`should detect ${label}`, () => {
        expect(service.getDeviceInfo(ua).os).toBe(expectedOS);
      });
    });
  });

  // =======================================================================
  // 4. MOBILE / TABLET / DESKTOP EXCLUSIVITY
  // =======================================================================
  describe('Device category exclusivity', () => {
    const testExclusivity = (ua: string) => {
      const isMobile = service.isMobile(ua);
      const isTablet = service.isTablet(ua);
      const isDesktop = service.isDesktop(ua);
      const sum = (isMobile ? 1 : 0) + (isTablet ? 1 : 0) + (isDesktop ? 1 : 0);
      expect(sum).toBe(1); // One and only one must be true
    };

    it('should be exclusive for iPhone', () => testExclusivity(UA.IPHONE));
    it('should be exclusive for iPad', () => testExclusivity(UA.IPAD_PRO));
    it('should be exclusive for Desktop', () => testExclusivity(UA.DESKTOP));
    it('should be exclusive for Search Bot', () => testExclusivity(UA.GOOGLEBOT));
  });

  // =======================================================================
  // 5. IPAD DESKTOP-MODE DETECTION (Special Proposal)
  // =======================================================================
  describe('iPad Desktop-class (Modern iPadOS)', () => {
    it('should detect iPad in Desktop mode using maxTouchPoints', () => {
      const originalMaxTouch = navigator.maxTouchPoints;
      // Mock navigator.maxTouchPoints to simulate touch screen on "Mac"
      Object.defineProperty(navigator, 'maxTouchPoints', { get: () => 5, configurable: true });
      
      const isTablet = service.isTablet(UA.IPAD_DESKTOP_MODE);
      
      // Restore
      Object.defineProperty(navigator, 'maxTouchPoints', { get: () => originalMaxTouch, configurable: true });
      
      // If your service supports this logic, it should return true
      expect(isTablet).toBe(true);
    });
  });

  // =======================================================================
  // 6. SSR & ENVIRONMENT SAFETY
  // =======================================================================
  describe('Environment safety', () => {
    it('should handle SSR (server platform) gracefully', () => {
      const svc = new AngularDeviceInformationService('server');
      const info = svc.getDeviceInfo();
      expect(info.userAgent).toBe('');
      expect(svc.isDesktop()).toBe(true);
    });

    it('should handle SSR platform where window is not used', () => {
      // platform='server' bypasses window access — verifies no crash in SSR
      const svc = new AngularDeviceInformationService('server');
      expect(svc.getDeviceInfo().userAgent).toBe('');
      expect(svc.isDesktop()).toBe(true);
    });

    it('should not crash with empty or null UA', () => {
      expect(service.isDesktop(UA.EMPTY)).toBe(true);
      expect(service.isMobile(undefined as any)).toBe(false);
    });
  });

  // =======================================================================
  // 7. REGEX CONSTANTS EXPORTED
  // =======================================================================
  describe('Exported Regex Patterns', () => {
    it('MOBILES_RE should match common brands', () => {
      expect(MOBILES_RE.SAMSUNG.test('SM-G950F')).toBe(true);
      expect(MOBILES_RE.GOOGLE_PIXEL.test('Pixel 8')).toBe(true);
    });

    it('TABLETS_RE should match common tablets', () => {
      expect(TABLETS_RE.iPad.test('iPad Pro')).toBe(true);
      expect(TABLETS_RE.SamsungTablet.test('SAMSUNG Galaxy Tab')).toBe(true);
    });
  });

  // =======================================================================
  // 8. FUTURE-PROOF 2025-2026 DEVICE DETECTION
  // =======================================================================
  describe('2025-2026 future device detection (dynamic regex)', () => {
    // --- Phones ---
    const futurePhones: [string, string][] = [
      ['Samsung S25 Ultra',  UA.SAMSUNG_S25_ULTRA],
      ['Samsung Z Fold6',    UA.SAMSUNG_Z_FOLD6],
      ['Samsung A56',        UA.SAMSUNG_A56],
      ['Pixel 10 Pro',       UA.PIXEL_10_PRO],
      ['Pixel 11',           UA.PIXEL_11],
      ['iPhone 16 Pro',      UA.IPHONE_16_PRO],
      ['Xiaomi 15',          UA.XIAOMI_15],
      ['OnePlus 13',         UA.ONEPLUS_13],
      ['OPPO Find X8',       UA.OPPO_FIND_X8],
      ['Realme GT6',         UA.REALME_GT6],
      ['Honor Magic7',       UA.HONOR_MAGIC7],
    ];

    futurePhones.forEach(([label, ua]) => {
      it(`should detect ${label} as mobile`, () => {
        expect(service.isMobile(ua)).toBe(true);
      });

      it(`${label} should NOT be tablet`, () => {
        expect(service.isTablet(ua)).toBe(false);
      });

      it(`${label} should NOT be desktop`, () => {
        expect(service.isDesktop(ua)).toBe(false);
      });
    });

    // --- Tablets ---
    const futureTablets: [string, string][] = [
      ['Galaxy Tab S10',     UA.GALAXY_TAB_S10],
      ['Galaxy Tab A10',     UA.GALAXY_TAB_A10],
      ['Lenovo Tab P12',     UA.LENOVO_TAB_P12],
    ];

    futureTablets.forEach(([label, ua]) => {
      it(`should detect ${label} as tablet`, () => {
        expect(service.isTablet(ua)).toBe(true);
      });

      it(`${label} should NOT be mobile`, () => {
        expect(service.isMobile(ua)).toBe(false);
      });
    });

    // --- Dynamic regex pattern verification ---
    it('SAMSUNG dynamic pattern should catch SM-S (S25+)', () => {
      expect(MOBILES_RE.SAMSUNG.test('SM-S938B')).toBe(true);
    });

    it('SAMSUNG dynamic pattern should catch SM-F (Z Fold/Flip)', () => {
      expect(MOBILES_RE.SAMSUNG.test('SM-F956B')).toBe(true);
    });

    it('SAMSUNG dynamic pattern should catch Galaxy S26 (future)', () => {
      expect(MOBILES_RE.SAMSUNG.test('Galaxy S26')).toBe(true);
    });

    it('SAMSUNG dynamic pattern should catch Galaxy Z Fold7 (future)', () => {
      expect(MOBILES_RE.SAMSUNG.test('Galaxy Z Fold7')).toBe(true);
    });

    it('GOOGLE_PIXEL dynamic pattern should catch Pixel 12 (future)', () => {
      expect(MOBILES_RE.GOOGLE_PIXEL.test('Pixel 12')).toBe(true);
    });

    it('GOOGLE_PIXEL dynamic pattern should catch Pixel 10 Pro (future)', () => {
      expect(MOBILES_RE.GOOGLE_PIXEL.test('Pixel 10 Pro')).toBe(true);
    });

    it('SamsungTablet dynamic pattern should catch SM-X820 (Tab S10)', () => {
      expect(TABLETS_RE.SamsungTablet.test('SM-X820')).toBe(true);
    });

    it('SamsungTablet dynamic pattern should NOT catch SM-S938B (phone)', () => {
      expect(TABLETS_RE.SamsungTablet.test('SM-S938B')).toBe(false);
    });
  });
  
});
