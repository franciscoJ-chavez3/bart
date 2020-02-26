import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeparturesService } from '../services/departures.service';
import { IStndepart } from '../interfaces/i-stndepart';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  folderStnData: IStndepart[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private ts: DeparturesService) { }

  setFolderStnData() {
    this.folderStnData = this.ts.returnStnData();
    console.log(this.folderStnData);
  }

  ngOnInit() {
    this.setFolderStnData();
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.folder);
  }

}
