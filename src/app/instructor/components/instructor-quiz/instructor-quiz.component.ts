import { Component, OnInit, } from '@angular/core';


interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-instructor-quiz',
  templateUrl: './instructor-quiz.component.html',
  styleUrls: ['./instructor-quiz.component.css']
})
export class InstructorQuizComponent implements OnInit {

 

  constructor(
 
  ) { }

  ngOnInit(): void {
  }
}
