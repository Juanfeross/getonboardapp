import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationService } from './confirmation.service';

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [MatDialogModule, MatIconModule, CommonModule],
  providers: [ConfirmationService],
})
export class ConfirmationModule {}
