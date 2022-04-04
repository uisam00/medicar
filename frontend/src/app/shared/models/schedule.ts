import { Doctor } from "./doctor";

export class Schedule {
    id!: number;
    medico!: Doctor;
    dia!: any;
    horarios!: any[];
}