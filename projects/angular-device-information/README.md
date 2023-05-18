<head> <meta name="google-site-verification" content="zApSXb8oh9SIBjqaVNlIs_IPT7sTwY4vwk59YS_CshE" /></head> 
  <h1 align="center">angular-device-information</h1>

## Dependencies

| Angular       | Version       |
| ------------- | ------------- |
|  Angular 8+   | v 1.1.5     |
|  Angular 14   | v 2.0.0      |
|  Angular 15   | v 3.0.3      |

## Support us : <br> <a href="https://www.paypal.com/donate/?hosted_button_id=6NTWH6ZLKN4RC" target="_blank"><img alt="" border="0" src="https://pics.paypal.com/00/s/MGNhMjc1OWQtYmM4Ni00OWM3LTkyN2ItZTliMWI1ZTM0YWZi/file.PNG" width="200" /></a>



## Installation

To install this library, run:

```bash
$ npm install angular-device-information --save
```
NPM LINK : <a href="https://www.npmjs.com/package/angular-device-information" target="_blank">https://www.npmjs.com/package/angular-device-information</a>

**In your app.module.ts file add AngularDeviceInformationService as providers(Optional)**

```typescript
  import { NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';
  import { FormsModule } from '@angular/forms';
  
  import { AppComponent } from './app.component';
  import { AngularDeviceInformationService } from 'angular-device-information';
  
  @NgModule({
    imports:      [ BrowserModule, FormsModule ],
    providers:[AngularDeviceInformationService],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ]
  })
  

 ````

 **In your component where you want to use the Device Service**
 ```typescript
  import { Component } from '@angular/core';
  ...
  import { AngularDeviceInformationService } from 'angular-device-information';
  ...
  @Component({
    selector: 'home',  // <home></home>
    styleUrls: [ './home.component.scss' ],
    templateUrl: './home.component.html',
    ...
  })

  export class HomeComponent {
  
    constructor(private deviceInformationService: AngularDeviceInformationService) {
  
       console.log(deviceInformationService.isMobile());  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
       console.log(deviceInformationService.isTablet());  // returns if the device is a tablet (tablet iPad etc)
       console.log(deviceInformationService.isDesktop()); // returns if the app is running on a Desktop browser.
       console.log(deviceInformationService.getDeviceType()); // returns if the app is running on a Desktop browser.
       console.log(deviceInformationService.getDeviceInfo().os);  // returns os name like Windows/Andtoid/iOS/Linux/Mac OS X etc
       console.log(deviceInformationService.getDeviceInfo().osVersion);  // returns os version like 10/8.1/7 ...etc
       console.log(deviceInformationService.getDeviceInfo().browser);  // returns browser name like chrome/firefox ...etc
       console.log(deviceInformationService.getDeviceInfo().browserVersion);  // returns browser version as number
       console.log(deviceInformationService.getDeviceInfo().browserMajorVersion);  // returns full browser version as number
       console.log(deviceInformationService.getDeviceInfo().screen_resolution);  // returns screnn size like 1390x860/640x800 ...etc
       console.log(deviceInformationService.getDeviceInfo().cookies);  // returns cookies enabled or no 
       console.log(deviceInformationService.getDeviceInfo().userAgent);  // returns userAgent
    }
    
  }

```

## License

[MIT](https://github.com/becher/angular-device-information/blob/master/LICENSE)



 
