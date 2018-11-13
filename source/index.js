// @flow
import log from './library/log.js'
import spawn from './library/spawn.js'
import compose from './library/compose.js'

import * as components from './library/components.js'
import * as lerna from './library/lerna.js'
import * as npm from './library/npm.js'
import * as bower from './library/bower.js'
import * as bowerrc from './library/bowerrc.js'
import rootManifest from './library/root-manifest.js'

let createAndWriteBowerrc = compose(
	bowerrc.write,
	// eslint-disable-next-line no-unused-vars
	_ => bowerrc.create()
)

let createAndWriteLernaManifest = compose(
	lerna.writeManifest,
	lerna.createManifest
)

let createAndWriteNpmManifest = compose(
	npm.writeManifest,
	npm.createManifest,
	bower.getManifest
)

void async function ဪ () {
	await createAndWriteBowerrc()
	await spawn('bower install -F')
	await createAndWriteLernaManifest(rootManifest)
	await components.map(createAndWriteNpmManifest)
	await spawn('lerna bootstrap --hoist')
	await spawn('lerna run build')
	// await components.spawnEach('npm publish --access public')

	log('oh good', 0)
}().catch(error => {
	log(error, 0)
	process.exit(22)
})
