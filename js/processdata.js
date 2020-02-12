 function submittime(){
      timea=$("#time1").val();
      timeb=$("#time2").val();
    }
    function filterTag(){
      inputtag = $("#tag").val();
      //console.log(name);
      $("#table tbody  tr:not(:first)").empty("");
      var filtref = firebase.database().ref("USvideos").orderByChild("tags");
      filtref.on('value',showdatatab_filter_non_num);
    }
    function filterLikes(){
      left = $("#left").val();
      right = $("#right").val();
      //console.log(name);
      $("#table tbody  tr:not(:first)").empty("");
      var filtref = firebase.database().ref("USvideos").orderByChild("likes");
      filtref.on('value',showdatatab_filter_num);
    }
    function viewsortAscending(){
      $("#table tbody  tr:not(:first)").empty("");
      var sortref = firebase.database().ref("USvideos").orderByChild("views").limitToFirst(40);
         sortref.on('value',showdatatab);
    }
    function viewsortDescending(){
      $("#table tbody  tr:not(:first)").empty("");
      var sortref = firebase.database().ref("USvideos").orderByChild("views").limitToLast(40);
         sortref.on('value',showdatatab_d);
    }
     function timesortAscending(){
      $("#table tbody  tr:not(:first)").empty("");
      var sortref = firebase.database().ref("USvideos").orderByChild("publish_time").limitToFirst(40);
         sortref.on('value',showdatatab);
    }
    function timesortDescending(){
      $("#table tbody  tr:not(:first)").empty("");
      var sortref = firebase.database().ref("USvideos").orderByChild("publish_time").limitToLast(40);
         sortref.on('value',showdatatab_d);
    }
    function likessortAscending(){
      $("#table tbody  tr:not(:first)").empty("");
      var sortref = firebase.database().ref("USvideos").orderByChild("likes").limitToFirst(40);
         sortref.on('value',showdatatab);
    }
    function likessortDescending(){
      $("#table tbody  tr:not(:first)").empty("");
      var sortref = firebase.database().ref("USvideos").orderByChild("likes").limitToLast(40);
         sortref.on('value',showdatatab_d);
    }
    function titlesortAscending(){
      $("#table tbody  tr:not(:first)").empty("");
      var sortref = firebase.database().ref("USvideos").orderByChild("title").limitToFirst(40);
         sortref.on('value',showdatatab);
    }
    function titlesortDescending(){
      $("#table tbody  tr:not(:first)").empty("");
      var sortref = firebase.database().ref("USvideos").orderByChild("title").limitToLast(40);
         sortref.on('value',showdatatab_d);
    }
   function showdatatab(dataref){
            //console.log(dataref.val());
            //var dataset = dataref.val(), table;
            dataref.forEach(
              function(snapshot){
                item=snapshot.val();
                //console.log(item.video_id);
                var table='<tr><td>'+item.video_id+'</td><td>'+item.trending_date+'</td><td>'+item.title+'</td><td>'+item.channel_title+'</td><td>'+item.category_id+'</td><td>'+item.publish_time+'</td><td>'+item.views+'</td><td>'+item.likes+'</td><td>'+item.dislikes+'</td><td>'+item.comment_count+'</td><td>'+item.thumbnail_link+'</td><td>'+item.comments_disabled+'</td><td>'+item.ratings_disabled+'</td><td>'+item.video_error_or_removed+'</td><td>'+item.tags+'</td><td>'+item.description+'</td></tr>';
                  $('#table tbody').append(table);
              }
              );
        }
    function showdatatab_d(dataref){
            //console.log(dataref.val());
            var list=[0];
            var size=0;
            //var dataset = dataref.val(), table;
            dataref.forEach(
              function(snapshot){
                item=snapshot.val();
                //console.log(item.video_id);
                list.push(item)
                size=size+1
              }
              );
            for(i=0;i<size;i++){
              item=list.pop()
              var table='<tr><td>'+item.video_id+'</td><td>'+item.trending_date+'</td><td>'+item.title+'</td><td>'+item.channel_title+'</td><td>'+item.category_id+'</td><td>'+item.publish_time+'</td><td>'+item.views+'</td><td>'+item.likes+'</td><td>'+item.dislikes+'</td><td>'+item.comment_count+'</td><td>'+item.thumbnail_link+'</td><td>'+item.comments_disabled+'</td><td>'+item.ratings_disabled+'</td><td>'+item.video_error_or_removed+'</td><td>'+item.tags+'</td><td>'+item.description+'</td></tr>';
                  $('#table tbody').append(table);
            }
        }
     function showdatatab_filter_non_num(dataref){
            var arr=[];
            var list=[];
            var size=0;
      //var dataset = dataref.val(), table;
        dataref.forEach(
          function(snapshot){
            item=snapshot.val();

            list.push(item)
            size=size+1
          }
          );
          for(var i = 0;i<size; i++){
            item = list[i]
            keyword = item.tags
            kw2 = keyword.toLowerCase()
            inp2 = inputtag.toLowerCase()
            if (kw2.indexOf(inp2) != -1){
                arr.push(list[i])
            }
          }
          for(i=0;i<arr.length;i++){
          item=arr[i]
          var table='<tr><td>'+item.video_id+'</td><td>'+item.trending_date+'</td><td>'+item.title+'</td><td>'+item.channel_title+'</td><td>'+item.category_id+'</td><td>'+item.publish_time+'</td><td>'+item.views+'</td><td>'+item.likes+'</td><td>'+item.dislikes+'</td><td>'+item.comment_count+'</td><td>'+item.thumbnail_link+'</td><td>'+item.comments_disabled+'</td><td>'+item.ratings_disabled+'</td><td>'+item.video_error_or_removed+'</td><td>'+item.tags+'</td><td>'+item.description+'</td></tr>';
              $('#table tbody').append(table);
        }
     }
     function showdatatab_filter_num(dataref){
            var arr=[];
            var list=[];

      //var dataset = dataref.val(), table;
        dataref.forEach(
          function(snapshot){
            item=snapshot.val();

            list.push(item)
          }
          );
          for(var i = 0;i<list.length; i++){
            item = list[i]
            keyword = item.likes
            if (keyword>=left && keyword<=right) {
                arr.push(list[i])
            }
          }
          for(i=0;i<arr.length;i++){
          item=arr[i]
          var table='<tr><td>'+item.video_id+'</td><td>'+item.trending_date+'</td><td>'+item.title+'</td><td>'+item.channel_title+'</td><td>'+item.category_id+'</td><td>'+item.publish_time+'</td><td>'+item.views+'</td><td>'+item.likes+'</td><td>'+item.dislikes+'</td><td>'+item.comment_count+'</td><td>'+item.thumbnail_link+'</td><td>'+item.comments_disabled+'</td><td>'+item.ratings_disabled+'</td><td>'+item.video_error_or_removed+'</td><td>'+item.tags+'</td><td>'+item.description+'</td></tr>';
              $('#table tbody').append(table);
        }
     }