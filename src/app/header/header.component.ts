import { Component, OnInit,Input } from '@angular/core';
import { UserService } from '../user.service';
import { Router }  from "@angular/router";
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/map'
import { FormBuilder, FormGroup } from  '@angular/forms';
import {  FileUploader,FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { PopupService } from '../popup.service';
import { $ } from '../../js/jquery-3.3.1';
import { TranslateService } from '@ngx-translate/core';


const uploadUrl = `${environment.apiBaseUrl}/popup/uploadImage`;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginStatus = false
  uploadUrl = `${environment.apiBaseUrl}/popup/uploadImage`;

  public uploader : FileUploader;

  public widthExp = 200
  public heighthExp = 200
  popupChecked : Boolean


  // translate = TranslateService
  public selectLang = ''

  


  // public uploader: FileUploader = new FileUploader({url: uploadUrl, headers: [{ name: 'x-access-token', value: JSON.parse(sessionStorage.getItem("user")).token}],itemAlias: 'file'});

  constructor(private userServie : UserService,public router: Router,public loaderService: LoaderService, private popupService: PopupService, public translate: TranslateService) { }

  ngOnInit() {

    if(sessionStorage.getItem("lang") == null){
      this.selectLang = 'ko'
    }else{
      this.selectLang = sessionStorage.getItem("lang")
    }

    let user = JSON.parse(sessionStorage.getItem("user"));
    console.log(user)

    if(user != null){
      this.userServie.check().subscribe((result: any) => {
        if(result.success == true){
          this.loginStatus = true
        }
      })

      this.uploader = new FileUploader({url: uploadUrl, headers: [{ name: 'x-access-token', value: user}],itemAlias: 'file'});
      this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false;};
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
           
           alert('File uploaded successfully');
          this.loaderService.hide();
          this.uploadUrl = uploadUrl+`?timeStamp=${Date.now()}`
          // location.reload();
       };

       this.getImageSize(this.uploadUrl, function(result){

        document.getElementById('popupPreviewBox').style.width = result.width
        document.getElementById('popupPreviewBox').style.height = result.height
  
      })
    }else{
    }
  }

  logout(){
    sessionStorage.clear();
    window.location.href = 'index.html';
  }

  showModal():void {
    this.popupService.getPopupStatus().subscribe((data: any) => {
      if(data.popup_status == 1){
        this.popupChecked = true
      }else{
        this.popupChecked = false
      }
    })

    $("#myModal").modal('show');
  }

  sendModal(): void {

    console.log("보냄")

    var status = ""
    if(this.popupChecked == true){
      status = "1"
    }else{
      status = "0"
    }

    this.popupService.setPopupStatus(status).subscribe((data: any) => {
      console.log(data)
    })
    this.hideModal();
  }

  hideModal():void {

    document.getElementById('close-modal').click();
  }

  onFileChange(event) {
    if (this.uploader.queue.length > 1) {
      this.uploader.queue.splice(0, 1); // clear old file & replace it with the new one
    }
  }

  getImageSize(uploadUrl, callback){
    var img = new Image();
    img.src = uploadUrl;
    img.onload = function(){
      let result = {width:img.width, height:img.height}
      callback(result);
    };
  }

  checkBoxChange(event){
    this.popupChecked = event.target.checked
  }

  onChangeLang(lang) {
    sessionStorage.setItem("lang", this.selectLang);
    this.translate.use(sessionStorage.getItem("lang"));
    // console.log(lang);
    // this.selectLang = lang;
}



}
