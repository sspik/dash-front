import { IMetricsData } from "./interfaces";

export const metricsVariables: IMetricsData = {
  metrics: {
    visits: {
      display: "Визиты",
      name: "ym:s:visits",
      tooltip: "Суммарное количество визитов."
    },
    users: {
      display: "Пользователи",
      name: "ym:s:users",
      tooltip: "Количество уникальных посетителей."
    },
    newUsers: {
      display: "Новые пользователи",
      name: "ym:s:newUsers",
      tooltip: "Количество новых посетителей."
    },
    goalAny: {
      display: "Достигнутые цели",
      name: "ym:s:sumGoalReachesAny",
      tooltip: "Количество достижений любой цели."
    },
    bounceRate: {
      display: "Отказы",
      name: "ym:s:bounceRate",
      tooltip: "Доля визитов, в рамках которых состоялся лишь один просмотр страницы, продолжавшийся менее 15 секунд."
    }
  },
  dimensions: {
    source: {
      display: "Источники",
      name: "",
      tooltip: "Источник перехода на сайт."
    },
    browser: {
      display: "Браузеры",
      name: "ym:s:browser",
      tooltip: "Браузер посетителя."
    },
    searchEngine: {
      display: "Поисковые системы",
      name: "ym:s:searchEngine",
      tooltip: "Уточненная поисковая система."
    },
    regionCity: {
      display: "Регионы",
      name: "ym:s:regionCity",
      tooltip: "Города, в которых находятся посетители сайта."
    },
    advEngine: {
      display: "Рекламная система",
      name: "ym:s:<attribution>AdvEngine",
      tooltip: "Рекламные системы сайта"
    },
    directClickOrder: {
      display: "Рекламные кампании",
      name: "ym:s:<attribution>DirectClickOrder",
      tooltip: "Рекламная кампания Яндекс.Директа."
    }
  }
}
