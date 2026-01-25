# Database views

### Organs view (organ listings joined with systems and legal entities)

The MSSQL view for admin/public organs listings is defined as:

```sql
WITH dc AS (
    SELECT COUNT(organ) AS docs_count, organ
    FROM dbo.docum
    WHERE (id > 1) AND (tech_end = '2399-12-31')
    GROUP BY organ
)
SELECT
    dbo.organ.gid,
    dbo.organ.name                        AS organ_name,
    dbo.organ.identifier                  AS organ_number,
    dbo.organ.organ_cert_begin_date,
    dbo.organ.organ_cert_end_date,
    dbo.organ.organ_accreditation_scope,
    dbo.organ.organ_status_,
    dbo.organ.bus_begin,
    dbo.organ.bus_end,
    dbo.organ_reestr_system_.name         AS system_name,
    dbo.organ_reestr_system_.img_path     AS system_img_path,
    dbo.cli_with_cli_jur.short_name       AS legal_short_name,
    dbo.cli_with_cli_jur.inn              AS legal_inn,
    dbo.cli_with_cli_jur.ogrn             AS legal_ogrn,
    dbo.cli_with_cli_jur.logo_path        AS legal_logo_path,
    COALESCE(dc_1.docs_count, 0)          AS certs_count,
    dbo.organ_reestr_system_.docum_web_reference
FROM dbo.organ
LEFT OUTER JOIN dbo.cli_with_cli_jur
    ON dbo.organ.cli = dbo.cli_with_cli_jur.gid
LEFT OUTER JOIN dbo.organ_reestr_system_
    ON dbo.organ.organ_reestr_system_ = dbo.organ_reestr_system_.gid
LEFT OUTER JOIN dc AS dc_1
    ON dbo.organ.gid = dc_1.organ
WHERE
    dbo.organ.id > 1
    AND dbo.organ.tech_end = CONVERT(DATETIME, '2399-12-31 00:00:00', 102)
    AND dbo.organ_reestr_system_.tech_end = (
        SELECT MAX(tech_end) AS Expr1
        FROM dbo.organ_reestr_system_ AS organ_reestr_system__1
    );
```

### Systems view (SystemsView)

The MSSQL view for certification systems (SystemsView) is defined as:

```sql
SELECT
    dbo.organ_reestr_system_.gid,
    dbo.organ_reestr_system_.id,
    dbo.organ_reestr_system_.name           AS system_name,
    dbo.organ_reestr_system_.number         AS system_cert_number,
    dbo.organ_reestr_system_.bus_begin,
    dbo.organ_reestr_system_.bus_end,
    dbo.organ_reestr_system_.accreditation,
    dbo.organ_reestr_system_.img_path,
    dbo.organ_reestr_system_.applicant,
    dbo.organ_reestr_system_.organ_status_,
    dbo.organ_status_.gid                   AS status__gid,
    dbo.organ_status_.name                  AS status__name,
    COALESCE(dbo.systems_view_organs_count.organs_count, 0)   AS organs_count,
    COALESCE(dbo.systems_view_documents_count.docum_count, 0) AS documents_count,
    dbo.cli.gid                             AS owner__gid,
    dbo.cli.inn                             AS owner__inn,
    dbo.cli.ogrn                            AS owner__ogrn,
    dbo.cli.logo_path                       AS owner__logo_path,
    dbo.cli_jur.short_name                  AS owner__short_name,
    dbo.organ_reestr_system_.docum_web_reference
FROM dbo.organ_reestr_system_
LEFT OUTER JOIN dbo.cli
    ON dbo.organ_reestr_system_.applicant = dbo.cli.gid
LEFT OUTER JOIN dbo.systems_view_documents_count
    ON dbo.organ_reestr_system_.gid = dbo.systems_view_documents_count.organ_type_
LEFT OUTER JOIN dbo.systems_view_organs_count
    ON dbo.organ_reestr_system_.gid = dbo.systems_view_organs_count.organ_reestr_system_
LEFT OUTER JOIN dbo.organ_status_
    ON dbo.organ_reestr_system_.organ_status_ = dbo.organ_status_.gid
LEFT OUTER JOIN dbo.cli_jur
    ON dbo.cli.gid = dbo.cli_jur.gid
WHERE
    dbo.organ_reestr_system_.tech_end = CONVERT(DATETIME, '2399-12-31 00:00:00', 102)
    AND dbo.organ_reestr_system_.id > 1
    AND dbo.cli.tech_end = CONVERT(DATETIME, '2399-12-31 00:00:00', 102)
    AND dbo.cli.id > 1
    AND dbo.cli_jur.id > 1
    AND dbo.cli_jur.tech_end = CONVERT(DATETIME, '2399-12-31 00:00:00', 102);
```

### Documents view (DocumentView)

The MSSQL view for certificates/documents (DocumentView) is defined as:

```sql
SELECT TOP (1000)
    dbo.docum.name              AS cert__name,
    dbo.cli_jur.short_name      AS applicant__short_name,
    dbo.docum.docum_status_     AS cert__status,
    dbo.organ_reestr_system_.name AS system__name,
    dbo.organ.name              AS organ__name,
    dbo.organ.organ_status_     AS organ__status,
    dbo.organ_reestr_system_.img_path AS system__img,
    dbo.cli.img_path            AS applicant__img,
    dbo.cli.logo_path           AS applicant__logo,
    dbo.docum.bus_begin         AS cert__bus_begin,
    dbo.cli.tech_end            AS applicant__tech_end,
    dbo.cli_jur.tech_end        AS applicant__jur_tech_end,
    dbo.docum.id                AS cert__id,
    dbo.organ_reestr_system_.tech_end AS system__tech_end,
    dbo.organ.tech_end          AS organ__tech_end,
    dbo.docum.data_end          AS cert__data_end,
    dbo.docum.status_valid,
    dbo.docum.haz_ref           AS cert__haz_ref,
    dbo.docum.gid               AS gid,
    dbo.organ.gid               AS organ__gid
FROM dbo.docum
INNER JOIN dbo.organ_reestr_system_
    ON dbo.docum.organ_type_ = dbo.organ_reestr_system_.gid
INNER JOIN dbo.organ
    ON dbo.docum.organ = dbo.organ.gid
LEFT OUTER JOIN dbo.cli_jur
LEFT OUTER JOIN dbo.cli
    ON dbo.cli_jur.cli = dbo.cli.gid
    ON dbo.docum.applicant = dbo.cli.gid
WHERE
    dbo.cli.tech_end = CONVERT(DATETIME, '2399-12-31 00:00:00', 102)
    AND dbo.cli_jur.tech_end = CONVERT(DATETIME, '2399-12-31 00:00:00', 102)
    AND dbo.docum.id > 1
    AND dbo.organ_reestr_system_.tech_end = CONVERT(DATETIME, '2399-12-31 00:00:00', 102)
    AND dbo.organ.tech_end = CONVERT(DATETIME, '2399-12-31 00:00:00', 102)
    AND dbo.docum.tech_end = CONVERT(DATETIME, '2399-12-31 00:00:00', 102);
```

### Companies view (CompanyView)

The MSSQL view for companies (CompanyView) is defined as:

```sql
SELECT dbo.cli_with_cli_jur.name AS company_name,
       dbo.cli_with_cli_jur.short_name AS company_short_name,
       dbo.cli_with_cli_jur.full_name AS company_full_name,
       dbo.cli_with_cli_jur.inn AS company_inn,
       dbo.cli_with_cli_jur.ogrn AS company_ogrn,
       dbo.cli_with_cli_jur.logo_path AS company_logo_path,
       dbo.cli_with_cli_jur.gid AS company_gid,
       dbo.cli.liquidation_date AS company_liquidation_date,
       dbo.cli_type_.name AS company_type,
       dbo.organ_status_.name AS company_status,
       dbo.cli_okved.code AS okved_code,
       dbo.cli_okved.name AS okved_name,
       dbo.cli_jur_position.name AS ceo,
       COALESCE(derivedtbl_1.docs_made, 0) AS docs_made,
       COALESCE(derivedtbl_2.docs_received, 0) AS docs_received
FROM dbo.cli_okved
RIGHT OUTER JOIN (
    SELECT cli_gid, COUNT(*) AS docs_received
    FROM (
        SELECT applicant AS cli_gid
        FROM dbo.docum AS d
        WHERE d.id > 1 AND d.tech_end = CONVERT(DATETIME, '2399-12-31 00:00:00', 102)
        UNION ALL
        SELECT f.cli_to AS cli_gid
        FROM dbo.docum3_feedback AS f
        WHERE f.id > 1 AND f.tech_end = CONVERT(DATETIME, '2399-12-31 00:00:00', 102)
    ) AS t
    GROUP BY cli_gid
) AS derivedtbl_2
    RIGHT OUTER JOIN dbo.cli_with_cli_jur
        ON derivedtbl_2.cli_gid = dbo.cli_with_cli_jur.gid
    LEFT OUTER JOIN (
        SELECT COUNT(gid) AS docs_made, organ
        FROM dbo.docum
        WHERE id > 1 AND tech_end = '2399-12-31'
        GROUP BY organ
    ) AS derivedtbl_1
        ON dbo.cli_with_cli_jur.gid = derivedtbl_1.organ
    LEFT OUTER JOIN dbo.cli_jur_position
        ON dbo.cli_with_cli_jur.gid = dbo.cli_jur_position.cli
    ON dbo.cli_okved.cli = dbo.cli_with_cli_jur.gid
    LEFT OUTER JOIN dbo.cli_type_
        ON dbo.cli_with_cli_jur.cli_type_ = dbo.cli_type_.gid
    LEFT OUTER JOIN dbo.cli
        ON dbo.cli_with_cli_jur.gid = dbo.cli.gid
    LEFT OUTER JOIN dbo.organ_status_
        ON dbo.cli.cli_status_ = dbo.organ_status_.gid COLLATE SQL_Latin1_General_CP1_CI_AS
WHERE
    dbo.cli.tech_end = CONVERT(DATETIME, '2399-12-31 00:00:00', 102)
    AND dbo.cli.id > 1
    AND dbo.cli_type_.tech_end = CONVERT(DATETIME, '2399-12-31 00:00:00', 102)
    AND dbo.cli_type_.id > 1
    AND dbo.organ_status_.id > 1
    AND dbo.organ_status_.tech_end = CONVERT(DATETIME, '2399-12-31 00:00:00', 102)
    AND dbo.cli_okved.id > 1
    AND dbo.cli_okved.tech_end = CONVERT(DATETIME, '2399-12-31 00:00:00', 102)
    AND dbo.cli_okved.is_main = 1
    AND dbo.cli_jur_position.id > 1
    AND dbo.cli_jur_position.tech_end = CONVERT(DATETIME, '2399-12-31 00:00:00', 102);
```

### Feedbacks view (FeedbackView from docum3.feedback)

The MSSQL view for feedback documents (based on `docum3_feedback`) is defined as:

```sql
SELECT TOP (100) PERCENT
    dbo.docum3_feedback.gid         AS fb_gid,
    dbo.docum3_feedback.name        AS fb_name,
    dbo.docum3_feedback.bus_begin   AS fb_bus_begin,
    dbo.docum3_feedback.bus_end     AS fb_bus_end,
    dbo.docum3_feedback.doc_reg_num AS fb_doc_reg_num,
    dbo.docum3_feedback.docum_text  AS fb_docum_text,
    dbo.docum3_feedback.img_path    AS fb_img_path,
    dbo.docum3_feedback.logo_path   AS fb_logo_path,
    dbo.organ_status_.gid           AS organ_status_liter,
    dbo.docum_type_.gid             AS docum_type_gid,
    dbo.docum_type_.name            AS docum_type_name,
    dbo.cli_with_cli_jur.gid        AS from_gid,
    dbo.cli_with_cli_jur.inn        AS from_inn,
    dbo.cli_with_cli_jur.ogrn       AS from_ogrn,
    dbo.cli_with_cli_jur.short_name AS from_short_name,
    dbo.cli_with_cli_jur.logo_path  AS from_logo_path,
    cli_with_cli_jur_1.short_name   AS to_short_name,
    cli_with_cli_jur_1.inn          AS to_inn,
    cli_with_cli_jur_1.ogrn         AS to_ogrn,
    cli_with_cli_jur_1.logo_path    AS to_logo_path,
    cli_with_cli_jur_1.gid          AS to_gid
FROM dbo.docum3_feedback
LEFT OUTER JOIN dbo.cli_with_cli_jur AS cli_with_cli_jur_1
    ON dbo.docum3_feedback.cli_to = cli_with_cli_jur_1.gid
LEFT OUTER JOIN dbo.cli_with_cli_jur
    ON dbo.docum3_feedback.cli_from = dbo.cli_with_cli_jur.gid
LEFT OUTER JOIN dbo.docum_type_
    ON dbo.docum3_feedback.docum_type_ = dbo.docum_type_.gid COLLATE SQL_Latin1_General_CP1_CI_AS
LEFT OUTER JOIN dbo.organ_status_
    ON dbo.docum3_feedback.docum_status_ = dbo.organ_status_.gid COLLATE SQL_Latin1_General_CP1_CI_AS
WHERE
    dbo.docum3_feedback.id > 1
    AND dbo.docum3_feedback.tech_end = CONVERT(DATETIME, '2399-12-31 00:00:00', 102)
    AND dbo.docum_type_.id > 1
    AND dbo.docum_type_.tech_end = CONVERT(DATETIME, '2399-12-31 00:00:00', 102)
ORDER BY dbo.docum3_feedback.bus_begin DESC;
```
