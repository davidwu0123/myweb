
var zip = [];
//市
zip[0] = ['台北','基隆','新北','桃園','新竹','苗栗','台中','彰化','雲林','嘉義','台南','高雄','屏東','宜蘭','花蓮','台東','南投'];

//區
zip["基隆"] = {'七堵':2306188};
zip["台北"] = {'內湖':2306179,'新店':2306186};
zip["新北"] = {'淡水':2306211,'鶯歌':2306214,'金山':2306223,'三芝':2306228,'萬里':2306231,'雙溪':2306251};
zip["桃園"] = {'大園':2306209,'中壢':2306184,'觀音':2306200,'龍潭':2306202,'桃園國際機場':2306254};
zip["新竹"] = {'東區':2306185};
zip["苗栗"] = {'三灣':2306229};
zip["台中"] = {'西屯':2306181,'石岡':2306207,'清水':2306194,'新社':2306218,'大甲':2306210};
zip["彰化"] = {'彰化市':2306183,'二林':2306195,'鹿港':2306201};
zip["雲林"] = {'斗南':2306212,'虎尾':2306250};
zip["嘉義"] = {'布袋':2306206};
zip["台南"] = {'安平':2306182,'佳里':2306193,'麻豆':2306203,'新化':2306217,'玉井':2306232};
zip["高雄"] = {'左營':2306180,'岡山':2306199,'高雄國際機場':2306255};
zip["屏東"] = {'屏東市':2306189,'東港':2306213,'枋山':2306224};
zip["宜蘭"] = {'宜蘭市':2306198,'蘇澳':2306208,'南澳':2306243};
zip["花蓮"] = {'花蓮市':2306187};
zip["台東"] = {'台東市':2306190,'關山':2306227};
zip["南投"] = {'南投市':2306204};


function init_address(){
    	
    var zone1 = document.getElementById('zone1');
    var zone2 = document.getElementById('zone2');
    
    zone1.options.add(first());
	zone2.options.add(first());
    
	for(var i in zip[0]){
        o=document.createElement('option');
        o.text=zip[0][i];
        o.value=zip[0][i];
        zone1.options.add(o);
	}
    
	zone1.onchange=function(){
	   
        document.getElementById('zipcode').value = "";
       
		zone2.innerHTML='';
		zone2.options.add(first());
        
		if(this.selectedIndex>0){
    		for(var i in zip[this.value]){                
    			o=document.createElement('option');
                o.text = i;
    			o.value = i;
    			zone2.options.add(o);
    		}
        }
	};
    
    zone2.onchange=function()
	{
		if(this.selectedIndex>0)
			var woeid = zip[zone1.value][zone2.value]; 
            var query = 'select * from weather.forecast where woeid=' + woeid; 
            var url = 'http://query.yahooapis.com/v1/public/yql?format=json&q=' + query; 
			 
			$.get(url,{}, 
  
               function(data, status)
			   { 
               console.log('data', data); 
               console.log('status', status); 
               $("#title").text(data.query.results.channel.item.title) 
                 .appendTo('body .title'); 

               $("#date").text(data.query.results.channel.item.pubDate) 
                 .appendTo('body .date'); 
               $("#lat").text(data.query.results.channel.item.lat) 
                 .appendTo('body .lat'); 
               $("#long").text(data.query.results.channel.item.long) 
                 .appendTo('body .long'); 
               $("#temp").text(data.query.results.channel.item.condition.temp) 
                 .appendTo('body .temp'); 
               $("#text").text(data.query.results.channel.item.condition.text) 
                 .appendTo('body .text'); 
               },'json' 
            );
			  
	};
	
	
	
	
	
}

//第一個選項
function first(){
	var o=document.createElement('option');
	o.text='請選擇';
	o.value="";
	return o;
}

