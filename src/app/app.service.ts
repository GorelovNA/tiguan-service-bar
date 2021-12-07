import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, mapTo, tap } from 'rxjs/operators';
import { Job, JobType } from './shared/job.interface';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    jobsSubject$: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>([]);

    kmJobs$: Observable<Job[]>;
    timeJobs$: Observable<Job[]>;

    constructor(private http: HttpClient) {
        this.kmJobs$ = this.jobsSubject$.asObservable().pipe(
            map(jobs => jobs.filter(j => j.type === JobType.Km))
        );
        this.timeJobs$ = this.jobsSubject$.asObservable().pipe(
            map(jobs => jobs.filter(j => j.type === JobType.Time))
        );
    }

    getList(): Observable<Job[]> {
        return this.http.get<Job[]>('assets/json/base.json').pipe(
            mapTo(
                JSON.parse(localStorage.getItem('jobs') || '[]')
            ),
            tap(jobs => {
                jobs.forEach(j => {
                    if (!j.complitedJobs) {
                        j.complitedJobs = [];
                    }
                });
            })
        );
    }
}
