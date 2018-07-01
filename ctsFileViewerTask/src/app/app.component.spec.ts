import { TestBed, async, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { obejctToArrayPipe } from './objectTransformer.pipe'
declare var $: any;
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, obejctToArrayPipe
      ],
      imports: [FormsModule]
    }).compileComponents();
  }));
  it('should create the Application Component', async(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
    fixture.detectChanges();
  }));

  it('Validate screen fields while initialize', (() => {
    expect(component.isFileUploaded).toBe(false);
    expect(component.env).toBe('Development');
    expect(component.minIssueCount).toBe(null);
    expect(component.refill).toBe(undefined);
    component.env = '';
    expect(component.env).toBe('');

    const fileViewer = fixture.debugElement.query(By.css('#fileSelector')).nativeElement;
    expect(fileViewer['type']).toBe('file');
    //expect(fileViewer.getAttribute('class')).toBeFalsy('ng-untouched');

    const buttoner = fixture.debugElement.query(By.css('.btn')).nativeElement;
    expect(buttoner['type']).toBe('button');
  }));

  it('Table Row verification', fakeAsync(() => {
    const spn = fixture.debugElement.query(By.css('#karmaContainer')).nativeElement;
    //expect($(spn).css('margin-top')).toBe('5%');
    //expect(spn).toBe(null);

    let minValue = component.minArrayValue([1, 2, 3, 4])
    expect(minValue).toBe(1);
  }));

  it('Minimul issue count', fakeAsync(() => {
    component.minIssueCount = 5;
    let result = component.validate(6)
    expect(result).toBe(false);
    component.minIssueCount = 6;
    result = component.validate({ 'Issue count': 6 })
    expect(result).toBe(true);

    let uploadFileStore = component.filter({ 'target': { 'checked': false } });
    expect(component.isFileUploaded).toBe(false);
    expect(component.minIssueCount).toBe(6);
    component.minIssueCount=component.minArrayValue([1,2,3,4,5]);
    expect(component.minIssueCount).toBe(1);

  }));


});
