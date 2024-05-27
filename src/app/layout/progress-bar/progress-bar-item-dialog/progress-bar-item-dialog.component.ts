import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobGraphDetails, JobGraphItem } from '../progress-bar.component';
import { MaterialModule } from '../../../shared/material.module';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ColorType, Job } from '../../../shared/job.interface';
import { TIGUAN_PURCHASE_DATE } from '../../layout.component';
import { JobsService } from '../../jobs.service';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../../../shared/base.class';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-progress-bar-item-dialog',
  templateUrl: './progress-bar-item-dialog.component.html',
  styleUrl: './progress-bar-item-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class ProgressBarItemDialogComponent extends BaseComponent {
  ColorType = ColorType;

  isAdmin = this.authService.isAdmin;

  get jobList(): Job[] {
    return this.jobsService.jobsSubject$.value || [];
  }

  constructor(
    public dialogRef: MatDialogRef<ProgressBarItemDialogComponent>,
    private jobsService: JobsService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: { item: JobGraphItem; isKmType: boolean }
  ) {
    super();
  }

  getDateByValue(value: number): Date {
    const startDate = new Date(TIGUAN_PURCHASE_DATE.getTime());
    return new Date(startDate.setMonth(startDate.getMonth() + value));
  }

  onCompliteChanged(item: JobGraphItem, job: JobGraphDetails, event: MatCheckboxChange): void {
    job.jobComplited = event.checked;
    item.complited = item.jobs.every(j => j.jobComplited);

    const existedJob = this.jobList.find(j => j.id === job.id);
    if (!event.checked) {
      existedJob!.complitedJobs = existedJob!.complitedJobs.filter(c => c.value !== job.value);
    } else {
      existedJob!.complitedJobs.push({ value: job.value });
    }

    this.jobsService.updateList(this.jobList).pipe(takeUntil(this.destroy$)).subscribe();
  }
}
