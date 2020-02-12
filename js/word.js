
var dic = new Array()
	dic['a']=3
	dic['b']=2
	dic['c']=1
	dic['d']=0
	var sdic=Object.keys(dic).sort(function(a,b){return dic[a]-dic[b]});

	function showwordcloud(dataref){
		var dic = new Array()
		data=dataref.val()
		var check=0
		for (var i in data){
			check=check+1
			var tag=data[i].tags
			var taglist=tag.split("|")
			//console.log(taglist)
			for (var j=0;j<taglist.length;j++){
				var temp=taglist[j]
				if(dic[taglist[j]]!=undefined){
					dic[temp]=dic[temp]+1
				}
				else{
					dic[temp]=0
				}
				//console.log(dic[temp])
			}
			
		}
		var dic_s=Object.keys(dic).sort(function(a,b){return dic[b]-dic[a]});
		var wordlist=[]
		for (var i=0;i<20;i++){
			tempkey=dic_s[i]
			tempvalue=dic[tempkey]
			wordlist.push([tempkey,tempvalue])
		}
		
		console.log(wordlist)
    //console.log(wordlist)
    var options = eval({
        "list": wordlist,
        "gridSize": 16, // size of the grid in pixels
        "weightFactor": 0.03
        , // number to multiply for size of each word in the list
        "fontWeight": 'normal', // 'normal', 'bold' or a callback
        "fontFamily": 'Times, serif', // font to use
        "color": 'random-light', // 'random-dark' or 'random-light'
        "backgroundColor": '#333', // the color of canvas
        "rotateRatio": 1 // probability for the word to rotate. 1 means always rotate
    });
    var canvas = document.getElementById('canvas');
    WordCloud(canvas, options);
	}
	
