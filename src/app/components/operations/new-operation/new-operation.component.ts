import { Component, inject, signal } from '@angular/core';
import { BankTransferComponent } from './bank-transfer/bank-transfer.component';
import { InternalTransferComponent } from './internal-transfer/internal-transfer.component';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'aef-new-operation',
  imports: [
    BankTransferComponent,
    InternalTransferComponent,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Dialog,
    Button,
  ],
  templateUrl: './new-operation.component.html',
  styleUrl: './new-operation.component.css',
})
export class NewOperationComponent {
  router = inject(Router);
  dialogVisible = signal<boolean>(false);

  newOperation() {
    console.log('svuota la form');
  }

  goToOperationList() {
    this.router.navigate(['/operations']);
  }
}
