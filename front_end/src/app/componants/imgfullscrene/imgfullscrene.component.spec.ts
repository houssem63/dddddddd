import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgfullscreneComponent } from './imgfullscrene.component';

describe('ImgfullscreneComponent', () => {
  let component: ImgfullscreneComponent;
  let fixture: ComponentFixture<ImgfullscreneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgfullscreneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImgfullscreneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
