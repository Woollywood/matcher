<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import { TableItem } from '@/ui/item';
	import { TableLabel } from '@/ui/label';
	import { TableProgress } from '@/ui/progress';
	import { useGameStore } from '../engine';
	import { MAX_GAME_ITEMS } from '../consts';

	const gameStore = useGameStore();
</script>

<template>
	<div class="grid grid-rows-[auto_1fr] gap-2">
		<header>
			<div class="grid grid-cols-2 items-center gap-2">
				<TableLabel title="Pairs matched">
					<template #progress>
						<TableProgress
							class="!absolute left-0 top-0 w-full"
							:progress="(gameStore.matchedPairs * 100) / (MAX_GAME_ITEMS / 2)" />
					</template>
					<template #value>
						{{ `${gameStore.matchedPairs}/${MAX_GAME_ITEMS / 2}` }}
					</template>
				</TableLabel>
				<TableLabel title="Total moves">
					<template #value>
						{{ gameStore.moves }}
					</template>
				</TableLabel>
			</div>
		</header>
		<main class="h-full space-y-2">
			<div class="grid h-full grid-cols-4 gap-2">
				<button v-for="item in gameStore.items" @click="gameStore.select(item)" class="aspect-square h-full">
					<TableItem v-bind="item" />
				</button>
			</div>
		</main>
	</div>
</template>
