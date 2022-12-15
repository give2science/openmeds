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
	//import { writable } from "svelte/store";
	import { Chart, ChartOptions, LineSeries } from "svelte-lightweight-charts";

	const data = [
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 96.63 },
        { time: '2019-04-13', value: 76.64 },
        { time: '2019-04-14', value: 81.89 },
        { time: '2019-04-15', value: 74.43 },
        { time: '2019-04-16', value: 80.01 },
        { time: '2019-04-17', value: 96.63 },
        { time: '2019-04-18', value: 76.64 },
        { time: '2019-04-19', value: 81.89 },
        { time: '2019-04-20', value: 74.43 },
    ];
	
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

  const chartOptions = {
    width: 800,
    height: 400,
  };

//   let data = [];

//   async function loadData() {
//     data = await csv('path/to/data.csv');
//   }

  //loadData();




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
	<Container fluid>
		<Row class="mb-1">
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
	<Row>1</Row>
	<Row>2</Row>
	<Row>1</Row>
	<Row>2</Row>

	<Row class='row-fluid'>
		<Col>meow</Col>
    	<Col>.col-sm-auto .offset-sm-1</Col>
	</Row>
	<!-- <py-script>
		from datetime import datetime
		now = datetime.now()
		display(now.strftime("%m/%d/%Y, %H:%M:%S"))
	</py-script> -->
	<Chart width={800} height={600}>
		<LineSeries data={data}/>
	</Chart>
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
</style>
