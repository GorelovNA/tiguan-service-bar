import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobEditDialogComponent } from './job-edit-dialog/job-edit-dialog.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'tiguan-service-bar';

    constructor(private dialog: MatDialog) {}

    add() {
        const dialogRef = this.dialog.open(JobEditDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: `, JSON.stringify(result));
        });
    }
}
