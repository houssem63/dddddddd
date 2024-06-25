import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfileTypeComponent } from './addfile-type.component';

describe('AddfileTypeComponent', () => {
  let component: AddfileTypeComponent;
  let fixture: ComponentFixture<AddfileTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddfileTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddfileTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
