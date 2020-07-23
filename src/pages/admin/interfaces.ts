interface IAdminUser {
  _id: string;
  userId: string;
  expires: number;
  isAdmin: boolean;
}

interface IAdminYandexMetrika {
  _id: string;
  userId: string;
  counter: string;
  bitrixGroupId: string;
}

interface IAdminTopvisor {
  _id: string;
  bitrixGroupId: string;
  projectId: string;
}

export interface IAdminResponse {
  GetAdminData: {
    result: {
      user: IAdminUser[];
      yandexMetrika: IAdminYandexMetrika[];
      topvisor: IAdminTopvisor[];
    }
  }
}