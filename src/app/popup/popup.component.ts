import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { PopupService } from '../popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  uploadUrl = `${environment.apiBaseUrl}/popup/uploadImage`;

  constructor(private popupService: PopupService) { }

  ngOnInit() {

    this.getImageSize(this.uploadUrl, function(result){

      document.getElementById('popupPreviewBox').style.width = result.width
      document.getElementById('popupPreviewBox').style.height = result.height

    })

    console.log(window.outerWidth)
    console.log(window.outerHeight)

  }

  getImageSize(uploadUrl, callback){
    var img = new Image();
    img.src = uploadUrl;
    img.onload = function(){
      let result = {width:img.width, height:img.height}
      callback(result);
    };
  }

}
