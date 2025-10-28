"use client";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

export default function ZoningPopUp({
  properties,
  setProperties,
  setSmallPopUp,
}) {
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

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    const lower = data.listPrice[0];
    const higher = data.listPrice[1];
    const propertyType = data.propertyType;

    const filtered = properties.filter((property) => {
      const matchesType =
        propertyType.toLowerCase() === "all" ||
        (property.home_type &&
          property.home_type.toLowerCase() === propertyType.toLowerCase());

      const matchesPrice = property.price >= lower && property.price <= higher;

      const matchesZonedUnits =
        property.zoned_units >= data.zonedUnits[0] &&
        property.zoned_units <= data.zonedUnits[1];

      const matchesPotential =
        property.existing_potential_per_unit >= data.potentialPerUnit[0] &&
        property.existing_potential_per_unit <= data.potentialPerUnit[1];

      // ✅ Include property only if all conditions match
      return (
        matchesType && matchesPrice && matchesZonedUnits && matchesPotential
      );
    });

    console.log("Filtered Properties:", filtered);

    setProperties(filtered);
  };


  const onClear = () => {
    reset();
    setZonedUnits([20, 100]);
    setListPrice([100000, 5000000]);
    setPotentialPerUnit([2000, 200000]);
  };

  return (
    <div className="w-full px-4 md:px-0">
      <div>
      {/*top Checkboxes commented out section remains the same */}
      </div>
      <div className="w-[330px] md:w-full max-w-3xl p-2 md:p-4 bg-white rounded-lg shadow-lg mx-auto">
      {/* Property Type */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
        <p className="font-semibold">Property Type:</p>
        <div className="flex flex-wrap gap-4 md:gap-6 text-sm">
        <Controller
          name="propertyType"
          control={control}
          render={({ field }) => (
          <>
            <label className="flex items-center gap-1 min-w-[80px]">
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
            <label className="flex items-center gap-1 min-w-[120px]">
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
            <label className="flex items-center gap-1 min-w-[80px]">
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
            <label className="flex items-center gap-1 min-w-[100px]">
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
            <label className="flex items-center gap-1 min-w-[120px]">
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
      <div className="space-y-6 md:space-y-8">
        {/* Zoned Units */}
        <div>
        <p className="text-center mb-2 font-medium">Zoned Units</p>
        <div className="flex justify-between text-xs font-bold px-2">
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
        <div className="flex justify-between text-xs font-bold px-2">
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
        <div className="flex justify-between text-xs font-bold px-2">
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
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button
        onClick={onClear}
        className="border border-black rounded-lg px-4 md:px-6 py-2 font-medium hover:bg-gray-100
        cursor-pointer text-sm md:text-base"
        >
        Clear
        </button>
        <button
        onClick={() => {
          handleSubmit(onSubmit)();
          setSmallPopUp(false);
        }}
        className="bg-black text-white rounded-lg px-4 md:px-6 py-2 font-medium hover:bg-gray-800
        cursor-pointer text-sm md:text-base"
        >
        Apply
        </button>
      </div>
      </div>
    </div>
    );
}
