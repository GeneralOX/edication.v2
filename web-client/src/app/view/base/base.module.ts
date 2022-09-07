import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { BaseComponent } from './base.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CoursesComponent } from './courses/courses.component';
import { EventsComponent } from './events/events.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmComponent } from './confirm/confirm.component';

const routes: Routes = [
  {
    path: "", component: BaseComponent, children: [
      { path: "", component: HomePageComponent },
      { path: "register", component: RegisterComponent },
      { path: "login", component: LoginComponent },
      { path: "courses", component: CoursesComponent },
      { path: "events", component: EventsComponent },
      { path: "confirm", component: ConfirmComponent },
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
    EventsComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BaseModule { }
