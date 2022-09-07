import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guard/admin.guard';
import { InstructorGuard } from './guard/instructor.guard';
import { StudentGuard } from './guard/student.guard';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./view/base/base.module').then(m => m.BaseModule),
  },

  {
    canActivate: [StudentGuard],
    path: "student",
    loadChildren: () => import('./view/student/student.module').then(m => m.StudentModule),
  },
  {
    canActivate: [InstructorGuard],
    path: "instructor",
    loadChildren: () => import('./view/instructor/instructor.module').then(m => m.InstructorModule),
  },
  {
    canActivate: [AdminGuard],

    path: "admin",
    loadChildren: () => import('./view/admin/admin.module').then(m => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
