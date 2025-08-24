import Header from '../components/Header';
import About from '../components/About';
import Education from '../components/Education';
import Technologies from '../components/Technologies';
import Stats from '../components/Stats';
import Timeline from '../components/Timeline';

export default function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#0d1117] text-gray-200">
            <div className="bg-gray-800/70 backdrop-blur-md max-w-5xl w-full mx-auto p-6 sm:p-10 lg:p-16 rounded-[40px] shadow-2xl space-y-12 border border-gray-700">
                <Header />
                <hr className="border-gray-700 slide-up-fade-in" />
                <About />
                <hr className="border-gray-700 slide-up-fade-in" />
                <Education />
                <hr className="border-gray-700 slide-up-fade-in" />
                <Technologies />
                <hr className="border-gray-700 slide-up-fade-in" />
                <Stats />
                <hr className="border-gray-700 slide-up-fade-in" />
                <Timeline />
            </div>
        </div>
    );
}