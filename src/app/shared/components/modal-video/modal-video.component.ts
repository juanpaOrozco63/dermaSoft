import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-video',
  templateUrl: './modal-video.component.html',
  styleUrls: ['./modal-video.component.css'],
})
export class ModalVideoComponent implements OnInit {
  @Input()
  public titulo: string;
  @Input()
  public urlVideo: string;
  constructor(public modal: NgbModal) {}

  ngOnInit(): void {
  }
}
