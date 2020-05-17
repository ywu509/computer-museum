let currentTab = "";
      function showHomeTab() {
         if (currentTab != "Home") {
            currentTab = "Home";
            showNoTabs();
            document.getElementById("Home").style.backgroundColor = "#dae3e8";
            document.getElementById("SectionA").style.display = "inline";
         }
      }

      function showNewsTab() {
         if (currentTab != "News") {
            currentTab = "News";
            showNoTabs();
            document.getElementById("News").style.backgroundColor = "#dae3e8";
            document.getElementById("SectionB").style.display = "inline";
         }
      }

      function showDisplaysTab() {
         if (currentTab != "Displays") {
            currentTab = "Displays";
            showNoTabs();
            document.getElementById("Displays").style.backgroundColor = "#dae3e8";
            document.getElementById("SectionC").style.display = "inline";
			
         }
      }
	  
      function showGuestBookTab() {
         if (currentTab != "GuestBook") {
            currentTab = "GuestBook";
            showNoTabs();
            document.getElementById("GuestBook").style.backgroundColor = "#dae3e8";
            document.getElementById("SectionD").style.display = "inline";
         }
      }

      function showNoTabs() {
         document.getElementById("Home").style.backgroundColor = "transparent";
         document.getElementById("News").style.backgroundColor = "transparent";
         document.getElementById("Displays").style.backgroundColor = "transparent";
         document.getElementById("GuestBook").style.backgroundColor = "transparent";
		 
         document.getElementById("SectionA").style.display = "none";
         document.getElementById("SectionB").style.display = "none";
         document.getElementById("SectionC").style.display = "none";
		 document.getElementById("SectionD").style.display = "none";
      }

      window.onload = function () {
         showHomeTab();
      }
	  
	  function postComments() {
		  const xhr = new XMLHttpRequest();
		  var userComments = document.getElementById("nameBox").value;
		  const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/comment?name="+ userComments;
		  xhr.open("POST", uri, true);
		  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		  const key = '"content"';
		  var value = document.getElementById("commentBox").value;
		  const myPostString = "{" + key + ":" + '"' + value + '"'+ "}";
		  const myObj = JSON.parse(myPostString); 
		  xhr.send(JSON.stringify(myObj.content));
	  }
	  
	  function reloadComments(){
		  setTimeout(function(){
			document.getElementById("iframeComments").src = document.getElementById("iframeComments").src;
		  }, 1000);
	  }
	  
	  function getDisplays() {
		  const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/items";
		  const xhr = new XMLHttpRequest();
		  xhr.open("GET", uri, true);
		  xhr.setRequestHeader("Accept", "application/json")
		  xhr.onload = () => {
		    const resp = JSON.parse(xhr.responseText);
		    showDisplays(resp);
		  }
		  xhr.send(null);
	  }

	   function showDisplays(Displays) {
		   let tableContent = "<tr class='newsSomething'><td></td></tr>\n";
		   
		   const addRecord = (record) => {
				/*???=<img style="width: 150px;" src="http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/itemimg?id=" + record.ItemId />*/
			  tableContent += '<tr><td><img style="width: 150px;" src="http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/itemimg?id=' + record.ItemId + '"/></td></tr><tr><td id="displayTitle">' + record.Title + "</td></tr><tr><td>" + record.Description + "</td></tr>\n";
		   }
		   Displays.forEach(addRecord);
		   document.getElementById("showUpDisplays").innerHTML = tableContent;
	   }
	   
	   function search() {
		   var searchCode = document.getElementById("searchBar").value;
		   const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/search?term=" + searchCode;
		   const xhr = new XMLHttpRequest();
		   xhr.open("GET", uri, true);
		   xhr.setRequestHeader("Accept", "application/json")
		   xhr.onload = () => {
			  const resp = JSON.parse(xhr.responseText);
			  showDisplays(resp);
		   }
		   xhr.send(null);
	   }
	   
	   function getNews() {
		   const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/news";
		   const xhr = new XMLHttpRequest();
		   xhr.open("GET", uri, true);
		   xhr.setRequestHeader("Accept", "application/json")
		   xhr.onload = () => {
			  const resp = JSON.parse(xhr.responseText);
			  showNews(resp);
		   }
		   xhr.send(null);
		}

		function showNews(News) {
		   let tableContent = "<tr class='newsSomething'><td></td></tr>\n";
		   
		   const addRecord = (record) => { 
			  tableContent += '<tr><td><img style="width: 150px;" src =' + record.enclosureField.urlField+ '></td></tr><tr><td><a href=' + record.linkField + '>' + record.titleField + "</a></td></tr><tr><td>" + record.pubDateField + "</td></tr><tr><td>" + record.descriptionField + "</td></tr><br\><br\>";
		   }
		   News.forEach(addRecord)
		   document.getElementById("showUpNews").innerHTML = tableContent;
		}