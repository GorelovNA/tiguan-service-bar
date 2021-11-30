import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from './shared/job.interface';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private http: HttpClient) { }

    getList(): Observable<Job[]> {
        return this.http.get<Job[]>('assets/json/base.json');
    }
}
