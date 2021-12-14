import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Job, JobType } from './shared/job.interface';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    jobsSubject$: BehaviorSubject<Job[] | null> = new BehaviorSubject<Job[] | null>(null);

    kmJobs$: Observable<Job[]>;
    timeJobs$: Observable<Job[]>;

    constructor(private http: HttpClient) {
        this.kmJobs$ = this.jobsSubject$.asObservable().pipe(
            filter((jobs): jobs is Job[] => !!jobs),
            map(jobs => jobs.filter(j => j.type === JobType.Km))
        );
        this.timeJobs$ = this.jobsSubject$.asObservable().pipe(
            filter((jobs): jobs is Job[] => !!jobs),
            map(jobs => jobs.filter(j => j.type === JobType.Time))
        );
    }

    getList(): Observable<Job[]> {
        return this.http.get<Job[]>('assets/json/base.json').pipe(
            map((res) => {
                const lsBase = JSON.parse(localStorage.getItem('jobs') || '[]');
                return lsBase?.length ? lsBase : res;
            }),
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
