import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="main-wrapper" data-select2-id="9">
      <app-topbar></app-topbar>
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    </div>
`
})
export class AppComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {  }
}
