import { Avatar as ShadcnAvatar, AvatarFallback, AvatarImage } from "@/ui/avatar"
import { ComponentPropsWithoutRef } from "react"

interface AvatarProps extends ComponentPropsWithoutRef<typeof ShadcnAvatar> {
    src: string
    alt: string
}


const Avatar: React.FC<AvatarProps> = ({ src, alt, className, ...props }) => {
    return (
        <ShadcnAvatar className={className}>
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>?</AvatarFallback>
        </ShadcnAvatar>
    )
}

export default Avatar