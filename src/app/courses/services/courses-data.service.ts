import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Course } from "../model/course";

@Injectable()
export class CoursesDataService extends DefaultDataService<Course> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    // to customize we use HttpUrlGenerator
    // this service is only needed to customize Url otherwise not needed if it follows conventions /api/plural
    super("Course", http, httpUrlGenerator);
  }

  // to customize default behaviour
  getAll(): Observable<Course[]> {
    return this.http
      .get("api/courses")
      .pipe(map((backendResponse) => backendResponse["payload"])); // default property was payload and now we are accessing it to get all courses
  }
}
