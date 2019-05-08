import { Component } from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { NavigationCancel,
        Event,
        NavigationEnd,
        NavigationError,
        NavigationStart,
        Router } from '@angular/router';

        import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _loadingBar: SlimLoadingBarService, private _router: Router, translate: TranslateService) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });

    translate.setDefaultLang('ko');
    // 현재 사용 언어 설정
    if(sessionStorage.getItem("lang") == null){
      translate.use('ko');
    }else{
      translate.use(sessionStorage.getItem("lang"));
    }
  }
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }
}
