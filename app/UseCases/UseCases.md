# Создание

Юз кейс можно создать командой php artisan make:use-case <папка/сущности>.
Файлы будут созданы внутри папки UseCases, поэтому в path просто указываем
название вложенной папки, по логической связи с роутом, затем название запрашиваемой сущности во множественном числе.
Например php artisan make:use-case Admin/Certs предполагает, что в админ панели происходит запрос сертификатов (Certs).

# Описание

Каждый use, созданный командой make:use-case, возвращает 2 json для отрисовки:
- ### Табличка.
  Обычный объект пагинации
- ### Фильтры к табличке
  Это массив массивов на БЭК, который фронт принимает в таком формате:
  ```
  interface IFilterListItem {
    'defaultValue': string,
    'headerLabel': string,
    'order': number,
    'type': "text" | "checkbox" | "date",
    'values'?: string[],
    'headerLabelTranslate': string,
    'tooltip'?: string
  }
  ```
- ### Обработка параметров с фронта. Паттерн Filter.
  Filter pattern описан в документации laravel по [ссылке](https://laravel.su/p/pattern-filtr-v-laravel)
  При применении фильтра, с фронта летит query параметр, равный ключу headerLabel, т.е БЭК отправил с фронта фильтр, например
  ```
   'headerLabel' => "user_name"
  ```
  , то в ответ ожидает принят параметр ?user_name=vasya.
Логика применения фильтров т.е применение query параметров, определяется в Get<сущность>List/shared/<сущность>Filters.php
Т.е если мы создали сущность php artisan make:use-case Admin/Certs, 
то фильтры будут лежать по пути app/UseCases/Admin/Certs/GetCertsList/shared/CertsFilters.php
  Согласно паттерну Filters, внутри класса фильтров должен лежать метод, название которого соответствует query параметру, но метод всегда в camel case. Т.е для поиска по query параметру user_name, класс фильтров должен содержать метод
  ```
  public function userName() {}
  ```
  