import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-event-participant',
  templateUrl: './event-participant.component.html'
})
export class EventParticipantComponent implements OnInit {

  participants: any[] = []
  constructor(private api: ApiService, private route: ActivatedRoute) {
    route.params.subscribe((r: any) => {
      if (r.id) {
        api.event.participant(r.id).subscribe((res: any) => this.participants = res.data)
      }
    })
  }

  ngOnInit(): void { }

}
