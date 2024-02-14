import fs from 'fs'
import path from 'path'

fs.readdirSync('src/provisions-data/eth').map((file) => {
	const fullPath = path.join('src/provisions-data/eth', file)
	const data = JSON.parse(fs.readFileSync(fullPath, 'utf-8'))
	const result = data.eligibles
		? data.eligibles.map((i) => ({
				i: i.identity,
				a: i.amount,
		  }))
		: data
	fs.writeFileSync(fullPath, JSON.stringify(result))
})

fs.readdirSync('src/provisions-data/github').map((file) => {
	const fullPath = path.join('src/provisions-data/github', file)
	const data = JSON.parse(fs.readFileSync(fullPath, 'utf-8'))
	const result = data.eligibles
		? data.eligibles.map((i) => ({
				i: i.identity,
				a: i.amount,
		  }))
		: data
	fs.writeFileSync(fullPath, JSON.stringify(result))
})

fs.readdirSync('src/provisions-data/stark_key').map((file) => {
	const fullPath = path.join('src/provisions-data/stark_key', file)
	const data = JSON.parse(fs.readFileSync(fullPath, 'utf-8'))
	const result = data.eligibles
		? data.eligibles.map((i) => ({
				i: i.identity,
				a: i.amount,
		  }))
		: data
	fs.writeFileSync(fullPath, JSON.stringify(result))
})

fs.readdirSync('src/provisions-data/starknet').map((file) => {
	const fullPath = path.join('src/provisions-data/starknet', file)
	const data = JSON.parse(fs.readFileSync(fullPath, 'utf-8'))
	const result = data.eligibles
		? data.eligibles.map((i) => ({
				i: i.identity,
				a: i.amount,
		  }))
		: data
	fs.writeFileSync(fullPath, JSON.stringify(result))
})
