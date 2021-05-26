import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-manage-payout',
  templateUrl: './admin-manage-payout.component.html',
  styleUrls: ['./admin-manage-payout.component.css']
})
export class AdminManagePayoutComponent implements OnInit {

  revenueReportTimes: { startDate: Date, endDate: Date };
  coursesSalesReportTimes: { startDate: Date, endDate: Date };
  usersSalesReportTimes: { startDate: Date, endDate: Date };

  constructor() {
    let dateOneMonthAgo = new Date();
    let m = dateOneMonthAgo.getMonth();
    dateOneMonthAgo.setMonth(dateOneMonthAgo.getMonth() - 1);

    // If still in same month, set date to last day of 
    // previous month
    if (dateOneMonthAgo.getMonth() == m) dateOneMonthAgo.setDate(0);
    dateOneMonthAgo.setHours(0, 0, 0, 0);

    this.revenueReportTimes = this.coursesSalesReportTimes = this.usersSalesReportTimes = {
      startDate: dateOneMonthAgo,
      endDate: new Date()
    };
  }

  ngOnInit(): void {

  }

  public reportRevenueSales() {
    //alert(`Reporting revenue sales from ${this.revenueReportTimes.startDate} to ${this.revenueReportTimes.endDate}.`);
    alert("Sorry, this function is under development.")
  }

  public reportCoursesSales() {
    //alert(`Reporting courses sales from ${this.revenueReportTimes.startDate} to ${this.revenueReportTimes.endDate}.`);
    alert("Sorry, this function is under development.")
  }
  public reportUsersSales() {
    //alert(`Reporting users sales from ${this.revenueReportTimes.startDate} to ${this.revenueReportTimes.endDate}.`);
    alert("Sorry, this function is under development.")
  }
}
