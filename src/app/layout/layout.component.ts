import { Component } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import { Job } from '../shared/job.interface';
import { JobEditDialogComponent } from './job-edit-dialog/job-edit-dialog.component';
import { JobsService } from './jobs.service';
import { BaseComponent } from '../shared/base.class';
import { MatDialog } from '@angular/material/dialog';

export const TIGUAN_PURCHASE_DATE: Date = new Date(2021, 3, 1); // 1 Apr 21

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends BaseComponent {
  allJobs = this.jobsService.allJobs;
  kmJobs = this.jobsService.kmJobs;
  timeJobs = this.jobsService.timeJobs;

  userRole = this.authService.userRole;

  isAdmin = this.authService.isAdmin;

  currentKmValue = Number(localStorage.getItem('currentKmValue') || '0');

  isLoading = this.jobsService.isLoading;

  readonly possTime: number = // время владения
    this.monthDiff(TIGUAN_PURCHASE_DATE, new Date());

  constructor(
    private dialog: MatDialog,
    private jobsService: JobsService,
    private authService: AuthService
  ) {
    super();
  }

  add(): void {
    this.openJobDialog();
  }

  onEdit(id: string): void {
    this.openJobDialog(this.allJobs().find(j => j.id === id));
  }

  onDelete(id: string): void {
    this.jobsService.setJobs(this.allJobs().filter(j => j.id !== id));
  }

  logout(): void {
    this.authService.logout();
  }

  private openJobDialog(job: Job | null = null): void {
    const dialogRef = this.dialog.open(JobEditDialogComponent, {
      data: job
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(r => !!r),
        takeUntil(this.destroy$)
      )
      .subscribe(result => {
        console.log(`Dialog result: `, JSON.stringify(result));
        const currJobIndex = this.allJobs().findIndex(j => j.id === result?.id);

        if (currJobIndex !== -1) {
          const arr = [...this.allJobs()];
          arr.splice(currJobIndex, 1, result);
          this.jobsService.setJobs(arr);
        } else {
          this.jobsService.setJobs([...this.allJobs(), result]);
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
