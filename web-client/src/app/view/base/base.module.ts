import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { BaseComponent } from './base.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CoursesComponent } from './courses/courses.component';
import { EventsComponent } from './events/events.component';

const routes: Routes = [
  {
    path: "", component: BaseComponent, children: [
      { path: "", component: HomePageComponent },
      // { path: "events", component: StudentEventComponent },
      // { path: "my-courses", component: MycourseComponent },
    ]
  },
];


@NgModule({
  declarations: [
    HomePageComponent,
    BaseComponent,
    LoginComponent,
    RegisterComponent,
    CoursesComponent,
    EventsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class BaseModule { }
