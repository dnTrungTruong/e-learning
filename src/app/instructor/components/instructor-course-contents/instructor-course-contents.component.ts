import { Component, Input, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CourseService, SectionService, FileService, LectureService, ResourceService, AnnouncementService } from '../../../services'
import { Section, CourseDetails, Lecture, Resource, Announcement } from '../../../models'
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import * as CustomEditor from '../../../ckeditor5-custom-build/build/ckeditor';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-instructor-course-contents',
  templateUrl: './instructor-course-contents.component.html',
  styleUrls: ['./instructor-course-contents.component.css']
})
export class InstructorCourseContentsComponent implements OnInit {

  @Input() courseId: string;
  @Input() course: CourseDetails;
  @ViewChild('closeSectionModal') closeSectionModal: ElementRef
  @ViewChild('closeLectureModal') closeLectureModal: ElementRef
  @ViewChild('closeResourceModal') closeResourceModal: ElementRef
  @ViewChild('closeAnnouncementModal') closeAnnouncementModal: ElementRef

  disabled: Boolean = false;

  sectionForm: FormGroup;
  isEditingSection: Boolean = false;
  sectionIndex: number = -1;

  lectureForm: FormGroup;
  isEditingLecture: Boolean = false;
  lectureObj: File;
  unSavedLecture: Boolean = false;
  lectureProgress: { percentage: number } = { percentage: 0 };
  lectureUrl: string = `${environment.apiUrl}/file/s3/`
  isUploading: Boolean = false;
  player: any;
  source: any;
  lectureIndex: number = -1;
  currentTime = new Date();

  announcementForm: FormGroup;
  isEditingAnnouncement: Boolean = false;

  resourceForm: FormGroup;
  isEditingResource: Boolean = false;
  selectedResources: FileList;
  currentResourceUpload: File;
  resourceProgress: { percentage: number } = { percentage: 0 };
  unSavedResource: Boolean = false;
  resourceType: string = 'Upload';

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

  constructor(
    private courseService: CourseService,
    private sectionService: SectionService,
    private lectureService: LectureService,
    private resourceService: ResourceService,
    private announcementService: AnnouncementService,
    private fileService: FileService,
    private router: Router,
    private formBuilder: FormBuilder,
    private elRef: ElementRef
  ) { }

  ngOnInit(): void {

    this.sectionForm = this.formBuilder.group({
      _id: [''],
      name: ['',
        [
          Validators.required,
          Validators.maxLength(100),
        ]
      ],
      course: ['', Validators.required]
    });

    this.lectureForm = this.formBuilder.group({
      _id: [''],
      name: ['',
        [
          Validators.required,
          Validators.maxLength(100),
        ]
      ],
      section: ['', Validators.required],
      course: ['', Validators.required],
      url: ['', Validators.required],
      createdDate: [new Date()]
      
    });

    this.resourceForm = this.formBuilder.group({
      _id: [''],
      name: ['',
        [
          Validators.required,
          Validators.maxLength(100),
        ]
      ],
      lecture: ['', Validators.required],
      url: ['', Validators.required]
    });

    this.announcementForm = this.formBuilder.group({
      _id: [''],
      title: ['',
        [
          Validators.required,
          Validators.maxLength(100),
        ]
      ],
      course: ['', Validators.required],
      section: ['', Validators.required],
      content: ['', Validators.required]
    });
    if ((this.course.status == 'approved' || this.course.status == 'pending') && this.course.type == 'mooc') {
      this.sectionForm.disable();
      this.lectureForm.disable();
      this.resourceForm.disable();
      this.disabled = true;
    }
  }

  loadCourseInformation() {
    if (this.course) {
      this.courseService.getCourseLearningDetails(this.course._id).subscribe((course: CourseDetails) => {
        this.course = course;
      })
    }
  }

  onSubmitSection() {
    if (this.sectionForm.invalid) {
      return;
    }
    if (this.isEditingSection) {
      this.sectionService.editSection(this.sectionForm.value)
        .subscribe(res => {
          if (res.message = "success") {
            this.loadCourseInformation();
            this.closeSectionModal.nativeElement.click();
          }
          else {
            alert(res.message);
          }
        })
    }
    else {

      if (this.sectionIndex != -1) {
        this.sectionService.postNewSection(this.sectionForm.value, this.sectionIndex)
          .subscribe(res => {
            if (res.message = "success") {
              this.loadCourseInformation();
              this.closeSectionModal.nativeElement.click();
            }
            else {
              alert(res.message);
            }
          })
      }
      else {
        this.sectionService.postNewSection(this.sectionForm.value)
          .subscribe(res => {
            if (res.message = "success") {
              this.loadCourseInformation();
              this.closeSectionModal.nativeElement.click();
            }
            else {
              alert(res.message);
            }
          })
      }
    }

  }

  public addNewSection(index?: number) {
    this.isEditingSection = false;
    if (index && index > 0) {
      this.sectionIndex = index;
    }
    else {
      this.sectionIndex = -1;
    }
    this.sectionForm.setValue({ _id: '', name: '', course: this.courseId });
  }

  public editSection(section: Section) {
    this.isEditingSection = true;
    this.sectionForm.setValue({ _id: section._id, name: section.name, course: section.course });
  }

  onSubmitLecture() {
    if (this.lectureForm.invalid) {
      return;
    }

    if (this.isEditingLecture) {
      this.lectureService.editLecture(this.lectureForm.value)
        .subscribe(res => {
          if (res.message = "success") {
            this.loadCourseInformation();
            this.closeLectureModal.nativeElement.click();
          }
          else {
            alert(res.message);
          }
        })
    }
    else {
      if (this.lectureIndex != -1) {
        this.lectureService.postNewLecture(this.lectureForm.value, this.lectureIndex)
          .subscribe(res => {
            if (res.message = "success") {
              this.loadCourseInformation();
              this.closeLectureModal.nativeElement.click();
            }
            else {
              alert(res.message);
            }
          })
      }
      else {
        this.lectureService.postNewLecture(this.lectureForm.value)
          .subscribe(res => {
            if (res.message = "success") {
              this.loadCourseInformation();
              this.closeLectureModal.nativeElement.click();
            }
            else {
              alert(res.message);
            }
          })
      }

    }
  }

  public addNewLecture(sectionId: string, index?: number) {
    this.currentTime = new Date();
    this.isEditingLecture = false;
    this.isUploading = false;
    this.unSavedLecture = false;
    this.lectureObj = undefined;
    if (index && index > 0) {
      this.lectureIndex = index;
    }
    else {
      this.lectureIndex = -1;
    }
    
    if (this.course.type == 'mooc') {
      this.lectureForm.setValue({
        _id: '',
        name: '',
        course: this.courseId,
        section: sectionId,
        url: '',
        
      });
      this.lectureProgress.percentage = 0;
      this.source = this.elRef.nativeElement.querySelector('source');
      this.source.src = '';
      this.player = this.elRef.nativeElement.querySelector('video');
      this.player.load();
    }
    else {
      this.lectureForm.setValue({
        _id: '',
        name: '',
        course: this.courseId,
        section: sectionId,
        url: '',
        createdDate: this.currentTime
      });
    }
  }

  public editLecture(lecture: Lecture) {
    this.currentTime = new Date();
    this.isEditingLecture = true;
    this.isUploading = false;
    this.unSavedLecture = false;
    this.lectureObj = undefined;
    
    if (this.course.type == 'mooc') {
      this.lectureForm.setValue({
        _id: lecture._id,
        name: lecture.name,
        course: lecture.course,
        section: lecture.section,
        url: lecture.url,
      });
      this.lectureProgress.percentage = 0;
      this.source = this.elRef.nativeElement.querySelector('source');
      this.source.src = '';
      this.player = this.elRef.nativeElement.querySelector('video');
      this.player.load();
    }
    else {
      this.lectureForm.setValue({
        _id: lecture._id,
        name: lecture.name,
        course: lecture.course,
        section: lecture.section,
        url: lecture.url,
        createdDate: lecture.createdDate
      });
    }
  }

  onLecturePicked(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.lectureObj = FILE;
  }

  onLectureUpload() {
    if (!this.lectureObj) {
      return
    }
    this.isUploading = true;
    this.unSavedResource = true;
    this.fileService.getpresignedurls(this.lectureObj.name, this.lectureObj.type, this.courseId).subscribe(res => {
      if (res.message === "success") {
        const fileuploadurl = res.data[0];
        const imageForm = new FormData();
        imageForm.append('image', this.lectureObj);
        let start = 0;
        this.fileService.uploadfileAWSS3(fileuploadurl, this.lectureObj.type, this.lectureObj).subscribe((event) => {
          if (start === 0) {
            start = Date.now();
          }
          if (event.type === HttpEventType.UploadProgress) {
            this.lectureProgress.percentage = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.lectureObj = undefined;
            this.lectureForm.patchValue({ url: res.data[1] });
            this.isUploading = false;
            this.source = this.elRef.nativeElement.querySelector('source');
            this.source.src = this.lectureUrl + this.courseId + '/' + res.data[1];
            this.player = this.elRef.nativeElement.querySelector('video');
            this.player.load();

          }
        });
      }
    });
  }

  closeLecture() {
    if (this.isUploading || this.unSavedLecture) {
      if (confirm('WARNING: You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.')) {
        this.isUploading = false;
        this.closeLectureModal.nativeElement.click();
      }
    }
    else {
      this.closeLectureModal.nativeElement.click();
    }
  }

  onSubmitResource() {
    if (this.resourceForm.invalid) {
      return;
    }
    if (this.isEditingResource) {
      this.resourceService.editResource(this.resourceForm.value)
        .subscribe(res => {
          this.unSavedResource = false;
          if (res.message = "success") {
            this.loadCourseInformation();
            this.closeResourceModal.nativeElement.click();
          }
          else {
            alert(res.message);
          }
        })
    }
    else {
      this.resourceService.postNewResource(this.resourceForm.value)
        .subscribe(res => {
          this.unSavedResource = false;
          if (res.message = "success") {
            this.loadCourseInformation();
            this.closeResourceModal.nativeElement.click();
          }
          else {
            alert(res.message);
          }
        })
    }
  }

  public addNewResource(lectureId: string) {
    this.isEditingResource = false;
    this.isUploading = false;
    this.unSavedResource = false;
    this.currentResourceUpload = undefined;
    this.resourceForm.setValue({ _id: '', name: '', lecture: lectureId, url: '' });
  }

  public editResource(resource: Resource) {
    this.isEditingResource = true;
    this.isUploading = false;
    this.unSavedResource = false;
    this.currentResourceUpload = undefined;
    if (resource.url.includes("http://localhost:3000/api/file/s3")) {
      this.resourceType = 'Upload';
      this.resourceForm.get('url').disable();
    }
    else {
      this.resourceType = 'Link'
    }
    this.resourceForm.setValue({
      _id: resource._id,
      name: resource.name,
      lecture: resource.lecture,
      url: resource.url
    });
  }

  selectResource(event) {
    if (event.target.files && event.target.files[0]) {
      this.selectedResources = event.target.files;
    }
  }

  uploadResource() {
    if (this.selectedResources) {
      this.resourceProgress.percentage = 0;

      this.isUploading = true;
      this.unSavedResource = true;
      this.currentResourceUpload = this.selectedResources.item(0);
      this.fileService.uploadFile(this.currentResourceUpload, this.courseId).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.resourceProgress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          let jsonString = JSON.stringify(event.body);
          let jsonObj = JSON.parse(jsonString);
          let responseMsg = JSON.parse(jsonObj)['message'];
          if (responseMsg == "success") {
            let resourceURL = JSON.parse(jsonObj)['data'];
            this.resourceForm.patchValue({ url: resourceURL });
          }
          else {
            alert(responseMsg);
          }
          this.currentResourceUpload = undefined;
          this.isUploading = false;
        }
      });

      this.selectedResources = undefined;
    }
  }

  selectResourceType(type: string) {
    this.resourceType = type;
    if (type == 'Link') {
      this.resourceForm.get('url').enable();
    }
    else {
      this.resourceForm.get('url').disable();
    }
  }

  closeResource() {
    if (this.unSavedResource) {
      if (confirm('WARNING: You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.')) {
        this.isUploading = false;
        this.closeResourceModal.nativeElement.click();
      }
    }
    else {
      this.closeResourceModal.nativeElement.click();
    }
  }

  onSubmitAnnouncement() {
    if (this.announcementForm.invalid) {
      return;
    }
    let body = {
      title: this.announcementForm.get('title').value,
      course: this.announcementForm.get('course').value,
      section: this.announcementForm.get('section').value,
      content: this.announcementForm.get('content').value,
    };
    if (this.isEditingAnnouncement) {
      this.announcementService.editAnnouncement(body, this.announcementForm.get('_id').value)
        .subscribe(res => {
          if (res.message = "success") {
            this.loadCourseInformation();
            this.closeAnnouncementModal.nativeElement.click();
          }
          else {
            alert(res.message);
          }
        })
    }
    else {
      this.announcementService.postAnnouncement(body)
          .subscribe(res => {
            if (res.message = "success") {
              this.loadCourseInformation();
              this.closeAnnouncementModal.nativeElement.click();
            }
            else {
              alert(res.message);
            }
          })
    }

  }

  public addNewAnnouncement(sectionId: string) {
    this.isEditingAnnouncement = false;
    this.announcementForm.setValue({ _id: '', title: '', course: this.courseId, section: sectionId, content: '' });
  }

  public editAnnouncement(announcement: Announcement, sectionId: string) {
    this.isEditingAnnouncement = true;
    this.announcementForm.setValue({ 
      _id: announcement._id, 
      title: announcement.title, 
      course: announcement.course,
      content: announcement.content,
      section: sectionId
    });
  }

  closeAnnouncement() {
    this.closeAnnouncementModal.nativeElement.click();
  }
}
