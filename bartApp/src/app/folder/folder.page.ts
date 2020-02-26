import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeparturesService } from '../services/departures.service';
import { IStndepart } from '../interfaces/i-stndepart';
import { IStation } from '../interfaces/i-station';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  folderStnData: IStndepart[] = [];
  folderStnInfo: IStation[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private ts: DeparturesService) { }

  setFolderStnData() {
    this.folderStnData = this.ts.returnStnData();
    this.folderStnInfo = this.ts.returnStnInfo();
  }

  ngOnInit() {
    this.setFolderStnData();
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.folder);
  }

}
