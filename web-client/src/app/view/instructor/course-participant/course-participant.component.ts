import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-course-participant',
  templateUrl: './course-participant.component.html'
})
export class CourseParticipantComponent implements OnInit {

  participants: any[] = []
  constructor(private api: ApiService, private route: ActivatedRoute) {
    route.params.subscribe((r: any) => {
      if (r.id) {
        api.course.participant(r.id).subscribe((res: any) => this.participants = res.data)
      }
    })
  }

  ngOnInit(): void { }

}
