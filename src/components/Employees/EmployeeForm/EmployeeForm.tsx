
import { Controller, useForm } from 'react-hook-form';
import { TextField, Button, Select, MenuItem, Typography, Box, FormControl, StepLabel, Avatar, FormLabel, RadioGroup, FormControlLabel, Radio, } from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { employeeSchema } from '../../../validation/employeeSchema';
import AddToPhotoIcon from '../../../assets/Icons/add-photo.svg?react';
import styles from './EmployeeForm.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';


type EmployeeFormData = z.infer<typeof employeeSchema>;
type Props = {
    onSubmit: (data: EmployeeFormData) => void;
    createNewSeamstressTeam?: () => void;
    updateSeamstressTeam?: () => void;
    setIsCreateNewTeam: (isCreateNewTeam: boolean) => void;
}

const EmployeeForm = ({ onSubmit, createNewSeamstressTeam, updateSeamstressTeam, setIsCreateNewTeam }: Props) => {

    const seamstressTeams = useSelector((state: RootState) => state.seamstressTeam.seamstressTeam);

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<EmployeeFormData>({
        defaultValues: {
            avatar: null,
        },
        resolver: zodResolver(employeeSchema),
    });


    const handleImageUpload = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const formValues = watch();

    const handleCreateNewTeam = () => {
        setIsCreateNewTeam(true);
        createNewSeamstressTeam?.();
    };

    const handleUpdateTeam = () => {
        setIsCreateNewTeam(false);
        updateSeamstressTeam?.();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <Typography sx={{ fontWeight: 'bold', fontSize: '24px' }}>Новый сотрудник</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                <Controller
                    name="avatar"
                    control={control}
                    render={({ field: { onChange } }) => (
                        <Box display="flex" alignItems="center" gap={2} className={styles.imageUpload}>
                            <Box onClick={handleClick}>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            onChange(file.name);
                                            handleImageUpload(file);
                                        }
                                    }}
                                />
                                <Box >
                                    {imagePreview ? (
                                        <Avatar
                                            src={imagePreview}
                                            alt="avatar"
                                            sx={{ width: 200, height: 224, borderRadius: 0 }}
                                        />
                                    ) : (
                                        <AddToPhotoIcon />
                                    )}
                                </Box>
                            </Box>


                        </Box>
                    )}
                />
                {errors.avatar && <Typography color="error">{errors.avatar.message}</Typography>}

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                    <TextField size='small' label='Имя' {...register('firstName')} error={!!errors.firstName} helperText={errors.firstName?.message} />
                    <TextField size='small' label='Фамилия'  {...register('lastName')} error={!!errors.lastName} helperText={errors.lastName?.message} />
                    <TextField
                        size='small'
                        label='Телефон'
                        {...register('phone', {
                            onChange: (e) => {
                                let inputValue = e.target.value;
                                inputValue = inputValue.replace(/\D/g, '');

                                if (!inputValue.startsWith('996')) {
                                    inputValue = `996${inputValue}`;
                                }
                                if (inputValue.length > 12) {
                                    inputValue = inputValue.slice(0, 12);
                                }
                                e.target.value = inputValue;
                            },
                        })}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                    />

                    <FormControl >
                        <FormLabel id="demo-radio-buttons-group-label">Должность</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel {...register('role')} value="seamstress" control={<Radio />} label="Швея" />
                            <FormControlLabel {...register('role')} value="cutter" control={<Radio />} label="Раскройщик" />
                            <FormControlLabel {...register('role')} value="technologist" control={<Radio />} label="Технолог" />
                        </RadioGroup>
                    </FormControl>

                    {formValues.role === 'seamstress' && (
                        <>
                            <FormControl fullWidth size='small'>
                                <StepLabel>Объединить в бригаду</StepLabel>
                                <Controller
                                    name="teamId"
                                    control={control}
                                    defaultValue=''
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            value={value}
                                            onChange={onChange}
                                            displayEmpty
                                            placeholder='Выберите бригаду'
                                            error={!!errors.teamId}
                                        >
                                            <MenuItem value='new'
                                                onClick={handleCreateNewTeam}
                                            >
                                                Создать новую бригаду
                                            </MenuItem>
                                            {seamstressTeams.length > 0 && seamstressTeams.map(team => (
                                                <MenuItem onClick={handleUpdateTeam} key={team.id} value={team.id}>
                                                    {team.employees.map(employee => `${employee.firstName}`).join(', ')}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </FormControl>
                            {errors.teamId && <Typography color='error'>{errors.teamId.message}</Typography>}
                        </>
                    )}

                    <Button variant='contained' color='primary' type='submit'>
                        Добавить
                    </Button>
                </Box>
            </Box>
        </form>
    );
};

export default EmployeeForm;
