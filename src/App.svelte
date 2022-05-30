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
	  Button
	} from 'sveltestrap';
	import Supp from './Supp.svelte';
	let isOpen = false;
  	const toggle = () => (isOpen = !isOpen);

	
  </script>

<main>
<Container>
	<Navbar color="dark" dark fixed="top">
		<NavbarBrand href="/" class="me-auto">> openmeds</NavbarBrand>
		<NavItem>
			<NavLink href="https://google.ca">Components</NavLink>
		  </NavItem>
		  <NavItem>
			<NavLink href="https://github.com/bestguy/sveltestrap">GitHub</NavLink>
		  </NavItem>
		<NavbarToggler on:click={toggle} class="me-2" />
	  </Navbar>
	  
</Container>
</main>

<div>meow</div>
<div>miau</div>

<div>meow</div>

<Supp />

<Styles />
