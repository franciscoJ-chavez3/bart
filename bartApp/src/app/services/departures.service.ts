import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IStndepart } from '../interfaces/i-stndepart';
import { IStntime } from '../interfaces/i-stntime';

@Injectable({
  providedIn: 'root'
})

export class DeparturesService {
  count: number = 0;
  //array to store departure times
  timeArr: IStndepart[] = [];
  departArr: IStntime[] = [];

  //Lincoln
  everything: any;

  //url pieces
  stnTimesPt1 = 'http://api.bart.gov/api/etd.aspx?cmd=etd&orig=';
  stnTimesPt2;
  stnTimesPt3 = '&key=Z5RS-PL6X-97JT-DWE9&json=y';
  
  //Lincoln All
  stnAll = 'http://api.bart.gov/api/etd.aspx?cmd=etd&orig=ALL&key=Z5RS-PL6X-97JT-DWE9&json=y'
  //will be the sum of pts 1 thru 3
  stnTimesURL;
  //sheet to store content from API
  timeSheet;
  departSheet;
  //abrreviations for pt2
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
    'warm', 'wcrk', 'wdub', 'woak',
  ];

  constructor(private http: HttpClient) {
    console.log('in departure service');
    //Lincoln did this
    //this.stnTimeData()
    this.parseStations(this.stnAll);
  }

  //lincoln commented out
  stnTimeData() {
    // for (let i = 0; i < this.stnAbbr.length; i++) {
    //   this.stnTimesPt2 = this.stnAbbr[i];
    //   this.stnTimesURL = this.stnTimesPt1 + this.stnTimesPt2 + this.stnTimesPt3;
    //   //time data - use the same url
    //   this.parseTimeData(this.stnTimesURL);
    //   //depart data - use the same url
    //   this.parseDepartData(this.stnTimesURL);
    // }
    //console log content of array
    console.log('timeArr:');
    console.log(this.timeArr);
    console.log('departArr');
    console.log(this.departArr)
  }

  //lincoln made
  parseStations(url){
    let stationSheet = this.http.get(url);
    stationSheet.subscribe(
      x => {
        console.log(x);
      }
    );
  }

  parseTimeData(url) {
    //put http content into timeSheet
    this.timeSheet = this.http.get(url);
    this.timeSheet.subscribe(
      x => {
        this.everything = x.root.station[0];
        console.log(this.everything);
        //console log each departure in timeSheet
        console.log('this is number #: ' + this.count);
        this.count++;
        console.log(x);
        for (let s of x.root.station[0].etd) {
          let info: IStndepart = {
            stnDest: s.destination,
            destAbbr: s.abbreviation,
            destimate1: s.estimate[0].minutes,
            destimate2: s.estimate[1].minutes,
            destimate3: s.estimate[2].minutes,
            destDirect: s.estimate[0].direction
          }; //end of Obj
          //push info into timeArr array
          this.timeArr.push(info);
          //console log array back in StnData
        } //end of For
      }); //end of Arrow
  } //end of Function

  parseDepartData(url) {
    //put http content into timeSheet
    this.departSheet = this.http.get(url);
    this.departSheet.subscribe(
      x => {
        this.everything = x.root.station[0];
        console.log(this.everything);
        //console log each departure in timeSheet
        //console.log(x);
        let s = x.root;
        let info: IStntime = {
          stnAbbr: s.station[0].abbr,
          stnDate: s.date,
          stnTime: s.time,
          stnETD: []
        };
        //end of Obj
        //push info into stationsArr
        this.departArr.push(info);
        //console log array back in StnData
      } //end of For
    ); //end of Arrow
  } //end of Function


} //end of Departures Service