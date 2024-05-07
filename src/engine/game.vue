<script setup lang="ts">
	import { watch, ref, onMounted } from 'vue';
	import { useGameStore } from './engine';
	import { GameHeader, GameTable, GameFooter } from './components';
	import { DotLottieVue, type DotLottie } from '@lottiefiles/dotlottie-vue';
	import { MAX_GAME_ITEMS } from './consts';

	const gameStore = useGameStore();
	gameStore.start();

	const isMounted = ref(false);
	const isNewLevel = ref(false);
	const lottiePlayer = ref();

	onMounted(() => {
		isMounted.value = true;
	});

	watch(
		() => gameStore.matchedPairs,
		() => {
			if (gameStore.matchedPairs >= MAX_GAME_ITEMS / 2) {
				isNewLevel.value = true;
				const dotLottie: DotLottie = lottiePlayer.value.getDotLottieInstance();
				dotLottie.setFrame(0);
				dotLottie.play();
			}
		},
	);

	watch(
		() => isNewLevel.value,
		() => {
			if (isNewLevel.value) {
				const dotLottie = lottiePlayer.value.getDotLottieInstance();

				dotLottie.addEventListener('complete', () => {
					gameStore.reset();
					isNewLevel.value = false;
				});
			}
		},
	);
</script>

<template>
	<div class="relative">
		<div class="flex h-screen items-center justify-center overflow-hidden md:container">
			<div
				class="grid h-full max-h-svh min-h-screen grid-rows-[auto_1fr_auto] gap-4 overflow-hidden pb-[14vh] pt-[18vh] md:pb-[6vh] md:pt-[10vh]">
				<GameHeader class="mb-6" />
				<GameTable />
				<GameFooter />
			</div>
		</div>
		<DotLottieVue
			v-if="isMounted"
			ref="lottiePlayer"
			class="pointer-events-none absolute left-0 top-0 z-10 h-full w-full"
			:class="[isMounted && !isNewLevel ? 'invisible opacity-0' : '']"
			autoplay
			src="https://lottie.host/853f85ce-1aaa-4704-9151-174739932bf4/Ef8878HRi4.json" />
	</div>
</template>
