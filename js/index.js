const PAGE = {
	data:{
		teacherSpeed:500,                           
	  index:0,                                   
	  isLock:false,
	  teachItemLength:null,
	  teachItemWidth:null,
	  translateX: 0,
	},
	init:function(){
		this.clone();
		this.bind();
	},
	bind:function(){
		let teachPrev = document.getElementById('teacher-content-prev');
		let teachNext = document.getElementById('teacher-content-next');
		let watchTitle = document.getElementsByClassName('watch-course-title');
		for(let i = 0;i<watchTitle.length;i++){
			watchTitle[i].addEventListener('click',this.watchTitle)
		}
		teachPrev.addEventListener('click',this.teachPrev);
		teachNext.addEventListener('click',this.teachNext);
	},
	watchTitle:function(e){
		let index = e.target.parentNode;
		if(index.className === 'watch-course-item'){
			index.className = 'watch-course-item active'
		}else{
			index.className = 'watch-course-item'
		}
	},
	clone:function(){
		let teachItem = document.getElementsByClassName('teacher-carousel-item');
		for(let i = 0;i < teachItem.length;i++){
			PAGE.data.teachItem = teachItem[i];
			PAGE.data.teachItemWidth = teachItem[i].offsetWidth;
			teachItem[i].setAttribute('data-index', i);
		}
		PAGE.data.teachItemLength = teachItem.length;
		console.log(PAGE.data.teachItemLength)
		let FirstItem = teachItem[0].cloneNode(true)
		let SecondItem = teachItem[1].cloneNode(true)
		let ThirdlyItem = teachItem[2].cloneNode(true)
		let FourthlyItem = teachItem[3].cloneNode(true)
		let FifthItem = teachItem[teachItem.length -1].cloneNode(true)		
    let teachContent = document.getElementById('teacher-list-content');
    teachContent.appendChild(FirstItem);
    teachContent.appendChild(SecondItem);
    teachContent.appendChild(ThirdlyItem);
    teachContent.appendChild(FourthlyItem);
    teachContent.prepend(FifthItem);
    let index = PAGE.data.index;
    let teachContentWidth = PAGE.data.teachItemWidth;
    PAGE.data.translateX = -(teachContentWidth + teachContentWidth * index)   
    PAGE.goIndex(index);
	},
	teachPrev:function(){
		let index = PAGE.data.index;
		PAGE.goIndex(index - 1)
	},
	teachNext:function(){
		let index = PAGE.data.index;
		PAGE.goIndex(index + 1)
	},
	goIndex: function(index){
    let teacherSpeed = PAGE.data.teacherSpeed;
    let teachItemWidth = PAGE.data.teachItemWidth;
    let translateX = PAGE.data.translateX;
    let endTranslateX = - (teachItemWidth + teachItemWidth * index);
    let teachContent = document.getElementById('teacher-list-content');
    let isLock = PAGE.data.isLock;
    if(isLock){
      return
    }
    PAGE.data.isLock = true;
    PAGE.animateTo(translateX,endTranslateX,teacherSpeed,function(value){
      teachContent.style.transform = `translateX(${value}px)`;
    },function(value){
      let teachItemLength = PAGE.data.teachItemLength;
      let arr = PAGE.data.teachItem;
      if(index === -1){
        index = teachItemLength - 1;
        value = - (teachItemWidth + teachItemWidth * index);
      }
      if(index === teachItemLength){
        index = 0;
        value = - (teachItemWidth + teachItemWidth * index);
      }
      teachContent.style.transform = `translateX(${value}px)`;
      PAGE.data.index = index;
      PAGE.data.translateX = value;
      PAGE.data.isLock = false;
    })
  },
  animateTo:function(begin,end,duration,changeCallback,finishCallback){
    let startTime = Date.now();
    requestAnimationFrame(function update(){
      let dataNow = Date.now();
      let time = dataNow - startTime;
      let value = PAGE.linear(time,begin,end,duration);
      typeof changeCallback === 'function' && changeCallback(value)
      if(startTime + duration > dataNow){
        requestAnimationFrame(update)
      }else{
        typeof finishCallback === 'function' && finishCallback(end)
      }
    })
  },
  linear: function(time, begin, end, duration) { 
    return ( end - begin ) * time / duration + begin;
  },
}
PAGE.init();