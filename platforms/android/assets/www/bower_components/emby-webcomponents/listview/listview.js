define(["itemHelper","mediaInfo","indicators","connectionManager","layoutManager","globalize","userdataButtons","apphost","css!./listview"],function(e,a,t,i,r,s,n,l){function d(e,a){if("disc"==a.index)return null==e.ParentIndexNumber?"":s.translate("sharedcomponents#ValueDiscNumber",e.ParentIndexNumber);var t,i,r=(a.sortBy||"").toLowerCase();return 0==r.indexOf("sortname")?"Episode"==e.Type?"":(i=(e.SortName||e.Name||"?")[0].toUpperCase(),t=i.charCodeAt(0),65>t||t>90?"#":i.toUpperCase()):0==r.indexOf("officialrating")?e.OfficialRating||s.translate("sharedcomponents#Unrated"):0==r.indexOf("communityrating")?null==e.CommunityRating?s.translate("sharedcomponents#Unrated"):Math.floor(e.CommunityRating):0==r.indexOf("criticrating")?null==e.CriticRating?s.translate("sharedcomponents#Unrated"):Math.floor(e.CriticRating):0==r.indexOf("metascore")?null==e.Metascore?s.translate("sharedcomponents#Unrated"):Math.floor(e.Metascore):0==r.indexOf("albumartist")&&e.AlbumArtist?(i=e.AlbumArtist[0].toUpperCase(),t=i.charCodeAt(0),65>t||t>90?"#":i.toUpperCase()):""}function o(e,a){var t=i.getApiClient(e.ServerId),r={width:a,type:"Primary"};return e.ImageTags&&e.ImageTags.Primary?(r.tag=e.ImageTags.Primary,t.getScaledImageUrl(e.Id,r)):e.AlbumId&&e.AlbumPrimaryImageTag?(r.tag=e.AlbumPrimaryImageTag,t.getScaledImageUrl(e.AlbumId,r)):e.SeriesId&&e.SeriesPrimaryImageTag?(r.tag=e.SeriesPrimaryImageTag,t.getScaledImageUrl(e.SeriesId,r)):e.ParentPrimaryImageTag?(r.tag=e.ParentPrimaryImageTag,t.getScaledImageUrl(e.ParentPrimaryImageItemId,r)):null}function m(e,a){for(var t="",i=0,r=e.length;r>i;i++)t+=0===i?a?"<h2>":"<div>":'<div class="secondary">',t+=e[i]||"&nbsp;",t+=0===i&&a?"</h2>":"</div>";return t}function c(i){for(var s=i.items,c="",u=i.action||"link",g="large"==i.imageSize,I=i.enableOverview,p=r.tv?!0:!1,v=p?"button":"div",y=null!=i.enableSideMediaInfo?i.enableSideMediaInfo:p,b="",f=0,h=s.length;h>f;f++){var P=s[f],A="";if(i.showIndex){var T=d(P,i);T!=c&&(A&&(A+="</div>"),A+=0==f?'<h1 class="listGroupHeader first">':'<h1 class="listGroupHeader">',A+=T,A+="</h1>",A+="<div>",c=T)}var S="listItem";p&&(S+=" itemAction");var x=80;g&&(S+=" largeImage",x=500);var M=P.PlaylistItemId?' data-playlistitemid="'+P.PlaylistItemId+'"':"",U=P.UserData&&P.UserData.PlaybackPositionTicks?' data-positionticks="'+P.UserData.PlaybackPositionTicks+'"':"",C=i.collectionId?' data-collectionid="'+i.collectionId+'"':"",w=i.playlistId?' data-playlistid="'+i.playlistId+'"':"";A+="<"+v+' class="'+S+'" data-index="'+f+'"'+M+' data-action="'+u+'" data-isfolder="'+P.IsFolder+'" data-id="'+P.Id+'" data-serverid="'+P.ServerId+'" data-mediatype="'+P.MediaType+'" data-type="'+P.Type+'"'+U+C+w+">",!p&&i.dragHandle&&(A+='<button is="paper-icon-button-light" class="listViewDragHandle autoSize"><i class="md-icon">&#xE25D;</i></button>');var N=o(P,x);A+=N?'<div class="listItemImage lazy" data-src="'+N+'" item-icon>':'<div class="listItemImage">';var D="";D+=t.getPlayedIndicatorHtml(P),D&&(A+='<div class="indicators">'+D+"</div>");var H=t.getProgressBarHtml(P);H&&(A+=H),A+="</div>";var O=[];i.showParentTitle&&"Episode"==P.Type&&O.push(P.SeriesName||"&nbsp;");var k=e.getDisplayName(P);i.showIndexNumber&&null!=P.IndexNumber&&(k=P.IndexNumber+". "+k),O.push(k),P.ArtistItems&&"MusicAlbum"!=P.Type&&O.push(P.ArtistItems.map(function(e){return e.Name}).join(", ")||"&nbsp;"),P.AlbumArtist&&"MusicAlbum"==P.Type&&O.push(P.AlbumArtist||"&nbsp;"),"Game"==P.Type&&O.push(P.GameSystem||"&nbsp;"),"TvChannel"==P.Type&&P.CurrentProgram&&O.push(e.getDisplayName(P.CurrentProgram)),S="listItemBody",p||(S+=" itemAction"),A+='<div class="'+S+'">';var z="dots-horiz"==l.moreIcon?"&#xE5D3;":"&#xE5D4;";A+=m(O,g),y||(A+='<div class="secondary listItemMediaInfo">'+a.getPrimaryMediaInfoHtml(P)+"</div>"),I&&P.Overview&&(A+='<div class="secondary overview">',A+=P.Overview,A+="</div>"),A+="</div>",y&&(A+='<div class="secondary listItemMediaInfo">'+a.getPrimaryMediaInfoHtml(P,{year:!1,container:!1})+"</div>"),p||(A+='<button is="paper-icon-button-light" class="itemAction autoSize" data-action="menu"><i class="md-icon">'+z+"</i></button>",A+='<span class="listViewUserDataButtons">',A+=n.getIconsHtml({item:P,includePlayed:!1}),A+="</span>"),A+="</"+v+">",b+=A}return b}return{getListViewHtml:c}});