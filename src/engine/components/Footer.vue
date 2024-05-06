<script setup lang="ts">
	import { Button } from '@/ui/button';
	import { useGameStore } from '../engine';

	const gameStore = useGameStore();
</script>

<template>
	<div class="flex items-center gap-4">
		<Button variant="primary" class="w-full" @click="gameStore.reset">Reset game</Button>
	</div>
</template>
