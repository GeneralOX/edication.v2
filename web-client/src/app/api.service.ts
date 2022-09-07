import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  URL = "http://localhost:3000";

  public session = new SessionService();
  public event = new EventService(this.http, this.URL);
  public course = new CourseService(this.http, this.URL);
  public user = new UserService(this.http, this.URL);
}


class CourseService {
  constructor(private http: HttpClient, private URL: string) { }

  all() {
    return this.http.get<any[]>(`${this.URL}/courses/find`)
  }
  one(id: string) {
    return this.http.get<any[]>(`${this.URL}/courses/find/${id}`)
  }
  create(id: string, obj: any) {
    return this.http.post<any[]>(`${this.URL}/courses/create/${id}`, obj)
  }
  update(id: string, obj: any) {
    return this.http.post<any[]>(`${this.URL}/courses/update/${id}`, obj)
  }
  delete(id: string) {
    return this.http.post<any[]>(`${this.URL}/courses/delete/${id}`, {})
  }
  join(postId: string, obj: any) {
    return this.http.post<any[]>(`${this.URL}/courses/join/${postId}`, obj)
  }
  participant(postId: string) {
    return this.http.post<any[]>(`${this.URL}/courses/participant/${postId}`, {})
  }
}

class EventService {
  constructor(private http: HttpClient, private URL: string) { }

  all() {
    return this.http.get<any[]>(`${this.URL}/events/find`)
  }
  join(postId: string, obj: any) {
    return this.http.post<any[]>(`${this.URL}/events/join/${postId}`, obj)
  }
  one(id: string) {
    return this.http.get<any[]>(`${this.URL}/events/find/${id}`)
  }
  create(id: string, obj: any) {
    return this.http.post<any[]>(`${this.URL}/events/create/${id}`, obj)
  }
  update(id: string, obj: any) {
    return this.http.post<any[]>(`${this.URL}/events/update/${id}`, obj)
  }
  delete(id: string) {
    return this.http.post<any[]>(`${this.URL}/events/delete/${id}`, {})
  }
  participant(postId: string) {
    return this.http.post<any[]>(`${this.URL}/events/participant/${postId}`, {})
  }
}

class UserService {
  constructor(private http: HttpClient, private URL: string) { }

  all() {
    return this.http.get<any[]>(`${this.URL}/users/find`)
  }
  one(id: string) {
    return this.http.get<any[]>(`${this.URL}/users/find/${id}`)
  }
  confirm(id: string) {
    return this.http.get<any[]>(`${this.URL}/users/confirm/${id}`)
  }
  delete(id: string) {
    return this.http.get<any[]>(`${this.URL}/users/delete/${id}`)
  }
  update(id: string, obj: any) {
    return this.http.post<any[]>(`${this.URL}/users/update/${id}`, obj)
  }

  register(obj: any) {
    return this.http.post<any[]>(`${this.URL}/auth/register`, obj)
  }

  login(obj: any) {
    return this.http.post<any[]>(`${this.URL}/auth/login`, obj)
  }

  courses(id: string) {
    return this.http.post<any[]>(`${this.URL}/users/courses/${id}`, {})
  }

  events(id: string) {
    return this.http.post<any[]>(`${this.URL}/users/events/${id}`, {})
  }


  my_courses(id: string) {
    return this.http.post<any[]>(`${this.URL}/users/my-courses/${id}`, {})
  }

  my_events(id: string) {
    return this.http.post<any[]>(`${this.URL}/users/my-events/${id}`, {})
  }
}

class SessionService {
  getUser() {
    const user = localStorage.getItem("user")
    return user != null
      ? JSON.parse(user!)
      : null
  }
  setUser(obj: any) {
    localStorage.setItem("user", JSON.stringify(obj))
  }
  clearUser() {
    localStorage.clear();
  }

  PermissionRedirect(n: number) {
    if (n == 3)
      return "student"
    else if (n == 2)
      return "instructor"
    else if (n == 1)
      return "admin"
    else
      return "null"
  }
}