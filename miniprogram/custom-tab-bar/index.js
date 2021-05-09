Component({
	data: {
		active: 0,
		list: [
			{
				icon: 'home-o',
				url: '../index/index'
			},
			{
				icon: 'search',
				url: '../books/books'
			},
			{
				icon: 'like-o',
				url: '../favor/favor'
			},
			{
				icon: 'contact',
				url: '../me/me'
			}
		]
	},

	methods: {
		onChange(event) {
			this.setData({ active: event.detail})
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
