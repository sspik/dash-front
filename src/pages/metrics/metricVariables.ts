import { IMetricsData } from "./interfaces";

export const metricsVariables: IMetricsData = {
  search: {
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
    }
  },
  direct: {
    metrics: {
      cpa: {
        display: "CPA",
        name: "ym:ad:goal<currency>CPA",
        tooltip: "Cost Per Action. Отношение стоимости переходов к количеству целей, достигнутых в визитах, для которых учтена стоимость перехода."
      },
      adCostClickPerVisit: {
        display: "Стоимость клика",
        name: "ym:ad:<currency>AdCostPerVisit",
        tooltip: "Средняя стоимость клика из Яндекс.Директа."
      },
      adCost: {
        display: "Стоимость кликов",
        name: "ym:ad:<currency>AdCost",
        tooltip: "Суммарная стоимость кликов из Яндекс.Директа."
      },
      clicks: {
        display: "Суммарное кол-во кликов",
        name: "ym:ad:clicks",
        tooltip: "Суммарное количество кликов по рекламе."
      },
      adCostPerVisit: {
        display: "Стоимость целевого визита",
        name: "ym:ad:goal<goal_id><currency>AdCostPerVisit",
        tooltip: "Средняя стоимость целевого визита из Яндекс.Директа."
      },
      visits: {
        display: "Визиты",
        name: "ym:ad:visits",
        tooltip: "Суммарное количество визитов."
      }
    },
    dimensions: {
      directBanner: {
        display: "Объявления",
        name: "ym:ad:directBanner",
        tooltip: "Объявление Яндекс.Директа",
      },
      directConditionType: {
        display: "Условия показа",
        name: "ym:ad:directConditionType",
        tooltip: "Тип условия показа объявления."
      },
      directOrder: {
        display: "Рекламная комания",
        name: "ym:ad:directOrder",
        tooltip: "Объявление Яндекс.Директа",
      },
      directPlatform: {
        display: "Рекламная площадка",
        name: "ym:ad:directPlatform",
        tooltip: "Рекламная площадка Яндекс.Директа.",
      },
    },

  }
}