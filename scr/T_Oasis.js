javascript:
var l = console.log.bind(console), kam = [];
function multiReplace(s,e) {e.forEach(function(q) {s = s.split(q).join('');});return s;}
function oasExp(d){d=d.html;d=d.substr(d.indexOf("amounts"));d=d.substr(0,d.indexOf("}]"));d=JSON.parse('{"'+d);return countExp(d)}
function between(x,min,max){return x>=min&&x<=max}
function countExp (t) {var e = 0;$.each(t.amounts,function(i,q) {if (between(i,1,4)) e += q*1;if (between(i,5,6)) e += q*2;if (between(i,7,9)) e += q*3;if (i==10) e += q*5;});return e;}

function setOases() {
$.ajax({
  method: "POST",beforeSend: function(request) {request.setRequestHeader("x-version", "819.9");request.setRequestHeader("authorization", "Bearer "+Travian.nonvotingUnsheathingCommunicating);},
  contentType: "application/json; charset=UTF-8", accept: "application/json, text/javascript, */*; q=0.01", url: "/api/v1/ajax/mapPositionData",
  data: '{"data":{"x":54,"y":-127,"zoomLevel":1,"ignorePositions":[]}}'}).done(
  function( data ) {dat(data);});}

function dat(data) {
  var delay = $('#oad').val(), oases = [];kam = [];
  $.each(data.tiles, function(i,q) {var s = q.text;
    s = multiReplace(s, ['&#x202d;','<span class="coordinates coordinatesWrapper">', '<span class="coordinateY">', '&#x202c;','<span class="coordinateX">', '<span class="coordinatePipe">','</span>','(',')']);
    s = s.replace('&minus;','-');s = s.split('<br />').join(" ");q.text = s;if (q.title == "{k.fo}") {oases.push(q);}});
  $.each(oases, function(i,q) {setTimeout(function () {getO(q.position,oases.length==(i+1));$("#oaCounter").text((i+1)+"/"+oases.length)},delay*i);});
}
function getO(p,bool) {
  $.ajax({method: "POST",beforeSend: function(request) {request.setRequestHeader("x-version", "819.9");request.setRequestHeader("authorization", "Bearer "+Travian.nonvotingUnsheathingCommunicating);},
  contentType: "application/json; charset=UTF-8", accept: "application/json, text/javascript, */*; q=0.01", url: "/api/v1/ajax/viewTileDetails",
  data: JSON.stringify(p)}).done(function( data ) {
    var kk = {position: p, exp: oasExp(data)}; kam.push(kk);
    if(bool) afterGet(kam);
  });
}
function setLayout() {
  $('#sidebarBoxOasisList').remove();
  $('#sidebarBoxOasisTable').remove();
  makeDiv("Oazy","sidebarBoxOasisList");
  $('#sidebarBoxLinklist').hide();$('#sidebarBoxAlliance').hide();
  $('#sidebarBoxOasisList').find('div.content').append($('<p>X<input id="oax" value="54" type="text" style="width: 40px;margin-left: 10px;margin-right: 10px;text-align:right;">Y <input id="oay" value="-127" type="text" style="width: 40px;margin-left: 10px;margin-right: 10px;text-align:right;"></p><p>Delay <input id="oad" value="100" type="text" style="width: 50px;margin-left: 10px;margin-right: 10px;text-align:right;"></p><button id="setOasesButt" type="button" class="textButtonV1 green">Start</button><span id="oaCounter" style="font-weight: bold;margin-left: 36px;">5/15</span>'));
  $('#setOasesButt').click(function() {setOases()});
}
function makeDiv(title, divID) {
  var s = $('<div id="'+divID+'" class="sidebarBox"><div class="header "><div class="buttonsWrapper"></div></div><div class="content"><div class="boxTitle"><div class="name">'+title+'</div></div></div></div>')
  $('#sidebarBeforeContent > div.sidebarBoxWrapper').append(s);
}
function afterGet(k) {
  var compare = function( a, b ) {if ( a.exp > b.exp ){return -1;}if ( a.exp < b.exp ){return 1;}return 0;}
  k = k.sort(compare);setTable(k);
}
function setMapPos(p) {  
    $('#xCoordInputMap').val($(p).attr("x"));$('#yCoordInputMap').val($(p).attr("y"));
    $('div.coordinatesInput').parent().find("button").click();
}
function setTable(k) {
  makeDiv("Zoznam","sidebarBoxOasisTable");
  $('#sidebarBoxOasisTable').css('margin-top','50px');
  var t = $('<table><tr><th>X|Y</th><th>Dist</th><th>Time</th><th>Exp</th></tr></table>').appendTo($('#sidebarBoxOasisTable div.content'));
  $.each(k, function (i,q){
    var v = Math.sqrt(Math.pow(q.position.x- $("#oax").val(),2) + Math.pow(q.position.y- $("#oay").val(),2));
    var dt = v / 14; /*14 je rychlost palkara*/
    var n = new Date(0,0);n.setSeconds(+dt * 60 * 60);var tm = n.toLocaleTimeString("sk-SK");
    $('<tr>')
    .append($('<td>').append($('<a x="'+q.position.x+'" y="'+q.position.y+'">').text(q.position.x+'|'+q.position.y).click(function () {
      setMapPos(this);return false;
    }))).append('<td>'+v.toFixed(2)+'</td><td>'+tm+'</td><td>'+q.exp+'</td>').appendTo(t);
  });
}
setLayout();
