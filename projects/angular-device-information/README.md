<a href="#">
  <h1 align="center">angular-device-information</h1>
</a>


## Dependencies

**Angular-device-information 1.0.0** is available for **Angular 9.x** to **Angular 13.x**  

## Installation

To install this library, run:

```bash
$ npm install angular-device-information --save
```

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



 
