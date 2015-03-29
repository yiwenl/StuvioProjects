
var Generator = (function() {

    var canvas = document.createElement( 'canvas' )
    var context = canvas.getContext( 'experimental-webgl' , {antialias:true, preserveDrawingBuffer:true})
    var main;
    var interval = -1

    var settings = {

        constellationIndex: {
            type: 'number',
            label: 'Constellation',
            description: 'Choose your constellation',
            range: [ 0, 87 ],
            value: 0,
            step: 1
        },


        invertColor: {
            type: 'boolean',
            label: 'Invert Colour Theme',
            description: 'Another colour theme',
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

            
            clearInterval( interval )

            interval = setInterval(function() {
                if(main) {
                    if(main.isDone()) {
                        clearInterval(interval);

                        setTimeout(function() {
                            done()
                        }, 500);
                    }   
                }
                
            }, 10);
        },

        destroy: function( done ) {

            done()
        }
    }

})();