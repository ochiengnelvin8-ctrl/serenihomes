'use client'

import {
  GoogleMap,
  LoadScript,
  Marker
} from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '400px'
}

const center = {
  lat: -1.286389,
  lng: 36.817223
}

export default function PropertyMap() {

  return (

    <LoadScript
      googleMapsApiKey={
        process.env
          .NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
      }
    >

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >

        <Marker position={center} />

      </GoogleMap>

    </LoadScript>
  )
}