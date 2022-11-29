<script lang="ts">
	import {
		Collapse,
		Container,
		Navbar,
		NavbarToggler,
		NavbarBrand,
		Nav,
		NavItem,
		NavLink,
		Dropdown,
		DropdownToggle,
		DropdownMenu,
		DropdownItem,
		Styles,
		Row,
		Col,
		Button,
		Form,
		Input,
	} from "sveltestrap";
	import Dexie from "dexie";
	import type { Table } from "dexie";
	let isOpen = false;
	const toggle = () => (isOpen = !isOpen);
	// const bringDrugs = async () => {
	// 	const response = await fetch(`https://api.openmeds.ca/?q=${drugOne}`);
	// 	const data = await response.json();
	// 	allDrugs.set(Object.values(data.results[0]));
	// 	console.log(allDrugs);
	// };
	import { onMount } from "svelte";
	import steps from "./steps.js";

	let index = 0;
	let current;
	let currentEditorIndex = 0;
	let currentEditorCommand;
	let lines = [];
	let selections = [];
	let transcription;
	let drugQuery;

	let nextTimer: any;
	let typeTimer;
	let transitionTimer;
	let editorCommandTimer;

	onMount(() => {
		nextTimer = next();
	});

	function next() {
		current = { ...steps[index] };

		if (current.action == "command" || current.action == "editor") {
			current.typed = "";
			current.index = 0;
			typeTimer = setTimeout(type, 0);
		} else if (current.action == "wait") {
			index += 1;
			nextTimer = setTimeout(next, current.delay || 0);
		}
	}


	function type() {
		const char = current.command[current.index];
		current = { ...current, typed: current.typed + char };
		transcription = current.transcription || "";

		current.index += 1;

		if (current.index < current.command.length) {
			typeTimer = setTimeout(type, 5);
		} else {
			if (current.action == "editor") {
				transitionTimer = setTimeout(openEditor, 0);
			} else {
				scheduleTransition();
			}
		}
	}

	function scheduleTransition() {
		const delay = transcription ? 0: 5;
		transitionTimer = setTimeout(transition, delay);
	}

	function openEditor() {
		current.lines = current.content.split("\n");

		transcription = "";
		current.showEditor = true;
		current.selections = [];

		editorCommandTimer = setTimeout(nextEditorCommand, 0);
	}

	function transition() {
		index += 1;
		lines = [...lines, current];
		current = null;
		transcription = "";

		nextTimer = setTimeout(next, 0);
	}

	function nextEditorCommand() {
		currentEditorCommand = current.steps[currentEditorIndex];
		currentEditorIndex += 1;
		transcription = currentEditorCommand.transcription;

		if (currentEditorCommand.action == "close") {
			// editorCommandTimer = setTimeout(closeEditor, currentEditorCommandp[;'p;'].delay)
		} else if (currentEditorCommand.action == "select") {
			const { from, to, style } = currentEditorCommand;
			const selection = { from, to, style };

			selections.push(selection);
			selections = selections;
			current = current;

			console.log(selections);
			editorCommandTimer = setTimeout(
				nextEditorCommand,
				currentEditorCommand.delay
			);
		}
	}

	function isSelected(line, char) {
		if (!selections) return false;

		console.log({ line, char }, selections);

		selections.forEach(({ from, to }) => {
			debugger;
			if (
				from.line >= line &&
				char >= from.char &&
				to.line >= line &&
				to.char >= char
			)
				return true;
		});

		return false;
	}

	function closeEditor() {
		current.showEditor = false;
		selections = [];
		scheduleTransition();
	}

	function reset() {
		clearTimeout(nextTimer);
		clearTimeout(typeTimer);
		clearTimeout(transitionTimer);
		clearTimeout(editorCommandTimer);

		current = null;
		index = 0;
		lines = [];
		transcription = null;
		selections = [];

		currentEditorIndex = 0;
		currentEditorCommand = null;

		nextTimer = setTimeout(next, 80);
	}

	//IndexedDB storage wrapper
	//Typescript interface
	interface Drugs {
		id?: number;
		name?: string;
		dosage?: number;
	}

	class DrugsDatabase extends Dexie {
		public drugs!: Table<Drugs, number>;
		public constructor() {
			super("DrugDatabase");
			this.version(1).stores({
				drugs: "++id,name,dosage",
			});
		}
	}

	const db = new DrugsDatabase();

	db.transaction("rw", db.drugs, async () => {
		if ((await db.drugs.where({ name: "Vyvanse" }).count()) === 0) {
			const id = await db.drugs.add({ name: "Vyvanse", dosage: 69 });

		}
		const lowDosages = await db.drugs.where("dosage").below(48).toArray();
	});
</script>

<!--
<pre>
  lines = {JSON.stringify(lines, null, 2)}
</pre>
<pre>
	current = {JSON.stringify(current, null, 2)}
</pre>
-->
<svelte:window on:click={reset} />
<main>
	<Container>
		<Row>
			<Navbar color="dark" dark fixed="top">
				<NavbarBrand href="/" class="me-auto">💊 openmeds</NavbarBrand>
				<ol>
					<NavItem>
						<NavLink
							href="https://www.canada.ca/en/health-canada/services/drugs-health-products/medeffect-canada/adverse-reaction-database/canada-vigilance-online-database-data-extract.html"
						>
							💾 DL Health Canada Data</NavLink
						>
					</NavItem>
				</ol>

				<NavbarToggler on:click={toggle} class="me-2" id="options" aria-label="options click" />

				<Collapse {isOpen} navbar>
					<Nav navbar>
						<NavItem>
							<NavLink
								href="https://github.com/allenai/sdi-detection"
								class="pull-right"
								>🛠 Drug Interactions AI scanning code</NavLink
							>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</Row>
		<Row />
		<Row>
			<Col>
				<Row>
					<Container>
						
					</Container>
				</Row>
			</Col>
		</Row>
	</Container>
</main>

<!-- <Supp /> -->

<Styles />

<style>
	:global(body) {
		background: white;
		display: flex;
		align-items: center;
		justify-content: center;
	}
/* 
	.terminal {
		position: relative;
		font-family: monospace;
		font-size: 1rem;
		background: #333;
		padding: 0.7rem 1rem;
		margin: 4rem;
		border-radius: 0.5rem;
		color: #ffffff;
		box-shadow: 1px 1px #ffffff;
		min-height: 35rem;
		min-width: 34em;
		overflow: hidden;
	}

	.terminal .bar {
		margin-bottom: 1rem;
	}

	.transcription-wrapper {
		position: absolute;
		bottom: 0px;
		width: 100%;
		text-align: center;
		margin: 1.4rem 0;
	}

	.editor {
		position: absolute;
		top: 3.5rem;
		background: #333;
		width: -webkit-fill-available;
		height: -webkit-fill-available;
		margin-left: -1rem;
		padding: 0 1rem;
	}

	.editor .line-number {
		color: #ffbd2e;
		font-weight: bold;
		display: inline-block;
		margin-right: 0.5rem;
	}

	.editor .highlight {
		background: white;
		color: black;
	}

	.transcription {
		display: inline-block;
		font-family: sans-serif;
		font-size: 0.7rem;
		opacity: 0.9;
		background: #ffffff;
		padding: 0.5em;
		border-radius: 0.1em;
		color: #222;
		top: 5rem;
		position: relative;
		transition: all 0.2s ease-out;
	}

	.transcription.visible {
		top: 0px;
	}

	.prompt {
		color: #27c93f;
		font-weight: bold;
	}

	p {
		margin: 0.2rem 0;
	}
	p.output {
		font-weight: normal;
	} */
</style>
