import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/ui/table"
import MemberRoleSelect from "./MemberRoleSelect";
import { User } from "@prisma/client";
import Avatar from "@/Avatar";

interface MemberRowProps {
    member: User
    role: string
}

const MemberRow: React.FC<MemberRowProps> = ({ member, role }) => {

    const handleRoleChange = (role: string) => {
        console.log(role)
    }
    return (
        <TableRow>
            <TableCell className="flex items-center gap-4">
                <Avatar src={member.image || ''} alt={member.name} />
                <div className="flex flex-col gap-1">
                    <div className="text-sm font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.email}</div>
                </div>
            </TableCell>
            <TableCell><MemberRoleSelect value={role} onValueChange={handleRoleChange} /></TableCell>
        </TableRow>
    )
}

interface MembersListProps {
    members: User[]
}

const MembersList: React.FC<MembersListProps> = ({ members }) => {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Role</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {members.map((member) => (
                    <MemberRow key={member.id} member={member} role={'Owner'} />
                ))}
            </TableBody>
        </Table>
    )
}

export default MembersList;

