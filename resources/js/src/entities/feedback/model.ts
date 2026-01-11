const FEEDBACK_KEYS = [
    "name",
    "gid",
    "docum_status_",
    "docum_type_",
    "cli_from",
    "cli_to",
    "to__gid",
    "to__ogrn",
    "to__inn",
    "to__img_path",
    "from__gid",
    "from__ogrn",
    "from__inn",
    "from__img_path",
    "to_jur__gid",
    "to_jur__short_name",
    "to_jur__laravel_through_key",
    "from_jur__gid",
    "from_jur__short_name",
    "from_jur__laravel_through_key"
] as const;

export type FeedbackKeys = typeof FEEDBACK_KEYS[number];

export interface IFeedback {
    // Основные поля
    name: string;
    gid: string;
    docum_status_: string;
    docum_type_: string;
    cli_from: string;
    cli_to: string;
    
    // Получатель (to)
    to__gid: string;
    to__ogrn: string;
    to__inn: string;
    to__img_path: string;
    
    // Отправитель (from)
    from__gid: string;
    from__ogrn: string;
    from__inn: string;
    from__img_path: string;
    
    // Юр.лицо получателя
    to_jur__gid: string;
    to_jur__short_name: string;
    to_jur__laravel_through_key: string;
    
    // Юр.лицо отправителя
    from_jur__gid: string;
    from_jur__short_name: string;
    from_jur__laravel_through_key: string;

    bus_begin: string
}