# About
Генерирует xlsx отчёты из сервиса заказчика (ветка client):
## Генерация отчёта
Post запрос к "reports" с указанием serviceName как наименования сервиса заказчика, endpoint как эндпоинт для получения данных для отчёта, headers заголовки таблицы.
<br>
{
    "serviceName": "localhost:3002",
    "endpoint": "/api/comments/",
    "headers": ["id", "user", "text", "createdAt"]
}
<br>
В ответ будет получен id документа

## Состаяние документа
Запрос Get "reports/:id" вернет состаяние документа (pending, failed или complete). если отчет готов так же вернет ссылку для скачивания этого отчёта.
