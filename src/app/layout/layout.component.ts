import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, skip, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { Job } from '../shared/job.interface';
import { JobEditDialogComponent } from './job-edit-dialog/job-edit-dialog.component';
import { JobGraphDetails } from './progress-bar/progress-bar.component';
import { JobsService } from '../core/jobs.service';
import { BaseComponent } from '../shared/base.class';

export const TIGUAN_PURCHASE_DATE: Date = new Date('04-01-2021'); // 1 Apr 21

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends BaseComponent implements OnInit {
    allJobs$: Observable<Job[]> = this.jobsService.jobsSubject$.asObservable().pipe(
        filter((jobs): jobs is Job[] => !!jobs),
    );
    kmJobs$: Observable<Job[]> = this.jobsService.kmJobs$;
    timeJobs$: Observable<Job[]> = this.jobsService.timeJobs$;

    user$ = this.authService.userRole$;

    isAdmin$: Observable<boolean> = this.authService.isAdmin$;

    get jobList(): Job[] {
        return this.jobsService.jobsSubject$.value || [];
    }

    readonly possTime: number = // время владения
        this.monthDiff(TIGUAN_PURCHASE_DATE, new Date());

    constructor(
        private dialog: MatDialog,
        private jobsService: JobsService,
        private authService: AuthService,
    ) {
        super();
     }

    ngOnInit(): void {
        this.jobsService.getList().pipe(takeUntil(this.destroy$)).subscribe(res => {
            this.jobsService.jobsSubject$.next(res);
        });

        this.jobsService.jobsSubject$.pipe(
            filter((jobs): jobs is Job[] => !!jobs),
            skip(1),
            takeUntil(this.destroy$)
        ).subscribe(res => {
            this.saveJobs(res);
        });
    }

    add(): void {
        this.openJobDialog();
    }

    onEdit(id: string): void {
        this.openJobDialog(this.jobList.find(j => j.id === id));
    }

    onDelete(id: string): void {
        this.jobsService.jobsSubject$.next(this.jobList.filter(j => j.id !== id));
    }

    onJobCompliteChanged(event: { job: JobGraphDetails, checked: boolean }): void {
        const existedJob = this.jobList.find(j => j.id === event.job.id);
        if (!event.checked) {
            existedJob!.complitedJobs = existedJob!.complitedJobs.filter(c => c.value !== event.job.value);
        } else {
            existedJob!.complitedJobs.push({ value: event.job.value });
        }

        this.saveJobs(this.jobList);
    }

    logout(): void {
        this.authService.logout();
    }

    private openJobDialog(job: Job | null = null): void {
        const dialogRef = this.dialog.open(JobEditDialogComponent, {
            data: job
        });

        dialogRef.afterClosed().pipe(
            filter(r => !!r),
            takeUntil(this.destroy$)
        )
            .subscribe(result => {
                console.log(`Dialog result: `, JSON.stringify(result));
                const currJobIndex = this.jobList.findIndex(j => j.id === result?.id);

                if (currJobIndex !== -1) {
                    const arr = [...this.jobList] ;
                    arr.splice(currJobIndex, 1, result);
                    this.jobsService.jobsSubject$.next(arr);
                } else {
                    this.jobsService.jobsSubject$.next([
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

    private saveJobs(jobs: Job[]): void {
        this.jobsService.updateList(jobs).pipe(takeUntil(this.destroy$)).subscribe();
    }
}
