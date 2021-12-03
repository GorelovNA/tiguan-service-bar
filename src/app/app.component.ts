import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from './app.service';
import { JobEditDialogComponent } from './job-edit-dialog/job-edit-dialog.component';
import { Job } from './shared/job.interface';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'tiguan-service-bar';

    jobList: Job[] = [];

    constructor(
        private dialog: MatDialog,
        private appService: AppService
    ) { }

    ngOnInit(): void {
        this.appService.getList().subscribe(res => {
            this.jobList = res;

            console.log(res);
        });
    }

    add(): void {
        this.openJobDialog();
    }

    onEdit(id: string): void {
        this.openJobDialog(this.jobList.find(j => j.id === id));
    }

    onDelete(id: string): void {
        this.jobList = this.jobList.filter(j => j.id !== id);
    }

    private openJobDialog(job: Job | null = null): void {
        const dialogRef = this.dialog.open(JobEditDialogComponent, {
            data: job
        });

        dialogRef.afterClosed().pipe(
            filter(r => !!r)
        )
            .subscribe(result => {
                console.log(`Dialog result: `, JSON.stringify(result));
                const currJobIndex = this.jobList.findIndex(j => j.id === result?.id);

                if (currJobIndex !== -1) {
                    this.jobList.splice(currJobIndex, 1, result);
                    this.jobList = [...this.jobList];
                } else {
                    this.jobList = [
                        ...this.jobList,
                        result
                    ];
                }
            });
    }
}
