import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IFormBuilder, IFormGroup } from '@rxweb/types';
import { ColorType, Job, JobType } from '../shared/job.interface';

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
    ) {
        this.form = (this.fb as IFormBuilder).group<Job>({
            title: ['', Validators.required],
            type: [JobType.Km, Validators.required],
            colorType: [ColorType.Zamena, Validators.required],
            planValue: [null, Validators.required],
            description: [''],
            justOnce: [false],
        });
    }

    save() {
        this.dialogRef.close({
            ...this.form.getRawValue(),
            createDate: new Date()
        });
    }

}
