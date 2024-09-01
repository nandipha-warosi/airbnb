import React from 'react'

import LocationDetails from '../LocationDetails/LocationDetails'
import Reviews from './Reviews'
import HostSection from './HostSection'
import ThingsToKnow from './ThingsToKnow'
import LocationDetailsHeader from '../LocationDetails/LocationDetailsHeader'

const Listing = () => {
  return (
    <div>
      <LocationDetailsHeader />
      <LocationDetails />
      <Reviews/>
      <HostSection />
      <ThingsToKnow />
    </div>
  )
}

export default Listing