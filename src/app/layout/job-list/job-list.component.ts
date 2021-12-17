import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { Job, JobType, ColorType } from '../../shared/job.interface';

@Component({
    selector: 'app-job-list',
    templateUrl: './job-list.component.html',
    styleUrls: ['./job-list.component.scss']
})
// @ts-ignore
export class JobListComponent implements OnInit, AfterViewInit {
    @Input() set jobs(res: Job[]) {
        this.timeJobs = new MatTableDataSource(res.filter(r => r.type === JobType.Time));
        this.kmJobs = new MatTableDataSource(res.filter(r => r.type === JobType.Km));

        if (this.sort1) {
            this.kmJobs.sort = this.sort1;
        }
        if (this.sort2) {
            this.timeJobs.sort = this.sort2;
        }
    }

    @Output() edited: EventEmitter<string> = new EventEmitter();
    @Output() deleted: EventEmitter<string> = new EventEmitter();

    isAdmin$: Observable<boolean> = this.authService.isAdmin$;

    // @ts-ignore
    timeJobs: MatTableDataSource<Job>;
    // @ts-ignore
    kmJobs: MatTableDataSource<Job>;


    displayedColumns: string[] = ['title', 'colorType', 'planValue', 'optionalJobsOn', 'skippedJobsOn', 'description', 'createDate', 'id'];

    colorType = ColorType;

    // @ts-ignore
    // @ViewChild(MatSort) sort1: MatSort;
    @ViewChild('table1', { static: false, read: MatSort }) sort1: MatSort;
    // @ts-ignore
    @ViewChild('table2', { static: false, read: MatSort }) sort2: MatSort;

    constructor(private authService: AuthService) { }

    ngAfterViewInit(): void {
      this.kmJobs.sort = this.sort1;
      this.timeJobs.sort = this.sort2;
    }

}
