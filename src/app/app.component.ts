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

    ngOnInit() {
        this.appService.getList().subscribe(res => {
            this.jobList = res;

            console.log(res);
        });
    }

    add() {
        const dialogRef = this.dialog.open(JobEditDialogComponent);

        dialogRef.afterClosed().pipe(
            filter(r => !!r)
        )
            .subscribe(result => {
                console.log(`Dialog result: `, JSON.stringify(result));
                this.jobList = [
                    ...this.jobList,
                    result
                ];
            });
    }
}
