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

    kmJobGraphItems: JobGraphItem[] = [];
    timeJobGraphItems: JobGraphItem[] = [];

    colorType = ColorType;

    kmScale = 40; // default scale = 100 t.km

    scaleSteps: number[] = [];

    get progreesBarWidth(): number {
        return (MAX_KM_SIZE / this.kmScale) * 100;
    }
    get progreesBarValue(): number {
        return (this.currentKmValue * 100) / MAX_KM_SIZE;
    }

    @Input() set jobs(_jobs: Job[]) {
        const timeJobs = _jobs.filter(r => r.type === JobType.Time);
        const kmJobs = _jobs.filter(r => r.type === JobType.Km);

        this.kmJobGraphItems = [];
        this.timeJobGraphItems = [];

        kmJobs.forEach(j => {
            if (j.justOnce) {
                const sameValueItem = this.kmJobGraphItems.find(i => i.value === j.planValue);

                if (sameValueItem) {
                    sameValueItem.jobs.push({
                        ...j,
                        value: j.planValue
                    });
                } else {
                    this.kmJobGraphItems.push({
                        value: j.planValue,
                        jobs: [{
                            ...j,
                            value: j.planValue
                        }]
                    });
                }
            } else {
                let value = j.planValue;
                while (value <= MAX_KM_SIZE) {
                    const sameValueItem = this.kmJobGraphItems.find(i => i.value === value);

                    if (sameValueItem) {
                        sameValueItem.jobs.push({
                            ...j,
                            value
                        });
                    } else {
                        this.kmJobGraphItems.push({
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

    @Input() currentKmValue: number = 15; // т.км

    constructor() { }

    ngOnInit(): void {
        let step = 5; // т.км
        while (step <= MAX_KM_SIZE) {
            this.scaleSteps.push(step);
            step += 5;
        }

        this.scrollToCurrent();
    }

    getItemMargin(value: number): number {
        return (value * 100) / this.kmScale;
    }

    scrollToCurrent(): void {
        document.getElementById('car')?.scrollIntoView();
    }
}
