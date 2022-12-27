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
		Row,
		Col,
	} from "sveltestrap";
	import Dexie from "dexie";
	import 'bootstrap/dist/css/bootstrap.min.css'
	import type { Table } from "dexie";
	import { Chart, LineSeries } from "svelte-lightweight-charts";

	let isOpen = false;
	const toggle = () => (isOpen = !isOpen);
	// const bringDrugs = async () => {
	// 	const response = await fetch(`https://api.openmeds.ca/?q=${drugOne}`);
	// 	const data = await response.json();
	// 	allDrugs.set(Object.values(data.results[0]));
	// 	console.log(allDrugs);
	// };
	//import { writable } from "svelte/store";

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
    ]

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

	<Row class='row-fluid'>
		<Col>meow</Col>
    	<Col>.col-sm-auto .offset-sm-1</Col>
	</Row>
	
	<!-- <py-script>
		from datetime import datetime
		now = datetime.now()
		display(now.strftime("%m/%d/%Y, %H:%M:%S"))
	</py-script> -->

	<Row>
	<Chart width={800} height={600}>
		<LineSeries data={data}/>
	</Chart>
	</Row>
	</Container>
</main>

<!-- <Supp /> -->

<style>
	:global(body) {
		background: white;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
