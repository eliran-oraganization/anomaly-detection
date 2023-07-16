type TeamAction = 'created'
type RepositoryAction = 'created' | 'deleted';



export interface PushPayload {
    repository: {
        pushed_at: number
    };
}


export interface RepositoryPayload {
    action: RepositoryAction;
    repository: {
        created_at: string;
        updated_at: string;
    };
}



export interface CreateTeamPayload {
    action: TeamAction;
    team: { name: string };
}
