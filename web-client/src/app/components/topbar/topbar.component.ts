import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  shown = true;
  logged = false;
  constructor(private api: ApiService, router: Router) {
    router.events
      .subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          if (["/login", "/register"].includes(event.url))
            this.shown = false;
          else
            this.shown = true;
          const user = this.api.session.getUser();
          if (user != null) {
            this.logged = true;
          } else {
            this.logged = false;
          }
        }

      });
  }

  ngOnInit(): void {
  }

}
