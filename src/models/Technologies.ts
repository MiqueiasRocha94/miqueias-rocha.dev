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
    color: string;
}

export const techs: Tech[] = [
    { name: 'Java Spring', icon: SiSpringboot, color: '#6DB33F' },   // Verde oficial do Spring
    { name: 'Ruby on Rails', icon: SiRubyonrails, color: '#CC0000' }, // Vermelho oficial do Rails
    { name: 'Python', icon: SiPython, color: '#3776AB' },            // Azul do logo Python
    { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },        // Preto (Next.js)
    { name: 'Angular', icon: SiAngular, color: '#DD0031' },          // Vermelho oficial Angular
    { name: 'PHP', icon: SiPhp, color: '#777BB4' },                  // Roxo padrão PHP
    { name: 'PrimeFaces', icon: SiPrimefaces, color: '#0C7FB0' },    // Azul do logo PrimeFaces
    { name: 'Jenkins', icon: SiJenkins, color: '#D33833' },          // Vermelho Jenkins
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },            // Azul oficial Docker
];