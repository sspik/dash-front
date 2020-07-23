import { IMetricsData } from "./interfaces";

export const metricsVariables: IMetricsData = {
  s: {
    metrics: {
      source: {
        display: "",
        name: ""
      },
      visits: {
        display: "Визиты",
        name: "ym:s:visits"
      },
      users: {
        display: "Пользователи",
        name: "ym:s:users"
      },
      bounceRate: {
        display: "Отказы",
        name: "ym:s:bounceRate"
      }
    },
    dimensions: {
      browser: {
        display: "Браузеры",
        name: "ym:s:browser"
      },
      searchEngine: {
        display: "Поисковые системы",
        name: "ym:s:searchEngine",
      },
      regionCity: {
        display: "Регионы",
        name: "ym:s:regionCity"
      },
    }
  },
  ad: {
    metrics: {
      cpa: {
        display: "CPA",
        name: "ym:ad:goal<goal_id><currency>CPA",
      },
      adCostClickPerVisit: {
        display: "Стоимость клика",
        name: "ym:ad:<currency>AdCostPerVisit"
      },
      adCost: {
        display: "Стоимость кликов",
        name: "ym:ad:<currency>AdCost"
      },
      clicks: {
        display: "Суммарное кол-во кликов",
        name: "ym:ad:clicks",
      },
      adCostPerVisit: {
        display: "Стоимость целевого визита",
        name: "ym:ad:goal<goal_id><currency>AdCostPerVisit"
      },
      visits: {
        display: "Визиты из Директа",
        name: "ym:ad:visits"
      }
    },
    dimensions: {
      directBanner: {
        display: "Объявления",
        name: "ym:ad:directBanner",
      },
      directConditionType: {
        display: "Условия показа",
        name: "ym:ad:directConditionType"
      },
      directOrder: {
        display: "Рекламная комания",
        name: "ym:ad:directOrder"
      },
      directPlatform: {
        display: "Рекламная площадка",
        name: "ym:ad:directPlatform",
      },
    },

  }
}