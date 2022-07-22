import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1 translate> mainPhrase </h1>
      <h2 translate> subPhrase </h2>
      <button translate > buttonPhrase </button>
    </div>
  `
})

export class AppComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    private apiService: ApiService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.setLanguage();
  }

  async setLanguage(): Promise<void> {
    const ipInfo$ = this.apiService.getIPInfo();
    const ipInfo = await lastValueFrom(ipInfo$);

    this.translate.setDefaultLang('en');
    if (ipInfo?.country_code?.toUpperCase() == 'BR') {
      this.translate.setDefaultLang('pt');
    };
  }

}
