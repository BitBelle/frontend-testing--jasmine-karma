import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterComponent } from './register.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RegisterComponent],
      providers: [{ provide: Router, useValue: spy }]
    })
    .compileComponents();

    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

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
    
    const errorMsg: DebugElement = fixture.debugElement.query(By.css('div'));
    expect(errorMsg.nativeElement.textContent).toContain('Passwords dont match!');
  });

  it('should save form data to local storage on submit', () => {
    spyOn(localStorage, 'setItem');
    
    component.signupForm.controls['UserName'].setValue('TestUser');
    component.signupForm.controls['Email'].setValue('test@example.com');
    component.signupForm.controls['Password'].setValue('Password1');
    component.signupForm.controls['ConfirmPassword'].setValue('Password1');
    
    component.onSubmit();

    expect(localStorage.setItem).toHaveBeenCalledWith('RegData', JSON.stringify(component.signupForm.value));
  });

  it('should navigate to login page on successful submit', () => {
    component.signupForm.controls['UserName'].setValue('TestUser');
    component.signupForm.controls['Email'].setValue('test@example.com');
    component.signupForm.controls['Password'].setValue('Password1');
    component.signupForm.controls['ConfirmPassword'].setValue('Password1');

    component.onSubmit();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
