import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkHistoreComponent } from './work-histore.component';

describe('WorkHistoreComponent', () => {
  let component: WorkHistoreComponent;
  let fixture: ComponentFixture<WorkHistoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkHistoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkHistoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
