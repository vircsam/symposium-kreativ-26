
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Trophy, Code, Rocket, Coffee } from 'lucide-react';

const timelineData = [
  {
    time: "09:00 AM",
    title: "Inauguration",
    description: "Kickstarting Kreativ'26 with the lighting of the lamp and welcome address.",
    icon: Rocket
  },
  {
    time: "10:30 AM",
    title: "Project Sprint Start",
    description: "Teams begin the rapid assembly line for building market-ready products.",
    icon: Code
  },
  {
    time: "01:00 PM",
    title: "Networking Lunch",
    description: "Recharge and connect with fellow developers and industry experts.",
    icon: Coffee
  },
  {
    time: "02:00 PM",
    title: "Marketing Mania",
    description: "The tactical arena opens for the non-technical showdown.",
    icon: Trophy
  },
  {
    time: "04:30 PM",
    title: "Valedictory",
    description: "Awarding the champions and closing ceremony.",
    icon: Calendar
  }
];

export const EventTimeline = () => {
  return (
    <div className="w-full mx-auto py-10 relative">
      {/* Central Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500 rounded-full -translate-x-1/2" />

      <div className="space-y-12 relative z-10">
        {timelineData.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center justify-center md:justify-start relative`}
            >
              {/* Left Card */}
              <div className={`${isEven ? 'md:order-2' : 'md:order-1'} md:w-5/12 px-4`}>
                <div className="bg-gray-900/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-pink-500/10 rounded-lg">
                      <item.icon className="w-5 h-5 text-pink-500" />
                    </div>
                    <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
                      {item.time}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-blue-100/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Spacer for the line */}
              <div className="hidden md:block md:w-1/12" />

              {/* Right Card */}
              <div className={`${isEven ? 'md:order-1' : 'md:order-2'} md:w-5/12 px-4`}>
                {/* Empty for symmetry, cards alternate */}
              </div>

              {/* Dot */}
              {/* Dot */}
<div className={`w-4 h-4 bg-white rounded-full border-4 border-pink-500 z-10 
    ${isEven ? 'md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2' : 'md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2'} 
    relative mb-4 md:mb-0`} 
/>

               </motion.div>
          );
        })}
      </div>
    </div>

  );
};
