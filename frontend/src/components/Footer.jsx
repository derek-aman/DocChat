// src/components/Footer.jsx

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#2b2b2b] to-[#1a1a1a] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-center">

        {/* Left section: Say hello */}
        <div>
          <p className="text-sm uppercase text-gray-400">Say Hello</p>
          <a href="mailto:hello@docchat.ai" className="text-xl font-semibold hover:underline">
            hello@docchat.ai
          </a>
        </div>

        {/* Middle section: Start project */}
        <div className="flex flex-col items-center">
          <div className='relative w-[95%] sm:w-48 h-10 bg-gradient-to-r from-[#f1ac7b] t0-[#e99b63] shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full'>
                <div className='absolute inset-[3px] bg-black rounded-full flex items-center justify-center gap-1'>
                    Start Conversation
                </div>
            </div>
          <p className="mt-4 text-xs text-gray-400">Built with Passion & AI</p>
        </div>

        {/* Right section: Socials */}
        <div className="flex justify-center md:justify-end space-x-6 text-gray-400 text-sm">
          <a href="#" className="hover:text-white">Twitter</a>
          <a href="#" className="hover:text-white">LinkedIn</a>
          <a href="#" className="hover:text-white">GitHub</a>
        </div>
      </div>

      {/* Bottom: Navigation & copyright */}
      <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between text-xs text-gray-500">
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="#upload">Upload</a>
          <a href="#">Chat</a>
          <a href="#about">About</a>
          <a href="#">Contact</a>
        </div>
        <p>© {new Date().getFullYear()} DocChat. All rights reserved.</p>
      </div>
    </footer>
  );
}
