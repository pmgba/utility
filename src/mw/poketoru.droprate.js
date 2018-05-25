mw.util.addCSS('.shuffle-dri{background:url("/w/images/thumb/b/b5/Shuffle_Drop_Rate_Increase.png/20px-Shuffle_Drop_Rate_Increase.png");width:20px;height:20px;position: absolute;top: 0;right: 0;margin: 6px 6px 0 0; z-index: 2;}');

	var html = ''
+'<div class="container"><div class="row">'
+'	<div class="pw-calculator col-lg-6">'
+'		<form class="form-horizontal" role="form">'
+'			<div class="form-group">'
+'				<label class="col-2 control-label">掉落几率</label>'
;
	for (var j=0; j<=2; j++ ) {
html += '			<div class="col-3">'
+'				<select class="form-control" name="shuffle-droprate'+j+'" onchange="calc()">'
;
	var droprateText = [ '-', '100%', '50%', '25%', '12.5%', '6.25%', '3.125%', '1.56%' ];
	for ( var i=0; i<8; i++ ) {
		html += '<option value=' + i + '>' + droprateText[i] + '</option>';
	}
	html += ''
+'				</select>'
+'				</div>'
;
	}
	html += ''
+'			</div>'
+'			<div class="form-group">'
+'				<label class="col-2 control-label">所需经验</label>'
+'				<div class="col-3">'
+'				<input class="form-control" type="textbox" name="shuffle-guage" onchange="calc()">'
+'				</div>'
+'			</div>'
+'			<div class="form-group">'
+'				<label class="col-2 control-label">每局花费</label>'
+'				<div class="col-3">'
+'				<input class="form-control" type="textbox" name="shuffle-cost" onchange="calc()">'
+'				</div>'
+'			</div>'
+'		<hr>'
+'			<div class="form-group">'
+'				<label class="col-2 control-label">平均掉落几率</label>'
+'				<div class="col-3">'
+'				<input class="form-control" type="textbox" name="shuffle-drop" disabled>'
+'				</div>'
+'				<div class="col-3">'
+'				<input class="form-control" type="textbox" name="shuffle-drop-dri" disabled><div class="shuffle-dri"></div>'
+'				</div>'
+'			</div>'
+'			<div class="form-group">'
+'				<label class="col-2 control-label">需要局数</label>'
+'				<div class="col-3">'
+'				<input class="form-control" type="textbox" name="shuffle-totalplay" disabled>'
+'				</div>'
+'				<div class="col-3">'
+'				<input class="form-control" type="textbox" name="shuffle-totalplay-dri" disabled><div class="shuffle-dri"></div>'
+'				</div>'
+'			</div>'
+'			<div class="form-group">'
+'				<label class="col-2 control-label">需要花费</label>'
+'				<div class="col-3">'
+'				<input class="form-control" type="textbox" name="shuffle-totalcost" disabled>'
+'				</div>'
+'				<div class="col-3">'
+'				<input class="form-control" type="textbox" name="shuffle-totalcost-dri" disabled><div class="shuffle-dri"></div>'
+'				</div>'
+'			</div>'
+'		<hr>'
+'			<div class="form-group">'
+'				<label class="col-2 control-label">掉落0个几率</label>'
+'				<div class="col-3">'
+'				<input class="form-control" type="textbox" name="shuffle-drop0" disabled>'
+'				</div>'
+'				<div class="col-3">'
+'				<input class="form-control" type="textbox" name="shuffle-drop0-dri" disabled><div class="shuffle-dri"></div>'
+'				</div>'
+'			</div>'
+'			<div class="form-group">'
+'				<label class="col-2 control-label">掉落1个几率</label>'
+'				<div class="col-3">'
+'				<input class="form-control" type="textbox" name="shuffle-drop1" disabled>'
+'				</div>'
+'				<div class="col-3">'
+'				<input class="form-control" type="textbox" name="shuffle-drop1-dri" disabled><div class="shuffle-dri"></div>'
+'				</div>'
+'			</div>'
+'			<div class="form-group">'
+'				<label class="col-2 control-label">掉落2个几率</label>'
+'				<div class="col-3">'
+'				<input class="form-control" type="textbox" name="shuffle-drop2" disabled>'
+'				</div>'
+'				<div class="col-3">'
+'				<input class="form-control" type="textbox" name="shuffle-drop2-dri" disabled><div class="shuffle-dri"></div>'
+'				</div>'
+'			</div>'
+'			<div class="form-group">'
+'				<label class="col-2 control-label">掉落3个几率</label>'
+'				<div class="col-3">'
+'				<input class="form-control" type="textbox" name="shuffle-drop3" disabled>'
+'				</div>'
+'				<div class="col-3">'
+'				<input class="form-control" type="textbox" name="shuffle-drop3-dri" disabled><div class="shuffle-dri"></div>'
+'				</div>'
+'			</div>'
+'		</form>'
+'	</div>'
+'</div></div>'
+'';
	
	$('#shuffle-calculator').html(html);

window.calcDroprate =function(x,dri,gl) {
	var rate = 0;
	if ( x > 0 ) {
		var y = 1/Math.pow(2,x-1);
		if (dri>1) y=1-Math.pow((1-y),dri);
		rate += y;
	}
	return rate;
}
window.calcDroprates =function(droprates,dri,gl) {
	var rate = 0;
	$.each( droprates, function(i,x) {
		if ( x > 0 ) {
			var y = 1/Math.pow(2,x-1);
			if (dri>1) y=1-Math.pow((1-y),dri);
			rate += y;
		}
	});
	return rate;
}
window.calcDropCounts =function(droprates,dri,gl) {
	var s = '';
	var a = calcDroprate(droprates[0],dri,gl);
	var b = calcDroprate(droprates[1],dri,gl);
	var c = calcDroprate(droprates[2],dri,gl);

	var x = a+b+c-2*(a*b+b*c+a*c-3*a*b*c)-3*a*b*c;
	var y = a*b+b*c+a*c-3*a*b*c;
	var z = a * b * c;
	var w = (1-a) * (1-b) * (1-c);
	return [w,x,y,z];
}

window.calc=function() {
	var droprate1 = parseInt($('select[name=shuffle-droprate0]').val());
	var droprate2 = parseInt($('select[name=shuffle-droprate1]').val());
	var droprate3 = parseInt($('select[name=shuffle-droprate2]').val());
	var guage = parseInt($('input[name=shuffle-guage]').val())||0;
	var cost = parseInt($('input[name=shuffle-cost]').val())||0;

	var rate = calcDroprates( [ droprate1, droprate2, droprate3 ], 1 );
	var ratedri = calcDroprates( [ droprate1, droprate2, droprate3 ], 2 );
	var count = calcDropCounts( [ droprate1, droprate2, droprate3 ], 1 );
	var countdri = calcDropCounts( [ droprate1, droprate2, droprate3 ], 2 );

	$('input[name=shuffle-drop]').val( rate.toFixed(2) + '个/局' );
	$('input[name=shuffle-totalplay]').val( Math.ceil(guage/rate) );
	$('input[name=shuffle-totalcost]').val( Math.ceil(guage/rate)*cost );
	$('input[name=shuffle-counts]').val( calcDropCounts( [ droprate1, droprate2, droprate3 ], 2 ) );

	$('input[name=shuffle-drop-dri]').val( ratedri.toFixed(2) + '个/局' );
	$('input[name=shuffle-totalplay-dri]').val( Math.ceil(guage/ratedri) );
	$('input[name=shuffle-totalcost-dri]').val( Math.ceil(guage/ratedri)*cost );

	for ( var i=0; i<=3; i++ ) {
		$('input[name=shuffle-drop' + i + ']').val( (count[i]*100).toFixed(2) + '%' );
		$('input[name=shuffle-drop' + i + '-dri]').val( (countdri[i]*100).toFixed(2) + '%' );
	}
}

if ( mw.util.getParamValue('dr') ) {
	var dr = mw.util.getParamValue('dr').split(',');
	for ( i=0; i<dr.length; i++ ) {
		$('select[name=shuffle-droprate'+i+']').val(parseInt(dr[i]));
	}
	calc();
}
