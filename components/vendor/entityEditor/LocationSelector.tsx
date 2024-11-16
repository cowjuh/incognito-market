import React, { memo, useCallback, useMemo, useState, useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { useVirtualizer } from '@tanstack/react-virtual';

// Lazy load the location data
const getLocationData = () => {
  const { Country, State, City } = require('country-state-city');
  return { Country, State, City };
};

// Cache for location data
const locationCache = {
  countries: null,
  states: {},
  cities: {},
  // Add name mappings cache
  countryNames: {},
  stateNames: {},
};

const LocationSelectorInner = () => {
  const form = useFormContext();
  const [isLoading, setIsLoading] = useState(true);
  const [locationData, setLocationData] = useState(null);
  
  // Initialize with form values
  const initialCountry = form.getValues("country") || "";
  const initialState = form.getValues("state") || "";
  const initialCity = form.getValues("city") || "";
  
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [selectedState, setSelectedState] = useState(initialState);
  const [selectedCity, setSelectedCity] = useState(initialCity);

  // Function to get country name from code
  const getCountryName = useCallback((code) => {
    if (!code) return "";
    if (!locationCache.countryNames[code]) {
      const country = locationCache.countries?.find(c => c.isoCode === code);
      locationCache.countryNames[code] = country?.name || code;
    }
    return locationCache.countryNames[code];
  }, []);

  // Function to get state name from code
  const getStateName = useCallback((countryCode, stateCode) => {
    if (!countryCode || !stateCode) return "";
    const key = `${countryCode}-${stateCode}`;
    if (!locationCache.stateNames[key]) {
      const state = locationCache.states[countryCode]?.find(s => s.isoCode === stateCode);
      locationCache.stateNames[key] = state?.name || stateCode;
    }
    return locationCache.stateNames[key];
  }, []);

  // Load location data and initialize defaults
  useEffect(() => {
    const loadData = async () => {
      if (!locationCache.countries) {
        const { Country } = getLocationData();
        locationCache.countries = Country.getAllCountries();
      }

      if (initialCountry) {
        const { State } = getLocationData();
        locationCache.states[initialCountry] = State.getStatesOfCountry(initialCountry);
        
        if (initialState) {
          const { City } = getLocationData();
          const cacheKey = `${initialCountry}-${initialState}`;
          locationCache.cities[cacheKey] = City.getCitiesOfState(initialCountry, initialState);
        }
      }

      setLocationData({
        countries: locationCache.countries,
        states: locationCache.states[initialCountry] || [],
        cities: locationCache.cities[`${initialCountry}-${initialState}`] || [],
      });
      setIsLoading(false);
    };
    loadData();
  }, [initialCountry, initialState]);

  // Get states for selected country
  const states = useMemo(() => {
    if (!selectedCountry) return [];
    if (!locationCache.states[selectedCountry]) {
      const { State } = getLocationData();
      locationCache.states[selectedCountry] = State.getStatesOfCountry(selectedCountry);
    }
    return locationCache.states[selectedCountry];
  }, [selectedCountry]);

  // Get cities for selected state
  const cities = useMemo(() => {
    if (!selectedState || !selectedCountry) return [];
    const cacheKey = `${selectedCountry}-${selectedState}`;
    if (!locationCache.cities[cacheKey]) {
      const { City } = getLocationData();
      locationCache.cities[cacheKey] = City.getCitiesOfState(selectedCountry, selectedState);
    }
    return locationCache.cities[cacheKey];
  }, [selectedCountry, selectedState]);

  const handleCountryChange = useCallback((value: string) => {
    setSelectedCountry(value);
    setSelectedState("");
    form.setValue("country", value, { shouldValidate: true });
    form.setValue("state", "", { shouldValidate: true });
    form.setValue("city", "", { shouldValidate: true });
  }, [form]);

  const handleStateChange = useCallback((value: string) => {
    setSelectedState(value);
    form.setValue("state", value, { shouldValidate: true });
    form.setValue("city", "", { shouldValidate: true });
  }, [form]);

  const handleCityChange = useCallback((value: string) => {
    form.setValue("city", value, { shouldValidate: true });
  }, [form]);

  if (isLoading) {
    return <div className="flex items-center justify-center p-4">Loading locations...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <FormItem className="flex-grow">
        <FormLabel>Country</FormLabel>
        <Select 
          value={selectedCountry} 
          onValueChange={handleCountryChange}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select country">
                {getCountryName(selectedCountry)}
              </SelectValue>
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <VirtualizedOptions 
              items={locationData?.countries || []} 
              getValue={(item) => item.isoCode}
              getLabel={(item) => item.name}
            />
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>

      <FormItem className="flex-grow">
        <FormLabel>State/Province</FormLabel>
        <Select 
          value={selectedState} 
          onValueChange={handleStateChange}
          disabled={!selectedCountry}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select state">
                {getStateName(selectedCountry, selectedState)}
              </SelectValue>
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <VirtualizedOptions 
              items={states}
              getValue={(item) => item.isoCode}
              getLabel={(item) => item.name}
            />
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>

      <FormItem className="flex-grow">
        <FormLabel>City</FormLabel>
        <Select 
          value={selectedCity} 
          onValueChange={handleCityChange}
          disabled={!selectedState}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select city">
                {selectedCity}
              </SelectValue>
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <VirtualizedOptions 
              items={cities}
              getValue={(item) => item.name}
              getLabel={(item) => item.name}
            />
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </div>
  );
};

const VirtualizedOptions = memo(({ 
  items, 
  getValue, 
  getLabel 
}: { 
  items: any[],
  getValue: (item: any) => string,
  getLabel: (item: any) => string
}) => {
  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 5,
  });

  return (
    <div 
      ref={parentRef} 
      className="h-[300px] overflow-auto"
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const item = items[virtualRow.index];
          return (
            <SelectItem
              key={getValue(item)}
              value={getValue(item)}
              className="absolute top-0 left-0 w-full"
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {getLabel(item)}
            </SelectItem>
          );
        })}
      </div>
    </div>
  );
});

VirtualizedOptions.displayName = 'VirtualizedOptions';

const LocationSelector = memo(() => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-medium">Location</h2>
      <LocationSelectorInner />
    </div>
  );
});

LocationSelector.displayName = 'LocationSelector';

export default LocationSelector;