// SuUtils.js


var Sutils = {};

Sutils.getStarPosition = function(ra, de, radius)  {
	var x = y = z = 0;
	var radian = Math.PI/180;
	var y = radius * Math.sin(de * radian);
	var l = radius * Math.cos(de * radian);
	x = -l * Math.cos(ra * radian);
	z = l * Math.sin(ra * radian);
	return [x, y, z];
}


Sutils.getStarById = function(id) {
	for(var i=0; i<SuModel.stars.length; i++) {
		if(SuModel.stars[i].id == id) return SuModel.stars[i];
	}
}


Sutils.getQuatRotation = function(mStrQuat) {
	var tmpAry = mStrQuat.split(",");
	var quatRotation = quat.fromValues( parseFloat(tmpAry[0]), parseFloat(tmpAry[1]),  parseFloat(tmpAry[2]), parseFloat(tmpAry[3]));
	return quatRotation;
}


Sutils.getDrawingPath = function(index) {
	for ( var s in SuModel.drawings) {
		var tmp = parseInt(SuModel.drawings[s].split("imgConstellation")[1]);
		if(tmp == index) {
			return s.replace(".jpg", ".png");
		}
	}

	return '';
}


Sutils.getConstellatinDetail = function(index) {
	if(!SuModel.constellations[index]) return null;
	var id = SuModel.constellations[index].id;

	for(var i=0; i<SuModel.constellationDesc.length; i++) {
		if(SuModel.constellationDesc[i].abb == id) {
			return SuModel.constellationDesc[i];
		}
	}

	return null;
}