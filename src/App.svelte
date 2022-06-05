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
	  Input
	} from 'sveltestrap';
	import Supp from './Supp.svelte';
	let isOpen = false;
	let allDrugs;
	let drugOne = "FirstMed"
	let drugTwo = "SecondMed"
  	const toggle = () => (isOpen = !isOpen);
	const bringDrugs = async () => {
		const response = await fetch(`https://api.openmeds.ca/?q=${drugOne}`)
		const data = await response.json();
		allDrugs.set(Object.values(data.results[0]))
		console.log(allDrugs)
	}
  </script>
<main>
<div>
	<Navbar color="dark" dark scrolling="true">
		<NavbarBrand href="/" class="me-auto">> openmeds</NavbarBrand>
		<NavItem>
			<NavLink href="https://google.ca">Components</NavLink>
		  </NavItem>
		  <NavItem>
			<NavLink href="https://github.com">GitHub</NavLink>
		  </NavItem>
		<NavbarToggler on:click={toggle} class="me-2" />
	</Navbar>
	<Form>
		<Input type="text" placeholder="Search" />
		<Input 
		<Button color="danger">Meow</Button>
	</Form>
	  
	</div>
</main>

<!-- <Supp /> -->

<Styles />
