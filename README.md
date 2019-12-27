# sm-proof-of-concept

Proof of concept for an SM project.

How it works:

The package sm-library is a valid SM library. It contains an SM config file and a README.
Everytime a publish is made, a prepublish hook triggers a `bundleApi` script.

This script is part of a package called `sm-commons`. Its methods sshould be used by each part of the SM project. It ensures that data remains valid everywhere. The script used here should ensure that every publish made on NPM contains valid data (slice definitions in slices.json)

The package API holds a "fetch" method that takes an npm library name as parameter.
It validates it and then fetches the slice definition path. It returns the array and should store it somewhere.

To test it with real data: http://localhost:8000/fetch/sm-library

Note: it doesn't have to be a lerna project ✌️