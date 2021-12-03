import { Component, Input, OnInit } from '@angular/core';
import { ColorType, Job, JobType } from '../shared/job.interface';


export const MAX_KM_SIZE = 300; // т.км
export const MAX_TIME_SIZE = 84; // мес (7лет)


interface JobGraphItem extends Job {
    value: number;
}

@Component({
    selector: 'app-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

    kmScale = 100; // default scale = 100 t.km

    kmJobGraphItems: JobGraphItem[] = [];
    timeJobGraphItems: JobGraphItem[] = [];

    colorType = ColorType;

    @Input() set jobs(_jobs: Job[]) {
        const timeJobs = _jobs.filter(r => r.type === JobType.Time);
        const kmJobs = _jobs.filter(r => r.type === JobType.Km);

        this.kmJobGraphItems = [];
        this.timeJobGraphItems = [];

        kmJobs.forEach(j => {
            if (j.justOnce) {
                this.kmJobGraphItems.push({
                    ...j,
                    value: j.planValue
                });
            } else {
                let value = j.planValue;
                while (value <= MAX_KM_SIZE) {
                    this.kmJobGraphItems.push({
                        ...j,
                        value
                    });
                    value += j.planValue;
                }
            }
        });
    }

    constructor() { }

    ngOnInit(): void {
    }

    getItemMargin(value: number): string {
        return `${(value * 100) / this.kmScale}%`;
    }
}
