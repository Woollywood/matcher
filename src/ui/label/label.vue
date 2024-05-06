<script setup lang="ts">
	type Props = {
		title: string;
	};

	const props = defineProps<Props>();
</script>

<template>
	<div class="bg-label-bg relative overflow-hidden rounded-lg pt-2">
		<div class="px-2 py-2">
			<slot name="progress" />
			<h2>{{ props.title }}</h2>
			<slot name="value" />
		</div>
	</div>
</template>
