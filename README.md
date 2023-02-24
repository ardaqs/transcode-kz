# transcode-kz

:kazakhstan: A library for transcoding Kazakh between Cyrillic and Latin encodings.

## Exports

```js
/**
 * Transcodes a plain text.
 * @param text - source text.
 * @param direction - transcoding direction ('cyr2lat' | 'lat2cyr').
 * @returns transcoded text.
 */
export function transcodeText(text: string, direction: string = 'cyr2lat'): string {
    ...
}
```

```js
/**
 * Creates an object from a JSON string and transcodes only string values (deeply nested) in the object.
 * @param json - source JSON string.
 * @param direction - transcoding direction ('cyr2lat' | 'lat2cyr').
 * @param indent - number of spaces used for indentation.
 * @returns transcoded JSON string.
 */
export function transcodeJson(json: string, direction: string = 'cyr2lat', indent: number = 2): string {
    ...
}
```

## Usage examples

Transcode a plain text:

```js
import { transcodeText } from 'transcode-kz';

const srcText = "Қазақша мәтін";
const dstText = transcodeText(srcText);
```

Transcode only string values in a JSON:

```js
import { transcodeJson } from 'transcode-kz';

const srcJson = "{ \"city\": \"Қала\" }";
const dstJson = transcodeJson(srcJson);
```

## License

[LICENSE (MIT)](LICENSE)
