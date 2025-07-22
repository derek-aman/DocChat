import React from "react";
import {
  MessageSquare,
  FileText,
  BrainCircuit,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    title: "What is DocChat?",
    text: "DocChat is an AI-powered chatbot that uses Retrieval-Augmented Generation (RAG) to deliver precise answers directly from your documents.",
    icon: <MessageSquare className="w-10 h-10 text-[#f1ac7b]" />,
  },
  {
    title: "Instant Document Query",
    text: "Ask any question from your PDF, DOCX, or manual, and get an instant, accurate response – no more endless scrolling.",
    icon: <FileText className="w-10 h-10 text-[#f1ac7b]" />,
  },
  {
    title: "Smart RAG Pipeline",
    text: "Combining vector search with LLMs, DocChat retrieves the most relevant content before generating answers – ensuring context-aware responses.",
    icon: <BrainCircuit className="w-10 h-10 text-[#f1ac7b]" />,
  },
  {
    title: "Secure & Scalable",
    text: "Your data is safe with us. DocChat is designed for privacy and scales from solo users to large enterprise teams.",
    icon: <ShieldCheck className="w-10 h-10 text-[#f1ac7b]" />,
  },
];

const About = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* <h2 className='text-4xl font-["Neue Montreal"] text-center mb-12'>About DocChat</h2> */}

        <div className="space-y-10">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`flex flex-col md:flex-row ${
                idx % 2 !== 0 ? "md:flex-row-reverse" : ""
              } items-center gap-8 text-white shadow-md rounded-2xl p-6`}
            >
              <div className="flex-shrink-0">{feature.icon}</div>
              <div className="md:w-3/4">
                <h3 className="text-2xl  font-semibold mb-2 ">
                  {feature.title}
                </h3>
                <p className="text-[#BAC4C8] text-lg leading-relaxed">
                  {feature.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
