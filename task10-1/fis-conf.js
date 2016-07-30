// 加 md5
fis.match('*.{js,css,png,jpg,jpeg}', {
  	useHash: true
});

// 启用 fis-spriter-csssprites 插件
fis.match('::packager', {
  	spriter: fis.plugin('csssprites'),
});

// 对 CSS 进行图片合并
fis.match('*.css', {
  	useSprite: true
});

//js文件压缩
fis.match('*.js', {
  	optimizer: fis.plugin('uglify-js')
});

//css文件压缩
fis.match('*.css', {
  	optimizer: fis.plugin('clean-css')
});

//png图片压缩
fis.match('*.png', {
  	optimizer: fis.plugin('png-compressor')
});

//文件合并
fis.match('::package', {
  	postpackager: fis.plugin('loader', {
    	allInOne: true
  	})
});