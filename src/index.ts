import { Cyr } from './cyr';
import { Lat } from './lat';

import { Cyr2Lat } from './cyr2lat';
import { Lat2Cyr } from './lat2cyr';

/**
 * Transcodes a plain text.
 * @param text - source text.
 * @param direction - transcoding direction ('cyr2lat' | 'lat2cyr').
 * @returns transcoded text.
 */
const transcodeText = (text: string, direction: string = 'cyr2lat') => {
  const map = direction === 'lat2cyr' ? Lat2Cyr : Cyr2Lat;
  let res = '';
  for (const c of text) {
    const r = map.get(c);
    res += !r ? c : r;
  }
  return res;
}

/**
 * Creates an object from a JSON string and transcodes only string values (deeply nested) in the object.
 * @param json - source JSON string.
 * @param direction - transcoding direction ('cyr2lat' | 'lat2cyr').
 * @param indent - number of spaces used for indentation.
 * @returns transcoded JSON string.
 */
const transcodeJson = (json: string, direction: string = 'cyr2lat', indent: number = 2) => {
  const obj = JSON.parse(json);
  transcodeObject(obj, direction); // mutation!
  return JSON.stringify(obj, null, indent);
}

function transcodeObject(obj: any, direction: string) {
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === 'string') {
      obj[key] = transcodeText(value, direction);
    } else if (typeof value === 'object') {
      transcodeObject(value, direction);
    }
  }
}

export { Cyr, Lat, Cyr2Lat, Lat2Cyr, transcodeText, transcodeJson }
