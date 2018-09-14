	(function ( ){
		var listTab = document.querySelectorAll('.tabItem');
		var conItem = document.querySelectorAll('.conItem');
		Array.from(listTab).forEach(function(val,index){
			val.addEventListener('click',function(){
				for (var i=0;i<listTab.length;i++) {
					listTab[i].classList.remove('selected');
					conItem[i].style.display = 'none';
				};
				listTab[index].classList.add('selected');
				conItem[index].style.display='block';
			});
		});
	})();	
			
	//获取滚动条当前的位置
	function getScrollTop() {
	    var scrollTop = 0;
	    if(document.documentElement && document.documentElement.scrollTop) {
	        scrollTop = document.documentElement.scrollTop;
	    } else if(document.body) {
	        scrollTop = document.body.scrollTop;
	    }
	    return scrollTop;
	}
			
	//获取当前可视范围的高度  
	function getClientHeight() {
	    var clientHeight = 0;
	    if(document.body.clientHeight && document.documentElement.clientHeight) {
	        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
	    } else {
	        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
	    }
	    return clientHeight;
	}
	
	//获取文档完整的高度 
	function getScrollHeight() {
	    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
	}
	
	//滚动事件触发
	window.onscroll = function() {
	    if(getScrollTop() + getClientHeight() == getScrollHeight()) {
	        console.log('下拉刷新了')
	        //此处发起AJAX请求
	    }
	}
	
	document.querySelector('.moreListIcon').addEventListener('click',function(){
		document.querySelector('.moreList').style.display='block';
	})
			
		