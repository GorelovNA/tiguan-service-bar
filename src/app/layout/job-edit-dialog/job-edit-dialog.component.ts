import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFormArray, IFormBuilder, IFormGroup } from '@rxweb/types';
import { Job, JobType, ColorType } from '../../shared/job.interface';
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

    get optionalJobsFormArray(): IFormArray<number> {
        return this.form.controls.optionalJobsOn as IFormArray<number>;
    }
    get skippedJobsFormArray(): IFormArray<number> {
        return this.form.controls.skippedJobsOn as IFormArray<number>;
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
            description: [data?.description || ''],
            optionalJobsOn: this.buildFormArray(data?.optionalJobsOn || []),
            skippedJobsOn: this.buildFormArray(data?.skippedJobsOn || []),
            justOnce: [data?.justOnce || false],
            complitedJobs: [[]]
        });

        this.form.valueChanges.subscribe(console.log);
    }

    save(): void {
        const formValue = this.form.getRawValue();

        this.dialogRef.close({
            ...formValue,
            createDate: new Date(),
            optionalJobsOn: formValue.optionalJobsOn.sort((a, b) => {
                return a - b;
            }),
            skippedJobsOn: formValue.skippedJobsOn.sort((a, b) => {
                return a - b;
            }),
        } as Job);
    }

    addNewOptionalJob(): void {
        this.optionalJobsFormArray.push(new FormControl(null, Validators.required));
    }

    addNewSkippedJob(): void {
        this.skippedJobsFormArray.push(new FormControl(null, Validators.required));
    }

    private buildFormArray(value: number[]): IFormArray<number> {
        return (this.fb as IFormBuilder).array(value.map(v => {
            return new FormControl(v, Validators.required);
        }));
    }
}
