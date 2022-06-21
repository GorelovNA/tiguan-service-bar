import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { IFormControl } from '@rxweb/types';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/base.class';
import { AuthService } from '../../core/auth.service';
import { Job, ColorType, JobType } from '../../shared/job.interface';
import { TIGUAN_PURCHASE_DATE } from '../layout.component';
import { BreakpointObserver } from '@angular/cdk/layout';


export const MAX_KM_SIZE = 300; // т.км
export const MAX_TIME_SIZE = 84; // мес (7лет)

interface JobGraphItem {
    value: number; // итоговый пробег / время
    jobs: JobGraphDetails[]; // работы на данном пробеге / времени
    icon: string;
    complited: boolean;
    fullCost: number; // общая стоимость работ
}


export interface JobGraphDetails extends Job {
    value: number; // итоговый пробег / время
    jobComplited: boolean;
    jobComplitedDate?: Date; // дата выполненной работы
    jobComplitedCost?: number; // RUB
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

    sliderMaxValue: number = this.isKmType ? 100 : 48;
    sliderMinValue: number = this.isKmType ? 30 : 18;

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
                const value = j.planValue;
                const sameValueItem = this.jobGraphItems.find(i => i.value === value);

                if (sameValueItem) {
                    sameValueItem.jobs.push({
                        ...j,
                        value,
                        jobComplited: j.complitedJobs?.some(jb => jb.value === value) || false,
                    });
                    sameValueItem.icon = this.getJobIcon(sameValueItem);
                    sameValueItem.complited = sameValueItem.jobs.every(j => j.jobComplited);
                    sameValueItem.fullCost = sameValueItem.jobs.reduce((sum, curr) => sum += curr.cost || 0, 0);
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
                        complited: job.jobComplited,
                        fullCost: job.cost
                    };
                    this.jobGraphItems.push({
                        ...item,
                        icon: this.getJobIcon(item)
                    });
                }
            } else {
                const planValue = j.planValue;
                let value = planValue;
                let prevValue = 0;
                while (value <= this.MAX_VALUE) {
                    const optionalJob = j.optionalJobsOn.find(oj => oj < value && oj > prevValue);
                    if (optionalJob) {
                        value = optionalJob;
                    }

                    if (!j.skippedJobsOn.includes(value)) {
                        const sameValueItem = this.jobGraphItems.find(i => i.value === value);

                        if (sameValueItem) {
                            sameValueItem.jobs.push({
                                ...j,
                                value,
                                jobComplited: j.complitedJobs?.some(jb => jb.value === value) || false
                            });
                            sameValueItem.icon = this.getJobIcon(sameValueItem);
                            sameValueItem.complited = sameValueItem.jobs.every(j => j.jobComplited);
                            sameValueItem.fullCost = sameValueItem.jobs.reduce((sum, curr) => sum += curr.cost || 0, 0);
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
                                complited: job.jobComplited,
                                fullCost: job.cost
                            };
                            this.jobGraphItems.push({
                                ...item,
                                icon: this.getJobIcon(item)
                            });
                        }
                    }

                    prevValue = value;
                    value += planValue;
                }
            }
        });
    }

    @Output() jobCompliteChanged: EventEmitter<{ job: JobGraphDetails, checked: boolean }> = new EventEmitter();

    constructor(
        private element: ElementRef<HTMLElement>,
        private authService: AuthService,
        private breakpointObserver: BreakpointObserver,
    ) {
        super();
    }

    ngOnInit(): void {
        this.currentValueCtrl.valueChanges.pipe(
            debounceTime(1000),
            takeUntil(this.destroy$)
        )
        .subscribe(v => {
            if (this.isKmType) {
                localStorage.setItem('currentKmValue', String(v));
            }
            this.scrollToCurrent();
        });

        this.graphScale = this.isKmType ? 40 : 36;
        this.sliderMaxValue = this.isKmType ? 100 : 48;
        this.sliderMinValue = this.isKmType ? 30 : 18;

        this.breakpointObserver.observe('(max-width: 899.98px)').pipe(
            map(({ matches }) => matches),
            distinctUntilChanged(),
            takeUntil(this.destroy$)
        )
        .subscribe(isMobile => {
            if (isMobile) {
                this.graphScale = this.isKmType ? 15 : 18;
                this.sliderMaxValue = this.isKmType ? 30 : 36;
                this.sliderMinValue = this.isKmType ? 10 : 12;
            } else {
                this.graphScale = this.isKmType ? 40 : 36;
                this.sliderMaxValue = this.isKmType ? 100 : 48;
                this.sliderMinValue = this.isKmType ? 30 : 18;
            }
        });

        const step = this.isKmType ? 5 : 2; // т.км / мес
        let value = step;
        const startDate = new Date(TIGUAN_PURCHASE_DATE.getTime());
        while (value <= this.MAX_VALUE) {
            const text = this.isKmType ? value + ' т.км' : new Date(startDate.setMonth(startDate.getMonth() + step));

            this.scaleSteps.push({ value, text });
            value += step;
        }

        // this.scrollToCurrent();
    }

    getItemMargin(value: number): number {
        return (value * 100) / this.graphScale;
    }

    scrollToCurrent(additionalScrollValue?: number): void {
        console.log('here');

        this.element.nativeElement.querySelector('#car')?.scrollIntoView();

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
