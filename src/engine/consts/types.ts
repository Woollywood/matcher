export interface ItemType {
	emoji: string | null;
	opened: boolean;
	guessed: boolean;

	nextPair: null | ItemType;
}
