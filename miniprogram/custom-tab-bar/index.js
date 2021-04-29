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

	mounted : function(){
		if(wx.getStorageSync('tabIndex')){
			this.setData({
				active:wx.getStorageSync('tabIndex')
			})
		}
	},

	methods: {
		onChange(event) {
			this.setData({ active: event.detail})
			wx.setStorageSync('tabIndex', event.detail)
			wx.switchTab({
				url: this.data.list[event.detail].url
			});

		},

	}
});
