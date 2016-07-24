define(["jQuery","paper-icon-button-light"],function(e){function n(e,n){var t=Globalize.translate("DeleteUserConfirmation");require(["confirm"],function(a){a(t,Globalize.translate("DeleteUser")).then(function(){Dashboard.showLoadingMsg(),ApiClient.deleteUser(n).then(function(){u(e)})})})}function t(t){var a=e(t).parents(".card")[0],i=e(a).parents(".page")[0],o=a.getAttribute("data-userid"),r=[];r.push({name:Globalize.translate("ButtonOpen"),id:"open",ironIcon:"mode-edit"}),r.push({name:Globalize.translate("ButtonLibraryAccess"),id:"access",ironIcon:"lock"}),r.push({name:Globalize.translate("ButtonParentalControl"),id:"parentalcontrol",ironIcon:"person"}),r.push({name:Globalize.translate("ButtonDelete"),id:"delete",ironIcon:"delete"}),require(["actionsheet"],function(e){e.show({items:r,positionTo:a,callback:function(e){switch(e){case"open":Dashboard.navigate("useredit.html?userid="+o);break;case"access":Dashboard.navigate("userlibraryaccess.html?userid="+o);break;case"parentalcontrol":Dashboard.navigate("userparentalcontrol.html?userid="+o);break;case"delete":n(i,o)}}})})}function a(e,n){var t="",a="card squareCard bottomPaddedCard";e.Policy.IsDisabled&&(a+=" grayscale"),t+="<div data-userid='"+e.Id+"' class='"+a+"'>",t+='<div class="cardBox visualCardBox">',t+='<div class="cardScalable">',t+='<div class="cardPadder"></div>';var i="useredit.html?userId="+e.Id;t+='<a class="cardContent" href="'+i+'">';var o;o=e.PrimaryImageTag?ApiClient.getUserImageUrl(e.Id,{width:300,tag:e.PrimaryImageTag,type:"Primary"}):"css/images/userflyoutdefault.png";var r="cardImage";return e.Policy.IsDisabled&&(r+=" disabledUser"),t+='<div class="'+r+'" style="background-image:url(\''+o+"');\">",e.ConnectUserId&&n&&(t+='<div class="playedIndicator" title="'+Globalize.translate("TooltipLinkedToEmbyConnect")+'"><i class="md-icon">cloud</i></div>'),t+="</div>",t+="</a>",t+="</div>",t+='<div class="cardFooter">',t+='<div class="cardText" style="text-align:right; float:right;padding:0;">',t+='<button type="button" is="paper-icon-button-light" class="btnUserMenu autoSize"><i class="md-icon">'+AppInfo.moreIcon.replace("-","_")+"</i></button>",t+="</div>",t+='<div class="cardText" style="padding-top:10px;padding-bottom:10px;">',t+=e.Name,t+="</div>",t+="</div>",t+="</div>",t+="</div>"}function i(e,n){var t="";return t+=e.map(function(e){return a(e,n)}).join("")}function o(n,a,o){var r=i(a,o);n.html(r),e(".btnUserMenu",n).on("click",function(){t(this)})}function r(n,t){o(e(".localUsers",n),t.filter(function(e){return"Guest"!=e.ConnectLinkType}),!0),o(e(".connectUsers",n),t.filter(function(e){return"Guest"==e.ConnectLinkType}))}function s(n){var t=[];t.push({name:Globalize.translate("ButtonCancel"),id:"delete",ironIcon:"delete"}),require(["actionsheet"],function(a){var i=e(n).parents(".card"),o=e(n).parents(".page"),r=i.attr("data-id");a.show({items:t,positionTo:i,callback:function(e){switch(e){case"delete":l(o,r)}}})})}function c(e){var n="",t="card squareCard bottomPaddedCard";n+="<div data-id='"+e.Id+"' class='"+t+"'>",n+='<div class="cardBox visualCardBox">',n+='<div class="cardScalable">',n+='<div class="cardPadder"></div>';var a="#";n+='<a class="cardContent" href="'+a+'">';var i=e.ImageUrl||"css/images/userflyoutdefault.png";return n+='<div class="cardImage" style="background-image:url(\''+i+"');\">",n+="</div>",n+="</a>",n+="</div>",n+='<div class="cardFooter">',n+='<div class="cardText" style="text-align:right; float:right;padding:0;">',n+='<button type="button" is="paper-icon-button-light" class="btnUserMenu"><iron-icon icon="'+AppInfo.moreIcon+'"></iron-icon></button>',n+="</div>",n+='<div class="cardText" style="padding-top:10px;padding-bottom:10px;">',n+=e.UserName,n+="</div>",n+="</div>",n+="</div>",n+="</div>"}function d(n,t){t.length?e(".sectionPendingGuests",n).show():e(".sectionPendingGuests",n).hide();var a=t.map(c).join(""),i=e(".pending",n).html(a);e(".btnUserMenu",i).on("click",function(){s(this)})}function l(e,n){Dashboard.showLoadingMsg(),ApiClient.ajax({type:"DELETE",url:ApiClient.getUrl("Connect/Pending",{Id:n})}).then(function(){u(e)})}function u(e){Dashboard.showLoadingMsg(),ApiClient.getUsers().then(function(n){r(e,n),Dashboard.hideLoadingMsg()}),ApiClient.getJSON(ApiClient.getUrl("Connect/Pending")).then(function(n){d(e,n)})}function g(e){require(["components/guestinviter/connectlink"],function(n){n.show().then(function(){u(e)})})}function p(e){Dashboard.getCurrentUser().then(function(n){return n.ConnectUserId?void require(["components/guestinviter/guestinviter"],function(n){n.show().then(function(){u(e)})}):void g(e,n.Id)})}e(document).on("pageinit","#userProfilesPage",function(){var n=this;e(".btnInvite",n).on("click",function(){p(n)}),e(".btnAddUser",n).on("click",function(){Dashboard.navigate("usernew.html")})}).on("pagebeforeshow","#userProfilesPage",function(){var e=this;u(e)})});