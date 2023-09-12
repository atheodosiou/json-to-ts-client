import { Component, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditorComponent } from 'ngx-monaco-editor-v2';
import { switchMap, tap } from 'rxjs';
import { ApiService } from '../services';
import { AppService } from '../services/app.service';
import { isValidJson } from '../validators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  leftEditorOptions = { theme: 'vs-dark', language: 'json' };
  rightEditorOptions = { theme: 'vs-dark', language: 'typescript' };

  inputForm: FormGroup;
  outputForm: FormGroup;

  private readonly apiService = inject(ApiService);
  private readonly appService = inject(AppService);
  private readonly fb = inject(FormBuilder);

  @ViewChild(EditorComponent, { static: false })
  inputEditorComponent!: EditorComponent;

  @ViewChild(EditorComponent, { static: false })
  outputEditorComponent!: EditorComponent;

  private exampleJson = `
  {
    "example":{
      "json":"file"
    }
  }`;

  constructor() {
    this.inputForm = this.fb.group({
      code: ['', [Validators.required, isValidJson()]],
    });
    this.outputForm = this.fb.group({
      code: [''],
    });

    this.inputForm.valueChanges
      .pipe(
        tap(() => this.appService.setValid(this.inputForm.valid)),
        takeUntilDestroyed()
      )
      .subscribe((res) => {
        console.log(res);
      });

    this.inputForm.patchValue({
      code: this.exampleJson,
    });

    this.appService.transform
      .pipe(
        switchMap(() =>
          this.apiService.convert(JSON.parse(this.inputForm.get('code')?.value))
        ),
        tap((response) =>
          this.outputForm.patchValue({
            code: response.join('\n\n'),
          })
        ),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  clear() {
    this.inputForm.reset({ code: '' });
  }
}
