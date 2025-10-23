// "use client";
// import { Slider } from "@/components/ui/slider";
// import { useState } from "react";

// export default function ZoningPopUp() {
//   const [zonedUnits, setZonedUnits] = useState([20, 100]);
//   const [listPrice, setListPrice] = useState([100000, 5000000]);
//   const [potentialPerUnit, setPotentialPerUnit] = useState([2000, 200000]);
//   const [daysOnMarket, setDaysOnMarket] = useState([0, 180]);

//   const formatCurrency = (val) => {
//     if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M+`;
//     if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
//     return `$${val}`;
//   };

//   // const { control, handleSubmit, reset, watch } = useForm({
//   //   defaultValues: {
//   //     favorites: false,
//   //     propertyType: 'all',
//   //     zonedUnits: [20, 100],
//   //     listPrice: [100000, 5000000],
//   //     potentialPerUnit: [2000, 200000]
//   //   }
//   // });

//   // const onSubmit = (data) => {
//   //   console.log('Form Data:', data);
//   //   alert(JSON.stringify(data, null, 2));
//   // };

//   // const onClear = () => {
//   //   reset();
//   // };

//   // // Watch values for display
//   // const ZonedUnits = watch('zonedUnits');
//   // const ListPrice = watch('listPrice');
//   // const PotentialPerUnit = watch('potentialPerUnit');

//   return (
//     <div>
//        <div>
//             {/*top Checkboxes */}
//         {/* <div className="flex flex-wrap gap-4 text-sm mb-4 bg-white rounded-full justify-center p-3 shadow-lg">
//           {[
//             "Solid Listing",
//             "Reviewed",
//             "Exclusive Zones",
//             "Show Alert Mp",
//           ].map((label) => (
//             <label key={label} className="flex items-center gap-1">
//               <input type="checkbox" className="accent-black w-5 h-5" />
//               {label}
//             </label>
//           ))}
//         </div> */}
//        </div>
//       <div className="w-full max-w-3xl p-4 bg-white rounded-lg shadow-lg">
//         {/* Checkboxes */}
//         <div className="flex flex-wrap gap-4 text-sm mb-4">
//           {[
//             //"Missing Data",
//             "Favorites",
//             //"Business Rule Matches",
//             //"Newly Listed",
//             //"Normal Listings",
//           ].map((label) => (
//             <label key={label} className="flex items-center gap-1 font-semibold text-2xl">
//               <input type="checkbox" className="accent-black text-2xl" />
//               {label}
//             </label>
//           ))}
//         </div>

//         {/* Property Type */}
//         <div className="mb-6 flex items-center gap-5">
//           <p className="font-semibold ">Property Type:</p>
//           <div className="flex gap-6 text-sm">
//             <label className="flex items-center gap-1">
//               <input className="accent-black" type="radio" name="type" defaultChecked /> All
//             </label>
//             <label className="flex items-center gap-1">
//               <input className="accent-black" type="radio" name="type" /> Multi-Family
//             </label>
//             <label className="flex items-center gap-1">
//               <input className="accent-black" type="radio" name="type" /> Land
//             </label>
//             <label className="flex items-center gap-1">
//               <input className="accent-black" type="radio" name="type" /> Condo
//             </label>
//             <label className="flex items-center gap-1">
//               <input className="accent-black" type="radio" name="type" /> Townhouse
//             </label>
//             <label className="flex items-center gap-1">
//               <input className="accent-black" type="radio" name="type" /> Single Family
//             </label>
//           </div>
//         </div>

//         {/* Sliders */}
//         <div className="space-y-8">
//           {/* Zoned Units */}
//           <div>
//             <p className="text-center mb-2 font-medium">Zoned Units</p>
//             <div className="flex justify-between text-xs font-bold">
//               <span>{formatCurrency(zonedUnits[0])}</span>
//               <span>$100+</span>
//             </div>
//             <Slider
//               className={"mt-2"}
//               defaultValue={[0, 180]}
//               max={100}
//               min={20}
//               step={1}
//               value={zonedUnits}
//               onValueChange={setZonedUnits}
//             />
//           </div>

//           {/* List Price */}
//           <div>
//             <p className="text-center mb-2 font-medium">List Price</p>
//             <div className="flex justify-between text-xs font-bold">
//               <span>{formatCurrency(listPrice[0])}</span>
//               <span>$5M+</span>
//             </div>
//             <Slider
//               className={"mt-2"}
//               defaultValue={[100000, 5000000]}
//               max={5000000}
//               min={100000}
//               step={1}
//               value={listPrice}
//               onValueChange={setListPrice}
//             />
//           </div>

//           {/* Potential $ Per Unit */}
//           <div>
//             <p className="text-center mb-2 font-medium">
//               Existing Potential $ Per Unit
//             </p>
//             <div className="flex justify-between text-xs font-bold">
//               <span>{formatCurrency(potentialPerUnit[0])}</span>
//               <span>$200K+</span>
//             </div>
//             <Slider
//               className={"mt-2"}
//               defaultValue={[2000, 200000]}
//               max={200000}
//               min={2000}
//               step={1}
//               onValueChange={setPotentialPerUnit}
//             />
//           </div>

//           {/* Days on Market */}
//           {/* <div>
//             <p className="text-center mb-2 font-medium">Days on Market</p>
//             <div className="flex justify-between text-xs font-bold">
//               <span>{daysOnMarket[0]} Days</span>
//               <span>180+ Days</span>
//             </div>
//             <Slider
//               className={"mt-2"}
//               defaultValue={[0, 180]}
//               max={180}
//               min={0}
//               step={1}
//               onValueChange={setDaysOnMarket}
//             />
//             <input
//             type="range"
//             min="0"
//             max="180"
//             step="1"
//             value={daysOnMarket[0]}
//             onChange={(e) => setDaysOnMarket([+e.target.value, 180])}
//             className="w-full accent-black"
//           />
//           </div> */}




//         </div>

//         {/* Buttons */}
//         <div className="flex justify-between mt-6">
//           <button className="border border-black rounded-lg px-6 py-2 font-medium hover:bg-gray-100">
//             Clear
//           </button>
//           <button className="bg-black text-white rounded-lg px-6 py-2 font-medium hover:bg-gray-800">
//             Apply
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }









"use client";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

export default function ZoningPopUp({ properties, setProperties, setSmallPopUp }) {
  const [zonedUnits, setZonedUnits] = useState([20, 100]);
  const [listPrice, setListPrice] = useState([100000, 5000000]);
  const [potentialPerUnit, setPotentialPerUnit] = useState([2000, 200000]);
  const [daysOnMarket, setDaysOnMarket] = useState([0, 180]);

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      favorites: false,
      propertyType: "all",
      zonedUnits: [20, 100],
      listPrice: [100000, 5000000],
      potentialPerUnit: [2000, 200000],
    },
  });

  const formatCurrency = (val) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M+`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
    return `$${val}`;
  };

  const onSubmit = async(data) => {
    console.log("Form Data:", data);
    const lower = data.listPrice[0];
    const higher = data.listPrice[1];
    // console.log(lower);
    //alert(JSON.stringify(data, null, 2));
    const propertyType = data.propertyType;
    const filtered = properties.filter(property => {
      if (property.home_type.toLowerCase() == propertyType.toLowerCase() && (property.price >= lower && property.price <= higher))
        return property;
    });
    setProperties(filtered);

    // try {
    //   const res = await fetch(`http://10.10.12.51:4000/api/v1/realstate/listings/?home_type=${properties.home_type}`);
    //   const datas = await res.json();
    //   //const results = Array.isArray(datas?.results) ? datas.results : [];
    //   setProperties(datas);
    //   if (datas.length > 0) {
    //     const first = datas[0];
    //     const lat = Number(first.latitude);
    //     const lng = Number(first.longitude);
    //     if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
    //       setMapCenter({ lat, lng });
    //     }
    //   }
    // } catch (err) {
    //   console.error("Error fetching properties:", err);
    // }
  };

  const onClear = () => {
    reset();
    setZonedUnits([20, 100]);
    setListPrice([100000, 5000000]);
    setPotentialPerUnit([2000, 200000]);
  };

  return (
    <div>
      <div>
        {/*top Checkboxes */}
        {/* <div className="flex flex-wrap gap-4 text-sm mb-4 bg-white rounded-full justify-center p-3 shadow-lg">
          {[
            "Solid Listing",
            "Reviewed",
            "Exclusive Zones",
            "Show Alert Mp",
          ].map((label) => (
            <label key={label} className="flex items-center gap-1">
              <input type="checkbox" className="accent-black w-5 h-5" />
              {label}
            </label>
          ))}
        </div> */}
      </div>
      <div className="w-full max-w-3xl p-4 bg-white rounded-lg shadow-lg">
        {/* Checkboxes */}
        <div className="flex flex-wrap gap-4 text-sm mb-4">
          {/* {[
            //"Missing Data",
            //"Favorites",
            //"Business Rule Matches",
            //"Newly Listed",
            //"Normal Listings",
          ].map((label) => (
            <label
              key={label}
              className="flex items-center gap-1 font-semibold text-2xl"
            >
              <Controller
                name="favorites"
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    className="accent-black text-2xl"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {label}
            </label>
          ))} */}
        </div>

        {/* Property Type */}
        <div className="mb-6 flex items-center gap-5">
          <p className="font-semibold ">Property Type:</p>
          <div className="flex gap-6 text-sm">
            <Controller
              name="propertyType"
              control={control}
              render={({ field }) => (
                <>
                  <label className="flex items-center gap-1">
                    <input
                      className="accent-black"
                      type="radio"
                      name="type"
                      value="all"
                      checked={field.value === "all"}
                      onChange={() => field.onChange("all")}
                    />{" "}
                    All
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      className="accent-black"
                      type="radio"
                      name="type"
                      value="multi_family"
                      checked={field.value === "multi_family"}
                      onChange={() => field.onChange("multi_family")}
                    />{" "}
                    Multi-Family
                  </label>
                  {/* <label className="flex items-center gap-1">
                    <input
                      className="accent-black"
                      type="radio"
                      name="type"
                      value="land"
                      checked={field.value === "land"}
                      onChange={() => field.onChange("land")}
                    />{" "}
                    Land
                  </label> */}
                  <label className="flex items-center gap-1">
                    <input
                      className="accent-black"
                      type="radio"
                      name="type"
                      value="condo"
                      checked={field.value === "condo"}
                      onChange={() => field.onChange("condo")}
                    />{" "}
                    Condo
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      className="accent-black"
                      type="radio"
                      name="type"
                      value="townhouse"
                      checked={field.value === "townhouse"}
                      onChange={() => field.onChange("townhouse")}
                    />{" "}
                    Townhouse
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      className="accent-black"
                      type="radio"
                      name="type"
                      value="single_family"
                      checked={field.value === "single_family"}
                      onChange={() => field.onChange("single_family")}
                    />{" "}
                    Single Family
                  </label>
                </>
              )}
            />
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-8">
          {/* Zoned Units */}
          <div>
            <p className="text-center mb-2 font-medium">Zoned Units</p>
            <div className="flex justify-between text-xs font-bold">
              <span>{formatCurrency(zonedUnits[0])}</span>
              <span>$100+</span>
            </div>
            <Controller
              name="zonedUnits"
              control={control}
              render={({ field }) => (
                <Slider
                  className={"mt-2"}
                  defaultValue={[0, 180]}
                  max={100}
                  min={20}
                  step={1}
                  value={zonedUnits}
                  onValueChange={(val) => {
                    setZonedUnits(val);
                    field.onChange(val);
                  }}
                />
              )}
            />
          </div>

          {/* List Price */}
          <div>
            <p className="text-center mb-2 font-medium">List Price</p>
            <div className="flex justify-between text-xs font-bold">
              <span>{formatCurrency(listPrice[0])}</span>
              <span>$5M+</span>
            </div>
            <Controller
              name="listPrice"
              control={control}
              render={({ field }) => (
                <Slider
                  className={"mt-2"}
                  defaultValue={[100000, 5000000]}
                  max={5000000}
                  min={100000}
                  step={1}
                  value={listPrice}
                  onValueChange={(val) => {
                    setListPrice(val);
                    field.onChange(val);
                  }}
                />
              )}
            />
          </div>

          {/* Potential $ Per Unit */}
          <div>
            <p className="text-center mb-2 font-medium">
              Existing Potential $ Per Unit
            </p>
            <div className="flex justify-between text-xs font-bold">
              <span>{formatCurrency(potentialPerUnit[0])}</span>
              <span>$200K+</span>
            </div>
            <Controller
              name="potentialPerUnit"
              control={control}
              render={({ field }) => (
                <Slider
                  className={"mt-2"}
                  defaultValue={[2000, 200000]}
                  max={200000}
                  min={2000}
                  step={1}
                  onValueChange={(val) => {
                    setPotentialPerUnit(val);
                    field.onChange(val);
                  }}
                />
              )}
            />
          </div>

          {/* Days on Market */}
          {/* <div>
            <p className="text-center mb-2 font-medium">Days on Market</p>
            <div className="flex justify-between text-xs font-bold">
              <span>{daysOnMarket[0]} Days</span>
              <span>180+ Days</span>
            </div>
            <Slider
              className={"mt-2"}
              defaultValue={[0, 180]}
              max={180}
              min={0}
              step={1}
              onValueChange={setDaysOnMarket}
            />
            <input
            type="range"
            min="0"
            max="180"
            step="1"
            value={daysOnMarket[0]}
            onChange={(e) => setDaysOnMarket([+e.target.value, 180])}
            className="w-full accent-black"
          />
          </div> */}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onClear}
            className="border border-black rounded-lg px-6 py-2 font-medium hover:bg-gray-100
            cursor-pointer"
          >
            Clear
          </button>
          <button
            onClick={() => {
              handleSubmit(onSubmit)();
              setSmallPopUp(false);
            }}
            className="bg-black text-white rounded-lg px-6 py-2 font-medium hover:bg-gray-800
            cursor-pointer"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}