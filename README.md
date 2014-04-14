# Gale Diamonds Simplified with Sinatra & Foundation

Grunt handles assets, Sinatra handles everything else.

## Uses:

Simple is as simple does. Sort of.

  * # Development
  ** [Node.js](http://nodejs.org)
  ** [Grunt](http://gruntjs.com/)
  ** [Bower](http://bower.io)
  * # Production
  ** [Sinatra]()
  ** [HAML]()


## Quickstart

`foundation update` will update foundation (using bower)
`grunt build` or `grunt` will compile sass, uglify and copy js, and copy everything into the public folder
`grunt watch` will do all of the above, but stick around and watch for changes afterwards

There are two environments, `development` and `production`. Both the rack

## Directory Strucutre

  * `scss/_settings.scss`: Foundation configuration settings go in here
  * `scss/app.scss`: Application styles go here
  * `view`: Haml views go here
