import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { emojiList, MAX_LIST_ITEMS, MAX_GAME_ITEMS, type ItemType } from '@/engine/consts';

function generateEmptyArray(count: number): ItemType[] {
	const result: ItemType[] = [];

	for (let i = 0; i < count; i++) {
		result.push({
			emoji: null,
			guessed: false,
			opened: false,
			nextPair: null,
		});
	}

	return result;
}

function randomInteger(max: number) {
	return Math.floor(Math.random() * max);
}

function shuffle(array: ItemType[]) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

function randomizeEmojiList(array: ItemType[]) {
	array.forEach((item) => {
		let rand: number | null = null;

		do {
			rand = randomInteger(MAX_LIST_ITEMS);
		} while (array.find((item) => item.emoji === emojiList[rand!]));

		item.emoji = emojiList[rand!];
	});
}

function generateOrigins(max: number) {
	return generateEmptyArray(max / 2);
}

function generatePairs(origins: ItemType[]) {
	const length = origins.length;
	return generateEmptyArray(length).map((item, index) => ({ ...item, nextPair: origins[index] }));
}

function generateCells(): ItemType[] {
	const origins = generateOrigins(MAX_GAME_ITEMS);
	randomizeEmojiList(origins);

	const duplicates = generatePairs(origins);
	duplicates.forEach((item) => {
		const emoji = item.nextPair.emoji;
		item.emoji = emoji;
	});

	origins.forEach((item, index) => (item.nextPair = duplicates[index]));
	const concatArray = origins.concat(duplicates);
	shuffle(concatArray);

	return concatArray;
}

export const useGameStore = defineStore('engine', () => {
	const moves = ref(0);
	const matchedPairs = ref(0);
	const selectedItems = ref<ItemType[]>([]);
	const items = ref<ItemType[]>([]);

	let timerId: number | null = null;

	function start() {
		items.value = generateCells();
	}

	function reset() {
		clearSelected();

		start();
		moves.value = 0;
		matchedPairs.value = 0;
	}

	function select(item: ItemType) {
		if (selectedItems.value.length < 2) {
			item.opened = true;
			selectedItems.value.push(item);
		}
	}

	function clearSelected() {
		selectedItems.value = [];

		if (timerId) {
			clearTimeout(timerId);
		}
	}

	watch(
		() => matchedPairs.value,
		(val) => {
			if (val === MAX_GAME_ITEMS / 2) {
				setTimeout(() => {
					reset();
				}, 3000);
			}
		},
	);

	watch(
		() => selectedItems.value.length,
		(val) => {
			if (val === 2) {
				moves.value++;

				const [first, second] = selectedItems.value;
				if (first.emoji === second.emoji) {
					first.guessed = true;
					second.guessed = true;
					matchedPairs.value++;

					clearSelected();
				} else {
					timerId = setTimeout(() => {
						selectedItems.value.forEach((item) => {
							item.opened = false;
						});
						selectedItems.value = [];

						clearSelected();
					}, 3000);
				}
			}
		},
	);

	return { moves, matchedPairs, items, start, reset, select };
});
