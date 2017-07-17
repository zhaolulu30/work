
            var close=document.getElementById("close");
            var open=document.getElementById("open");
            var mySidenav=document.getElementById("mySidenav");

            open.onmouseover=function(){
                mySidenav.style.width="280px";
                document.getElementById("main").style.marginLeft="-280px";
                document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
            };

            close.onclick=function(){
                mySidenav.style.width="0";
                document.getElementById("main").style.marginLeft="0";
                document.body.style.backgroundColor="white";
            };


    function openCon(evt,page){
        var i, tabcontent, tablinks;

            // Get all elements with class="tabcontent" and hide them
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }

            // Get all elements with class="tablinks" and remove the class "active"
            tablinks = document.getElementsByClassName("act");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }

            // Show the current tab, and add an "active" class to the button that opened the tab
            document.getElementById(page).style.display = "flex";
            evt.currentTarget.className += " active";
    }

        