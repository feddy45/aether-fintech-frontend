import { Component, inject, model, OnInit, output, signal } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ContactsService } from '../../../../../services/contacts/contacts.service';
import { Contact } from '../../../../../models/contact';
import { Button } from 'primeng/button';

@Component({
  selector: 'aef-beneficiaries-dialog',
  imports: [
    Dialog,
    TableModule,
    Button,
  ],
  templateUrl: './beneficiaries-dialog.component.html',
  styleUrl: './beneficiaries-dialog.component.css',
})
export class BeneficiariesDialogComponent implements OnInit {
  contactsService = inject(ContactsService);
  showDialog = model.required<boolean>();
  beneficiaries = signal<Contact[]>([]);
  selectBeneficiary = output<Contact>();

  ngOnInit() {
    this.contactsService.getAll().subscribe((contacts) => {
      this.beneficiaries.set(contacts);
    });
  }

  showChange(isShow: boolean) {
    this.showDialog.set(isShow);
  }

  buttonClick(beneficiary: Contact) {
    this.showDialog.set(false);
    this.selectBeneficiary.emit(beneficiary);
  }
}
