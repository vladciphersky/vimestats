# VimeStats
Discord бот для проверки статистики с VimeWorld

## Команды бота
- `help` | Помощь по командам
- `ping` | Проверить пинг клиента
- `staff` | Онлайн модераторов
- `stats <никнейм>` | Статистика пользователя
- `streams` | Стримы на сервере

## TODO
- `guild <id/tag/name> <запрос>` | Статистика гильдии
<br>В принципе, метод в utils/vimeworld.js есть, можете сделать Pull Request

## Небольшое уведомление
Дизайн команд (`staff`, `stats`, `streams`) похож (частично) на тот, что у бота от VimeTop. Я пытаюсь скопировать его, и добавить в него новые функции. А также я даю Open Source. :D

## Библиотеки которые использовались при создании бота
- [`discore.js`](https://github.com/zargovv/discore.js) (Based on [DiscordJS](https://github.com/discordjs/discord.js))
- `moment`
- `moment-duration-format`
- `request-promise-native`
