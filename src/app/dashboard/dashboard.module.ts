import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { DashboardComponent } from './dashboard.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
    ReactiveFormsModule,
    MonacoEditorModule,
    ClipboardModule,
  ],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
