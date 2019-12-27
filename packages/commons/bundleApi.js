/** This file mocks bundleApi script called everytime a library is about to publish a change */


/**
 * - from process.cwd(), parse and use sm.config.json
 * - find slices folder, test components
 * - test model et meta JSON files
 * - concatenate them (like current slices API does)
 * - write to file slices.json (or config.pathToSlicesDef)
 * - exit 0
 */

 const fs = require('fs')
 const path = require('path')
 
 const example = JSON.stringify([
   { slice_type: "faq_section" },
   { slice_type: "video_highlights" },
   { slice_type: "another_slice" }
 ])

 fs.writeFileSync(path.join(process.cwd(), 'slices.json'), example, 'utf8')
 
 process.exit(0)
