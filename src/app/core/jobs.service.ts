import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, mapTo, tap } from 'rxjs/operators';
import { Job, JobType } from '../shared/job.interface';

@Injectable({
    providedIn: 'root'
})
export class JobsService {

    jobsSubject$: BehaviorSubject<Job[] | null> = new BehaviorSubject<Job[] | null>(null);

    kmJobs$: Observable<Job[]>;
    timeJobs$: Observable<Job[]>;

    private readonly HEADERS = new HttpHeaders().append('secret-key', '$2b$10$fRtylPnSgXAXia/G3QOBNexui3G7qN1oWSvbzZmLRIbp8oTLhIRAy');

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
        return this.http.get<Job[]>('https://api.jsonbin.io/b/61ba0d0c0ddbee6f8b1e65a1/latest', {
            headers: this.HEADERS
        }).pipe(
            tap(jobs => {
                jobs.forEach(j => {
                    if (!j.complitedJobs) {
                        j.complitedJobs = [];
                    }
                });
            })
        );
    }

    updateList(jobs: Job[]): Observable<void> {
        return this.http.put<Job[]>('https://api.jsonbin.io/b/61ba0d0c0ddbee6f8b1e65a1', jobs, {
            headers: this.HEADERS,
        }).pipe(
            mapTo(void(0))
        );
    }
}
