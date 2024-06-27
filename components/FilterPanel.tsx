import { Tag } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAllTags } from "services/api/tags";
import { cn } from "./lib/utils";

const tagNameToSlug = (tagName: string) => {
    return tagName.toLowerCase().replace(/\s+/g, '-');
}

const FilterPanel = () => {
    const [allTags, setAllTags] = useState<Tag[]>([]);
    const router = useRouter();
    const isTagPage = router.pathname.startsWith('/tag');
    const slug = router.query.slug as string;

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
        <div className="w-[20%] max-w-[400px] min-w-[250px] p-4 flex flex-col gap-2">
            <h3 className="font-medium text-neutral-400">CATEGORIES</h3>
            {allTags.map((tag) => {
                const isHighlighted = isTagPage && tagNameToSlug(tag.name) === slug;
                return (
                    <div
                        key={tag.id}
                        onClick={() => handleClickTag(tag)}
                        className={cn(
                            'cursor-pointer hover:font-semibold py-1 px-2 rounded-md',
                            isHighlighted ? 'bg-neutral-200 font-semibold' : ''
                        )}
                    >{tag.name}</div>

                )
            }

            )}
        </div>
    )
}

export default FilterPanel;