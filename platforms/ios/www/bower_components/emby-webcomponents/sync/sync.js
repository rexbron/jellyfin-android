define(["apphost","globalize","connectionManager","layoutManager","shell","focusManager","scrollHelper","appSettings","paper-icon-button-light","formDialogStyle"],function(e,t,n,i,r,a,o,s){function l(e,n,i,r,a,o){if(!i)throw new Error("userId cannot be null");if(!r)throw new Error("syncOptions cannot be null");if(!a)throw new Error("form cannot be null");var s=a.querySelector("#selectSyncTarget"),l=s?s.value:null;if(!l)return require(["toast"],function(e){e(t.translate("sharedcomponents#PleaseSelectDeviceToSyncTo"))}),!1;var c={userId:i,TargetId:l,ParentId:r.ParentId,Category:r.Category};return u(c,a),r.items&&r.items.length&&(c.ItemIds=(r.items||[]).map(function(e){return e.Id||e}).join(",")),n.ajax({type:"POST",url:n.getUrl("Sync/Jobs"),data:JSON.stringify(c),contentType:"application/json",dataType:"json"}).then(function(){o.close(e),require(["toast"],function(e){var i=t.translate(l==n.deviceId()?"sharedcomponents#DownloadScheduled":"sharedcomponents#SyncJobCreated");e(i)})}),!0}function c(e,n,i,r){if(!n)throw new Error("userId cannot be null");if(!r)throw new Error("syncOptions cannot be null");if(!i)throw new Error("targetId cannot be null");var a={userId:n,TargetId:i,ParentId:r.ParentId,Category:r.Category,Quality:r.Quality,Bitrate:r.Bitrate};return r.items&&r.items.length&&(a.ItemIds=(r.items||[]).map(function(e){return e.Id||e}).join(",")),e.ajax({type:"POST",url:e.getUrl("Sync/Jobs"),data:JSON.stringify(a),contentType:"application/json",dataType:"json"}).then(function(){require(["toast"],function(n){var r=t.translate(i==e.deviceId()?"sharedcomponents#DownloadScheduled":"sharedcomponents#SyncJobCreated");n(r)})})}function u(e,t){var n=t.querySelector("#txtBitrate"),i=n?n.value:null;i&&(i=1e6*parseFloat(i)),e.Bitrate=i;var r=t.querySelector("#txtSyncJobName");r&&(e.Name=r.value);var a=t.querySelector("#selectQuality");a&&(e.Quality=a.value);var o=t.querySelector("#selectProfile");o&&(e.Profile=o.value);var s=t.querySelector("#txtItemLimit");s&&(e.ItemLimit=s.value||null);var l=t.querySelector("#chkSyncNewContent");l&&(e.SyncNewContent=l.checked);var c=t.querySelector("#chkUnwatchedOnly");c&&(e.UnwatchedOnly=c.checked)}function d(t){return new Promise(function(n){require(["emby-checkbox","emby-input","emby-select"],function(){e.appInfo().then(function(e){y(t,e,n)})})})}function p(e){return r.openUrl(this.href),e.preventDefault(),!1}function y(e,n,i){var r=e.elem,o=e.dialogOptions,s=o.Targets,l="",c=e.isLocalSync?" hide":"";(e.showName||-1!=o.Options.indexOf("Name"))&&(l+='<div class="inputContainer'+c+'">',l+='<input is="emby-input" type="text" id="txtSyncJobName" class="txtSyncJobName" required="required" label="'+t.translate("sharedcomponents#LabelSyncJobName")+'"/>',l+="</div>"),e.readOnlySyncTarget?(l+='<div class="inputContainer'+c+'">',l+='<input is="emby-input" type="text" id="selectSyncTarget" readonly label="'+t.translate("sharedcomponents#LabelSyncTo")+'"/>',l+="</div>"):(l+='<div class="selectContainer'+c+'">',l+='<select is="emby-select" id="selectSyncTarget" required="required" label="'+t.translate("sharedcomponents#LabelSyncTo")+'">',l+=s.map(function(e){var t=e.Id==n.deviceId,i=t?' selected="selected"':"";return"<option"+i+' value="'+e.Id+'">'+e.Name+"</option>"}).join(""),l+="</select>",s.length||(l+='<div class="fieldDescription">'+t.translate("sharedcomponents#LabelSyncNoTargetsHelp")+"</div>",l+='<div class="fieldDescription"><a class="lnkLearnMore" href="https://github.com/MediaBrowser/Wiki/wiki/Sync" target="_blank">'+t.translate("sharedcomponents#LearnMore")+"</a></div>"),l+="</div>"),l+='<div class="fldProfile selectContainer hide">',l+='<select is="emby-select" id="selectProfile" label="'+t.translate("sharedcomponents#LabelProfile")+'">',l+="</select>",l+='<div class="fieldDescription profileDescription"></div>',l+="</div>",l+='<div class="fldQuality selectContainer hide">',l+='<select is="emby-select" id="selectQuality" data-mini="true" required="required" label="'+t.translate("sharedcomponents#LabelQuality")+'">',l+="</select>",l+='<div class="fieldDescription qualityDescription"></div>',l+="</div>",l+='<div class="fldBitrate inputContainer hide">',l+='<input is="emby-input" type="number" step=".1" min=".1" id="txtBitrate" label="'+t.translate("sharedcomponents#LabelBitrateMbps")+'"/>',l+="</div>",-1!=o.Options.indexOf("UnwatchedOnly")&&(l+='<div class="checkboxContainer checkboxContainer-withDescription">',l+="<label>",l+='<input is="emby-checkbox" type="checkbox" id="chkUnwatchedOnly"/>',l+="<span>"+t.translate("sharedcomponents#SyncUnwatchedVideosOnly")+"</span>",l+="</label>",l+='<div class="fieldDescription checkboxFieldDescription">'+t.translate("sharedcomponents#SyncUnwatchedVideosOnlyHelp")+"</div>",l+="</div>"),-1!=o.Options.indexOf("SyncNewContent")&&(l+='<div class="checkboxContainer checkboxContainer-withDescription">',l+="<label>",l+='<input is="emby-checkbox" type="checkbox" id="chkSyncNewContent"/>',l+="<span>"+t.translate("sharedcomponents#AutomaticallySyncNewContent")+"</span>",l+="</label>",l+='<div class="fieldDescription checkboxFieldDescription">'+t.translate("sharedcomponents#AutomaticallySyncNewContentHelp")+"</div>",l+="</div>"),-1!=o.Options.indexOf("ItemLimit")&&(l+='<div class="inputContainer">',l+='<input is="emby-input" type="number" step="1" min="1" id="txtItemLimit" label="'+t.translate("sharedcomponents#LabelItemLimit")+'"/>',l+='<div class="fieldDescription">'+t.translate("sharedcomponents#LabelItemLimitHelp")+"</div>",l+="</div>"),r.innerHTML=l;var u=r.querySelector("#selectSyncTarget");u&&(u.addEventListener("change",function(){I(r,this.value,e.dialogOptionsFn).then(i)}),u.dispatchEvent(new CustomEvent("change",{bubbles:!0})));var d=r.querySelector("#selectProfile");d&&(d.addEventListener("change",function(){S(r,this.value)}),d.dispatchEvent(new CustomEvent("change",{bubbles:!0})));var y=r.querySelector("#selectQuality");y&&(y.addEventListener("change",function(){g(r,this.value)}),y.dispatchEvent(new CustomEvent("change",{bubbles:!0})));var m=r.querySelector(".lnkLearnMore");m&&m.addEventListener("click",p),setTimeout(function(){a.autoFocus(r)},100)}function m(e){return new Promise(function(t,n){require(["registrationservices","dialogHelper","formDialogStyle"],function(i,r){i.validateFeature("sync").then(function(){f(r,e).then(t,n)},n)})})}function v(e){if(!e.isLocalSync)return!1;var t=(e.items||[])[0]||{};return"Audio"==t.Type?!0:"MusicAlbum"==t.Type?!0:"MusicArtist"==t.Type?!0:"MusicGenre"==t.Type?!0:!1}function f(e,r){var a=n.getApiClient(r.serverId),u=a.getCurrentUserId();if(v(r))return c(a,u,a.deviceId(),{items:r.items,Quality:"custom",Bitrate:s.maxStaticMusicBitrate()});var y={UserId:u,ItemIds:(r.items||[]).map(function(e){return e.Id||e}).join(","),ParentId:r.ParentId,Category:r.Category};return a.getJSON(a.getUrl("Sync/Options",y)).then(function(n){L=n;var s={removeOnClose:!0,scrollY:!1,autoFocus:!1};s.size=i.tv?"fullscreen":"small";var c=e.createDialog(s);c.classList.add("formDialog");var m="";m+='<div class="formDialogHeader">',m+='<button is="paper-icon-button-light" class="btnCancel autoSize" tabindex="-1"><i class="md-icon">&#xE5C4;</i></button>',m+='<div class="formDialogHeaderTitle">',m+=t.translate("sharedcomponents#Sync"),m+="</div>",m+='<a href="https://github.com/MediaBrowser/Wiki/wiki/Sync" target="_blank" class="clearLink lnkHelp" style="margin-top:0;display:inline-block;vertical-align:middle;margin-left:auto;"><button is="emby-button" type="button" class="mini"><i class="md-icon">info</i><span>'+t.translate("sharedcomponents#Help")+"</span></button></a>",m+="</div>",m+='<div class="formDialogContent smoothScrollY" style="padding-top:2em;">',m+='<div class="dialogContentInner dialog-content-centered">',m+='<form class="formSubmitSyncRequest" style="margin: auto;">',m+='<div class="formFields"></div>',m+="<p>",m+='<button is="emby-button" type="submit" class="raised submit block"><i class="md-icon">sync</i><span>'+t.translate("sharedcomponents#Sync")+"</span></button>",m+="</p>",m+="</form>",m+="</div>",m+="</div>",c.innerHTML=m,c.querySelector(".lnkHelp").addEventListener("click",p),document.body.appendChild(c);var v=!1;c.querySelector("form").addEventListener("submit",function(t){return v=l(c,a,u,r,this,e),t.preventDefault(),!1}),c.querySelector(".btnCancel").addEventListener("click",function(){e.close(c)}),i.tv&&o.centerFocus.on(c.querySelector(".formDialogContent"),!1);var f=e.open(c);return d({elem:c.querySelector(".formFields"),dialogOptions:n,dialogOptionsFn:h(a,y),isLocalSync:r.isLocalSync}),f.then(function(){return v?Promise.resolve():Promise.reject()})})}function h(e,t){return function(n){return t.TargetId=n,e.getJSON(e.getUrl("Sync/Options",t))}}function b(e,t){var n=e.querySelector(".fldQuality"),i=e.querySelector("#selectQuality");t?(n&&n.classList.remove("hide"),i&&i.setAttribute("required","required")):(n&&n.classList.add("hide"),i&&i.removeAttribute("required"))}function S(e,t){var n=L||{},i=(n.ProfileOptions||[]).filter(function(e){return e.Id==t})[0],r=n.QualityOptions||[];i?(e.querySelector(".profileDescription").innerHTML=i.Description||"",b(e,r.length>0&&i.EnableQualityOptions&&-1!=n.Options.indexOf("Quality"))):(e.querySelector(".profileDescription").innerHTML="",b(e,r.length>0&&-1!=n.Options.indexOf("Quality")))}function g(e,t){var n=L||{},i=(n.QualityOptions||[]).filter(function(e){return e.Id==t})[0],r=e.querySelector(".qualityDescription");r.innerHTML=i?i.Description||"":"";var a=e.querySelector(".fldBitrate"),o=e.querySelector("#txtBitrate");"custom"==t?(a&&a.classList.remove("hide"),o&&o.setAttribute("required","required")):(a&&a.classList.add("hide"),o&&o.removeAttribute("required"))}function q(e,t){L=t;var n=e.querySelector(".fldProfile"),i=e.querySelector("#selectProfile");t.ProfileOptions.length&&-1!=t.Options.indexOf("Profile")?(n&&n.classList.remove("hide"),i&&i.setAttribute("required","required")):(n&&n.classList.add("hide"),i&&i.removeAttribute("required")),b(e,t.QualityOptions.length>0),i&&(i.innerHTML=t.ProfileOptions.map(function(e){var t=e.IsDefault?' selected="selected"':"";return'<option value="'+e.Id+'"'+t+">"+e.Name+"</option>"}).join(""),i.dispatchEvent(new CustomEvent("change",{bubbles:!0})));var r=e.querySelector("#selectQuality");r&&(r.innerHTML=t.QualityOptions.map(function(e){var t=e.IsDefault?' selected="selected"':"";return'<option value="'+e.Id+'"'+t+">"+e.Name+"</option>"}).join(""),r.dispatchEvent(new CustomEvent("change",{bubbles:!0})))}function I(e,t,n){return n(t).then(function(t){return q(e,t)})}var L;return{showMenu:m,renderForm:d,setJobValues:u}});