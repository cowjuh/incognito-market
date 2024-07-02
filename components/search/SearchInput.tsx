import React, { useState } from "react";
import { useRouter } from "next/router";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

type Filters = {
    city?: string;
    country?: string;
    averageRating?: number;
};

type SearchInputProps = {
    initialTerm?: string;
    initialFilters?: Filters;
};

const SearchInput: React.FC<SearchInputProps> = ({ initialTerm = "", initialFilters = {} }) => {
    const [searchTerm, setSearchTerm] = useState(initialTerm);
    const [filters, setFilters] = useState<Filters>(initialFilters);
    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push({
            pathname: '/shops',
            query: { term: searchTerm, ...filters },
        });
    };

    return (
        <form onSubmit={handleSearch} className="flex gap-2">
            <Input
                type="text"
                placeholder="Search shops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border rounded min-w-[200px] shadow-none"
            />
            <Button type="submit" variant="outline"><MagnifyingGlassIcon className="w-4 h-4" /></Button>
            {/* <div className="flex gap-2">
                <Input
                    type="text"
                    placeholder="City"
                    value={filters.city || ""}
                    onChange={(e) => setFilters((prev) => ({ ...prev, city: e.target.value }))}
                    className="p-2 border rounded"
                />
                <Input
                    type="text"
                    placeholder="Country"
                    value={filters.country || ""}
                    onChange={(e) => setFilters((prev) => ({ ...prev, country: e.target.value }))}
                    className="p-2 border rounded"
                />
                <Input
                    type="number"
                    placeholder="Minimum Rating"
                    value={filters.averageRating || ""}
                    onChange={(e) => setFilters((prev) => ({ ...prev, averageRating: Number(e.target.value) }))}
                    className="p-2 border rounded"
                />
                <Button type="submit">Search</Button>
            </div> */}
        </form>
    );
};

export default SearchInput;
