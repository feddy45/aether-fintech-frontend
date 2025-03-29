import { Component } from '@angular/core';
import { InputGroup } from 'primeng/inputgroup';
import { InputText } from 'primeng/inputtext';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { Button } from 'primeng/button';
import { InputLabelComponent } from '../../shared/input-label/input-label.component';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'aef-bank-transfer',
  imports: [
    InputGroup,
    InputText,
    InputGroupAddon,
    Button,
    InputLabelComponent,
    InputNumberModule,
  ],
  templateUrl: './bank-transfer.component.html',
  styleUrl: './bank-transfer.component.css',
})
export class BankTransferComponent {

}
