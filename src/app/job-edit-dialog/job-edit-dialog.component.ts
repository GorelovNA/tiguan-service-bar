import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFormBuilder, IFormGroup } from '@rxweb/types';
import { ColorType, Job, JobType } from '../shared/job.interface';
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'app-job-edit-dialog',
    templateUrl: './job-edit-dialog.component.html',
    styleUrls: ['./job-edit-dialog.component.scss']
})
export class JobEditDialogComponent {

    form: IFormGroup<Job>;

    jobType = JobType;
    colorType = ColorType;

    get type(): JobType {
        return this.form.getRawValue().type;
    }

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<JobEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Job | null = null,
    ) {
        this.form = (this.fb as IFormBuilder).group<Job>({
            id: [data?.id || uuidv4()],
            title: [data?.title || '', Validators.required],
            type: [!!data ? data.type : JobType.Km, Validators.required],
            colorType: [data?.colorType || ColorType.Zamena, Validators.required],
            planValue: [data?.planValue || null, Validators.required],
            delayValue: [data?.delayValue || null],
            description: [data?.description || ''],
            justOnce: [data?.justOnce || false],
            complitedJobs: [[]]
        });
    }

    save() {
        this.dialogRef.close({
            ...this.form.getRawValue(),
            createDate: new Date(),

        });
    }

}
