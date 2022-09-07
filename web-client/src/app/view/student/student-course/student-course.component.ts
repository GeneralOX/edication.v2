import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html'
})
export class StudentCourseComponent implements OnInit {
  courses: any[] = [];
  constructor(private api: ApiService) {
    const user = this.api.session.getUser();
    if (user == null) {

      return;
    }
    api.user.my_courses(user._id).subscribe((res: any) => {
      this.courses = res.data;
    })
  }

  ngOnInit(): void {
  }

}
