<script setup lang="ts">
	import { computed } from 'vue';
	import Button from 'primevue/button';

	type Props = {
		variant: 'primary' | 'secondary';
	};

	const props = defineProps<Props>();

	const style = computed(() => ({
		root: [props.variant === 'primary' ? 'buttonPrimary' : 'buttonSecondary', 'button'],
	}));
</script>

<template>
	<Button :pt="style">
		<slot />
	</Button>
</template>

<style scoped>
	.buttonPrimary {
		@apply bg-button-primary hover:bg-button-primary/70 text-button-secondary;
	}

	.buttonSecondary {
		@apply bg-button-secondary hover:bg-button-secondary/70;
	}

	.button {
		@apply rounded-lg px-4 py-2 font-medium transition-colors;
	}
</style>
