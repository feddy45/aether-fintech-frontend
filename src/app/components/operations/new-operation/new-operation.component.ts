import { Component } from '@angular/core';
import { BankTransferComponent } from './bank-transfer/bank-transfer.component';
import { InternalTransferComponent } from './internal-transfer/internal-transfer.component';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';

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

  ],
  templateUrl: './new-operation.component.html',
  styleUrl: './new-operation.component.css',
})
export class NewOperationComponent {

}
