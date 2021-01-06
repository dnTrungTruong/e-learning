import { TrimCourseNamePipe } from './trim-course-name.pipe';

describe('TrimCourseNamePipe', () => {
  it('create an instance', () => {
    const pipe = new TrimCourseNamePipe();
    expect(pipe).toBeTruthy();
  });
});
