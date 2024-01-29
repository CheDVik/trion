	ymaps.ready(init);
    function init(){
        // Создание карты.
		var zooom = window.screen.width > 720 ? 17.0 : 16;
        var myMap = new ymaps.Map("map", {
            center:  [55.866239, 37.579911],
            zoom: zooom,
			controls: []
        }, {
        suppressMapOpenBlock: true,
		yandexMapDisablePoiInteractivity: true
    }),
        myPlacemark1 = new ymaps.Placemark(
			[55.86684, 37.57833], {
            hintContent: 'Склад Трион'
        }, { 
			iconLayout: 'default#image',
            iconImageHref: 'images/core/balloon.svg',
            iconImageSize: [27, 40],
            iconImageOffset: [-13, -40]
       });
	
var myPolyline = new ymaps.Polyline([
            
            [55.86580940859078,37.58339838936895],
			[55.86594967743484,37.58226381495563],
            [55.86598647544492,37.58175481815023],
            [55.86629657670192,37.58160935595598],
            [55.86636787558061,37.58153286535423],
			[55.866417236583075,37.581435012369994],
			[55.866447401489744,37.58126335099305],
			[55.866425531923674,37.580793964415435],
			[55.866362728070605,37.580203908867254],
			[55.86641551672102,37.57908810991708],
			[55.8665090278727,37.578192252106085],
			[55.866647031823696,37.57824321407734]
        ], {
            balloonContent: "Как пройти"
        }, {
            balloonCloseButton: false,
            strokeColor: "#e70000",
            strokeWidth: 5,
            strokeOpacity: 0.5
        });
		
		 myMap.controls.add('zoomControl');
		
		myMap.geoObjects.add(myPlacemark1)
						.add(myPolyline);
    }