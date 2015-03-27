
var Generator = (function() {

    var canvas = document.createElement( 'canvas' )
    var context = canvas.getContext( 'experimental-webgl' , {antialias:true, preserveDrawingBuffer:true})
    var main;

    var settings = {

        constellationIndex: {
            type: 'number',
            label: 'Constellation Index',
            description: 'Constellation Index',
            range: [ 0, 88 ],
            value: 0,
            step: 1
        },


        invertColor: {
            type: 'boolean',
            label: 'Invert Color',
            description: 'Invert Color',
            value: false
        }
    }

    return {

        context: context,

        settings: settings,

        initialize: function( done ) {
            main = new SuApp(canvas);
            done()
        },

        generate: function( done ) {
            main.resize();
            main.refresh(this.settings);
            // done()

            setTimeout(function() {
                done()
            }, 2000);
        },

        destroy: function( done ) {

            done()
        }
    }

})();