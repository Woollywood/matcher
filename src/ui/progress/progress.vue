<script setup lang="ts">
	type Props = {
		progress: number;
	};

	const props = defineProps<Props>();
</script>

<template>
	<div class="relative h-2 w-full bg-label-progressEmpty">
		<div
			class="absolute left-0 top-0 h-full rounded-e-lg bg-label-progressFill transition-all"
			:style="{ width: `${props.progress}%` }"></div>
	</div>
</template>
