import { SiGithub, SiGitlab } from 'react-icons/si';
import { GitStaticsModel } from '@/types/git-stats';

export const stats: GitStaticsModel[] = [
    {
        title: 'GitHub Stats',
        icon: SiGithub,
        items: [
            { label: 'Total de Repositórios', value: '50+' },
            { label: 'Estrelas', value: '120+' },
            { label: 'Commits este ano', value: '350+' },
        ],
    },
    {
        title: 'GitLab Stats',
        icon: SiGitlab,
        items: [
            { label: 'Projetos', value: '25+' },
            { label: 'Contribuições', value: '180+' },
            { label: 'Issues Resolvidas', value: '90+' },
        ],
    },
];
