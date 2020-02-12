//dashboard('#dashboard',freqDataa);
//var commentlist=[];
function showdatafun(dataref){
  var dataset=[
  {State_com:'<100', freq_com: 0,State_view:'<5000',freq_view:0,State_cat:'type1',freq_cat:0}
  ,{State_com:'<500', freq_com: 0,State_view:'.',freq_view:0,State_cat:'type2',freq_cat:0}
  ,{State_com:'.', freq_com: 0,State_view:'<500000',freq_view:0,State_cat:'type3',freq_cat:0}
  ,{State_com:'..', freq_com: 0,State_view:'..',freq_view:0,State_cat:'type4',freq_cat:0}
  ,{State_com:'...', freq_com: 0, State_view:'...',freq_view:0,State_cat:'type5',freq_cat:0}
  ,{State_com:'>100000', freq_com: 0, State_view:'>5000000',freq_view:0,State_cat:'type6',freq_cat:0}
  ];
  data=dataref.val();
  //commentlist=data;
  //console.log(data.slice(0,10));
  for (var i in data) {
    //if(commentlist[i])
    var com=parseInt(data[i].comment_count);
    var view=parseInt(data[i].views);
    var cat=parseInt(data[i].category_id)
    data[i].comment_count=com;
    if(com<100){
    dataset[0].freq_com=dataset[0].freq_com+1;
  }
  else if(com<500){
    dataset[1].freq_com=dataset[1].freq_com+1;
  }
  else if(com<1000){
    dataset[2].freq_com=dataset[2].freq_com+1;
  }
  else if(com<10000){
    dataset[3].freq_com=dataset[3].freq_com+1;
  }
  else if(com<100000){
    dataset[4].freq_com=dataset[4].freq_com+1;
  }
  else{
    dataset[5].freq_com=dataset[5].freq_com+1;    
  }
   if(view<5000){
    dataset[0].freq_view=dataset[0].freq_view+1;
  }else if(view<50000){
    dataset[1].freq_view=dataset[1].freq_view+1;
  }else if(view<500000){
    dataset[2].freq_view=dataset[2].freq_view+1;
  }else if(view<1000000){
    dataset[3].freq_view=dataset[3].freq_view+1;
  }else if(view<5000000){
    dataset[4].freq_view=dataset[4].freq_view+1;
  }else{
    dataset[5].freq_view=dataset[5].freq_view+1;
  }
  if(cat<10){
    dataset[0].freq_cat=dataset[0].freq_cat+1;
  }else if(cat<15){
    dataset[1].freq_cat=dataset[1].freq_cat+1;
  }else if(cat<20){
    dataset[2].freq_cat=dataset[2].freq_cat+1;
  }else if(cat<25){
    dataset[3].freq_cat=dataset[3].freq_cat+1;
  }else if(cat<30){
    dataset[4].freq_cat=dataset[4].freq_cat+1;
  }else {
    dataset[5].freq_cat=dataset[5].freq_cat+1;
  }
}
  //console.log(freqlist);
  //console.log(freqDataa);
  var sF_con = dataset.map(function(d){return [d.State_com,d.freq_com];});
  var sF_view = dataset.map(function(d){return [d.State_view,d.freq_view];});
  var tF=dataset.map(function(d){
return {type:d.State_cat, freq: d.freq_cat}
});
  piedash('#cat',tF);
  dashboard('#com',sF_con);
  dashboard('#view',sF_view);
}