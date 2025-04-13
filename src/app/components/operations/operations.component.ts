import { Component, inject, OnInit, signal } from '@angular/core';
import { TransferService } from '../../services/transfer/transfer.service';
import { BankTransfer } from '../../models/bank-transfer';
import { Button } from 'primeng/button';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'aef-operations',
  imports: [
    Button,
    TableModule,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './operations.component.html',
  styleUrl: './operations.component.css',
})
export class OperationsComponent implements OnInit {
  router = inject(Router);

  transferService = inject(TransferService);
  transfers = signal<BankTransfer[]>([]);

  ngOnInit() {
    this.transferService.getAll().subscribe((transfers) => {
      this.transfers.set(transfers);
    });
  }

  newOperation() {
    this.router.navigate(['/operations/new-operation']).then();
  }
}
