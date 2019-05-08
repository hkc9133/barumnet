import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../email.service';
import 'rxjs/add/operator/map'
import { PopupService } from '../popup.service'
import { environment } from '../../environments/environment';;


import { LoaderService } from '../loader.service';

import { PagerService } from '../pager.service'
import { $ } from '../../js/jquery-3.3.1';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  inventory: any = {};
  emailForm: FormGroup;
  submitted = false;


  constructor(private pagerService: PagerService, private is: InventoryService,private formBuilder: FormBuilder, private emailService: EmailService,public loaderService: LoaderService,private popupService: PopupService) { }

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
  uploadUrl = `${environment.apiBaseUrl}/popup/uploadImage`;

  ngOnInit() {
    
    this.popupService.getPopupStatus().subscribe((data: any) => {
      if(data.popup_status == 1){
        this.getImageSize(this.uploadUrl, function(result){
          var popupX = (window.screen.width / 2) - (result.width / 2);
          var popupY= (window.screen.height / 2) - (result.height / 2);

          var win = window.open("./popup", "PopupWin", "width="+result.width+",height="+result.height+", left="+ popupX + ", top="+ popupY);
    
        })
      }
    })

    this.setPage(1)

    this.emailForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      title: ['', Validators.required],
      content: ['', Validators.required],
      check: [false, Validators.requiredTrue]
    })

  }

  setPage(page: number) {
    var  search = ''

    this.is.getInventory(page,"","").subscribe((data: {}) => {

    this.inventory = data;

    this.pager = this.pagerService.getPager(this.inventory.count, page);

    this.pagedItems = this.inventory.result;
    });
  }

  get f() { return this.emailForm.controls; }

  onSubmit() {
    this.submitted = true;

    const name = this.emailForm.value.name
    const email = this.emailForm.value.email
    const title = this.emailForm.value.title
    const content = this.emailForm.value.content
    const check = this.emailForm.value.check

    if(name != "" && email != "" && title != "" && content != "" && check != true){
      alert('개인정보동의가 필요합니다.')

    }
    if (this.emailForm.invalid) {
      return;
    }

    this.loaderService.show();

    var data = this.emailService.sendEmail(name, email, title, content)
    data.subscribe((data: {}) => {
      this.loaderService.hide();
      // var result = JSON.stringify(data)
      alert(data)
      this.emailForm.reset();
    
    });
  }

  getImageSize(uploadUrl, callback){
    var img = new Image();
    img.src = uploadUrl;
    img.onload = function(){
      let result = {width:img.width, height:img.height}
      callback(result);
    };
  }
  

  showPrivacyModal():void {
    $("#privacy_modal").modal('show');
  }

  hidePrivacyModal():void {
    document.getElementById('close-privacy-modal').click();
  }


}

