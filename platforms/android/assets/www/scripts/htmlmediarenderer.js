!function(){function e(e){function a(){"video"==e.type&&window.StatusBar&&StatusBar.hide()}function o(){"video"==e.type&&window.StatusBar&&StatusBar.show()}function s(){o(),Events.trigger(P,"ended")}function d(){Events.trigger(P,"timeupdate")}function u(){Events.trigger(P,"volumechange")}function l(e){var n=e.target;n.removeEventListener("playing",l),$(".mediaPlayerAudioContainer").hide()}function v(){Events.trigger(P,"playing")}function c(){Events.trigger(P,"play")}function p(){Events.trigger(P,"pause")}function m(){Events.trigger(P,"click")}function f(){Events.trigger(P,"dblclick")}function g(e){{var n=e.target;n.error?n.error.code:""}o(),Events.trigger(P,"error")}function y(e){var n=e.target;n.removeEventListener("loadedmetadata",y),t||n.play()}function E(e){require(["hlsjs"],function(n){window.Hls=n,e()})}function L(e){var n=e,t=n.split("#");return t.length>1&&(t=t[t.length-1].split("="),2==t.length)?parseFloat(t[1]):0}function w(e){a();var n=e.target;n.removeEventListener("playing",w),P.setCurrentTrackElement(i);var t=!P.enableCustomVideoControls();if(t&&$(n).attr("controls","controls"),r){var o=(P.currentSrc()||"").toLowerCase(),s=L(o);if(s&&-1!=o.indexOf(".m3u8")){var d=browserInfo.safari?2500:0;d?setTimeout(function(){n.currentTime=s},d):n.currentTime=s}}}function h(){var e=$(".mediaPlayerAudio");if(!e.length){var n="",t=!MediaPlayer.canAutoPlayAudio();n+=t?'<div class="mediaPlayerAudioContainer" style="position: fixed;top: 40%;text-align: center;left: 0;right: 0;"><div class="mediaPlayerAudioContainerInner">':'<div class="mediaPlayerAudioContainer" style="display:none;padding: 1em;background: #222;"><div class="mediaPlayerAudioContainerInner">',n+='<audio class="mediaPlayerAudio" crossorigin="use-credentials" controls>',n+="</audio></div></div>",$(document.body).append(n),e=$(".mediaPlayerAudio")}return e=e[0],e.addEventListener("playing",l),e.addEventListener("timeupdate",d),e.addEventListener("ended",s),e.addEventListener("volumechange",u),e.addEventListener("error",g),e.addEventListener("pause",p),e.addEventListener("play",c),e.addEventListener("playing",v),e}function A(e){return e&&-1==e.indexOf(".m3u8")?!1:MediaPlayer.canPlayHls()&&!MediaPlayer.canPlayNativeHls()}function k(){var n="",t=!P.enableCustomVideoControls(),r=!browserInfo.safari&&e.poster?' poster="'+e.poster+'"':"";n+=t&&AppInfo.isNativeApp&&browserInfo.android?'<video class="itemVideo" id="itemVideo" preload="metadata" autoplay="autoplay" crossorigin="use-credentials"'+r+" webkit-playsinline>":t?'<video class="itemVideo" id="itemVideo" preload="metadata" autoplay="autoplay" crossorigin="use-credentials"'+r+' controls="controls" webkit-playsinline>':'<video class="itemVideo" id="itemVideo" preload="metadata" autoplay="autoplay" crossorigin="use-credentials"'+r+" webkit-playsinline>",n+="</video>";var i=$("#videoElement","#videoPlayer").prepend(n),a=$(".itemVideo",i)[0];return a.addEventListener("loadedmetadata",y),a.addEventListener("timeupdate",d),a.addEventListener("ended",s),a.addEventListener("volumechange",u),a.addEventListener("play",c),a.addEventListener("pause",p),a.addEventListener("playing",v),a.addEventListener("click",m),a.addEventListener("dblclick",f),a.addEventListener("error",g),a}function b(e,n){var t=n.map(function(e){var n=e.isDefault?" default":"";return'<track kind="subtitles" src="'+e.url+'" srclang="'+e.language+'"'+n+"></track>"}).join("");t&&(e.innerHTML=t)}var C,T,P=this;P.currentTime=function(e){return C?null!=e?void(C.currentTime=e/1e3):T?1e3*T:1e3*(C.currentTime||0):void 0},P.duration=function(){return C?C.duration:null},P.stop=function(){if(C&&(C.pause(),t)){T=C.currentTime;try{t.destroy()}catch(e){}t=null}},P.pause=function(){C&&C.pause()},P.unpause=function(){C&&C.play()},P.volume=function(e){return C?null!=e?void(C.volume=e):C.volume:void 0};var I;P.setCurrentSrc=function(e,n,a,o){var s=C;if(!s)return void(I=null);if(!e)return I=null,s.src=null,s.src="",void(browserInfo.safari&&(s.src="files/dummy.mp4",s.play()));var d=e.url;AppInfo.isNativeApp&&browserInfo.safari&&(d=d.replace("file://","")),r=!1;var u=L(d),l=!1;if("audio"==s.tagName.toLowerCase())s.src=d,l=!0;else{s.removeEventListener("playing",w),s.addEventListener("playing",w),t&&(t.destroy(),t=null),u&&(r=!0),o=o||[];for(var v=-1,c=0,p=o.length;p>c;c++)if(o[c].isDefault){v=c;break}if(i=v,A(d)){b(s,o);var m=new Hls;m.loadSource(d),m.attachMedia(s),m.on(Hls.Events.MANIFEST_PARSED,function(){s.play()}),t=m}else s.src=d,s.autoplay=!0,b(s,o),s.addEventListener("loadedmetadata",y),l=!0;P.setCurrentTrackElement(v)}I=d,l&&s.play()},P.currentSrc=function(){return C?I:void 0},P.paused=function(){return C?C.paused:!1},P.cleanup=function(){P.setCurrentSrc(null),T=null;var e=C;e&&("AUDIO"==e.tagName?(e.removeEventListener("timeupdate",d),e.removeEventListener("ended",s),e.removeEventListener("volumechange",u),e.removeEventListener("playing",l),e.removeEventListener("play",c),e.removeEventListener("pause",p),e.removeEventListener("playing",v),e.removeEventListener("error",g)):(e.removeEventListener("loadedmetadata",y),e.removeEventListener("playing",w),e.removeEventListener("timeupdate",d),e.removeEventListener("ended",s),e.removeEventListener("volumechange",u),e.removeEventListener("play",c),e.removeEventListener("pause",p),e.removeEventListener("playing",v),e.removeEventListener("click",m),e.removeEventListener("dblclick",f),e.removeEventListener("error",g)),"audio"!=e.tagName.toLowerCase()&&$(e).remove()),o()},P.supportsTextTracks=function(){return null==n&&(n=null!=document.createElement("video").textTracks),n},P.setCurrentTrackElement=function(e){for(var n=C.textTracks,t=["disabled","showing","hidden"],r=0;r<n.length;r++){var i;i=e==r?1:0;var a=!1;isNaN(n[r].mode)||(a=!0),n[r].mode=a?i:t[i]}},P.updateTextStreamUrls=function(e){if(P.supportsTextTracks()){for(var n=C.textTracks,t=0;t<n.length;t++){var r=n[t];try{for(;r.cues.length;)r.removeCue(r.cues[0])}catch(i){}}$("track",C).each(function(){this.src=replaceQueryString(this.src,"startPositionTicks",e)})}},P.enableCustomVideoControls=function(){return AppInfo.isNativeApp&&browserInfo.safari?-1!=navigator.userAgent.toLowerCase().indexOf("iphone")?!0:!1:P.canAutoPlayVideo()},P.canAutoPlayVideo=function(){return AppInfo.isNativeApp?!0:browserInfo.mobile?!1:!0},P.init=function(){return new Promise(function(n){"video"==e.type&&A()?E(n):n()})},C="audio"==e.type?h():k()}var n,t,r,i;window.AudioRenderer||(window.AudioRenderer=function(n){return n=n||{},n.type="audio",new e(n)}),window.VideoRenderer||(window.VideoRenderer=function(n){return n=n||{},n.type="video",new e(n)})}();