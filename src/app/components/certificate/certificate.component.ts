import { Component, OnInit } from '@angular/core';
import { CertificateService } from '../../services';
import { Certificate } from '../../models';
import { Router } from "@angular/router"
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {

  certId: string;
  certificate: Certificate;

  constructor(
    public certificateService: CertificateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.certId = this.route.snapshot.paramMap.get('certId');

    this.certificateService.getCertificate(this.certId).subscribe((certificate: Certificate) => {
      this.certificate = certificate;
      console.log(this.certificate);
    })
    
  }

  ngOnInit(): void {
  }

}
