// @flow
import type {
	Dictionary
} from './dictionary.js'

import importJson from './import-json.js'

type Mappings = {
	name: Dictionary,
	version: Dictionary
}

let mappings: Mappings = importJson('mappings.json')

export default mappings
