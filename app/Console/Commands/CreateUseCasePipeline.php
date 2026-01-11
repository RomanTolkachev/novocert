<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class CreateUseCasePipeline extends Command
{
    protected $signature = 'make:use-case 
                            {name : Path like Admin/Systems}
                            {--model= : Model class for GetList}';

    protected $description = 'Create a full use-case pipeline: GetXList, Filters, Translator';

    public function handle()
    {
        $inputPath = $this->argument('name');          // Admin/Systems
        $pathParts = explode('/', $inputPath);

        $rootUc = array_pop($pathParts);               // Systems
        $subdirs = implode('/', $pathParts);           // Admin

        $modelClass = $this->option('model');

        // Derived names
        $listName = "Get{$rootUc}List";
        $filtersName = "Get{$rootUc}ListFilters";
        $translatorClass = "{$rootUc}Translator";

        // Base directory: app/UseCases/Admin/Systems
        $baseRoot = app_path("UseCases/{$subdirs}/{$rootUc}");

        // Full paths
        $baseList = "{$baseRoot}/{$listName}";
        $baseListShared = "{$baseList}/shared";
        $baseFilters = "{$baseRoot}/{$filtersName}";
        $rootShared = "{$baseRoot}/shared";

        // Ensure directories
        File::ensureDirectoryExists($baseList);
        File::ensureDirectoryExists($baseListShared);
        File::ensureDirectoryExists($baseFilters);
        File::ensureDirectoryExists($rootShared);

        // Namespaces
        $nsRoot = $this->getNamespace($baseRoot);
        $nsList = $this->getNamespace($baseList);
        $nsListShared = $this->getNamespace($baseListShared);
        $nsFilters = $this->getNamespace($baseFilters);
        $nsRootShared = $this->getNamespace($rootShared);

        // Generate core list pipeline
        $this->createListController($baseList, $listName, $nsList, $nsListShared, $modelClass);
        $this->createListHandler($baseList, $listName, $nsList, $nsListShared);
        $this->createListResource($baseList, $listName, $nsList);
        $this->createListSharedFilter($baseListShared);

        // Translator
        $this->createTranslator($rootShared, $translatorClass, $nsRootShared);

        // Filters controller
        $this->createFiltersController(
            $baseFilters,
            $filtersName,
            $nsFilters,
            $translatorClass,
            $modelClass
        );

        $this->info("Use-case pipeline created: {$baseRoot}");

        return Command::SUCCESS;
    }

    // ----------------------- Helper to build namespace -----------------------
    protected function getNamespace($path)
    {
        $relative = Str::after($path, app_path().DIRECTORY_SEPARATOR); // remove disk path
        $relative = str_replace('/', '\\', $relative);                     // convert slashes

        return 'App\\'.$relative;
    }

    // ----------------------- LIST CONTROLLER -----------------------
    protected function createListController($path, $class, $ns, $nsShared, $modelClass)
    {
        $modelUse = $modelClass ? "use {$modelClass};" : '';
        $modelBase = $modelClass ? class_basename($modelClass) : '/* YourModel */';

        $content = "<?php

namespace {$ns};

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use {$nsShared}\\SystemsFilter;
{$modelUse}

class {$class}Controller
{
    public function __invoke({$class}Handler \$handler, Request \$request): JsonResponse
    {
        \$builder = {$modelBase}::query();

        \$result = \$handler->execute(
            page: (int)(\$request->page ?? 1),
            itemsPerPage: (int)(\$request->perPage ?? 10),
            filter: new SystemsFilter(\$request->all()),
            builder: \$builder
        );

        return new JsonResponse(\$result, Response::HTTP_OK);
    }
}";

        File::put("{$path}/{$class}Controller.php", $content);
        $this->info("Created: {$class}Controller.php");
    }

    // ----------------------- LIST HANDLER -----------------------
    protected function createListHandler($path, $class, $ns, $nsShared)
    {
        $content = "<?php

namespace {$ns};

use Illuminate\Database\Eloquent\Builder;
use {$nsShared}\\SystemsFilter;

class {$class}Handler
{
    public function execute(
        int \$page,
        int \$itemsPerPage,
        SystemsFilter \$filter,
        Builder \$builder
    ): {$class}Resource {

        \$result = \$filter->apply(\$builder)
            ->paginate(
                perPage: \$itemsPerPage,
                page: \$page
            );

        \$result->setCollection(
            collect(\$result->items())->customToFlat()
        );

        return new {$class}Resource(\$result);
    }
}";
        File::put("{$path}/{$class}Handler.php", $content);
        $this->info("Created: {$class}Handler.php");
    }

    // ----------------------- LIST RESOURCE -----------------------
    protected function createListResource($path, $class, $ns)
    {
        $content = "<?php

namespace {$ns};

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Pagination\LengthAwarePaginator;

class {$class}Resource extends JsonResource
{
    public function toArray(\$request): array
    {
        if (\$this->resource instanceof LengthAwarePaginator) {
            \$p = \$this->resource;

            return [
                'data' => \$p->items(),
                'meta' => [
                    'current_page' => \$p->currentPage(),
                    'from' => \$p->firstItem(),
                    'last_page' => \$p->lastPage(),
                    'per_page' => \$p->perPage(),
                    'to' => \$p->lastItem(),
                    'total' => \$p->total(),
                ],
                'links' => [
                    'first' => \$p->url(1),
                    'last' => \$p->url(\$p->lastPage()),
                    'prev' => \$p->previousPageUrl(),
                    'next' => \$p->nextPageUrl(),
                ],
            ];
        }

        return is_array(\$this->resource) ? \$this->resource : (array) \$this->resource;
    }
}";
        File::put("{$path}/{$class}Resource.php", $content);
        $this->info("Created: {$class}Resource.php");
    }

    // ----------------------- LIST SHARED FILTER -----------------------
    protected function createListSharedFilter($baseListShared)
    {
        $ns = $this->getNamespace($baseListShared);

        $content = "<?php

namespace {$ns};

use App\Http\Abstract\AbstractFilter;

class SystemsFilter extends AbstractFilter
{
    public function __construct(array \$inputs)
    {
        parent::__construct(\$inputs);
    }

    // protected string \$cacheColumn = '{table}.{column}'; // сюда вручную прописать модель и столбец
}";
        File::put("{$baseListShared}/SystemsFilter.php", $content);
        $this->info('Created: SystemsFilter.php');
    }

    // ----------------------- TRANSLATOR -----------------------
    protected function createTranslator($path, $class, $namespace)
    {
        $content = "<?php

namespace {$namespace};

use App\Http\Abstract\AbstractCheckboxTranslator;

class {$class} extends AbstractCheckboxTranslator
{
    protected static array \$translations = [
        // 'raw_value' => 'Перевод' — слева сырое значение из БД, справа перевод
    ];
}";
        File::put("{$path}/{$class}.php", $content);
        $this->info("Created: {$class}.php");
    }

    // ----------------------- FILTERS CONTROLLER -----------------------
    protected function createFiltersController($path, $class, $namespace, $translator, $modelClass)
    {
        $modelBase = $modelClass ? class_basename($modelClass) : '/* Model */';

        $content = "<?php

namespace {$namespace};

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use App\\UseCases\\{$translator};

class {$class}Controller
{
    public function __invoke()
    {
        // protected string \$cacheColumn = '{table}.{column}'; // сюда вручную прописать модель и столбец

        \$translated = {$translator}::translate(
            Cache::remember('distinct_{$modelBase}_example', 86400, function () {
                return {$modelBase}::query()
                    ->select('example_column') // поменять вручную
                    ->distinct()
                    ->pluck('example_column')
                    ->toArray();
            })
        );

        \$filters = [

            [
                'defaultValue' => [],
                'headerLabel' => 'example_checkbox',
                'order' => 1,
                'type' => 'checkbox',
                'values' => \$translated,
                'headerLabelTranslate' => 'Чекбокс фильтр',
                'tooltip' => '',
            ],

            [
                'defaultValue' => '',
                'headerLabel' => 'example_text',
                'order' => 2,
                'type' => 'text',
                'headerLabelTranslate' => 'Текстовый фильтр',
                'tooltip' => '',
            ],

            [
                'defaultValue' => ['', ''],
                'headerLabel' => 'example_date',
                'order' => 3,
                'type' => 'date',
                'headerLabelTranslate' => 'Дата',
                'tooltip' => '',
            ],

        ];

        return new JsonResponse(\$filters);
    }
}";
        File::put("{$path}/{$class}Controller.php", $content);
        $this->info("Created: {$class}Controller.php");
    }
}
