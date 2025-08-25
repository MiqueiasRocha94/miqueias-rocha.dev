import { IconType } from 'react-icons';
import {
    SiSpringboot,
    SiNextdotjs,
    SiAngular,
    SiPhp,
    SiPython,
    SiPrimefaces,
    SiJenkins,
    SiDocker,
    SiRubyonrails
} from 'react-icons/si';

export interface Tech {
    name: string;
    icon: IconType;
}

export const techs: Tech[] = [
    { name: 'Java Spring', icon: SiSpringboot },
    { name: 'Ruby on Rails', icon: SiRubyonrails },
    { name: 'Python', icon: SiPython },
    { name: 'Next.js', icon: SiNextdotjs },
    { name: 'Angular', icon: SiAngular },
    { name: 'PHP', icon: SiPhp },
    { name: 'PrimeFaces', icon: SiPrimefaces },
    { name: 'Jenkins', icon: SiJenkins },
    { name: 'Docker', icon: SiDocker },
];