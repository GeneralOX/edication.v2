import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorComponent } from './instructor/instructor.component';
import { InstructorCoursesComponent } from './instructor-courses/instructor-courses.component';
import { InstructorEventsComponent } from './instructor-events/instructor-events.component';
import { RouterModule, Routes } from '@angular/router';
import { InstructorCourseComponent } from './instructor-course/instructor-course.component';
import { InstructorEventComponent } from './instructor-event/instructor-event.component';
import { SharedModule } from '../shared/shared.module';
import { EventParticipantComponent } from './event-participant/event-participant.component';
import { CourseParticipantComponent } from './course-participant/course-participant.component';


const routes: Routes = [
  {
    path: "", component: InstructorComponent, children: [
      { path: "courses", component: InstructorCoursesComponent },
      { path: "course", component: InstructorCourseComponent },
      { path: "course/:id", component: InstructorCourseComponent },
      { path: "events", component: InstructorEventsComponent },
      { path: "event", component: InstructorEventComponent },
      { path: "event/:id", component: InstructorEventComponent },
      { path: "course/participant/:id", component: CourseParticipantComponent },
      { path: "event/participant/:id", component: EventParticipantComponent },
    ]
  },
];
@NgModule({
  declarations: [
    InstructorComponent,
    InstructorCoursesComponent,
    InstructorEventsComponent,
    InstructorCourseComponent,
    InstructorEventComponent,
    EventParticipantComponent,
    CourseParticipantComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class InstructorModule { }
