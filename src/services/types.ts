export interface WorkFormat {
    id: 'REMOTE' | 'ON_SITE' | 'HYBRID';
    name: string;
}

export interface JobType {
    id: string;
    name: string;
    area: {name: string};
    employer: {name: string}; 
    salary: {from: number; to: number; currency: string} | null;
    experience: {name: string};
    work_format: WorkFormat[];
    alternate_url: string;
    snippet: { requirement: string; responsibility: string };
}

export interface JobsResponse {
    found: number;
    pages: number;
    items: JobType[];
}