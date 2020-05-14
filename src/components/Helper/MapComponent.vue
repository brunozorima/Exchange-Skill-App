<template>
  <div id="map">I am a map</div>
</template>

<script>
import $Scriptjs from 'scriptjs';
import { eventBus } from '../eventbus';

export default {
  data(){
    return {
      map: null,
      DEFAULT_LAT: 40.700,
      DEFAULT_LNG: -75.335
    }
  },
  mounted(){
    $Scriptjs("http://maps.googleapis.com/maps/api/js?key=AIzaSyDYgkIlfD0aKYc3LK9Hahmoa7aogKx8rlA&libraries=geometry,places",
    () => {this.initMap();});
    eventBus.$emit('googleInit', {});
  },
  methods:{
    initMap(){
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat:this.DEFAULT_LAT,
          lng:this.DEFAULT_LNG 
        },
        zoom:15,
        gestureHandLing: "greedy"
      });

      google.maps.event.addListener(this.map, "click", (event) => {
          this.lastLat = event.latLng.lat();
          this.lastLng = event.latLng.lng();
          this.updateMarker(event.latLng);

          // stripped down example - needs error checking - we will fill this in
          this.geocoder.geocode({'location': event.latLng}, (results, status) => {
            // showing how you would grab the first address...
            const firstAddress = results[0].formatted_address;

            eventBus.$emit('mapAddress', results);
          });

      });
    },
     updateMarker(latLng){
      if(!this.marker){
        this.marker = new google.maps.Marker({
          map: this.map
        });
      }

      this.marker.setPosition(latLng);

    }
  }

}
</script>

<style scoped>
#map{
  width:50vw;
  height:30vw;
}
</style>>