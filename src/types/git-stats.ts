import { IconType } from 'react-icons';

export interface GitStaticsItem {
    label: string;
    value: string;
}

export interface GitStaticsModel {
    title: string;
    icon: IconType;
    items: GitStaticsItem[];
}
