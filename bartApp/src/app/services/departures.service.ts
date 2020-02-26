import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IStndepart } from '../interfaces/i-stndepart';
import { IStation } from '../interfaces/i-station';

@Injectable({
  providedIn: 'root'
})

export class DeparturesService {

  //store stnInfo ~ address, city, zip, etc.
  stnInfo: IStation[] = [];
  //store stnData ~ departure times
  stnData: IStndepart[] = [];

  constructor(private http: HttpClient) {  }
  
  //pass in url of station and push object into stnData
  parseStnData(url: string) {
    this.stnData.length = 0;
    let etdSheet = this.http.get<any>(url);
    etdSheet.subscribe(
      x => {
        console.log(x);
        console.log('in ts parseStnData');
        for (let s of x.root.station[0].etd) {
          let info: IStndepart = {
            stnDest: s.destination,
            destAbbr: s.abbreviation,
            destimate1: s.estimate[0].minutes,
            destimate2: s.estimate[1].minutes,
            destimate3: s.estimate[2].minutes,
            destDirect: s.estimate[0].direction,
            destPlat: s.estimate[0].platform
          }; // end of Obj
          //push info into stnData
          this.stnData.push(info);
        } // end of For
      } // end of Arrow
    ); // end of Subscribe
    //log this.stnData
    console.log(this.stnData);
  } // end of parseStnData()

  //return stnData
  returnStnData(): IStndepart[] {
    return this.stnData;
  }

  //return stnInfo
  returnStnInfo(): IStation[] {
    return this.stnInfo;
  }

  parseStnInfo(url: string) {
    this.stnInfo.length = 0;
    //put http content into dataSheet
    let dataSheet = this.http.get<any>(url);
    //subscribe of observable : any
    dataSheet.subscribe(
      x => {
        //filter, set s to desired filtered content
        let s = x.root.stations.station;
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
        this.stnInfo.push(info);
        //console log array back in StnData
      });
      console.log(this.stnInfo);
  } //end of parseData function

} //end of Departures Service
