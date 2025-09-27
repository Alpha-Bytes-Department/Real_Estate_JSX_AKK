"use client";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export default function ZoningPopUp() {
  const [zonedUnits, setZonedUnits] = useState([20, 100]);
  const [listPrice, setListPrice] = useState([100000, 5000000]);
  const [potentialPerUnit, setPotentialPerUnit] = useState([2000, 200000]);
  const [daysOnMarket, setDaysOnMarket] = useState([0, 180]);

  const formatCurrency = (val) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M+`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
    return `$${val}`;
  };

  return (
    <div>
       <div>
            {/*top Checkboxes */}
        <div className="flex flex-wrap gap-4 text-sm mb-4 bg-white rounded-full justify-center p-3 shadow-lg">
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
        </div>
       </div>
      <div className="w-full max-w-3xl p-4 bg-white rounded-lg shadow-lg">
        {/* Checkboxes */}
        <div className="flex flex-wrap gap-4 text-sm mb-4">
          {[
            "Missing Data",
            "Favorites",
            "Business Rule Matches",
            "Newly Listed",
            "Normal Listings",
          ].map((label) => (
            <label key={label} className="flex items-center gap-1">
              <input type="checkbox" className="accent-black" />
              {label}
            </label>
          ))}
        </div>

        {/* Property Type */}
        <div className="mb-6 flex items-center gap-5">
          <p className="font-semibold mb-2">Property Type:</p>
          <div className="flex gap-6 text-sm">
            <label className="flex items-center gap-1">
              <input className="accent-black" type="radio" name="type" defaultChecked /> All
            </label>
            <label className="flex items-center gap-1">
              <input className="accent-black" type="radio" name="type" /> Multi-Family
            </label>
            <label className="flex items-center gap-1">
              <input className="accent-black" type="radio" name="type" /> Land
            </label>
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
            <Slider
              className={"mt-2"}
              defaultValue={[0, 180]}
              max={100}
              min={20}
              step={1}
              value={zonedUnits}
              onValueChange={setZonedUnits}
            />
          </div>

          {/* List Price */}
          <div>
            <p className="text-center mb-2 font-medium">List Price</p>
            <div className="flex justify-between text-xs font-bold">
              <span>{formatCurrency(listPrice[0])}</span>
              <span>$5M+</span>
            </div>
            <Slider
              className={"mt-2"}
              defaultValue={[100000, 5000000]}
              max={5000000}
              min={100000}
              step={1}
              value={listPrice}
              onValueChange={setListPrice}
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
            <Slider
              className={"mt-2"}
              defaultValue={[2000, 200000]}
              max={200000}
              min={2000}
              step={1}
              onValueChange={setPotentialPerUnit}
            />
          </div>

          {/* Days on Market */}
          <div>
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
            {/* <input
            type="range"
            min="0"
            max="180"
            step="1"
            value={daysOnMarket[0]}
            onChange={(e) => setDaysOnMarket([+e.target.value, 180])}
            className="w-full accent-black"
          /> */}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button className="border border-black rounded-lg px-6 py-2 font-medium hover:bg-gray-100">
            Clear
          </button>
          <button className="bg-black text-white rounded-lg px-6 py-2 font-medium hover:bg-gray-800">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
