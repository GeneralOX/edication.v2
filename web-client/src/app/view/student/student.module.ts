import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentCourseComponent } from './student-course/student-course.component';
import { StudentEventComponent } from './student-event/student-event.component';
import { StudentComponent } from './student/student.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "", component: StudentComponent, children: [
      { path: "courses", component: StudentCourseComponent },
      { path: "events", component: StudentEventComponent },
    ]
  },
];


@NgModule({
  declarations: [
    StudentCourseComponent,
    StudentEventComponent,
    StudentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class StudentModule { }
