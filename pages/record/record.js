let rm = null;//录音管理器

Page({
    data:{
        name:"dingding demo page"
    },
    customData: {
        recordAudioArr: []
    },
    changeName(){
        this.setData({
            name: 'dingtalk'
        })
    },
    canUseRecord: false,//是否可以使用录音功能
    onLoad(){
        console.log("onLoad");
        if (dd.canIUse('getRecorderManager')) {
            this.canUseRecord = true;
            rm = dd.getRecorderManager();//录音管理器
            rm.onstart = () => {
                console.log('开始录音');
            }
            rm.onstop = (res) => {
                console.log('结束录音');//res.tempFilePath
                this.customData.recordAudioArr.push(res.tempFilePath);
                this.setData({//数据发送到视图
                    recordAudioArr: this.customData.recordAudioArr
                });
            }
            rm.onerror = (err) => {
                dd.showToast({content: JSON.stringify(err)});
            }
        } else {
            dd.showToast({content: '请升级钉钉版本至4.5.18以支持录音功能'});
        }    
    },
    jumpTo(){
        //保留当前,打开新页面
        dd.navigateTo({
            url: '../landscape/landscape'
        });
        //关闭当前页面
        // dd.redirectTo({
        //     url: '../landscape/landscape'
        // });
    },
    recordStart(){
        if(!this.canUseRecord) return;
        rm.start({ duration: 5 });
    },
    recordEnd(){
        if(!this.canUseRecord) return;
        rm.stop();
    },

    /**
     * 触摸动作被打断，如来电提醒，弹窗
     */
    recordCancel(){
        if(!this.canUseRecord) return;
        console.log('recordCancel')
    },
    playAudio(e){
        let length = this.data.recordAudioArr.length;//录音的总数
        let index = 0;//录音的索引
        let bam = dd.getBackgroundAudioManager();
        //监听背景音频结束事件
        bam.onEnded = (e) => {
            index++;
            if(index >= length) return
            bam.src = this.data.recordAudioArr[index];
            bam.title = '';//不实例化此属性，ios调用多次play()，playbackRate会累加
            bam.play();
        }
        //监听背景音频错误事件, 错误类型（10001-系统错误 10002-网络错误 10003-文件错误 10004-格式错误）
        bam.onError = (err) => {
            dd.showToast({content: JSON.stringify(err)});
        }
        bam.src = this.data.recordAudioArr[index];
        bam.title = '';//不实例化此属性，ios调用多次play()，playbackRate会累加
        bam.play();
    }
});
