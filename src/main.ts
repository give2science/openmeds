import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		sitename: 'openmeds'
	}
});

export default app;