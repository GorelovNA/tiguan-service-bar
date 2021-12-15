import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { IFormControl } from '@rxweb/types';
import { Observable } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/base.class';
import { AuthService } from '../../core/auth.service';
import { Job, ColorType, JobType } from '../../shared/job.interface';
import { TIGUAN_PURCHASE_DATE } from '../layout.component';


export const MAX_KM_SIZE = 300; // т.км
export const MAX_TIME_SIZE = 84; // мес (7лет)

interface JobGraphItem {
    value: number; // итоговый пробег / время
    jobs: JobGraphDetails[]; // работы на данном пробеге / времени
    icon: string;
    complited: boolean;
}


export interface JobGraphDetails extends Job {
    value: number; // итоговый пробег / время
    jobComplited: boolean;
}

@Component({
    selector: 'app-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent extends BaseComponent implements OnInit {
    isAdmin$: Observable<boolean> = this.authService.isAdmin$;

    jobGraphItems: JobGraphItem[] = [];

    colorType = ColorType;
    graphScale = 0; // progress scale value (default: 40 tkm, 24mes)
    jobType: JobType | null = null;

    scaleSteps: { value: number; text: string | Date }[] = [];

    currentValueCtrl: IFormControl<number> = new FormControl(0);

    get isKmType(): boolean {
        return this.jobType === JobType.Km;
    }

    get MAX_VALUE(): number {
        return this.isKmType ? MAX_KM_SIZE : MAX_TIME_SIZE;
    }

    get progreesBarWidth(): number {
        return (this.MAX_VALUE / this.graphScale) * 100;
    }
    get progreesBarValue(): number {
        return (this.currentValue * 100) / this.MAX_VALUE;
    }

    @Input() set currentValue(value: number) { // текущий пробег / время владения
        this.currentValueCtrl.setValue(value || 0);
    }

    get currentValue(): number {
        return this.currentValueCtrl.value!;
    }

    @Input() set jobs(_jobs: Job[]) {
        this.jobType = _jobs[0]?.type;

        this.jobGraphItems = [];

        _jobs.forEach(j => {
            if (j.justOnce) {
                const value = j.delayValue || j.planValue;
                const sameValueItem = this.jobGraphItems.find(i => i.value === value);

                if (sameValueItem) {
                    sameValueItem.jobs.push({
                        ...j,
                        value,
                        jobComplited: j.complitedJobs?.some(jb => jb.value === value) || false,
                    });
                    sameValueItem.icon = this.getJobIcon(sameValueItem);
                    sameValueItem.complited = sameValueItem.jobs.every(j => j.jobComplited);
                } else {
                    const job: JobGraphDetails = {
                        ...j,
                        value,
                        jobComplited: j.complitedJobs?.some(jb => jb.value === value) || false
                    };

                    const item: JobGraphItem = {
                        value,
                        jobs: [job],
                        icon: '',
                        complited: job.jobComplited
                    };
                    this.jobGraphItems.push({
                        ...item,
                        icon: this.getJobIcon(item)
                    });
                }
            } else {
                const planValue = j.planValue;
                let value = j.delayValue || planValue;
                while (value <= this.MAX_VALUE) {
                    const sameValueItem = this.jobGraphItems.find(i => i.value === value);

                    if (sameValueItem) {
                        sameValueItem.jobs.push({
                            ...j,
                            value,
                            jobComplited: j.complitedJobs?.some(jb => jb.value === value) || false
                        });
                        sameValueItem.icon = this.getJobIcon(sameValueItem);
                        sameValueItem.complited = sameValueItem.jobs.every(j => j.jobComplited);
                    } else {
                        const job: JobGraphDetails = {
                            ...j,
                            value,
                            jobComplited: j.complitedJobs?.some(jb => jb.value === value) || false
                        };

                        const item: JobGraphItem = {
                            value,
                            jobs: [job],
                            icon: '',
                            complited: job.jobComplited
                        };
                        this.jobGraphItems.push({
                            ...item,
                            icon: this.getJobIcon(item)
                        });
                    }

                    value += planValue;
                }
            }
        });
    }

    @Output() jobCompliteChanged: EventEmitter<{ job: JobGraphDetails, checked: boolean }> = new EventEmitter();

    constructor(
        private element: ElementRef<HTMLElement>,
        private authService: AuthService
    ) {
        super();
    }

    ngOnInit(): void {
        this.currentValueCtrl.valueChanges.pipe(
            debounceTime(1000),
            takeUntil(this.destroy$)
        )
        .subscribe(() => this.scrollToCurrent());

        this.graphScale = this.isKmType ? 40 : 36;

        const step = this.isKmType ? 5 : 2; // т.км / мес
        let value = step;
        const startDate = new Date(TIGUAN_PURCHASE_DATE.getTime());
        while (value <= this.MAX_VALUE) {
            const text = this.isKmType ? value + ' т.км' : new Date(startDate.setMonth(startDate.getMonth() + step));

            this.scaleSteps.push({ value, text });
            value += step;
        }

        this.scrollToCurrent();
    }

    getItemMargin(value: number): number {
        return (value * 100) / this.graphScale;
    }

    scrollToCurrent(additionalScrollValue?: number): void {

        this.element.nativeElement.querySelector('#car')?.scrollIntoView();

        console.log(this.element.nativeElement.querySelector('#scrollBlock'));
        if (additionalScrollValue) {
            this.element.nativeElement.querySelector('#scrollBlock');
        }
    }

    onCompliteChanged(item: JobGraphItem, job: JobGraphDetails, event: MatCheckboxChange): void {
        job.jobComplited = event.checked;
        item.complited = item.jobs.every(j => j.jobComplited);


        this.jobCompliteChanged.emit({
            job,
            checked: event.checked
        });
    }

    getDateByValue(value: number): Date {
        const startDate = new Date(TIGUAN_PURCHASE_DATE.getTime());
        return new Date(startDate.setMonth(startDate.getMonth() + value));
    }

    private getJobIcon(item: JobGraphItem): string {
        if (item.jobs.length > 1) {
            return `miscellaneous_services`;
        }

        if (item.jobs[0]?.colorType === ColorType.Prisadka) {
            return 'sanitizer';
        }

        // return 'settings';
        return 'miscellaneous_services';
    }
}
