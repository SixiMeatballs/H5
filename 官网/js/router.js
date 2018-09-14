window.onload=function(){
	//跳转路由
	function Router(){
	    this.paths={};
	    this.curPath='';
	};
	Router.prototype={
	    path:function(str,callback){
	        var func=callback||function(){};
	        this.paths[str]=func;
	    },
	    refresh:function(){
	        this.curPath=location.hash.slice(1)||'';
	        this.paths[this.curPath]();
	    },
	    init:function(){
	        window.addEventListener('load',this.refresh.bind(this),false)
	        window.addEventListener('hashchange',this.refresh.bind(this),false)
	    }
	};
	var r=new Router();
	r.init();
	var jump=document.querySelector('#jump_content');
	var section=document.querySelector('.section');
	var con=document.querySelector('#con');
	var config={url:'http://123.206.174.209:81/',type:'webhelp',};
	var title=document.querySelector('.titles');
	var time=document.querySelector('.time');
	var question=document.querySelector('.question');
	var id=[];
	r.path('',function(){
        jump.style.display="none";
        section.style.display="block";    
        con.style.display="none";
  	 });
	r.path('/jump',function(){
        jump.style.display="block";
        section.style.display="none";
        con.style.display="none";
        
 	});
	
	//	获取最新数据
	function getNewData(callback){
		$.ajax({
			type:"get",
	    	url:`${config.url}MESSAGE/GetTopNews?NewsCode=${config.type}&pageCount=8`,
	    	async:true,
	    	success:function(data) {
	    		callback(data);
	    	}
		});
	};
	var list = document.querySelector('.problem_list');
	getNewData(function(data){
		for (let i=0;i<data.Data.length;i++) {
			var li = document.createElement('li');
			var a = document.createElement('a');
			a.innerHTML=data.Data[i].Title;
			a.setAttribute("href","#/con"+data.Data[i].Id);
			li.append(a);
			list.appendChild(li);
			id.push(data.Data[i].Id);
		};
		content(id);			
	});
	//获取点击更多之后出现的列表；
	var allList = document.querySelector('.all_list');
	var nextList=document.querySelector('.next_list');
	function getAllList(callback){
		$.ajax({
			type:"get",
	    	url:`${config.url}MESSAGE/GetPagedNews?NewsCode=${config.type}&pageCount=20&lastPid=0`,
	    	async:true,
	    	success:function(data) {
	    		callback(data);
	    	}
		});
	}	
	getAllList(function(data){
		for (let i=0;i<data.Data.List.length;i++) {
			var li = document.createElement('li');
			var a = document.createElement('a');
			a.innerHTML=data.Data.List[i].Title;
			a.setAttribute("href","#/con"+data.Data.List[i].Id);
			li.append(a);
			allList.appendChild(li);
			id.push(data.Data.List[i].Id);
		};
		content(id);	
		var currentPage = 1;//当前页
		var totalPage = Math.ceil(data.Data.Count/20);
		var lastItem =  data.Data.List[data.Data.List.length -1];
		var lastId = lastItem.Id;
		total.innerHTML = totalPage;	
		current.innerHTML=currentPage;
		right.addEventListener('click',function(){
			nextList.innerHTML='';		
			allList.innerHTML='';
			if(currentPage >= totalPage){	
				currentPage = totalPage;
				current.innerHTML=totalPage;
			}
			if (currentPage < totalPage) {
			    currentPage++;
				current.innerHTML=currentPage;
			};
			if(lastId>20){lastId=lastId-20;}else(lastId=lastId);
			getNext(lastId);
           			
		});
		
		left.addEventListener('click',function(){
			nextList.innerHTML='';
			allList.innerHTML='';
			if(currentPage <= 0){
				currentPage = 1;
				current.innerHTML=1;
				//return;
			}
			if( currentPage>0){
				if(currentPage >1){
					currentPage--;
				}
				current.innerHTML=currentPage;
			}
			if(lastId<data.Data.Count){lastId=lastId+20;}else(lastId=lastId);
			getNext(lastId);
		});
		
	});
	function getNext(lastId){
		$.ajax({
			type:"get",
	    	url:`${config.url}MESSAGE/GetPagedNews?NewsCode=${config.type}&pageCount=20&lastPid=${lastId}`,
	    	async:true,
	    	success:function(datas) {
	    		for (let i=0;i<datas.Data.List.length;i++) {
					var li = document.createElement('li');
					var a = document.createElement('a');
					a.innerHTML=datas.Data.List[i].Title;
					a.setAttribute("href","#/con"+datas.Data.List[i].Id);
					li.append(a);
					nextList.appendChild(li);
					id.push(datas.Data.List[i].Id);
				};
				content(id);	
	    	}
		});
	}
    //获取详细问题及内容；	
	function content(id){
		for (let j=0;j<id.length;j++) {
			r.path('/con'+id[j],function(){
				jump.style.display="none";
		        section.style.display="none";
		        con.style.display="block";
		        con.style.transition="all 1s";
		        $.ajax({
		        	type:"get",
		        	url:`${config.url}/MESSAGE/GETNEWSDETAILS?pid=${id[j]}`,
		        	async:true,
		        	success:function(data){
		        		title.innerHTML="问："+data.Data.Title;
		        		time.innerHTML=data.Data.Time;
		        		question.innerHTML="答："+data.Data.Content;
		        	}
		        });
			});
		}
	}
	
	//	分页
	var left = document.querySelector('.left');
	var right = document.querySelector('.right');
	var current = document.querySelector('.now');
	var total = document.querySelector('.total');
	

}	
	

