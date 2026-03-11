import { CommonFilter, IDType, WikimediaUsername } from "../_";
import { Role } from "../role";
import { RoundStatus } from "./status";

// These are the restrictions that are applied to the articles that are submitted to the campaign
type RoundCommonRestrictions = {
    allowJuryToParticipate: boolean;
    allowMultipleJudgement: boolean;
    secretBallot: boolean;
    blacklist: string;
};


export enum MediaType {
    AUDIO = 'AUDIO',
    VIDEO = 'VIDEO',
    IMAGE = 'BITMAP',
    ARTICLE = 'ARTICLE',
    DRAWING = 'DRAWING',
}
export enum EvaluationType {
    BINARY = 'binary',
    RANKING = 'ranking',
    SCORE = 'score',
}
type MediaTypeSet = MediaType[]


// These are the restrictions that are applied to the audio and video that are submitted to the campaign
type RoundAudioRestrictions = {
    audioMinimumDurationMilliseconds: number;
    audioMinimumSizeBytes: number;
};

export type RoundVideoRestrictions = {
    videoMinimumDurationMilliseconds: number;
    videoMinimumSizeBytes: number;
    videoMinimumResolution: number;
};

// These are the restrictions that are applied to the images that are submitted to the campaign
type RoundImageRestrictions = {
    imageMinimumResolution: number;
    imageMinimumSizeBytes: number;
};

export type RoundArticleRestrictions = {
    maximumSubmissionOfSameArticle: number;
    articleAllowExpansions: boolean;
    articleAllowCreations: boolean;
    articleMinimumTotalBytes: number;
    articleMinimumTotalWords: number;
    articleMinimumAddedBytes: number;
    articleMinimumAddedWords: number;
};

export type RoundMediaRestrictions = RoundImageRestrictions & RoundAudioRestrictions & RoundVideoRestrictions;

// These are the restrictions that are applied to
type RoundRestrictions = RoundCommonRestrictions & RoundMediaRestrictions & RoundArticleRestrictions & {
    allowedMediaTypes: MediaTypeSet;
};

export type RoundWritable = {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    isOpen: boolean;
    isPublicJury: boolean;
    dependsOnRoundId?: string;
    serial: number;
    type: EvaluationType;
    quorum: number;
} & RoundRestrictions
export type RoundCreate = {
    campaignId: IDType
    jury: WikimediaUsername[]
} & RoundWritable
export type Round = {
    roundId: IDType;
    campaignId: IDType;
    createdAt?: string;
    createdById: IDType;
    totalSubmissions: number;
    totalEvaluatedSubmissions: number;
    totalEvaluatedAssignments: number;
    totalAssignments: number;
    status: RoundStatus;
    latestDistributionTaskId?: IDType;
    roles: Role[] | null;
    jury: { [k: IDType]: WikimediaUsername } | null;
} & RoundWritable

export type RoundFilter = {
    campaignId: IDType;
    status: RoundStatus;
} & CommonFilter
export interface SubmissionResultSummary {
    readonly averageScore: number;
    submissionCount: number;
}
export interface SubmissionResult {
    readonly author: string;
    readonly juryCount: number;
    readonly name: string;
    readonly score: number;
    readonly submissionId: string;
    readonly type: string;
}
