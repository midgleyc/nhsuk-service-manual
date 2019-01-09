var getFileContents = require('./get-file-contents')

// This helper function takes a path of a *.md.njk file and
// returns the Nunjucks syntax inside that file without markdown data and imports
module.exports = path => {
  let fileContents = getFileContents(path)

  // Omit any `{% extends "foo.njk" %}` nunjucks code, because we extend
  // templates that only exist within the Design System – it's not useful to
  // include this in the code we expect others to copy.
  let content = fileContents.replace(
    /{%\s*extends\s*\S*\s*%}\s+/,
    ''
  )

  return content
}
