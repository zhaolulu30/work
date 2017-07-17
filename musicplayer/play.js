var myAudio = $("audio")[0];
$( document ).ready(function() {
    var mark=true;
    $(".play").click(function(){
        if(mark){
            play();
        }
    });
	$(".pause").click(function(){
		if(!mark){
			$("#music").trigger('pause');
			$(".play").css("display","inline-block");
			$(".pause").css("display","none");
			$("#styli").addClass("play-needle");
			$("#disk-album-bg").removeClass("rotate");
			mark=true;

		}
		
	});

	//播放模式选择点击事件。设置一个开关，true是列表循环，false是单曲循环
    var off=true;
    $(".loop").click(function(){
        //单曲循环
        if(off){
            $(".solo").css("display","inline-block");
			$(".loop").css("display","none");
			$('audio').attr('loop','loop');
         	off=false;
        }
    });
 $(".solo").click(function(){
		// 列表循环
		if(!off){
			$(".loop").css("display","inline-block");
			$(".solo").css("display","none");
			$('audio').removeAttr('loop','no-loop');
			off=true;
		}
	});
	// 切换收藏按钮
	var like=true;
	$(".unlike").click(function(){
		if(like){
			$(".unlike").css("display","none");
			$(".like").css("display","inline-block");
			like=false;
		}
	});
	$(".like").click(function(){
		if(!like){
			$(".like").css("display","none");
			$(".unlike").css("display","inline-block");
			like=true;
		}
	});
	


	

//播放状态
	function play(){
		
			myAudio.play();
		$("#disk-album-bg").addClass("rotate");
			$(".play").css("display","none");
			$(".pause").css("display","inline-block");
			$("#styli").removeClass("play-needle");
            mark=false;

	}

	//下一曲
	$(".next").click(function(){
		getmusic();
	});
	//上一曲
	$(".pre").click(function(){
		getmusic();
	});
// 换频道
$("#control .fm").click(function(){
	getChannel();
});

// 切换歌词
//显示歌词
var on=true;
$(".center").click(function(){
	if(on){
		$(".center").css("display","none");
		$(".music-massage").css("display","none");
		$(".like-info").css("display","none");
		$(".music-lyric").css("display","block");
		on=false;
	}
});

$(".music-lyric").click(function(){
	if(!on){
		$(".music-lyric").css("display","none");
		$(".center").css("display","block");
		$(".music-massage").css("display","block");
		$(".like-info").css("display","block");
		$(".center").css("opacity",1);
		on=true;


	}
});

    
    //获取歌词
   // var txt=$("#text").val().split("[");
   // console.log(txt);
function renderLyric(){
	var lyrLi = "";
	//动态添加歌词的li
    for (var i = 0; i < lyricArr.length; i++) {
        lyrLi += "<li data-time='"+lyricArr[i][0]+"'>"+lyricArr[i][1]+"</li>";
    }
    //console.log(lyrLi);
    $('.music-lyric .lyric').append(lyrLi);
    setInterval(showLyric,100);//怎么展示歌词
	
}

   function showLyric(){
    var liH = $(".lyric li").eq(5).outerHeight()-3; //每行高度
    for(var i=0;i< lyricArr.length;i++){//遍历歌词下所有的li
        var curT = $(".lyric li").eq(i).attr("data-time");//获取当前li存入的当前一排歌词时间
        var nexT = $(".lyric li").eq(i+1).attr("data-time");
        var curTime = myAudio.currentTime;
		//console.log(curTime);
        if ((curTime > curT) && (curT < nexT)){//当前时间在下一句时间和歌曲当前时间之间的时候 就渲染 并滚动
            $(".lyric li").removeClass("active");
            $(".lyric li").eq(i).addClass("active");
            $('.music-lyric .lyric').css('top', -liH*(i-9));
        }
    }

}
   var html="";
//监听
    // var num=0;
    // $("#music").on('timeupdate',function(){
        
    //     var currT=parseInt(this.currentTime);
        
    //     //console.log(currT);

    //     if(document.getElementById(currT)){
    //         for(var i=0;i<$("p").length;i++){
    //             $("p").removeClass('active');
    //         }
    //         document.getElementById(currT).className="active";
    //     if($("p").eq(num+7).attr("id")==currT){
    //         //console.log($("p").eq(num+7).attr("id"));
    //         $(".content").css("top",-20*num+'px');
    //         num++;
    //     }
    //  }

    // });
function getChannel(){
	$.ajax({
		url: 'https://jirenguapi.applinzi.com/fm/getChannels.php',
		dataType: 'json',
		Method: 'get',
		success: function(response){
			var channels = response.channels;
			var num = Math.floor(Math.random()*channels.length);
			var channelname = channels[num].name;
			var channelId = channels[num].channel_id;
			$('.record').text(channelname);
			$('.record').attr('title',channelname);
			$('.record').attr('data-id',channelId);
			getmusic();
		}
	})
}
// 通过ajax获取歌曲
function getmusic(){
	$.ajax({
		url: 'https://jirenguapi.applinzi.com/fm/getSong.php',
		dataType: 'json',
		Method: 'get',
		data:{
		      'channel': $('.record').attr('data-id')
		    },
		success: function (ret) {
		   var resource = ret.song[0],
		       url = resource.url,
		       bgPic = resource.picture,
		       sid = resource.sid,//
		       ssid = resource.ssid,//
		       title = resource.title,
		       author = resource.artist;
	       $('audio').attr('src',url);
	       $('audio').attr('sid',sid);
	       $('audio').attr('ssid',ssid);
		   if(title!=null){
				$('.musicname').text(title);
	       $('.musicname').attr('title',title)
		   }
	       $('.musicer').text(author);
	       $('.musicer').attr('title',author)
	       $("#disk-album-bg").css({
	       		'background':'url('+bgPic+')',
	       		'background-repeat': 'no-repeat',
				'background-position': 'center',
				'background-size': 'cover',
	 		});
			 $(".background").css({
	       		'background':'url('+bgPic+')',
	       		'background-repeat': 'no-repeat',
				'background-position': 'center',
				'background-size': 'cover',
	 		});
			
				play();//播放
	       
	       getlyric();//获取歌词
		   timer1();// 总时间
		   timer();
		}
	})
};
//获取歌词
var lyricArr=[];
function getlyric(){
	var Sid = $('audio').attr('sid');
	var Ssid = $('audio').attr('ssid');
	$.get('https://jirenguapi.applinzi.com/fm/getLyric.php', {ssid: Ssid, sid: Sid})
        .done(function (lyr){
        	// console.log(lyr);
        	var lyr = JSON.parse(lyr);;
        	// console.log(lyr);
            // $('text').text(lyr);
        	if (!!lyr.lyric) {
	        	$('.music-lyric .lyric').empty();//清空歌词信息
	        	var line = lyr.lyric.split('\n');//歌词为以排数为界的数组
                var timeReg = /\[\d{2}:\d{2}.\d{2}\]/g;//时间的正则
				
                var result = [];
                if(line != ""){
                    for(var i in line){//遍历歌词数组
                        var time = line[i].match(timeReg);//每组匹配时间 得到时间数组
                        if(!time)continue;//如果没有 就跳过继续
                        var value = line[i].replace(timeReg,"");// 纯歌词
                        for(j in time){//遍历时间数组
                            var t = time[j].slice(1, -1).split(':');//分析时间  时间的格式是[00:00.00] 分钟和毫秒是t[0],t[1]
                            //把结果做成数组 result[0]是当前时间，result[1]是纯歌词
                            var timeArr = parseInt(t[0], 10) * 60 + parseFloat(t[1]); //计算出一个curTime s为单位
                            result.push([timeArr, value]);
                        }
                    }
                }
	            //时间排序
	            result.sort(function (a, b) {
	                return a[0] - b[0];
	            });
	            lyricArr = result;//存到lyricArr里面
	            renderLyric();//渲染歌词
                //console.log(lyricArr);
                $('text').text(lyricArr);

        	}
        }).fail(function(){
        	// $('.music-lyric .lyric').html("<li>本歌曲展示没有歌词</li>");
            console.log("本歌曲展示没有歌词");
        })
}

getChannel();


//进度条时间
var currT=document.getElementById("currentTime");
// 将秒换算成分钟的函数
function sToM(sec,obj){
	var m=Math.floor(sec/60);
	var s=Math.floor(sec%60);
	var secT=toZero(m)+":"+toZero(s);
	obj.html(secT);

	//console.log(secT);
}
// 时间补0函数
function toZero(n){
	return n<10?'0'+n:''+n;
}

//通过定时器不断获取歌曲的当前播放时间
var timer2=null;
function timer(){
	clearInterval(timer2);
	timer2=setInterval(function(){
		 sToM (myAudio.currentTime,$("#currentTime")); 
		 curMoveByCurtime(myAudio.currentTime,myAudio.duration);
	},500);
}

// 8.通过定时器获取当前歌曲的总时长 （需要延迟获取）
	var duration=0;
    function timer1(){
    	var timer1=setInterval(function() {
    		if (myAudio.duration) {
    		// 获取到当前歌曲的总时长后就不用再获取了
                durationT=myAudio.duration;
    			clearInterval(timer1);
    			sToM (myAudio.duration,$("#total-time"));	
    		}
    	}, 16);
    }

// 进度条控制
// setInterval(present,500)	//每0.5秒计算进度条长度
$("#process-bar").click(function(ev){  //拖拽进度条控制进度
	var ev=ev||event;
	var posX = ev.clientX;
	var targetLeft = $(this).offset().left;
	var percentage = (posX - targetLeft)/235*100;
	myAudio.currentTime = myAudio.duration * percentage/100;
});



//进度点根据播放当前时间运动函数 
var curBtn=$("#cur-btn");
var processCur=$("#process-cur");
    function curMoveByCurtime(nowtime,alltime){
		if(nowtime>=alltime){
			getmusic();
		}
    	processCur.css("width",(nowtime/alltime)*235 +'px');
    	curBtn.css("left",(nowtime/alltime)*235 +'px');//进度点的位置根据歌曲的时间运动
    }

});