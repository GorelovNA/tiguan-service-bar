import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ColorType, Job, JobType } from '../shared/job.interface';

@Component({
    selector: 'app-job-list',
    templateUrl: './job-list.component.html',
    styleUrls: ['./job-list.component.scss']
})
// @ts-ignore
export class JobListComponent implements OnInit {
    @Input() set jobs(res: Job[]) {
        this.timeJobs = new MatTableDataSource(res.filter(r => r.type === JobType.Time));
        this.kmJobs = new MatTableDataSource(res.filter(r => r.type === JobType.Km));
    }

    // @ts-ignore
    timeJobs: MatTableDataSource<Job>;
    // @ts-ignore
    kmJobs: MatTableDataSource<Job>;


    displayedColumns: string[] = ['title', 'colorType', 'planValue', 'description', 'createDate'];

    colorType = ColorType;

    // @ts-ignore
    // @ViewChild(MatSort) sort1: MatSort;
    @ViewChild('table1', { static: false, read: MatSort }) sort1: MatSort;
    // @ts-ignore
    @ViewChild('table2', { static: false, read: MatSort }) sort2: MatSort;

    ngAfterViewInit() {
      this.kmJobs.sort = this.sort1;
      this.timeJobs.sort = this.sort2;
    }

}
