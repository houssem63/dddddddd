import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() type: string='';
  @Input() message: string='';
  @Output() disableAlert = new EventEmitter<void>();
  onClose() {
    this.disableAlert.emit();
  }
}
