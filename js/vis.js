 function dashboard(id, fData){
    var barColor = 'steelblue';
    function segColor(c){ return {type1:"#807dba", type2:"#e08214",type3:"#41ab5d", type4:"#DC143C",type5:"#FFD700", type6:"#00CED1" }[c]; }

   
    function histoGram(fD){
      var hG={},    hGDim = {t: 10, r: 10, b: 20, l: 10};
      hGDim.w = 200 - hGDim.l - hGDim.r,
        hGDim.h = 200 - hGDim.t - hGDim.b;

      
      var hGsvg = d3.select(id).append("svg")
        .attr("width", hGDim.w + hGDim.l + hGDim.r)
        .attr("height", hGDim.h + hGDim.t + hGDim.b).append("g")
        .attr("transform", "translate(" + hGDim.l + "," + hGDim.t + ")");

     
      var x = d3.scale.ordinal().rangeRoundBands([0, hGDim.w], 0.1)
        .domain(fD.map(function(d) { return d[0]; }));

      
      hGsvg.append("g").attr("class", "x axis")
        .attr("transform", "translate(0," + hGDim.h + ")")
        .call(d3.svg.axis().scale(x).orient("bottom"));

      
      var y = d3.scale.linear().range([hGDim.h, 0])
        .domain([0, d3.max(fD, function(d) { return d[1]; })]);

      
      var bars = hGsvg.selectAll(".bar").data(fD).enter()
        .append("g").attr("class", "bar");

      //create the rectangles.
      bars.append("rect")
        .attr("x", function(d) { return x(d[0]); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("width", x.rangeBand())
        .attr("height", function(d) { return hGDim.h - y(d[1]); })
        .attr('fill',barColor);
        

      var legend = d3.select(id).append("table").attr('class','legend');


      
      hG.update = function(nD, color){
        // update the domain of the y-axis map to reflect change in frequencies.
        y.domain([0, d3.max(nD, function(d) { return d[1]; })]);

      
        var bars = hGsvg.selectAll(".bar").data(nD);

        
        bars.select("rect").transition().duration(500)
          .attr("y", function(d) {return y(d[1]); })
          .attr("height", function(d) { return hGDim.h - y(d[1]); })
          .attr("fill", color);

        
        bars.select("text").transition().duration(500)
          .text(function(d){ return d3.format(",")(d[1])})
          .attr("y", function(d) {return y(d[1])-5; });
      }
      return hG;
    }

    
    function pieChart(pD){
      var pC ={},    pieDim ={w:150, h: 150};
      pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;

      // create svg for pie chart.
      var piesvg = d3.select(id).append("svg")
        .attr("width", pieDim.w).attr("height", pieDim.h).append("g")
        .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");

      // create function to draw the arcs of the pie slices.
      var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);

      // create a function to compute the pie slice angles.
      var pie = d3.layout.pie().sort(null).value(function(d) { return d.freq; });

      // Draw the pie slices.
      var arcs = piesvg.selectAll("path").data(pie(pD)).enter().append("path").attr("d", arc)
        .each(function(d) { this._current = d; })
        .style("fill", function(d) { return segColor(d.data.type); });
      
      arcs.append("text")
        .attr("transform",function(d){
        return "translate(" + arc.centroid(d) + ")";
    })
        .attr("text-anchor","middle")
        .text("hahah");
      
      function arcTween(a) {
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) { return arc(i(t));    };
      }
      return pC;
    }

    // function to handle legend.
    function legend(lD){
      var leg = {};

      // create table for legend.
      var legend = d3.select(id).append("table").attr('class','legend');

      // create one row per segment.
      var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");

      // create the first column for each segment.
      tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
        .attr("width", '16').attr("height", '16')
        .attr("fill",function(d){ return segColor(d.type); });

      // create the second column for each segment.
      tr.append("td").text(function(d){ return d.type;});

      // create the third column for each segment.
      tr.append("td").attr("class",'legendFreq')
        .text(function(d){ return d3.format(",")(d.freq);});

      // create the fourth column for each segment.
      tr.append("td").attr("class",'legendPerc')
        .text(function(d){ return getLegend(d,lD);});

      

      function getLegend(d,aD){ // Utility function to compute percentage.
        return d3.format("%")(d.freq/d3.sum(aD.map(function(v){ return v.freq; })));
      }

      return leg;
    }

    


    var hG = histoGram(fData);// create the histogram.
       
  }
  function piedash(id, fData) {
    function segColor(c){ return {type1:"#807dba", type2:"#e08214",type3:"#41ab5d", type4:"#DC143C",type5:"#FFD700", type6:"#00CED1" }[c]; }
    function pieChart(pD){
      var pC ={},    pieDim ={w:150, h: 150};
      pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;

      // create svg for pie chart.
      var piesvg = d3.select(id).append("svg")
        .attr("width", pieDim.w).attr("height", pieDim.h).append("g")
        .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");

      // create function to draw the arcs of the pie slices.
      var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);

      // create a function to compute the pie slice angles.
      var pie = d3.layout.pie().sort(null).value(function(d) { return d.freq; });

      // Draw the pie slices.
     var arcs=piesvg.selectAll("path").data(pie(pD)).enter().append("path").attr("d", arc)
        .each(function(d) { this._current = d; })
        .style("fill", function(d) { return segColor(d.data.type); });

      arcs.append("text")
        .attr("transform",function(d){
        return "translate(" + arc.centroid(d) + ")";
    })
        .attr("text-anchor","middle")
        .text("hahah");

        
      function arcTween(a) {
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) { return arc(i(t));    };
      }
      return pC;
    }

    // function to handle legend.
    function legend(lD){
      var leg = {};

      // create table for legend.
      var legend = d3.select(id).append("table").attr('class','legend');

      // create one row per segment.
      var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");

      // create the first column for each segment.
      tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
        .attr("width", '16').attr("height", '16')
        .attr("fill",function(d){ return segColor(d.type); });

      // create the second column for each segment.
      tr.append("td").text(function(d){ return d.type;});

      // create the third column for each segment.
      tr.append("td").attr("class",'legendFreq')
        .text(function(d){ return d3.format(",")(d.freq);});

      // create the fourth column for each segment.
      tr.append("td").attr("class",'legendPerc')
        .text(function(d){ return getLegend(d,lD);});

      

      function getLegend(d,aD){ // Utility function to compute percentage.
        return d3.format("%")(d.freq/d3.sum(aD.map(function(v){ return v.freq; })));
      }

      return leg;
    }
    pC = pieChart(fData); // create the pie-chart.
    //leg= legend(fData);  // create the legend.
  }