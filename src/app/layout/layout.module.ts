import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../shared/material.module';
import { JobEditDialogComponent } from './job-edit-dialog/job-edit-dialog.component';
import { JobListComponent } from './job-list/job-list.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';


@NgModule({
    declarations: [
        LayoutComponent,
        JobListComponent,
        JobEditDialogComponent,
        ProgressBarComponent
    ],
    imports: [
        LayoutRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        NgbModule
    ],
})
export class LayoutModule { }
