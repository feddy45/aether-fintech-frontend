import { Component } from '@angular/core';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { BankTransferComponent } from './bank-transfer/bank-transfer.component';
import { InternalTransferComponent } from './internal-transfer/internal-transfer.component';

@Component({
  selector: 'aef-operations',
  imports: [
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    BankTransferComponent,
    InternalTransferComponent,
  ],
  templateUrl: './operations.component.html',
  styleUrl: './operations.component.css',
})
export class OperationsComponent {

}
