import { Component, OnInit } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html',
    providers: [ConfirmationService]
})
export class AppFooterComponent implements OnInit{

  constructor(public layoutService: LayoutService) {
  }

  ngOnInit(): void {
  }


}
