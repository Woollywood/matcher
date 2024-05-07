<script setup lang="ts">
	import { type ItemType } from '../../engine/consts';

	type Props = ItemType;
	const props = defineProps<Props>();
</script>

<template>
	<div class="relative h-full w-full">
		<div
			class="wrapper group relative inline-flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-item-gray transition-colors hover:bg-item-teal"
			:class="[props.opened ? 'bg-item-teal' : '']">
			<span class="emoji z-0 text-4xl transition-transform" :class="[props.opened ? 'opened' : '']">{{
				props.emoji
			}}</span>
			<div
				class="sign absolute left-0 top-0 z-[1] flex h-full w-full items-center justify-center overflow-hidden bg-item-gray transition-all group-hover:bg-item-teal"
				:class="[props.opened ? 'closed' : '', props.opened ? 'bg-item-teal' : '']">
				<span class="inner-item text-5xl md:text-6xl">?</span>
			</div>
		</div>
		<div class="absolute left-[50%] top-[50%]">{{ props.emoji }}</div>
	</div>
</template>

<style scoped>
	.inner-item {
		@apply absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%];
	}

	.wrapper {
		perspective: 62.5rem;
	}
	.emoji {
		transform: rotateY(180deg);
		backface-visibility: hidden;
	}

	.sign {
		backface-visibility: hidden;
	}

	.opened {
		transform: rotateY(0);
	}

	.closed {
		transform: rotateY(-180deg);
	}

	.debug {
		@apply absolute left-[50%] top-[50%] text-sm;
	}
</style>
