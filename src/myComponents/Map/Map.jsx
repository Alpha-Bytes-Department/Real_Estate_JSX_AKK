import React from 'react';

const Map = () => {
    return (
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}>
        <Map
          style={{ borderRadius: "20px" }}
          defaultZoom={13}
          defaultCenter={markerLocation}
          gestureHandling={"greedy"}
          disableDefaultUI
        >
          <Marker
            position={markerLocation}
            onClick={() => setSmallPopUp(true)}
          />
          {smallPopUp && (
            <InfoWindow
              position={markerLocation}
              onCloseClick={() => setSmallPopUp(false)}
            >
              <div
                className="w-full max-w-[250px] h-[250px]"
                onClick={() => setBigPopUp(true)}
              >
                <div className="w-full h-[60%] relative">
                  <Image
                    src="/saved-properties-1.jpg"
                    alt="pop-up-house"
                    fill
                  />
                </div>
                <div className="w-full h-[40%] ">
                  <h1 className="font-semibold font-poppins text-[#000000] text-2xl">
                    $199,999
                  </h1>
                  <p className="font-poppins text-[#000000]">
                    3 beds | 2 bathrooms | 2611 sqft - House for sale
                  </p>
                  <p className="font-poppins text-[#000000]">
                    6515 Belair Road (MDFS35424512)
                  </p>
                </div>
                <Link
                  href="/property-details"
                  className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
                >
                  View Details
                </Link>
              </div>
            </InfoWindow>
          )}
        </Map>
        {bigPopUp && <PropertyDetails />}
      </APIProvider>
    );
};

export default Map;