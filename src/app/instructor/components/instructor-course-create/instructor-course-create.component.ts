import { Component, OnInit } from '@angular/core';
import { CourseService, SubjectService, FileService } from '../../../services/'
import { Subject } from '../../../models/'
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import * as CustomEditor from '../../../ckeditor5-custom-build';
import { HttpResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-instructor-course-create',
  templateUrl: './instructor-course-create.component.html',
  styleUrls: ['./instructor-course-create.component.css']
})
export class InstructorCourseCreateComponent implements OnInit {

  courseInformationForm = this.fb.group({
    type: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    img_url: new FormControl('', Validators.required),
    overview: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required, Validators.minLength(150)]),
    price: new FormControl(5, [Validators.required, Validators.min(1), Validators.pattern(/\-?\d*\.?\d{1,2}/)]),
    objectives: this.fb.array([]),
  });

  isSubmitted: Boolean = false;
  subjectsList: Subject[];
  selectedType: string = "Choose course type";
  selectedSubject: string = "Choose course subject";

  imageURL: string = "https://e-learning-10r825s36vuq028g5csk.s3.amazonaws.com/public_assets/1627223077089-placeholder-image.jpg";
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  public Editor = CustomEditor;
  public editorConfig = {
    toolbar: [
      'heading', '|',
      'bold', 'italic', 'underline', 'link', '|',
      'alignment', '|',
      'fontColor', 'fontBackgroundColor', '|',
      'outdent', 'indent', '|',
      'bulletedList', 'numberedList', '|',
      'code', 'codeblock', '|',
      'insertTable', '|',
      'undo',
      'redo'
    ],
    codeBlock: {
      languages: [
        { language: 'code', label: 'Code' },
        { language: 'html', label: 'HTML' }
      ]
    },
    //
    language: 'en'
  };
  courseDescription: string;


  constructor(
    private courseService: CourseService,
    private subjectService: SubjectService,
    private fileService: FileService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.subjectService.getSubjects().subscribe((subjects: Subject[]) => {
      this.subjectsList = subjects;
    })
  }

  ngOnInit(): void {
  }

  get type() { return this.courseInformationForm.get('type'); }
  get name() { return this.courseInformationForm.get('name'); }
  get subject() { return this.courseInformationForm.get('subject'); }
  get img_url() { return this.courseInformationForm.get('img_url'); }
  get overview() { return this.courseInformationForm.get('overview'); }
  get description() { return this.courseInformationForm.get('description'); }
  get price() { return this.courseInformationForm.get('price'); }

  get objectives() {
    return this.courseInformationForm.controls["objectives"] as FormArray;
  }

  addObjective() {
    const objectiveForm = this.fb.group({
      objective: ['', Validators.required]
    });
    this.objectives.push(objectiveForm);
  }

  deleteObjective(objectiveIndex: number) {
    this.objectives.removeAt(objectiveIndex);
  }

  changeSubject(subject: Subject) {
    this.courseInformationForm.patchValue({ subject: subject._id });
    this.selectedSubject = subject.name.toString();
  }

  changeCourseType(courseType: string) {
    if (courseType == 'mooc') {
      this.selectedType = "MOOC";
    }
    else {
      this.selectedType = "Online";
    }
    this.courseInformationForm.patchValue({ type: courseType });
  }

  selectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFiles = event.target.files;
    }
  }

  upload() {
    if (this.selectedFiles) {
      this.progress.percentage = 0;

      this.currentFileUpload = this.selectedFiles.item(0);
      this.fileService.uploadImage(this.currentFileUpload).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          //this.currentFileUpload = undefined;
          let jsonString = JSON.stringify(event.body);
          let jsonObj = JSON.parse(jsonString);
          this.imageURL = JSON.parse(jsonObj)['data'];
          this.courseInformationForm.patchValue({img_url: this.imageURL});
          this.currentFileUpload = undefined;
        }
      });

      this.selectedFiles = undefined;
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.courseInformationForm.invalid && this.objectives.length) {
      let objectivesArr = [];
      for (let element of this.objectives.value) {
        objectivesArr.push(element.objective);
      }
      let body = {
        name: this.name.value,
        subject: this.subject.value,
        overview: this.overview.value,
        description: this.description.value,
        img_url: this.img_url.value,
        price: this.price.value,
        objective: objectivesArr,
        type: this.type.value,
      };
      this.courseService.createCourse(body).subscribe(res => {
        if (res.message == "success") {
          this.router.navigate(['/instructor']);
        }
        else
        {
          alert(res.message);
        }
      })
    }
  }
}
