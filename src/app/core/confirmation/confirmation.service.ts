import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationConfig } from '@core/models/confirmation-config.model';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  private _defaultConfig: ConfirmationConfig = {
    title: 'Confirmar acción',
    message: '¿Está seguro que quiere confirmar esta acción?',
    icon: {
      show: true,
      name: 'heroicons_outline:exclamation',
      color: 'warn',
    },
    actions: {
      confirm: {
        show: true,
        label: 'Confirmar',
      },
      cancel: {
        show: true,
        label: 'Cancelar',
      },
    },
  };

  constructor(private _matDialog: MatDialog) {}

  open(
    config: ConfirmationConfig = {}
  ): MatDialogRef<ConfirmationDialogComponent> {
    const userConfig = { ...this._defaultConfig, ...config };

    return this._matDialog.open(ConfirmationDialogComponent, {
      autoFocus: false,
      data: userConfig,
      width: '600px',
    });
  }
}
