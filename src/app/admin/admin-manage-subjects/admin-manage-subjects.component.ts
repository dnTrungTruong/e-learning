import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {SubjectService} from '../../services/'
import {Subject} from '../../models/'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-manage-subjects',
  templateUrl: './admin-manage-subjects.component.html',
  styleUrls: ['./admin-manage-subjects.component.css']
})
export class AdminManageSubjectsComponent implements OnInit {

  @ViewChild('closeSubjectModal') closeSubjectModal: ElementRef

  subjectsList: Subject[];
  subjectForm: FormGroup;
  invalidContent: Boolean = false;
  isEditing: Boolean = false;

  constructor(
    private subjectService: SubjectService,
    private formBuilder: FormBuilder
  ) {
    this.loadSubjects();
   }

  ngOnInit(): void {
    this.subjectForm = this.formBuilder.group({
      _id: [''],
      name: ['', 
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]
    ]
    });
  }

  public loadSubjects() {
    this.subjectService.getSubjects()
    .subscribe((subjects: Subject[]) => {
      this.subjectsList = subjects;
    })
  }

  get subjectFormControls() { return this.subjectForm.controls; }



  onSubmit() {
    if (this.subjectForm.invalid) {
      this.invalidContent = true;
      return;
    }
    if (this.isEditing) {
      this.subjectService.editSubject(this.subjectForm.value)
      .subscribe(res => {
        if (res.message = "success") {
          this.loadSubjects();
          this.closeSubjectModal.nativeElement.click();
        }
        else {
          alert(res.message);
        }
      })
    }
    else {
      this.subjectService.postNewSubject(this.subjectForm.value)
      .subscribe(res => {
        if (res.message = "success") {
          this.loadSubjects();
          this.closeSubjectModal.nativeElement.click();
        }
        else {
          alert(res.message);
        }
      })
    }
    
  }

  public addNewSubject() {
    this.isEditing = false;
    this.subjectForm.setValue({_id: '', name: ''});
  }

  public editSubject(subject: Subject) {
    this.isEditing = true;
    this.subjectForm.setValue({_id: subject._id, name: subject.name});
  }

  public deleteSubject(subject: Subject) {
    if(confirm(`Deleting subject: ${subject.name.toString()}? Are you sure you want to delete ${subject.name.toString()}? Please considering this seriously!!!`)) {
      this.subjectService.deleteSubject(subject._id.toString())
      .subscribe(res => {
        if (res.message == "success") {
          this.loadSubjects();
        }
        else {
          alert(res.message);

        }
      })
    }
  }
}
