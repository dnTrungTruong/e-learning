import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimCourseName'
})
export class TrimCourseNamePipe implements PipeTransform {

  private forbiddenChars: string[] = [',', '.', '-', ' '];
  transform(string: string, limit: number = 32, ellipsis: string = '...'): any {
    const strippedString = this.stripHTMLTags(string);
    console.log(strippedString.length)
    let limitedString = strippedString.split('').slice(0, limit).join('');
    if (this.endsWithForbiddenChar(limitedString)) {
      limitedString = limitedString.slice(0, -1);
    }
    if (strippedString.length >32) {
      return `${limitedString}${ellipsis}`;
    }
    return `${limitedString}`;
    
  }

  private stripHTMLTags(string: string): string {
    const tmpDiv = document.createElement('div');
    tmpDiv.innerHTML = string;
    return tmpDiv.textContent;
  }

  private endsWithForbiddenChar(string: string): boolean {
    return this.forbiddenChars.includes(string.slice(-1));
  }

}
