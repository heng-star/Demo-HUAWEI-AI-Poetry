import './global.css';
import App from './App.svelte';

if (!window.app) {
	const dom = document.createElement('div');
	document.body.appendChild(dom);
	const app = new App({
		target: dom,
	});
	window.app = app;
}
