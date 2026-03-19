import {
    SiSpringboot,
    SiNextdotjs,
    SiAngular,
    SiPhp,
    SiPython,
    SiPrimefaces,
    SiJenkins,
    SiDocker,
    SiRubyonrails,
} from 'react-icons/si';
import { Tech } from '@/types/technology';

export const techs: Tech[] = [
    { name: 'Java Spring', icon: SiSpringboot, color: '#6DB33F' },
    { name: 'Ruby on Rails', icon: SiRubyonrails, color: '#CC0000' },
    { name: 'Python', icon: SiPython, color: '#3776AB' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
    { name: 'Angular', icon: SiAngular, color: '#DD0031' },
    { name: 'PHP', icon: SiPhp, color: '#777BB4' },
    { name: 'PrimeFaces', icon: SiPrimefaces, color: '#0C7FB0' },
    { name: 'Jenkins', icon: SiJenkins, color: '#D33833' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
];
