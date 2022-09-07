import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  shown = true;

  constructor(private router: Router) {

    router.events
      .subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          if (["/login", "/register"].includes(event.url))
            this.shown = false;
          else
            this.shown = true;
        }
      });
  }

  ngOnInit(): void {
  }

}
