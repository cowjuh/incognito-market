import { Tag } from "@prisma/client";
import { useEffect, useState } from "react";
import { getAllTags } from "services/api/tags";

const FilterPanel = () => {
    const [allTags, setAllTags] = useState<Tag[]>([]);

    useEffect(() => {
        getAllTags().then((tags) => {
            setAllTags(tags);
        });
    }, []);

    return (
        <div className="w-[20%] max-w-[400px] min-w-[250px] p-4">
            <h3 className="font-medium text-neutral-400">CATEGORIES</h3>
            {allTags.map((tag) => (
                <div key={tag.id}>{tag.name}</div>
            ))}
        </div>
    )
}

export default FilterPanel;