import { Component, OnInit } from '@angular/core';
import { CertificateService } from '../../services';
import { Certificate } from '../../models';
import { Router } from "@angular/router"
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {

  certId: string;
  certificate: Certificate;
  certUTCTime;
  isProgramingCourse: Boolean = false;

  constructor(
    public certificateService: CertificateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.certId = this.route.snapshot.paramMap.get('certId');

    this.certificateService.getCertificate(this.certId).subscribe((certificate: Certificate) => {
      this.certificate = certificate;
      let myMoment: moment.Moment = moment(certificate.date);
      this.certUTCTime = myMoment.utc().format('LLLL');
      this.isProgramingCourse = certificate.course.type == 'programing' ? true : false;
    })

  }

  ngOnInit(): void {
  }

}
