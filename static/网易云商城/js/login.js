window.onload=function(){
	var oBtn_login=document.getElementById('login');
	var oContent=document.getElementById('logincontent');
	var oClose=document.getElementById('close');
	
	oBtn_login.onclick=function(){
		oContent.style.display='block';
	};
	oClose.onclick=function(){
		oContent.style.display='none';
//	alert(1);
	};
	
};
