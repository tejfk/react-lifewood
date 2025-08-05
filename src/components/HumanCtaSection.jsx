import React from 'react';

const HumanCtaSection = () => {
  return (
    <section className="bg-sea-salt py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-lifewood-green sm:text-4xl">Need to Talk to a Real Human?</h2>
            <p className="mt-2 text-lg text-gray-600">We don’t do bots here (except the ones we build).</p>
            <p className="mt-6 max-w-2xl mx-auto text-gray-700">
                Want to discuss a project, partnership, or idea? Our global team is ready to connect with you. Choose an option below or fill out the form to get started.
            </p>
            <div className="mt-8 flex justify-center items-center gap-x-6">
                <a href="#" className="rounded-md bg-lifewood-saffron px-4 py-2.5 text-sm font-semibold text-lifewood-green shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lifewood-saffron">
                    Schedule a Call
                </a>
                <a href="#" className="text-sm font-semibold leading-6 text-gray-900 hover:underline">
                    Submit an RFP <span aria-hidden="true">→</span>
                </a>
            </div>
        </div>
    </section>
  );
};
export default HumanCtaSection;