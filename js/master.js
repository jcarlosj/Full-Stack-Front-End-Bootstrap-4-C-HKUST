/** jQuery & JavaScript Code */
$( function() {
            
    let 
        homePageURL = `http://localhost:3000`,
        bodyEl = $( 'body' ),
        /** Login */
        btnLogin = $( '.fa-sign-in' ) .parent(),
        loginModal = $( '#loginModal' ),
        loginModalButtons = loginModal .find( 'button' ),
        /** Reserve */
        anchorReserve = $( 'a[href="#reserveform"]' ),
        reserveModal = $( '#reserveModal' ),
        reserveModalButtons = reserveModal .find( 'button' ); 

    /** Login Launch Button  */
    btnLogin .on( 'click', () => {
        loginModal .modal( 'show' );
    });
    /** Reserve Launch Anchor  */
    anchorReserve .on( 'click', () => {
        reserveModal .modal( 'show' );
    });

    /** Login launch modal buttons */
    loginModalButtons .each( function() {

        if( $( this ) .hasClass( 'close' ) || $( this ) .hasClass( 'btn-secondary' ) ) {
            $( this ) .on( 'click', () => {
                loginModal .modal( 'hide' );
            });
        }
        if( $( this ) .hasClass( 'btn-primary' ) ) {
            $( this ) .on( 'click', () => {
                console .log( `Data sent` );
                
                $( location ) .attr( 'href', homePageURL );
            });
        }

    });
    
    /** Reserve launch modal buttons */
    reserveModalButtons .each( function() {

        if( $( this ) .hasClass( 'close' ) || $( this ) .hasClass( 'btn-secondary' ) ) {
            $( this ) .on( 'click', () => {
                reserveModal .modal( 'hide' );
            });
        }
        if( $( this ) .hasClass( 'btn-primary' ) ) {
            $( this ) .on( 'click', () => {
                console .log( `Data sent` );
                
                $( location ) .attr( 'href', homePageURL );
            });
        }

    });      

    /** Setup Carousel Component */
    $( '#carousel-component' ) .carousel({
        interval: 2000
    });
    /** Control Button */
    $( '#carousel-button' ) .on( 'click', function() {
        if( $( '#carousel-button' ) .children( 'span' ) .hasClass( 'fa-pause' ) ) {
            console .log( 'pause' );
            $( '#carousel-component' ) .carousel( 'pause' );
            $( '#carousel-button' ) .children( 'span' ) .removeClass( 'fa-pause' );
            $( '#carousel-button' ) .children( 'span' ) .addClass( 'fa-play' );
        } 
        else if( $( '#carousel-button' ) .children( 'span' ) .hasClass( 'fa-play' ) ) {
            console .log( 'cycle' );
            $( '#carousel-component' ) .carousel( 'cycle' );
            $( '#carousel-button' ) .children( 'span' ) .removeClass( 'fa-play' );
            $( '#carousel-button' ) .children( 'span' ) .addClass( 'fa-pause' );
        }

    });
});