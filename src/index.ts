import { Character, Letter } from './common'; 

import { cyr } from './cyr';
import { lat } from './lat';

import { cyr2lat } from './cyr2lat';
import { lat2cyr } from './lat2cyr';

/**
 * Transcodes a plain text.
 * @param text - source text.
 * @param direction - transcoding direction ('cyr2lat' | 'lat2cyr').
 * @returns transcoded text.
 */
const transcodeText = (text: string, direction: string = 'cyr2lat') => {
  const map = direction === 'lat2cyr' ? lat2cyr : cyr2lat;
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

export type { Character, Letter };
export { cyr, lat, cyr2lat, lat2cyr, transcodeText, transcodeJson };
