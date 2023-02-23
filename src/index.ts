import { Cyr } from './cyr';
import { Lat } from './lat';

import { Cyr2Lat } from './cyr2lat';
import { Lat2Cyr } from './lat2cyr';

const transcode = (s: string, direction: string = 'cyr2lat', parseJson: boolean = false, indent: number = 2) => {
  return parseJson ? transcodeJson(s, direction, indent) : transcodeString(s, direction);
}

function transcodeJson(s: string, direction: string, indent: number): string {
  const obj = JSON.parse(s);
  transcodeObject(obj, direction); // mutation!
  return JSON.stringify(obj, null, indent);
}

function transcodeObject(obj: any, direction: string) {
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === 'string') {
      obj[key] = transcodeString(value, direction);
    } else if (typeof value === 'object') {
      transcodeObject(value, direction);
    }
  }
}

function transcodeString(s: string, direction: string): string {
  const map = direction === 'lat2cyr' ? Lat2Cyr : Cyr2Lat;
  let res = '';
  for (const c of s) {
    const r = map.get(c);
    res += !r ? c : r;
  }
  return res;
}

export { Cyr, Lat, Cyr2Lat, Lat2Cyr, transcode }
