var dest = "./build";
var src = './src';

module.exports = {
  sass: {
    src: src + "/sass/**/*.{sass,scss}",
    dest: dest,
    settings: {
      indentedSyntax: true, // Enable .sass syntax!
      imagePath: 'images' // Used by the image-url helper
    }
  },
  images: {
    src: src + "/images/**",
    dest: dest + "/images"
  },
  index: {
    src: src + "/index.html",
    dest: dest
  },
  html: {
    src: src + "/app/**/*.html",
    dest: dest + "/views/"
  },
  fonts: {
      src: src + '/sass/fonts/*',
      dest: dest + "/fonts/",
      extensions: ['woff2', 'woff', 'eot', 'ttf', 'svg']
  },
  javascript: {
    src: src + '/app/**/*.js',
    dest: dest + '/js/',
    entryPoint: src + '/app/index.js',
    packedFile: 'packed.js'
  },
  ngConfig: {
    dest: dest + '/js',
  },
    server: {
    serverFile: './server.js'
  },
  production: {
    cssSrc: dest + '/*.css',
    jsSrc: dest + '/*.js',
    dest: dest
  }
};
