import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';

import { InventoryService } from './inventory.service';
import { UserService } from './user.service';
import { UploadService } from './upload.service';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { PagerService } from './pager.service';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpConfigInterceptor} from './interceptor/httpconfig.interceptor';
import { FileUploadModule } from 'ng2-file-upload';
import { LoaderComponent } from './shared/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { LoaderService } from './loader.service';
import { EmailService } from './email.service';
import { PopupService } from './popup.service';
import { PopupComponent } from './popup/popup.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { HttpClient } from 'selenium-webdriver/http';

export function createTranslateLoader(http: HttpClient) {
  // 다국어 파일의 확장자와 경로를 지정
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    InventoryComponent,
    SignupComponent,
    LoaderComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    FileUploadModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [InventoryService,
    PagerService,UserService,UploadService,LoaderService,EmailService,PopupService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }],
    entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
