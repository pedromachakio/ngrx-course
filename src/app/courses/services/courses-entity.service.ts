
import { Injectable } from "@angular/core";
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from "@ngrx/data";
import { Course } from "../model/course";

@Injectable()
export class CourseEntityService extends EntityCollectionServiceBase<Course> {
  // allows to query data from store

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super("Course", serviceElementsFactory); // entity name is 1st arg
  }
}

// ao instanciar este serviço, CourseEntityService, vamos poder fazer requests ao backend como getAll, without having had to code
// hundreds of lines like the previous manual implementation, e tmb vamos poder guardar na store