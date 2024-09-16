import { z } from 'zod';
import { rolesSchema } from '../validation/employeeSchema';

export type Roles = z.infer<typeof rolesSchema>;


export type Employee = {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: Roles;
    avatar: string | null;
    active: boolean;
    teamId?: string;
};

export type CombinedListItem =
    | {
        type: 'team';
        id: string;
        active: boolean;
        members: Employee[]
    }
    | {
        type: 'employee';
        id: string;
        firstName: string;
        role: Roles;
        active: boolean;
        avatar?: string
    };

export type SeamstressTeam = {
    id: string
    employees: Employee[]
    active: boolean;
}

export const rolesRu: Record<Roles, string> = {
    seamstress: 'Швея',
    cutter: 'Раскройщик',
    technologist: 'Технолог',
};


