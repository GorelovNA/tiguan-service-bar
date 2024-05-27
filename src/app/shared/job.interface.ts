export interface Job {
  id: string;
  title: string;
  type: JobType;
  colorType: ColorType;
  planValue: number;
  optionalJobsOn: number[]; // exp: [11, 16]; внеплановые работы, влияют на дальнейшие плановые работы
  skippedJobsOn: number[]; // exp: [10]; пропустить работы (не будет отобращаться на графе)
  cost: number; // job cost, RUB
  description?: string;
  justOnce?: boolean;
  createDate?: Date;
  complitedJobs: { value: number }[]; // работа выполнена на пробеге/времени value
}

export enum ColorType {
  Prisadka,
  Zamena
}

export enum JobType {
  Time,
  Km
}
