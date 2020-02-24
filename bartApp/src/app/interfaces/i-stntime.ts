import { IStndepart } from './i-stndepart';

export interface IStntime {
    stnAbbr: string;
    stnDate: string;
    stnTime: string;
    stnETD: IStndepart[];
}
