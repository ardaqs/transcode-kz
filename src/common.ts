export interface Character {
  char: string;
  code: number;
  name: string;
}

export interface Letter {
  num: number;
  upper: Character;
  lower: Character;
  ipa: string | null | undefined;
  ext?: any;
}
