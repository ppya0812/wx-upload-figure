// import xx from 'xxx'

page({
    data: {
        fileSrc: '',
        URL: '',
        token: ''
    },
    chooseImage() {
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                const tempFilePaths = res.tempFilePaths
                this.setData({
                    fileSrc: tempFilePaths[0]
                })
            }
        })
    },
    previewImage(e) {
        wx.previewImage({
             current: e.currentTarget.id, // 当前显示图片的http链接
             urls: this.data.fileList // 需要预览的图片http链接列表
         })
    },
    formSubmit(e) {
        const {fileSrc, URL, token} = this.data;
        if (!fileSrc) {
			wx.showModal({
				title: '提示',
				content: '请选择所需上传的图片',
				showCancel: false
			})
			return
		}
        wx.uploadFile({
            url: URL,
            filePath: fileSrc,
            header: {
                'Authorization': `Token ${token}`
            },
            name: 'figure_file',
            formData:{
                figure_file: fileSrc,
            },
            success: (res) => {
                // toDo:
                // wx.navigateBack()
                console.log('success', res)
            },
            fail: (res) => {
                console.log('fail', res)
            }
        })
    },
    onLoad(options) {
        const token = wx.getStorageSync('token')
        this.setData({token})
    }
})
