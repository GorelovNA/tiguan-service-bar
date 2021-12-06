import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from './app.service';
import { JobEditDialogComponent } from './job-edit-dialog/job-edit-dialog.component';
import { Job } from './shared/job.interface';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

const TIGUAN_PURCHASE_DATE: Date = new Date('04-01-2021'); // 1 Apr 21

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    allJobs$: Observable<Job[]> = this.appService.jobsSubject$.asObservable();
    kmJobs$: Observable<Job[]> = this.appService.kmJobs$;
    timeJobs$: Observable<Job[]> = this.appService.timeJobs$;

    get jobList(): Job[] {
        return this.appService.jobsSubject$.value;
    }

    readonly possTime: number = // время владения
        this.monthDiff(TIGUAN_PURCHASE_DATE, new Date());

    constructor(
        private dialog: MatDialog,
        private appService: AppService
    ) { }

    ngOnInit(): void {
        this.appService.getList().subscribe(res => {
            this.appService.jobsSubject$.next(res);
        });
    }

    add(): void {
        this.openJobDialog();
    }

    onEdit(id: string): void {
        this.openJobDialog(this.jobList.find(j => j.id === id));
    }

    onDelete(id: string): void {
        this.appService.jobsSubject$.next(this.jobList.filter(j => j.id !== id));
    }

    private openJobDialog(job: Job | null = null): void {
        const dialogRef = this.dialog.open(JobEditDialogComponent, {
            data: job
        });

        dialogRef.afterClosed().pipe(
            filter(r => !!r)
        )
            .subscribe(result => {
                console.log(`Dialog result: `, JSON.stringify(result));
                const currJobIndex = this.jobList.findIndex(j => j.id === result?.id);

                if (currJobIndex !== -1) {
                    const arr = [...this.jobList] ;
                    arr.splice(currJobIndex, 1, result);
                    this.appService.jobsSubject$.next(arr);
                } else {
                    this.appService.jobsSubject$.next([
                        ...this.jobList,
                        result
                    ]);
                }
            });
    }

    private monthDiff(d1: Date, d2: Date): number {
        let months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth();
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    }
}
