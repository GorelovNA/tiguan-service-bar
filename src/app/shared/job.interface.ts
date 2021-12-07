export interface Job {
    id: string;
    title: string;
    type: JobType;
    colorType: ColorType;
    planValue: number;
    delayValue?: number;
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
