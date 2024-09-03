import {Component} from '@angular/core';
import {OperationEnum} from "../../../../models/enums/OperationEnum";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  readonly CONFIRMATION_MODAL_TITLE = "Are you sure you'd like to proceed?";

  operation = OperationEnum.REMOVE;

  constructor(private dialogRef: MatDialogRef<ConfirmationModalComponent>) {
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
