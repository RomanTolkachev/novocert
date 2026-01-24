# TableWithFilters

Виджет `TableWithFilters` — универсальная обёртка над:

- таблицей (`CustomTable` из `shared/ui/custom-table`),
- панелью фильтров (`FiltersList` + инпуты),
- формой фильтров (`react-hook-form` через `CustomFormProvider`),
- синхронизацией фильтров/пагинации с URL (через `useParamsCustom`).

Он принимает только конфиг `ITableConfig<T>` и сам:

1. Загружает данные таблицы с бэкенда (`dataUrl`) через `protectedApi` и `react-query`.
2. Загружает конфиг фильтров (`filtersUrl`).
3. Держит состояние размера таблицы (обычный / компактный) в `localStorage` по ключу `"<pathname>_tableSize"`.
4. Рисует layout: слева таблица, справа панель с фильтрами (drawer), которую можно сворачивать.

## Контракт конфига `ITableConfig<T>`

`ITableConfig<T>` объявлен в `model/types.ts`:

- `dataUrl: string` — endpoint для данных таблицы (ожидается Laravel-пагинатор с полями `data`, `current_page`, `last_page`, `total`).
- `filtersUrl: string` — endpoint для конфигурации фильтров (`IFilterListItem[]`).
- `translations: Record<keyof T, string>` — словарь заголовков колонок по ключам полей сущности.
- `columnOrder?: (keyof T)[]` — желаемый порядок колонок.
- `hiddenColumns?: (keyof T)[]` — скрытые колонки.
- `withRowActions: boolean` — нужны ли действия по строке.
- `actions?: IAction[]` — действия таблицы (иконки / кнопки действий).
- `refetchOnMount?: boolean` — прокидывается в `react-query` для повторного запроса при маунте.
- `enableFilters?: boolean` — возможность полностью выключить панель фильтров.

Формат фильтра (`IFilterListItem`) должен совпадать с **контрактом фильтров бэкенда**:

- контракт описан в `app/UseCases/UseCases.md`, в разделе про `*FiltersController`;
- см. файл: [`app/UseCases/UseCases.md`](../../../../../app/UseCases/UseCases.md).

## Поток данных

1. **URL-параметры**
   - `useParamsCustom()` возвращает `[setQuery, getQuery]`.
   - `TableWithFilters` использует `getQuery()` для передачи текущих query-параметров в запрос к `dataUrl`.

2. **Загрузка данных таблицы**
   - `useQuery([config.dataUrl, getQuery()], () => protectedApi.get(config.dataUrl, { params: getQuery() }))`.
   - Ожидается, что `response.data` — стандартный Laravel-пагинатор `<T>`.
   - `placeholderData: keepPreviousData` — пока идут запросы, отображаются прошлые данные.

3. **Загрузка фильтров**
   - Отдельный `useQuery<IFilterListItem[]>(["filters", config.filtersUrl], ...)`.
   - Пока фильтры не загружены (`filtersFetching || !filters`) — рендерится `<Preloader />`.

4. **Размер таблицы (compact / normal)**
   - Локальный стейт `tableSize: "small" | "medium"`.
   - Инициализируется из `localStorage["<pathname>_tableSize"]`.
   - Переключатель `FormControlLabel + Switch` меняет `tableSize` и сохраняет в `localStorage`.
   - Значение `tableSize` передается в `CustomTable` как проп `size`.

5. **Layout**
   - `Box` с CSS grid: `gridTemplateColumns` либо `"minmax(0, 1fr) 300px"`, либо `"1fr 60px"` в зависимости от `isDrawerOpen`.
   - Левая колонка — `CustomTable`.
   - Правая колонка — панель фильтров (кнопка свернуть/развернуть + `FiltersList`).

6. **Форма и фильтры**
   - Всё обёрнуто в `<CustomFormProvider filters={filters} config={config}>`.
   - `CustomFormProvider`:
     - Поднимает форму (`react-hook-form`),
     - Инициализирует дефолты из `filters.defaultValue` + `getQuery()` + `page/perPage`,
     - Через `CustomSubmitHandlerContext` отдаёт хендлеры:
       - `customSubmitHandler(formData, debounceTime?)` — обновляет query-параметры и синхронизирует форму;
       - `customResetHandler(perPage)` — сброс всех фильтров к дефолтам и обновление query;
       - `customResetField(fieldName)` — сброс одного поля и пересабмит.

7. **Связь с `CustomTable`**
   - В таблицу передаётся:
     - `data={response?.data.data}`,
     - `translations={config.translations}`,
     - `hiddenColumns`, `columnOrder`, `actions`, `withRowActions`,
     - `pagination` из пагинатора (`current_page`, `last_page`, `total`).
   - `CustomTable` сам строит колонки по ключам сущности `T`.

## Пример использования на странице

Пример для систем (аналогично будет для `OrgansPage`):

```tsx
import { TableWithFilters, type ITableConfig } from "@/widgets/table-with-filters";
import type { ISystem } from "@/entities/system";
import { translations } from "@/entities/system";

const config: ITableConfig<ISystem> = {
  dataUrl: "/public/get-systems-list",
  filtersUrl: "/public/get-systems-list-filters",
  translations,
  withRowActions: false,
  columnOrder: ["system_name", "system_cert_number", "status__name"],
  hiddenColumns: ["gid", "owner__gid"],
  enableFilters: true,
};

export const CertSystemsPage = () => {
  return <TableWithFilters config={config} />;
};
```

Для `OrgansPage` нужно будет описать `IOrgan`, собрать `ITableConfig<IOrgan>` и передать его в `TableWithFilters` с нужными `dataUrl` / `filtersUrl`.
