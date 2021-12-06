import { Component, Input, OnInit } from '@angular/core';
import { ColorType, Job, JobType } from '../shared/job.interface';


export const MAX_KM_SIZE = 300; // т.км
export const MAX_TIME_SIZE = 84; // мес (7лет)

interface JobGraphItem {
    value: number; // итоговый пробег / время
    jobs: JobGraphDetails[]; // работы на данном пробеге / времени
}


interface JobGraphDetails extends Job {
    value: number; // итоговый пробег / время
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
                const sameValueItem = this.jobGraphItems.find(i => i.value === j.planValue);

                if (sameValueItem) {
                    sameValueItem.jobs.push({
                        ...j,
                        value: j.planValue
                    });
                } else {
                    this.jobGraphItems.push({
                        value: j.planValue,
                        jobs: [{
                            ...j,
                            value: j.planValue
                        }]
                    });
                }
            } else {
                let value = j.planValue;
                while (value <= this.MAX_VALUE) {
                    const sameValueItem = this.jobGraphItems.find(i => i.value === value);

                    if (sameValueItem) {
                        sameValueItem.jobs.push({
                            ...j,
                            value
                        });
                    } else {
                        this.jobGraphItems.push({
                            value,
                            jobs: [{
                                ...j,
                                value
                            }]
                        });
                    }

                    value += j.planValue;
                }
            }
        });
    }

    ngOnInit(): void {
        this.graphScale = this.isKmType ? 40 : 24;

        const step = this.isKmType ? 5 : 2; // т.км / мес
        let value = step;
        while (value <= MAX_KM_SIZE) {
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
}
