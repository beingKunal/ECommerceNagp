import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ECommerceApp';
  param = {value:'Typescript'}
  constructor(private translateService:TranslateService){
    translateService.addLangs(['en','hi'])
    translateService.setDefaultLang('en')
    const browserLang = translateService.getBrowserLang();
    translateService.use(browserLang.match(/en|hi/) ? browserLang:'en')
  }

}
