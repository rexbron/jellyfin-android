define([],function(){function e(e,t){var a=t||4096,p=[];if(a>=1900?(p.push({name:"1080p - 60Mbps",maxHeight:1080,bitrate:6e7}),p.push({name:"1080p - 55Mbps",maxHeight:1080,bitrate:55e6}),p.push({name:"1080p - 50Mbps",maxHeight:1080,bitrate:5e7}),p.push({name:"1080p - 45Mbps",maxHeight:1080,bitrate:45e6}),p.push({name:"1080p - 40Mbps",maxHeight:1080,bitrate:4e7}),p.push({name:"1080p - 35Mbps",maxHeight:1080,bitrate:35e6}),p.push({name:"1080p - 30Mbps",maxHeight:1080,bitrate:3e7}),p.push({name:"1080p - 25Mbps",maxHeight:1080,bitrate:25e6}),p.push({name:"1080p - 20Mbps",maxHeight:1080,bitrate:2e7}),p.push({name:"1080p - 15Mbps",maxHeight:1080,bitrate:15e6}),p.push({name:"1080p - 10Mbps",maxHeight:1080,bitrate:10000001}),p.push({name:"1080p - 8Mbps",maxHeight:1080,bitrate:8000001}),p.push({name:"1080p - 6Mbps",maxHeight:1080,bitrate:6000001}),p.push({name:"1080p - 5Mbps",maxHeight:1080,bitrate:5000001}),p.push({name:"1080p - 4Mbps",maxHeight:1080,bitrate:4000002})):a>=1260?(p.push({name:"720p - 10Mbps",maxHeight:720,bitrate:1e7}),p.push({name:"720p - 8Mbps",maxHeight:720,bitrate:8e6}),p.push({name:"720p - 6Mbps",maxHeight:720,bitrate:6e6}),p.push({name:"720p - 5Mbps",maxHeight:720,bitrate:5e6})):a>=700&&(p.push({name:"480p - 4Mbps",maxHeight:480,bitrate:4000001}),p.push({name:"480p - 3Mbps",maxHeight:480,bitrate:3000001}),p.push({name:"480p - 2.5Mbps",maxHeight:480,bitrate:25e5}),p.push({name:"480p - 2Mbps",maxHeight:480,bitrate:2000001}),p.push({name:"480p - 1.5Mbps",maxHeight:480,bitrate:1500001})),a>=1260&&(p.push({name:"720p - 4Mbps",maxHeight:720,bitrate:4e6}),p.push({name:"720p - 3Mbps",maxHeight:720,bitrate:3e6}),p.push({name:"720p - 2Mbps",maxHeight:720,bitrate:2e6}),p.push({name:"720p - 1.5Mbps",maxHeight:720,bitrate:15e5}),p.push({name:"720p - 1Mbps",maxHeight:720,bitrate:1000001})),p.push({name:"480p - 1.0Mbps",maxHeight:480,bitrate:1e6}),p.push({name:"480p - 720kbps",maxHeight:480,bitrate:72e4}),p.push({name:"480p - 420kbps",maxHeight:480,bitrate:42e4}),p.push({name:"360p",maxHeight:360,bitrate:4e5}),p.push({name:"240p",maxHeight:240,bitrate:32e4}),p.push({name:"144p",maxHeight:144,bitrate:192e3}),e){for(var i=-1,h=0,m=p.length;m>h;h++){var s=p[h];-1==i&&s.bitrate<=e&&(i=h)}-1==i&&(i=p.length-1),p[i].selected=!0}return p}return{getVideoQualityOptions:e}});