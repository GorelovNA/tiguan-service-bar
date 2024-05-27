import { Component, Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Job, JobType, ColorType } from '../../shared/job.interface';
import { v4 as uuidv4 } from 'uuid';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export type FormGroupType<T> = {
  [K in keyof T]: FormControl<T[K] | null>;
};

type JobFormType = Omit<FormGroupType<Job>, 'optionalJobsOn' | 'skippedJobsOn'> & {
  optionalJobsOn: FormArray<FormControl<number | null>>;
  skippedJobsOn: FormArray<FormControl<number | null>>;
};

@Component({
  selector: 'app-job-edit-dialog',
  templateUrl: './job-edit-dialog.component.html',
  styleUrls: ['./job-edit-dialog.component.scss']
})
export class JobEditDialogComponent {
  form: FormGroup<JobFormType>;

  jobType = JobType;
  colorType = ColorType;

  get type(): JobType {
    return this.form.getRawValue().type!;
  }

  get optionalJobsFormArray(): FormArray<FormControl<number | null>> {
    return this.form.controls.optionalJobsOn;
  }
  get skippedJobsFormArray(): FormArray<FormControl<number | null>> {
    return this.form.controls.skippedJobsOn;
  }

  constructor(
    public dialogRef: MatDialogRef<JobEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Job | null = null
  ) {
    this.form = new FormGroup<JobFormType>({
      id: new FormControl(data?.id || uuidv4()),
      title: new FormControl(data?.title || '', Validators.required),
      type: new FormControl(!!data ? data.type : JobType.Km, Validators.required),
      colorType: new FormControl(!!data ? data.colorType : ColorType.Zamena, Validators.required),
      planValue: new FormControl(data?.planValue || null, Validators.required),
      description: new FormControl(data?.description || ''),
      cost: new FormControl(data?.cost || null),
      optionalJobsOn: this.buildFormArray(data?.optionalJobsOn || []),
      skippedJobsOn: this.buildFormArray(data?.skippedJobsOn || []),
      justOnce: new FormControl(data?.justOnce || false),
      complitedJobs: new FormControl(!!data ? data.complitedJobs || [] : [])
    });

    this.form.valueChanges.subscribe(console.log);
  }

  save(): void {
    const formValue = this.form.getRawValue();

    this.dialogRef.close({
      ...formValue,
      createDate: new Date(),
      optionalJobsOn: formValue.optionalJobsOn.sort((a, b) => {
        return a! - b!;
      }),
      skippedJobsOn: formValue.skippedJobsOn.sort((a, b) => {
        return a! - b!;
      })
    } as Job);
  }

  addNewOptionalJob(): void {
    this.optionalJobsFormArray.push(new FormControl(null, Validators.required));
  }

  addNewSkippedJob(): void {
    this.skippedJobsFormArray.push(new FormControl(null, Validators.required));
  }

  private buildFormArray(value: number[]): FormArray<FormControl<number | null>> {
    return new FormArray<FormControl<number | null>>(
      value.map(v => {
        return new FormControl<number | null>(v!, Validators.required);
      })
    );
  }
}
