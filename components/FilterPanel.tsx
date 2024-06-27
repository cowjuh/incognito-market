import { Tag } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAllTags } from "services/api/tags";

const FilterPanel = () => {
    const [allTags, setAllTags] = useState<Tag[]>([]);
    const router = useRouter();

    useEffect(() => {
        getAllTags().then((tags) => {
            setAllTags(tags);
        });
    }, []);

    const handleClickTag = (tag: Tag) => {
        const slug = tag.name.toLowerCase().replace(/\s+/g, '-');
        router.push(`/tag/${slug}`);
    }

    return (
        <div className="w-[20%] max-w-[400px] min-w-[250px] p-4">
            <h3 className="font-medium text-neutral-400">CATEGORIES</h3>
            {allTags.map((tag) => (
                <div key={tag.id} onClick={() => handleClickTag(tag)}>{tag.name}</div>
            ))}
        </div>
    )
}

export default FilterPanel;