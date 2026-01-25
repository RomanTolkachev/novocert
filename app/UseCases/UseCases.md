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

- ### Checkbox-фильтры с переводом значений (Translator)
  Для checkbox-фильтров, где в БД хранятся коды (например, `organ_status_` со значениями `N`, `A`, `D`, ...), а на фронт нужно отдать человекочитаемые подписи, используется отдельный Translator-класс:
  - Базовый класс: `App\\Http\\Abstract\\AbstractCheckboxTranslator`.
  - Конкретная реализация для use-case: `.../shared/<Entity>Translator.php`.

  **Прямой поток (БД → фронт, для `values` в фильтре):**
  1. В `*FiltersController` достаём distinct значения из нужной колонки (например, `organ_status_`).
  2. Применяем `Translator::translate($rawValues)` и кладём результат в `values` чекбокса.
  3. В `headerLabel` указываем имя поля, по которому фильтруем (например, `status__name` на фронте, но фактически это коды `organ_status_` в БД).

  **Обратный поток (фронт → БД, query → Filters):**
  - С фронта приходит массив выбранных значений уже в переведённом виде (строки-лейблы).
  - Перед применением фильтра к запросу, эти значения нужно обратно распарсить тем же Translator-классом:
    - `Translator::parse($translatedValues)` вернёт исходные коды (`N`, `A`, ...), которые уже можно использовать в `whereIn` по колонке (`organ_status_`).

  Таким образом, checkbox-фильтр работает всегда с "красивыми" строками на фронте, но к БД мы обращаемся только с сырыми кодами через слой Translator.
  
