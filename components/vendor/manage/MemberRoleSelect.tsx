import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/ui/select";

interface MemberRoleSelectProps {
    value: string
    onValueChange: (value: string) => void
}

const MemberRoleSelect = ({ value, onValueChange }: MemberRoleSelectProps) => {
    return (
        <Select onValueChange={onValueChange}>
            <SelectTrigger disabled={true}>
                <SelectValue placeholder="Owner">
                    {value}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="owner">Owner</SelectItem>
            </SelectContent>
        </Select>
    )
}

export default MemberRoleSelect

