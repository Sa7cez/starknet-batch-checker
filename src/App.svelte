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
  
  const eth = [eth0.eligibles, eth1.eligibles, eth2.eligibles, eth3.eligibles, eth4.eligibles, eth5.eligibles, eth6.eligibles].flat()
  console.log(eth.length)

  const github = [github0.eligibles, github1.eligibles].flat()
  console.log(github.length)

  const starknet = [starknet0.eligibles, starknet1.eligibles, starknet2.eligibles, starknet3.eligibles, starknet4.eligibles, starknet5.eligibles, starknet6.eligibles].flat()
  console.log(starknet.length)

  let evms : string = ''
  let starknets: string = '' 
  let githubs: string = ''

  let checked = ''
  let total = 0

  const check = async () => {
    checked = ''
    total = 0
    const evmAddresses = evms.split(/\n|,/).map((i) => i.toLowerCase())
    const starknetAddresses = starknets.split(/\n|,/).map((i) => i.toLowerCase())
    const githubsUsernames = githubs.split(/\n|,/).map((i) => i.toLowerCase())

    evmAddresses.map((address) => {
      const existed = eth.find((e) => e.identity === address)
      if (existed) {
        checked += `${address}: ${existed.amount}\n`
        total += Number(existed.amount)
      }
    })

    starknetAddresses.map((address) => {
      const existed = starknet.find((e) => e.identity.slice(-20) === address.slice(-20))
      if (existed) {
        checked += `${address}: ${existed.amount}\n`
        total += Number(existed.amount)
      }
    })

    githubsUsernames.map((username) => {
      const existed = github.find((e) => e.identity === username)
      if (existed) {
        checked += `${username}: ${existed.amount}\n`
        total += Number(existed.amount)
      }
    })
    
  }
  

</script>

<main>
  <div style="text-align:left">
    <p>Database loading:</p>
    <ul>
      <li>ETH: {eth.length} addressess</li>
      <li>Github: {github.length} usernames</li>
      <li>Starknet: {starknet.length} addresses</li>
    </ul>
  </div>

  <div>
    <label for="evm">EVM Addresses:</label>
    <textarea id="evm" placeholder="Your EVM addresses here...." bind:value={evms}  rows="10"></textarea>
  </div>

  <div>
    <label for="starknet">Starknet Addresses:</label>
    <textarea id="starknet" placeholder="Your Starknet addresses here...." bind:value={starknets}  rows="10"></textarea>
  </div>

  <div>
    <label for="github">Githubs username:</label>
    <textarea id="github" placeholder="Your Github usernames here...." bind:value={githubs}  rows="10"></textarea>
  </div>

  <div>
    <button on:click={check}>Batch Check Eligablity!</button>
  </div>

  {#if checked.length > 0}
  <div>
    <label for="good">Good:</label>
    <textarea id="good" placeholder="Results here" rows="10">{checked}</textarea>
  </div>
  {/if}

  {#if total > 0}
  <div>
    <p>Total: {total} STRK</p>
  </div>
  {/if}

</main>

<style>
  input,
  textarea,
  button {
    width: 100%;
    margin: 0.5rem auto 1rem;
  }
  label {
    display: block;
    text-align: left;
  }
</style>