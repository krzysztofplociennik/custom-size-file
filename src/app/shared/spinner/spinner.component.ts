import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner',
  imports: [
    CommonModule
  ],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent implements OnInit, OnDestroy {
  visible = false;
  private sub!: Subscription;

  constructor(private spinnerService: SpinnerService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.sub = this.spinnerService.visible$.subscribe(v => {
      this.visible = v;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
