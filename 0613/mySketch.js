var capture  //宣告變數
var cacheGraphics  //影像抓取
var bk 
var mode=1//宣告變數mode初始值
var inputElement,sliderElement
var mic //加入聲音麥克風
var colors = "edf2fb-e2eafc-d7e3fc-ccdbfd-c1d3fe-b6ccfe-abc4ff-fae0e4-f7cad0-f9bec7".split("-").map(a=>"#"+a)
class Ball_1{ //定義物件 大量快速建立同類型的物件 
	constructor(args){ //參數預設值(工廠) 宣告物件ball的值 用args接收參數
		this.r=args.r || 20 //直徑 // 用變數名稱args接收r值  ||符號主要設定優先使用args.r，如果沒有傳args.r參數，採用下一個值
		this.p=args.p || {x:width/2,y:height/2}//p位置
		this.color = args.color || random(colors) //顏色
	}
	draw(){//繪製函數 笑臉
		push()
			translate(this.p.x, this.p.y)
			fill(random(colors)) //
		
			ellipse( 0,0, this.r); 
		 	ellipse(-this.r/2,-this.r/2,this.r/2)//耳朵
  		ellipse(this.r/2,-this.r/2,this.r/2)//耳朵
		fill("#fbb1bd")
			ellipse(this.r/4, -this.r/4 , this.r/8);
			ellipse(-this.r/4, -this.r/4 , this.r/8);
			fill("#e2eafc")
		 arc(0,0,this.r/2,this.r/2,0,PI)		//嘴巴	
		fill(0)
		pop()
	}
}
class Ball{//定義物件
	constructor(args){ // 參數預設值(工廠)
		this.r= args.r || 30 // ||符號主要設定優先使用args.r，如果沒有傳args.r參數，採用下一個值
		this.p= args.p || {x:random(width),y:random(height)}  //p位置
		this.color = args.color || random(colors) //顏色
	}	
	
	draw(){  //  繪製函數 小熊
			push() //黑色眼珠
			translate(this.p.x, this.p.y)
			fill(this.color)
		
			ellipse( 0,0, this.r);
			fill(255)
			arc(0,0,this.r/2,this.r/2,0,PI)
			fill(0)
			arc(0,0,this.r/3,this.r/3,0,PI)

		
		pop()
	}

}

var ball
var balls=[]  //宣告一個陣列讓它產生多個
function setup() {
	createCanvas(windowWidth, windowHeight);//creat一個畫布
	background(100);
	
	capture = createCapture(VIDEO)//抓取video設備的指令
	capture.size(640,480);//設定抓取video值產出顯示畫面的大小
	cacheGraphics = createGraphics(640,480)	
	cacheGraphics.translate(640,0) // 先往右邊移動一倍的距離
	cacheGraphics.scale(-1,1) // 翻轉畫布
	capture.hide();//把capture的圖隱藏起來
	
	inputElement=createInput("") //文字框
	inputElement.position(850,70)  //文字框位置
	
	sliderElement= createSlider(30,150,30,3)//設定一個滑桿(最小值，最大值，初始預設值，間距)
	sliderElement.position(850,180)//滑桿位置
	
	mic = new p5.AudioIn() //取得麥克風的聲音放入變數mic裡
	mic.start()//開始取樣
}


function draw() {
	background(0);//畫面不會暫留,不會有軌跡
	
	fill(255)//文字顏色
	textSize(30)//文字大小
	textStyle(BOLD)//文字粗體
  fill("#ede0d4")
	text("上方輸入文字",850,160)
	fill("#e6ccb2")
	text("按下1，顯示顏色文字",880,300)
	fill("#ddb892")
	text("按下2，顯示黑白圓圈",880,350)
	fill("#b08968")
	text("按下3，顯示旋轉方塊",880,400)
	fill("#7f5539")
	text("按下4，顯示原相機",880,450)
	fill("#9c6644")
	text("按下5，顯示自製圖，隨著聲音大小變換圖片",880,500)
	
	
	balls=[]
  cacheGraphics.image(capture, 0,0)
	


var span=20+max(mouseX,0)/20 //宣告變數 雙迴圈裡面每次的間隔//+mouseX方塊隨著滑鼠移動改變大小 往左最大值為0不會是負數
for(var x=0 ; x<cacheGraphics.width; x+=span){ //做一個雙迴圈 切一塊一塊的方塊
	for(var y=0;y<cacheGraphics.height; y+=span){
    var pixel = cacheGraphics.get(x,y);

		bk = (pixel[0] + pixel[1] + pixel[2])/3//抓顏色rgb的平均值,把顏色轉成灰階 0代表r 1代表g 2代表b 3是透明度


		
		if(mode=="1"){
			fill(pixel)//本身的顏色
			text("crystal",x,y)
			textSize(span)//文字大小
			textStyle(BOLD)//粗體
				}	
		
		if(mode=="2"){
			fill(bk) //畫面充滿灰階色
					ellipse(x+100,y+100,span*map(bk,0,255,0,1))//bk的值在0(黑)-255(白)間 經過map值會轉換成0-1間 藉此利用顏色改變那個顏色圓的大小
		
		}

		if(mode=="3"){
		fill(pixel)	//本身的顏色
			push()
				colorMode(HSB) //色相，飽和度，亮度
				fill(pixel[7],100,80)
				translate(x,y)//將點轉到x軸跟y軸
				rotate(pixel[0]/100) //轉動，左上角轉動
				rect(0,0,span*0.5+pixel[2]/50) 
	      fill(0)
	      ellipse(3,4,10)
			pop()//處理圓旋轉
		}
			
		if(mode=="4"){
					image(capture,0, 0)  //獲取圖片
		}
		
	  if(mode=="5"){
			var micLevel=mic.getLevel();//宣告變數 取得麥克風的大小聲的資料
			
			if(micLevel>0.005){
			ball = new Ball_1({p:{x:x,y:y},color: color(pixel[0],pixel[1],pixel[2]) }) //產生一個新的物件
			}
			else
			{
			ball = new Ball({p:{x:x,y:y},color: color(pixel[0],pixel[1],pixel[2]) }) //產生一個新的物件
			}
				balls.push(ball)//把ball放到陣列裡
		}
	}
	}
	
	  if(mode=="5"){
			for(let ball of balls){
			ball.draw()	 //繪製		
	}
		}

	
	  var txts=	inputElement.value()  //取得文字框文字
	  fill("#ffff00")  //顏色
	  //textSize(50)  //大小
	  textSize(sliderElement.value())  //大小
	  textStyle(BOLD)  //粗體
	  for(var x=0;x<width;x=x+textWidth(txts)+10){   
		//從0開始，不能超過視窗寬度，取得文字寬度，間距10
    //text(txts,x,650)  //顯示文字在座標上
	
	}
	
	
}


function keyPressed(){
	if(key=="1"){//當鍵盤被按1的時候 顯示模式1
		mode=1
	}
	if(key=="2"){//當鍵盤被按2的時候 顯示模式2
		mode=2
	}
	if(key=="3"){//當鍵盤被按3的時候 顯示模式3
		mode=3
	}
		if(key=="4"){//當鍵盤被按4的時候 顯示模式4
		mode=4
	}
	if(key=="5"){//其餘的時候 顯示模式5
		mode=5
	}

}