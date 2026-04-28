"use client";

import React, { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchLocation } from "../actions";

interface SearchResult {
    place_id: number;
    lat: string;
    lon: string;
    display_name: string;
}

interface LocationInputProps {
    placeholder: string;
    value?: string;
    onChange?: (value: string) => void;
    onLocationSelect?: (lat: number, lon: number, displayName: string) => void;
    className?: string;
}

export function LocationInput({
    placeholder,
    value: controlledValue,
    onChange,
    onLocationSelect,
    className
}: LocationInputProps) {
    const [internalValue, setInternalValue] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchTimeout = useRef<NodeJS.Timeout | null>(null);

    // Handle controlled vs uncontrolled
    const value = controlledValue !== undefined ? controlledValue : internalValue;
    const setValue = (newValue: string) => {
        setInternalValue(newValue);
        if (onChange) onChange(newValue);
    };

    useEffect(() => {
        if (value.length < 3) {
            setResults([]);
            setShowResults(false);
            return;
        }

        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        searchTimeout.current = setTimeout(async () => {
            setLoading(true);
            try {
                const data = await searchLocation(value);
                setResults(data);
                setShowResults(true);
            } catch (error) {
                console.error("Search failed:", error);
            } finally {
                setLoading(false);
            }
        }, 500); // Debounce search

        return () => {
            if (searchTimeout.current) clearTimeout(searchTimeout.current);
        };
    }, [value]);

    const handleSelectLocation = (result: SearchResult) => {
        setValue(result.display_name);
        setShowResults(false);
        if (onLocationSelect) {
            onLocationSelect(parseFloat(result.lat), parseFloat(result.lon), result.display_name);
        }
    };

    return (
        <div className="relative">
            <Input
                placeholder={placeholder}
                className={className}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => {
                    if (results.length > 0) setShowResults(true);
                }}
                onBlur={() => {
                    // Delay hiding results to allow clicking on them
                    setTimeout(() => setShowResults(false), 200);
                }}
            />
            {loading && (
                <div className="absolute right-3 top-3">
                    <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                </div>
            )}
            {showResults && results.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {results.map((result) => (
                        <button
                            key={result.place_id}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 border-b border-gray-50 last:border-0"
                            onMouseDown={(e) => {
                                e.preventDefault(); // Prevent blur
                                handleSelectLocation(result);
                            }}
                        >
                            {result.display_name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
