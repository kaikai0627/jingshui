
/*广告图片数组*/
var imgs=[
	{"i":0,"img":"img/images/16sucai_201611131010_23.gif"},
    {"i":1,"img":"img/images/16sucai_201611131010_25.gif"},
    {"i":2,"img":"img/images/16sucai_201611131010_27.gif"},
    {"i":3,"img":"img/images/16sucai_201611131010_23.gif"},
    {"i":4,"img":"img/images/16sucai_201611131010_23.gif"},
];
var adv={
	LIWIDTH:0,//每个li的宽度
	$ulImgs:null,//#imgs的ul
	INTERVAL:500,//动画的时间间隔
	WAIT:3000,//自动轮播之间的等待
	timer:null,//自动轮播定时器的序号
	init(){
		//获得id为slider的元素的width转为浮点数保存在LIWIDTH属性中
		this.LIWIDTH=parseFloat($("#slider").css("width"));
		this.$ulImgs=$("#imgs");
		this.updateView();
		$("#indexs").on("mouseover","li",(e)=>{
			var target=$("#indexs>li").index(e.target);
			var old=imgs[0].i;
			this.move(target-old);
		});
		this.autoMove();
	},
	autoMove(){//启动自动轮播
		this.timer=setTimeout(()=>this.move(1),this.WAIT);
	},
	movePrev:function(n){//右移前的准备
		n*=-1;
		imgs=imgs.splice(-n,n).concat(imgs);
		this.updateView();
		this.$ulImgs.css("left",parseFloat(this.$ulImgs.css("left"))-n*this.LIWIDTH);
	},
	move(n){
		clearTimeout(this.timer);
		if(n<0){//如果右移
			this.movePrev(n);//先准备
			this.$ulImgs.stop(true).animate(//再移动
			{left:0},this.INTERVAL,
			()=>this.autoMove()
		);
		
		}else{
			this.$ulImgs.stop(true).animate(
				{left:-n*this.LIWIDTH},this.INTERVAL,
				()=>this.moveLeftCallback(n)//再修改
			);
		}
	},
	moveLeftCallback(n){
		imgs=imgs.concat(imgs.splice(0,n));
		this.updateView();
		this.$ulImgs.css("left",0);
		//启动自动轮播
		this.autoMove();

	},
	updateView(){//将数组中的内容更新到页面
		for(var i=0,lis="",idxs="";i<imgs.length;i++){
			lis+=`<li><img src="${imgs[i].img}"></li>`;
			idxs+="<li></li>"
		}
		this.$ulImgs.html(lis)
					.css("width",imgs.length*this.LIWIDTH);	
		$("#indexs").html(idxs)
					.children(`li:eq(${imgs[0].i})`)
					.addClass("hover");
	},
}
adv.init();

