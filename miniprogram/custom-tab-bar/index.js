Component({
	data: {
		active: 0,
		list: [
			{
				icon: 'home-o',
				url: '../pages/index/index'
			},
			{
				icon: 'search',
				url: '../pages/index/index'
			},
			{
				icon: 'contact',
				url: '../pages/me/me'
			}
		]
	},

	methods: {
		onChange(event) {
			this.setData({ active: event.detail });
			wx.switchTab({
				url: this.data.list[event.detail].url
			});
		},

		init() {
			const page = getCurrentPages().pop();
			this.setData({
				active: this.data.list.findIndex(item => item.url === `/${page.route}`)
			});
		}
	}
});
