module.exports = {
	chainWebpack: config => {
		config.module.rule('ts')
			.exclude
			.add(/vue\-modal\-viewer/);
	},
	configureWebpack: {
		externals: process.env.NODE_ENV === 'production' ?
			{
				'vue-modal-viewer': "vue-modal-viewer",
				vue: "vue"
			} : {}
	}
}
