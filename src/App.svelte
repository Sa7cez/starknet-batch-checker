<script lang="ts">
	import axios from 'axios'
	import eth0 from './provisions-data/eth/eth-0.json'
	import eth1 from './provisions-data/eth/eth-1.json'
	import eth2 from './provisions-data/eth/eth-2.json'
	import eth3 from './provisions-data/eth/eth-3.json'
	import eth4 from './provisions-data/eth/eth-4.json'
	import eth5 from './provisions-data/eth/eth-5.json'
	import eth6 from './provisions-data/eth/eth-6.json'

	import github0 from './provisions-data/github/github-0.json'
	import github1 from './provisions-data/github/github-1.json'

	import starknet0 from './provisions-data/starknet/starknet-0.json'
	import starknet1 from './provisions-data/starknet/starknet-1.json'
	import starknet2 from './provisions-data/starknet/starknet-2.json'
	import starknet3 from './provisions-data/starknet/starknet-3.json'
	import starknet4 from './provisions-data/starknet/starknet-4.json'
	import starknet5 from './provisions-data/starknet/starknet-5.json'
	import starknet6 from './provisions-data/starknet/starknet-6.json'

	const eth = [
		eth0.eligibles,
		eth1.eligibles,
		eth2.eligibles,
		eth3.eligibles,
		eth4.eligibles,
		eth5.eligibles,
		eth6.eligibles,
	].flat()
	console.log(eth.length)

	const github = [github0.eligibles, github1.eligibles].flat()
	console.log(github.length)

	const starknet = [
		starknet0.eligibles,
		starknet1.eligibles,
		starknet2.eligibles,
		starknet3.eligibles,
		starknet4.eligibles,
		starknet5.eligibles,
		starknet6.eligibles,
	].flat()
	console.log(starknet.length)

	let evms: string = ''
	let starknets: string = ''
	let githubs: string = ''

	let good: any[] = []
	let bad: any[] = []
	let total = -1

	const check = async () => {
		good = []
		bad = []
		total = 0
		const evmAddresses = evms
			.split(/\n|,/)
			.map((i) => i.toLowerCase().trim())
			.filter((i) => i.length > 0)
		const starknetAddresses = starknets
			.split(/\n|,/)
			.map((i) => i.toLowerCase().trim())
			.filter((i) => i.length > 0)
		const githubsUsernames = githubs
			.split(/\n|,/)
			.map((i) => i.toLowerCase().trim())
			.filter((i) => i.length > 0)

		evmAddresses.map((address) => {
			const existed = eth.find((e) => e.identity === address)
			if (existed) {
				good.push(existed)
				total += Number(existed.amount)
			} else {
				bad.push({
					identity: address,
					amount: 0,
				})
			}
		})

		starknetAddresses.map((address) => {
			console.log(address)
			const existed = starknet.find(
				(e) => e.identity.slice(-20) === address.slice(-20)
			)
			if (existed) {
				good.push(existed)
				total += Number(existed.amount)
			} else {
				bad.push({
					identity: address,
					amount: 0,
				})
			}
		})

		githubsUsernames.map((username) => {
			const existed = github.find((e) => e.identity === username)
			if (existed) {
				good.push(existed)
				total += Number(existed.amount)
			} else {
				bad.push({
					identity: username,
					amount: 0,
				})
			}
		})
	}
</script>

<main>
	<div style="text-align:left">
		<label>
			Database from StarkNet Repo (<a
				target="_blank"
				href="https://github.com/starknet-io/provisions-data/tree/main"
				>source</a
			>):
		</label>

		<ul style="font-size: 0.875rem;">
			<li>ETH: {eth.length} addressess</li>
			<li>Github: {github.length} usernames</li>
			<li>Starknet: {starknet.length} addresses</li>
		</ul>
	</div>

	<div>
		<label for="evm">EVM Addresses:</label>
		<textarea
			id="evm"
			placeholder="Your EVM addresses here...."
			bind:value={evms}
			rows="6"
		></textarea>
	</div>

	<div>
		<label for="starknet">Starknet Addresses:</label>
		<textarea
			id="starknet"
			placeholder="Your Starknet addresses here...."
			bind:value={starknets}
			rows="6"
		></textarea>
	</div>

	<div>
		<label for="github">Githubs username:</label>
		<textarea
			id="github"
			placeholder="Your Github usernames here...."
			bind:value={githubs}
			rows="2"
		></textarea>
	</div>

	<div>
		<button on:click={check}>Batch Check Starknet Eligablity!</button>
	</div>

	{#if good.length > 0}
		<div>
			<label for="good">Eligible ({good.length}):</label>
			<table>
				{#each good.sort((a, b) => b.amount - a.amount) as account}
					<tr>
						<td>{account.identity}</td>
						<td>{account.amount}</td>
					</tr>
				{/each}
			</table>
		</div>
	{/if}

	{#if total >= 0}
		<div>
			<p style="font-size: 1.25rem; font-weight: 600">
				Total token: {total} STRK
			</p>
		</div>
	{/if}

	{#if bad.length > 0}
		<div>
			<label for="bad">Not eligible ({bad.length}):</label>
			<table>
				{#each bad as account}
					<tr>
						<td>{account.identity}</td>
					</tr>
				{/each}
			</table>
		</div>
	{/if}

	<div style="padding: 3rem 0 0">
		<a style="font-size:10px;" href="https://t.me/salcez" target="_blank"
			>Made by Salce</a
		>
	</div>
</main>

<style>
	input,
	textarea,
	button {
		width: 100%;
		max-width: 100%;
		margin: 0.5rem auto 1rem;
	}
	textarea {
		font-size: 0.875rem;
	}
	label {
		display: block;
		text-align: left;
	}
</style>
