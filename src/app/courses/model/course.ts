export interface Course {
  id: number; // convém ser id para interagir properly com o selectId no course.reducer.ts adapter
  seqNo: number;
  url: string;
  iconUrl: string;
  courseListIcon: string;
  description: string;
  longDescription?: string;
  category: string;
  lessonsCount: number;
  promo: boolean;
}

export function compareCourses(c1: Course, c2: Course) {
  const compare = c1.seqNo - c2.seqNo;

  if (compare > 0) {
    return 1;
  } else if (compare < 0) {
    return -1;
  } else return 0;
}
