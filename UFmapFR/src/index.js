
        // The value for 'accessToken' begins with 'pk...'
        mapboxgl.accessToken = 
        'pk.eyJ1IjoibWttZCIsImEiOiJjajBqYjJpY2owMDE0Mndsbml0d2V1ZXczIn0.el8wQmA-TSJp2ggX8fJ1rA';
        const map = new mapboxgl.Map({
            container: 'map', //container id
            // Replace YOUR_STYLE_URL with your style URL.
            style: 'mapbox://styles/mkmd/cleh8ifcj000u01pm695fh63l', // UF(FR) from OECD mapbox account
            center: [2, 13.5],
            zoom: 4,
        });

        /*
          Create a popup, specify its options
          and properties, and add it to the map.
        */
        const popup = new mapboxgl.Popup({
            className: "MBpopup",
            closeButton: false,
            closeOnClick: false,
            maxWidth: 200,
        });

    //Add an event listener that runs when a user hovers on the map element: Elongation
        map.on('mouseenter', 'Etalement', (e) => {
            // change the cursor style as a UI indicator
            map.getCanvas().style.cursor = 'pointer';
            // Copy coordinates array
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = 
                `<strong style="color:white">${e.features[0].properties.Agglomeration_Name}</strong>
                <p style="color:white; font-size: 90%">
                    Étalement: ${e.features[0].properties.Sprawl.toFixed(2)}<br> 
                    Allongement: ${e.features[0].properties.Elongation.toFixed(2)}<br>
                    Groupe de la taille de la ville: ${e.features[0].properties.CityGroup}<br>
                    Zone bâtie: ${e.features[0].properties.Perc_Build.toFixed(1)} %<br>
                    Empreinte moyenne des bâtiments: ${((e.features[0].properties.MeanBuildingArea)*1000000).toFixed(1)} \u33A1<br>
                    Hauteur moyenne des bâtiments: ${e.features[0].properties.Av_Height.toFixed(1)} m<br>
                    Longueur moyenne des rues: ${e.features[0].properties.street_length_avg.toFixed(1)} m<br>
                    Densité d'intersection: ${e.features[0].properties.int_density.toFixed(0)} int / \u33A2<br>
                    Population (2015): ${(e.features[0].properties.Pop2015 / 1000000).toFixed(2)} M<br>
                    <br>
                    <strong style="color:white; font-style: italic">Valeurs de référence:</strong><br>
                    Étalement, moyenne du pays: ${e.features[0].properties.Sprawl_CountryAve.toFixed(2)}<br>
                    Étalement, moyenne du groupe de taille de la ville: ${e.features[0].properties.Sprawl_CityGroupAve.toFixed(2)}<br>
                    Allongement, moyenne du pays: ${e.features[0].properties.Elong_CountryAve.toFixed(2)}<br>
                    Allongement, moyenne du groupe de taille de la ville: ${e.features[0].properties.Elong_CityGroupAve.toFixed(2)}
                </p>`

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            popup.setLngLat(coordinates).setHTML(description).addTo(map);
        });

        map.on('mouseleave', 'Etalement', () => {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });

    //Add an event listener that runs when a user hovers on the map element: Sprawl
        map.on('mouseenter', 'Allongement', (e) => {
            // change the cursor style as a UI indicator
            map.getCanvas().style.cursor = 'pointer';
            // Copy coordinates array
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = 
                `<strong style="color:white">${e.features[0].properties.Agglomeration_Name}</strong>
                <p style="color:white; font-size: 90%">
                    Étalement: ${e.features[0].properties.Sprawl.toFixed(2)}<br> 
                    Allongement: ${e.features[0].properties.Elongation.toFixed(2)}<br>
                    Groupe de la taille de la ville: ${e.features[0].properties.CityGroup}<br>
                    Zone bâtie: ${e.features[0].properties.Perc_Build.toFixed(1)} %<br>
                    Empreinte moyenne des bâtiments: ${((e.features[0].properties.MeanBuildingArea)*1000000).toFixed(1)} \u33A1<br>
                    Hauteur moyenne des bâtiments: ${e.features[0].properties.Av_Height.toFixed(1)} m<br>
                    Longueur moyenne des rues: ${e.features[0].properties.street_length_avg.toFixed(1)} m<br>
                    Densité d'intersection: ${e.features[0].properties.int_density.toFixed(0)} int / \u33A2<br>
                    Population (2015): ${(e.features[0].properties.Pop2015 / 1000000).toFixed(2)} M<br>
                    <br>
                    <strong style="color:white; font-style: italic">Valeurs de référence:</strong><br>
                    Étalement, moyenne du pays: ${e.features[0].properties.Sprawl_CountryAve.toFixed(2)}<br>
                    Étalement, moyenne du groupe de taille de la ville: ${e.features[0].properties.Sprawl_CityGroupAve.toFixed(2)}<br>
                    Allongement, moyenne du pays: ${e.features[0].properties.Elong_CountryAve.toFixed(2)}<br>
                    Allongement, moyenne du groupe de taille de la ville: ${e.features[0].properties.Elong_CityGroupAve.toFixed(2)}
                </p>`

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            popup.setLngLat(coordinates).setHTML(description).addTo(map);
        });

        map.on('mouseleave', 'Allongement', () => {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });
    
    //Add an event listener that runs when a user hovers on the map element.
        map.on('mousemove', 'uf-polygons', (e) => {
            // change the cursor style as a UI indicator
            map.getCanvas().style.cursor = 'pointer';
            
            const description = 
                `<strong style="color:white">${e.features[0].properties.Agglomeration_Name}</strong>
                <p style="color:white; font-size: 90%">
                    Étalement: ${e.features[0].properties.Sprawl.toFixed(2)}<br> 
                    Allongement: ${e.features[0].properties.Elongation.toFixed(2)}<br>
                    Groupe de la taille de la ville: ${e.features[0].properties.CityGroup}<br>
                    Zone bâtie: ${e.features[0].properties.Perc_Build.toFixed(1)} %<br>
                    Empreinte moyenne des bâtiments: ${((e.features[0].properties.MeanBuildingArea)*1000000).toFixed(1)} \u33A1<br>
                    Hauteur moyenne des bâtiments: ${e.features[0].properties.Av_Height.toFixed(1)} m<br>
                    Longueur moyenne des rues: ${e.features[0].properties.street_length_avg.toFixed(1)} m<br>
                    Densité d'intersection: ${e.features[0].properties.int_density.toFixed(0)} int / \u33A2<br>
                    Population (2015): ${(e.features[0].properties.Pop2015 / 1000000).toFixed(2)} M<br>
                    <br>
                    <strong style="color:white; font-style: italic">Valeurs de référence:</strong><br>
                    Étalement, moyenne du pays: ${e.features[0].properties.Sprawl_CountryAve.toFixed(2)}<br>
                    Étalement, moyenne du groupe de taille de la ville: ${e.features[0].properties.Sprawl_CityGroupAve.toFixed(2)}<br>
                    Allongement, moyenne du pays: ${e.features[0].properties.Elong_CountryAve.toFixed(2)}<br>
                    Allongement, moyenne du groupe de taille de la ville: ${e.features[0].properties.Elong_CityGroupAve.toFixed(2)}
                </p>`
            
            popup.setLngLat(e.lngLat).setHTML(description).addTo(map);
        });

        map.on('mouseleave', 'uf-polygons', () => {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });

    // Add button to toggle layers visibility
    // Enumerate ids for layers
    var toggleableLayerIds = ['Etalement', 'Allongement'];
    // Set up toggle button for each layer
    for (var i = 0; i < toggleableLayerIds.length; i++) {
        var id = toggleableLayerIds[i];

        var link = document.createElement('a');
        link.href = '#';
        link.className = '';
        link.textContent = id;

        link.onclick = function(e) {
            var clickedLayer = this.textContent;
            e.preventDefault();
            e.stopPropagation(); 
            for (var j = 0; j < toggleableLayerIds.length; j++) {
                if (clickedLayer === toggleableLayerIds[j]) {
                    layers.children[j].className = 'active';
                    map.setLayoutProperty(toggleableLayerIds[j], 'visibility', 'visible');
                }
                else {
                    layers.children[j].className = '';
                    map.setLayoutProperty(toggleableLayerIds[j], 'visibility', 'none');
                }
            }
        };

        var layers = document.getElementById('menu');
        layers.appendChild(link);  

    };  

    // Add a geocoding box to search places (cities)
    const geocoder = new MapboxGeocoder({
      // Initialize the geocoder
      accessToken: mapboxgl.accessToken, // Set the access token
      mapboxgl: mapboxgl, // Set the mapbox-gl instance
      marker: false, // Do not use the default marker style
      placeholder: "Chercher des villes á l'Afrique", // Placeholder text for the search bar
      bbox: [-30.234375,-36.597889,61.171875,39.095963], // Bounding box for Africa, search results will be limited to that area. (?)
      language: "fr",
      flyTo: {
        easing: function(t){
            return t;
        },
        zoom: 8, //to zoom to a specified level (not too much!)
      }, 
    });
    
    // Add the geocoder to the map
    map.addControl(geocoder);
    
    // Add fullscreen control
    map.addControl(new mapboxgl.FullscreenControl(), 'top-left');
    
    // Add zoom control ( + / -, reset orientation to North)
    map.addControl(new mapboxgl.NavigationControl({showCompass: false}), 'top-left');
    
    // Add a scale bar in metric units
    const scalebar = new mapboxgl.ScaleControl({
        maxWidth: 100,
        unit: 'metric'
    });
    
    map.addControl(scalebar);


