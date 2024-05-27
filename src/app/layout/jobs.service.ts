import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize, map, takeUntil } from 'rxjs/operators';
import { Job, JobType } from '../shared/job.interface';
import { BaseComponent } from '../shared/base.class';

@Injectable({ providedIn: 'root' })
export class JobsService extends BaseComponent {
  allJobs = computed(() => this._jobs() || []);
  kmJobs = computed(() => this._jobs()?.filter(j => j.type === JobType.Km) || []);
  timeJobs = computed(() => this._jobs()?.filter(j => j.type === JobType.Time) || []);
  isLoading = computed(() => this._isLoading());

  private readonly _jobs = signal<Job[] | null>(null);
  private readonly _isLoading = signal<boolean>(true);

  private readonly HEADERS = new HttpHeaders().append(
    'X-MASTER-KEY',
    '$2b$10$fRtylPnSgXAXia/G3QOBNexui3G7qN1oWSvbzZmLRIbp8oTLhIRAy'
  );

  constructor(private http: HttpClient) {
    super();

    this.getList()
      .pipe(
        finalize(() => this._isLoading.set(false)),
        takeUntil(this.destroy$)
      )
      .subscribe(jobs => {
        this._jobs.set(jobs);
      });
  }

  setJobs(jobs: Job[]): void {
    this._jobs.set(jobs);
    this.updateList(jobs).pipe(takeUntil(this.destroy$)).subscribe();
  }

  getList(): Observable<Job[]> {
    return this.http
      .get<{ record: Job[] }>('https://api.jsonbin.io/v3/b/61ba0d0c0ddbee6f8b1e65a1/latest', {
        headers: this.HEADERS
      })
      .pipe(
        catchError(_ =>
          this.http.get<Job[]>('assets/json/base.json').pipe(map(jobs => ({ record: jobs })))
        ),
        map(({ record }) => {
          record.forEach(j => {
            if (!j.complitedJobs) {
              j.complitedJobs = [];
            }
          });

          return record;
        })
      );
  }

  private updateList(jobs: Job[]): Observable<void> {
    return this.http
      .put<Job[]>('https://api.jsonbin.io/v3/b/61ba0d0c0ddbee6f8b1e65a1', jobs, {
        headers: this.HEADERS
      })
      .pipe(map(() => void 0));
  }
}
