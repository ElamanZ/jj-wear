import { Delete } from "@mui/icons-material"
import { Avatar, AvatarGroup, Box, IconButton, List, ListItem, ListItemAvatar, Switch, Typography } from "@mui/material"
import { CombinedListItem, rolesRu } from "../../../types/Employee"
import styles from './EmployeeList.module.css';
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";


type Props = {
    onDeleteEmployee: (id: string) => void;
    onDeleteTeam: (id: string) => void;
    onToggleActiveEmployee: (id: string, active: boolean) => void;
    onToggleActiveTeam: (id: string, active: boolean) => void;
}

const EmployeeList = ({ onDeleteEmployee, onToggleActiveEmployee, onDeleteTeam, onToggleActiveTeam }: Props) => {



    const employees = useSelector((state: RootState) => state.employees.employees);
    const seamstressTeams = useSelector((state: RootState) => state.seamstressTeam.seamstressTeam);
    const searchQuery = useSelector((state: RootState) => state.search.query);

    const includedInTeam = new Set<string>();

    const combinedList: CombinedListItem[] = seamstressTeams.map(team => {
        team.employees.forEach(member => includedInTeam.add(member.id));

        return {
            type: 'team',
            id: team.id,
            members: team.employees,
            active: team.active,
        };
    });

    employees.forEach(employee => {
        if (!includedInTeam.has(employee.id)) {
            combinedList.push({
                type: 'employee',
                id: employee.id,
                firstName: employee.firstName,
                role: employee.role,
                active: employee.active,
                avatar: employee.avatar ?? undefined,
            });
        }
    });

    const filteredList = combinedList.filter(item =>
        item.type === 'employee' || item.type === 'team' && item.members.some(member => member.firstName.toLowerCase().includes(searchQuery.toLowerCase()))
    );


    if (filteredList.length === 0) {
        return <Typography>Нет сотрудников</Typography>
    }

    return (
        <List>
            {filteredList.map(item => (
                <Box key={item.id}>  {/* Добавляем уникальный key */}
                    {item.type === 'team' && (
                        <>
                            <ListItem className={`${styles.listItem} ${item.active ? styles.active : ''}`}>
                                <ListItemAvatar>
                                    <AvatarGroup max={4}>
                                        {item.members.map(member => (
                                            <Box key={member.id} className={styles.avatarGroup}>
                                                <Avatar
                                                    className={styles.avatar}
                                                    alt={member.firstName}
                                                    src={member.avatar ?? undefined}
                                                />
                                            </Box>
                                        ))}
                                    </AvatarGroup>
                                </ListItemAvatar>

                                <Box className={styles.textContainer}>
                                    <Typography variant="body2">
                                        {item.members.map(val => `${val.firstName}`).join(', ')}
                                    </Typography>
                                </Box>

                                <Box sx={{ marginRight: '16px' }}>
                                    Швеи
                                </Box>

                                <Switch
                                    checked={item.active}
                                    onChange={() => onToggleActiveTeam(item.id, item.active)}
                                    color="success"
                                />
                                <IconButton edge="end" aria-label="delete" onClick={() => onDeleteTeam(item.id)}>
                                    <Delete />
                                </IconButton>
                            </ListItem>
                        </>
                    )}

                    {item.type === 'employee' && (
                        <>
                            <ListItem className={`${styles.listItem} ${item.active ? styles.active : ''}`}>
                                <ListItemAvatar>
                                    <AvatarGroup max={2}>
                                        <Box className={styles.avatarGroup}>
                                            <Avatar
                                                className={styles.avatar}
                                                alt={item.firstName}
                                                src={item.avatar}
                                            />
                                        </Box>
                                    </AvatarGroup>
                                </ListItemAvatar>

                                <Box className={styles.textContainer}>
                                    <Typography variant="body2">
                                        {item.firstName}
                                    </Typography>
                                </Box>

                                <Box sx={{ marginRight: '16px' }}>
                                    {rolesRu[item.role]}
                                </Box>

                                <Switch
                                    checked={item.active}
                                    onChange={() => onToggleActiveEmployee(item.id, item.active)}
                                    color="success"
                                />
                                <IconButton edge="end" aria-label="delete" onClick={() => onDeleteEmployee(item.id)}>
                                    <Delete />
                                </IconButton>
                            </ListItem>
                        </>
                    )}
                </Box>
            ))}
        </List>
    )
}

export default EmployeeList