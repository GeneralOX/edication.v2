import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';
import { AdminCourseComponent } from './admin-course/admin-course.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { AdminEventComponent } from './admin-event/admin-event.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminComponent } from './admin/admin.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: "", component: AdminComponent, children: [
      { path: "users", component: AdminUsersComponent },
      { path: "user/:id", component: AdminUserComponent },
      { path: "courses", component: AdminCoursesComponent },
      { path: "course/:id", component: AdminCourseComponent },

      { path: "events", component: AdminEventsComponent },
      { path: "event/:id", component: AdminEventComponent },
    ]
  },
  { path: "**", redirectTo: "/admin/users" }
];

@NgModule({
  declarations: [
    AdminCoursesComponent,
    AdminCourseComponent,
    AdminEventsComponent,
    AdminEventComponent,
    AdminUsersComponent,
    AdminUserComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
