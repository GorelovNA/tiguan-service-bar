import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobEditDialogComponent } from './job-edit-dialog.component';

describe('JobEditDialogComponent', () => {
  let component: JobEditDialogComponent;
  let fixture: ComponentFixture<JobEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
