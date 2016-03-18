define(["appSettings","appStorage","libraryBrowser","jQuery"],function(e,t,a,n){function r(e){var t=e.target;t.classList.contains("card")&&(V&&(clearTimeout(V),V=null),t=t.querySelector(".cardOverlayTarget"),t&&i(t))}function i(e){e.classList.contains("hide")||requestAnimationFrame(function(){var t=[{height:"100%",offset:0},{height:"0",offset:1}],a={duration:300,iterations:1,fill:"forwards",easing:"ease-out"};e.animate(t,a).onfinish=function(){e.classList.add("hide")}})}function o(e){e.classList.contains("hide")&&(e.classList.remove("hide"),requestAnimationFrame(function(){e.style.display="block";var t=[{height:"0",offset:0},{height:"100%",offset:1}],a={duration:300,iterations:1,fill:"forwards",easing:"ease-out"};e.animate(t,a)}))}function s(e,t,n,r){var i="";i+='<div class="cardOverlayInner">';var o=n.className.toLowerCase(),s=-1!=o.indexOf("mini"),l=s||-1!=o.indexOf("small"),c=-1!=o.indexOf("portrait"),d=(-1!=o.indexOf("square"),l||s||c?null:e.SeriesName),u=a.getPosterViewDisplayName(e,!0);i+='<div style="margin-bottom:1em;">';var m,p=l||s?20:26;d&&e.ParentLogoItemId?(m=ApiClient.getScaledImageUrl(e.ParentLogoItemId,{maxHeight:p,type:"logo",tag:e.ParentLogoImageTag}),i+='<img src="'+m+'" style="max-height:'+p+'px;max-width:100%;" />'):e.ImageTags.Logo?(m=ApiClient.getScaledImageUrl(e.Id,{maxHeight:p,type:"logo",tag:e.ImageTags.Logo}),i+='<img src="'+m+'" style="max-height:'+p+'px;max-width:100%;" />'):i+=d||u,i+="</div>",d?(i+="<p>",i+=u,i+="</p>"):l||s||(i+='<p class="itemMiscInfo" style="white-space:nowrap;">',i+=a.getMiscInfoHtml(e),i+="</p>"),s||(i+='<div style="margin:1em 0 .75em;">',c?(i+='<div class="itemCommunityRating">',i+=a.getRatingHtml(e,!1),i+="</div>",i+='<div class="userDataIcons" style="margin:.5em 0 0em;">',i+=a.getUserDataIconsHtml(e),i+="</div>"):(i+='<span class="itemCommunityRating" style="vertical-align:middle;">',i+=a.getRatingHtml(e,!1),i+="</span>",i+='<span class="userDataIcons" style="vertical-align:middle;">',i+=a.getUserDataIconsHtml(e),i+="</span>"),i+="</div>"),i+="<div>";var f=0;if(MediaController.canPlay(e)){var g=(e.UserData||{}).PlaybackPositionTicks||0;i+='<paper-icon-button icon="play-circle-outline" class="btnPlayItem" data-itemid="'+e.Id+'" data-itemtype="'+e.Type+'" data-isfolder="'+e.IsFolder+'" data-mediatype="'+e.MediaType+'" data-resumeposition="'+g+'"></paper-icon-button>',f++}return-1!=r.indexOf("trailer")&&(i+='<paper-icon-button icon="videocam" class="btnPlayTrailer" data-itemid="'+e.Id+'"></paper-icon-button>',f++),i+='<paper-icon-button icon="'+AppInfo.moreIcon+'" class="btnMoreCommands"></paper-icon-button>',f++,i+="</div>",i+="</div>"}function l(){var e=this.getAttribute("data-itemid");return ApiClient.getLocalTrailers(Dashboard.getCurrentUserId(),e).then(function(e){MediaController.play({items:e})}),!1}function c(){var e=this,t=e.getAttribute("data-itemid"),n=e.getAttribute("data-itemtype"),r="true"==e.getAttribute("data-isfolder"),i=e.getAttribute("data-mediatype"),o=parseInt(e.getAttribute("data-resumeposition"));return a.showPlayMenu(this,t,n,r,i,o),!1}function d(){var e=n(this).parents(".card")[0];return m(e,{showPlayOptions:!1}),!1}function u(e){var t=v(e.target,"card");if(t){var a=t.querySelector(".itemSelectionPanel");return a||m(t,{}),e.preventDefault(),!1}}function m(t,r){var i=t;t.classList.contains("card")||t.classList.contains("listItem")||(t=n(t).parents(".listItem,.card")[0]);var o=t.getAttribute("data-itemid"),s=t.getAttribute("data-playlistitemid"),l=t.getAttribute("data-commands").split(","),c=t.getAttribute("data-itemtype"),d=t.getAttribute("data-mediatype"),u=parseInt(t.getAttribute("data-positionticks")||"0"),m=t.getAttribute("data-playaccess"),p=t.getAttribute("data-locationtype"),f=t.getAttribute("data-index"),g=t.getAttribute("data-albumid"),h=t.getAttribute("data-artistid");Dashboard.getCurrentUser().then(function(v){var b=[];-1!=l.indexOf("addtocollection")&&b.push({name:Globalize.translate("ButtonAddToCollection"),id:"addtocollection",ironIcon:"add"}),-1!=l.indexOf("playlist")&&b.push({name:Globalize.translate("ButtonAddToPlaylist"),id:"playlist",ironIcon:"playlist-add"}),v.Policy.EnableContentDownloading&&AppInfo.supportsDownloading&&d&&b.push({name:Globalize.translate("ButtonDownload"),id:"download",ironIcon:"file-download"}),-1!=l.indexOf("delete")&&b.push({name:Globalize.translate("ButtonDelete"),id:"delete",ironIcon:"delete"}),v.Policy.IsAdministrator&&(-1!=l.indexOf("edit")&&b.push({name:Globalize.translate("ButtonEdit"),id:"edit",ironIcon:"mode-edit"}),-1!=l.indexOf("editimages")&&b.push({name:Globalize.translate("ButtonEditImages"),id:"editimages",ironIcon:"photo"}),-1!=l.indexOf("editsubtitles")&&b.push({name:Globalize.translate("ButtonEditSubtitles"),id:"editsubtitles",ironIcon:"closed-caption"})),-1!=l.indexOf("instantmix")&&b.push({name:Globalize.translate("ButtonInstantMix"),id:"instantmix",ironIcon:"shuffle"}),b.push({name:Globalize.translate("ButtonOpen"),id:"open",ironIcon:"folder-open"}),r.showPlayOptions!==!1&&(MediaController.canPlayByAttributes(c,d,m,p)&&(b.push({name:Globalize.translate("ButtonPlay"),id:"play",ironIcon:"play-arrow"}),-1!=l.indexOf("playfromhere")&&b.push({name:Globalize.translate("ButtonPlayAllFromHere"),id:"playallfromhere",ironIcon:"play-arrow"})),"Video"==d&&AppInfo.supportsExternalPlayers&&e.enableExternalPlayers()&&b.push({name:Globalize.translate("ButtonPlayExternalPlayer"),id:"externalplayer",ironIcon:"airplay"}),u&&"Audio"!=d&&b.push({name:Globalize.translate("ButtonResume"),id:"resume",ironIcon:"play-arrow"}),-1!=l.indexOf("trailer")&&b.push({name:Globalize.translate("ButtonPlayTrailer"),id:"trailer",ironIcon:"play-arrow"})),MediaController.canQueueMediaType(d,c)&&(b.push({name:Globalize.translate("ButtonQueue"),id:"queue",ironIcon:"playlist-add"}),-1!=l.indexOf("queuefromhere")&&b.push({name:Globalize.translate("ButtonQueueAllFromHere"),id:"queueallfromhere",ironIcon:"playlist-add"})),-1!=l.indexOf("shuffle")&&b.push({name:Globalize.translate("ButtonShuffle"),id:"shuffle",ironIcon:"shuffle"}),-1!=l.indexOf("record")&&b.push({name:Globalize.translate("ButtonRecord"),id:"record",ironIcon:"videocam"}),-1!=l.indexOf("removefromcollection")&&b.push({name:Globalize.translate("ButtonRemoveFromCollection"),id:"removefromcollection",ironIcon:"remove"}),-1!=l.indexOf("removefromplaylist")&&b.push({name:Globalize.translate("ButtonRemoveFromPlaylist"),id:"removefromplaylist",ironIcon:"remove"}),v.Policy.EnablePublicSharing&&b.push({name:Globalize.translate("ButtonShare"),id:"share",ironIcon:"share"}),-1!=l.indexOf("sync")&&b.push({name:Globalize.translate("ButtonSync"),id:"sync",ironIcon:"sync"}),g&&b.push({name:Globalize.translate("ButtonViewAlbum"),id:"album",ironIcon:"album"}),h&&b.push({name:Globalize.translate("ButtonViewArtist"),id:"artist",ironIcon:"person"});var y=t.getAttribute("data-href")||t.href;if(!y){var I=t.getElementsByTagName("a");I.length&&(y=I[0].href)}require(["actionsheet"],function(e){e.show({items:b,positionTo:i,callback:function(e){switch(e){case"addtocollection":require(["collectioneditor"],function(e){(new e).show([o])});break;case"playlist":require(["playlistManager"],function(e){e.showPanel([o])});break;case"delete":a.deleteItems([o]);break;case"download":var r=ApiClient.getUrl("Items/"+o+"/Download",{api_key:ApiClient.accessToken()});window.location.href=r;break;case"edit":a.editMetadata(o);break;case"refresh":ApiClient.refreshItem(o,{Recursive:!0,ImageRefreshMode:"FullRefresh",MetadataRefreshMode:"FullRefresh",ReplaceAllImages:!1,ReplaceAllMetadata:!0});break;case"instantmix":MediaController.instantMix(o);break;case"shuffle":MediaController.shuffle(o);break;case"open":Dashboard.navigate(y);break;case"album":Dashboard.navigate("itemdetails.html?id="+g);break;case"record":require(["components/recordingcreator/recordingcreator"],function(e){e.show(o)});break;case"artist":Dashboard.navigate("itemdetails.html?context=music&id="+h);break;case"play":MediaController.play(o);break;case"playallfromhere":E(f,n(t).parents(".itemsContainer"),"play");break;case"queue":MediaController.queue(o);break;case"trailer":ApiClient.getLocalTrailers(Dashboard.getCurrentUserId(),o).then(function(e){MediaController.play({items:e})});break;case"resume":MediaController.play({ids:[o],startPositionTicks:u});break;case"queueallfromhere":E(f,n(t).parents(".itemsContainer"),"queue");break;case"sync":require(["syncDialog"],function(e){e.showMenu({items:[{Id:o}]})});break;case"editsubtitles":a.editSubtitles(o);break;case"editimages":a.editImages(o);break;case"externalplayer":a.playInExternalPlayer(o);break;case"share":require(["sharingmanager"],function(){SharingManager.showMenu(Dashboard.getCurrentUserId(),o)});break;case"removefromplaylist":n(t).parents(".itemsContainer").trigger("removefromplaylist",[s]);break;case"removefromcollection":n(t).parents(".collectionItems").trigger("removefromcollection",[o])}}})})})}function p(e,t){var r=e.target;r.classList.contains("card")||r.classList.contains("listItem")||(r=n(r).parents(".listItem,.card")[0]);var i=r.getAttribute("data-itemid"),o=r.getAttribute("data-itemtype"),s="true"==r.getAttribute("data-isfolder"),l=r.getAttribute("data-mediatype"),c=parseInt(r.getAttribute("data-positionticks"));return("MusicAlbum"==o||"MusicArtist"==o||"MusicGenre"==o||"Playlist"==o)&&(s=!0),"Program"==o&&(i=r.getAttribute("data-channelid")),a.showPlayMenu(t,i,o,s,l,c),e.preventDefault(),!1}function f(e){for(;null!=e;){var t=e.tagName||"";return"A"==t||-1!=t.indexOf("BUTTON")||-1!=t.indexOf("INPUT")?!0:!1}return!1}function g(e){var t=v(e.target,"cardOverlayPlayButton");if(t)return p(e,t);var a=v(e.target,"listviewMenuButton")||v(e.target,"cardOverlayMoreButton");if(a)return m(a,{}),e.preventDefault(),!1;var n=v(e.target,"btnUserItemRating");if(n)return e.stopPropagation(),e.preventDefault(),!1;var r=v(e.target,"card");if(r){var i=r.querySelector(".itemSelectionPanel");if(i)return S(e,i);if(r.classList.contains("groupedCard"))return h(e,r)}}function h(e,t){var r=t.getAttribute("data-itemid"),i=t.getAttribute("data-context"),o=Dashboard.getCurrentUserId(),s={Limit:parseInt(n(".playedIndicator",t).html()||"10"),Fields:"PrimaryImageAspectRatio,DateCreated",ParentId:r,GroupItems:!1},l=e.target;return f(l)?void 0:(ApiClient.getJSON(ApiClient.getUrl("Users/"+o+"/Items/Latest",s)).then(function(e){if(1==e.length)return void Dashboard.navigate(a.getHref(e[0],i));var t="itemdetails.html?id="+r;i&&(t+="&context="+i),Dashboard.navigate(t)}),e.stopPropagation(),e.preventDefault(),!1)}function v(e,t){for(;!e.classList||!e.classList.contains(t);)if(e=e.parentNode,!e)return null;return e}function b(e){if(e.classList.contains("itemsContainer"))return void y(e);for(var t=e.querySelectorAll(".itemsContainer"),a=0,n=t.length;n>a;a++)y(t[a])}function y(e){a.allowSwipe(e)&&(e.classList.contains("hasTapHold")||(require(["hammer"],function(t){var a=new t.Manager(e),n=new t.Press({time:500});a.add(n),e.classList.add("hasTapHold"),a.on("press",A),a.on("pressup",P)}),I(e)))}function I(e){var a=n(e).parents(".page")[0];if(a&&!(a.classList.contains("homePage")||a.classList.contains("itemDetailPage")||a.classList.contains("liveTvPage"))){var r="8";t.getItem("tapholdhelp")!=r&&(t.setItem("tapholdhelp",r),Dashboard.alert({message:Globalize.translate("TryMultiSelectMessage"),title:Globalize.translate("HeaderTryMultiSelect")}))}}function C(e){return e.preventDefault(),e.stopPropagation(),!1}function A(e){var t=v(e.target,"card");return t?(w(t),e.stopPropagation&&e.stopPropagation(),e.preventDefault(),!1):(e.preventDefault(),e.stopPropagation(),!1)}function P(e){var t=v(e.target,"itemSelectionPanel");if(t){if(!v(e.target,"chkItemSelect")){var a=t.querySelector(".chkItemSelect");a&&(a.checked=!a.checked)}return e.preventDefault(),!1}}function S(e,t){if(!v(e.target,"chkItemSelect")){var a=t.querySelector(".chkItemSelect");if(a){var n=!a.checked;a.checked=n,q(a,n)}}return e.preventDefault(),e.stopPropagation(),!1}function M(){q(this,this.checked)}function k(e){var t=e.querySelector(".itemSelectionPanel");if(!t){t=document.createElement("div"),t.classList.add("itemSelectionPanel"),e.querySelector(".cardContent").appendChild(t);var a=document.createElement("paper-checkbox");a.classList.add("chkItemSelect"),n(a).on("change",M),t.appendChild(a)}}function L(){var e=document.querySelector(".selectionCommandsPanel");if(!e){e=document.createElement("div"),e.classList.add("selectionCommandsPanel"),document.body.appendChild(e);var t="";t+='<div style="float:left;">',t+='<paper-icon-button class="btnCloseSelectionPanel" icon="close"></paper-icon-button>',t+='<span class="itemSelectionCount"></span>',t+="</div>",t+='<paper-icon-button class="btnSelectionPanelOptions" icon="more-vert" style="margin-left:auto;"></paper-icon-button>',e.innerHTML=t,e.querySelector(".btnCloseSelectionPanel").addEventListener("click",D);var a=e.querySelector(".btnSelectionPanelOptions");a.addEventListener("click",T),browserInfo.mobile||x(a,1)}}function x(e,t){var a=[{transform:"translate3d(0, 0, 0)",offset:0},{transform:"translate3d(-10px, 0, 0)",offset:.1},{transform:"translate3d(10px, 0, 0)",offset:.2},{transform:"translate3d(-10px, 0, 0)",offset:.3},{transform:"translate3d(10px, 0, 0)",offset:.4},{transform:"translate3d(-10px, 0, 0)",offset:.5},{transform:"translate3d(10px, 0, 0)",offset:.6},{transform:"translate3d(-10px, 0, 0)",offset:.7},{transform:"translate3d(10px, 0, 0)",offset:.8},{transform:"translate3d(-10px, 0, 0)",offset:.9},{transform:"translate3d(0, 0, 0)",offset:1}],n={duration:900,iterations:t};return e.animate(a,n)}function w(e){require(["paper-checkbox"],function(){for(var t=document.querySelectorAll(".card"),a=0,n=t.length;n>a;a++)k(t[a]);L(),e.querySelector(".chkItemSelect").checked=!0,q(e,!0)})}function D(){var e=document.querySelector(".selectionCommandsPanel");if(e){e.parentNode.removeChild(e),j=[];for(var t=document.querySelectorAll(".itemSelectionPanel"),a=0,n=t.length;n>a;a++)t[a].parentNode.removeChild(t[a])}}function q(e,t){var a=v(e,"card").getAttribute("data-itemid");if(t){var n=j.filter(function(e){return e==a});n.length||j.push(a)}else j=j.filter(function(e){return e!=a});if(j.length){var r=document.querySelector(".itemSelectionCount");r&&(r.innerHTML=j.length)}else D()}function T(e){Dashboard.getCurrentUser().then(function(t){var r=[];r.push({name:Globalize.translate("ButtonAddToCollection"),id:"addtocollection",ironIcon:"add"}),r.push({name:Globalize.translate("ButtonAddToPlaylist"),id:"playlist",ironIcon:"playlist-add"}),t.Policy.EnableContentDeletion&&r.push({name:Globalize.translate("ButtonDelete"),id:"delete",ironIcon:"delete"}),t.Policy.EnableContentDownloading&&AppInfo.supportsDownloading,r.push({name:Globalize.translate("HeaderGroupVersions"),id:"groupvideos",ironIcon:"call-merge"}),r.push({name:Globalize.translate("ButtonRefresh"),id:"refresh",ironIcon:"refresh"}),r.push({name:Globalize.translate("ButtonSync"),id:"sync",ironIcon:"sync"}),require(["actionsheet"],function(t){t.show({items:r,positionTo:e.target,callback:function(e){var t=j.slice(0);switch(e){case"addtocollection":require(["collectioneditor"],function(e){(new e).show(t)}),D();break;case"playlist":require(["playlistManager"],function(e){e.showPanel(t),D()});break;case"delete":a.deleteItems(t).then(function(){Dashboard.navigate("home.html")}),D();break;case"groupvideos":B(n(n.mobile.activePage)[0],t);break;case"refresh":t.map(function(e){ApiClient.refreshItem(e,{Recursive:!0,ImageRefreshMode:"FullRefresh",MetadataRefreshMode:"FullRefresh",ReplaceAllImages:!1,ReplaceAllMetadata:!0})}),D();break;case"sync":require(["syncDialog"],function(e){e.showMenu({items:t.map(function(e){return{Id:e}})})}),D()}}})})})}function B(e,t){if(t.length<2)return void Dashboard.alert({message:Globalize.translate("MessagePleaseSelectTwoItems"),title:Globalize.translate("HeaderError")});var a=Globalize.translate("MessageTheSelectedItemsWillBeGrouped");require(["confirm"],function(r){r(a,Globalize.translate("HeaderGroupVersions")).then(function(){Dashboard.showLoadingMsg(),ApiClient.ajax({type:"POST",url:ApiClient.getUrl("Videos/MergeVersions",{Ids:t.join(",")})}).then(function(){Dashboard.hideLoadingMsg(),D(),n(".itemsContainer",e).trigger("needsrefresh")})})})}function G(e){var t=v(e.target,"itemWithAction");if(t){var a=t.getAttribute("data-action"),r=t;if(a)for(;!r.getAttribute("data-itemid");)r=r.parentNode;var i,o,s=r.getAttribute("data-itemid");return"play"==a?MediaController.play(s):"playallfromhere"==a?(i=r.getAttribute("data-index"),o=n(t).parents(".itemsContainer"),E(i,o,"play")):"instantmix"==a&&MediaController.instantMix(s),e.stopPropagation(),e.preventDefault(),!1}}function E(e,t,a){var r=n(".mediaItem",t).get().map(function(e){for(var t=e,a=t.getAttribute("data-itemid");!a;)t=t.parentNode,a=t.getAttribute("data-itemid");return a});r=r.slice(e),ApiClient.getItems(Dashboard.getCurrentUserId(),{Ids:r.join(","),Fields:"MediaSources,Chapters",Limit:100}).then(function(e){MediaController[a]({items:e.Items})})}function O(e){var t=window.ApiClient;t&&t.getCurrentUserId()&&Dashboard.getCurrentUser().then(function(t){var r={SupportsSync:!0};a.enableSync(r,t)?n(".categorySyncButton",e).removeClass("hide"):n(".categorySyncButton",e).addClass("hide")})}function z(e,t){var a=t.getAttribute("data-category"),n=LibraryMenu.getTopParentId();require(["syncDialog"],function(e){e.showMenu({ParentId:n,Category:a})})}function U(e,t){if(t.Played){var r=e.querySelector(".playedIndicator");r||(r=document.createElement("div"),r.classList.add("playedIndicator"),e.querySelector(".cardContent").appendChild(r)),r.innerHTML='<iron-icon icon="check"></iron-icon>'}else if(t.UnplayedItemCount){var r=e.querySelector(".playedIndicator");r||(r=document.createElement("div"),r.classList.add("playedIndicator"),e.querySelector(".cardContent").appendChild(r)),r.innerHTML=t.UnplayedItemCount}var i=a.getItemProgressBarHtml(t);if(i){var o=e.querySelector(".cardProgress");o||(o=document.createElement("div"),o.classList.add("cardProgress"),n(".cardFooter",e).append(o)),o.innerHTML=i}else n(".cardProgress",e).remove()}function R(e){n(document.querySelectorAll("*[data-itemid='"+e.ItemId+"']")).each(function(){var t=this.getAttribute("data-mediatype");"Video"==t&&(this.setAttribute("data-positionticks",e.PlaybackPositionTicks||0),n(this).hasClass("card")&&U(this,e))})}function H(e,t){var a=t;if("UserDataChanged"===a.MessageType&&a.Data.UserId==Dashboard.getCurrentUserId())for(var n=0,r=a.Data.UserDataList.length;r>n;n++)R(a.Data.UserDataList[n])}function N(e){Events.off(e,"websocketmessage",H),Events.on(e,"websocketmessage",H)}function F(){n(".hasrefreshtime").removeClass("hasrefreshtime").removeAttr("data-lastrefresh")}var V;a.createCardMenus=function(e){function t(e){if(e=e.querySelector("a"),!e.querySelector(".itemSelectionPanel")){var t=e.querySelector(".cardOverlayTarget");t||(t=document.createElement("div"),t.classList.add("hide"),t.classList.add("cardOverlayTarget"),v(e,"cardContent").appendChild(t));for(var a=e;a&&!a.getAttribute("data-itemid");)a=a.parentNode;var r=a.getAttribute("data-itemid"),i=a.getAttribute("data-commands").split(","),u=ApiClient.getItem(Dashboard.getCurrentUserId(),r),m=Dashboard.getCurrentUser();Promise.all([u,m]).then(function(a){for(var r=a[0],o=a[1],u=e;!u.classList.contains("card");)u=u.parentNode;t.innerHTML=s(r,o,u,i),n(".btnPlayItem",t).on("click",c),n(".btnPlayTrailer",t).on("click",l),n(".btnMoreCommands",t).on("click",d)}),n(t).show(),o(t)}}function a(e){var a=e.target;if(a.classList.contains("cardImage")){if(m===!0)return void(m=!1);for(V&&(clearTimeout(V),V=null);!a.classList.contains("card");)a=a.parentNode;V=setTimeout(function(){t(a)},1200)}}function i(){m=!0}var m=!1;e.removeEventListener("click",g),e.addEventListener("click",g),AppInfo.isTouchPreferred?(e.removeEventListener("contextmenu",C),e.addEventListener("contextmenu",C)):(e.removeEventListener("contextmenu",u),e.addEventListener("contextmenu",u),e.removeEventListener("mouseenter",a),e.addEventListener("mouseenter",a,!0),e.removeEventListener("mouseleave",r),e.addEventListener("mouseleave",r,!0),e.removeEventListener("touchstart",i),e.addEventListener("touchstart",i)),b(e)},n.fn.createCardMenus=function(e){for(var t=0,n=this.length;n>t;t++){var r=this[t];a.createCardMenus(r,e)}return this};var j=[];pageClassOn("pageinit","libraryPage",function(){var e=this;e.addEventListener("click",G);for(var t=e.querySelectorAll(".itemsContainer:not(.noautoinit)"),a=0,r=t.length;r>a;a++)n(t[a]).createCardMenus();n(".categorySyncButton",e).on("click",function(){z(e,this)})}),pageClassOn("pageshow","libraryPage",function(){var e=this;Dashboard.isServerlessPage()||O(e)}),pageClassOn("pagebeforehide","libraryPage",function(){D()}),window.ApiClient&&N(window.ApiClient),Events.on(ConnectionManager,"apiclientcreated",function(e,t){N(t)}),Events.on(ConnectionManager,"localusersignedin",F),Events.on(ConnectionManager,"localusersignedout",F)});