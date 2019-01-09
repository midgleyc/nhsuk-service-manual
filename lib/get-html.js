var nunjucks = require('nunjucks')
var beautify = require('js-beautify').html

var getFileContents = require('./get-file-contents')

// This helper function takes a path of a *.md.njk file and
// returns the HTML rendered by Nunjucks without markdown data
module.exports = path => {
  let fileContents = getFileContents(path)

  let html
  try {
    html = nunjucks.renderString(fileContents)
  } catch (err) {
    if (err) {
      console.log('Could not get HTML code from ' + path)
    }
  }

  return beautify(html.trim(), {
    indent_size: 2,
    end_with_newline: true,
    // If there are multiple blank lines, reduce down to one blank new line.
    max_preserve_newlines: 1,
    // set unformatted to a small group of elements, not all inline (the default)
    // otherwise tags like label arent indented properly
    unformatted: ['code', 'pre', 'em', 'strong']
  })
}
