import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;

  // Arrange
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
        ReactiveFormsModule,
        RouterModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { queryParams: of({}) } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  // Act
  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have an invalid form initially', () => {
    const form = component.signupForm;
    expect(form.valid).toBeFalsy();
  });


  it('should validate form fields', () => {
    const form = component.signupForm;
    form.controls['UserName'].setValue('TestUser');
    form.controls['Email'].setValue('test@example.com');
    form.controls['Password'].setValue('Password1');
    form.controls['ConfirmPassword'].setValue('Password1');

    expect(form.valid).toBeTruthy();
  });


  it('should show error message if passwords do not match', () => {
    component.signupForm.controls['Password'].setValue('Password1');
    component.signupForm.controls['ConfirmPassword'].setValue('Password2');
    fixture.detectChanges();
    
    const errorMsg: DebugElement = fixture.debugElement.query(By.css('div.error'));
    expect(errorMsg.nativeElement.textContent).toContain('Passwords dont match!');
  });


  it('should save form data to local storage on submit', () => {
    spyOn(localStorage, 'setItem');
    

    // setting form values
    component.signupForm.controls['UserName'].setValue('TestUser');
    component.signupForm.controls['Email'].setValue('test@example.com');
    component.signupForm.controls['Password'].setValue('Password1');
    component.signupForm.controls['ConfirmPassword'].setValue('Password1');
    
    // submitting the form
    component.onSubmit();

    // checking localStorage.setItem was called with the correct data
    expect(localStorage.setItem).toHaveBeenCalledWith('RegData', JSON.stringify({
      UserName: 'TestUser',
      Email: 'test@example.com',
      Password: 'Password1',
      ConfirmPassword: 'Password1' 
    }));
  });


  it('should navigate to login page on successful submit', () => {
    component.signupForm.controls['UserName'].setValue('TestUser');
    component.signupForm.controls['Email'].setValue('test@example.com');
    component.signupForm.controls['Password'].setValue('Password1');
    component.signupForm.controls['ConfirmPassword'].setValue('Password1');

    component.onSubmit();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
