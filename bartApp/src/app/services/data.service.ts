import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IStation } from '../interfaces/i-station';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  /*//////////////////////////////////
  originally intended to collect all data of each page,
  later realized I only needed to get NECESSARY information,
  ended up keeping since it was the first working part of app
  so ended up using it as a substitute for appPages in
  app component.ts
  *///////////////////////////////////

  //url broken into 3 parts - beginning, abbreviation, key
  private stnInfoPt1 = 'http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig='; 
  private stnInfoPt2 = '';  //put station abbreviations here
  private stnInfoPt3 = '&key=Z5RS-PL6X-97JT-DWE9&json=y'; //put your key here
  private stnInfoURL; // to be sum of stnInfo pieces

  private dataSheet;  // container for content of http.get

  //array of abbreviations to pass thru to parseData
  stnAbbr = [
    '12th', '16th', '19th', '24th',
    'ashb', 'antc', 'balb', 'bayf',
    'cast', 'civc', 'cols', 'colm',
    'conc', 'daly', 'dbrk', 'dubl',
    'deln', 'plza', 'embr', 'frmt',
    'ftvl', 'glen', 'hayw', 'lafy',
    'lake', 'mcar', 'mlbr', 'mont',
    'nbrk', 'ncon', 'oakl', 'orin',
    'pitt', 'pctr', 'phil', 'powl',
    'rich', 'rock', 'sbrn', 'sfia',
    'sanl', 'shay', 'ssan', 'ucty',
    'warm', 'wcrk', 'wdub', 'woak'
  ];

  //stores stnInfo but used for substitute as appPages in app component.ts
  stationsArr: IStation[] = [];

  constructor(private http: HttpClient) {
    //test
    this.stnData();
  }

  stnData() {
    for (let i = 0; i < this.stnAbbr.length; i++) {
      this.stnInfoPt2 = this.stnAbbr[i];
      this.stnInfoURL = this.stnInfoPt1 + this.stnInfoPt2 + this.stnInfoPt3;
      this.parseData(this.stnInfoURL);
    }
    //console log content of array
    console.log(this.stationsArr);
  }


  parseData(url: string) {
    //put http content into dataSheet
    this.dataSheet = this.http.get(url);
    //subscribe of observable : any
    this.dataSheet.subscribe(
      x => {
        //console log each station in dataSheet
        //console.log(x);
        //filter, set s to desired filtered content
        let s = x.root.stations.station
        //transfer desired into info of type IStation
        let info: IStation = {
          stnAbbr: s.abbr,
          stnName: s.name,
          stnAddress: s.address,
          stnCity: s.city,
          stnState: s.state,
          stnZip: s.zipcode,
          stnDesc: s.intro,
          stnURL: 'folder/' + s.abbr
        };
        //push info into stationsArr
        this.stationsArr.push(info);
        //console log array back in StnData
      });
  } //end of parseData function

  getStnData(): IStation[] {
    //return stationsArr
    return this.stationsArr;
  }
}
