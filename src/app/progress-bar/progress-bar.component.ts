import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ColorType, Job, JobType } from '../shared/job.interface';


export const MAX_KM_SIZE = 300; // т.км
export const MAX_TIME_SIZE = 84; // мес (7лет)

interface JobGraphItem {
    value: number; // итоговый пробег / время
    jobs: JobGraphDetails[]; // работы на данном пробеге / времени
    icon: string;
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
export class ProgressBarComponent implements OnInit {

    jobGraphItems: JobGraphItem[] = [];

    colorType = ColorType;
    graphScale = 0; // progress scale value (default: 40 tkm, 24mes)
    jobType: JobType | null = null;

    scaleSteps: number[] = [];

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

    @Input() currentValue = 0; // текущий пробег / время владения

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
                } else {
                    const item: JobGraphItem = {
                        value,
                        jobs: [{
                            ...j,
                            value,
                            jobComplited: j.complitedJobs?.some(jb => jb.value === value) || false
                        }],
                        icon: ''
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
                    } else {
                        const item: JobGraphItem = {
                            value,
                            jobs: [{
                                ...j,
                                value,
                                jobComplited: j.complitedJobs?.some(jb => jb.value === value) || false
                            }],
                            icon: ''
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

    ngOnInit(): void {
        this.graphScale = this.isKmType ? 40 : 24;

        const step = this.isKmType ? 5 : 2; // т.км / мес
        let value = step;
        while (value <= this.MAX_VALUE) {
            this.scaleSteps.push(value);
            value += step;
        }

        this.scrollToCurrent();
    }

    getItemMargin(value: number): number {
        return (value * 100) / this.graphScale;
    }

    scrollToCurrent(): void {
        document.getElementById('car')?.scrollIntoView();
    }

    onCompliteChanged(job: JobGraphDetails, event: MatCheckboxChange): void {
        job.jobComplited = event.checked;

        this.jobCompliteChanged.emit({
            job,
            checked: event.checked
        });
    }

    private getJobIcon(item: JobGraphItem): string {
        if (item.jobs.length > 1) {
            if (item.jobs.length > 9) {
                return 'filter_9_plus';
            }
            return `filter_${item.jobs.length}`;
        }

        if (item.jobs[0]?.colorType === ColorType.Prisadka) {
            return 'sanitizer';
        }

        // return 'settings';
        return 'miscellaneous_services';
    }
}
