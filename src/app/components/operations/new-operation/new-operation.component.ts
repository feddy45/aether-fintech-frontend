import { Component, computed, inject } from '@angular/core';
import { BankTransferComponent } from './bank-transfer/bank-transfer.component';
import { InternalTransferComponent } from './internal-transfer/internal-transfer.component';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { BankAccountService } from '../../../services/bank-account/bank-account.service';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'aef-new-operation',
  imports: [
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    NgComponentOutlet,

  ],
  templateUrl: './new-operation.component.html',
  styleUrl: './new-operation.component.css',
})
export class NewOperationComponent {
  bankAccountService = inject(BankAccountService);

  operationsAvailable = computed(() => [
    {
      name: 'Bonifico',
      component: BankTransferComponent,
      active: true,
    },
    {
      name: 'Giroconto',
      component: InternalTransferComponent,
      active: this.bankAccountService.userBankAccounts().length > 1,
    },
  ]);
}
