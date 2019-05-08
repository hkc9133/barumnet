import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import 'rxjs/add/operator/map'
import { FormBuilder, FormGroup } from  '@angular/forms';

// import { UploadService } from  '../upload.service';
import { PagerService } from '../pager.service'
import {  FileUploader,FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { Router ,ActivatedRoute, Params} from '@angular/router';

const uploadUrl = `${environment.apiBaseUrl}/upload`;



@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {


  inventory: any = {};

  loginStatus : Boolean

  searchItem = '1'
  searchString = ''

  public uploader: FileUploader;

  constructor(private pagerService: PagerService,private is: InventoryService,private formBuilder: FormBuilder, public loaderService: LoaderService, private router : ActivatedRoute) { }

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  ngOnInit() {
    document.body.scrollTop = 0;
    
    let user = JSON.parse(sessionStorage.getItem("user"));

    if(user != null){
      this.loginStatus = true

      this.uploader = new FileUploader({url: uploadUrl, headers: [{ name: 'x-access-token', value: JSON.parse(sessionStorage.getItem("user")).token}],itemAlias: 'file'});
      this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false;};
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
           console.log('ImageUpload:uploaded:', item, status, response);
           
           alert('File uploaded successfully');
          this.loaderService.hide();
          location.reload();
       };
    }else{
      this.loginStatus = false
    }

    this.setPage(1)
  }

  setPage(page: number) {

    this.is.getInventory(page, this.searchItem, this.searchString).subscribe((data: {}) => {

    this.inventory = data;

    this.pager = this.pagerService.getPager(this.inventory.count, page);

    this.pagedItems = this.inventory.result;

    });
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      this.setPage(1)
    }
  }

  onFileChange(event) {
    if (this.uploader.queue.length > 1) {
      this.uploader.queue.splice(0, 1); // clear old file & replace it with the new one
  }
  }
}
