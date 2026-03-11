import { IDType } from "../_";
export enum RoleType {
    Coordinator = "coordinator",
    Jury = "jury",
}
export interface Role {
    roleId: IDType
    type: RoleType;
    userId: IDType;
    projectId: IDType;
    targetProjectId: IDType | null;
    campaignId: IDType;
    roundId: IDType;
    isAllowed: boolean;
    totalAssigned: number;
    totalEvaluated: number;
    totalScore: number;
    permission: number;
}
export type RoleWithUsername = Role & { username: string };