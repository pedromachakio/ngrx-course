import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { delay, map, tap, withLatestFrom } from "rxjs/operators";
import { Course } from "../model/course";
import { Lesson } from "../model/lesson";
import { CourseEntityService } from "../services/courses-entity.service";
import { LessonEntityService } from "../services/lesson-entity.service";

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit {
  course$: Observable<Course>;

  loading$: Observable<boolean>;

  lessons$: Observable<Lesson[]>;

  displayedColumns = ["seqNo", "description", "duration"];

  nextPage = 0;

  constructor(
    private coursesService: CourseEntityService,
    private lessonService: LessonEntityService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const courseUrl = this.route.snapshot.paramMap.get("courseUrl"); //comes from the browser URL we access via router snapshot

    this.course$ = this.coursesService.entities$.pipe(
      map(
        (listOfCourses) =>
          listOfCourses.find((course) => course.url == courseUrl) // encontrar no array de courses o primeiro cujo URL corresponder ao da linha 41
      )
    );

    this.lessons$ = this.lessonService.entities$.pipe(
      withLatestFrom(this.course$), // produces observable which emits pairs of values; complete list of entities and course
      tap(([lessons, course]) => {
        if (this.nextPage === 0) {
          this.loadLessonsPage(course);
        }
      }),
      map(([lessons, course]) =>
        lessons.filter((lesson) => lesson.courseId == course.id)
      ) // courseId is one of the properties in the lesson model
    );

    this.loading$ = this.lessonService.loading$.pipe(delay(0)); // emits true when service is fetching data from BE
  }

  loadLessonsPage(course: Course) {
    this.lessonService.getWithQuery({
      courseId: course.id.toString(),
      pageNumber: this.nextPage.toString(),
      pageSize: "3",
    });
    this.nextPage += 1;
  }
}
