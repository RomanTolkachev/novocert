import { type ReactNode, useState } from "react";
import { Box } from "@mui/material";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useLocation } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import { CustomTable, Preloader, protectedApi, useParamsCustom } from "@/shared";
import type { IFilterListItem, ITableConfig } from "../model";
import { FiltersList } from "./filters-list";
import { CustomFormProvider } from '../api'
import styles from './TableWithFilters.module.css'

interface TableWithFiltersProps<T extends Record<string, any>> {
    config: ITableConfig<T>;
}

export const TableWithFilters = <T extends Record<string, any>>({
    config
}: TableWithFiltersProps<T>): ReactNode => {
    const location = useLocation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [_, getQuery] = useParamsCustom()

    const { data: response, isFetching } = useQuery<AxiosResponse<ILaravelPaginator<T>>, AxiosError>({
        queryKey: [config.dataUrl, getQuery()],
        queryFn: () => protectedApi.get(config.dataUrl, { params: getQuery() }),
        refetchOnMount: config.refetchOnMount ?? false,
        placeholderData: keepPreviousData,
    });

    const { data: filters, isFetching: filtersFetching } = useQuery<IFilterListItem[]>({
        queryKey: ["filters", config.filtersUrl],
        queryFn: () => protectedApi.get(config.filtersUrl).then(res => res.data),
        placeholderData: keepPreviousData, // пока мы фетчим, у нас будут старые фильтры
        staleTime: 1000 * 60 * 5, // 5 минут - данные считаются свежими
    });

    const [tableSize, setTableSize] = useState<"small" | "medium">(() => {
        const stored = localStorage.getItem(`${location.pathname}_tableSize`);
        return stored === 'small' ? 'small' : 'medium';
    });

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = event.target.checked ? 'small' : 'medium';
        setTableSize(newSize);
        localStorage.setItem(`${location.pathname}_tableSize`, newSize);
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const actions = config.actions?.length
        ? config.actions
        : [];

    if (filtersFetching || !filters) {
        return <Preloader />
    }

    return (
        <CustomFormProvider filters={filters} config={config}>
            <Box sx={{
                display: "grid",
                pl: 3,
                columnGap: 1,
                gridTemplateColumns: isDrawerOpen ? "minmax(0, 1fr) 300px" : "1fr 60px",
                gridTemplateRows: "1fr",
                height: '100%',
                overflow: 'hidden',
                width: '100%',
                transition: 'grid-template-columns 0.3s ease-in-out',
                '& > *': {
                    minWidth: 0, // без этого анимация не может работать плавно
                },
            }}>
                {/* Основной контент с таблицей */}
                <div className={styles.tableWrapper}>
                    <CustomTable
                        data={response?.data.data}
                        translations={config.translations}
                        hiddenColumns={config.hiddenColumns}
                        columnOrder={config.columnOrder}
                        loading={isFetching}
                        actions={actions}
                        size={tableSize}
                        withRowActions={config.withRowActions}
                        pagination={{
                            currentPage: response?.data.current_page,
                            lastPage: response?.data.last_page,
                            total: response?.data.total
                        }}
                    />
                </div>

                {/* Drawer */}
                <Box className={styles.filtersWrapper} sx={{
                    borderColor: 'divider',
                    backgroundColor: 'background.paper',
                }}>
                    <Box className={styles.filtersToggle} sx={{
                        px: theme => theme.spacing(1),
                        backgroundColor: 'background.default',
                        borderBottom: isDrawerOpen ? '1px solid' : 'none',
                        borderColor: 'divider'
                    }}>
                        <IconButton
                            onClick={toggleDrawer}
                            sx={{
                                border: 1,
                                borderColor: 'divider',
                                backgroundColor: 'background.paper',
                            }}
                        >
                            {isDrawerOpen ? <ChevronRightIcon /> : <MenuIcon />}
                        </IconButton>
                    </Box>

                    <div className={styles.filtersContentWrapper}>
                        <Box sx={{
                            flex: 1,
                            minHeight: 0,
                            pr: .3,
                            transition: 'opacity 0.2s ease-in-out, max-width 0.3s ease-in-out',
                            opacity: isDrawerOpen ? 1 : 0,
                            pointerEvents: isDrawerOpen ? 'auto' : 'none',
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <FormControlLabel
                                sx={{ flex: 0, pl: 2.5 }}
                                control={
                                    <Switch
                                        checked={tableSize === 'small'}
                                        onChange={handleSwitchChange}
                                        color="primary"
                                    />
                                }
                                label="Компактный вид"
                            />

                            {/* Фильтры - будут подключаться через провайдер */}

                            {config.enableFilters && (
                                <Box sx={{ mt: 2, flex: 1, minHeight: 0 }}>
                                    <FiltersList />
                                </Box>
                            )}
                        </Box>
                    </div>
                </Box>
            </Box>
        </CustomFormProvider>
    );
};