<script setup lang="ts">
	import { useGameStore } from './engine';
	import { GameHeader, GameTable, GameFooter } from './components';

	const gameStore = useGameStore();
	gameStore.start();
</script>

<template>
	<div class="container flex h-screen items-center justify-center overflow-hidden">
		<div
			class="grid h-full max-h-svh min-h-screen grid-rows-[auto_1fr_auto] gap-4 overflow-hidden pb-[10vh] pt-[14vh] md:pb-[6vh] md:pt-[10vh]">
			<GameHeader class="mb-6" />
			<GameTable />
			<GameFooter />
		</div>
	</div>
</template>
