[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/v/%40iqbspecs%2Fvariable-info)](https://www.npmjs.com/package/@iqbspecs/variable-info)

This package contains of the data specification for Verona API: Variable Info (to be used as an array).

* JSON Schema (see `variable-info.schema.json`)
* Schema documentation based on [AsyncAPI Generator](https://github.com/asyncapi/generator)
* type definitions for TypeScript (see npm-link above)

## Variable identifier validation

Variable ids and aliases may contain ASCII letters, digits, `_` and `-`. They must contain at least one
character and have no technical maximum length. Values are validated as supplied; they are not trimmed or
renamed.

The package exports `isValidVariableIdentifier(value)` for individual values and
`validateVariableList(variables)` for complete lists. List validation returns machine-readable errors for
empty or malformed identifiers, duplicate ids, duplicate aliases and collisions between public identifiers.
Comparisons are case-insensitive. A variable's public identifier is its alias when present and its id otherwise.
The package also contains `variable-validation-cases.json` as a shared conformance suite for implementations.

Read more:

* [All interface specifications of Verona](https://verona-interfaces.github.io/) (German only)
* [All specifications of IQB](https://iqb-specifications.github.io/) (German only)
* [Learn about TBA](https://iqb-berlin.github.io/tba-info/) (German only)
