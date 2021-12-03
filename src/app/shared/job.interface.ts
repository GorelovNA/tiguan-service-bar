export interface Job {
    id: string;
    title: string;
    type: JobType;
    colorType: ColorType;
    planValue: number;
    description?: string;
    justOnce?: boolean;
    createDate?: Date;
}

export enum ColorType {
    Prisadka,
    Zamena
}

export enum JobType {
    Time,
    Km
}
